"use client";

import { ChevronDownIcon, ArrowRightIcon } from "../Icons";
import type { PrivacySection } from "./privacyData";

type PrivacySectionsProps = {
  sections: PrivacySection[];
  openId: string | null;
  onToggle: (id: string) => void;
  showAll: boolean;
  onShowMore: () => void;
};

const VISIBLE_ON_MOBILE = 4;

export function PrivacySections({ sections, openId, onToggle, showAll, onShowMore }: PrivacySectionsProps) {
  return (
    <div className="space-y-2.5">
      {sections.map((s, i) => {
        const open = openId === s.id;
        return (
          <article
            key={s.id}
            id={s.id}
            className={`scroll-mt-28 rounded-xl border border-line bg-cream-50 ${
              !showAll && i >= VISIBLE_ON_MOBILE ? "max-lg:hidden" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => onToggle(s.id)}
              aria-expanded={open}
              aria-controls={`${s.id}-panel`}
              className="grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-start gap-3 px-3.5 py-3.5 text-left lg:gap-4 lg:px-4"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-sand-200/80 text-[11px] text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block font-serif text-[15px] leading-tight text-ink lg:text-[17px]">{s.title}</span>
                {!open && (
                  <span className="mt-1.5 hidden text-[12px] leading-relaxed text-muted lg:block">{s.summary}</span>
                )}
              </span>
              <span className="flex items-center gap-4 self-center">
                <span className="hidden items-center gap-1.5 text-[11px] text-ink-soft lg:flex">
                  {open ? "Show less" : "Show more"}
                  {!open && <ArrowRightIcon width={12} height={12} />}
                </span>
                <ChevronDownIcon
                  width={15}
                  height={15}
                  className={`shrink-0 text-ink transition-transform ${open ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            {open && (
              <div id={`${s.id}-panel`} className="space-y-2 px-4 pb-4 pl-14 lg:pl-15">
                {s.body.map((p) => (
                  <p key={p} className="text-[12.5px] leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </article>
        );
      })}

      {!showAll && (
        <button
          type="button"
          onClick={onShowMore}
          className="flex cursor-pointer items-center gap-1.5 px-1 py-1 text-[12px] text-ink lg:hidden"
        >
          Show more <ChevronDownIcon width={13} height={13} />
        </button>
      )}
    </div>
  );
}
