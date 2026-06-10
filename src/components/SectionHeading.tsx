import Link from "next/link";
import { ArrowRight } from "./icons";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  link,
  linkLabel,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  link?: string;
  linkLabel?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "items-center text-center sm:flex-col sm:items-center" : ""
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow text-terracotta">{eyebrow}</p>}
        <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-mocha">{subtitle}</p>}
      </div>
      {link && linkLabel && (
        <Link
          href={link}
          className="focus-ring group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-espresso transition-colors hover:text-terracotta"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
