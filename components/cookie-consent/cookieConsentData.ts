import type { ComponentType, SVGProps } from "react";
import { LockIcon, SlidersIcon } from "../Icons";
import { BarChartIcon, MegaphoneIcon } from "./CookieIcons";
import type { ConsentChoices } from "./cookieConsentStore";

export type ConsentCategory = {
  id: "essential" | keyof ConsentChoices;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  alwaysActive?: boolean;
  /** shown when the row chevron is expanded */
  examples: string;
};

export const CONSENT_CATEGORIES: ConsentCategory[] = [
  {
    id: "essential",
    title: "Essential Cookies",
    description:
      "Required for the website to function properly, such as security, network management and accessibility.",
    icon: LockIcon,
    alwaysActive: true,
    examples: "Examples: sidra_session, sidra_csrf. These keep you signed in and your bag secure.",
  },
  {
    id: "preferences",
    title: "Preferences Cookies",
    description:
      "Remember your settings and personalise your experience (e.g. language, region).",
    icon: SlidersIcon,
    examples: "Examples: sidra_preferences. Saves your language, region and currency.",
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description: "Help us understand how visitors use our website so we can improve it.",
    icon: BarChartIcon,
    examples: "Examples: _ga, _gid (Google Analytics). Used in aggregate to measure site usage.",
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description:
      "Used to show you relevant content and offers, on our site and on other platforms.",
    icon: MegaphoneIcon,
    examples: "Examples: _fbp (Meta), _gcl_au (Google Ads). Used for ad measurement and conversions.",
  },
];
