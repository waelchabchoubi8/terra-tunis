import Link from "next/link";

export default function Logo({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Terra Tunis — home"
      className={`focus-ring group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className="grid h-9 w-9 place-items-center rounded-full bg-terracotta text-[#1a1206] transition-colors duration-200 group-hover:bg-terracotta-dark"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21c-4 0-6-3.5-6-7 3 0 6 1 8 3M6 14c0-3 1.5-5 4-6 3.5 0 6 3 6 7 0 3-1.5 5-4 5" />
          <path d="M6 14c3 .5 6 2.5 7.5 5.5" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight text-espresso">
          Terra Tunis
        </span>
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-stone">
          Tunisia · Sweden
        </span>
      </span>
    </Link>
  );
}
