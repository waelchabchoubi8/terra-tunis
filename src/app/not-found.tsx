import Link from "next/link";
import { CategoryMotif } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-pad relative grid min-h-[60vh] place-items-center py-20 text-center">
      <CategoryMotif
        category="olive-oil"
        className="animate-float absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2"
        style={{ color: "var(--color-olive)", opacity: 0.12 }}
      />
      <div className="animate-rise">
        <p className="font-display text-8xl font-semibold text-gradient-gold">404</p>
        <h1 className="mt-3 font-display text-3xl">This page wandered off the grove</h1>
        <p className="mt-3 text-mocha">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="focus-ring inline-flex h-12 items-center rounded-full bg-terracotta px-7 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-colors hover:bg-terracotta-dark"
          >
            Back to home
          </Link>
          <Link
            href="/shop"
            className="focus-ring inline-flex h-12 items-center rounded-full border border-espresso/20 bg-parchment px-7 text-sm font-semibold text-espresso transition-colors hover:border-espresso/40 hover:bg-sand"
          >
            Browse the shop
          </Link>
        </div>
      </div>
    </div>
  );
}
