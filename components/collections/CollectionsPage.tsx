"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { TopBar } from "../layout/TopBar";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { ImpactBanner } from "../home/ImpactBanner";
import { GridIcon, ListIcon, SlidersIcon } from "../Icons";

import { HERO_PILLS, RING_PRODUCTS } from "./data";
import { FilterState, INITIAL_FILTERS, SortOption } from "./types";
import { CollectionsHero } from "./CollectionsHero";
import { CollectionsFilterSidebar } from "./CollectionsFilterSidebar";
import { CollectionsMobileFilterDrawer } from "./CollectionsMobileFilterDrawer";
import { CollectionsProductCard } from "./CollectionsProductCard";
import { CollectionsPromoBanner } from "./CollectionsPromoBanner";
import { CollectionsPagination } from "./CollectionsPagination";

const ITEMS_PER_PAGE = 8;

export function CollectionsPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Toggle wishlist
  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle hero pill filter
  const handleToggleHeroPill = (pillName: string, category?: string) => {
    setCurrentPage(1);
    if (category) {
      const exists = filters.categories.includes(category);
      handleFilterChange({
        ...filters,
        categories: exists
          ? filters.categories.filter((c) => c !== category)
          : [...filters.categories, category],
      });
    } else if (pillName === "Diamond") {
      const exists = filters.gemstones.includes("Diamond");
      handleFilterChange({
        ...filters,
        gemstones: exists
          ? filters.gemstones.filter((g) => g !== "Diamond")
          : [...filters.gemstones, "Diamond"],
      });
    }
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return RING_PRODUCTS.filter((product) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Material filter
      if (
        filters.materials.length > 0 &&
        !filters.materials.includes(product.material)
      ) {
        return false;
      }

      // Gemstone filter
      if (
        filters.gemstones.length > 0 &&
        !filters.gemstones.includes(product.gemstone)
      ) {
        return false;
      }

      // Style filter
      if (filters.styles.length > 0 && !filters.styles.includes(product.style)) {
        return false;
      }

      // Ring size filter
      if (
        filters.sizes.length > 0 &&
        !product.sizes.some((sz) => filters.sizes.includes(sz))
      ) {
        return false;
      }

      // Price range
      if (
        product.price < filters.minPrice ||
        product.price > filters.maxPrice
      ) {
        return false;
      }

      // Bestseller only quick filter
      if (bestsellerOnly && product.badge !== "Bestseller") {
        return false;
      }

      // Availability
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }
      if (filters.readyToShipOnly && !product.readyToShip) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "newest") {
        if (a.badge === "New") return -1;
        if (b.badge === "New") return 1;
      }
      return 0; // relevance
    });
  }, [filters, sort, bestsellerOnly]);

  // Dynamic pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setBestsellerOnly(false);
    setCurrentPage(1);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    RING_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Total active filter count for mobile badge
  const activeFilterCount =
    filters.categories.length +
    filters.materials.length +
    filters.gemstones.length +
    filters.styles.length +
    filters.sizes.length +
    (filters.maxPrice < 5000 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.readyToShipOnly ? 1 : 0) +
    (bestsellerOnly ? 1 : 0);

  // Dynamic applied filters chips (only selected filters appear)
  const appliedChips = useMemo(() => {
    const chips: { id: string; label: string; onRemove: () => void }[] = [];

    filters.categories.forEach((cat) => {
      chips.push({
        id: `cat-${cat}`,
        label: cat,
        onRemove: () =>
          handleFilterChange({
            ...filters,
            categories: filters.categories.filter((c) => c !== cat),
          }),
      });
    });

    filters.materials.forEach((mat) => {
      chips.push({
        id: `mat-${mat}`,
        label: mat,
        onRemove: () =>
          handleFilterChange({
            ...filters,
            materials: filters.materials.filter((m) => m !== mat),
          }),
      });
    });

    filters.gemstones.forEach((gem) => {
      chips.push({
        id: `gem-${gem}`,
        label: gem,
        onRemove: () =>
          handleFilterChange({
            ...filters,
            gemstones: filters.gemstones.filter((g) => g !== gem),
          }),
      });
    });

    filters.styles.forEach((st) => {
      chips.push({
        id: `style-${st}`,
        label: st,
        onRemove: () =>
          handleFilterChange({
            ...filters,
            styles: filters.styles.filter((s) => s !== st),
          }),
      });
    });

    filters.sizes.forEach((sz) => {
      chips.push({
        id: `size-${sz}`,
        label: `Size ${sz}`,
        onRemove: () =>
          handleFilterChange({
            ...filters,
            sizes: filters.sizes.filter((s) => s !== sz),
          }),
      });
    });

    if (filters.minPrice > 0 || filters.maxPrice < 5000) {
      const priceLabel =
        filters.minPrice === 0
          ? `Under $${filters.maxPrice.toLocaleString()}`
          : `$${filters.minPrice.toLocaleString()} - $${filters.maxPrice.toLocaleString()}`;
      chips.push({
        id: "price-range",
        label: priceLabel,
        onRemove: () =>
          handleFilterChange({
            ...filters,
            minPrice: 0,
            maxPrice: 5000,
          }),
      });
    }

    if (filters.inStockOnly) {
      chips.push({
        id: "in-stock",
        label: "In Stock",
        onRemove: () =>
          handleFilterChange({ ...filters, inStockOnly: false }),
      });
    }

    if (filters.readyToShipOnly) {
      chips.push({
        id: "ready-to-ship",
        label: "Ready to Ship",
        onRemove: () =>
          handleFilterChange({ ...filters, readyToShipOnly: false }),
      });
    }

    if (bestsellerOnly) {
      chips.push({
        id: "bestseller",
        label: "Bestseller",
        onRemove: () => setBestsellerOnly(false),
      });
    }

    return chips;
  }, [filters, bestsellerOnly]);

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-cream-50" id="products">
        {/* Collections Hero */}
        <CollectionsHero
          filters={filters}
          onTogglePill={handleToggleHeroPill}
        />

        {/* Mobile 4 Circular Category Items Carousel (under Hero only on mobile phones < md:, inside hero on tablet & desktop) */}
        <section
          aria-label="Shop rings by category"
          className="border-b border-line/60 bg-cream-50 py-4.5 md:hidden"
        >
          <div className="mx-auto max-w-[1440px] px-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-1 pt-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-around min-[420px]:justify-start">
              {HERO_PILLS.map((pill) => {
                const isActive =
                  (pill.category && filters.categories.includes(pill.category)) ||
                  (pill.name === "Diamond" && filters.gemstones.includes("Diamond"));

                return (
                  <button
                    key={pill.name}
                    type="button"
                    onClick={() => handleToggleHeroPill(pill.name, pill.category)}
                    className="group flex flex-col items-center shrink-0 snap-start text-center cursor-pointer min-w-[72px]"
                  >
                    <div
                      className={`relative size-16 sm:size-20 overflow-hidden rounded-full border p-2 transition-all duration-300 ${
                        isActive
                          ? "border-ink bg-sand-200 ring-2 ring-ink shadow-sm"
                          : "border-line/80 bg-[#f4ece3] shadow-xs group-hover:border-sand-400 group-hover:bg-cream-50"
                      }`}
                    >
                      <Image
                        src={pill.image}
                        alt={pill.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span
                      className={`mt-2 text-[12px] font-medium leading-tight ${
                        isActive ? "font-semibold text-ink" : "text-ink-soft group-hover:text-ink"
                      }`}
                    >
                      {pill.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Section (Sidebar + Product Grid) */}
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
            {/* Desktop Filter Sidebar (hidden on mobile) */}
            <div className="hidden lg:block">
              <CollectionsFilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
                categoryCounts={categoryCounts}
                totalCount={RING_PRODUCTS.length}
              />
            </div>

            {/* Products Main Area */}
            <div className="flex-1 min-w-0">
              {/* TOP TOOLBAR */}

              {/* 1. Mobile Toolbar (Filters on left, result count next to it, Sort on right) */}
              <div className="mb-3 lg:hidden">
                <div className="flex items-center justify-between gap-2.5">
                  {/* Left group: Filters button + Result count side by side */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(true)}
                      className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-[12.5px] font-semibold text-ink shadow-xs transition-colors hover:border-sand-400"
                    >
                      <SlidersIcon width={14} height={14} />
                      <span>Filters</span>
                      {activeFilterCount > 0 && (
                        <span className="ml-1 grid size-4.5 place-items-center rounded-full bg-ink text-[9.5px] font-semibold text-white">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>

                    <div className="text-[12.5px] font-medium text-ink tabular-nums">
                      {filteredProducts.length} results
                    </div>
                  </div>

                  {/* Right: Sort select dropdown */}
                  <div className="flex items-center">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortOption)}
                      className="cursor-pointer rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12px] font-medium text-ink shadow-xs focus:border-sand-400 focus:outline-none"
                    >
                      <option value="relevance">Sort: Relevance</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                </div>

                {/* Dynamically Applied filter chips (only selected filters, swipeable carousel with grey 'x') */}
                {appliedChips.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1.5 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {appliedChips.map((chip) => (
                      <span
                        key={chip.id}
                        className="inline-flex shrink-0 snap-start items-center gap-1.5 rounded-lg border border-sand-300 bg-[#faeed6] px-2.5 py-1 text-[12px] font-medium text-ink shadow-2xs"
                      >
                        <span>{chip.label}</span>
                        <button
                          type="button"
                          onClick={chip.onRemove}
                          aria-label={`Remove ${chip.label} filter`}
                          className="ml-0.5 cursor-pointer text-muted transition-colors hover:text-ink font-bold text-[11px]"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Desktop Toolbar (visible only on lg:) */}
              <div className="mb-6 hidden flex-col gap-3 border-b border-line pb-4 lg:flex">
                <div className="flex items-center justify-between">
                  <div className="text-[14px] font-medium text-ink">
                    <span className="font-semibold tabular-nums">
                      {filteredProducts.length}
                    </span>{" "}
                    results for &quot;Rings&quot;
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort dropdown */}
                    <div className="flex items-center gap-1.5 text-[13px] text-muted">
                      <span>Sort by:</span>
                      <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="cursor-pointer rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12.5px] font-medium text-ink focus:border-sand-400 focus:outline-none"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="newest">Newest</option>
                      </select>
                    </div>

                    {/* View layout toggle */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setViewMode("grid")}
                        aria-label="Grid view (4 columns)"
                        className={`grid size-8 cursor-pointer place-items-center rounded-lg border transition-colors ${
                          viewMode === "grid"
                            ? "border-ink bg-ink text-white"
                            : "border-line bg-white text-muted hover:text-ink"
                        }`}
                      >
                        <GridIcon width={15} height={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("compact")}
                        aria-label="Compact view"
                        className={`grid size-8 cursor-pointer place-items-center rounded-lg border transition-colors ${
                          viewMode === "compact"
                            ? "border-ink bg-ink text-white"
                            : "border-line bg-white text-muted hover:text-ink"
                        }`}
                      >
                        <ListIcon width={15} height={15} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Applied filter chips */}
                {appliedChips.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <span className="text-[12px] text-muted">Filters:</span>
                    {appliedChips.map((chip) => (
                      <span
                        key={chip.id}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-sand-300 bg-[#faeed6] px-2.5 py-1 text-[12px] font-medium text-ink shadow-2xs"
                      >
                        <span>{chip.label}</span>
                        <button
                          type="button"
                          onClick={chip.onRemove}
                          aria-label={`Remove ${chip.label} filter`}
                          className="ml-0.5 cursor-pointer text-muted transition-colors hover:text-ink font-bold text-[11px]"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Grid */}
              {paginatedProducts.length > 0 ? (
                <div
                  className={`grid gap-3.5 sm:gap-5 lg:gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
                  }`}
                >
                  {paginatedProducts.map((product) => (
                    <CollectionsProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={!!wishlist[product.id]}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>
              ) : (
                <div className="my-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-cream-100/50 p-12 text-center">
                  <p className="font-serif text-xl text-ink">No rings match your filters</p>
                  <p className="mt-1 text-[13px] text-muted">
                    Try clearing some filters or expanding your price range.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="mt-5 rounded-full bg-ink px-5 py-2 text-[12.5px] font-medium text-white transition-colors hover:bg-ink-soft cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Middle Promo Banner */}
              <CollectionsPromoBanner />

              {/* Pagination with dynamic product count logic */}
              <CollectionsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  const el = document.getElementById("products");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <CollectionsMobileFilterDrawer
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          filters={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          categoryCounts={categoryCounts}
          filteredCount={filteredProducts.length}
        />

        {/* Impact Banner ("More Than Jewellery") */}
        <ImpactBanner />
      </main>

      <Footer />
    </>
  );
}
