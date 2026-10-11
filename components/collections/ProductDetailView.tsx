"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TopBar } from "../layout/TopBar";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { ImpactBanner } from "../home/ImpactBanner";
import { CollectionsProductCard } from "./CollectionsProductCard";
import { RingProduct, RING_PRODUCTS } from "./data";
import {
  HeartIcon,
  ShareIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
  ShieldCheckIcon,
  RotateCcwIcon,
  BadgeCheckIcon,
  DiamondIcon,
  LeafIcon,
  ArrowRightIcon,
} from "../Icons";

import ring1 from "@/app/images/ring1.png";
import ring2 from "@/app/images/ring2.png";
import ring3 from "@/app/images/ring3.png";
import ring4 from "@/app/images/ring4.png";
import ring5 from "@/app/images/ring5.png";
import ring6 from "@/app/images/ring6.png";

type ProductDetailViewProps = {
  product: RingProduct;
};

const MATERIALS = ["18K Gold", "14K Gold", "White Gold", "Platinum"];
const DIAMOND_SIZES = ["0.50 ct", "0.70 ct", "1.00 ct", "1.50 ct"];
const RING_SIZES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function ProductDetailView({ product }: ProductDetailViewProps) {
  // 5 neat gallery images
  const pool = [product.image, ring5, ring1, ring2, ring3, ring4, ring6];
  const galleryImages: StaticImageData[] = [
    product.image,
    ...pool.filter((img) => img !== product.image),
  ].slice(0, 5);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(
    product.material || "18K Gold"
  );
  const [selectedDiamondSize, setSelectedDiamondSize] = useState("0.70 ct");
  const [selectedRingSize, setSelectedRingSize] = useState<number>(7);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedWishlist, setRelatedWishlist] = useState<Record<string, boolean>>({});

  // Accordion open/close states (ALL START CLOSED per user requirement)
  const [openAccordions, setOpenAccordions] = useState({
    description: false,
    details: false,
    shipping: false,
    reviews: false,
    brandStory: false,
  });

  const toggleAccordion = (key: keyof typeof openAccordions) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 4 other products for "You May Also Like"
  const relatedProducts = RING_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const originalPrice = product.originalPrice ?? Math.round(product.price * 1.16);
  const discount = product.discount ?? "14% OFF";
  const installment = (product.price / 4).toFixed(2);
  const subtitle =
    product.subtitle ??
    "A timeless design for a lifetime of meaningful moments.";
  const rating = product.rating ?? 4.8;
  const reviewsCount = product.reviewsCount ?? 124;

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-cream-50 text-ink">
        {/* Main Product Showcase Section */}
        <section className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* LEFT COLUMN: Gallery on Desktop + Left Side */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
              {/* GALLERY CONTAINER:
                  - Mobile & Tablet: Big image on top, 5 thumbnails BELOW it
                  - Desktop (lg+): 5 thumbnails on the LEFT (vertical), big image on the RIGHT
              */}
              <div className="flex flex-col lg:flex-row-reverse lg:items-start lg:gap-5">
                {/* Main Big Image Frame */}
                <div className="relative flex-1 aspect-square sm:aspect-4/4 lg:aspect-square w-full rounded-2xl border border-line/70 bg-[#fbf8f4] shadow-xs">
                  {/* Badge (Rendered ONLY if product has badge in data!) */}
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 z-10 rounded-md px-3 py-1 text-[11.5px] font-semibold tracking-wide shadow-2xs ${
                        product.badge === "Bestseller"
                          ? "bg-[#faeed6] text-[#93661e]"
                          : product.badge === "New"
                          ? "bg-[#e8f1e9] text-[#3e6843]"
                          : "bg-[#fae8e2] text-[#9c4b37]"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Top Right Action Buttons: Share & Wishlist */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Share product"
                      className="grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-xs backdrop-blur-xs transition-colors hover:bg-white hover:text-ink-soft"
                    >
                      <ShareIcon width={17} height={17} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      className="grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-xs backdrop-blur-xs transition-colors hover:bg-white"
                    >
                      <HeartIcon
                        width={17}
                        height={17}
                        className={`transition-transform active:scale-125 ${
                          isWishlisted ? "fill-[#b74134] text-[#b74134]" : "text-ink"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Left & Right navigation arrows on the image (visible ONLY on Mobile & Tablet, hidden on Desktop) */}
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute top-1/2 left-3 -translate-y-1/2 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur-xs transition-colors hover:bg-white sm:size-10 sm:left-4 lg:hidden"
                  >
                    <ChevronLeftIcon width={18} height={18} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute top-1/2 right-3 -translate-y-1/2 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur-xs transition-colors hover:bg-white sm:size-10 sm:right-4 lg:hidden"
                  >
                    <ChevronRightIcon width={18} height={18} />
                  </button>

                  {/* Big Image itself */}
                  <div className="relative size-full p-8 sm:p-12 lg:p-14">
                    <Image
                      src={galleryImages[activeImageIndex]}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-contain"
                    />
                  </div>

                  {/* Cursive brand text on bottom left matching 1st screenshot (white, slightly tilted, with handwritten underline arrow) */}
                  <div className="pointer-events-none absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-10 select-none">
                    <div className="relative -rotate-6 transform">
                      <p className="font-script text-2xl leading-[1.1] text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] sm:text-3xl lg:text-[34px]">
                        More
                        <br />
                        Stories
                        <br />
                        Brighter
                        <br />
                        Lives
                      </p>
                      {/* Handwritten underline with arrow tail */}
                      <svg
                        viewBox="0 0 100 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-1 h-3.5 w-24 text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                      >
                        <path
                          d="M2 8 C 30 18, 70 4, 96 16"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M84 10 L 96 16 L 87 22"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Counter:
                      - Mobile & Tablet: Simple subtle pill with '1/5'
                      - Desktop: Unified '< 1/5 >' capsule button with interactive arrows matching screenshot
                  */}
                  {/* Mobile & Tablet counter pill */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center rounded-full bg-ink/70 px-3 py-1 text-[11.5px] font-medium text-white backdrop-blur-xs shadow-xs lg:hidden">
                    <span className="tabular-nums">
                      {activeImageIndex + 1} / {galleryImages.length}
                    </span>
                  </div>

                  {/* Desktop counter capsule with < 1/5 > */}
                  <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-2.5 rounded-full bg-ink/65 px-3.5 py-1.5 text-[12.5px] font-medium text-white backdrop-blur-xs shadow-xs transition-opacity lg:flex">
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                      className="cursor-pointer transition-transform hover:scale-125 hover:text-white"
                    >
                      ‹
                    </button>
                    <span className="tabular-nums px-0.5">
                      {activeImageIndex + 1} / {galleryImages.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next image"
                      className="cursor-pointer transition-transform hover:scale-125 hover:text-white"
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* 5 Thumbnails:
                    - Mobile & Tablet: Row under big image (mt-4, p-1 to prevent border clipping)
                    - Desktop: Column on left of big image (shrink-0 lg:mt-0)
                */}
                <div className="mt-4 flex flex-row items-center gap-3 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3.5 lg:mt-0 lg:flex-col lg:overflow-visible shrink-0">
                  {galleryImages.map((img, idx) => {
                    const isActive = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`group relative size-16 sm:size-20 lg:size-[84px] cursor-pointer rounded-lg bg-[#f9f5f0] p-1.5 transition-all duration-200 shrink-0 ${
                          isActive
                            ? "border-2 border-ink shadow-xs"
                            : "border border-line/70 hover:border-sand-400"
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${idx + 1}`}
                          fill
                          sizes="84px"
                          className="object-contain rounded-lg"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4 Trust Highlights under Gallery — VISIBLE ONLY ON DESKTOP (hidden on mobile/tablet) */}
              <div className="mt-8 hidden border-t border-b border-line/60 py-6 lg:grid lg:grid-cols-4 lg:gap-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-200/70 text-ink">
                    <DiamondIcon width={18} height={18} />
                  </div>
                  <span className="text-[12px] font-medium leading-tight text-ink">
                    Ethically Sourced
                    <br />
                    Diamonds
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-200/70 text-ink">
                    <ShieldCheckIcon width={18} height={18} />
                  </div>
                  <span className="text-[12px] font-medium leading-tight text-ink">
                    Certified & Verified
                    <br />
                    Jewellery
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-200/70 text-ink">
                    <TruckIcon width={18} height={18} />
                  </div>
                  <span className="text-[12px] font-medium leading-tight text-ink">
                    Global Delivery
                    <br />
                    To 100+ Countries
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-200/70 text-ink">
                    <LeafIcon width={18} height={18} />
                  </div>
                  <span className="text-[12px] font-medium leading-tight text-ink">
                    A More Sustainable
                    <br />
                    Future
                  </span>
                </div>
              </div>

              {/* You May Also Like Section (Desktop left column placement) */}
              <div className="mt-8 pt-2 hidden lg:block">
                <div className="mb-6 flex items-baseline justify-between">
                  <h2
                    id="related-products-title-desktop"
                    className="font-serif text-2xl text-ink lg:text-[28px]"
                  >
                    You May Also Like
                  </h2>
                  <Link
                    href="/category"
                    className="group flex cursor-pointer items-center gap-1 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    <span>View All</span>
                    <ArrowRightIcon
                      width={14}
                      height={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {relatedProducts.map((relProduct) => (
                    <CollectionsProductCard
                      key={relProduct.id}
                      product={relProduct}
                      isWishlisted={Boolean(relatedWishlist[relProduct.id])}
                      onToggleWishlist={(id) =>
                        setRelatedWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Details, Options, & Actions */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
              {/* Brand label */}
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted">
                SIDRA FINE JEWELLERY
              </span>

              {/* Product Name */}
              <h1 className="mt-1 font-serif text-3xl font-normal text-ink sm:text-4xl">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft sm:text-[14px]">
                {subtitle}
              </p>

              {/* Reviews & Rating */}
              <div className="mt-3.5 flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      width={15}
                      height={15}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-[13px] font-semibold text-ink">
                  {rating}
                </span>
                <span className="text-[13px] text-muted">
                  ({reviewsCount} reviews)
                </span>
              </div>

              {/* Price & Discount */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold text-ink sm:text-[34px]">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-[17px] text-muted line-through">
                  ${originalPrice.toLocaleString()}
                </span>
                <span className="rounded-md bg-[#fae8e2] px-2 py-0.5 text-[11px] font-bold text-[#b74134]">
                  {discount}
                </span>
              </div>

              {/* Klarna Installments */}
              <p className="mt-2 text-[12.5px] text-ink-soft">
                or 4 payments of <strong className="font-semibold text-ink">${installment}</strong> with{" "}
                <span className="font-semibold text-ink">Klarna.</span>{" "}
                <span className="cursor-pointer text-[12px] text-muted underline">ⓘ</span>
              </p>

              {/* Material Selector */}
              <div className="mt-6">
                <label className="text-[13px] font-semibold text-ink">
                  Material
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {MATERIALS.map((mat) => {
                    const isSelected = selectedMaterial === mat;
                    return (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => setSelectedMaterial(mat)}
                        className={`cursor-pointer rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-all ${
                          isSelected
                            ? "border-ink bg-white font-semibold text-ink shadow-xs ring-1 ring-ink"
                            : "border-line bg-white/70 text-ink-soft hover:border-sand-400"
                        }`}
                      >
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Diamond Size Selector */}
              <div className="mt-5">
                <label className="text-[13px] font-semibold text-ink">
                  Diamond Size
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {DIAMOND_SIZES.map((dSize) => {
                    const isSelected = selectedDiamondSize === dSize;
                    return (
                      <button
                        key={dSize}
                        type="button"
                        onClick={() => setSelectedDiamondSize(dSize)}
                        className={`cursor-pointer rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-all ${
                          isSelected
                            ? "border-ink bg-white font-semibold text-ink shadow-xs ring-1 ring-ink"
                            : "border-line bg-white/70 text-ink-soft hover:border-sand-400"
                        }`}
                      >
                        {dSize}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ring Size Selector & Size Guide */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-semibold text-ink">
                    Ring Size
                  </label>
                  <button
                    type="button"
                    className="cursor-pointer text-[12px] font-medium text-ink underline decoration-sand-400 hover:text-rose-gold-dark"
                  >
                    Size Guide ⓘ
                  </button>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {RING_SIZES.map((sz) => {
                    const isSelected = selectedRingSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedRingSize(sz)}
                        className={`size-10 cursor-pointer rounded-full border text-[13px] font-medium transition-all ${
                          isSelected
                            ? "border-ink bg-white font-bold text-ink shadow-xs ring-2 ring-ink"
                            : "border-line bg-white/70 text-ink hover:border-sand-400"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTION BUTTONS & QUANTITY:
                  - Phone (< sm): Quantity selector on top left, Add to Cart underneath (w-full), Buy Now underneath (w-full)
                  - Tablet (sm to lg): Quantity selector and Add to Cart side-by-side, Buy Now underneath (w-full)
                  - Desktop (lg+): Quantity selector, Add to Cart underneath, Buy Now underneath
              */}
              <div className="mt-6 space-y-3">
                {/* Quantity and Add to Cart row for Tablet, stacked for Phone */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Quantity selector */}
                  <div className="inline-flex w-fit items-center rounded-xl border border-line bg-white px-3 py-1.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="grid size-8 cursor-pointer place-items-center text-ink-soft hover:text-ink"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon width={14} height={14} />
                    </button>
                    <span className="w-8 text-center text-[14px] font-semibold text-ink">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="grid size-8 cursor-pointer place-items-center text-ink-soft hover:text-ink"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon width={14} height={14} />
                    </button>
                  </div>

                  {/* Add to Cart button (Full width on phone, flex-1 on tablet) */}
                  <button
                    type="button"
                    className="w-full sm:flex-1 cursor-pointer rounded-xl bg-ink py-3.5 text-center text-[14px] font-semibold text-white shadow-md transition-all hover:bg-ink-soft active:scale-[0.99]"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Buy Now button (Full width on all screens) */}
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-xl border border-ink bg-white py-3.5 text-center text-[14px] font-semibold text-ink shadow-xs transition-all hover:bg-cream-100 active:scale-[0.99]"
                >
                  Buy Now
                </button>
              </div>

              {/* 4 Guarantee Badges under CTAs */}
              <div className="mt-6 grid grid-cols-4 gap-2 border-t border-b border-line/60 py-4 text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <ShieldCheckIcon width={18} height={18} className="text-ink" />
                  <span className="text-[10px] font-medium leading-tight text-ink-soft">
                    Secure Payments
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <TruckIcon width={18} height={18} className="text-ink" />
                  <span className="text-[10px] font-medium leading-tight text-ink-soft">
                    Global Delivery
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <RotateCcwIcon width={18} height={18} className="text-ink" />
                  <span className="text-[10px] font-medium leading-tight text-ink-soft">
                    Easy Returns
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <BadgeCheckIcon width={18} height={18} className="text-ink" />
                  <span className="text-[10px] font-medium leading-tight text-ink-soft">
                    Authentic & Certified
                  </span>
                </div>
              </div>

              {/* Shipping Delivery Box */}
              <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-[#fbf8f4] p-4">
                <div className="flex items-center gap-3">
                  <TruckIcon width={22} height={22} className="text-ink" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink">
                      This product is ready to ship
                    </p>
                    <p className="text-[12px] text-muted">
                      Get it between 25 - 28 Apr
                    </p>
                  </div>
                </div>
                <ChevronRightIcon width={16} height={16} className="text-muted" />
              </div>

              {/* Accordions (All start closed per request) */}
              <div className="mt-6 divide-y divide-line border-t border-b border-line">
                {/* Description */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("description")}
                    className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-[14px] font-semibold text-ink"
                  >
                    <span>Description</span>
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={`text-ink transition-transform duration-200 ${
                        openAccordions.description ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordions.description && (
                    <div className="pb-4 text-[13px] leading-relaxed text-ink-soft">
                      {product.description ??
                        `Crafted with precision, the ${product.name} embodies contemporary refinement with eternal beauty. Designed with meticulous attention to stone setting and comfort fit, making it perfect for both everyday luxury and momentous milestones.`}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("details")}
                    className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-[14px] font-semibold text-ink"
                  >
                    <span>Details</span>
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={`text-ink transition-transform duration-200 ${
                        openAccordions.details ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordions.details && (
                    <div className="pb-4 text-[13px] leading-relaxed text-ink-soft">
                      <ul className="list-inside list-disc space-y-1.5">
                        <li>Metal: {selectedMaterial}</li>
                        <li>Style: {product.style}</li>
                        <li>Gemstone: {product.gemstone}</li>
                        <li>Band Width: 1.8mm comfort profile</li>
                        <li>Origin: Ethically hand-finished in Europe</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("shipping")}
                    className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-[14px] font-semibold text-ink"
                  >
                    <span>Shipping & Returns</span>
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={`text-ink transition-transform duration-200 ${
                        openAccordions.shipping ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordions.shipping && (
                    <div className="pb-4 text-[13px] leading-relaxed text-ink-soft">
                      Enjoy complimentary insured worldwide shipping on all fine jewellery orders. Returns and exchanges are accepted within 30 days of delivery with original packaging and certificate intact.
                    </div>
                  )}
                </div>

                {/* Reviews */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("reviews")}
                    className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-[14px] font-semibold text-ink"
                  >
                    <span>Reviews ({reviewsCount})</span>
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={`text-ink transition-transform duration-200 ${
                        openAccordions.reviews ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordions.reviews && (
                    <div className="pb-4 text-[13px] leading-relaxed text-ink-soft">
                      Rated {rating}/5 by verified purchasers. Customers praise the ring&apos;s brilliant sparkle, exceptional craftsmanship, and comfortable daily wear.
                    </div>
                  )}
                </div>

                {/* Brand Story */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("brandStory")}
                    className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-[14px] font-semibold text-ink"
                  >
                    <span>Brand Story</span>
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={`text-ink transition-transform duration-200 ${
                        openAccordions.brandStory ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordions.brandStory && (
                    <div className="pb-4 text-[13px] leading-relaxed text-ink-soft">
                      SIDRA partners with responsible family-owned ateliers and certified diamond cutters, bringing you timeless heirlooms with transparent provenance and modern silhouettes.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* You May Also Like Section for Mobile & Tablet (< lg): Placed cleanly under the main product flow */}
          <div className="mt-12 pt-6 border-t border-line/60 lg:hidden">
            <div className="mb-6 flex items-baseline justify-between">
              <h2
                id="related-products-title-mobile"
                className="font-serif text-2xl text-ink"
              >
                You May Also Like
              </h2>
              <Link
                href="/category"
                className="group flex cursor-pointer items-center gap-1 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                <span>View All</span>
                <ArrowRightIcon
                  width={14}
                  height={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-4">
              {relatedProducts.map((relProduct) => (
                <CollectionsProductCard
                  key={relProduct.id}
                  product={relProduct}
                  isWishlisted={Boolean(relatedWishlist[relProduct.id])}
                  onToggleWishlist={(id) =>
                    setRelatedWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Impact Banner ("More Than Jewellery") */}
        <ImpactBanner />
      </main>

      <Footer />
    </>
  );
}
