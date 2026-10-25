"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CreditCardIcon,
  InfoIcon,
  MapPinIcon,
  StarIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@/components/Icons";
import { useCartWishlist } from "@/context/CartWishlistContext";

import ring1 from "@/app/images/ring1.png";
import ring3 from "@/app/images/ring3.png";
import pearis from "@/app/images/pearis.png";

/* ------------------------------------------------------------------ */
/* Inline Helper Icons                                                 */
/* ------------------------------------------------------------------ */
function CalendarIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ReturnIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">
      <CheckIcon width={10} height={10} className="stroke-[2.5]" />
      Verified Seller
    </span>
  );
}

function FileTextIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function BuildingIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22V12h6v10M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01" />
    </svg>
  );
}

function DollarIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HeadphonesIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type ReviewItem = {
  id: string;
  name: string;
  brand?: string;
  price: number;
  specs?: string;
  image: any;
  quantity: number;
  sku?: string;
};

type ReviewSellerGroup = {
  sellerId: string;
  sellerName: string;
  avatarInitial: string;
  sellerSubtitle?: string;
  location?: string;
  items: ReviewItem[];
  shippingName: string;
  deliveryFee: number;
  itemsSubtotal: number;
  tax: number;
  discount?: number;
  estimatedDelivery?: string;
  returnPolicy?: string;
  returnDays?: number;
};

type AddressData = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  streetAddress?: string;
  apartment?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
  countryLabel?: string;
  phone?: string;
};

type PaymentData = {
  method?: string;
  cardLast4?: string;
  cardholderName?: string;
  expiryDate?: string;
  cardBrand?: string;
};

/* ------------------------------------------------------------------ */
/* Defaults                                                            */
/* ------------------------------------------------------------------ */
const DEFAULT_ADDRESS: AddressData = {
  fullName: "Hüseyin Aliyev",
  streetAddress: "Barbaros Mah. Ihlamur Sok. No:5 D:12",
  city: "Beşiktaş",
  stateProvince: "İstanbul",
  postalCode: "34353",
  countryLabel: "Türkiye",
  phone: "+90 530 000 00 00",
};

const DEFAULT_PAYMENT: PaymentData = {
  method: "card",
  cardLast4: "4242",
  expiryDate: "12/28",
  cardBrand: "visa",
};

const SELLER_SUBTITLES: Record<string, { subtitle: string; location: string }> = {
  "Lumea Jewellery": { subtitle: "Lumea Kuyumculuk Ltd. Şti.", location: "Istanbul, Türkiye" },
  "Aurora Jewellery": { subtitle: "Aurora Mücevherat A.Ş.", location: "Ankara, Türkiye" },
  "Éclat Atelier": { subtitle: "Éclat Design A.Ş.", location: "Izmir, Türkiye" },
  "Volana Fine Studio": { subtitle: "Volana Ltd. Şti.", location: "Bursa, Türkiye" },
};

const DEFAULT_SELLERS: ReviewSellerGroup[] = [
  {
    sellerId: "seller-lumea",
    sellerName: "Lumea Jewellery",
    avatarInitial: "L",
    sellerSubtitle: "Lumea Kuyumculuk Ltd. Şti.",
    location: "Istanbul, Türkiye",
    items: [
      { id: "rev-1", name: "Solitaire Diamond Ring", price: 1250, specs: "18K Gold • Size: 52", image: ring1, quantity: 1, sku: "LUM-DR-001" },
    ],
    shippingName: "Yurtiçi Kargo – Standart",
    deliveryFee: 75,
    itemsSubtotal: 1250,
    tax: Math.round(1250 * 0.2),
    estimatedDelivery: "Oct 15 – Oct 21, 2026",
    returnPolicy: "Unused product can be returned within 7 days.",
    returnDays: 7,
  },
  {
    sellerId: "seller-aurora",
    sellerName: "Aurora Jewellery",
    avatarInitial: "A",
    sellerSubtitle: "Aurora Mücevherat A.Ş.",
    location: "Ankara, Türkiye",
    items: [
      { id: "rev-2", name: "Malachite Clover Necklace", price: 1420, specs: "18K Gold", image: ring3, quantity: 1, sku: "AUR-NC-004" },
      { id: "rev-3", name: "Pearl Drop Earrings", price: 975, specs: "18K Gold", image: pearis, quantity: 1, sku: "AUR-PE-002" },
    ],
    shippingName: "Aras Kargo – Hızlı",
    deliveryFee: 120,
    itemsSubtotal: 2395,
    tax: Math.round(2395 * 0.2),
    discount: 200,
    estimatedDelivery: "Oct 13 – Oct 16, 2026",
    returnPolicy: "Unused product can be returned within 14 days.",
    returnDays: 14,
  },
];

/* ================================================================== */
/* COMPONENT                                                           */
/* ================================================================== */
export function ReviewPage() {
  const { cart } = useCartWishlist();

  const [address, setAddress] = useState<AddressData>(DEFAULT_ADDRESS);
  const [payment, setPayment] = useState<PaymentData>(DEFAULT_PAYMENT);
  const [agreed, setAgreed] = useState(false);

  // Persisted seller data from delivery page
  const [persistedSellers, setPersistedSellers] = useState<any[] | null>(null);

  // Load all persisted data
  useEffect(() => {
    try {
      const savedAddress = localStorage.getItem("sidra_checkout_address");
      if (savedAddress) {
        const p = JSON.parse(savedAddress);
        setAddress((prev) => ({
          ...prev,
          ...p,
          fullName: p.fullName || (p.firstName && p.lastName ? `${p.firstName} ${p.lastName}` : prev.fullName),
          phone: p.phone || (p.phoneNumber ? `${p.phoneCode || ""} ${p.phoneNumber}`.trim() : prev.phone),
        }));
      }

      const savedPayment = localStorage.getItem("sidra_payment_method");
      if (savedPayment) {
        const p = JSON.parse(savedPayment);
        setPayment((prev) => ({ ...prev, ...p }));
      }

      const savedDelivery = localStorage.getItem("sidra_delivery_summary");
      if (savedDelivery) {
        const p = JSON.parse(savedDelivery);
        if (p?.sellers && Array.isArray(p.sellers) && p.sellers.length > 0) {
          setPersistedSellers(p.sellers);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Build seller groups for review
  const sellerGroups: ReviewSellerGroup[] = useMemo(() => {
    if (persistedSellers && persistedSellers.length > 0) {
      return persistedSellers.map((seller: any, idx: number) => {
        const meta = SELLER_SUBTITLES[seller.sellerName] || { subtitle: seller.sellerName, location: "Türkiye" };
        const mappedItems: ReviewItem[] = (seller.items || []).map((it: any) => {
          // Try to find matching image from cart
          const cartMatch = cart?.find((c) => c.id === it.id);
          return {
            id: it.id,
            name: it.name,
            brand: seller.sellerName,
            price: it.price,
            specs: it.specs || "18K Gold",
            image: cartMatch?.image || (idx === 0 ? ring1 : idx === 1 ? ring3 : pearis),
            quantity: it.quantity || 1,
            sku: `${seller.sellerName.substring(0, 3).toUpperCase()}-${it.id.slice(-3).toUpperCase()}`,
          };
        });

        const sub = seller.itemsSubtotal || mappedItems.reduce((a, c) => a + c.price * c.quantity, 0);
        return {
          sellerId: seller.sellerId,
          sellerName: seller.sellerName,
          avatarInitial: seller.avatarInitial || seller.sellerName.charAt(0),
          sellerSubtitle: meta.subtitle,
          location: meta.location,
          items: mappedItems,
          shippingName: seller.shippingName || "Yurtiçi Kargo – Standart",
          deliveryFee: typeof seller.deliveryFee === "number" ? seller.deliveryFee : 25,
          itemsSubtotal: sub,
          tax: typeof seller.tax === "number" ? seller.tax : Math.round(sub * 0.2),
          discount: idx === 1 ? 200 : 0,
          estimatedDelivery: idx === 0 ? "Oct 15 – Oct 21, 2026" : "Oct 13 – Oct 16, 2026",
          returnPolicy: idx === 0 ? "Unused product can be returned within 7 days." : "Unused product can be returned within 14 days.",
          returnDays: idx === 0 ? 7 : 14,
        };
      });
    }
    return DEFAULT_SELLERS;
  }, [persistedSellers, cart]);

  // Collapsed accordion state for seller groups (mobile/tablet)
  const [collapsedSellers, setCollapsedSellers] = useState<Record<string, boolean>>({});
  const toggleSeller = (sellerId: string) => {
    setCollapsedSellers((prev) => ({ ...prev, [sellerId]: !prev[sellerId] }));
  };

  // Pre-contract accordion state (mobile/tablet)
  const [isPreContractOpen, setIsPreContractOpen] = useState(false);

  // Mobile order summary accordion state
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Collapsed accordion state for order summary
  const [expandedSummary, setExpandedSummary] = useState<Record<string, boolean>>({});
  const toggleSummary = (sellerId: string) => {
    setExpandedSummary((prev) => ({ ...prev, [sellerId]: !prev[sellerId] }));
  };

  // Grand total calculation
  const grandTotal = sellerGroups.reduce((acc, s) => {
    return acc + s.itemsSubtotal + s.deliveryFee + s.tax - (s.discount || 0);
  }, 0);

  const totalSellerCount = sellerGroups.length;
  const totalItemCount = sellerGroups.reduce((a, s) => a + s.items.reduce((b, it) => b + it.quantity, 0), 0);

  return (
    <>
      <TopBar />
      <Header />

      <main className="min-h-screen bg-[#faf8f5]">
        {/* ====================================================== */}
        {/* HERO SECTION                                            */}
        {/* ====================================================== */}
        <section className="border-b border-line/60 bg-[#faf8f5] pt-10 pb-8 sm:pt-14 sm:pb-12">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left */}
              <div>
                <h1 className="font-serif text-[36px] sm:text-[42px] lg:text-[46px] font-normal text-ink tracking-tight leading-tight">
                  Review Your Order
                </h1>
                <p className="mt-2 text-[13.5px] sm:text-[14px] text-ink-soft max-w-xl">
                  Please review your order details before completing your payment.
                </p>
              </div>

              {/* 4-Step Indicator: 1-2-3 checked, 4 active */}
              <div className="flex items-center self-center md:self-auto shrink-0 pt-1 md:pt-0 order-first md:order-last">
                {[
                  { label: "Cart", href: "/cart" },
                  { label: "Delivery", href: "/delivery" },
                  { label: "Payment", href: "/payment" },
                ].map((step, i) => (
                  <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center">
                      <Link
                        href={step.href}
                        className="w-8 h-8 rounded-full border border-ink bg-ink text-white flex items-center justify-center transition-colors hover:bg-neutral-800"
                        title={step.label}
                      >
                        <CheckIcon width={13} height={13} className="stroke-[2.5]" />
                      </Link>
                      <span className="text-[11.5px] sm:text-[12px] font-medium text-ink mt-1.5">
                        {step.label}
                      </span>
                    </div>
                    <div className="w-8 sm:w-12 lg:w-16 h-[1.5px] bg-ink mb-5 mx-1 sm:mx-1.5" />
                  </React.Fragment>
                ))}
                {/* Step 4: Review (Active) */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-[13px] font-semibold shadow-sm">
                    4
                  </div>
                  <span className="text-[11.5px] sm:text-[12px] font-bold text-ink mt-1.5">
                    Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* MAIN CONTENT                                            */}
        {/* ====================================================== */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">

            {/* ====================================================== */}
            {/* LEFT COLUMN (lg:col-span-7)                           */}
            {/* ====================================================== */}
            <div className="lg:col-span-7 space-y-8">
              {/* Multi-Seller Alert Banner */}
              {totalSellerCount > 1 && (
                <div className="rounded-xl bg-[#fcf8f3] border border-[#ebdccb]/70 p-4 flex items-start gap-3">
                  <div className="size-8 rounded-full bg-[#fceddf] flex items-center justify-center text-[#a4532b] shrink-0 mt-0.5">
                    <TruckIcon width={20} height={20} />
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-ink leading-tight">
                      Your order contains items from {totalSellerCount} different sellers.
                    </p>
                    <p className="text-[12px] text-ink-soft mt-1">
                      Items will be shipped separately and you will receive separate invoices for each seller.
                    </p>
                  </div>
                </div>
              )}

              {/* ====================================================== */}
              {/* SELLER BLOCKS                                          */}
              {/* ====================================================== */}
              {sellerGroups.map((seller, sellerIdx) => (
                <div
                  key={seller.sellerId}
                  className="rounded-2xl border border-line/80 bg-white overflow-hidden shadow-2xs"
                >
                  {/* Seller Header */}
                  <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-line/50">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-800 text-[12px] font-bold flex items-center justify-center overflow-hidden shrink-0">
                          {seller.avatarInitial}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-[15px] font-semibold text-ink">
                              {seller.sellerName}
                            </h3>
                            <VerifiedBadge />
                          </div>
                          <div className="hidden sm:flex items-center gap-2 mt-0.5 text-[11.5px] text-muted">
                            <span>{seller.sellerSubtitle}</span>
                            {seller.location && (
                              <>
                                <span className="text-line">•</span>
                                <span className="inline-flex items-center gap-0.5">
                                  <MapPinIcon width={10} height={10} />
                                  {seller.location}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Desktop: View Store link */}
                      <button
                        type="button"
                        className="hidden lg:flex text-[12.5px] font-medium text-ink hover:text-black underline underline-offset-2 cursor-pointer items-center gap-1 shrink-0"
                      >
                        View Store
                        <ChevronDownIcon width={12} height={12} className="-rotate-90" />
                      </button>

                      {/* Mobile / Tablet: Dropdown chevron toggle */}
                      <button
                        type="button"
                        onClick={() => toggleSeller(seller.sellerId)}
                        aria-label={`Toggle ${seller.sellerName}`}
                        className="flex lg:hidden p-1.5 -mr-1 text-ink hover:text-black cursor-pointer rounded-full transition-colors"
                      >
                        <ChevronDownIcon
                          width={16}
                          height={16}
                          className={`transition-transform duration-200 ${
                            collapsedSellers[seller.sellerId] ? "rotate-0" : "rotate-180"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Seller Content */}
                  <div className={`px-4 sm:px-6 py-4 sm:py-6 ${collapsedSellers[seller.sellerId] ? "hidden lg:block" : "block"}`}>
                    {/* Mobile / Tablet Layout */}
                    <div className="block lg:hidden space-y-4">
                      {/* Products List */}
                      <div className="space-y-3">
                        {seller.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#fcfaf7] border border-line/50"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="80px"
                                  className="object-contain"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-ink leading-snug">
                                  {item.name}
                                </h4>
                                <p className="text-[11px] sm:text-[11.5px] text-muted mt-0.5">
                                  {item.specs}
                                </p>
                                <p className="font-semibold text-ink text-[13.5px] sm:text-[14px] mt-1">
                                  ${item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {/* Quantity box */}
                            <div className="w-8 h-8 rounded-lg border border-line/70 bg-white shadow-2xs flex items-center justify-center font-medium text-[13px] text-ink shrink-0 self-center">
                              {item.quantity}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Compact Shipping Info Rows */}
                      <div className="pt-2 border-t border-line/40 space-y-2.5">
                        {/* Shipping Row */}
                        <div className="flex items-start justify-between gap-2 text-[12px]">
                          <div className="flex items-start gap-2 min-w-0">
                            <TruckIcon width={16} height={16} className="text-[#a4532b] shrink-0 mt-0.5" />
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-medium text-ink">Shipping:</span>
                                <span className="text-ink">{seller.shippingName}</span>
                              </div>
                              <p className="text-[11px] text-muted mt-0.5">3 – 5 business days</p>
                            </div>
                          </div>
                          <span className="font-bold text-ink shrink-0">${seller.deliveryFee}</span>
                        </div>

                        {/* Est. Delivery */}
                        <div className="flex items-center gap-2 text-[12px]">
                          <CalendarIcon className="w-4 h-4 text-[#a4532b] shrink-0" />
                          <span className="font-medium text-ink shrink-0">Est. Delivery:</span>
                          <span className="text-ink-soft">{seller.estimatedDelivery || "Oct 15 – Oct 21, 2026"}</span>
                        </div>

                        {/* Return Policy */}
                        <div className="flex items-center justify-between gap-2 text-[12px]">
                          <div className="flex items-center gap-2 min-w-0">
                            <ReturnIcon className="w-4 h-4 text-[#a4532b] shrink-0" />
                            <span className="font-medium text-ink shrink-0">Return Policy:</span>
                            <span className="text-ink-soft truncate">{seller.returnPolicy || "Unused product can be returned within 14 days."}</span>
                          </div>
                          <ChevronDownIcon width={12} height={12} className="-rotate-90 text-muted shrink-0" />
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout (2-column grid) */}
                    <div className="hidden lg:grid grid-cols-2 gap-6 items-start">
                      {/* Products Column */}
                      <div className="space-y-4">
                        {seller.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-3.5 p-3.5 rounded-xl bg-[#fcfaf7] border border-line/50"
                          >
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                              {/* Thumbnail: NO padding */}
                              <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-lg bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="80px"
                                  className="object-contain"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <h4 className="text-[13.5px] font-semibold text-ink leading-snug">
                                  {item.name}
                                </h4>
                                <p className="text-[11.5px] text-muted mt-0.5">
                                  {item.specs}
                                </p>
                                {item.sku && (
                                  <p className="text-[11px] text-muted mt-0.5">
                                    SKU: {item.sku}
                                  </p>
                                )}
                                <p className="font-semibold text-ink text-[14px] mt-1.5">
                                  ${item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {/* Quantity box centered vertically relative to card height, slightly smaller and refined */}
                            <div className="w-8 h-8 rounded-lg border border-line/70 bg-white shadow-2xs flex items-center justify-center font-medium text-[13px] text-ink shrink-0 self-center">
                              {item.quantity}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping / Delivery Info Column */}
                      <div className="space-y-4">
                        {/* Shipping Method */}
                        <div className="flex items-start gap-3">
                          <div className="text-[#a4532b] mt-0.5 shrink-0">
                            <TruckIcon width={18} height={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-[13px] font-semibold text-ink">
                                Shipping Method
                              </p>
                              <span className="text-[13px] font-bold text-ink">
                                ${seller.deliveryFee}
                              </span>
                            </div>
                            <p className="text-[12px] text-ink mt-0.5">
                              {seller.shippingName}
                            </p>
                            <p className="text-[11.5px] text-muted mt-0.5">
                              3 – 5 business days
                            </p>
                          </div>
                        </div>

                        {/* Estimated Delivery */}
                        <div className="flex items-start gap-3">
                          <div className="text-[#a4532b] mt-0.5 shrink-0">
                            <CalendarIcon className="w-[18px] h-[18px]" />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-ink">
                              Estimated Delivery
                            </p>
                            <p className="text-[12px] text-muted mt-0.5">
                              {seller.estimatedDelivery || "Oct 15 – Oct 21, 2026"}
                            </p>
                          </div>
                        </div>

                        {/* Return / Cancellation Policy */}
                        <div className="flex items-start gap-3">
                          <div className="text-[#a4532b] mt-0.5 shrink-0">
                            <ReturnIcon className="w-[18px] h-[18px]" />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-ink">
                              Return / Cancellation Policy
                            </p>
                            <p className="text-[12px] text-muted mt-0.5">
                              {seller.returnPolicy || "Unused product can be returned within 14 days."}
                            </p>
                            <button className="text-[12px] font-medium text-ink underline underline-offset-2 hover:text-black mt-1 cursor-pointer">
                              View Seller Policy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ====================================================== */}
            {/* RIGHT COLUMN (lg:col-span-5)                          */}
            {/* ====================================================== */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4 sm:space-y-5">
              {/* ---------------------------------------------------- */}
              {/* Delivery Address Card                                */}
              {/* ---------------------------------------------------- */}
              <div className="rounded-2xl border border-line/80 bg-white p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <MapPinIcon width={17} height={17} className="text-ink" />
                    <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-ink">Delivery Address</h3>
                  </div>
                  <Link
                    href="/checkout"
                    className="text-[12px] sm:text-[12.5px] font-medium text-ink underline underline-offset-2 hover:text-black cursor-pointer"
                  >
                    Edit
                  </Link>
                </div>
                {/* Mobile / Tablet: compact single line */}
                <div className="block lg:hidden pl-[25px] text-[12.5px] sm:text-[13px] text-ink-soft truncate">
                  {address.fullName || "Hüseyin Aliyev"}, {address.city || "Beşiktaş"}, {address.stateProvince || address.countryLabel || "İstanbul"}
                </div>
                {/* Desktop: multi-line full address */}
                <div className="hidden lg:block text-[13px] text-ink-soft space-y-0.5 leading-relaxed pl-[26px]">
                  <p className="font-medium text-ink">{address.fullName || "Hüseyin Aliyev"}</p>
                  <p>{address.streetAddress || "Barbaros Mah. Ihlamur Sok. No:5 D:12"}{address.apartment ? `, ${address.apartment}` : ""}</p>
                  <p>{address.city || "Beşiktaş"}{address.stateProvince ? `, ${address.stateProvince}` : ""} {address.postalCode || "34353"}</p>
                  <p>{address.countryLabel || address.country || "Türkiye"}</p>
                  <p className="text-[12.5px] text-muted">{address.phone || "+90 530 000 00 00"}</p>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* Payment Method Card                                  */}
              {/* ---------------------------------------------------- */}
              <div className="rounded-2xl border border-line/80 bg-white p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCardIcon width={17} height={17} className="text-ink" />
                    <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-ink">Payment Method</h3>
                  </div>
                  <Link
                    href="/payment"
                    className="text-[12px] sm:text-[12.5px] font-medium text-ink underline underline-offset-2 hover:text-black cursor-pointer"
                  >
                    Edit
                  </Link>
                </div>
                {/* Mobile / Tablet: compact single line */}
                <div className="block lg:hidden pl-[25px]">
                  <div className="flex items-center gap-2 text-[13px] text-ink font-medium">
                    <span className="tracking-widest">••••</span>
                    <span>{payment.cardLast4 || "4242"}</span>
                  </div>
                </div>
                {/* Desktop: full card visual & expiry */}
                <div className="hidden lg:flex items-center gap-3 pl-[26px]">
                  <div className="flex items-center gap-1.5">
                    {/* Card brand dots */}
                    <div className="flex items-center gap-[3px]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] -ml-1" />
                    </div>
                    <span className="text-[13.5px] font-medium text-ink tracking-wider ml-1">
                      •••• {payment.cardLast4 || "4242"}
                    </span>
                  </div>
                  <span className="text-[12px] text-muted ml-2">
                    Expires {payment.expiryDate || "12/28"}
                  </span>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* Order Summary (Mobile / Tablet Collapsible)           */}
              {/* ---------------------------------------------------- */}
              <div className="block lg:hidden rounded-2xl border border-line/80 bg-white p-4 sm:p-5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setIsMobileSummaryOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between text-left cursor-pointer select-none"
                >
                  <span className="font-serif text-[17px] font-normal text-ink">Order Summary</span>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-[17px] font-bold text-ink">
                      ${grandTotal.toLocaleString()}
                    </span>
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={`text-ink transition-transform duration-200 ${isMobileSummaryOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </div>
                </button>

                {isMobileSummaryOpen && (
                  <div className="mt-4 pt-3.5 border-t border-line/50 space-y-3.5">
                    {sellerGroups.map((seller) => {
                      const sellerTotal = seller.itemsSubtotal + seller.deliveryFee + seller.tax - (seller.discount || 0);
                      const isExpanded = expandedSummary[seller.sellerId] !== false;

                      return (
                        <div key={seller.sellerId} className="border-b border-line/40 pb-3 last:border-b-0 last:pb-0">
                          <button
                            type="button"
                            onClick={() => toggleSummary(seller.sellerId)}
                            className="w-full flex items-center justify-between py-1 cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 text-[9px] font-bold flex items-center justify-center shrink-0">
                                {seller.avatarInitial}
                              </div>
                              <span className="text-[13px] font-semibold text-ink">
                                {seller.sellerName}
                              </span>
                              <span className="text-[11.5px] text-muted">
                                ({seller.items.reduce((a, c) => a + c.quantity, 0)} {seller.items.reduce((a, c) => a + c.quantity, 0) === 1 ? "item" : "items"})
                              </span>
                            </div>
                            <ChevronDownIcon
                              width={14}
                              height={14}
                              className={`text-muted transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="mt-2 space-y-1.5 text-[12px] pl-7">
                              <div className="flex justify-between text-ink-soft">
                                <span>Items Subtotal</span>
                                <span className="font-medium text-ink">${seller.itemsSubtotal.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-ink-soft">
                                <span>Delivery Fee</span>
                                <span className="font-medium text-ink">${seller.deliveryFee}</span>
                              </div>
                              {(seller.discount || 0) > 0 && (
                                <div className="flex justify-between text-emerald-700">
                                  <span>Discount</span>
                                  <span className="font-medium">-${(seller.discount || 0).toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-ink-soft">
                                <span className="inline-flex items-center gap-1">
                                  Tax (KDV 20%, included)
                                  <InfoIcon width={11} height={11} className="text-muted" />
                                </span>
                                <span className="font-medium text-ink">${seller.tax.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between border-t border-line/40 pt-1.5 mt-1">
                                <span className="font-semibold text-ink">Total (incl. tax)</span>
                                <span className="font-bold text-ink">${sellerTotal.toLocaleString()}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ---------------------------------------------------- */}
              {/* Pre-Contract Information (Mobile / Tablet Collapsible)*/}
              {/* ---------------------------------------------------- */}
              <div className="block lg:hidden rounded-2xl border border-line/80 bg-white overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => setIsPreContractOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPinIcon width={17} height={17} className="text-ink" />
                    <span className="font-serif text-[16px] sm:text-[17px] font-normal text-ink">
                      Pre-Contract Information
                    </span>
                  </div>
                  <ChevronDownIcon
                    width={16}
                    height={16}
                    className={`text-ink transition-transform duration-200 ${isPreContractOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>

                {isPreContractOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-line/40 space-y-2.5">
                    {[
                      { icon: <FileTextIcon className="w-4 h-4" />, title: "Product Characteristics", desc: "Product details, materials, size, care instructions" },
                      { icon: <BuildingIcon className="w-4 h-4" />, title: "Seller & Platform Identity", desc: "Seller company information and platform details" },
                      { icon: <DollarIcon className="w-4 h-4" />, title: "Total Price & Delivery Charges", desc: "Final price, tax (KDV) and shipping fees" },
                      { icon: <ReturnIcon className="w-4 h-4" />, title: "Cancellation & Withdrawal Terms", desc: "Your right of withdrawal and seller-specific return policies" },
                      { icon: <HeadphonesIcon className="w-4 h-4" />, title: "Complaints & Support", desc: "How to contact us in case of any issues" },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="rounded-xl border border-line/60 bg-[#fcfaf7] p-3 flex items-center gap-3"
                      >
                        <div className="size-7 rounded-lg bg-[#fceddf] flex items-center justify-center text-[#a4532b] shrink-0 self-center">
                          {card.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[12px] font-semibold text-ink leading-tight">
                            {card.title}
                          </h4>
                          <p className="text-[11px] text-muted leading-snug mt-0.5">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ---------------------------------------------------- */}
              {/* Order Summary Card (Desktop)                         */}
              {/* ---------------------------------------------------- */}
              <div className="hidden lg:block rounded-2xl border border-line/80 bg-white p-5 shadow-2xs space-y-4">
                <h3 className="text-[17px] font-serif font-normal text-ink border-b border-line/50 pb-3">
                  Order Summary
                </h3>

                {sellerGroups.map((seller) => {
                  const sellerTotal = seller.itemsSubtotal + seller.deliveryFee + seller.tax - (seller.discount || 0);
                  const isExpanded = expandedSummary[seller.sellerId] !== false; // default expanded

                  return (
                    <div key={seller.sellerId} className="border-b border-line/40 pb-3.5 last:border-b-0 last:pb-0">
                      {/* Seller header row */}
                      <button
                        type="button"
                        onClick={() => toggleSummary(seller.sellerId)}
                        className="w-full flex items-center justify-between py-1 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 text-[9px] font-bold flex items-center justify-center shrink-0">
                            {seller.avatarInitial}
                          </div>
                          <span className="text-[13.5px] font-semibold text-ink">
                            {seller.sellerName}
                          </span>
                          <span className="text-[12px] text-muted">
                            ({seller.items.reduce((a, c) => a + c.quantity, 0)} {seller.items.reduce((a, c) => a + c.quantity, 0) === 1 ? "item" : "items"})
                          </span>
                        </div>
                        <ChevronDownIcon
                          width={14}
                          height={14}
                          className={`text-muted transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Expanded breakdown */}
                      {isExpanded && (
                        <div className="mt-2.5 space-y-1.5 text-[12.5px] pl-7">
                          <div className="flex justify-between text-ink-soft">
                            <span>Items Subtotal</span>
                            <span className="font-medium text-ink">${seller.itemsSubtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-ink-soft">
                            <span>Delivery Fee</span>
                            <span className="font-medium text-ink">${seller.deliveryFee}</span>
                          </div>
                          {(seller.discount || 0) > 0 && (
                            <div className="flex justify-between text-emerald-700">
                              <span>Discount</span>
                              <span className="font-medium">-${(seller.discount || 0).toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-ink-soft">
                            <span className="inline-flex items-center gap-1">
                              Tax (KDV 20%, included)
                              <InfoIcon width={12} height={12} className="text-muted" />
                            </span>
                            <span className="font-medium text-ink">${seller.tax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t border-line/40 pt-2 mt-1.5">
                            <span className="text-[13px] font-semibold text-ink">Total (incl. tax)</span>
                            <span className="text-[13px] font-bold text-ink">${sellerTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Grand Total */}
                <div className="border-t border-line/60 pt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-[15px] font-semibold text-ink">Grand Total</span>
                    <span className="text-[12px] text-muted ml-1">(incl. tax)</span>
                  </div>
                  <span className="font-serif text-2xl sm:text-[26px] font-bold text-ink">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* PRE-CONTRACT INFORMATION (Desktop Full-width section)   */}
          {/* ====================================================== */}
          <div className="hidden lg:block mt-14 pt-10 border-t border-line/60">
            <h2 className="font-serif text-2xl sm:text-[28px] font-normal text-ink">
              Pre-Contract Information
            </h2>
            <p className="mt-1.5 text-[13px] text-ink-soft">
              Please review the following information before completing your purchase.
            </p>

            {/* 5 Info Cards */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {[
                { icon: <FileTextIcon className="w-4 h-4" />, title: "Product Characteristics", desc: "Product details, materials, size, care instructions" },
                { icon: <BuildingIcon className="w-4 h-4" />, title: "Seller & Platform Identity", desc: "Seller company information and platform details" },
                { icon: <DollarIcon className="w-4 h-4" />, title: "Total Price & Delivery Charges", desc: "Final price, tax (KDV) and shipping fees" },
                { icon: <ReturnIcon className="w-4 h-4" />, title: "Cancellation & Withdrawal Terms", desc: "Your right of withdrawal and seller-specific return policies" },
                { icon: <HeadphonesIcon className="w-4 h-4" />, title: "Complaints & Support", desc: "How to contact us in case of any issues" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-line/70 bg-white p-3 sm:p-3.5 flex items-center gap-3 hover:border-line transition-colors"
                >
                  <div className="size-8 rounded-lg bg-[#fceddf] flex items-center justify-center text-[#a4532b] shrink-0 self-center">
                    {card.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[12px] sm:text-[12.5px] font-semibold text-ink leading-tight">
                      {card.title}
                    </h4>
                    <p className="text-[11px] text-muted leading-snug mt-0.5 line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Checkbox + Order & Pay Button */}
          <div className="mt-0 lg:mt-8 pt-6 border-t border-line/40 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Checkbox and agreement text */}
            <label className="flex items-start gap-3 cursor-pointer select-none max-w-3xl">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 size-4 rounded border-line text-ink accent-ink focus:ring-ink shrink-0"
              />
              <span className="text-[12px] sm:text-[12.5px] text-ink-soft leading-relaxed">
                I have read and accept the pre-contract information, seller policies,{" "}
                <Link href="/terms" className="text-ink underline underline-offset-2 hover:text-black font-medium">
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-ink underline underline-offset-2 hover:text-black font-medium">
                  Privacy Policy
                </Link>
                . I understand that my order contains items from different sellers and they may be shipped separately with separate invoices and return processes.
              </span>
            </label>

            {/* Right: Order & Pay Button */}
            <div className="w-full lg:w-auto shrink-0">
              <button
                type="button"
                disabled={!agreed}
                className={`w-full lg:w-auto rounded-full px-8 py-3.5 text-[14px] font-semibold shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
                  agreed
                    ? "bg-ink text-white hover:bg-neutral-800"
                    : "bg-[#d8d8d8] text-[#8e8e8e] cursor-not-allowed"
                }`}
              >
                <span>Order &amp; Pay ${grandTotal.toLocaleString()}</span>
                <ArrowRightIcon width={14} height={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
