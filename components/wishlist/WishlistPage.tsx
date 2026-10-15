"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  HeartIcon,
  BagIcon,
  StarIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  MoreHorizontalIcon,
  LaptopIcon,
  BellIcon,
  ShieldIcon,
  CheckIcon,
} from "@/components/Icons";
import { useCartWishlist, ProductItem } from "@/context/CartWishlistContext";

import wishlistHeroImg from "@/app/images/wishlistHero.png";
import ring1 from "@/app/images/ring1.png";
import ring2 from "@/app/images/ring2.png";
import ring3 from "@/app/images/ring3.png";
import ring4 from "@/app/images/ring4.png";
import ring5 from "@/app/images/ring5.png";
import ring6 from "@/app/images/ring6.png";
import diamondsImg from "@/app/images/diamonds.png";
import gemstonesImg from "@/app/images/gemstones.png";

const YOU_MAY_ALSO_LIKE_ITEMS: ProductItem[] = [
  {
    id: "rec-1",
    name: "Halo Diamond Ring",
    price: 1320,
    image: ring1,
    category: "Rings",
  },
  {
    id: "rec-2",
    name: "Sapphire Necklace",
    price: 890,
    image: gemstonesImg,
    category: "Necklaces",
  },
  {
    id: "rec-3",
    name: "Diamond Stud Earrings",
    price: 760,
    image: diamondsImg,
    category: "Earrings",
  },
  {
    id: "rec-4",
    name: "Gold Bangle Bracelet",
    price: 1540,
    image: ring4,
    category: "Bracelets",
  },
  {
    id: "rec-5",
    name: "Emerald Pendant",
    price: 980,
    image: ring2,
    category: "Necklaces",
  },
  {
    id: "rec-6",
    name: "Pearl Bracelet",
    price: 690,
    image: ring5,
    category: "Bracelets",
  },
];

export function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
    moveAllWishlistToBag,
    isInWishlist,
    toggleWishlist,
  } = useCartWishlist();

  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<"recent" | "low_high" | "high_low">("recent");
  const [filterCategory, setFilterCategory] = useState<string>("All Categories");
  const [carouselCategory, setCarouselCategory] = useState<string>("All");

  const isAllSelected =
    wishlist.length > 0 && wishlist.every((item) => selectedIds[item.id]);

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds({});
    } else {
      const all: Record<string, boolean> = {};
      wishlist.forEach((item) => {
        all[item.id] = true;
      });
      setSelectedIds(all);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredAndSortedWishlist = useMemo(() => {
    let result = [...wishlist];

    if (filterCategory !== "All Categories") {
      result = result.filter((item) => item.category === filterCategory);
    }

    if (sortBy === "low_high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high_low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [wishlist, filterCategory, sortBy]);

  const filteredCarouselItems = useMemo(() => {
    if (carouselCategory === "All") return YOU_MAY_ALSO_LIKE_ITEMS;
    return YOU_MAY_ALSO_LIKE_ITEMS.filter(
      (item) => item.category === carouselCategory
    );
  }, [carouselCategory]);

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-cream-50">
        {wishlist.length === 0 ? (
          /* ============================================================ */
          /* 1. EMPTY WISHLIST STATE (Screenshot 1)                        */
          /* ============================================================ */
          <section className="relative w-full border-b border-line/60">
            {/* Background Image Container */}
            <div className="relative min-h-[460px] sm:min-h-[520px] w-full flex items-center justify-center py-16 px-6">
              <Image
                src={wishlistHeroImg}
                alt="Wishlist background"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />

              {/* Centered Content Card */}
              <div className="relative z-10 mx-auto max-w-xl text-center flex flex-col items-center">
                <div className="mb-4 grid size-16 place-items-center rounded-full border border-line/80 bg-white/90 text-ink shadow-sm">
                  <HeartIcon width={32} height={32} className="stroke-[1.25]" />
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink">
                  Your wishlist is empty
                </h1>
                <p className="mt-3.5 text-[13.5px] sm:text-[14.5px] leading-relaxed text-ink-soft max-w-md">
                  Save your favourite pieces and find them here whenever you&apos;re
                  ready. Explore our collections and add items you love.
                </p>
                <Link
                  href="/jewellery"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 text-[13.5px] font-semibold text-white shadow-md transition-all hover:bg-ink-soft active:scale-[0.99] cursor-pointer"
                >
                  <span>Explore Jewellery</span>
                  <ArrowRightIcon width={14} height={14} />
                </Link>
              </div>
            </div>
          </section>
        ) : (
          /* ============================================================ */
          /* 2. FILLED WISHLIST STATE (Screenshot 3)                       */
          /* ============================================================ */
          <>
            {/* Hero Section Banner */}
            <section className="relative w-full border-b border-line/60 bg-cream-200">
              <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-[280px]">
                <Image
                  src={wishlistHeroImg}
                  alt="My Wishlist"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-right sm:object-center opacity-90"
                />
                {/* Gradient wash from left to protect text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-cream-100/20 via-cream-100/70 to-transparent" />

                {/* Hero Content Container aligned with main content */}
                <div className="relative z-10 mx-auto flex min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] max-w-[1440px] items-center px-5 py-8 sm:px-8 lg:px-10">
                  <div className="max-w-xl">
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal leading-tight text-ink">
                      My Wishlist
                    </h1>
                    <p className="mt-2 text-[14px] sm:text-[15px] font-semibold text-ink">
                      {wishlist.length} saved item{wishlist.length === 1 ? "" : "s"}
                    </p>
                    <p className="mt-1.5 text-[13px] sm:text-[13.5px] text-ink-soft leading-relaxed max-w-md">
                      Your favourite pieces, all in one place. Save, compare and
                      add to bag when you&apos;re ready.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content Area */}
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-8">
              {/* Action / Filter Bar */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line/60 pb-5">
                {/* Select All */}
                <label className="flex items-center gap-2.5 text-[13px] font-medium text-ink cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="size-4 rounded border-line text-ink accent-ink cursor-pointer"
                  />
                  <span>Select all ({wishlist.length})</span>
                </label>

                {/* Sort, Filter & Move All Button */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Sort By */}
                  <div className="relative flex items-center gap-2 text-[12.5px]">
                    <span className="text-muted hidden sm:inline">Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="rounded-lg border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink shadow-2xs hover:border-sand-400 focus:outline-none cursor-pointer"
                    >
                      <option value="recent">Recently Saved</option>
                      <option value="low_high">Price: Low to High</option>
                      <option value="high_low">Price: High to Low</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="relative flex items-center gap-2 text-[12.5px]">
                    <span className="text-muted hidden sm:inline">Filter</span>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="rounded-lg border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink shadow-2xs hover:border-sand-400 focus:outline-none cursor-pointer"
                    >
                      <option value="All Categories">All Categories</option>
                      <option value="Rings">Rings</option>
                      <option value="Necklaces">Necklaces</option>
                      <option value="Earrings">Earrings</option>
                      <option value="Bracelets">Bracelets</option>
                    </select>
                  </div>

                  {/* Move All to Bag CTA */}
                  <button
                    type="button"
                    onClick={moveAllWishlistToBag}
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-ink px-4 sm:px-5 py-2 text-[12.5px] font-semibold text-white shadow-xs transition-colors hover:bg-ink-soft active:scale-[0.98]"
                  >
                    <span>Move All Available to Bag</span>
                    <BagIcon width={15} height={15} />
                  </button>
                </div>
              </div>

              {/* Wishlist Product Cards Grid (Screenshot 3) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {filteredAndSortedWishlist.map((item) => {
                  const isChecked = Boolean(selectedIds[item.id]);

                  return (
                    <div
                      key={item.id}
                      className="group relative flex flex-col rounded-2xl border border-line/70 bg-white transition-all duration-300 hover:border-sand-400 hover:shadow-md"
                    >
                      {/* Product Image Frame: Edge-to-edge, no padding */}
                      <div className="relative aspect-square w-full rounded-t-2xl bg-[#faf7f2] flex items-center justify-center">
                        {/* Selection Checkbox */}
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(item.id)}
                          aria-label={`Select ${item.name}`}
                          className="absolute top-3 left-3 z-10 size-4.5 rounded border-line text-ink accent-ink cursor-pointer bg-white/90"
                        />

                        {/* Remove from Wishlist Heart Button */}
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item.id)}
                          aria-label={`Remove ${item.name} from wishlist`}
                          className="absolute top-3 right-3 z-10 grid size-8 cursor-pointer place-items-center rounded-full bg-white/95 text-[#b74134] shadow-2xs backdrop-blur-xs transition-transform hover:scale-110 active:scale-95"
                        >
                          <HeartIcon
                            width={16}
                            height={16}
                            className="fill-[#b74134] text-[#b74134]"
                          />
                        </button>

                        {/* Image: Edge-to-edge */}
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover rounded-t-2xl"
                        />
                      </div>

                      {/* Card Content with internal padding */}
                      <div className="p-3.5 sm:p-4 flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="truncate text-[13.5px] font-medium text-ink group-hover:text-rose-gold-dark transition-colors">
                            {item.name}
                          </h3>
                          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted truncate">
                            <span>{item.metal || "18K Gold"}</span>
                            {item.carat && (
                              <>
                                <span>·</span>
                                <span>{item.carat}</span>
                              </>
                            )}
                          </div>
                          {item.brand && (
                            <p className="text-[11px] text-ink-soft mt-0.5 font-medium">
                              {item.brand}
                            </p>
                          )}

                          {/* Price */}
                          <div className="mt-1.5 flex items-baseline gap-2">
                            <span className="text-[14.5px] font-semibold text-ink">
                              ${item.price.toLocaleString()}
                            </span>
                            {item.oldPrice && (
                              <span className="text-[12px] text-muted line-through">
                                ${item.oldPrice.toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Rating & Stock Status */}
                          <div className="mt-2 flex items-center justify-between gap-1 text-[11px]">
                            <div className="flex items-center text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  width={11}
                                  height={11}
                                  className="fill-amber-400 text-amber-400"
                                />
                              ))}
                              <span className="ml-1 text-muted text-[10.5px]">
                                ({item.reviewsCount || 124})
                              </span>
                            </div>

                            {/* Stock Badge */}
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                                item.stockStatus === "low_stock"
                                  ? "bg-[#fae8e2] text-[#9c4b37]"
                                  : item.stockStatus === "price_dropped"
                                  ? "bg-[#e6f4f1] text-[#1b6b55]"
                                  : "bg-[#eaf4eb] text-[#2f6f36]"
                              }`}
                            >
                              {item.stockText || "In Stock"}
                            </span>
                          </div>
                        </div>

                        {/* Add to Bag Button */}
                        <button
                          type="button"
                          onClick={() => addToCart(item, 1)}
                          className="mt-3.5 w-full cursor-pointer rounded-xl bg-ink py-2.5 text-center text-[12.5px] font-semibold text-white transition-colors hover:bg-ink-soft active:scale-[0.99]"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo & Value Propositions Box (Screenshot 3) */}
              <div className="mt-12 rounded-2xl border border-line/70 bg-[#faf7f2] p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xs">
                {/* Left: Icon & Action */}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line/80 bg-white text-[#9c4b37] shadow-xs">
                    <HeartIcon width={28} height={28} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-ink">
                      Your wishlist is empty?
                    </h3>
                    <p className="mt-1 text-[12.5px] text-ink-soft max-w-sm">
                      Save your favourite jewellery pieces and find them whenever
                      you&apos;re ready.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                  <Link
                    href="/jewellery"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-ink px-6 py-2.5 text-[12.5px] font-semibold text-white hover:bg-ink-soft transition-colors cursor-pointer"
                  >
                    Explore Jewellery
                  </Link>

                  {/* Divider line for desktop */}
                  <div className="hidden lg:block h-12 w-px bg-line/70 mx-2" />

                  {/* 3 Perks Column */}
                  <div className="space-y-2 text-[12px] text-ink-soft w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                      <LaptopIcon width={15} height={15} className="text-ink shrink-0" />
                      <span>
                        <strong className="font-semibold text-ink">Saved across devices</strong> — Access your wishlist on any device.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BellIcon width={15} height={15} className="text-ink shrink-0" />
                      <span>
                        <strong className="font-semibold text-ink">Price drop alerts</strong> — Get notified when the price drops.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldIcon width={15} height={15} className="text-ink shrink-0" />
                      <span>
                        <strong className="font-semibold text-ink">Keep your favourites private</strong> — Your wishlist is only visible to you.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* You May Also Like Carousel (Screenshot 2 / Image 2) */}
              <div className="mt-12 pt-6 border-t border-line/60">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
                      You May Also Like
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[12.5px]">
                    {["All", "Rings", "Necklaces", "Earrings", "Bracelets"].map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCarouselCategory(cat)}
                          className={`font-medium transition-colors cursor-pointer ${
                            carouselCategory === cat
                              ? "text-ink font-semibold border-b border-ink pb-0.5"
                              : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                    <Link
                      href="/jewellery"
                      className="ml-2 flex items-center gap-1 font-semibold text-ink hover:text-rose-gold-dark transition-colors"
                    >
                      <span>View All</span>
                      <ArrowRightIcon width={13} height={13} />
                    </Link>
                  </div>
                </div>

                {/* Carousel Grid: Edge-to-edge rounded images with no card padding */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {filteredCarouselItems.map((rec) => {
                    const isWish = isInWishlist(rec.id);

                    return (
                      <div
                        key={rec.id}
                        className="group relative flex flex-col transition-all"
                      >
                        {/* Image Container: Edge-to-edge without padding */}
                        <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl bg-[#faf7f2] flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(rec)}
                            aria-label={`Wishlist ${rec.name}`}
                            className="absolute top-2.5 right-2.5 z-10 grid size-7 place-items-center rounded-full bg-white/90 text-ink-soft shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                          >
                            <HeartIcon
                              width={14}
                              height={14}
                              className={
                                isWish ? "fill-[#b74134] text-[#b74134]" : "text-ink"
                              }
                            />
                          </button>
                          <Image
                            src={rec.image}
                            alt={rec.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                            className="object-cover rounded-xl sm:rounded-2xl"
                          />
                        </div>

                        {/* Title & Price below image */}
                        <h4 className="mt-2.5 truncate text-[12.5px] font-medium text-ink group-hover:text-rose-gold-dark transition-colors">
                          {rec.name}
                        </h4>
                        <p className="mt-0.5 text-[12.5px] font-semibold text-ink">
                          ${rec.price.toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
