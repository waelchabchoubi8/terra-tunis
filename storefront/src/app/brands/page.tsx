"use client";

import { brands } from "@/lib/data";
import { useSettings } from "@/lib/settings";
import BrandCard from "@/components/BrandCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function BrandsPage() {
  const { t } = useSettings();
  return (
    <div className="container-pad py-12">
      <SectionHeading
        eyebrow={t("nav.brands")}
        title={t("home.brands.title")}
        subtitle={t("home.brands.subtitle")}
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b, i) => (
          <Reveal key={b.id} delay={(i % 3) * 90}>
            <BrandCard brand={b} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
