"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  ChevronDownIcon,
  TruckIcon,
  LockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  InfoIcon,
  PackageIcon,
} from "@/components/Icons";
import { useCartWishlist, ProductItem } from "@/context/CartWishlistContext";

import ring1 from "@/app/images/ring1.png";
import ring2 from "@/app/images/ring2.png";
import ring3 from "@/app/images/ring3.png";
import pearis from "@/app/images/pearis.png";

// Helper Calendar Icon
function CalendarIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// Shipping method definition
type ShippingOption = {
  id: string;
  name: string;
  duration: string;
  price: number;
  tracking: boolean;
  status: "pending" | "confirmed";
  statusText: string;
};

// Seller Profiles pool
const SELLER_TEMPLATES = [
  {
    id: "seller-lumea",
    name: "Lumea Jewellery",
    avatarInitial: "L",
    rating: 4.8,
    reviewsCount: "1.2K",
    location: "Istanbul, Türkiye",
    shippingOptions: [
      {
        id: "opt-yurtici",
        name: "Yurtiçi Kargo – Standart",
        duration: "3 – 5 business days",
        price: 25,
        tracking: true,
        status: "pending" as const,
        statusText: "Coverage verification pending",
      },
      {
        id: "opt-aras",
        name: "Aras Kargo – Hızlı",
        duration: "1 – 2 business days",
        price: 45,
        tracking: true,
        status: "confirmed" as const,
        statusText: "Insurance confirmed",
      },
      {
        id: "opt-ups",
        name: "UPS Türkiye – Ekspres",
        duration: "1 – 2 business days",
        price: 70,
        tracking: true,
        status: "confirmed" as const,
        statusText: "Insurance confirmed",
      },
    ],
  },
  {
    id: "seller-aurora",
    name: "Aurora Jewellery",
    avatarInitial: "A",
    rating: 4.7,
    reviewsCount: "860",
    location: "Ankara, Türkiye",
    shippingOptions: [
      {
        id: "opt-mng",
        name: "MNG Kargo – Standart",
        duration: "3 – 5 business days",
        price: 20,
        tracking: true,
        status: "pending" as const,
        statusText: "Coverage verification pending",
      },
      {
        id: "opt-aras",
        name: "Aras Kargo – Hızlı",
        duration: "1 – 3 business days",
        price: 40,
        tracking: true,
        status: "confirmed" as const,
        statusText: "Insurance confirmed",
      },
      {
        id: "opt-ups",
        name: "UPS Türkiye – Ekspres",
        duration: "1 – 2 business days",
        price: 65,
        tracking: true,
        status: "confirmed" as const,
        statusText: "Insurance confirmed",
      },
    ],
  },
  {
    id: "seller-eclat",
    name: "Éclat Atelier",
    avatarInitial: "E",
    rating: 4.9,
    reviewsCount: "2.1K",
    location: "Izmir, Türkiye",
    shippingOptions: [
      {
        id: "opt-yurtici",
        name: "Yurtiçi Kargo – Standart",
        duration: "3 – 5 business days",
        price: 25,
        tracking: true,
        status: "pending" as const,
        statusText: "Coverage verification pending",
      },
      {
        id: "opt-aras",
        name: "Aras Kargo – Hızlı",
        duration: "1 – 2 business days",
        price: 45,
        tracking: true,
        status: "confirmed" as const,
        statusText: "Insurance confirmed",
      },
      {
        id: "opt-ups",
        name: "UPS Türkiye – Ekspres",
        duration: "1 – 2 business days",
        price: 75,
        tracking: true,
        status: "confirmed" as const,
        statusText: "Insurance confirmed",
      },
    ],
  },
  {
    id: "seller-volana",
    name: "Volana Fine Studio",
    avatarInitial: "V",
    rating: 4.8,
    reviewsCount: "940",
    location: "Bursa, Türkiye",
    shippingOptions: [
      {
        id: "opt-mng",
        name: "MNG Kargo – Standart",
        duration: "3 – 5 business days",
        price: 20,
        tracking: true,
        status: "pending" as const,
        statusText: "Coverage verification pending",
      },
      {
        id: "opt-aras",
        name: "Aras Kargo – Hızlı",
        duration: "1 – 2 business days",
        price: 40,
        tracking: true,
        status: "confirmed" as const,
        statusText: "Insurance confirmed",
      },
      {
        id: "opt-ups",
        name: "UPS Türkiye – Ekspres",
        duration: "1 – 2 business days",
        price: 65,
        tracking: true,
        status: "confirmed" as const,
        statusText: "Insurance confirmed",
      },
    ],
  },
];

type DeliveryItem = {
  id: string;
  name: string;
  brand?: string;
  price: number;
  specs?: string;
  image: any;
  quantity?: number;
};

// Default items if cart is empty
const DEFAULT_DELIVERY_ITEMS: DeliveryItem[] = [
  {
    id: "deliv-item-1",
    name: "Solitaire Diamond Ring",
    brand: "Lumea Jewellery",
    price: 1250,
    specs: "18K Gold • Size: 52",
    image: ring1,
    quantity: 1,
  },
  {
    id: "deliv-item-2",
    name: "Malachite Clover Necklace",
    brand: "Lumea Jewellery",
    price: 1420,
    specs: "18K Gold • 42 cm",
    image: ring3,
    quantity: 1,
  },
  {
    id: "deliv-item-3",
    name: "Pearl Drop Earrings",
    brand: "Aurora Jewellery",
    price: 975,
    specs: "18K Gold • Natural Pearls",
    image: pearis,
    quantity: 1,
  },
];

export function DeliveryPage() {
  const { cart } = useCartWishlist();

  // Alert banner state
  const [showAlert, setShowAlert] = useState(true);

  // Raw base items from cart (or defaults)
  const baseItems: DeliveryItem[] = useMemo(() => {
    if (cart && cart.length > 0) {
      return cart.map((c) => ({
        id: c.id,
        name: c.name,
        brand: c.brand,
        price: c.price,
        specs: c.specs || c.metal || "18K Fine Gold",
        image: c.image || ring1,
        quantity: c.quantity || 1,
      }));
    }
    return DEFAULT_DELIVERY_ITEMS;
  }, [cart]);

  // Stepper quantity state (per item id)
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    baseItems.forEach((item) => {
      initial[item.id] = item.quantity || 1;
    });
    return initial;
  });

  const handleQtyChange = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  // Group items into seller blocks (MAX 3 items per seller block!)
  // If more items arrive, dynamically generate another seller block!
  const sellerGroups = useMemo(() => {
    const chunks: Array<{
      seller: (typeof SELLER_TEMPLATES)[0];
      items: DeliveryItem[];
    }> = [];

    // If using default items, maintain the exact 2-and-1 layout from design:
    if (baseItems === DEFAULT_DELIVERY_ITEMS) {
      chunks.push({
        seller: SELLER_TEMPLATES[0], // Lumea Jewellery
        items: [DEFAULT_DELIVERY_ITEMS[0], DEFAULT_DELIVERY_ITEMS[1]],
      });
      chunks.push({
        seller: SELLER_TEMPLATES[1], // Aurora Jewellery
        items: [DEFAULT_DELIVERY_ITEMS[2]],
      });
      return chunks;
    }

    // Dynamic chunking: max 3 items per seller block
    const maxPerBlock = 3;
    for (let i = 0; i < baseItems.length; i += maxPerBlock) {
      const slice = baseItems.slice(i, i + maxPerBlock);
      const templateIdx = Math.floor(i / maxPerBlock) % SELLER_TEMPLATES.length;
      const baseTemplate = SELLER_TEMPLATES[templateIdx];
      chunks.push({
        seller: {
          ...baseTemplate,
          id: `${baseTemplate.id}-${Math.floor(i / maxPerBlock)}`,
        },
        items: slice,
      });
    }

    return chunks;
  }, [baseItems]);

  // Selected shipping options per seller
  const [selectedShipping, setSelectedShipping] = useState<Record<string, string>>({});

  // Accordion collapsed state per seller
  const [collapsedSellers, setCollapsedSellers] = useState<Record<string, boolean>>({});

  const toggleSellerCollapse = (sellerId: string) => {
    setCollapsedSellers((prev) => ({ ...prev, [sellerId]: !prev[sellerId] }));
  };

  const handleSelectShipping = (sellerId: string, optionId: string) => {
    setSelectedShipping((prev) => ({ ...prev, [sellerId]: optionId }));
  };

  // Calculations
  const totalItemCount = baseItems.reduce(
    (sum, item) => sum + (quantities[item.id] ?? item.quantity ?? 1),
    0
  );

  const subtotal = baseItems.reduce((sum, item) => {
    const q = quantities[item.id] ?? item.quantity ?? 1;
    return sum + item.price * q;
  }, 0);

  // Compute shipping fee per seller
  const sellerShippingFees = useMemo(() => {
    const map: Record<string, { sellerName: string; fee: number }> = {};
    sellerGroups.forEach((group) => {
      const chosenOptId = selectedShipping[group.seller.id] || group.seller.shippingOptions[0].id;
      const opt =
        group.seller.shippingOptions.find((o) => o.id === chosenOptId) ||
        group.seller.shippingOptions[0];
      map[group.seller.id] = {
        sellerName: group.seller.name,
        fee: opt.price,
      };
    });
    return map;
  }, [sellerGroups, selectedShipping]);

  const totalDeliveryFees = Object.values(sellerShippingFees).reduce(
    (sum, s) => sum + s.fee,
    0
  );

  const discount = 150;
  const tax = Math.round(subtotal * 0.08); // 8% estimated tax
  const total = Math.max(0, subtotal + totalDeliveryFees - discount + tax);

  // Sync delivery summary to localStorage for the Payment page
  useEffect(() => {
    try {
      const summaryPayload = {
        sellers: sellerGroups.map((group) => {
          const chosenOptId =
            selectedShipping[group.seller.id] || group.seller.shippingOptions[0].id;
          const opt =
            group.seller.shippingOptions.find((o) => o.id === chosenOptId) ||
            group.seller.shippingOptions[0];
          const itemsSubtotal = group.items.reduce((acc, curr) => {
            const q = quantities[curr.id] ?? curr.quantity ?? 1;
            return acc + curr.price * q;
          }, 0);
          return {
            sellerId: group.seller.id,
            sellerName: group.seller.name,
            avatarInitial: group.seller.avatarInitial,
            shippingName: opt.name,
            deliveryFee: opt.price,
            itemsSubtotal,
            tax: Math.round(itemsSubtotal * 0.2),
            items: group.items.map((it) => ({
              id: it.id,
              name: it.name,
              brand: group.seller.name,
              price: it.price,
              specs: it.specs,
              quantity: quantities[it.id] ?? it.quantity ?? 1,
            })),
          };
        }),
      };
      localStorage.setItem("sidra_delivery_summary", JSON.stringify(summaryPayload));
    } catch {
      // ignore
    }
  }, [sellerGroups, selectedShipping, quantities]);

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-[#fcfaf7]">
        {/* ====================================================== */}
        {/* TOP HERO SECTION (No image, title & 4-step indicator)   */}
        {/* ====================================================== */}
        <section className="border-b border-line/60 bg-cream-50/50">
          <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-10 py-7 lg:py-9">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left: Title & Subtitle */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal text-ink leading-tight">
                  Delivery Method
                </h1>
                <p className="mt-1.5 text-[13px] sm:text-[14px] text-ink-soft leading-relaxed max-w-xl">
                  Choose your delivery options for each seller. Items from different sellers may arrive in separate shipments.
                </p>
              </div>

              {/* Right: 4-Step Indicator (Step 1 & 2 are dark/active) */}
              <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0 self-start lg:self-center">
                {/* Step 1: Cart (Completed / Dark) */}
                <div className="flex flex-col items-center">
                  <span className="size-7 sm:size-8 rounded-full border-2 border-ink bg-white text-ink font-semibold text-xs sm:text-[13px] grid place-items-center shadow-2xs">
                    <CheckIcon width={13} height={13} className="stroke-[2.5]" />
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-medium text-ink mt-1.5">Cart</span>
                </div>

                {/* Completed Line connecting 1 and 2 */}
                <div className="w-8 sm:w-12 lg:w-16 h-0.5 bg-ink -mt-5" />

                {/* Step 2: Delivery (ACTIVE - Dark) */}
                <div className="flex flex-col items-center">
                  <span className="size-7 sm:size-8 rounded-full bg-ink text-white font-semibold text-xs sm:text-[13px] grid place-items-center shadow-xs">
                    2
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-bold text-ink mt-1.5">Delivery</span>
                </div>

                {/* Inactive Line connecting 2 and 3 */}
                <div className="w-8 sm:w-12 lg:w-16 h-px bg-line/80 -mt-5" />

                {/* Step 3: Payment */}
                <div className="flex flex-col items-center opacity-50">
                  <span className="size-7 sm:size-8 rounded-full border border-line bg-cream-50 text-muted font-medium text-xs sm:text-[13px] grid place-items-center">
                    3
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-muted mt-1.5">Payment</span>
                </div>

                {/* Inactive Line connecting 3 and 4 */}
                <div className="w-8 sm:w-12 lg:w-16 h-px bg-line/80 -mt-5" />

                {/* Step 4: Review */}
                <div className="flex flex-col items-center opacity-50">
                  <span className="size-7 sm:size-8 rounded-full border border-line bg-cream-50 text-muted font-medium text-xs sm:text-[13px] grid place-items-center">
                    4
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-muted mt-1.5">Review</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* MAIN 2-COLUMN CONTENT                                  */}
        {/* ====================================================== */}
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
            {/* ====================================================== */}
            {/* LEFT COLUMN: Multi-seller Shipping Options (8 cols)    */}
            {/* ====================================================== */}
            <div className="lg:col-span-8 space-y-6">
              {/* Notice Alert Banner (Dynamic Seller Count) */}
              {showAlert && (
                <div className="rounded-2xl border border-[#f2ded1] bg-[#fcf8f2] p-4 sm:p-5 flex items-start justify-between gap-4 shadow-2xs transition-all">
                  <div className="flex items-start gap-3.5">
                    <div className="size-9 rounded-xl text-[#a4532b] grid place-items-center shrink-0 mt-0.5">
                      <TruckIcon width={25} height={25} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink text-[13.5px] sm:text-[14px]">
                        Your order contains items from {sellerGroups.length} different {sellerGroups.length === 1 ? "seller" : "sellers"}.
                      </h3>
                      <p className="text-[12px] sm:text-[12.5px] text-ink-soft mt-1 leading-relaxed">
                        Items will be shipped separately and may arrive on different dates. You can track each shipment individually.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAlert(false)}
                    aria-label="Dismiss alert"
                    className="text-muted hover:text-ink p-1 transition-colors cursor-pointer shrink-0"
                  >
                    <CloseIcon width={16} height={16} />
                  </button>
                </div>
              )}

              {/* ====================================================== */}
              {/* DYNAMIC SELLER GROUPS (Max 3 items per seller block)    */}
              {/* ====================================================== */}
              {sellerGroups.map((group) => {
                const isCollapsed = !!collapsedSellers[group.seller.id];
                const activeOptionId =
                  selectedShipping[group.seller.id] || group.seller.shippingOptions[0].id;

                return (
                  <div
                    key={group.seller.id}
                    className="rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs space-y-6"
                  >
                    {/* Seller Header */}
                    <div className="flex items-center justify-between border-b border-line/60 pb-4">
                      <div className="flex items-center gap-3">
                        {/* Seller Avatar */}
                        <div className="size-10 rounded-full bg-cream-200 border border-line flex items-center justify-center font-serif font-bold text-ink text-sm">
                          {group.seller.avatarInitial}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="font-semibold text-ink text-[15px]">
                              {group.seller.name}
                            </h2>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                              <CheckIcon width={10} height={10} className="stroke-[2.5]" />
                              <span>Verified Seller</span>
                            </span>
                          </div>
                          <div className="hidden sm:flex items-center gap-3 text-[11.5px] text-muted mt-0.5">
                            <span className="flex items-center gap-1 text-amber-600 font-medium">
                              <StarIcon width={12} height={12} className="fill-amber-500 text-amber-500" />
                              <span>{group.seller.rating}</span>
                              <span className="text-muted">({group.seller.reviewsCount} reviews)</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPinIcon width={11} height={11} />
                              <span>{group.seller.location}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Collapse Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleSellerCollapse(group.seller.id)}
                        className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft hover:text-ink transition-colors cursor-pointer"
                      >
                        <span>
                          {group.items.length} {group.items.length === 1 ? "item" : "items"}
                        </span>
                        <ChevronDownIcon
                          width={16}
                          height={16}
                          className={`transition-transform duration-200 ${
                            isCollapsed ? "" : "rotate-180"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Seller Content Accordion */}
                    {!isCollapsed && (
                      <div className="space-y-6">
                        {/* 2-Column: Items Left, Delivery Right */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                          {/* Products Left Column */}
                          <div className="space-y-4">
                            {group.items.map((item) => {
                              const qty = quantities[item.id] ?? item.quantity ?? 1;

                              return (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between gap-3.5 p-3.5 rounded-xl bg-[#fcfaf7] border border-line/60"
                                >
                                  <div className="flex items-center gap-3.5 min-w-0">
                                    {/* Enlarged image with NO padding */}
                                    <div className="relative size-20 sm:size-21 shrink-0 rounded-xl bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="90px"
                                        className="object-contain"
                                      />
                                    </div>

                                    <div className="min-w-0">
                                      <h4 className="text-[13.5px] font-semibold text-ink leading-snug line-clamp-1">
                                        {item.name}
                                      </h4>
                                      <p className="text-[11.5px] text-muted mt-0.5">
                                        {item.specs}
                                      </p>
                                      <p className="font-semibold text-ink text-[14px] mt-1.5">
                                        ${item.price.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Stepper centered vertically */}
                                  <div className="flex items-center rounded-lg border border-line bg-white shadow-2xs shrink-0 self-center">
                                    <button
                                      type="button"
                                      onClick={() => handleQtyChange(item.id, Math.max(1, qty - 1))}
                                      className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-cream-100 transition-colors text-xs font-semibold cursor-pointer"
                                    >
                                      -
                                    </button>
                                    <span className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-ink">
                                      {qty}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleQtyChange(item.id, qty + 1)}
                                      className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-cream-100 transition-colors text-xs font-semibold cursor-pointer"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              );
                            })}

                            {/* Estimated Delivery Notice Banner (Inside left column under products) */}
                            <div className="rounded-xl bg-[#fcf8f3] border border-[#ebdccb]/70 p-3.5 flex items-center gap-3 text-[12px] sm:text-[12.5px] text-ink">
                              <div className="size-8 rounded-full bg-[#fceddf] flex items-center justify-center text-[#a4532b] shrink-0">
                                <CalendarIcon className="size-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-ink leading-tight">
                                  Estimated delivery for this seller
                                </p>
                                <p className="text-[12px] text-[#686868] mt-1">
                                  3 – 5 business days (Oct 15 – Oct 20, 2026)
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Delivery Options Right Column */}
                          <div>
                            <h4 className="text-[13px] font-semibold text-ink mb-2.5">
                              Choose Delivery Method
                            </h4>

                            <div className="space-y-2.5">
                              {group.seller.shippingOptions.map((opt) => {
                                const isSelected = activeOptionId === opt.id;
                                return (
                                  <label
                                    key={opt.id}
                                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                      isSelected
                                        ? "border-[#d4b88c] bg-[#fcf8f2] shadow-2xs"
                                        : "border-line/70 bg-white hover:border-line hover:bg-cream-50/20"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={`shipping-${group.seller.id}`}
                                      value={opt.id}
                                      checked={isSelected}
                                      onChange={() => handleSelectShipping(group.seller.id, opt.id)}
                                      className="mt-1 size-4 accent-ink"
                                    />

                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="text-[13px] font-semibold text-ink">
                                          {opt.name}
                                        </span>
                                        <span className="text-[13px] font-bold text-ink">
                                          ${opt.price}
                                        </span>
                                      </div>

                                      <p className="text-[11.5px] text-muted mt-0.5">
                                        {opt.duration}
                                      </p>

                                      <div className="flex items-center gap-2 mt-2 flex-wrap text-[11px]">
                                        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-ink-soft">
                                          <PackageIcon width={11} height={11} />
                                          <span>Tracking available</span>
                                        </span>

                                        {opt.status === "confirmed" ? (
                                          <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-emerald-800 font-medium">
                                            <CheckIcon width={10} height={10} className="stroke-[2.5]" />
                                            <span>{opt.statusText}</span>
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-amber-800 font-medium">
                                            <ShieldCheckIcon width={11} height={11} />
                                            <span>{opt.statusText}</span>
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bottom Return to Cart Link (matching screenshot) */}
              <div className="pt-4">
                <Link
                  href="/bag"
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-ink underline underline-offset-4 hover:text-black transition-colors cursor-pointer"
                >
                  <ArrowLeftIcon width={14} height={14} />
                  <span>Back to Cart</span>
                </Link>
              </div>
            </div>

            {/* ====================================================== */}
            {/* RIGHT COLUMN: Order Summary (4 cols - narrowed)        */}
            {/* ====================================================== */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
                {/* Header */}
                <div className="border-b border-line/50 pb-3.5">
                  <h2 className="font-serif text-2xl font-normal text-ink">
                    Order Summary
                  </h2>
                  <p className="mt-0.5 text-[12px] text-muted">
                    {totalItemCount} {totalItemCount === 1 ? "item" : "items"} from {sellerGroups.length} {sellerGroups.length === 1 ? "seller" : "sellers"}
                  </p>
                </div>

                {/* Items in Summary: Price written UNDER each product */}
                <div className="space-y-4">
                  {sellerGroups.map((group) =>
                    group.items.map((item) => {
                      const qty = quantities[item.id] ?? item.quantity ?? 1;

                      return (
                        <div key={`summary-${item.id}`} className="flex items-start gap-3">
                          {/* Thumbnail with NO padding */}
                          <div className="relative size-14 shrink-0 rounded-xl bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="56px"
                              className="object-contain"
                            />
                          </div>

                          {/* Product Info + Price UNDER it */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-ink leading-snug line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-[11.5px] text-muted mt-0.5">
                              {group.seller.name} • Qty: {qty}
                            </p>
                            {/* Price placed UNDER each product, not on the right */}
                            <p className="text-[13px] font-bold text-ink mt-1">
                              ${(item.price * qty).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Calculation breakdown */}
                <div className="border-t border-line/60 pt-4 space-y-2.5 text-[13px]">
                  <div className="flex items-center justify-between text-ink-soft">
                    <span>Item Subtotal ({totalItemCount} items)</span>
                    <span className="font-medium text-ink">${subtotal.toLocaleString()}</span>
                  </div>

                  {/* Dynamic delivery fee row per active seller */}
                  {Object.entries(sellerShippingFees).map(([sellerId, s]) => (
                    <div key={sellerId} className="flex items-center justify-between text-ink-soft">
                      <span>Delivery Fee ({s.sellerName})</span>
                      <span className="font-medium text-ink">${s.fee}</span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-medium">-${discount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-ink-soft">
                    <span className="inline-flex items-center gap-1">
                      <span>Tax (KDV 20%, included)</span>
                      <InfoIcon width={13} height={13} className="text-muted cursor-pointer" />
                    </span>
                    <span className="font-medium text-ink">${tax.toLocaleString()}</span>
                  </div>

                  {/* Total */}
                  <div className="flex items-baseline justify-between border-t border-line/60 pt-3.5">
                    <span className="text-[15px] font-semibold text-ink">Total (incl. tax)</span>
                    <span className="font-serif text-2xl font-bold text-ink">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Continue to Payment Button */}
                <div className="pt-1">
                  <Link
                    href="/payment"
                    className="w-full rounded-full bg-ink py-4 text-[14px] font-semibold text-white shadow-md hover:bg-ink-soft transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRightIcon width={14} height={14} />
                  </Link>
                </div>

                {/* 3 Trust Items below CTA */}
                <div className="border-t border-line/60 pt-4 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="text-[#a4532b] mt-0.5 shrink-0">
                      <LockIcon width={22} height={22} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Secure Checkout</p>
                      <p className="text-[11px] text-muted">PCI-DSS compliant</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-[#a4532b] mt-0.5 shrink-0">
                      <PackageIcon width={22} height={22} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Free &amp; Easy Returns</p>
                      <p className="text-[11px] text-muted">Within 14 days</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-[#a4532b] mt-0.5 shrink-0">
                      <ShieldCheckIcon width={22} height={22} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Your Data is Protected</p>
                      <p className="text-[11px] text-muted">We never share your information</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
