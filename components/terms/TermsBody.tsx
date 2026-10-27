"use client";

import { useState } from "react";
import { KEY_TERMS_ID } from "./termsConstants";
import { TERMS_SECTIONS } from "./termsData";
import { TermsSidebar } from "./TermsSidebar";
import { KeyTerms } from "./KeyTerms";
import { TermsSections } from "./TermsSections";
import { OrdersRightsBanner } from "./OrdersRightsBanner";

/** Holds the shared state between the sidebar and the section accordion. */
export function TermsBody() {
  const [activeId, setActiveId] = useState(KEY_TERMS_ID);
  const [openId, setOpenId] = useState<string | null>(null);

  const select = (id: string) => {
    setActiveId(id);
    if (TERMS_SECTIONS.some((s) => s.id === id)) setOpenId(id);
  };

  const toggle = (id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
    setActiveId(id);
  };

  return (
    <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8 lg:px-10 lg:py-8">
      <TermsSidebar activeId={activeId} onSelect={select} />

      <div className="min-w-0 space-y-6 lg:space-y-8">
        <KeyTerms />
        <TermsSections openId={openId} onToggle={toggle} />
        <OrdersRightsBanner />
      </div>
    </div>
  );
}
