"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type ReactNode } from "react";

import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// İkonlar
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckIcon,
  CloseIcon,
  CreditCardIcon,
  DiamondIcon,
  MailIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  PackageIcon,
  RefreshArrowsIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UserIcon,
} from "@/components/Icons";

import {
  CalendarIcon,
  ImageUploadIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./SupportIcons";

import { PageHero } from "./PageHero";  

import heroImg from "@/app/images/bagFullHero.png";
import assistImg from "@/app/images/giftBanner2.png";

/* ---------------------------------- data ---------------------------------- */

type Channel = {
  title: string;
  lines: string[];
  icon: typeof PhoneIcon;
  cta: string;
  href: string;
  primary?: boolean;
  wide?: boolean;
  chat?: boolean;
};

const CHANNELS: Channel[] = [
  {
    title: "Live Chat",
    lines: ["Chat with our support team in real time."],
    icon: MessageCircleIcon,
    cta: "Start Chat",
    href: "#message-form",
    primary: true,
    chat: true,
  },
  {
    title: "Call Us",
    lines: ["+90 850 309 77 77", "Mon – Sun", "09:00 – 21:00 (TRT)"],
    icon: PhoneIcon,
    cta: "Call Now",
    href: "tel:+908503097777",
  },
  {
    title: "Email",
    lines: ["support@sidra.to", "We typically reply within 12 hours."],
    icon: MailIcon,
    cta: "Send Email",
    href: "mailto:support@sidra.to",
  },
  {
    title: "WhatsApp",
    lines: ["+90 530 309 77 77", "Mon – Sun", "09:00 – 21:00 (TRT)"],
    icon: WhatsAppIcon,
    cta: "Chat on WhatsApp",
    href: "https://wa.me/905303097777",
  },
  {
    title: "Book an Appointment",
    lines: ["Need personalized advice? Schedule a call with our jewellery expert."],
    icon: CalendarIcon,
    cta: "Book Now",
    href: "/appointment",
    wide: true,
  },
];

const CATEGORIES = [
  { label: "Order & Delivery", desc: "Track orders, shipping questions, delivery issues", icon: PackageIcon },
  { label: "Returns & Refunds", desc: "Return items, exchange process, refund status", icon: RefreshArrowsIcon },
  { label: "Payment & Billing", desc: "Payment issues, invoices, promotions", icon: CreditCardIcon },
  { label: "Product & Authenticity", desc: "Product details, certificates, authenticity, sizing", icon: DiamondIcon },
  { label: "Account & Security", desc: "Login, account settings, verification", icon: UserIcon },
  { label: "Other", desc: "Any other questions", icon: MoreHorizontalIcon },
];

type RequestStatus = "In Progress" | "Replied" | "Closed";

const REQUESTS: { id: string; title: string; text: string; date: string; status: RequestStatus }[] = [
  {
    id: "#SIDRA-45821",
    title: "Return request for diamond ring",
    text: "I would like to return my order and get a refund.",
    date: "Oct 10, 2026",
    status: "In Progress",
  },
  {
    id: "#SIDRA-44677",
    title: "Order not delivered",
    text: "My package is delayed. Can you check the status?",
    date: "Oct 5, 2026",
    status: "Replied",
  },
  {
    id: "#SIDRA-44011",
    title: "Payment issue",
    text: "My payment was declined. I need help.",
    date: "Sep 28, 2026",
    status: "Closed",
  },
];

const STATUS_STYLES: Record<RequestStatus, string> = {
  "In Progress": "bg-amber-100 text-amber-800",
  Replied: "bg-emerald-100 text-emerald-800",
  Closed: "bg-cream-200 text-ink-soft",
};

const FAQS = [
  {
    q: "How can I track my order?",
    a: "Open My Orders in your account and select Track Order, or use the tracking link in your dispatch email.",
  },
  {
    q: "What is your return policy?",
    a: "Eligible pieces can be returned within 30 days in their original, unworn condition. Custom or engraved items may not be returnable.",
  },
  {
    q: "How long does a refund take?",
    a: "Refunds are issued to your original payment method within 5–10 business days after we receive and inspect your return.",
  },
  {
    q: "Are the products authentic?",
    a: "Yes. Every piece is sold by a verified brand and comes with its certificate of authenticity where applicable.",
  },
  {
    q: "How can I change my delivery address?",
    a: "You can change the address before your order is dispatched. Contact support with your order number as soon as possible.",
  },
];

const MAX_MESSAGE = 1000;
const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

/* ------------------------------ small helpers ------------------------------ */

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-white p-4 sm:p-5 lg:p-6 ${className}`}>
      {children}
    </section>
  );
}

/** Heading row. On mobile it behaves like an accordion toggle, from md up it is static. */
function CardHeader({
  title,
  open,
  onToggle,
  action,
}: {
  title: string;
  open?: boolean;
  onToggle?: () => void;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex flex-1 cursor-pointer items-center justify-between text-left md:pointer-events-none md:flex-none"
        >
          <h2 className="font-serif text-xl text-ink sm:text-[22px]">{title}</h2>
          <ChevronRightIcon
            width={18}
            height={18}
            className={`text-ink transition-transform md:hidden ${open ? "rotate-90" : ""}`}
          />
        </button>
      ) : (
        <h2 className="font-serif text-xl text-ink sm:text-[22px]">{title}</h2>
      )}
      {action}
    </div>
  );
}

function ViewAll({ href, label = "View All" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="hidden shrink-0 items-center gap-1.5 text-[12.5px] text-ink underline-offset-2 hover:underline md:flex"
    >
      {label}
      <ArrowRightIcon width={14} height={14} />
    </Link>
  );
}

/* --------------------------------- sections -------------------------------- */

function ChannelCard({ c }: { c: Channel }) {
  const Icon = c.icon;
  return (
    <li
      className={`relative border-b border-line py-3.5 last:border-b-0 md:flex md:flex-col md:justify-between md:rounded-2xl md:border md:bg-white md:p-4 md:last:border-b ${
        c.wide ? "md:max-xl:col-span-2 md:max-xl:flex-row md:max-xl:items-center md:max-xl:gap-4" : ""
      }`}
    >
      {/* Whole row is tappable on mobile */}
      <a href={c.href} aria-label={c.title} className="absolute inset-0 z-10 md:hidden" />

      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#fbe9d8] text-rose-gold-dark">
          <Icon width={22} height={22} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[17px] leading-tight text-ink">{c.title}</h3>
          {c.lines.map((l, i) => (
            <p
              key={l}
              className={`${i === 0 && !c.wide && c.title !== "Live Chat" ? "mt-0.5 text-[13px] font-medium text-ink" : "mt-0.5 text-[12px] text-muted"}`}
            >
              {l}
            </p>
          ))}
          {c.chat && (
            <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-emerald-700 xl:hidden">
              <span className="size-1.5 rounded-full bg-emerald-500" /> Online now
            </p>
          )}
        </div>
        <ChevronRightIcon width={18} height={18} className="shrink-0 self-center text-ink md:hidden" />
      </div>

      <div className={`hidden md:block ${c.wide ? "md:max-xl:shrink-0" : ""}`}>
        <a
          href={c.href}
          target={c.href.startsWith("http") ? "_blank" : undefined}
          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={`mt-4 flex h-10 items-center justify-center gap-2 rounded-full px-5 text-[13px] font-medium transition-colors md:max-xl:mt-0 ${
            c.primary
              ? "bg-ink text-white hover:bg-ink-soft"
              : "border border-ink/70 text-ink hover:bg-cream-200"
          }`}
        >
          {c.cta}
          {c.primary && <ArrowRightIcon width={14} height={14} />}
        </a>
        {c.chat && (
          <p className="mt-2 hidden items-center gap-1.5 text-[11.5px] text-muted xl:flex">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Usually replies in minutes
          </p>
        )}
      </div>
    </li>
  );
}

type FormErrors = { subject?: string; message?: string; files?: string };

/* ----------------------------------- page ---------------------------------- */

export function ContactSupportPage() {
  const [subject, setSubject] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sentTicket, setSentTicket] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({ message: true });
  const fileInput = useRef<HTMLInputElement>(null);

  const toggle = (key: string) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const pickCategory = (label: string) => {
    setSubject(label);
    setErrors((e) => ({ ...e, subject: undefined }));
    setOpen((o) => ({ ...o, message: true }));
    // wait a tick so the (possibly collapsed) form is rendered before scrolling
    requestAnimationFrame(() =>
      document.getElementById("message-form")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const addFiles = (incoming: FileList | File[]) => {
    const next = [...files];
    let problem: string | undefined;
    for (const f of Array.from(incoming)) {
      if (!ALLOWED_TYPES.includes(f.type)) problem = `"${f.name}" is not supported. Use JPG, PNG or PDF.`;
      else if (f.size > MAX_FILE_BYTES) problem = `"${f.name}" is larger than 10 MB.`;
      else if (next.length >= MAX_FILES) problem = `You can attach up to ${MAX_FILES} files.`;
      else next.push(f);
    }
    setFiles(next);
    setErrors((e) => ({ ...e, files: problem }));
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: FormErrors = {};
    if (!subject) next.subject = "Please select a subject.";
    if (!message.trim()) next.message = "Please tell us how we can help.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: replace with the real support API call.
    setSentTicket(`#SIDRA-${Math.floor(46000 + Math.random() * 1000)}`);
    setSubject("");
    setOrderNumber("");
    setMessage("");
    setFiles([]);
  };

  const fieldBase =
    "w-full rounded-xl border bg-cream-50 px-3.5 text-[13px] text-ink placeholder:text-muted/70 focus:border-sand-400 focus:bg-white focus:outline-none";

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-cream-100">
      <TopBar showOnMobile />
      <Header hideMobileTagline />

      <main className="flex-1">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Help Center", href: "/help" }, { label: "Contact Support" }]}
          title="Contact Support"
          tagline="We're here to help."
          description="Our team is ready to assist you with orders, returns, payments, products and any other questions. Get fast, reliable support from SIDRA."
          image={heroImg}
        />

        <div className="mx-auto max-w-360 space-y-4 px-4 py-4 sm:px-6 sm:py-6 lg:space-y-5 lg:px-10 lg:py-8">
          {/* Contact channels */}
          <ul
            aria-label="Ways to contact us"
            className="rounded-2xl border border-line bg-white px-4 md:grid md:grid-cols-2 md:gap-3 md:border-0 md:bg-transparent md:p-0 xl:grid-cols-5"
          >
            {CHANNELS.map((c) => (
              <ChannelCard key={c.title} c={c} />
            ))}
          </ul>

          {/* Categories */}
          <Card>
            <CardHeader title="What can we help with?" action={<ViewAll href="/help" label="View all help articles" />} />
            <p className="mt-1 hidden text-[13px] text-muted xl:block">
              Choose a category to find the right support or browse our help articles.
            </p>
            <ul className="mt-3 divide-y divide-line md:mt-4 md:grid md:grid-cols-2 md:gap-3 md:divide-y-0 xl:grid-cols-6">
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label}>
                    <button
                      type="button"
                      onClick={() => pickCategory(c.label)}
                      className="flex w-full cursor-pointer items-center gap-3 py-3 text-left transition-colors md:rounded-xl md:bg-cream-100 md:px-3 md:py-2.5 md:hover:bg-cream-200 xl:h-full xl:flex-col xl:justify-start xl:gap-2 xl:px-3 xl:py-5 xl:text-center"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full text-ink-soft md:size-9 md:bg-[#fbe9d8] md:text-rose-gold-dark xl:size-11">
                        <Icon width={18} height={18} />
                      </span>
                      <span className="flex-1 xl:flex-none">
                        <span className="block text-[13.5px] text-ink xl:font-serif xl:text-[15px]">{c.label}</span>
                        <span className="mt-1 hidden text-[11.5px] leading-snug text-muted xl:block">{c.desc}</span>
                      </span>
                      <ChevronRightIcon width={16} height={16} className="shrink-0 text-ink md:hidden" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <div className="grid gap-4 lg:gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            {/* Send a message */}
            <Card>
              <div id="message-form" className="scroll-mt-28">
                <CardHeader title="Send a Message" open={open.message} onToggle={() => toggle("message")} />

                <div className={`${open.message ? "block" : "hidden"} md:block`}>
                  {sentTicket ? (
                    <div role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-[13px] text-emerald-900">
                      <p className="flex items-center gap-2 font-medium">
                        <CheckIcon width={16} height={16} /> Message sent
                      </p>
                      <p className="mt-1">
                        Thank you. Your request {sentTicket} has been received. We typically reply within 12 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSentTicket(null)}
                        className="mt-3 cursor-pointer text-[12.5px] underline underline-offset-2"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} noValidate className="mt-4 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="subject" className="mb-1.5 block text-[12px] font-medium text-ink">
                            Subject <span className="text-red-600">*</span>
                          </label>
                          <div className="relative">
                            <select
                              id="subject"
                              value={subject}
                              onChange={(e) => {
                                setSubject(e.target.value);
                                setErrors((x) => ({ ...x, subject: undefined }));
                              }}
                              aria-invalid={!!errors.subject}
                              aria-describedby={errors.subject ? "subject-error" : undefined}
                              className={`${fieldBase} h-11 appearance-none pr-9 ${errors.subject ? "border-red-400" : "border-line"} ${subject ? "" : "text-muted/80"}`}
                            >
                              <option value="">Select a subject</option>
                              {CATEGORIES.map((c) => (
                                <option key={c.label} value={c.label}>
                                  {c.label}
                                </option>
                              ))}
                            </select>
                            <ChevronDownIcon
                              width={16}
                              height={16}
                              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink"
                            />
                          </div>
                          {errors.subject && (
                            <p id="subject-error" className="mt-1 text-[11.5px] text-red-600">
                              {errors.subject}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="order" className="mb-1.5 block text-[12px] font-medium text-ink">
                            Order Number <span className="font-normal text-muted">(optional)</span>
                          </label>
                          <input
                            id="order"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            placeholder="e.g. #SIDRA12345"
                            className={`${fieldBase} h-11 border-line`}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label htmlFor="message" className="mb-1.5 block text-[12px] font-medium text-ink">
                            Message <span className="text-red-600">*</span>
                          </label>
                          <textarea
                            id="message"
                            value={message}
                            maxLength={MAX_MESSAGE}
                            onChange={(e) => {
                              setMessage(e.target.value);
                              setErrors((x) => ({ ...x, message: undefined }));
                            }}
                            aria-invalid={!!errors.message}
                            placeholder="Tell us how we can help you..."
                            rows={4}
                            className={`${fieldBase} resize-none py-3 ${errors.message ? "border-red-400" : "border-line"}`}
                          />
                          <div className="mt-1 flex justify-between text-[11.5px]">
                            <span className="text-red-600">{errors.message}</span>
                            <span className="text-muted">
                              {message.length}/{MAX_MESSAGE}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="mb-1.5 text-[12px] font-medium text-ink">
                            Attach Files <span className="font-normal text-muted">(optional)</span>
                          </p>
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragging(true);
                            }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={onDrop}
                            onClick={() => fileInput.current?.click()}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInput.current?.click()}
                            className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed px-4 py-5 text-center transition-colors ${
                              dragging ? "border-rose-gold bg-cream-200" : "border-sand-400 bg-cream-50 hover:bg-cream-100"
                            }`}
                          >
                            <span className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
                              <ImageUploadIcon width={18} height={18} />
                              Drag and drop files here, or click to upload
                            </span>
                            <span className="text-[11px] text-muted">Supported formats: JPG, PNG, PDF (Max 10 MB)</span>
                          </div>
                          <input
                            ref={fileInput}
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={onFileChange}
                            className="hidden"
                          />
                          {errors.files && <p className="mt-1.5 text-[11.5px] text-red-600">{errors.files}</p>}
                          {files.length > 0 && (
                            <ul className="mt-2 space-y-1.5">
                              {files.map((f, i) => (
                                <li
                                  key={`${f.name}-${i}`}
                                  className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] text-ink-soft"
                                >
                                  <span className="truncate">{f.name}</span>
                                  <button
                                    type="button"
                                    aria-label={`Remove ${f.name}`}
                                    onClick={() => setFiles((all) => all.filter((_, idx) => idx !== i))}
                                    className="ml-3 cursor-pointer text-muted hover:text-ink"
                                  >
                                    <CloseIcon width={14} height={14} />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink text-[13.5px] font-medium text-white transition-colors hover:bg-ink-soft active:scale-[0.99]"
                      >
                        Send Message <ArrowRightIcon width={15} height={15} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </Card>

            <div className="space-y-4 lg:space-y-5">
              {/* Support requests */}
              <Card>
                <CardHeader
                  title="Your Support Requests"
                  open={open.requests}
                  onToggle={() => toggle("requests")}
                  action={<ViewAll href="/account/support" />}
                />
                <ul className={`${open.requests ? "block" : "hidden"} mt-3 space-y-2.5 md:block`}>
                  {REQUESTS.map((r) => (
                    <li
                      key={r.id}
                      className="grid grid-cols-[auto_1fr_auto] items-start gap-x-3 rounded-xl border border-line px-3 py-2.5"
                    >
                      <div className="text-[11.5px]">
                        <p className="font-medium text-ink">{r.id}</p>
                        <p className="text-muted">{r.date}</p>
                      </div>
                      <div className="min-w-0 text-[11.5px]">
                        <p className="truncate font-medium text-ink">{r.title}</p>
                        <p className="truncate text-muted">{r.text}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-medium whitespace-nowrap ${STATUS_STYLES[r.status]}`}>
                        {r.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader
                  title="Frequently Asked Questions"
                  open={open.faq}
                  onToggle={() => toggle("faq")}
                  action={<ViewAll href="/help" label="View all FAQs" />}
                />
                <ul className={`${open.faq ? "block" : "hidden"} mt-2 divide-y divide-line md:block`}>
                  {FAQS.map((f) => (
                    <li key={f.q}>
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-2.5 text-[13px] text-ink [&::-webkit-details-marker]:hidden">
                          {f.q}
                          <ChevronDownIcon
                            width={15}
                            height={15}
                            className="shrink-0 transition-transform group-open:rotate-180"
                          />
                        </summary>
                        <p className="pb-3 text-[12.5px] leading-relaxed text-muted">{f.a}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Personal assistance */}
          <section className="relative isolate overflow-hidden rounded-2xl border border-line bg-sand-200">
            <Image
              src={assistImg}
              alt=""
              fill
              sizes="(min-width: 1440px) 1360px, 100vw"
              className="-z-20 object-cover object-right"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-sand-200 via-sand-200/85 to-transparent" />
            <div className="grid gap-5 px-5 py-6 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-7">
              <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-6">
                <div>
                  <h2 className="font-serif text-2xl text-ink sm:text-[28px]">Need Personal Assistance?</h2>
                  <p className="mt-1 max-w-sm text-[12.5px] leading-relaxed text-ink-soft">
                    Our jewellery experts can help you find the perfect piece, explain diamond details, or guide you with custom orders.
                  </p>
                </div>
                <Link
                  href="/appointment"
                  className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-6 text-[13px] font-medium text-white transition-colors hover:bg-ink-soft"
                >
                  Book a Consultation <ArrowRightIcon width={14} height={14} />
                </Link>
              </div>
              <ul className="hidden gap-x-8 gap-y-2 text-[12.5px] text-ink-soft lg:grid lg:grid-cols-2">
                <li className="flex items-center gap-2"><SparkleIcon width={16} height={16} /> Expert Advice</li>
                <li className="flex items-center gap-2"><ShieldCheckIcon width={16} height={16} /> Secure &amp; Confidential</li>
                <li className="flex items-center gap-2 col-span-2"><DiamondIcon width={16} height={16} /> Personalized Recommendations</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
