"use client";

import { useSettings, type Currency } from "@/lib/settings";
import { LOCALES, type Locale } from "@/lib/dictionaries";

function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-clay bg-parchment p-0.5"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={`focus-ring cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
              active
                ? "bg-terracotta text-[#1a1206]"
                : "text-mocha hover:text-espresso"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function SettingsSwitcher({ className = "" }: { className?: string }) {
  const { locale, currency, setLocale, setCurrency } = useSettings();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Segmented<Locale>
        label="Language"
        value={locale}
        onChange={setLocale}
        options={LOCALES.map((l) => ({ value: l.code, label: l.flag }))}
      />
      <Segmented<Currency>
        label="Currency"
        value={currency}
        onChange={setCurrency}
        options={[
          { value: "SEK", label: "SEK" },
          { value: "EUR", label: "EUR" },
        ]}
      />
    </div>
  );
}
