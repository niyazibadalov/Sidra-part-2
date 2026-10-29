import type { ComponentType, SVGProps } from "react";
import {
  FileTextIcon,
  HelpCircleIcon,
  LeafIcon,
  MailIcon,
  RefreshArrowsIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SlidersIcon,
  SparklesIcon,
  UserIcon,
} from "../Icons";
import { BarChartIcon, MegaphoneIcon } from "../cookie-consent/CookieIcons";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export const GLANCE_ID = "cookies-at-a-glance";

export const COOKIE_TYPES: {
  icon: IconType;
  title: string;
  /** two-line title used on the desktop cards */
  titleLines: [string, string];
  text: string;
  status: "Always active" | "Optional";
}[] = [
  {
    icon: SettingsIcon,
    title: "Essential Cookies",
    titleLines: ["Essential", "Cookies"],
    text: "Keep the website secure and working properly.",
    status: "Always active",
  },
  {
    icon: SlidersIcon,
    title: "Preferences Cookies",
    titleLines: ["Preferences", "Cookies"],
    text: "Remember your settings and personal choices.",
    status: "Optional",
  },
  {
    icon: BarChartIcon,
    title: "Analytics Cookies",
    titleLines: ["Analytics", "Cookies"],
    text: "Help us understand how visitors use our website.",
    status: "Optional",
  },
  {
    icon: MegaphoneIcon,
    title: "Marketing Cookies",
    titleLines: ["Marketing", "Cookies"],
    text: "Used to show you relevant content and offers.",
    status: "Optional",
  },
];

export const COOKIE_TABLE: {
  name: string;
  provider: string;
  purpose: string;
  category: string;
  duration: string;
}[] = [
  { name: "sidra_session", provider: "SIDRA", purpose: "Keeps you signed in during your visit", category: "Essential", duration: "Session" },
  { name: "sidra_csrf", provider: "SIDRA", purpose: "Improves security and prevents abuse", category: "Essential", duration: "Session" },
  { name: "sidra_preferences", provider: "SIDRA", purpose: "Saves your language and region", category: "Preferences", duration: "1 year" },
  { name: "_ga", provider: "Google Analytics", purpose: "Helps us understand site usage", category: "Analytics", duration: "2 years" },
  { name: "_gid", provider: "Google Analytics", purpose: "Distinguishes unique visitors", category: "Analytics", duration: "24 hours" },
  { name: "_fbp", provider: "Meta (Facebook)", purpose: "Used for marketing and ad measurement", category: "Marketing", duration: "3 months" },
  { name: "_gcl_au", provider: "Google Ads", purpose: "Used for marketing and conversion tracking", category: "Marketing", duration: "3 months" },
];

export type CookieSection = {
  /** key used for open state and sidebar links */
  id: string;
  title: string;
  navLabel: string;
  icon: IconType;
  body: string[];
  bullets?: string[];
};

export const COOKIE_SECTIONS: CookieSection[] = [
  {
    id: "what-cookies-are",
    title: "What Cookies Are",
    navLabel: "What Cookies Are",
    icon: HelpCircleIcon,
    body: [
      "Cookies are small text files placed on your device when you visit a website. They help the site remember who you are, keep it secure and understand how it is used.",
    ],
  },
  {
    id: "types-of-cookies",
    title: "Types of Cookies",
    navLabel: "Types of Cookies",
    icon: SlidersIcon,
    body: ["SIDRA uses four categories of cookies:"],
    bullets: [
      "Essential: required for sign-in, your bag and checkout security. They are always active.",
      "Preferences: remember your language, region and display choices.",
      "Analytics: help us understand how visitors use SIDRA so we can improve it.",
      "Marketing: show relevant content and offers and measure campaigns.",
    ],
  },
  {
    id: "cookie-details",
    title: "Cookie Details",
    navLabel: "Cookie Details",
    icon: FileTextIcon,
    body: ["Below are some of the cookies we use on SIDRA. This list may be updated from time to time."],
  },
  {
    id: "similar-technologies",
    title: "Similar Technologies",
    navLabel: "Similar Technologies",
    icon: SparklesIcon,
    body: [
      "We also use technologies that work like cookies, such as local storage, pixels and software development kits (SDKs). They are covered by this policy and follow the same consent choices.",
    ],
  },
  {
    id: "how-we-use-cookies",
    title: "How We Use Cookies",
    navLabel: "How We Use Cookies",
    icon: SettingsIcon,
    body: ["We use cookies to:"],
    bullets: [
      "keep you signed in and protect your account and payments;",
      "remember your settings, such as language and region;",
      "measure and improve how our website performs;",
      "show you relevant content and offers, only with your consent.",
    ],
  },
  {
    id: "managing-preferences",
    title: "Managing Your Preferences",
    navLabel: "Managing Your Preferences",
    icon: UserIcon,
    body: [
      "We do not activate non-essential cookies before you give consent. You can change or withdraw your choices at any time using Manage Cookie Preferences on this page or in the footer.",
    ],
  },
  {
    id: "browser-controls",
    title: "Browser Controls",
    navLabel: "Browser Controls",
    icon: ShieldCheckIcon,
    body: [
      "Most browsers let you block or delete cookies in their settings. Blocking essential cookies may stop parts of SIDRA, such as sign-in and checkout, from working properly.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    navLabel: "Changes to This Policy",
    icon: RefreshArrowsIcon,
    body: [
      "We may update this policy from time to time. The date at the top of the page shows when it was last changed. If we make important changes we will ask for your consent again where required.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    navLabel: "Contact Us",
    icon: MailIcon,
    body: ["Questions about cookies? Email privacy@sidra.to or contact our support team."],
  },
];

export const SIDEBAR_GLANCE = { id: GLANCE_ID, label: "Cookies at a Glance", icon: LeafIcon };
