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
  PlayCircleIcon,
  FileTextIcon,
  SettingsIcon,
  StoreIcon,
  ExternalLinkIcon,
  ClockIcon,
  MapPinIcon,
  MessageCircleIcon,
  BagIcon,
  CheckIcon,
  InfoIcon,
  ThumbsUpIcon,
  SparklesIcon,
  RingResizeIcon,
  HandIcon,
  AlertCircleIcon,
  MoreHorizontalIcon,
  PackageIcon,
  PencilIcon,
  ShieldIcon,
  CompassIcon,
  AzerbaijanFlag,
} from "../Icons";

import ring1 from "@/app/images/ring1.png";
import ring2 from "@/app/images/ring2.png";
import ring3 from "@/app/images/ring3.png";
import ring4 from "@/app/images/ring4.png";
import ring5 from "@/app/images/ring5.png";
import ring6 from "@/app/images/ring6.png";
import certificateImg from "@/app/images/certificate.png";
import sidraLogoImg from "@/app/images/sidraImage2.jpeg";
import { useCartWishlist } from "@/context/CartWishlistContext";

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
  const { isInWishlist, toggleWishlist, addToCart } = useCartWishlist();
  const isWishlisted = isInWishlist(product.id);
  const [relatedWishlist, setRelatedWishlist] = useState<Record<string, boolean>>({});

  // Accordion open/close states (ALL START CLOSED per user requirement)
  const [openAccordions, setOpenAccordions] = useState({
    description: false,
    details: false,
    certificate: false,
    shipping: false,
    warranty: false,
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
                <div className="relative flex-1 aspect-square sm:aspect-4/4 lg:aspect-square w-full border border-line/70 bg-[#fbf8f4] shadow-xs">
                  {/* Badge (Rendered ONLY if product has badge in data!) */}
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 z-10 rounded-md px-3 py-1 text-[11.5px] font-semibold tracking-wide shadow-2xs ${product.badge === "Bestseller"
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
                      onClick={() =>
                        toggleWishlist({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: "Rings",
                          metal: selectedMaterial,
                          carat: selectedDiamondSize,
                          brand: "SIDRA",
                          rating: 5,
                          reviewsCount: 124,
                          stockStatus: "in_stock",
                          stockText: "In Stock",
                        })
                      }
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      className="grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-xs backdrop-blur-xs transition-colors hover:bg-white"
                    >
                      <HeartIcon
                        width={17}
                        height={17}
                        className={`transition-transform active:scale-125 ${isWishlisted ? "fill-[#b74134] text-[#b74134]" : "text-ink"
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

                  {/* Video mode on main image (ONLY when 5th thumbnail / video is active) */}
                  {activeImageIndex === 4 && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-t from-black/50 via-black/20 to-transparent">
                      <div className="grid size-14 sm:size-16 place-items-center rounded-full bg-white/95 text-ink shadow-lg transition-transform hover:scale-105 cursor-pointer">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 sm:size-7 ml-1 text-ink"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

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
                    const isVideo = idx === 4;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`group relative size-16 sm:size-20 lg:size-[84px] cursor-pointer rounded-lg bg-[#f9f5f0] p-1.5 transition-all duration-200 shrink-0 ${isActive
                            ? "border-2 border-ink shadow-xs"
                            : "border border-line/70 hover:border-sand-400"
                          }`}
                        aria-label={isVideo ? `Watch product video` : `View image ${idx + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${idx + 1}`}
                          fill
                          sizes="84px"
                          className="object-contain rounded-lg"
                        />

                        {/* Video overlay with gradient from bottom to top on 5th thumbnail */}
                        {isVideo && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-gradient-to-t from-black/75 via-black/35 to-transparent transition-opacity group-hover:from-black/85">
                            <div className="grid size-6 sm:size-7 place-items-center rounded-full bg-white/95 text-ink shadow-xs">
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-3 sm:size-3.5 ml-0.5"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                            <span className="mt-1 text-[8.5px] sm:text-[9.5px] font-semibold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                              Watch Video
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4 Trust Highlights under Gallery — VISIBLE ONLY ON DESKTOP (hidden on mobile/tablet) */}
              <div className="mt-8 hidden border-t border-b border-line/60 py-6 lg:grid lg:grid-cols-4 lg:gap-6">
                <div className="flex items-center gap-3.5">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-200/80 text-ink shadow-2xs">
                    <DiamondIcon width={22} height={22} />
                  </div>
                  <span className="text-[13px] font-medium text-ink">
                    Ethically Sourced
                    <br />
                    Diamonds
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-200/80 text-ink shadow-2xs">
                    <ShieldCheckIcon width={22} height={22} />
                  </div>
                  <span className="text-[13px] font-medium text-ink">
                    Certified & Verified
                    <br />
                    Jewellery
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-200/80 text-ink shadow-2xs">
                    <TruckIcon width={22} height={22} />
                  </div>
                  <span className="text-[13px] font-medium text-ink">
                    Global Delivery
                    <br />
                    To 100+ Countries
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-200/80 text-ink shadow-2xs">
                    <LeafIcon width={22} height={22} />
                  </div>
                  <span className="text-[13px] font-medium text-ink">
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
              <h1 className="mt-0.5 sm:mt-1.5 font-serif text-3xl font-normal text-ink sm:text-4xl">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="mt-0.5 sm:mt-1.5 text-[13.5px] leading-relaxed text-ink-soft sm:text-[14px]">
                {subtitle}
              </p>

              {/* Reviews & Rating */}
              <div className="mt-2 sm:mt-3.5 flex items-center gap-2">
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
              <div className="mt-2 sm:mt-3.5 flex items-baseline gap-3">
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
              <p className="mt-2 sm:mt-3.5 text-[12.5px] text-ink-soft">
                or 4 payments of <strong className="font-semibold text-ink">${installment}</strong> with{" "}
                <span className="font-semibold text-ink">Klarna.</span>{" "}
                <span className="cursor-pointer text-[12px] text-muted underline">ⓘ</span>
              </p>

              {/* Material Selector */}
              <div className="mt-4.5">
                <label className="text-[13px] font-semibold text-ink">
                  Material
                </label>
                <div className="mt-1 sm:mt-2 flex flex-wrap gap-2.5">
                  {MATERIALS.map((mat) => {
                    const isSelected = selectedMaterial === mat;
                    return (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => setSelectedMaterial(mat)}
                        className={`cursor-pointer rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-all ${isSelected
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
              <div className="mt-4">
                <label className="text-[13px] font-semibold text-ink">
                  Diamond Size
                </label>
                <div className="mt-1 sm:mt-2 flex flex-wrap gap-2.5">
                  {DIAMOND_SIZES.map((dSize) => {
                    const isSelected = selectedDiamondSize === dSize;
                    return (
                      <button
                        key={dSize}
                        type="button"
                        onClick={() => setSelectedDiamondSize(dSize)}
                        className={`cursor-pointer rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-all ${isSelected
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
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-semibold text-ink">
                    Ring Size
                  </label>
                  <button
                    type="button"
                    className="cursor-pointer text-[12px] font-medium text-ink hover:text-rose-gold-dark"
                  >
                    Size Guide ⓘ
                  </button>
                </div>
                <div className="mt-1 sm:mt-2.5 flex flex-wrap gap-2">
                  {RING_SIZES.map((sz) => {
                    const isSelected = selectedRingSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedRingSize(sz)}
                        className={`size-10 cursor-pointer rounded-full border text-[13px] font-medium transition-all ${isSelected
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
                  - Mobile (< sm): Stacked — Quantity on top left, Add to Cart underneath (w-full), Buy Now underneath (w-full)
                  - Tablet (sm to lg): Side-by-side — Quantity on left, Add to Cart on right, Buy Now underneath (w-full)
                  - Desktop (lg+): Stacked — Quantity on top left, Add to Cart underneath (w-full), Buy Now underneath (w-full)
              */}
              <div className="mt-6 space-y-3">
                {/* Quantity and Add to Cart row (side-by-side ONLY on tablet `sm:max-lg:flex-row`, stacked on mobile and desktop) */}
                <div className="flex flex-col gap-3 sm:max-lg:flex-row sm:max-lg:items-center">
                  {/* Quantity selector */}
                  <div className="inline-flex w-fit items-center rounded-[100px] border border-line bg-white px-3 py-1.5 shadow-2xs">
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

                  {/* Add to Cart button (Full width on mobile & desktop, flex-1 on tablet) */}
                  <button
                    type="button"
                    onClick={() =>
                      addToCart(
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: "Rings",
                          metal: selectedMaterial,
                          carat: selectedDiamondSize,
                          brand: "SIDRA",
                          rating: 5,
                          reviewsCount: 124,
                          stockStatus: "in_stock",
                          stockText: "In Stock",
                        },
                        quantity,
                        String(selectedRingSize),
                        selectedMaterial
                      )
                    }
                    className="w-full sm:max-lg:flex-1 cursor-pointer rounded-[100px] bg-ink py-3.5 text-center text-[14px] font-semibold text-white shadow-md transition-all hover:bg-ink-soft active:scale-[0.99]"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Buy Now button (Full width on all screens) */}
                <button
                  type="button"
                  onClick={() => {
                    addToCart(
                      {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: "Rings",
                        metal: selectedMaterial,
                        carat: selectedDiamondSize,
                        brand: "SIDRA",
                        rating: 5,
                        reviewsCount: 124,
                        stockStatus: "in_stock",
                        stockText: "In Stock",
                      },
                      quantity,
                      String(selectedRingSize),
                      selectedMaterial
                    );
                    window.location.href = "/bag";
                  }}
                  className="w-full cursor-pointer rounded-[100px] border border-ink bg-white py-3.5 text-center text-[14px] font-semibold text-ink shadow-xs transition-all hover:bg-cream-100 active:scale-[0.99]"
                >
                  Buy Now
                </button>
              </div>

              {/* 4 Guarantee Badges under CTAs */}
              <div className="mt-6 grid grid-cols-4 gap-2 border-t border-b border-line/60 py-4.5 text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <ShieldCheckIcon width={23} height={23} className="text-ink" />
                  <span className="text-[11.5px] font-medium leading-tight text-ink-soft">
                    Secure Payments
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <TruckIcon width={23} height={23} className="text-ink" />
                  <span className="text-[11.5px] font-medium leading-tight text-ink-soft">
                    Global Delivery
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <RotateCcwIcon width={23} height={23} className="text-ink" />
                  <span className="text-[11.5px] font-medium leading-tight text-ink-soft">
                    Easy Returns
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <BadgeCheckIcon width={23} height={23} className="text-ink" />
                  <span className="text-[11.5px] font-medium leading-tight text-ink-soft">
                    Authentic & Certified
                  </span>
                </div>
              </div>

              {/* Shipping Delivery Box */}
              <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-[#fbf8f4] p-4">
                <div className="flex items-center gap-3">
                  <TruckIcon width={23} height={23} className="text-ink" />
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

              {/* Accordions (Unified seamless list with divide-y per user request) */}
              <div className="mt-6 rounded-2xl border border-line/70 bg-white divide-y divide-line/70 shadow-xs">
                {/* 1. Description */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("description")}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-t-2xl px-4 py-3.5 text-left text-[14px] font-semibold text-ink transition-colors ${openAccordions.description ? "bg-[#f9f5f0]" : "hover:bg-[#fbf9f6]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileTextIcon width={18} height={18} className="text-ink" />
                      <span>Description</span>
                    </div>
                    <span className="text-base font-bold text-ink">
                      {openAccordions.description ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordions.description && (
                    <div className="border-t border-line/60 p-4 text-[13px] leading-relaxed text-ink-soft">
                      {product.description ??
                        `Crafted with precision, the ${product.name} embodies contemporary refinement with eternal beauty. Designed with meticulous attention to stone setting and comfort fit, making it perfect for both everyday luxury and momentous milestones.`}
                    </div>
                  )}
                </div>

                {/* 2. Product Details */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("details")}
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left text-[14px] font-semibold text-ink transition-colors ${openAccordions.details ? "bg-[#f9f5f0]" : "hover:bg-[#fbf9f6]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <SettingsIcon width={18} height={18} className="text-ink" />
                      <span>Product Details</span>
                    </div>
                    <span className="text-base font-bold text-ink">
                      {openAccordions.details ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordions.details && (
                    <div className="border-t border-line/60 p-4 text-[12.5px] text-ink-soft">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                        {/* Left column */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Product ID</span>
                            <span className="font-medium text-ink">SID-RNG-01842</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Metal</span>
                            <span className="font-medium text-ink">{selectedMaterial}</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Metal Color</span>
                            <span className="font-medium text-ink">Rose Gold</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Approx. Weight</span>
                            <span className="font-medium text-ink">3.8 g</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Band Width</span>
                            <span className="font-medium text-ink">2.1 mm</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Stone</span>
                            <span className="font-medium text-ink">{product.gemstone}</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Origin</span>
                            <span className="font-medium text-ink">Natural</span>
                          </div>
                          <div className="flex items-center justify-between pb-1.5">
                            <span className="text-muted">Total Carat Weight</span>
                            <span className="font-medium text-ink">{selectedDiamondSize}</span>
                          </div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Cut</span>
                            <span className="font-medium text-ink">Round Brilliant</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Color</span>
                            <span className="font-medium text-ink">G</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Clarity</span>
                            <span className="font-medium text-ink">VS1</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Setting Type</span>
                            <span className="font-medium text-ink">6-Prong Solitaire</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Selected Size</span>
                            <span className="font-medium text-ink">{selectedRingSize}</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Resizing</span>
                            <span className="font-medium text-ink">Available</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/40 pb-1.5">
                            <span className="text-muted">Engraving</span>
                            <span className="font-medium text-ink">Available</span>
                          </div>
                          <div className="flex items-center justify-between pb-1.5">
                            <span className="text-muted">Collection</span>
                            <span className="font-medium text-ink">Classic</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Certificate & Authenticity */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("certificate")}
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left text-[14px] font-semibold text-ink transition-colors ${openAccordions.certificate ? "bg-[#f9f5f0]" : "hover:bg-[#fbf9f6]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <BadgeCheckIcon width={18} height={18} className="text-ink" />
                      <span>Certificate & Authenticity</span>
                    </div>
                    <span className="text-base font-bold text-ink">
                      {openAccordions.certificate ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordions.certificate && (
                    <div className="border-t border-line/60 p-4 space-y-5">
                      {/* GIA Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-xl font-serif font-black tracking-wider text-ink">
                            GIA
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-ink">Certified by GIA</p>
                            <p className="text-[10.5px] text-muted">Independent grading for natural diamonds.</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#eaf4eb] px-2.5 py-1 text-[11px] font-semibold text-[#2f6f36]">
                          <CheckIcon width={12} height={12} />
                          Verified
                        </span>
                      </div>

                      {/* Specs + Certificate Image Side-by-side */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                        {/* Specs Table */}
                        <div className="space-y-2 text-[12px] sm:col-span-7">
                          <div className="flex items-center justify-between border-b border-line/50 pb-1">
                            <span className="text-muted">Report Number</span>
                            <span className="font-medium text-ink">7452183942</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/50 pb-1">
                            <span className="text-muted">Stone Type</span>
                            <span className="font-medium text-ink">Natural Diamond</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/50 pb-1">
                            <span className="text-muted">Cut</span>
                            <span className="font-medium text-ink">Round Brilliant</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/50 pb-1">
                            <span className="text-muted">Carat Weight</span>
                            <span className="font-medium text-ink">0.70 ct</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/50 pb-1">
                            <span className="text-muted">Color</span>
                            <span className="font-medium text-ink">G</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/50 pb-1">
                            <span className="text-muted">Clarity</span>
                            <span className="font-medium text-ink">VS1</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/50 pb-1">
                            <span className="text-muted">Metal Verification</span>
                            <span className="font-medium text-ink">18K Rose Gold</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-line/50 pb-1">
                            <span className="text-muted">Hallmark</span>
                            <span className="font-medium text-ink">750</span>
                          </div>
                          <div className="flex items-center justify-between pb-1">
                            <span className="text-muted">Origin</span>
                            <span className="text-right text-[11px] text-muted">
                              Source information available when verified ⓘ
                            </span>
                          </div>
                        </div>

                        {/* Certificate Image Card */}
                        <div className="flex flex-col items-center justify-center rounded-xl border border-line/80 bg-[#fbf9f6] p-2.5 sm:col-span-5">
                          <div className="relative aspect-3/4 w-full rounded-lg border border-line/60 bg-white shadow-2xs">
                            <Image
                              src={certificateImg}
                              alt="GIA Certificate Report"
                              fill
                              sizes="200px"
                              className="object-contain"
                            />
                          </div>
                          <button
                            type="button"
                            className="mt-2 text-[11px] font-semibold text-ink transition-colors hover:text-rose-gold-dark cursor-pointer"
                          >
                            View Full Report
                          </button>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <button
                          type="button"
                          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-ink py-2.5 text-[12.5px] font-semibold text-white shadow-xs transition-colors hover:bg-ink-soft"
                        >
                          <FileTextIcon width={14} height={14} />
                          <span>View Certificate</span>
                        </button>
                        <button
                          type="button"
                          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-line bg-white py-2.5 text-[12.5px] font-semibold text-ink shadow-2xs transition-colors hover:bg-[#fbf9f6]"
                        >
                          <ExternalLinkIcon width={14} height={14} />
                          <span>Verify Report</span>
                        </button>
                      </div>

                      <div className="flex items-start gap-1.5 text-[11px] text-muted">
                        <InfoIcon width={13} height={13} className="shrink-0 mt-0.5 text-muted" />
                        <p>This certificate is provided by the brand or seller. Please verify the report number on the official GIA website.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Shipping & Returns */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("shipping")}
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left text-[14px] font-semibold text-ink transition-colors ${openAccordions.shipping ? "bg-[#f9f5f0]" : "hover:bg-[#fbf9f6]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <TruckIcon width={18} height={18} className="text-ink" />
                      <span>Shipping & Returns</span>
                    </div>
                    <span className="text-base font-bold text-ink">
                      {openAccordions.shipping ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordions.shipping && (
                    <div className="border-t border-line/60 p-4 space-y-4 text-[12.5px] text-ink-soft">
                      {/* Shipping Block */}
                      <div>
                        <h4 className="font-semibold text-ink text-[13px]">Shipping</h4>

                        {/* Ready to ship badge card */}
                        <div className="mt-2.5 rounded-xl border border-line/80 bg-[#f4f7f4] p-3 flex items-center gap-3">
                          <TruckIcon width={22} height={22} className="text-ink shrink-0" />
                          <div className="text-[12px]">
                            <span className="font-semibold text-[#2f6f36] flex items-center gap-1.5">
                              <span className="size-2 rounded-full bg-[#2f6f36]" />
                              Ready to ship
                            </span>
                            <div className="text-ink mt-0.5 flex items-center gap-1">
                              <span>Estimated delivery: 2 – 5 business days</span>
                              <InfoIcon width={13} height={13} className="text-ink-soft" />
                            </div>
                          </div>
                        </div>

                        {/* Shipping features list with clean monochrome SVG stroke icons */}
                        <div className="mt-3.5 space-y-3 text-[12px]">
                          <div className="flex items-start gap-3">
                            <ShieldIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-ink">Free insured delivery</p>
                              <p className="text-muted">No additional shipping fee on this item.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <ShieldCheckIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-ink">Secure &amp; fully insured delivery</p>
                              <p className="text-muted">Your order is protected from dispatch to delivery.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CompassIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-ink">Tracking included</p>
                              <p className="text-muted">Track your order at every step.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <PencilIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-ink">Signature required</p>
                              <p className="text-muted">A signature is required upon delivery.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <PackageIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-ink">Discreet packaging</p>
                              <p className="text-muted">Your jewellery will arrive in a secure and elegant package.</p>
                            </div>
                          </div>
                        </div>

                        {/* Deliver to Country Selector (Matching Image 1) */}
                        <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-white p-2.5 sm:p-3">
                          <div className="flex items-center gap-2 text-[12.5px] font-semibold text-ink">
                            <MapPinIcon width={16} height={16} className="text-ink" />
                            <span>Deliver to</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg border border-line/60 bg-[#fbf9f6] px-2.5 py-1 text-[12px] font-medium text-ink shadow-2xs">
                            <AzerbaijanFlag className="w-5 h-3.5" />
                            <span>Azerbaijan</span>
                            <ChevronDownIcon width={13} height={13} className="text-ink-soft ml-0.5" />
                          </div>
                        </div>

                        {/* Customs notice callout box (Matching Image 2) */}
                        <div className="mt-2.5 flex items-start gap-2.5 rounded-xl border border-[#d6e3f0] bg-[#f0f4f9] p-3 text-[12px] text-[#334155]">
                          <InfoIcon width={16} height={16} className="text-[#475569] shrink-0 mt-0.5" />
                          <p className="leading-relaxed">
                            International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
                          </p>
                        </div>
                      </div>

                      {/* Returns Block */}
                      <div className="border-t border-line/60 pt-4">
                        <h4 className="font-semibold text-ink text-[13px]">Returns</h4>
                        <div className="mt-2 flex items-start gap-2.5">
                          <RotateCcwIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-ink">30-day returns</p>
                            <p className="text-muted text-[12px]">Not completely in love? You can return this item within 30 days of delivery.</p>
                          </div>
                        </div>

                        <div className="mt-3 space-y-2 border-t border-line/40 pt-2 text-[12px]">
                          <div className="flex justify-between gap-4">
                            <span className="text-muted shrink-0">Eligible items</span>
                            <span className="text-right text-ink max-w-[240px]">Items must be unworn, in original condition, with all packaging and certificates.</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted shrink-0">Exceptions</span>
                            <span className="text-right text-ink max-w-[240px]">Engraved, customized or resized items are final sale and cannot be returned.</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted shrink-0">Refund process</span>
                            <span className="text-right text-ink max-w-[240px]">Refunds are issued to your original payment method within 5–7 business days after we receive the item.</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="mt-4 w-full rounded-xl border border-line bg-white py-2.5 text-[12.5px] font-semibold text-ink transition-colors hover:bg-[#fbf9f6] cursor-pointer"
                        >
                          View full shipping &amp; returns policy →
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Warranty, Care & Services */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("warranty")}
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left text-[14px] font-semibold text-ink transition-colors ${openAccordions.warranty ? "bg-[#f9f5f0]" : "hover:bg-[#fbf9f6]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheckIcon width={18} height={18} className="text-ink" />
                      <span>Warranty, Care & Services</span>
                    </div>
                    <span className="text-base font-bold text-ink">
                      {openAccordions.warranty ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordions.warranty && (
                    <div className="border-t border-line/60 p-4 space-y-4 text-[12px] text-ink-soft">
                      <div className="space-y-3.5">
                        <div className="flex items-start gap-3">
                          <ShieldCheckIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-ink text-[12.5px]">Manufacturing Warranty</p>
                            <p className="text-muted text-[11.5px] mt-0.5">Lifetime coverage for manufacturing defects. Coverage may vary by brand or seller.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <RingResizeIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-ink text-[12.5px]">Ring Resizing</p>
                            <p className="text-muted text-[11.5px] mt-0.5">Complimentary first resize (where eligible). Additional resizing may be available for a fee.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <SparklesIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-ink text-[12.5px]">Professional Cleaning &amp; Polishing</p>
                            <p className="text-muted text-[11.5px] mt-0.5">Keep your jewellery looking its best with professional cleaning and polishing services.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <SettingsIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-ink text-[12.5px]">Repair &amp; Prong/Stone Check</p>
                            <p className="text-muted text-[11.5px] mt-0.5">Repair services and prong/stone tightening available to maintain long-term beauty and security.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <HandIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-ink text-[12.5px]">Care Guidance</p>
                            <ul className="mt-1 list-disc list-inside text-muted space-y-0.5 text-[11.5px]">
                              <li>Avoid harsh chemicals and household cleaners.</li>
                              <li>Remove jewellery during sports, swimming or heavy work.</li>
                              <li>Store separately in a soft pouch or box.</li>
                              <li>Schedule periodic professional inspection.</li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 border-t border-line/40 pt-3">
                          <AlertCircleIcon width={18} height={18} className="text-ink shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-ink text-[12.5px]">What&apos;s Not Covered</p>
                            <ul className="mt-1 list-disc list-inside text-muted space-y-0.5 text-[11.5px]">
                              <li>Normal wear and tear (scratches, minor dents).</li>
                              <li>Accidental damage, loss or theft.</li>
                              <li>Damage caused by improper care or chemicals.</li>
                              <li>Repair or modifications by unauthorized third parties.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Policy notice callout (Matching Image 4) */}
                      <div className="flex items-start gap-2.5 rounded-xl border border-line/60 bg-[#f5f6f8] p-3 text-[12px] text-ink-soft">
                        <InfoIcon width={16} height={16} className="text-ink shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          Exact warranty and service terms may vary by brand or seller. Please refer to the full policy for this product.
                        </p>
                      </div>

                      <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                        <button
                          type="button"
                          className="flex-1 rounded-xl bg-ink py-2.5 text-center text-[12.5px] font-semibold text-white transition-colors hover:bg-ink-soft cursor-pointer"
                        >
                          Request Service
                        </button>
                        <button
                          type="button"
                          className="flex-1 rounded-xl border border-line bg-white py-2.5 text-center text-[12.5px] font-semibold text-ink transition-colors hover:bg-[#fbf9f6] cursor-pointer"
                        >
                          View Full Care &amp; Warranty Policy →
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Reviews (124) */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("reviews")}
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left text-[14px] font-semibold text-ink transition-colors ${openAccordions.reviews ? "bg-[#f9f5f0]" : "hover:bg-[#fbf9f6]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <StarIcon width={18} height={18} className="text-ink" />
                      <span>Reviews ({reviewsCount})</span>
                    </div>
                    <span className="text-base font-bold text-ink">
                      {openAccordions.reviews ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordions.reviews && (
                    <div className="border-t border-line/60 p-4 space-y-5 text-[12.5px]">
                      {/* Rating summary */}
                      <div className="flex items-center gap-6">
                        <div className="text-center shrink-0">
                          <p className="font-serif text-4xl sm:text-5xl font-normal text-ink">4.8</p>
                          <div className="mt-1 flex items-center justify-center text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} width={13} height={13} className="fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="mt-1 text-[11px] text-muted">Based on 124 reviews</p>
                        </div>

                        {/* Breakdown Bars */}
                        <div className="flex-1 space-y-1.5 text-[11px] text-muted">
                          {[
                            { star: 5, pct: "82%" },
                            { star: 4, pct: "12%" },
                            { star: 3, pct: "4%" },
                            { star: 2, pct: "1%" },
                            { star: 1, pct: "1%" },
                          ].map((b) => (
                            <div key={b.star} className="flex items-center gap-2">
                              <span className="w-4 text-right">{b.star}★</span>
                              <div className="h-1.5 flex-1 rounded-full bg-cream-200">
                                <div className="h-full rounded-full bg-sand-400" style={{ width: b.pct }} />
                              </div>
                              <span className="w-7 text-right">{b.pct}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Filter Tags */}
                      <div className="space-y-2.5 pt-2 border-t border-line/40">
                        <div className="flex flex-wrap gap-2 text-[11.5px]">
                          <button type="button" className="rounded-lg bg-ink px-3 py-1 font-medium text-white">Most Helpful</button>
                          <button type="button" className="rounded-lg border border-line bg-white px-3 py-1 font-medium text-ink hover:bg-[#fbf9f6]">Newest</button>
                          <button type="button" className="rounded-lg border border-line bg-white px-3 py-1 font-medium text-ink hover:bg-[#fbf9f6]">Highest Rating</button>
                          <button type="button" className="rounded-lg border border-line bg-white px-3 py-1 font-medium text-ink hover:bg-[#fbf9f6]">Lowest Rating</button>
                        </div>
                        {/* Checkbox filters */}
                        <div className="flex flex-wrap items-center gap-4 text-[12px] text-ink-soft pt-0.5">
                          <label className="flex items-center gap-1.5 cursor-pointer select-none">
                            <input type="checkbox" className="size-3.5 rounded border-line text-ink accent-ink" />
                            <span>Verified Purchase (98)</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer select-none">
                            <input type="checkbox" className="size-3.5 rounded border-line text-ink accent-ink" />
                            <span>With Photos (36)</span>
                          </label>
                        </div>
                      </div>

                      {/* Review Items */}
                      <div className="space-y-4 pt-2 border-t border-line/40">
                        {/* Review 1 - Aylin K. */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11.5px]">
                            <div className="flex items-center gap-2">
                              <span className="grid size-7 place-items-center rounded-full bg-[#c2b2a3] font-semibold text-[11px] text-white">A</span>
                              <span className="font-semibold text-ink">Aylin K.</span>
                              <span className="text-[#2f6f36] font-medium text-[11px] flex items-center gap-1">
                                <CheckIcon width={11} height={11} className="stroke-[2.5]" />
                                Verified Purchase
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted text-[11px]">12 Apr 2024</span>
                              <button type="button" className="text-muted hover:text-ink cursor-pointer">
                                <MoreHorizontalIcon width={15} height={15} />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} width={12} height={12} className="fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-[11.5px] text-muted">18K Rose Gold &nbsp;|&nbsp; 0.70 ct &nbsp;|&nbsp; Size 7</p>
                          <p className="font-semibold text-ink text-[13px]">Even more beautiful in person</p>
                          <p className="text-[12px] leading-relaxed text-ink-soft">
                            The ring is absolutely stunning. The diamond sparkles beautifully and the rose gold looks so elegant. It arrived earlier than expected and the packaging was perfect.
                          </p>
                          {/* 3 Customer Photos */}
                          <div className="flex items-center gap-2.5 pt-1">
                            <div className="relative size-16 sm:size-20 shrink-0 rounded-lg border border-line/70 bg-[#faf8f5] p-1 shadow-2xs">
                              <Image src={ring5} alt="Customer photo 1" fill sizes="80px" className="object-contain rounded-md" />
                            </div>
                            <div className="relative size-16 sm:size-20 shrink-0 rounded-lg border border-line/70 bg-[#faf8f5] p-1 shadow-2xs">
                              <Image src={ring1} alt="Customer photo 2" fill sizes="80px" className="object-contain rounded-md" />
                            </div>
                            <div className="relative size-16 sm:size-20 shrink-0 rounded-lg border border-line/70 bg-[#faf8f5] p-1 shadow-2xs">
                              <Image src={ring6} alt="Customer photo 3" fill sizes="80px" className="object-contain rounded-md" />
                            </div>
                          </div>
                          {/* Helpful and Reply row */}
                          <div className="flex items-center justify-between pt-1 text-[11.5px]">
                            <button
                              type="button"
                              className="flex items-center gap-1.5 text-ink-soft hover:text-ink transition-colors cursor-pointer"
                            >
                              <ThumbsUpIcon width={13} height={13} />
                              <span>Helpful (12)</span>
                            </button>
                            <button
                              type="button"
                              className="font-medium text-ink-soft hover:text-ink transition-colors cursor-pointer"
                            >
                              Reply
                            </button>
                          </div>
                        </div>

                        {/* Review 2 - Mehmet T. */}
                        <div className="space-y-2 border-t border-line/30 pt-3.5">
                          <div className="flex items-center justify-between text-[11.5px]">
                            <div className="flex items-center gap-2">
                              <span className="grid size-7 place-items-center rounded-full bg-[#c2b2a3] font-semibold text-[11px] text-white">M</span>
                              <span className="font-semibold text-ink">Mehmet T.</span>
                              <span className="text-[#2f6f36] font-medium text-[11px] flex items-center gap-1">
                                <CheckIcon width={11} height={11} className="stroke-[2.5]" />
                                Verified Purchase
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted text-[11px]">28 Mar 2024</span>
                              <button type="button" className="text-muted hover:text-ink cursor-pointer">
                                <MoreHorizontalIcon width={15} height={15} />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} width={12} height={12} className="fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-[11.5px] text-muted">18K Gold &nbsp;|&nbsp; 0.70 ct &nbsp;|&nbsp; Size 7</p>
                          <p className="font-semibold text-ink text-[13px]">Perfect for our engagement</p>
                          <p className="text-[12px] leading-relaxed text-ink-soft">
                            My fiancé loves it! The quality, the shine and the craftsmanship are excellent. Highly recommended.
                          </p>
                          {/* Helpful and Reply row */}
                          <div className="flex items-center justify-between pt-0.5 text-[11.5px]">
                            <button
                              type="button"
                              className="flex items-center gap-1.5 text-ink-soft hover:text-ink transition-colors cursor-pointer"
                            >
                              <ThumbsUpIcon width={13} height={13} />
                              <span>Helpful (8)</span>
                            </button>
                            <button
                              type="button"
                              className="font-medium text-ink-soft hover:text-ink transition-colors cursor-pointer"
                            >
                              Reply
                            </button>
                          </div>
                          {/* SIDRA official reply card */}
                          <div className="mt-3 ml-2 sm:ml-5 rounded-xl border border-line/60 bg-[#faf8f5] p-3 flex items-start gap-2.5 shadow-2xs">
                            <div className="relative size-7 shrink-0 rounded-full border border-line/60 bg-white p-0.5">
                              <Image src={sidraLogoImg} alt="SIDRA" fill sizes="30px" className="object-contain rounded-full" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between text-[11.5px]">
                                <span className="font-semibold text-ink">SIDRA</span>
                                <span className="text-muted text-[10.5px]">29 Mar 2024</span>
                              </div>
                              <p className="mt-1 text-[12px] text-ink-soft leading-relaxed">
                                Thank you for your kind words! We&apos;re so happy to be part of your special moment. ♡
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Review 3 - Elif S. */}
                        <div className="space-y-2 border-t border-line/30 pt-3.5">
                          <div className="flex items-center justify-between text-[11.5px]">
                            <div className="flex items-center gap-2">
                              <span className="grid size-7 place-items-center rounded-full bg-[#c2b2a3] font-semibold text-[11px] text-white">E</span>
                              <span className="font-semibold text-ink">Elif S.</span>
                              <span className="text-[#2f6f36] font-medium text-[11px] flex items-center gap-1">
                                <CheckIcon width={11} height={11} className="stroke-[2.5]" />
                                Verified Purchase
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted text-[11px]">15 Mar 2024</span>
                              <button type="button" className="text-muted hover:text-ink cursor-pointer">
                                <MoreHorizontalIcon width={15} height={15} />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center text-amber-500">
                            {[...Array(4)].map((_, i) => (
                              <StarIcon key={i} width={12} height={12} className="fill-amber-400 text-amber-400" />
                            ))}
                            <StarIcon width={12} height={12} className="text-line" />
                          </div>
                          <p className="text-[11.5px] text-muted">18K Gold &nbsp;|&nbsp; 1.00 ct &nbsp;|&nbsp; Size 6</p>
                          <p className="font-semibold text-ink text-[13px]">Beautiful ring, great service</p>
                          <p className="text-[12px] leading-relaxed text-ink-soft">
                            The ring is gorgeous and the customer service was very helpful with sizing. Delivery was smooth and well packaged.
                          </p>
                          {/* Helpful and Reply row */}
                          <div className="flex items-center justify-between pt-0.5 text-[11.5px]">
                            <button
                              type="button"
                              className="flex items-center gap-1.5 text-ink-soft hover:text-ink transition-colors cursor-pointer"
                            >
                              <ThumbsUpIcon width={13} height={13} />
                              <span>Helpful (5)</span>
                            </button>
                            <button
                              type="button"
                              className="font-medium text-ink-soft hover:text-ink transition-colors cursor-pointer"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-line/40">
                        <button
                          type="button"
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-ink py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-ink-soft cursor-pointer"
                        >
                          <PencilIcon width={13} height={13} />
                          <span>Write a Review</span>
                        </button>
                        <button
                          type="button"
                          className="rounded-xl border border-line bg-white py-2.5 text-[12.5px] font-semibold text-ink transition-colors hover:bg-[#fbf9f6] cursor-pointer"
                        >
                          View All Reviews →
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 7. Brand & Seller */}
                <div className="last:rounded-b-2xl">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("brandStory")}
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left text-[14px] font-semibold text-ink transition-colors ${!openAccordions.brandStory ? "last:rounded-b-2xl" : ""
                      } ${openAccordions.brandStory ? "bg-[#f9f5f0]" : "hover:bg-[#fbf9f6]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <StoreIcon width={18} height={18} className="text-ink" />
                      <span>Brand & Seller</span>
                    </div>
                    <span className="text-base font-bold text-ink">
                      {openAccordions.brandStory ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordions.brandStory && (
                    <div className="border-t border-line/60 p-4 sm:p-5 space-y-4">
                      {/* Brand Profile Row */}
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="relative size-20 sm:size-24 shrink-0 rounded-xl bg-[#fcfaf7] flex items-center justify-center shadow-2xs">
                          <Image
                            src={sidraLogoImg}
                            alt="Lumière Fine Jewellery"
                            width={96}
                            height={96}
                            className="object-contain max-h-full max-w-full rounded-xl"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-serif text-lg sm:text-xl font-medium text-ink">
                              Lumière Fine Jewellery
                            </h3>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                              <CheckIcon width={11} height={11} className="stroke-[2.5]" />
                              <span>Verified Seller</span>
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-[12px] text-ink-soft">
                            <span className="inline-flex items-center gap-1">
                              <MapPinIcon width={13} height={13} className="text-ink-soft" />
                              <span>Istanbul, Türkiye</span>
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <StarIcon width={13} height={13} className="text-ink-soft" />
                              <span>On Sidra since 2022</span>
                            </span>
                          </div>
                          <p className="mt-2 text-[12px] sm:text-[12.5px] leading-relaxed text-ink-soft">
                            Lumière creates timeless jewellery inspired by modern elegance and true craftsmanship. Each piece is made with ethically sourced diamonds and the finest materials, designed to celebrate life&apos;s most meaningful moments.
                          </p>
                          <button
                            type="button"
                            className="mt-1 text-[12px] font-semibold text-ink underline hover:text-rose-gold-dark cursor-pointer"
                          >
                            Read More
                          </button>
                        </div>
                      </div>

                      {/* 4 Stats Metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-line/60">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-[13.5px] font-bold text-ink">
                            <StarIcon width={14} height={14} className="fill-amber-500 text-amber-500" />
                            <span>4.9</span>
                          </div>
                          <span className="text-[11px] text-ink-soft leading-tight mt-0.5">
                            Seller Rating <span className="text-ink-muted">(532 reviews)</span>
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-[13.5px] font-bold text-ink">
                            <BagIcon width={14} height={14} className="text-ink" />
                            <span>2.5K+</span>
                          </div>
                          <span className="text-[11px] text-ink-soft leading-tight mt-0.5">
                            Total Sales
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-[13.5px] font-bold text-ink">
                            <ClockIcon width={14} height={14} className="text-ink" />
                            <span>98%</span>
                          </div>
                          <span className="text-[11px] text-ink-soft leading-tight mt-0.5">
                            On-time Shipping
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-[13.5px] font-bold text-ink">
                            <MessageCircleIcon width={14} height={14} className="text-ink" />
                            <span>&lt; 2 hours</span>
                          </div>
                          <span className="text-[11px] text-ink-soft leading-tight mt-0.5">
                            Response Time
                          </span>
                        </div>
                      </div>

                      {/* 3 Trust Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#f4f2ee] px-3 py-1.5 text-[11.5px] font-medium text-ink border border-line/40">
                          <span className="flex size-3.5 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px]">✓</span>
                          <span>Identity Verified</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#f4f2ee] px-3 py-1.5 text-[11.5px] font-medium text-ink border border-line/40">
                          <span className="flex size-3.5 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px]">✓</span>
                          <span>Business Registered</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#f4f2ee] px-3 py-1.5 text-[11.5px] font-medium text-ink border border-line/40">
                          <span className="flex size-3.5 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px]">✓</span>
                          <span>Authentic Products</span>
                        </div>
                      </div>

                      {/* Craftsmanship & Origin */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="flex items-center gap-3 rounded-xl">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line/80 bg-white text-ink">
                            <DiamondIcon width={22} height={22} />
                          </div>
                          <div>
                            <h4 className="text-[12.5px] font-semibold text-ink">Craftsmanship</h4>
                            <p className="text-[11px] text-ink-soft">Handcrafted by skilled artisans</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line/80 bg-white text-ink">
                            <MapPinIcon width={22} height={22} />
                          </div>
                          <div>
                            <h4 className="text-[12.5px] font-semibold text-ink">Origin</h4>
                            <p className="text-[11px] text-ink-soft">Istanbul, Türkiye</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          className="rounded-xl border border-line bg-white py-2.5 text-[12.5px] font-semibold text-ink transition-colors hover:bg-[#fbf9f6]"
                        >
                          Contact Seller
                        </button>
                        <button
                          type="button"
                          className="rounded-xl bg-ink py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-ink-soft"
                        >
                          Visit Store →
                        </button>
                      </div>

                      {/* More from Lumière */}
                      <div className="pt-2">
                        <div className="mb-2.5 flex items-center justify-between">
                          <h4 className="text-[13px] font-semibold text-ink">More from Lumière</h4>
                          <button
                            type="button"
                            className="text-[11.5px] font-medium text-ink-soft hover:text-ink transition-colors flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>View Store</span>
                            <span>→</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            { title: "Classic Solitaire Ring", price: "$1,280", img: ring1 },
                            { title: "Emerald Cut Ring", price: "$1,520", img: ring2 },
                            { title: "Pear Halo Ring", price: "$1,690", img: ring3 },
                            { title: "Three Stone Ring", price: "$1,480", img: ring4 },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="group relative rounded-sm border border-line/60 bg-[#fbf9f6] transition-all hover:border-sand-400 hover:shadow-xs"
                            >
                              <div className="relative aspect-square rounded-sm w-full bg-white p-1">
                                <Image
                                  src={item.img}
                                  alt={item.title}
                                  fill
                                  sizes="120px"
                                  className="object-contain transition-transform rounded-sm duration-300"
                                />
                                <button
                                  type="button"
                                  className="absolute top-1.5 right-1.5 flex size-5.5 items-center justify-center rounded-full bg-white/90 text-ink-soft hover:text-rose-gold-dark hover:scale-110 shadow-2xs transition-all cursor-pointer"
                                  aria-label={`Wishlist ${item.title}`}
                                >
                                  <HeartIcon width={12} height={12} />
                                </button>
                              </div>
                              <div className="px-2 pb-2">
                                <h5 className="mt-2 truncate text-[11px] font-medium text-ink">
                                  {item.title}
                                </h5>
                                <p className="text-[11.5px] font-bold text-ink">
                                  {item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* You May Also Like Section for Mobile & Tablet (< lg): Placed cleanly under the main product flow */}
          <div className="mt-6 sm:mt-12 pt-6 lg:hidden">
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
