"use client";

import { useState } from "react";
import { ChevronDownIcon, FileTextIcon, ListIcon } from "../Icons";
import { KEY_TERMS_ID } from "./termsConstants";
import { TERMS_SECTIONS } from "./termsData";

type TermsSidebarProps = {
  activeId: string;
  onSelect: (id: string) => void;
};

export function TermsSidebar({ activeId, onSelect }: TermsSidebarProps) {
  const [open, setOpen] = useState(false);

  const items = [
    { id: KEY_TERMS_ID, label: "Key Terms at a Glance", icon: FileTextIcon, prefix: "" },
    ...TERMS_SECTIONS.map((s, i) => ({ id: s.id, label: s.navLabel, icon: s.icon, prefix: `${i + 1}. ` })),
  ];

  return (
    <div className="lg:sticky lg:top-24 lg:self-start lg:border-r lg:border-line lg:pr-4">
      {/* Tablet / mobile dropdown */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-line bg-cream-50 px-3.5 text-[13px] text-ink"
        >
          <span className="flex items-center gap-3">
            <ListIcon width={16} height={16} />
            Table of Contents
          </span>
          <ChevronDownIcon width={16} height={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <ol className="mt-1.5 max-h-[60vh] overflow-y-auto rounded-lg border border-line bg-cream-50 p-1.5">
            {items.map(({ id, label, prefix }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => {
                    onSelect(id);
                    setOpen(false);
                  }}
                  className="block rounded-md px-3 py-2 text-[12.5px] text-ink-soft hover:bg-cream-200"
                >
                  {prefix}
                  {label}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Desktop sidebar */}
      <nav aria-label="Terms sections" className="hidden max-h-[calc(100vh-7rem)] overflow-y-auto lg:block">
        <ol className="space-y-0.5">
          {items.map(({ id, label, icon: Icon, prefix }) => {
            const active = id === activeId;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => onSelect(id)}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[12.5px] transition-colors ${
                    active ? "bg-sand-200 text-ink" : "text-ink-soft hover:bg-cream-200"
                  }`}
                >
                  <Icon width={15} height={15} className="shrink-0" />
                  <span>
                    {prefix}
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
