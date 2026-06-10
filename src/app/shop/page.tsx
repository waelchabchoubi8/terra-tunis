import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full Terra Tunis collection — olive oil, honey, spices and pastries from artisan Tunisian brands.",
};

function ShopSkeleton() {
  return (
    <div className="container-pad py-12" aria-busy="true">
      <div className="skeleton h-4 w-24" />
      <div className="skeleton mt-4 h-10 w-64" />
      <div className="skeleton mt-3 h-4 w-80" />
      <div className="skeleton mt-8 h-12 w-full rounded-full" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
        <div className="hidden space-y-3 lg:block">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="skeleton h-9 w-full rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <div className="skeleton aspect-[4/5] w-full" />
              <div className="skeleton mt-4 h-4 w-2/3" />
              <div className="skeleton mt-2 h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopClient />
    </Suspense>
  );
}
