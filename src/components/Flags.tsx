/**
 * Offline-safe SVG flags for the two markets this marketplace bridges:
 * Tunisia (where the goods come from) and Sweden (where they're sold).
 * Colours follow the official flag specs:
 *   Sweden  — blue #006AA7, yellow #FECC02
 *   Tunisia — red  #E70013, white  #FFFFFF
 */

type FlagProps = { className?: string; title?: string };

export function SwedishFlag({ className = "h-4 w-[1.6rem]", title = "Sweden" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 16 10"
      className={`block rounded-[2px] shadow-[0_0_0_1px_rgba(16,24,40,0.08)] ${className}`}
      role="img"
      aria-label={title}
      preserveAspectRatio="none"
    >
      <rect width="16" height="10" fill="#006AA7" />
      {/* Nordic cross — offset to the hoist */}
      <rect x="0" y="4" width="16" height="2" fill="#FECC02" />
      <rect x="5" y="0" width="2" height="10" fill="#FECC02" />
    </svg>
  );
}

export function TunisianFlag({ className = "h-4 w-6", title = "Tunisia" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`block rounded-[2px] shadow-[0_0_0_1px_rgba(16,24,40,0.08)] ${className}`}
      role="img"
      aria-label={title}
      preserveAspectRatio="none"
    >
      <rect width="30" height="20" fill="#E70013" />
      {/* Central white disc */}
      <circle cx="15" cy="10" r="6" fill="#fff" />
      {/* Red crescent: red disc carved by an offset white disc */}
      <circle cx="14.4" cy="10" r="4" fill="#E70013" />
      <circle cx="16" cy="10" r="3.2" fill="#fff" />
      {/* Red five-pointed star */}
      <polygon
        fill="#E70013"
        points="17.2,7.7 17.74,9.26 19.39,9.29 18.08,10.28 18.55,11.86 17.2,10.92 15.85,11.86 16.33,10.28 15.01,9.29 16.66,9.26"
      />
    </svg>
  );
}

/** Tunisia → Sweden flag pair, used in the announcement bar. */
export default function FlagPair({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-hidden="true">
      <TunisianFlag className="h-3.5 w-[1.3rem]" />
      <span className="text-stone">→</span>
      <SwedishFlag className="h-3.5 w-[1.4rem]" />
    </span>
  );
}
