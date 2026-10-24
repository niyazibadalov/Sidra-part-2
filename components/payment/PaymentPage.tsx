"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CreditCardIcon,
  LockIcon,
  ShieldCheckIcon,
  InfoIcon,
} from "@/components/Icons";
import { useCartWishlist } from "@/context/CartWishlistContext";

import ring1 from "@/app/images/ring1.png";
import ring3 from "@/app/images/ring3.png";
import pearis from "@/app/images/pearis.png";

// Brand Logos & Icons
function VisaLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center font-black italic tracking-tighter text-[#1A1F71] text-[15px] select-none ${className}`}
    >
      VISA
    </span>
  );
}

function MastercardLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center relative w-6 h-4 ${className}`}>
      <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] absolute left-0" />
      <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/90 absolute left-2 mix-blend-multiply" />
    </div>
  );
}

function TroyLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-[#009ee0] text-white font-bold text-[9.5px] tracking-wider uppercase select-none ${className}`}
    >
      troy
    </span>
  );
}

function IyzicoLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center font-bold text-[#1a56db] text-[15px] tracking-tight lowercase select-none ${className}`}
    >
      iyzico
    </span>
  );
}

function BankIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m3 9 9-6 9 6" />
      <path d="M4 10h16v2H4z" />
      <path d="M6 12v6M10 12v6M14 12v6M18 12v6" />
      <path d="M3 18h18v3H3z" />
    </svg>
  );
}

function CalendarIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ChevronRightIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function RibbonBadgeIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.4 12.8 17 22l-5-3-5 3 1.6-9.2" />
    </svg>
  );
}

function ShieldProtectionIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// Seller Group Type for Order Summary
type SummaryItem = {
  id: string;
  name: string;
  brand?: string;
  price: number;
  specs?: string;
  image: any;
  quantity: number;
};

type SellerGroup = {
  sellerId: string;
  sellerName: string;
  avatarInitial: string;
  items: SummaryItem[];
  itemsSubtotal: number;
  deliveryFee: number;
  tax: number;
};

const DEFAULT_ITEMS: SummaryItem[] = [
  {
    id: "pay-item-1",
    name: "Solitaire Diamond Ring",
    brand: "Lumea Jewellery",
    price: 1250,
    specs: "18K Gold • Size: 52",
    image: ring1,
    quantity: 1,
  },
  {
    id: "pay-item-2",
    name: "Malachite Clover Necklace",
    brand: "Lumea Jewellery",
    price: 1420,
    specs: "18K Gold",
    image: ring3,
    quantity: 1,
  },
  {
    id: "pay-item-3",
    name: "Pearl Drop Earrings",
    brand: "Aurora Jewellery",
    price: 975,
    specs: "18K Gold",
    image: pearis,
    quantity: 1,
  },
];

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
  phoneNumber?: string;
  phoneCode?: string;
};

const DEFAULT_SAVED_ADDRESS: AddressData = {
  fullName: "Hüseyin Aliyev",
  firstName: "Hüseyin",
  lastName: "Aliyev",
  streetAddress: "Barbaros Mah. Ihlamur Sok. No:5 D:12",
  apartment: "",
  city: "Beşiktaş",
  stateProvince: "İstanbul",
  postalCode: "34353",
  country: "TR",
  countryLabel: "Türkiye",
  phone: "+90 530 000 00 00",
};

// Seller Templates matching DeliveryPage exactly
const SELLER_TEMPLATES = [
  { id: "seller-lumea", name: "Lumea Jewellery", avatarInitial: "L", defaultFee: 25 },
  { id: "seller-aurora", name: "Aurora Jewellery", avatarInitial: "A", defaultFee: 45 },
  { id: "seller-eclat", name: "Éclat Atelier", avatarInitial: "E", defaultFee: 25 },
  { id: "seller-volana", name: "Volana Fine Studio", avatarInitial: "V", defaultFee: 20 },
];

export function PaymentPage() {
  const { cart } = useCartWishlist();

  // Dynamic Address State loaded from localStorage
  const [address, setAddress] = useState<AddressData>(DEFAULT_SAVED_ADDRESS);

  // Persisted delivery summary from DeliveryPage
  const [persistedSellers, setPersistedSellers] = useState<any[] | null>(null);

  useEffect(() => {
    try {
      const savedAddress = localStorage.getItem("sidra_checkout_address");
      if (savedAddress) {
        const parsed = JSON.parse(savedAddress);
        setAddress((prev) => ({
          ...prev,
          ...parsed,
          fullName:
            parsed.fullName ||
            (parsed.firstName && parsed.lastName
              ? `${parsed.firstName} ${parsed.lastName}`
              : prev.fullName),
          phone:
            parsed.phone ||
            (parsed.phoneNumber
              ? `${parsed.phoneCode || ""} ${parsed.phoneNumber}`.trim()
              : prev.phone),
        }));
      }

      const savedDelivery = localStorage.getItem("sidra_delivery_summary");
      if (savedDelivery) {
        const parsed = JSON.parse(savedDelivery);
        if (parsed?.sellers && Array.isArray(parsed.sellers) && parsed.sellers.length > 0) {
          setPersistedSellers(parsed.sellers);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Form states for Payment Method
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank" | "other">("card");
  const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
  const [cardholderName, setCardholderName] = useState(
    address.fullName || "Hüseyin Aliyev"
  );
  const [expiryDate, setExpiryDate] = useState("MM / YY");
  const [cvv, setCvv] = useState("123");
  const [saveCard, setSaveCard] = useState(true);

  // Sync cardholder name if address loads
  useEffect(() => {
    if (address.fullName && cardholderName === "Hüseyin Aliyev") {
      setCardholderName(address.fullName);
    }
  }, [address.fullName, cardholderName]);

  // Installment selection
  const [installment, setInstallment] = useState("single");

  // Billing address selection
  const [billingChoice, setBillingChoice] = useState<"same" | "different">("same");

  // Promo Code accordion state
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState<string | null>(null);

  // Accordion state for sellers in order summary
  const [collapsedSellers, setCollapsedSellers] = useState<Record<string, boolean>>({});

  const toggleSellerCollapse = (sellerId: string) => {
    setCollapsedSellers((prev) => ({ ...prev, [sellerId]: !prev[sellerId] }));
  };

  // Build items list from cart or defaults
  const items: SummaryItem[] = useMemo(() => {
    if (cart && cart.length > 0) {
      return cart.map((c, idx) => ({
        id: c.id,
        name: c.name,
        brand: c.brand || (idx % 2 === 0 ? "Lumea Jewellery" : "Aurora Jewellery"),
        price: c.price,
        specs: c.specs || (c as any).size ? `18K Gold • Size: ${(c as any).size}` : "18K Gold",
        image: c.image || ring1,
        quantity: c.quantity || 1,
      }));
    }
    return DEFAULT_ITEMS;
  }, [cart]);

  // Group items by seller matching DeliveryPage exactly (Never generic "SIDRA")
  const sellerGroups: SellerGroup[] = useMemo(() => {
    // 1. If active delivery summary was saved from DeliveryPage, use it directly!
    if (persistedSellers && persistedSellers.length > 0) {
      return persistedSellers.map((seller: any) => {
        const mappedItems: SummaryItem[] = seller.items.map((it: any) => {
          const matched = items.find((orig) => orig.id === it.id);
          return {
            id: it.id,
            name: it.name,
            brand: seller.sellerName,
            price: it.price,
            specs: it.specs || "18K Gold",
            image: matched ? matched.image : ring1,
            quantity: it.quantity || 1,
          };
        });

        const subtotal =
          seller.itemsSubtotal ||
          mappedItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        const deliveryFee = typeof seller.deliveryFee === "number" ? seller.deliveryFee : 25;
        const tax = typeof seller.tax === "number" ? seller.tax : Math.round(subtotal * 0.2);

        return {
          sellerId: seller.sellerId,
          sellerName: seller.sellerName,
          avatarInitial: seller.avatarInitial || seller.sellerName.charAt(0) || "L",
          items: mappedItems,
          itemsSubtotal: subtotal,
          deliveryFee,
          tax,
        };
      });
    }

    // 2. Default design items: 2 in Lumea Jewellery, 1 in Aurora Jewellery
    if (items === DEFAULT_ITEMS) {
      return [
        {
          sellerId: SELLER_TEMPLATES[0].id,
          sellerName: SELLER_TEMPLATES[0].name,
          avatarInitial: SELLER_TEMPLATES[0].avatarInitial,
          items: [DEFAULT_ITEMS[0], DEFAULT_ITEMS[1]],
          itemsSubtotal: DEFAULT_ITEMS[0].price + DEFAULT_ITEMS[1].price,
          deliveryFee: SELLER_TEMPLATES[0].defaultFee,
          tax: Math.round((DEFAULT_ITEMS[0].price + DEFAULT_ITEMS[1].price) * 0.2),
        },
        {
          sellerId: SELLER_TEMPLATES[1].id,
          sellerName: SELLER_TEMPLATES[1].name,
          avatarInitial: SELLER_TEMPLATES[1].avatarInitial,
          items: [DEFAULT_ITEMS[2]],
          itemsSubtotal: DEFAULT_ITEMS[2].price,
          deliveryFee: SELLER_TEMPLATES[1].defaultFee,
          tax: Math.round(DEFAULT_ITEMS[2].price * 0.2),
        },
      ];
    }

    // 3. Dynamic chunking matching DeliveryPage (Max 3 items per seller slot)
    const result: SellerGroup[] = [];
    const maxPerBlock = 3;

    for (let i = 0; i < items.length; i += maxPerBlock) {
      const slice = items.slice(i, i + maxPerBlock);
      const templateIdx = Math.floor(i / maxPerBlock) % SELLER_TEMPLATES.length;
      const template = SELLER_TEMPLATES[templateIdx];
      const subtotal = slice.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

      result.push({
        sellerId: `${template.id}-${Math.floor(i / maxPerBlock)}`,
        sellerName: template.name,
        avatarInitial: template.avatarInitial,
        items: slice.map((it) => ({
          ...it,
          brand: template.name,
        })),
        itemsSubtotal: subtotal,
        deliveryFee: template.defaultFee,
        tax: Math.round(subtotal * 0.2),
      });
    }

    return result;
  }, [items, persistedSellers]);

  // Total summary calculations
  const totalItemCount = sellerGroups.reduce(
    (acc, seller) => acc + seller.items.reduce((s, it) => s + it.quantity, 0),
    0
  );
  const totalSellersCount = sellerGroups.length;
  const itemsGrandSubtotal = sellerGroups.reduce((acc, curr) => acc + curr.itemsSubtotal, 0);
  const totalDeliveryFee = sellerGroups.reduce((acc, curr) => acc + curr.deliveryFee, 0);
  const totalTax = sellerGroups.reduce((acc, curr) => acc + curr.tax, 0);
  const discountAmount = promoApplied ? 50 : 0;
  const grandTotal = itemsGrandSubtotal + totalDeliveryFee + totalTax - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(promoCode.trim().toUpperCase());
      setPromoCode("");
    }
  };

  return (
    <>
      <TopBar />
      <Header />

      <main className="min-h-screen bg-[#faf8f5]">
        {/* ====================================================== */}
        {/* HERO BANNER SECTION (No image, clean layout)           */}
        {/* ====================================================== */}
        <section className="border-b border-line/60 bg-[#faf8f5] pt-10 pb-8 sm:pt-14 sm:pb-12">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left Title & Description */}
              <div>
                <h1 className="font-serif text-[36px] sm:text-[42px] lg:text-[46px] font-normal text-ink tracking-tight leading-tight">
                  Payment
                </h1>
                <p className="mt-2 text-[13.5px] sm:text-[14px] text-ink-soft max-w-xl">
                  Choose your preferred payment method. All transactions are secure and encrypted.
                </p>
              </div>

              {/* Right 4-step Stepper Indicator */}
              {/* Step 1 & 2 are checked ✓, Step 3 is active 3, Step 4 is inactive 4 */}
              <div className="flex items-center self-start md:self-auto shrink-0 pt-2 md:pt-0">
                {/* Step 1: Cart (Checked) */}
                <div className="flex flex-col items-center">
                  <Link
                    href="/cart"
                    className="w-8 h-8 rounded-full border border-ink bg-ink text-white flex items-center justify-center transition-colors hover:bg-neutral-800"
                    title="Cart"
                  >
                    <CheckIcon width={13} height={13} className="stroke-[2.5]" />
                  </Link>
                  <span className="text-[11.5px] sm:text-[12px] font-medium text-ink mt-1.5">
                    Cart
                  </span>
                </div>

                {/* Line 1 -> 2 (Dark) */}
                <div className="w-8 sm:w-12 lg:w-16 h-[1.5px] bg-ink mb-5 mx-1 sm:mx-1.5" />

                {/* Step 2: Delivery (Checked) */}
                <div className="flex flex-col items-center">
                  <Link
                    href="/delivery"
                    className="w-8 h-8 rounded-full border border-ink bg-ink text-white flex items-center justify-center transition-colors hover:bg-neutral-800"
                    title="Delivery"
                  >
                    <CheckIcon width={13} height={13} className="stroke-[2.5]" />
                  </Link>
                  <span className="text-[11.5px] sm:text-[12px] font-medium text-ink mt-1.5">
                    Delivery
                  </span>
                </div>

                {/* Line 2 -> 3 (Dark) */}
                <div className="w-8 sm:w-12 lg:w-16 h-[1.5px] bg-ink mb-5 mx-1 sm:mx-1.5" />

                {/* Step 3: Payment (Active Solid Black) */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-[13px] font-semibold shadow-sm">
                    3
                  </div>
                  <span className="text-[11.5px] sm:text-[12px] font-bold text-ink mt-1.5">
                    Payment
                  </span>
                </div>

                {/* Line 3 -> 4 (Light) */}
                <div className="w-8 sm:w-12 lg:w-16 h-[1.5px] bg-line/80 mb-5 mx-1 sm:mx-1.5" />

                {/* Step 4: Review (Inactive) */}
                <div className="flex flex-col items-center opacity-60">
                  <div className="w-8 h-8 rounded-full border border-line bg-white text-muted flex items-center justify-center text-[13px] font-medium">
                    4
                  </div>
                  <span className="text-[11.5px] sm:text-[12px] font-medium text-muted mt-1.5">
                    Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* MAIN 2-COLUMN CONTENT                                  */}
        {/* ====================================================== */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            {/* ====================================================== */}
            {/* LEFT COLUMN: Payment Options (lg:col-span-7)          */}
            {/* ====================================================== */}
            <div className="lg:col-span-7 space-y-8">
              {/* ---------------------------------------------------- */}
              {/* 1. Payment Method                                     */}
              {/* ---------------------------------------------------- */}
              <div>
                <h2 className="font-serif text-2xl font-normal text-ink mb-4">
                  1. Payment Method
                </h2>

                <div className="space-y-3.5">
                  {/* Option 1: Credit / Debit Card (Selected) */}
                  <div
                    onClick={() => setSelectedMethod("card")}
                    className={`rounded-2xl transition-all cursor-pointer ${
                      selectedMethod === "card"
                        ? "border border-[#ebdccb] bg-[#fffaf5] p-5 sm:p-6 shadow-2xs"
                        : "border border-line/80 bg-white p-5 hover:border-line"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-4 h-4 rounded-full border border-ink flex items-center justify-center shrink-0">
                          {selectedMethod === "card" && (
                            <div className="w-2 h-2 rounded-full bg-ink" />
                          )}
                        </div>
                        <div>
                          <span className="text-[14.5px] sm:text-[15px] font-medium text-ink block leading-tight">
                            Credit / Debit Card
                          </span>
                          <span className="text-[12px] sm:text-[12.5px] text-ink-soft block mt-0.5">
                            Pay securely with your card
                          </span>
                        </div>
                      </div>

                      {/* Card brand logos on right */}
                      <div className="flex items-center gap-2 shrink-0">
                        <VisaLogo />
                        <MastercardLogo />
                        <TroyLogo />
                      </div>
                    </div>

                    {/* Card details form (visible when selected) */}
                    {selectedMethod === "card" && (
                      <div
                        className="mt-5 pt-4 border-t border-line/40 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Card Number */}
                        <div>
                          <label
                            htmlFor="pay-card-num"
                            className="block text-[12.5px] font-medium text-ink mb-1.5"
                          >
                            Card Number
                          </label>
                          <div className="relative">
                            <input
                              id="pay-card-num"
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 pr-10 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted">
                              <CreditCardIcon width={18} height={18} />
                            </div>
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div>
                          <label
                            htmlFor="pay-card-holder"
                            className="block text-[12.5px] font-medium text-ink mb-1.5"
                          >
                            Cardholder Name
                          </label>
                          <input
                            id="pay-card-holder"
                            type="text"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            placeholder="Full name as printed on card"
                            className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                          />
                        </div>

                        {/* Expiry Date & CVV */}
                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <label
                              htmlFor="pay-card-exp"
                              className="block text-[12.5px] font-medium text-ink mb-1.5"
                            >
                              Expiry Date
                            </label>
                            <input
                              id="pay-card-exp"
                              type="text"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              placeholder="MM / YY"
                              maxLength={7}
                              className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="pay-card-cvv"
                              className="block text-[12.5px] font-medium text-ink mb-1.5"
                            >
                              CVV
                            </label>
                            <div className="relative">
                              <input
                                id="pay-card-cvv"
                                type="password"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="123"
                                maxLength={4}
                                className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 pr-9 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                              />
                              <div
                                title="3-digit security code on back of card"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-ink cursor-pointer"
                              >
                                <InfoIcon width={15} height={15} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Save Card Checkbox */}
                        <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                            className="size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                          />
                          <span className="text-[12.5px] text-ink-soft">
                            Save this card for future purchases
                          </span>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Option 2: Bank Transfer / EFT (iyzico) */}
                  <div
                    onClick={() => setSelectedMethod("bank")}
                    className={`rounded-2xl border p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all ${
                      selectedMethod === "bank"
                        ? "border-[#ebdccb] bg-[#fffaf5] shadow-2xs"
                        : "border-line/80 bg-white hover:border-line"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-4 h-4 rounded-full border border-ink flex items-center justify-center shrink-0">
                        {selectedMethod === "bank" && (
                          <div className="w-2 h-2 rounded-full bg-ink" />
                        )}
                      </div>
                      <div>
                        <span className="text-[14.5px] font-medium text-ink block leading-tight">
                          Bank Transfer / EFT (iyzico)
                        </span>
                        <span className="text-[12px] text-ink-soft block mt-0.5">
                          Pay via bank transfer with iyzico secure payment
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-ink shrink-0">
                      <BankIcon className="w-5 h-5 text-ink/70" />
                      <IyzicoLogo />
                    </div>
                  </div>

                  {/* Option 3: Other Payment Methods */}
                  <div
                    onClick={() => setSelectedMethod("other")}
                    className={`rounded-2xl border p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all ${
                      selectedMethod === "other"
                        ? "border-[#ebdccb] bg-[#fffaf5] shadow-2xs"
                        : "border-line/80 bg-white hover:border-line"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-4 h-4 rounded-full border border-ink flex items-center justify-center shrink-0">
                        {selectedMethod === "other" && (
                          <div className="w-2 h-2 rounded-full bg-ink" />
                        )}
                      </div>
                      <div>
                        <span className="text-[14.5px] font-medium text-ink block leading-tight">
                          Other Payment Methods
                        </span>
                        <span className="text-[12px] text-ink-soft block mt-0.5">
                          Installment plans (available for eligible cards)
                        </span>
                      </div>
                    </div>

                    <div className="text-muted shrink-0">
                      <ChevronRightIcon width={16} height={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 2. Installment Options (Optional)                    */}
              {/* ---------------------------------------------------- */}
              <div>
                <h2 className="font-serif text-2xl font-normal text-ink">
                  2. Installment Options <span className="text-muted text-[16px] font-sans font-normal">(Optional)</span>
                </h2>
                <p className="mt-1 text-[13px] text-ink-soft">
                  Choose an installment plan if supported by your card.
                </p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* Dropdown with Badge */}
                  <div className="relative">
                    <select
                      value={installment}
                      onChange={(e) => setInstallment(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-line bg-white px-3.5 py-3 pr-10 text-[13.5px] font-medium text-ink focus:border-ink focus:outline-none transition-colors shadow-2xs cursor-pointer"
                    >
                      <option value="single">Peşin Ödeme (Tek Çekim)</option>
                      <option value="3">3 Taksit / Installments ($1,592 / month)</option>
                      <option value="6">6 Taksit / Installments ($820 / month)</option>
                      <option value="9">9 Taksit / Installments ($560 / month)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted">
                      <ChevronDownIcon width={15} height={15} />
                    </div>
                  </div>

                  {/* Info Notice Box */}
                  <div className="rounded-xl border border-amber-200/70 bg-[#fffaf5] p-3 sm:p-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
                      <CalendarIcon className="w-4 h-4" />
                    </div>
                    <p className="text-[11.5px] sm:text-[12px] text-ink-soft leading-snug">
                      Installment options will appear automatically for eligible cards (Visa, Mastercard, TROY).
                    </p>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 3. Billing Address                                  */}
              {/* ---------------------------------------------------- */}
              <div>
                <h2 className="font-serif text-2xl font-normal text-ink mb-4">
                  3. Billing Address
                </h2>

                <div className="space-y-3.5">
                  {/* Radio 1: Same as delivery address (Selected) */}
                  <div
                    onClick={() => setBillingChoice("same")}
                    className={`rounded-2xl transition-all cursor-pointer ${
                      billingChoice === "same"
                        ? "border border-[#ebdccb] bg-[#fffaf5] p-5 sm:p-6 shadow-2xs"
                        : "border border-line/80 bg-white p-5 hover:border-line"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <div className="w-4 h-4 rounded-full border border-ink flex items-center justify-center shrink-0 mt-0.5">
                          {billingChoice === "same" && (
                            <div className="w-2 h-2 rounded-full bg-ink" />
                          )}
                        </div>
                        <div>
                          <span className="text-[14.5px] font-semibold text-ink block leading-tight">
                            Same as delivery address
                          </span>

                          {/* Dynamic address rendered from checkout state */}
                          <div className="mt-2 text-[13px] text-ink-soft space-y-0.5 leading-relaxed font-normal">
                            <p className="font-medium text-ink">
                              {address.fullName || `${address.firstName || ""} ${address.lastName || ""}`.trim() || "Hüseyin Aliyev"}
                            </p>
                            <p>
                              {address.streetAddress || "Barbaros Mah. Ihlamur Sok. No:5 D:12"}
                              {address.apartment ? `, ${address.apartment}` : ""}
                            </p>
                            <p>
                              {address.city || "Beşiktaş"}
                              {address.stateProvince ? `, ${address.stateProvince}` : ""} {address.postalCode || "34353"}
                            </p>
                            <p>{address.countryLabel || address.country || "Türkiye"}</p>
                            <p className="text-[12.5px] text-muted">
                              {address.phone || "+90 530 000 00 00"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Edit link leading back to /checkout */}
                      <Link
                        href="/checkout"
                        className="text-[12.5px] font-medium text-ink underline underline-offset-2 hover:text-black shrink-0 cursor-pointer"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>

                  {/* Radio 2: Use a different billing address */}
                  <div
                    onClick={() => setBillingChoice("different")}
                    className={`rounded-2xl border p-4 sm:p-5 flex items-center gap-3.5 cursor-pointer transition-all ${
                      billingChoice === "different"
                        ? "border-[#ebdccb] bg-[#fffaf5] shadow-2xs"
                        : "border-line/80 bg-white hover:border-line"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border border-ink flex items-center justify-center shrink-0">
                      {billingChoice === "different" && (
                        <div className="w-2 h-2 rounded-full bg-ink" />
                      )}
                    </div>
                    <span className="text-[14px] font-medium text-ink">
                      Use a different billing address
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* RIGHT COLUMN: Order Summary (lg:col-span-5)           */}
            {/* ====================================================== */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
              <div className="rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
                {/* Header */}
                <div className="flex items-baseline justify-between border-b border-line/50 pb-3.5">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <h2 className="font-serif text-2xl font-normal text-ink">
                      Order Summary
                    </h2>
                    <span className="text-[12px] text-muted font-normal">
                      ({totalItemCount} items from {totalSellersCount} {totalSellersCount === 1 ? "seller" : "sellers"})
                    </span>
                  </div>
                  <Link
                    href="/cart"
                    className="text-[12.5px] font-medium text-ink underline underline-offset-2 hover:text-black cursor-pointer"
                  >
                    Edit
                  </Link>
                </div>

                {/* Seller Blocks */}
                <div className="space-y-6 pt-1">
                  {sellerGroups.map((seller) => {
                    const isCollapsed = collapsedSellers[seller.sellerId];
                    return (
                      <div
                        key={seller.sellerId}
                        className="rounded-xl border border-line/70 bg-[#faf8f5]/50 p-4 space-y-4"
                      >
                        {/* Seller Header */}
                        <div
                          onClick={() => toggleSellerCollapse(seller.sellerId)}
                          className="flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-800 text-[11px] font-semibold flex items-center justify-center">
                              {seller.avatarInitial}
                            </div>
                            <span className="text-[14px] font-semibold text-ink">
                              {seller.sellerName}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-muted text-[12px]">
                            <span>
                              {seller.items.length}{" "}
                              {seller.items.length === 1 ? "item" : "items"}
                            </span>
                            <ChevronDownIcon
                              width={14}
                              height={14}
                              className={`transition-transform duration-200 ${
                                isCollapsed ? "" : "rotate-180"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Seller Items List (without inner padding on thumbnails!) */}
                        {!isCollapsed && (
                          <div className="space-y-3.5 pt-1 border-t border-line/40">
                            {seller.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-start gap-3.5 pt-2"
                              >
                                {/* Thumbnail: NO PADDING (p-0) */}
                                <div className="relative w-14 h-14 rounded-lg bg-white border border-line/60 flex items-center justify-center overflow-hidden shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-contain p-0"
                                  />
                                </div>

                                {/* Details: Name, specs, price directly underneath */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-[13px] font-medium text-ink leading-snug truncate">
                                    {item.name}
                                  </h4>
                                  {item.specs && (
                                    <p className="text-[11.5px] text-muted mt-0.5 truncate">
                                      {item.specs}
                                    </p>
                                  )}
                                  {/* Price underneath as requested */}
                                  <p className="mt-1 text-[13px] font-semibold text-ink">
                                    ${item.price.toLocaleString()}
                                  </p>
                                </div>

                                {/* Quantity on the right */}
                                <span className="text-[12.5px] text-muted font-medium pt-1 shrink-0">
                                  x{item.quantity}
                                </span>
                              </div>
                            ))}

                            {/* Seller breakdown */}
                            <div className="border-t border-line/40 pt-3 space-y-1.5 text-[12.5px]">
                              <div className="flex items-center justify-between text-ink-soft">
                                <span>Items Subtotal</span>
                                <span className="font-medium text-ink">
                                  ${seller.itemsSubtotal.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-ink-soft">
                                <span>Delivery Fee</span>
                                <span className="font-medium text-ink">
                                  ${seller.deliveryFee.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-ink-soft">
                                <span className="inline-flex items-center gap-1">
                                  <span>Tax (KDV 20%, included)</span>
                                  <InfoIcon width={12} height={12} className="text-muted" />
                                </span>
                                <span className="font-medium text-ink">
                                  ${seller.tax.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Grand Total Row */}
                <div className="border-t border-line/60 pt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-[15px] font-semibold text-ink">
                      Grand Total
                    </span>
                    <span className="text-[12px] text-muted ml-1">(incl. tax)</span>
                  </div>
                  <span className="font-serif text-2xl sm:text-[26px] font-bold text-ink">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* Add Promo Code Accordion */}
                <div className="border-t border-line/60 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsPromoOpen(!isPromoOpen)}
                    className="w-full flex items-center justify-between py-1 text-[13px] font-medium text-ink hover:text-black transition-colors cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-amber-800 font-bold">%</span>
                      <span>Add Promo Code</span>
                    </span>
                    <ChevronRightIcon
                      width={15}
                      height={15}
                      className={`text-muted transition-transform duration-200 ${
                        isPromoOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {isPromoOpen && (
                    <form
                      onSubmit={handleApplyPromo}
                      className="mt-3 flex gap-2"
                    >
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-1 rounded-xl border border-line bg-cream-50 px-3.5 py-2 text-[12.5px] text-ink placeholder:text-muted focus:border-ink focus:bg-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-ink px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {promoApplied && (
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-1.5 text-[12px] font-medium text-emerald-800">
                      <span>Applied: {promoApplied} (-$50)</span>
                      <button
                        type="button"
                        onClick={() => setPromoApplied(null)}
                        className="text-emerald-900 underline hover:no-underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Continue to Review CTA */}
                <div className="pt-2">
                  <Link
                    href="/review"
                    className="w-full rounded-full bg-ink py-4 text-[14px] font-semibold text-white shadow-md hover:bg-neutral-800 transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue to Review</span>
                    <ArrowRightIcon width={14} height={14} />
                  </Link>
                </div>

                {/* Back to Delivery link */}
                <div className="pt-1 text-center">
                  <Link
                    href="/delivery"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink underline underline-offset-4 hover:text-black transition-colors cursor-pointer"
                  >
                    <ArrowLeftIcon width={13} height={13} />
                    <span>Back to Delivery</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* SECURITY & TRUST BADGES (Desktop only: hidden lg:block) */}
          {/* Full-width dedicated row across the whole container    */}
          {/* ====================================================== */}
          <div className="hidden lg:block border-t border-line/60 pt-8 mt-12">
            <div className="grid grid-cols-4 gap-6 xl:gap-8">
              {/* Badge 1 */}
              <div className="flex items-start gap-3">
                <div className="text-amber-800/80 mt-0.5 shrink-0">
                  <LockIcon width={22} height={22} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink leading-tight">
                    Secure Payment
                  </p>
                  <p className="text-[11.5px] text-muted mt-1 leading-snug">
                    256-bit SSL encryption
                  </p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-start gap-3">
                <div className="text-amber-800/80 mt-0.5 shrink-0">
                  <ShieldCheckIcon width={22} height={22} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink leading-tight">
                    3D Secure
                  </p>
                  <p className="text-[11.5px] text-muted mt-1 leading-snug">
                    Additional card verification
                  </p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-start gap-3">
                <div className="text-amber-800/80 mt-0.5 shrink-0">
                  <ShieldProtectionIcon className="w-5.5 h-5.5 text-amber-800/80" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink leading-tight">
                    Your Data is Protected
                  </p>
                  <p className="text-[11.5px] text-muted mt-1 leading-snug">
                    We never share your information
                  </p>
                </div>
              </div>

              {/* Badge 4 */}
              <div className="flex items-start gap-3">
                <div className="text-amber-800/80 mt-0.5 shrink-0">
                  <RibbonBadgeIcon className="w-5.5 h-5.5 text-amber-800/80" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink leading-tight">
                    Trusted by Thousands
                  </p>
                  <p className="text-[11.5px] text-muted mt-1 leading-snug">
                    Safe and reliable checkout
                  </p>
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