"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { ArrowRightIcon, ChevronDownIcon, ListIcon } from "../Icons";
import { COOKIE_SECTIONS, SIDEBAR_GLANCE } from "./cookieData";

type CookieSidebarProps = {
  activeId: string;
  onSelect: (id: string) => void;
};

export function CookieSidebar({ activeId, onSelect }: CookieSidebarProps) {
  const [open, setOpen] = useState(false);

  const items = [
    { id: SIDEBAR_GLANCE.id, label: SIDEBAR_GLANCE.label, icon: SIDEBAR_GLANCE.icon, prefix: "" },
    ...COOKIE_SECTIONS.map((s, i) => ({ id: s.id, label: s.navLabel, icon: s.icon, prefix: `${i + 1}. ` })),
  ];

  const go = (e: MouseEvent, id: string) => {
    e.preventDefault();
    onSelect(id);
    setOpen(false);
  };

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
                  onClick={(e) => go(e, id)}
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
      <div className="hidden space-y-4 lg:block">
        <nav aria-label="Cookie policy sections">
          <ol className="space-y-0.5">
            {items.map(({ id, label, icon: Icon, prefix }) => {
              const active = id === activeId;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => go(e, id)}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[12.5px] transition-colors ${
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

        <aside className="rounded-xl border border-line bg-cream-50 p-4">
          <h2 className="font-serif text-[17px] text-ink">Need Help?</h2>
          <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
            If you have any questions about our use of cookies, please contact our support team.
          </p>
          <Link
            href="/help"
            className="mt-3 flex h-10 items-center justify-center gap-2 rounded-md border border-ink/60 bg-white text-[12.5px] text-ink transition-colors hover:bg-cream-200"
          >
            Contact Support <ArrowRightIcon width={13} height={13} />
          </Link>
        </aside>
      </div>
    </div>
  );
}
