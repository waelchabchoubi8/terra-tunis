// Shipping to Sweden. Base prices in EUR.
export const SHIPPING_EUR = 6.9;
export const FREE_SHIPPING_OVER_EUR = 70; // ≈ 800 SEK

export function shippingForSubtotal(subtotalEUR: number): number {
  if (subtotalEUR <= 0) return 0;
  return subtotalEUR >= FREE_SHIPPING_OVER_EUR ? 0 : SHIPPING_EUR;
}
