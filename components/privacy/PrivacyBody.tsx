"use client";

import { useState } from "react";
import { PRIVACY_SECTIONS } from "./privacyData";
import { PrivacyToc } from "./PrivacyToc";
import { PrivacyGlance } from "./PrivacyGlance";
import { ManagePrivacy } from "./ManagePrivacy";
import { YourRights } from "./YourRights";
import { PrivacySections } from "./PrivacySections";
import { PrivacyPromo } from "./PrivacyPromo";

export function PrivacyBody() {
  const [activeId, setActiveId] = useState(PRIVACY_SECTIONS[0].id);
  const [openId, setOpenId] = useState<string | null>(PRIVACY_SECTIONS[0].id);
  const [showAll, setShowAll] = useState(false);

  const select = (id: string) => {
    setActiveId(id);
    setOpenId(id);
    setShowAll(true); 
  };

  const toggle = (id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
    setActiveId(id);
  };

  return (
    <div className="mx-auto grid max-w-360 gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8 lg:px-10 lg:py-8">
      <PrivacyToc sections={PRIVACY_SECTIONS} activeId={activeId} onSelect={select} />

      <div className="min-w-0 space-y-4">
        <PrivacyGlance />
        <ManagePrivacy />

        <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start xl:gap-5">
          <aside className="order-1 hidden space-y-4 sm:block xl:order-2">
            <YourRights />
            <PrivacyPromo className="hidden xl:block" />
          </aside>

          <div className="order-2 xl:order-1">
            <PrivacySections
              sections={PRIVACY_SECTIONS}
              openId={openId}
              onToggle={toggle}
              showAll={showAll}
              onShowMore={() => setShowAll(true)}
            />
          </div>
        </div>

        <PrivacyPromo className="xl:hidden" />
      </div>
    </div>
  );
}
