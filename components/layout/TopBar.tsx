import Link from "next/link";
import { ChevronDownIcon } from "../Icons";

const MESSAGES = [
  "A global jewellery marketplace",
  "Trusted by thousands",
  "Brighter together",
];

export function TopBar() {
  return (
    <div className="hidden border-b border-line bg-cream-200 text-[11px] text-ink-soft md:block">
      <div className="relative mx-auto flex h-8 max-w-[1440px] items-center justify-center px-6 lg:px-10">
        <ul className="flex items-center gap-3">
          {MESSAGES.map((m, i) => (
            <li
              key={m}
              className={`flex items-center gap-3 ${i === 2 ? "hidden lg:flex" : ""}`}
            >
              {i > 0 && <span aria-hidden className="text-rose-gold">✦</span>}
              {m}
            </li>
          ))}
        </ul>

        <nav
          aria-label="Utility"
          className="absolute right-6 hidden items-center gap-2 lg:right-10 lg:flex"
        >
          <Link href="/sell" className="hover:text-ink">
            Sell on Sidra
          </Link>
          <span aria-hidden className="text-sand-400">|</span>
          <Link href="/help" className="hover:text-ink">
            Help
          </Link>
          <span aria-hidden className="text-sand-400">|</span>
          <button
            type="button"
            className="flex items-center gap-0.5 hover:text-ink"
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
