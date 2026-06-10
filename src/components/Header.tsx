"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useT } from "@/lib/settings";
import { useLockBody, useUI } from "@/lib/ui";
import Logo from "./Logo";
import SettingsSwitcher from "./SettingsSwitcher";
import CartDrawer from "./CartDrawer";
import SearchPalette from "./SearchPalette";
import { CartIcon, MenuIcon, CloseIcon, ShipIcon, SearchIcon } from "./icons";
import FlagPair from "./Flags";

export default function Header() {
  const t = useT();
  const pathname = usePathname();
  const { count, ready } = useCart();
  const { openCart, openSearch } = useUI();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useLockBody(open);

  // Compact glass header once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const raf = requestAnimationFrame(onScroll); // initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile menu on navigation (adjust-during-render pattern).
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  const nav = [
    { href: "/shop", label: t("nav.shop") },
    { href: "/brands", label: t("nav.brands") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement bar — flag pair + free shipping */}
      <div className="border-b border-clay/70 bg-sand text-mocha">
        <div className="container-pad flex h-9 items-center justify-center gap-3 text-center text-xs font-medium tracking-wide">
          <FlagPair />
          <span className="hidden h-3 w-px bg-clay sm:block" />
          <span className="inline-flex items-center gap-1.5">
            <ShipIcon className="h-4 w-4 text-terracotta" />
            {t("common.freeShipping")}
          </span>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-clay/80 bg-cream/85 shadow-[0_18px_40px_-22px_rgba(16,24,40,0.25)] backdrop-blur-xl"
            : "border-clay/60 bg-cream/70 backdrop-blur-md"
        }`}
      >
        <div
          className={`container-pad flex items-center justify-between gap-4 transition-[height] duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring relative text-sm font-semibold transition-colors hover:text-terracotta ${
                  isActive(item.href) ? "text-terracotta" : "text-espresso"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-terracotta" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <SettingsSwitcher className="hidden xl:flex" />

            {/* Search — pill on desktop, icon on mobile */}
            <button
              type="button"
              onClick={openSearch}
              className="focus-ring hidden h-10 cursor-pointer items-center gap-2.5 rounded-full border border-clay bg-parchment/80 pl-3.5 pr-2 text-sm text-stone transition-colors hover:border-terracotta/40 hover:text-mocha md:inline-flex"
            >
              <SearchIcon className="h-4 w-4 text-terracotta" />
              <span className="pr-1">{t("search.title")}</span>
              <kbd className="rounded-md border border-clay bg-sand px-1.5 py-0.5 text-[0.6rem] font-semibold text-stone">
                Ctrl K
              </kbd>
            </button>
            <button
              type="button"
              onClick={openSearch}
              aria-label={t("search.title")}
              className="focus-ring grid h-10 w-10 cursor-pointer place-items-center rounded-full text-espresso transition-colors hover:bg-sand md:hidden"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            {/* Cart — opens the drawer */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`${t("nav.cart")} (${ready ? count : 0})`}
              className="focus-ring relative grid h-10 w-10 cursor-pointer place-items-center rounded-full text-espresso transition-colors hover:bg-sand"
            >
              <CartIcon className="h-5 w-5" />
              {ready && count > 0 && (
                <span
                  key={count}
                  className="animate-badge-pop absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-terracotta px-1 text-[0.65rem] font-bold text-white"
                >
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={t("nav.menu")}
              aria-expanded={open}
              className="focus-ring grid h-10 w-10 cursor-pointer place-items-center rounded-full text-espresso transition-colors hover:bg-sand lg:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — full overlay below the header */}
      {open && (
        <div className="glass absolute inset-x-0 top-full border-b border-clay/70 lg:hidden">
          <nav className="container-pad flex flex-col py-4" aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`focus-ring animate-rise rounded-xl px-3 py-3.5 font-display text-xl font-semibold transition-colors ${
                  isActive(item.href)
                    ? "text-terracotta"
                    : "text-espresso hover:bg-sand"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <div
              className="animate-rise mt-3 border-t border-clay/60 px-3 pt-4"
              style={{ animationDelay: `${nav.length * 50}ms` }}
            >
              <SettingsSwitcher />
            </div>
          </nav>
        </div>
      )}

      {/* Overlays */}
      <CartDrawer />
      <SearchPalette />
    </header>
  );
}
