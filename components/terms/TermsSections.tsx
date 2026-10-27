"use client";

import { ChevronDownIcon } from "../Icons";
import { TERMS_SECTIONS } from "./termsData";

type TermsSectionsProps = {
  openId: string | null;
  onToggle: (id: string) => void;
};

/**
 * Desktop (lg+): every section is fully visible.
 * Tablet / mobile: accordion, one open at a time.
 */
export function TermsSections({ openId, onToggle }: TermsSectionsProps) {
  return (
    <div className="divide-y divide-line">
      {TERMS_SECTIONS.map((s, i) => {
        const open = openId === s.id;
        return (
          <article key={s.id} id={s.id} className="scroll-mt-28 py-1 lg:py-5">
            <button
              type="button"
              onClick={() => onToggle(s.id)}
              aria-expanded={open}
              aria-controls={`${s.id}-panel`}
              className="flex w-full cursor-pointer items-center gap-3.5 py-3 text-left lg:pointer-events-none lg:cursor-default lg:items-start lg:gap-5 lg:py-0"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sand-200 text-[12px] text-ink-soft lg:size-10 lg:text-[15px]">
                {i + 1}
              </span>
              <span className="flex-1 font-serif text-[15px] leading-tight text-ink lg:text-[22px]">{s.title}</span>
              <ChevronDownIcon
                width={16}
                height={16}
                className={`shrink-0 text-ink transition-transform lg:hidden ${open ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id={`${s.id}-panel`}
              className={`${open ? "block" : "hidden"} pb-3 pl-[2.6rem] lg:block lg:pt-2 lg:pb-0 lg:pl-[3.75rem]`}
            >
              {s.body.map((p) => (
                <p key={p} className="text-[12.5px] leading-relaxed text-muted lg:text-[13px]">
                  {p}
                </p>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
