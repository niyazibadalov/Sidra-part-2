import type { ComponentType, SVGProps } from "react";
import {
  AlertCircleIcon,
  EyeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  HandIcon,
  HeartIcon,
  PencilIcon,
  ShieldCheckIcon,
  TrashIcon,
  XCircleIcon,
} from "../Icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export const GLANCE: { icon: IconType; title: string; text: string; short: string }[] = [
  {
    icon: FileTextIcon,
    title: "Data Minimisation",
    text: "We collect only what we need for a better experience.",
    short: "We collect only what we need.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Processing",
    text: "Your data is protected with industry-standard security.",
    short: "Your data is protected.",
  },
  {
    icon: HeartIcon,
    title: "Choice & Control",
    text: "You decide how your data is used and for what purposes.",
    short: "You decide how your data is used.",
  },
  {
    icon: EyeIcon,
    title: "Transparency",
    text: "We are clear about how we handle your information.",
    short: "We are clear about how we handle your information.",
  },
];

export const RIGHTS: { icon: IconType; title: string; text: string }[] = [
  { icon: EyeIcon, title: "Access", text: "Your data" },
  { icon: PencilIcon, title: "Correction", text: "Update your data" },
  { icon: TrashIcon, title: "Deletion", text: "Request removal" },
  { icon: HandIcon, title: "Restriction", text: "Limit processing" },
  { icon: ExternalLinkIcon, title: "Portability", text: "Get your data" },
  { icon: XCircleIcon, title: "Objection", text: "Opt out of processing" },
  { icon: ShieldCheckIcon, title: "Withdraw Consent", text: "Revoke consent" },
  { icon: AlertCircleIcon, title: "Lodge a Complaint", text: "With supervisory authority" },
];

export type PrivacySection = {
  id: string;
  title: string;
  summary: string;
  body: string[];
};

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: "who-we-are",
    title: "Who We Are / Data Controller",
    summary:
      "SIDRA Marketplace is the data controller of your personal information. We are responsible for determining the purposes and means of processing your data in accordance with applicable data protection laws, including the GDPR.",
    body: [
      "SIDRA Marketplace is the data controller of your personal information. We are responsible for determining the purposes and means of processing your data in accordance with applicable data protection laws, including the GDPR and the Turkish Personal Data Protection Law (KVKK).",
      "Independent jewellery sellers on SIDRA act as separate controllers for the data they need to fulfil your order. You can reach us at privacy@sidra.to.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    summary:
      "We collect information you provide directly, information about your activity on our platform, and technical information about your device and usage.",
    body: [
      "Information you provide: name, email address, phone number, delivery and billing addresses, and messages you send to our support team.",
      "Order and payment information: items purchased, order history and payment status. Card details are handled by our payment partners and are never stored by SIDRA.",
      "Activity and device data: pages viewed, searches, wishlist items, IP address, browser type and device identifiers.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    summary:
      "We use your data to provide and improve our services, process orders, communicate with you, and for marketing (with your consent).",
    body: [
      "To create and manage your account, process orders and payments, arrange delivery and handle returns.",
      "To provide customer support, prevent fraud and keep the marketplace secure.",
      "To improve our website, personalise recommendations and measure how our services perform.",
      "To send marketing communications, only where you have given consent. You can withdraw it at any time.",
    ],
  },
  {
    id: "legal-bases",
    title: "Legal Bases for Processing",
    summary:
      "We process your data based on consent, contract performance, legal obligations, legitimate interests and other applicable legal grounds.",
    body: [
      "Contract performance: to deliver the orders and services you request.",
      "Legal obligations: for example tax, accounting and consumer protection requirements.",
      "Legitimate interests: to secure our platform, prevent fraud and improve our services, balanced against your rights.",
      "Consent: for optional cookies and marketing messages. Consent can be withdrawn at any time.",
    ],
  },
  {
    id: "who-we-share-with",
    title: "Who We Share Data With",
    summary:
      "We may share your data with trusted service providers, payment processors, logistics partners and other third parties necessary to operate our marketplace.",
    body: [
      "Sellers, so they can prepare and ship your order and handle returns.",
      "Payment processors, delivery and logistics partners, and fraud-prevention providers.",
      "IT, analytics and customer-support service providers acting on our instructions.",
      "Authorities, where we are legally required to disclose information. We never sell your personal data.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    summary:
      "Your data may be transferred outside your country. We use appropriate safeguards to keep it protected.",
    body: [
      "Some of our partners are located outside your country of residence, including outside the EEA and Türkiye.",
      "Where this happens we rely on safeguards such as standard contractual clauses and adequacy decisions, and we require partners to protect your data to the same standard.",
    ],
  },
  {
    id: "retention",
    title: "How Long We Keep Data",
    summary:
      "We keep personal data only as long as needed for the purposes described here or as required by law.",
    body: [
      "Account data is kept while your account is active. Order and invoice records are retained for the period required by tax and commercial law.",
      "Support messages are kept for up to 3 years. Marketing data is kept until you withdraw consent. After these periods data is deleted or anonymised.",
    ],
  },
  {
    id: "security",
    title: "Security",
    summary:
      "We protect your data with encryption, access controls and regular security reviews.",
    body: [
      "We use encryption in transit, access controls, monitoring and regular reviews to protect your information.",
      "No system is completely secure. Please keep your password private and contact us if you suspect unauthorised access to your account.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Similar Technologies",
    summary:
      "We use cookies to make SIDRA work, remember your preferences and understand how the site is used.",
    body: [
      "Essential cookies keep you signed in and your bag working. Preference, analytics and marketing cookies are optional and only used with your consent.",
      "You can change your choices at any time from Manage Cookie Preferences, or read our Cookie Policy for details.",
    ],
  },
  {
    id: "automated-decisions",
    title: "Automated Decision-Making",
    summary:
      "We do not make decisions that have legal or similarly significant effects on you solely by automated means.",
    body: [
      "We use automated tools for fraud prevention and product recommendations. These do not produce legal effects on you, and a person reviews any case where an order is blocked.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    summary:
      "You can access, correct, delete, restrict or port your data, object to processing and withdraw consent at any time.",
    body: [
      "You have the right to access your data, correct it, request deletion, restrict or object to processing, receive a portable copy and withdraw consent.",
      "To exercise a right, use Submit a Privacy Request on this page. We aim to respond within 30 days. You may also lodge a complaint with your local supervisory authority.",
    ],
  },
  {
    id: "marketing-preferences",
    title: "Marketing Preferences",
    summary:
      "You choose whether to receive offers, news and recommendations from SIDRA.",
    body: [
      "We only send marketing messages with your consent. Use Manage Marketing Preferences or the unsubscribe link in any email to change your choices.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    summary: "SIDRA is not intended for people under 18 and we do not knowingly collect their data.",
    body: [
      "You must be at least 18 years old to create an account. If you believe a child has given us personal data, contact us and we will delete it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this Policy",
    summary: "We may update this policy from time to time and will show the date of the latest update.",
    body: [
      "When we make important changes we will notify you by email or on the site. The date at the top of this page shows when the policy was last updated.",
    ],
  },
  {
    id: "contact",
    title: "Contact the Privacy Team",
    summary: "Questions or requests about your data? Our privacy team is happy to help.",
    body: [
      "Email privacy@sidra.to or use Submit a Privacy Request. Please include your account email so we can verify your identity.",
    ],
  },
];
