"use client";

import { InfoIcon } from "../Icons";
import { openCookiePreferences } from "../cookie-consent/cookieConsentStore";
import { COOKIE_TYPES, GLANCE_ID } from "./cookieData";

type CookieGlanceProps = {
  onLearnMore: () => void;
};

function StatusPill({ status, className = "" }: { status: string; className?: string }) {
  return (
    <span className={`inline-block rounded-md bg-sand-200/90 px-3 py-1 text-[11px] whitespace-nowrap text-ink-soft ${className}`}>
      {status}
    </span>
  );
}

export function CookieGlance({ onLearnMore }: CookieGlanceProps) {
  return (
    <section id={GLANCE_ID} aria-labelledby="cookie-glance-title" className="scroll-mt-28">
      <h2 id="cookie-glance-title" className="font-serif text-[22px] text-ink sm:text-[24px] lg:text-[26px]">
        Cookies at a Glance
      </h2>
      <p className="mt-1.5 max-w-2xl text-[12px] leading-relaxed text-ink-soft sm:text-[12.5px]">
        We use cookies to make SIDRA work properly, improve your experience, understand how our platform is used and
        show you relevant content.
      </p>

      {/* tablet / mobile: rows */}
      <ul className="mt-4 space-y-2.5 lg:hidden">
        {COOKIE_TYPES.map(({ icon: Icon, title, text, status }) => (
          <li
            key={title}
            className="flex items-center gap-3.5 rounded-xl border border-line bg-cream-50 px-3.5 py-3 sm:px-4"
          >
            <Icon width={24} height={24} strokeWidth={1.3} className="shrink-0 text-ink" />
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-[14px] text-ink">{title}</h3>
              <p className="mt-0.5 text-[11.5px] leading-snug text-muted">{text}</p>
            </div>
            <StatusPill status={status} className="shrink-0" />
          </li>
        ))}
      </ul>

      {/* desktop: cards */}
      <ul className="mt-4 hidden grid-cols-4 gap-3 lg:grid">
        {COOKIE_TYPES.map(({ icon: Icon, titleLines, text, status }) => (
          <li key={titleLines.join(" ")} className="flex flex-col rounded-xl border border-line bg-sand-200/50 p-4">
            <Icon width={26} height={26} strokeWidth={1.3} className="text-ink" />
            <h3 className="mt-3 font-serif text-[16px] leading-tight text-ink">
              {titleLines[0]}
              <br />
              {titleLines[1]}
            </h3>
            <p className="mt-2 min-h-[3.2rem] text-[12px] leading-snug text-ink-soft">{text}</p>
            <StatusPill status={status} className="mt-3 self-start" />
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-col gap-3 lg:mt-4 lg:flex-row lg:items-stretch">
        <div className="flex flex-col gap-3 lg:flex-row">
          <button
            type="button"
            onClick={openCookiePreferences}
            className="h-11 cursor-pointer rounded-md bg-ink px-8 text-[13px] font-medium text-white transition-colors hover:bg-ink-soft"
          >
            Manage Cookie Preferences
          </button>
          <button
            type="button"
            onClick={onLearnMore}
            className="hidden h-11 cursor-pointer rounded-md border border-ink/60 bg-white px-9 text-[13px] text-ink transition-colors hover:bg-cream-200 lg:block"
          >
            Learn More
          </button>
        </div>

        <div className="flex flex-1 items-center gap-3 rounded-xl border border-line bg-[#f6ece0] px-4 py-3">
          <InfoIcon width={20} height={20} className="shrink-0 text-ink-soft" />
          <p className="text-[11.5px] leading-snug text-ink-soft sm:text-[12px]">
            We do not activate non-essential cookies before your consent. You can change or withdraw your preferences at
            any time.
          </p>
        </div>
      </div>
    </section>
  );
}
