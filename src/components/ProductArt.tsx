import { getCategory, type CategoryId } from "@/lib/data";
import { CategoryMotif } from "./icons";

/**
 * Product imagery. When `src` is given, shows a real photo (object-cover) over a
 * category-tinted backdrop with a glossy sheen and soft vignette for depth.
 * Without `src`, falls back to an offline-safe glossy tile with a line-art motif
 * — so any product missing a photo still looks intentional rather than broken.
 */
export default function ProductArt({
  category,
  label,
  className = "",
  motifClassName = "",
  src,
}: {
  category: CategoryId;
  label?: string;
  className?: string;
  motifClassName?: string;
  src?: string;
}) {
  const cat = getCategory(category)!;
  const dotId = `dots-${category}`;
  const tint = `radial-gradient(120% 120% at 30% 15%, color-mix(in oklab, ${cat.accent} 20%, #fff) 0%, ${cat.accentSoft} 50%, color-mix(in oklab, ${cat.accentSoft} 80%, #fff) 100%)`;

  // Real photo: cover the tile, keep a faint sheen + vignette for that "shot on
  // a soft studio sweep" feel. The tint shows only while the image loads.
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ background: tint }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label ?? cat.name.en}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.22), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 -40px 60px -44px rgba(16,24,40,0.22)" }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role="img"
      aria-label={label ?? cat.name.en}
      style={{ background: tint }}
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
          background: "linear-gradient(180deg, rgba(255,255,255,0.55), transparent)",
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
          boxShadow: "inset 0 -40px 60px -42px rgba(16,24,40,0.18)",
        }}
      />
    </div>
  );
}
