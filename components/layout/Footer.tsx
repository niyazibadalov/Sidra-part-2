"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "../Icons";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Help", href: "/help" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-cream-50 py-5 sm:py-6 lg:pt-10 lg:pb-8 text-ink">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Main Footer Row */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Navigation Links - Hidden on mobile/tablet (< 1024px) */}
          <nav aria-label="Footer" className="hidden flex-wrap items-center gap-6 sm:gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons - Centered on mobile/tablet (< 1024px) */}
          <div className="flex items-center justify-center gap-5 text-ink-soft sm:gap-6 lg:justify-start">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="transition-colors hover:text-ink"
                >
                  <Icon width={18} height={18} />
                </a>
              );
            })}
          </div>

          {/* Newsletter Form - Hidden on mobile/tablet (< 1024px) */}
          <div className="hidden flex-wrap items-center gap-4 lg:flex">
            <span className="text-[12.5px] font-medium text-ink-soft">
              Subscribe to our newsletter
            </span>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center"
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                className="h-10 w-52 rounded-full border border-line bg-cream-100 px-4 pr-11 text-[12px] text-ink placeholder:text-muted focus:border-sand-400 focus:bg-white focus:outline-none sm:w-60"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1 grid size-8 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-ink-soft"
              >
                <ArrowRightIcon width={14} height={14} />
              </button>
            </form>

            <div className="hidden items-center gap-1.5 text-[11.5px] text-muted xl:flex">
              <GlobeIcon width={14} height={14} />
              <span>A global impact</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="mt-2.5 flex flex-col items-center justify-center gap-4 pt-0 text-[11.5px] text-muted sm:flex-row lg:mt-8 lg:justify-between lg:border-t lg:border-line/50 lg:pt-6">
          <p className="text-center text-[11px] text-muted sm:text-[11.5px]">
            © 2026 Sidra. All rights reserved.
          </p>

          <div className="hidden items-center gap-6 lg:flex">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-ink">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
