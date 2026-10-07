"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon, CloseIcon } from "../Icons";
import { FilterState } from "./types";

type MobileFilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  categoryCounts: Record<string, number>;
  filteredCount: number;
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

export function CollectionsMobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  onClear,
  categoryCounts,
  filteredCount,
}: MobileFilterDrawerProps) {
  // Accordions open/close state
  const [openSections, setOpenSections] = useState({
    category: true,
    material: true,
    price: true,
    gemstone: false,
    ringSize: false,
    style: false,
    availability: true,
  });

  const toggleSection = (s: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [s]: !prev[s] }));
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Helpers for toggles
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

  // Applied filters list for quick removal tags
  const appliedChips: { label: string; onRemove: () => void }[] = [];

  filters.categories.forEach((cat) => {
    appliedChips.push({
      label: cat,
      onRemove: () =>
        onChange({
          ...filters,
          categories: filters.categories.filter((c) => c !== cat),
        }),
    });
  });

  filters.materials.forEach((mat) => {
    appliedChips.push({
      label: mat,
      onRemove: () =>
        onChange({
          ...filters,
          materials: filters.materials.filter((m) => m !== mat),
        }),
    });
  });

  filters.gemstones.forEach((gem) => {
    appliedChips.push({
      label: gem,
      onRemove: () =>
        onChange({
          ...filters,
          gemstones: filters.gemstones.filter((g) => g !== gem),
        }),
    });
  });

  filters.styles.forEach((st) => {
    appliedChips.push({
      label: st,
      onRemove: () =>
        onChange({
          ...filters,
          styles: filters.styles.filter((s) => s !== st),
        }),
    });
  });

  filters.sizes.forEach((sz) => {
    appliedChips.push({
      label: `Size ${sz}`,
      onRemove: () =>
        onChange({
          ...filters,
          sizes: filters.sizes.filter((s) => s !== sz),
        }),
    });
  });

  if (filters.maxPrice < 5000) {
    appliedChips.push({
      label: `Under $${filters.maxPrice.toLocaleString()}`,
      onRemove: () => onChange({ ...filters, maxPrice: 5000 }),
    });
  }

  if (filters.inStockOnly) {
    appliedChips.push({
      label: "In Stock",
      onRemove: () => onChange({ ...filters, inStockOnly: false }),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer Container (bottom sheet) */}
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-3xl bg-cream-50 shadow-2xl transition-transform animate-fade-up">
        {/* Drag handle */}
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-sand-300" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h2 className="font-serif text-2xl font-normal text-ink">Filters</h2>
          <div className="flex items-center gap-3">
            {appliedChips.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="cursor-pointer text-[13px] font-medium text-ink-soft underline decoration-sand-400 hover:text-ink"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="grid size-9 cursor-pointer place-items-center rounded-full text-ink hover:bg-cream-200"
            >
              <CloseIcon width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Applied Filters chips */}
          {appliedChips.length > 0 && (
            <div>
              <p className="text-[12.5px] font-semibold text-ink">
                Applied Filters ({appliedChips.length})
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {appliedChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 rounded-md border border-sand-300 bg-[#f7ede2] px-3 py-1.5 text-[12px] font-medium text-ink"
                  >
                    <span>{chip.label}</span>
                    <button
                      type="button"
                      onClick={chip.onRemove}
                      className="cursor-pointer text-muted hover:text-ink font-bold text-[12px]"
                      aria-label={`Remove ${chip.label}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Category Accordion */}
          <div className="border-b border-line/60 pb-4">
            <button
              type="button"
              onClick={() => toggleSection("category")}
              className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[16px] text-ink"
            >
              <span>Category</span>
              <ChevronDownIcon
                width={18}
                height={18}
                className={`transition-transform ${
                  openSections.category ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.category && (
              <div className="mt-3 space-y-2.5">
                <label className="flex cursor-pointer items-center justify-between text-[13.5px] text-ink-soft hover:text-ink">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={filters.categories.length === 0}
                      onChange={() => onChange({ ...filters, categories: [] })}
                      className="size-4.5 rounded border-line text-ink accent-ink focus:ring-ink"
                    />
                    <span className={filters.categories.length === 0 ? "font-semibold text-ink" : ""}>
                      All Rings
                    </span>
                  </span>
                </label>

                {CATEGORIES.map((cat) => {
                  const checked = filters.categories.includes(cat);
                  const count = categoryCounts[cat] || 0;
                  return (
                    <label
                      key={cat}
                      className="flex cursor-pointer items-center justify-between text-[13.5px] text-ink-soft hover:text-ink"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCategory(cat)}
                          className="size-4.5 rounded border-line text-ink accent-ink focus:ring-ink"
                        />
                        <span className={checked ? "font-semibold text-ink" : ""}>
                          {cat}
                        </span>
                      </span>
                      <span className="text-[12px] text-muted tabular-nums">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Material Accordion */}
          <div className="border-b border-line/60 pb-4">
            <button
              type="button"
              onClick={() => toggleSection("material")}
              className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[16px] text-ink"
            >
              <span>Material</span>
              <ChevronDownIcon
                width={18}
                height={18}
                className={`transition-transform ${
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
                      className={`flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-[13.5px] text-ink-soft transition-colors ${
                        checked ? "bg-[#f7ede2] font-semibold text-ink" : "hover:bg-cream-100"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleMaterial(mat.name)}
                          className="size-4.5 rounded border-line text-ink accent-ink focus:ring-ink"
                        />
                        <span
                          className="inline-block size-3.5 shrink-0 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: mat.color }}
                          aria-hidden
                        />
                        <span>{mat.name}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price Accordion */}
          <div className="border-b border-line/60 pb-4">
            <button
              type="button"
              onClick={() => toggleSection("price")}
              className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[16px] text-ink"
            >
              <span>Price</span>
              <ChevronDownIcon
                width={18}
                height={18}
                className={`transition-transform ${
                  openSections.price ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.price && (
              <div className="mt-3.5 space-y-3.5">
                <div className="space-y-2">
                  {PRICE_RANGES.map((r) => {
                    const checked =
                      filters.minPrice === r.min && filters.maxPrice === r.max;
                    return (
                      <label
                        key={r.label}
                        className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ink-soft hover:text-ink"
                      >
                        <input
                          type="radio"
                          name="mobile-price-bracket"
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

                <div className="rounded-lg border border-line/60 bg-cream-50 p-3">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      onChange({ ...filters, maxPrice: Number(e.target.value) })
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-ink accent-ink"
                  />
                  <div className="mt-2.5 flex items-center justify-between gap-2 text-[12.5px]">
                    <div className="rounded border border-line bg-white px-2.5 py-1 text-ink font-medium">
                      ${filters.minPrice}
                    </div>
                    <span className="text-muted">–</span>
                    <div className="rounded border border-line bg-white px-2.5 py-1 text-ink font-medium">
                      ${filters.maxPrice}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gemstone Accordion */}
          <div className="border-b border-line/60 pb-4">
            <button
              type="button"
              onClick={() => toggleSection("gemstone")}
              className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[16px] text-ink"
            >
              <span>Gemstone</span>
              <ChevronDownIcon
                width={18}
                height={18}
                className={`transition-transform ${
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
                      className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ink-soft hover:text-ink"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleGemstone(gem)}
                        className="size-4.5 rounded border-line text-ink accent-ink focus:ring-ink"
                      />
                      <span>{gem}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Ring Size Accordion */}
          <div className="border-b border-line/60 pb-4">
            <button
              type="button"
              onClick={() => toggleSection("ringSize")}
              className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[16px] text-ink"
            >
              <span>Ring Size</span>
              <ChevronDownIcon
                width={18}
                height={18}
                className={`transition-transform ${
                  openSections.ringSize ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.ringSize && (
              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((sz) => {
                  const active = filters.sizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSize(sz)}
                      className={`grid size-8 cursor-pointer place-items-center rounded-full text-[13px] font-medium transition-colors ${
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

          {/* Style Accordion */}
          <div className="border-b border-line/60 pb-4">
            <button
              type="button"
              onClick={() => toggleSection("style")}
              className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[16px] text-ink"
            >
              <span>Style</span>
              <ChevronDownIcon
                width={18}
                height={18}
                className={`transition-transform ${
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
                      className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ink-soft hover:text-ink"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleStyle(st)}
                        className="size-4.5 rounded border-line text-ink accent-ink focus:ring-ink"
                      />
                      <span>{st}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Availability Accordion */}
          <div className="pb-4">
            <button
              type="button"
              onClick={() => toggleSection("availability")}
              className="flex w-full cursor-pointer items-center justify-between text-left font-serif text-[16px] text-ink"
            >
              <span>Availability</span>
              <ChevronDownIcon
                width={18}
                height={18}
                className={`transition-transform ${
                  openSections.availability ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.availability && (
              <div className="mt-3 space-y-2.5">
                <label className="flex cursor-pointer items-center justify-between text-[13.5px] text-ink-soft hover:text-ink">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={filters.inStockOnly}
                      onChange={(e) =>
                        onChange({ ...filters, inStockOnly: e.target.checked })
                      }
                      className="size-4.5 rounded border-line text-ink accent-ink focus:ring-ink"
                    />
                    <span>In Stock</span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-center justify-between text-[13.5px] text-ink-soft hover:text-ink">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={filters.readyToShipOnly}
                      onChange={(e) =>
                        onChange({
                          ...filters,
                          readyToShipOnly: e.target.checked,
                        })
                      }
                      className="size-4.5 rounded border-line text-ink accent-ink focus:ring-ink"
                    />
                    <span>Ready to Ship</span>
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Action Button with REAL DYNAMIC RESULT COUNT */}
        <div className="border-t border-line bg-cream-50 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl bg-ink py-3.5 text-center text-[14px] font-semibold text-white shadow-md transition-all hover:bg-ink-soft active:scale-[0.99]"
          >
            {filteredCount > 0
              ? `Show ${filteredCount} Results`
              : "No Results Found"}
          </button>
        </div>
      </div>
    </div>
  );
}
