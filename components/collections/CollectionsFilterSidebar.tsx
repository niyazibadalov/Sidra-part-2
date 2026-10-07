"use client";

import { useState } from "react";
import { ChevronDownIcon } from "../Icons";
import { FilterState } from "./types";

type FilterSidebarProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
};

const CATEGORIES = [
  "Engagement Rings",
  "Wedding Bands",
  "Stackable Rings",
  "Statement Rings",
  "Fashion Rings",
];

const MATERIALS = [
  { name: "18K Gold", color: "#d4af37" },
  { name: "14K Gold", color: "#e6ca65" },
  { name: "White Gold", color: "#dcdcdc" },
  { name: "Rose Gold", color: "#c98d83" },
  { name: "Platinum", color: "#a8b5c2" },
];

const GEMSTONES = ["Diamond", "Sapphire", "Emerald", "Ruby", "Pearl", "Other"];

const SIZES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const STYLES = ["Solitaire", "Halo", "Three Stone", "Vintage", "Minimal", "Bold"];

const PRICE_RANGES = [
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 - $1,000", min: 500, max: 1000 },
  { label: "$1,000 - $2,500", min: 1000, max: 2500 },
  { label: "$2,500 - $5,000", min: 2500, max: 5000 },
  { label: "$5,000+", min: 5000, max: 10000 },
];

export function CollectionsFilterSidebar({
  filters,
  onChange,
  onClear,
  categoryCounts,
  totalCount,
}: FilterSidebarProps) {
  // Accordion open/close state
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    material: true,
    gemstone: true,
    ringSize: true,
    style: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleMaterial = (mat: string) => {
    const next = filters.materials.includes(mat)
      ? filters.materials.filter((m) => m !== mat)
      : [...filters.materials, mat];
    onChange({ ...filters, materials: next });
  };

  const toggleGemstone = (gem: string) => {
    const next = filters.gemstones.includes(gem)
      ? filters.gemstones.filter((g) => g !== gem)
      : [...filters.gemstones, gem];
    onChange({ ...filters, gemstones: next });
  };

  const toggleStyle = (style: string) => {
    const next = filters.styles.includes(style)
      ? filters.styles.filter((s) => s !== style)
      : [...filters.styles, style];
    onChange({ ...filters, styles: next });
  };

  const toggleSize = (size: number) => {
    const next = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes: next });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.materials.length > 0 ||
    filters.gemstones.length > 0 ||
    filters.styles.length > 0 ||
    filters.sizes.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 5000 ||
    filters.inStockOnly ||
    filters.readyToShipOnly;

  return (
    <aside className="w-full lg:w-[250px] shrink-0" aria-label="Product filters">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <h2 className="font-serif text-lg font-medium text-ink">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer text-[12px] font-medium text-ink-soft underline decoration-sand-400 underline-offset-2 transition-colors hover:text-ink"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="divide-y divide-line/60">
        {/* Category Section */}
        <div className="py-4.5">
          <button
            type="button"
            onClick={() => toggleSection("category")}
            className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[15px] font-medium text-ink"
          >
            <span>Category</span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-ink-soft transition-transform ${
                openSections.category ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.category && (
            <div className="mt-3 space-y-2">
              {/* All Rings */}
              <label className="flex cursor-pointer items-center justify-between text-[13px] text-ink-soft hover:text-ink">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={filters.categories.length === 0}
                    onChange={() => onChange({ ...filters, categories: [] })}
                    className="size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                  />
                  <span className={filters.categories.length === 0 ? "font-semibold text-ink" : ""}>
                    All Rings
                  </span>
                </span>
                <span className="text-[11.5px] text-muted tabular-nums">
                  ({totalCount})
                </span>
              </label>

              {CATEGORIES.map((cat) => {
                const checked = filters.categories.includes(cat);
                const count = categoryCounts[cat] || 0;
                return (
                  <label
                    key={cat}
                    className="flex cursor-pointer items-center justify-between text-[13px] text-ink-soft hover:text-ink"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(cat)}
                        className="size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                      />
                      <span className={checked ? "font-semibold text-ink" : ""}>
                        {cat}
                      </span>
                    </span>
                    <span className="text-[11.5px] text-muted tabular-nums">
                      ({count})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="py-4.5">
          <button
            type="button"
            onClick={() => toggleSection("price")}
            className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[15px] font-medium text-ink"
          >
            <span>Price</span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-ink-soft transition-transform ${
                openSections.price ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.price && (
            <div className="mt-3 space-y-3.5">
              {/* Checkboxes */}
              <div className="space-y-2">
                {PRICE_RANGES.map((r) => {
                  const checked =
                    filters.minPrice === r.min && filters.maxPrice === r.max;
                  return (
                    <label
                      key={r.label}
                      className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-soft hover:text-ink"
                    >
                      <input
                        type="radio"
                        name="price-bracket"
                        checked={checked}
                        onChange={() =>
                          onChange({
                            ...filters,
                            minPrice: r.min,
                            maxPrice: r.max,
                          })
                        }
                        className="size-4 border-line text-ink accent-ink focus:ring-ink"
                      />
                      <span>{r.label}</span>
                    </label>
                  );
                })}
              </div>

              {/* Slider & Input Range */}
              <div className="rounded-lg border border-line/60 bg-cream-50 p-2.5 pt-3">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    onChange({ ...filters, maxPrice: Number(e.target.value) })
                  }
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-sand-300 accent-ink"
                />
                <div className="mt-2 flex items-center justify-between gap-2 text-[12px]">
                  <div className="rounded border border-line bg-white px-2 py-1 text-ink font-medium">
                    ${filters.minPrice}
                  </div>
                  <span className="text-muted">–</span>
                  <div className="rounded border border-line bg-white px-2 py-1 text-ink font-medium">
                    ${filters.maxPrice}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Material Section */}
        <div className="py-4.5">
          <button
            type="button"
            onClick={() => toggleSection("material")}
            className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[15px] font-medium text-ink"
          >
            <span>Material</span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-ink-soft transition-transform ${
                openSections.material ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.material && (
            <div className="mt-3 space-y-2.5">
              {MATERIALS.map((mat) => {
                const checked = filters.materials.includes(mat.name);
                return (
                  <label
                    key={mat.name}
                    className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-soft hover:text-ink"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMaterial(mat.name)}
                      className="size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                    />
                    <span
                      className="inline-block size-3.5 shrink-0 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: mat.color }}
                      aria-hidden
                    />
                    <span className={checked ? "font-semibold text-ink" : ""}>
                      {mat.name}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Gemstone Section */}
        <div className="py-4.5">
          <button
            type="button"
            onClick={() => toggleSection("gemstone")}
            className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[15px] font-medium text-ink"
          >
            <span>Gemstone</span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-ink-soft transition-transform ${
                openSections.gemstone ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.gemstone && (
            <div className="mt-3 space-y-2">
              {GEMSTONES.map((gem) => {
                const checked = filters.gemstones.includes(gem);
                return (
                  <label
                    key={gem}
                    className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-soft hover:text-ink"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleGemstone(gem)}
                      className="size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                    />
                    <span className={checked ? "font-semibold text-ink" : ""}>
                      {gem}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Ring Size Section */}
        <div className="py-4.5">
          <button
            type="button"
            onClick={() => toggleSection("ringSize")}
            className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[15px] font-medium text-ink"
          >
            <span>Ring Size</span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-ink-soft transition-transform ${
                openSections.ringSize ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.ringSize && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {SIZES.map((sz) => {
                const active = filters.sizes.includes(sz);
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => toggleSize(sz)}
                    className={`grid size-7.5 place-items-center rounded-full text-[12px] font-medium transition-colors ${
                      active
                        ? "bg-ink text-white"
                        : "border border-line/80 bg-white text-ink hover:border-sand-400"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Style Section */}
        <div className="py-4.5">
          <button
            type="button"
            onClick={() => toggleSection("style")}
            className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[15px] font-medium text-ink"
          >
            <span>Style</span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-ink-soft transition-transform ${
                openSections.style ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.style && (
            <div className="mt-3 space-y-2">
              {STYLES.map((st) => {
                const checked = filters.styles.includes(st);
                return (
                  <label
                    key={st}
                    className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-soft hover:text-ink"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleStyle(st)}
                      className="size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                    />
                    <span className={checked ? "font-semibold text-ink" : ""}>
                      {st}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Availability Section */}
        <div className="py-4.5">
          <button
            type="button"
            onClick={() => toggleSection("availability")}
            className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[15px] font-medium text-ink"
          >
            <span>Availability</span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-ink-soft transition-transform ${
                openSections.availability ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.availability && (
            <div className="mt-3 space-y-2">
              <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-soft hover:text-ink">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) =>
                    onChange({ ...filters, inStockOnly: e.target.checked })
                  }
                  className="size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                />
                <span>In Stock</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-soft hover:text-ink">
                <input
                  type="checkbox"
                  checked={filters.readyToShipOnly}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      readyToShipOnly: e.target.checked,
                    })
                  }
                  className="size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                />
                <span>Ready to Ship</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
