"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { products } from "./data";

export interface CartLine {
  productId: string;
  qty: number;
}

type CartState = { lines: CartLine[]; ready: boolean };

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; productId: string; qty: number }
  | { type: "setQty"; productId: string; qty: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

const LS_KEY = "tt.cart";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, ready: true };
    case "add": {
      const existing = state.lines.find((l) => l.productId === action.productId);
      const lines = existing
        ? state.lines.map((l) =>
            l.productId === action.productId
              ? { ...l, qty: l.qty + action.qty }
              : l,
          )
        : [...state.lines, { productId: action.productId, qty: action.qty }];
      return { ...state, lines };
    }
    case "setQty": {
      const lines = state.lines
        .map((l) =>
          l.productId === action.productId ? { ...l, qty: action.qty } : l,
        )
        .filter((l) => l.qty > 0);
      return { ...state, lines };
    }
    case "remove":
      return {
        ...state,
        lines: state.lines.filter((l) => l.productId !== action.productId),
      };
    case "clear":
      return { ...state, lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  subtotalEUR: number;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], ready: false });

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const lines: CartLine[] = raw ? JSON.parse(raw) : [];
      dispatch({ type: "hydrate", lines: Array.isArray(lines) ? lines : [] });
    } catch {
      dispatch({ type: "hydrate", lines: [] });
    }
  }, []);

  // Persist after hydration.
  useEffect(() => {
    if (state.ready) localStorage.setItem(LS_KEY, JSON.stringify(state.lines));
  }, [state.lines, state.ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotalEUR = state.lines.reduce((sum, l) => {
      const p = products.find((pr) => pr.id === l.productId);
      return sum + (p ? p.priceEUR * l.qty : 0);
    }, 0);

    return {
      lines: state.lines,
      ready: state.ready,
      count,
      subtotalEUR,
      add: (productId, qty = 1) => dispatch({ type: "add", productId, qty }),
      setQty: (productId, qty) => dispatch({ type: "setQty", productId, qty }),
      remove: (productId) => dispatch({ type: "remove", productId }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
