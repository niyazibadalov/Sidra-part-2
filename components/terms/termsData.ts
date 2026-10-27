import type { ComponentType, SVGProps } from "react";
import {
  AlertCircleIcon,
  BadgeCheckIcon,
  CompassIcon,
  CreditCardIcon,
  FileTextIcon,
  MailIcon,
  MessageCircleIcon,
  PackageIcon,
  PencilIcon,
  RefreshArrowsIcon,
  ReturnBoxIcon,
  RotateCcwIcon,
  SearchIcon,
  ShieldCheckIcon,
  ShieldIcon,
  SparklesIcon,
  StoreIcon,
  TruckIcon,
  UserIcon,
  XCircleIcon,
} from "../Icons";
import { TagIcon } from "./TermsIcons";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export const KEY_TERMS: { icon: IconType; title: string; text: string }[] = [
  {
    icon: StoreIcon,
    title: "Marketplace Role",
    text: "SIDRA is a marketplace connecting buyers with independent jewellery sellers.",
  },
  {
    icon: TagIcon,
    title: "Clear Pricing",
    text: "All prices, taxes and fees are shown transparently before you checkout.",
  },
  {
    icon: PackageIcon,
    title: "Returns & Withdrawal",
    text: "You may have a 14-day right of withdrawal (with some exceptions).",
  },
  {
    icon: ShieldCheckIcon,
    title: "Buyer Protection",
    text: "We're here to support you if something isn't right.",
  },
];

export type TermsSection = {
  id: string;
  /** full heading shown in the content */
  title: string;
  /** shorter label used in the sidebar */
  navLabel: string;
  icon: IconType;
  body: string[];
};

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "who-we-are",
    title: "Who We Are & Platform Role",
    navLabel: "Who We Are",
    icon: UserIcon,
    body: [
      "SIDRA operates an online marketplace that connects buyers with independent jewellery sellers. We do not own the products listed by sellers unless explicitly stated. Contracts for purchases are between you and the seller.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility & Accounts",
    navLabel: "Eligibility & Accounts",
    icon: BadgeCheckIcon,
    body: [
      "You must be at least 18 years old (or the age of majority in your country) to create an account and make purchases on SIDRA. You are responsible for keeping your account information secure.",
    ],
  },
  {
    id: "seller-status",
    title: "Seller Status & Marketplace Sellers",
    navLabel: "Seller Status",
    icon: SearchIcon,
    body: [
      "Our marketplace includes professional traders (businesses) and, in some cases, private sellers. The seller's status is clearly indicated on each product page. Your rights, including withdrawal and legal guarantee rights, may vary depending on the seller's status.",
    ],
  },
  {
    id: "product-listings",
    title: "Product Listings & Availability",
    navLabel: "Product Listings",
    icon: FileTextIcon,
    body: [
      "Sellers are responsible for the accuracy of product information, including descriptions, images, materials and availability. We make reasonable efforts to ensure information is accurate but do not guarantee that all listings are error-free.",
    ],
  },
  {
    id: "orders-contract",
    title: "Orders & Contract Formation",
    navLabel: "Orders & Contract",
    icon: PackageIcon,
    body: [
      "Placing an order is an offer to buy. A binding contract is formed when the seller confirms the order or dispatches the item. You will receive an order confirmation by email.",
    ],
  },
  {
    id: "pricing",
    title: "Pricing, Taxes & Fees",
    navLabel: "Pricing, Taxes & Fees",
    icon: TagIcon,
    body: [
      "Prices are shown in the selected currency and include applicable taxes unless stated otherwise. Delivery costs and any fees are displayed before you confirm your order. International orders may be subject to customs duties.",
    ],
  },
  {
    id: "payments",
    title: "Payments",
    navLabel: "Payments",
    icon: CreditCardIcon,
    body: [
      "Payments are processed by trusted third-party providers. By placing an order you confirm you are authorised to use the chosen payment method. We may delay or cancel an order if we suspect fraud.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    navLabel: "Shipping & Delivery",
    icon: TruckIcon,
    body: [
      "Delivery times are estimates and depend on the seller, carrier and destination. Jewellery shipments are insured, and a signature may be required for high-value orders. See our Shipping & Delivery page for details.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation & 14-Day Right of Withdrawal",
    navLabel: "Cancellation / 14-Day Right",
    icon: RotateCcwIcon,
    body: [
      "If you buy from a professional trader you may withdraw from your purchase within 14 days of receiving the item, without giving a reason. Exceptions apply, for example for personalised items made to your specification.",
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    navLabel: "Returns & Refunds",
    icon: ReturnBoxIcon,
    body: [
      "Returned items must be unworn and in their original condition and packaging. Refunds are issued to the original payment method after the item has been received and checked, usually within 5–10 business days.",
    ],
  },
  {
    id: "legal-guarantee",
    title: "Legal Guarantee",
    navLabel: "Legal Guarantee",
    icon: ShieldCheckIcon,
    body: [
      "Where you buy from a professional trader, the item must conform to the contract. If it does not, you may be entitled to repair, replacement, price reduction or a refund under the statutory legal guarantee in your country.",
    ],
  },
  {
    id: "personalised",
    title: "Personalised Jewellery",
    navLabel: "Personalised Jewellery",
    icon: PencilIcon,
    body: [
      "Engraved, resized or made-to-order pieces are created specifically for you and may not be eligible for withdrawal or return, unless they arrive faulty or not as described.",
    ],
  },
  {
    id: "buyer-protection",
    title: "Buyer Protection",
    navLabel: "Buyer Protection",
    icon: ShieldIcon,
    body: [
      "If an item does not arrive, arrives damaged or is not as described, contact us within the reporting period shown in your order. We will help you reach a fair outcome with the seller.",
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited Conduct",
    navLabel: "Prohibited Conduct",
    icon: XCircleIcon,
    body: [
      "You may not use SIDRA for unlawful or fraudulent purposes, post misleading content, interfere with the platform, or attempt to bypass our payment and security systems.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    navLabel: "Intellectual Property",
    icon: SparklesIcon,
    body: [
      "The SIDRA name, logo and platform content are protected. Product images and descriptions belong to their respective sellers or owners and may not be copied or reused without permission.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    navLabel: "Liability",
    icon: AlertCircleIcon,
    body: [
      "To the extent permitted by law, SIDRA is not liable for indirect or consequential losses. Nothing in these terms limits your mandatory consumer rights or liability that cannot be excluded by law.",
    ],
  },
  {
    id: "disputes",
    title: "Dispute Resolution",
    navLabel: "Dispute Resolution",
    icon: MessageCircleIcon,
    body: [
      "If you have a problem, please contact our support team first so we can try to resolve it. You may also use available consumer dispute-resolution bodies in your country.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    navLabel: "Governing Law",
    icon: CompassIcon,
    body: [
      "These terms are governed by the laws of the Republic of Türkiye. This does not remove the mandatory consumer protection rules of the country where you live.",
    ],
  },
  {
    id: "changes",
    title: "Changes to Terms",
    navLabel: "Changes to Terms",
    icon: RefreshArrowsIcon,
    body: [
      "We may update these terms from time to time. The date at the top of this page shows the latest update. Changes do not affect orders you have already placed.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    navLabel: "Contact Us",
    icon: MailIcon,
    body: [
      "Questions about these terms? Email support@sidra.to or visit the Help Center and our team will be happy to help.",
    ],
  },
];
