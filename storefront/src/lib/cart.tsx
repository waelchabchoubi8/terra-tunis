"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { defaultVariant, getVariant } from "./data";
import { useCatalogue } from "./catalogue-context";

export interface CartLine {
  productId: string;
  variantId: string;
  qty: number;
}

type CartState = { lines: CartLine[]; ready: boolean };

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; productId: string; variantId: string; qty: number }
  | { type: "setQty"; productId: string; variantId: string; qty: number }
  | { type: "remove"; productId: string; variantId: string }
  | { type: "clear" };

const LS_KEY = "tt.cart";

/** A line is identified by its product *and* variant. */
const sameLine = (l: CartLine, productId: string, variantId: string) =>
  l.productId === productId && l.variantId === variantId;

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, ready: true };
    case "add": {
      const existing = state.lines.find((l) =>
        sameLine(l, action.productId, action.variantId),
      );
      const lines = existing
        ? state.lines.map((l) =>
            sameLine(l, action.productId, action.variantId)
              ? { ...l, qty: l.qty + action.qty }
              : l,
          )
        : [
            ...state.lines,
            {
              productId: action.productId,
              variantId: action.variantId,
              qty: action.qty,
            },
          ];
      return { ...state, lines };
    }
    case "setQty": {
      const lines = state.lines
        .map((l) =>
          sameLine(l, action.productId, action.variantId)
            ? { ...l, qty: action.qty }
            : l,
        )
        .filter((l) => l.qty > 0);
      return { ...state, lines };
    }
    case "remove":
      return {
        ...state,
        lines: state.lines.filter(
          (l) => !sameLine(l, action.productId, action.variantId),
        ),
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
  add: (productId: string, qty?: number, variantId?: string) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], ready: false });
  const { getById } = useCatalogue();

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed: CartLine[] = raw ? JSON.parse(raw) : [];
      // Normalise older carts saved before variants existed: give each line a
      // valid variantId (its product's default) so lookups never miss.
      const lines = (Array.isArray(parsed) ? parsed : []).map((l) => {
        if (l.variantId) return l;
        const p = getById(l.productId);
        return { ...l, variantId: p ? defaultVariant(p).id : "std" };
      });
      dispatch({ type: "hydrate", lines });
    } catch {
      dispatch({ type: "hydrate", lines: [] });
    }
    // getById is stable for a given catalogue; hydrate runs once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist after hydration.
  useEffect(() => {
    if (state.ready) localStorage.setItem(LS_KEY, JSON.stringify(state.lines));
  }, [state.lines, state.ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotalEUR = state.lines.reduce((sum, l) => {
      const p = getById(l.productId);
      return sum + (p ? getVariant(p, l.variantId).priceEUR * l.qty : 0);
    }, 0);

    return {
      lines: state.lines,
      ready: state.ready,
      count,
      subtotalEUR,
      add: (productId, qty = 1, variantId) => {
        const p = getById(productId);
        const vid = variantId ?? (p ? defaultVariant(p).id : "std");
        dispatch({ type: "add", productId, variantId: vid, qty });
      },
      setQty: (productId, variantId, qty) =>
        dispatch({ type: "setQty", productId, variantId, qty }),
      remove: (productId, variantId) =>
        dispatch({ type: "remove", productId, variantId }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state, getById]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
