"use client";

import { SettingsProvider } from "@/lib/settings";
import { CartProvider } from "@/lib/cart";
import { UIProvider } from "@/lib/ui";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <CartProvider>
        <UIProvider>{children}</UIProvider>
      </CartProvider>
    </SettingsProvider>
  );
}
