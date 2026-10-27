"use client";

import { useState } from "react";
import { ChevronDownIcon, ListIcon } from "../Icons";
import type { PrivacySection } from "./privacyData";

type PrivacyTocProps = {
  sections: PrivacySection[];
  activeId: string;
  onSelect: (id: string) => void;
};

const num = (i: number) => String(i + 1).padStart(2, "0");

export function PrivacyToc({ sections, activeId, onSelect }: PrivacyTocProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      {/* Tablet / mobile dropdown */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-line bg-cream-50 px-3.5 text-[13px] text-ink"
        >
          <span className="flex items-center gap-2.5">
            <ListIcon width={15} height={15} className="hidden sm:block" />
            Table of Contents
          </span>
          <ChevronDownIcon width={16} height={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <ol className="mt-1.5 max-h-[60vh] overflow-y-auto rounded-lg border border-line bg-cream-50 p-1.5">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => {
                    onSelect(s.id);
                    setOpen(false);
                  }}
                  className="flex gap-3 rounded-md px-2.5 py-2 text-[12.5px] text-ink-soft hover:bg-cream-200"
                >
                  <span className="w-5 text-muted">{num(i)}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Desktop sidebar */}
      <nav aria-label="Table of contents" className="hidden lg:block">
        <h2 className="mb-3 font-serif text-[18px] text-ink">Table of Contents</h2>
        <ol className="space-y-0.5">
          {sections.map((s, i) => {
            const active = s.id === activeId;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => onSelect(s.id)}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[12.5px] transition-colors ${
                    active ? "bg-sand-200 text-ink" : "text-ink-soft hover:bg-cream-200"
                  }`}
                >
                  <span className="w-5 shrink-0 text-[12px] text-ink">{num(i)}</span>
                  {s.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
