import { getCategory, type CategoryId } from "@/lib/data";
import { CategoryMotif } from "./icons";

/**
 * Offline-safe "product photography" stand-in: a dark, glossy, category-tinted
 * tile with a glowing line-art motif. Intentional and premium rather than a
 * broken <img>. Swap for real photos by replacing this component.
 */
export default function ProductArt({
  category,
  label,
  className = "",
  motifClassName = "",
}: {
  category: CategoryId;
  label?: string;
  className?: string;
  motifClassName?: string;
}) {
  const cat = getCategory(category)!;
  const dotId = `dots-${category}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role="img"
      aria-label={label ?? cat.name.en}
      style={{
        background: `radial-gradient(120% 120% at 30% 15%, color-mix(in oklab, ${cat.accent} 22%, ${cat.accentSoft}) 0%, ${cat.accentSoft} 45%, color-mix(in oklab, ${cat.accentSoft} 70%, #000) 100%)`,
      }}
    >
      {/* Faint dotted texture */}
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
        <defs>
          <pattern id={dotId} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={cat.accent} opacity="0.22" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${dotId})`} />
      </svg>

      {/* Glossy top sheen */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Concentric arc, top-right */}
      <svg
        className="absolute -right-10 -top-10 h-40 w-40"
        viewBox="0 0 100 100"
        aria-hidden="true"
        style={{ color: cat.accent, opacity: 0.25 }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* Motif with glow */}
      <div className="absolute inset-0 grid place-items-center">
        <CategoryMotif
          category={category}
          className={`h-[55%] w-[55%] ${motifClassName}`}
          style={{
            color: cat.accent,
            opacity: 0.95,
            filter: `drop-shadow(0 0 22px color-mix(in oklab, ${cat.accent} 50%, transparent))`,
          }}
        />
      </div>

      {/* Bottom vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 -50px 70px -40px rgba(0,0,0,0.7)",
        }}
      />
    </div>
  );
}
