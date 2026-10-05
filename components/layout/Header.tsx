"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "../Logo";
import {
  BagIcon,
  ChevronRightIcon,
  CloseIcon,
  GlobeIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "../Icons";

const NAV_LINKS = [
  { label: "Jewellery", href: "/jewellery" },
  { label: "Collections", href: "/collections" },
  { label: "Brands", href: "/brands" },
  { label: "Gifts", href: "/gifts" },
  { label: "Stories", href: "/stories" },
];

const BAG_COUNT = 0;

function BagButton() {
  return (
    <Link
      href="/bag"
      aria-label={`Shopping bag, ${BAG_COUNT} items`}
      className="relative grid size-10 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-cream-200"
    >
      <BagIcon width={22} height={22} />
      {BAG_COUNT > 0 && (
        <span className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-ink text-[9px] font-semibold text-white">
          {BAG_COUNT}
        </span>
      )}
    </Link>
  );
}

function SearchField({ className = "" }: { className?: string }) {
  return (
    <form role="search" action="/search" className={`relative ${className}`}>
      <SearchIcon
        width={16}
        height={16}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
      />
      <input
        type="search"
        name="q"
        placeholder="Search for jewellery, brands, or inspiration..."
        aria-label="Search"
        className="h-10 w-full rounded-full border border-transparent bg-cream-200 pr-4 pl-10 text-[12.5px] text-ink placeholder:text-muted/80 focus:border-sand-400 focus:bg-cream-50 focus:outline-none"
      />
    </form>
  );
}

export function Header({ hideMobileTagline = false }: { hideMobileTagline?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b bg-cream-50/95 backdrop-blur transition-shadow ${
          scrolled ? "border-line shadow-[0_6px_24px_-18px_rgba(22,20,18,0.35)]" : "border-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:h-[72px] lg:gap-8 lg:px-10">
          {/* Mobile / tablet: menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="-ml-2 grid size-10 cursor-pointer place-items-center rounded-full text-ink hover:bg-cream-200 lg:hidden"
          >
            <MenuIcon width={22} height={22} />
          </button>

          <Logo hideMobileTagline={hideMobileTagline} className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0" />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative cursor-pointer py-2 text-[13px] text-ink-soft transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform hover:text-ink hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SearchField className="ml-auto hidden w-full max-w-[340px] xl:block" />

          <div className="ml-auto flex items-center gap-1 xl:ml-0">
            <Link
              href="/search"
              aria-label="Search"
              className="grid size-10 cursor-pointer place-items-center rounded-full text-ink hover:bg-cream-200 xl:hidden"
            >
              <SearchIcon width={21} height={21} />
            </Link>
            <Link
              href="/wishlist"
              className="hidden h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[12.5px] text-ink hover:bg-cream-200 lg:flex"
            >
              <HeartIcon width={18} height={18} />
              Wishlist
            </Link>
            <Link
              href="/sign-in"
              className="hidden h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[12.5px] text-ink hover:bg-cream-200 lg:flex"
            >
              <UserIcon width={18} height={18} />
              Sign in
            </Link>
            <Link
              href="/join"
              className="mx-1 hidden h-10 cursor-pointer items-center rounded-full bg-ink px-5 text-[12.5px] font-medium text-white transition-colors hover:bg-ink-soft lg:flex"
            >
              Join Sidra
            </Link>
            <BagButton />
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-blur would trap position:fixed */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] duration-300 lg:hidden ${open ? "visible" : "pointer-events-none invisible"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
          className={`absolute inset-0 cursor-pointer bg-ink/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-cream-50 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-cream-200"
          >
            <CloseIcon width={22} height={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <SearchField />

          <nav aria-label="Mobile" className="mt-6">
            <ul className="divide-y divide-line border-y border-line">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex cursor-pointer items-center justify-between py-4 font-serif text-xl text-ink"
                  >
                    {link.label}
                    <ChevronRightIcon width={18} height={18} className="text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-6 space-y-1 text-sm text-ink-soft">
            <li>
              <Link href="/wishlist" onClick={onClose} className="flex cursor-pointer items-center gap-3 py-2.5">
                <HeartIcon width={18} height={18} /> Wishlist
              </Link>
            </li>
            <li>
              <Link href="/sell" onClick={onClose} className="flex cursor-pointer items-center gap-3 py-2.5">
                <BagIcon width={18} height={18} /> Sell on Sidra
              </Link>
            </li>
            <li>
              <button type="button" className="flex cursor-pointer items-center gap-3 py-2.5">
                <GlobeIcon width={18} height={18} /> English · EUR
              </button>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-line p-4">
          <Link
            href="/sign-in"
            onClick={onClose}
            className="flex h-11 cursor-pointer items-center justify-center rounded-full border border-ink text-sm text-ink"
          >
            Sign in
          </Link>
          <Link
            href="/join"
            onClick={onClose}
            className="flex h-11 cursor-pointer items-center justify-center rounded-full bg-ink text-sm text-white"
          >
            Join Sidra
          </Link>
        </div>
      </aside>
    </div>
  );
}
