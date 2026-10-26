import Link from "next/link";
import { ChevronDownIcon } from "../Icons";

const MESSAGES = [
  "A global jewellery marketplace",
  "Trusted by thousands",
  "Brighter together",
];

export function TopBar({ showOnMobile = false }: { showOnMobile?: boolean }) {
  return (
    <div className={`${showOnMobile ? "block" : "hidden md:block"} border-b border-line bg-cream-200 text-[11px] text-ink-soft`}>
      <div className="relative mx-auto flex h-8 max-w-360 items-center justify-center px-6 lg:px-10">
        <ul className="flex items-center gap-3">
          {MESSAGES.map((m, i) => (
            <li
              key={m}
              className={`items-center gap-3 ${i === 1 && showOnMobile ? "hidden lg:flex" : i === 2 ? (showOnMobile ? "hidden sm:flex" : "hidden lg:flex") : "flex"}`}
            >
              {i > 0 && <span aria-hidden className="text-rose-gold">{showOnMobile ? "•" : "✦"}</span>}
              {m}
            </li>
          ))}
        </ul>

        <nav
          aria-label="Utility"
          className="absolute right-6 hidden items-center gap-2 lg:right-10 lg:flex"
        >
          <Link href="/sell" className="cursor-pointer hover:text-ink">
            Sell on Sidra
          </Link>
          <span aria-hidden className="text-sand-400">|</span>
          <Link href="/help" className="cursor-pointer hover:text-ink">
            Help
          </Link>
          <span aria-hidden className="text-sand-400">|</span>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-0.5 hover:text-ink"
            aria-label="Language: English"
          >
            EN
            <ChevronDownIcon width={12} height={12} />
          </button>
        </nav>
      </div>
    </div>
  );
}
