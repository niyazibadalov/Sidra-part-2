"use client";

import { ChevronDownIcon } from "../Icons";
import { CookieDetailsTable } from "./CookieDetailsTable";
import { COOKIE_SECTIONS } from "./cookieData";

const DETAILS_ID = "cookie-details";

type CookieAccordionProps = {
  openId: string | null;
  onToggle: (id: string) => void;
};

/** DOM id for each row. "Cookie Details" gets an "-m" suffix because the desktop table owns the plain id. */
export const rowDomId = (id: string) => (id === DETAILS_ID ? `${id}-m` : id);

export function CookieAccordion({ openId, onToggle }: CookieAccordionProps) {
  return (
    <div className="divide-y divide-line">
      {COOKIE_SECTIONS.map((s, i) => {
        const open = openId === s.id;
        const isDetails = s.id === DETAILS_ID;
        return (
          <article
            key={s.id}
            id={rowDomId(s.id)}
            className={`scroll-mt-28 ${isDetails ? "lg:hidden" : ""}`}
          >
            <button
              type="button"
              onClick={() => onToggle(s.id)}
              aria-expanded={open}
              aria-controls={`${s.id}-panel`}
              className="flex w-full cursor-pointer items-center gap-3.5 py-3 text-left lg:py-3.5"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sand-200 text-[12px] text-ink-soft">
                {i + 1}
              </span>
              <span className="flex-1 font-serif text-[15px] leading-tight text-ink lg:text-[16px]">{s.title}</span>
              <ChevronDownIcon
                width={16}
                height={16}
                className={`shrink-0 text-ink transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div id={`${s.id}-panel`} className="space-y-2 pb-4 pl-[2.6rem]">
                {s.body.map((p) => (
                  <p key={p} className="text-[12.5px] leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[12.5px] leading-relaxed text-ink-soft">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-rose-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {isDetails && (
                  <div className="pt-1">
                    <CookieDetailsTable />
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
