import type { ComponentType, SVGProps } from "react";
import {
  GlobeIcon,
  HelpCircleIcon,
  LockIcon,
  PackageIcon,
  ShieldCheckIcon,
  StoreIcon,
  TruckIcon,
  UserIcon,
} from "../Icons";
import { BoltIcon, CrownIcon, HeadsetIcon } from "./ShippingIcons";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export const HIGHLIGHTS: { icon: IconType; title: string; shortTitle: string; text: string }[] = [
  {
    icon: ShieldCheckIcon,
    title: "Insured Delivery",
    shortTitle: "Insured Delivery",
    text: "All orders are fully insured until they reach you.",
  },
  {
    icon: TruckIcon,
    title: "Real-Time Tracking",
    shortTitle: "Real-Time Tracking",
    text: "Track your order at every step.",
  },
  {
    icon: UserIcon,
    title: "Signature / Secure Handover",
    shortTitle: "Signature Handover",
    text: "For high-value orders, we may require a signature or secure handover.",
  },
  {
    icon: GlobeIcon,
    title: "Global Delivery",
    shortTitle: "Global Delivery",
    text: "We deliver to selected countries worldwide.",
  },
];

export type DeliveryOption = {
  id: string;
  icon: IconType;
  title: string;
  duration: string;
  /** shorter wording used on mobile */
  durationShort: string;
  description: string;
  price: string;
  badge?: string;
};

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "standard",
    icon: TruckIcon,
    title: "Standard Insured Delivery",
    duration: "3 – 5 business days",
    durationShort: "3 – 5 business days",
    description: "Reliable and secure delivery with full insurance coverage.",
    price: "Free on orders over €500",
  },
  {
    id: "express",
    icon: BoltIcon,
    title: "Express Insured Delivery",
    duration: "1 – 2 business days",
    durationShort: "1 – 2 business days",
    description: "Faster delivery for when you need it sooner.",
    price: "From €15",
  },
  {
    id: "priority",
    icon: CrownIcon,
    title: "Priority / Next-Day",
    duration: "Next business day",
    durationShort: "Next day",
    description: "For selected locations and items.",
    price: "From €25",
    badge: "Where available",
  },
  {
    id: "collect",
    icon: StoreIcon,
    title: "Click & Collect",
    duration: "Pick up from our partners",
    durationShort: "Pick up from partners",
    description: "Collect from a SIDRA boutique or authorised partner.",
    price: "Free",
    badge: "Where supported",
  },
];

export const TRACKING_STEPS = [
  "Order confirmed",
  "Preparing your order",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

export type InfoTopic = {
  id: string;
  icon: IconType;
  title: string;
  body: string;
  emphasis?: string;
  link?: { label: string; href: string };
  tracking?: boolean;
  /** only shown in the mobile / tablet accordion */
  faqs?: { q: string; a: string }[];
};

export const INFO_TOPICS: InfoTopic[] = [
  {
    id: "high-value",
    icon: LockIcon,
    title: "High-Value Delivery",
    body: "For higher-value orders, we may require a signature, a secure PIN, or an appointment handover to ensure your jewellery reaches you safely.",
    emphasis: "Your security is our priority.",
  },
  {
    id: "tracking",
    icon: TruckIcon,
    title: "Tracking Your Order",
    body: "You will receive tracking details by email once your order has been dispatched.",
    tracking: true,
  },
  {
    id: "international",
    icon: GlobeIcon,
    title: "International Delivery",
    body: "We deliver to selected countries worldwide. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.",
    link: { label: "View countries we deliver to", href: "/help" },
  },
  {
    id: "split",
    icon: PackageIcon,
    title: "Split Shipments",
    body: "Items in the same order may be shipped separately based on availability.",
  },
  {
    id: "wrong",
    icon: HeadsetIcon,
    title: "If Something Goes Wrong",
    body: "If your package is delayed, marked as delivered but not received, or arrives damaged, our support team is here to help.",
    link: { label: "Contact Support", href: "/help" },
  },
  {
    id: "faq",
    icon: HelpCircleIcon,
    title: "Frequently Asked Questions",
    body: "",
    faqs: [
      {
        q: "When will my order be dispatched?",
        a: "Most orders are dispatched within 1–2 business days. Made-to-order and personalised pieces may take longer.",
      },
      {
        q: "Can I change my delivery address?",
        a: "You can change it before dispatch. Contact support with your order number as soon as possible.",
      },
      {
        q: "Do I need to be home to receive my order?",
        a: "For insured and high-value deliveries a signature is usually required, so please choose an address where someone can receive it.",
      },
    ],
  },
];
