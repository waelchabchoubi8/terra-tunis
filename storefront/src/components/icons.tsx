import type { SVGProps } from "react";
import type { CategoryId } from "@/lib/data";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CartIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M3 3h2l.4 2M7 13h10l3.5-7H6.4M7 13 5.4 5M7 13l-1.6 3.5h11.2" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="m5 12 5 5 9-11" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M11 20C5 20 4 14 4 10c4 0 9 1 12 4M4 10c0-4 2-6 6-6 5 0 9 4 9 10 0 4-2 6-5 6" />
      <path d="M4 10c5 1 9 4 11 8" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="m12 8 2-2 6 5-2 2M12 8 8 12l2 2 2-2M2 11l4-3 6 5" />
      <path d="m12 14 2 2M9.5 16.5 11 18M7 18l1.5 1.5" />
    </svg>
  );
}

export function ShipIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M3 16l1.8-5.4a2 2 0 0 1 1.9-1.4h10.6a2 2 0 0 1 1.9 1.4L21 16" />
      <path d="M3 16h18l-1.5 4.5a1 1 0 0 1-1 .7H5.5a1 1 0 0 1-1-.7L3 16ZM12 4v5M9 6h6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 5c0-1 1-2 2-2h2l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5V18c0 1-1 2-2 2A16 16 0 0 1 4 5Z" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 11.5 2 2 4-4.5" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 4c.6 3.8 2.2 5.4 6 6-3.8.6-5.4 2.2-6 6-.6-3.8-2.2-5.4-6-6 3.8-.6 5.4-2.2 6-6Z" />
      <path d="M19 15c.3 1.7 1 2.4 2.5 2.7-1.5.3-2.2 1-2.5 2.7-.3-1.7-1-2.4-2.5-2.7 1.5-.3 2.2-1 2.5-2.7Z" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M5 17h4l2-5V6H4v6h3l-2 5Zm9 0h4l2-5V6h-7v6h3l-2 5Z" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M12 3.5l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6L7.6 18.7l.9-5.5-4-3.9 5.5-.8L12 3.5Z" />
    </svg>
  );
}

/**
 * Category motif — decorative line art used in product/brand artwork.
 * Single-colour (currentColor) so it can be tinted by the parent.
 */
export function CategoryMotif({
  category,
  ...props
}: { category: CategoryId } & IconProps) {
  const common = {
    viewBox: "0 0 120 120",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": "true" as const,
  };
  switch (category) {
    case "olive-oil":
      return (
        <svg {...common} {...props}>
          {/* bottle */}
          <path d="M52 22h16M54 22v8c0 3-6 6-6 12v44a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V42c0-6-6-9-6-12v-8" />
          <path d="M48 56h24" />
          {/* olive branch */}
          <path d="M30 40c10 4 16 12 18 22" />
          <path d="M30 40c-2 6 0 11 5 13M40 49c-1 6 1 10 6 12M33 38c4-2 8-1 10 2M44 47c4-1 7 1 8 5" />
        </svg>
      );
    case "honey":
      return (
        <svg {...common} {...props}>
          {/* jar */}
          <path d="M44 34h32M46 34l-2 6h32l-2-6M44 40v44a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V40" />
          <path d="M50 28h20v6H50z" />
          {/* dipper + drip */}
          <path d="M30 30v22M24 52h12M27 56h6M29 60h2" />
          <circle cx="60" cy="62" r="9" />
        </svg>
      );
    case "spices":
      return (
        <svg {...common} {...props}>
          {/* bowl */}
          <path d="M26 64a34 34 0 0 0 68 0Z" />
          <path d="M26 64h68" />
          {/* mounded spice + chillies */}
          <path d="M40 64c2-8 7-12 20-12s18 4 20 12" />
          <path d="M58 34c-2 6 0 10 4 14M58 34c5-2 9 0 10 5" />
          <path d="M74 40c2 5 1 9-3 12M74 40c-4 0-7 2-8 6" />
        </svg>
      );
    case "pastries":
    default:
      return (
        <svg {...common} {...props}>
          {/* plate */}
          <ellipse cx="60" cy="80" rx="38" ry="9" />
          {/* stacked diamonds (makroudh) */}
          <path d="M60 30l14 14-14 14-14-14 14-14Z" />
          <path d="M42 58l12 10M78 58 66 68M50 70h20" />
          <path d="M60 44c4 0 6 2 6 5s-2 5-6 5-6-2-6-5 2-5 6-5Z" />
        </svg>
      );
  }
}
