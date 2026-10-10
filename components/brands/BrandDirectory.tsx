"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import heroImage from "@/app/images/brands/hero.png";
import desktopHeroImage from "@/app/images/brands/hero-desktop.png";
import emergingImage from "@/app/images/brands/emerging.png";
import {
  ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, CreditCardIcon, DiamondIcon,
  GlobeIcon, HeartIcon, LeafIcon, RefreshArrowsIcon, SearchIcon, TruckIcon,
} from "../Icons";
import { BRANDS, DESIGN_BRAND_COUNT_LABEL, DESIGN_COLUMNS, FEATURED_BRANDS, normalise, type Brand } from "./brands";
import "./brands.css";

const TABS = ["All Brands", "Featured", "Trending", "New"] as const;
type Tab = (typeof TABS)[number];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PRICE_OPTIONS = ["Under €500", "€500 – €1,000", "€1,000 – €2,500", "Over €2,500"];
const SORT_OPTIONS = ["Featured", "A–Z", "Z–A"];
const FOLLOW_KEY = "sidra.brands.following";
const FOLLOW_EVENT = "sidra-brands-follow-change";
const { props: desktopHeroProps } = getImageProps({
  src: desktopHeroImage,
  alt: "The diamond rings shown in the SIDRA brand edit",
  fill: true,
  sizes: "55vw",
});
const TRUST = [
  { icon: DiamondIcon, mobileIcon: DiamondIcon, title: "Authenticity Guaranteed", text: "Every piece is verified" },
  { icon: TruckIcon, mobileIcon: LeafIcon, title: "Global Delivery", text: "To 100+ countries" },
  { icon: RefreshArrowsIcon, mobileIcon: RefreshArrowsIcon, title: "Easy Returns", text: "Hassle-free" },
  { icon: CreditCardIcon, mobileIcon: GlobeIcon, title: "Secure Payments", text: "Multiple options" },
  { icon: LeafIcon, mobileIcon: LeafIcon, title: "A More Sustainable Future", text: "For generations to come." },
];

function subscribeToFollowing(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(FOLLOW_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(FOLLOW_EVENT, callback);
  };
}

function readFollowing() {
  try { return window.localStorage.getItem(FOLLOW_KEY) ?? "[]"; }
  catch { return "[]"; }
}

function SelectFilter({ label, value, onChange, options, className = "" }: {
  label: string; value: string; onChange: (value: string) => void; options: string[]; className?: string;
}) {
  return <label className={`relative min-w-0 ${className}`}>
    <span className="sr-only">{label}</span>
    <select value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-full cursor-pointer appearance-none rounded-md border border-line bg-white pr-8 pl-3 text-[12px] focus:outline-none focus:ring-2 focus:ring-sand-400">
      <option value="">{label}</option>
      {options.map((option) => <option key={option}>{option}</option>)}
    </select>
    <ChevronDownIcon width={12} height={12} className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2" />
  </label>;
}

function splitColumns(letters: string[], count: number) {
  const size = Math.ceil(letters.length / count);
  return Array.from({ length: count }, (_, index) => letters.slice(index * size, (index + 1) * size));
}

export function BrandDirectory() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("All Brands");
  const [letter, setLetter] = useState("");
  const [type, setType] = useState("");
  const [region, setRegion] = useState("");
  const [price, setPrice] = useState("");
  const [sustainable, setSustainable] = useState("");
  const [followingOnly, setFollowingOnly] = useState(false);
  const [sort, setSort] = useState("Featured");
  const [expanded, setExpanded] = useState(false);
  const [moreFilters, setMoreFilters] = useState(false);
  const [temporaryFollowing, setTemporaryFollowing] = useState<string[] | null>(null);
  const followingSnapshot = useSyncExternalStore(subscribeToFollowing, readFollowing, () => "[]");
  let savedFollowing: string[] = [];
  try {
    const parsed: unknown = JSON.parse(followingSnapshot);
    if (Array.isArray(parsed)) savedFollowing = parsed.filter((name): name is string => typeof name === "string");
  } catch {}
  const following = temporaryFollowing ?? savedFollowing;

  function matches(brand: Brand) {
    const priceMatches = !price || (price === PRICE_OPTIONS[0] ? brand.price < 500
      : price === PRICE_OPTIONS[1] ? brand.price >= 500 && brand.price <= 1000
      : price === PRICE_OPTIONS[2] ? brand.price > 1000 && brand.price <= 2500 : brand.price > 2500);
    return normalise(brand.name).includes(normalise(query.trim())) &&
      (!letter || normalise(brand.name).startsWith(letter.toLowerCase())) &&
      (!type || brand.type === type) && (!region || brand.region === region) &&
      (!sustainable || brand.sustainable) && (!followingOnly || following.includes(brand.name)) &&
      priceMatches && (tab === "All Brands" || (tab === "Featured" ? Boolean(brand.image) : brand.badge === tab));
  }

  const compareNames = (a: Brand, b: Brand) => normalise(a.name).localeCompare(normalise(b.name)) * (sort === "Z–A" ? -1 : 1);
  const hasFilters = Boolean(query || letter || type || region || price || sustainable || followingOnly || tab !== "All Brands");
  const results = BRANDS.filter(matches).sort(compareNames);
  const groups = Array.from(new Set(results.map((brand) => normalise(brand.name)[0].toUpperCase())));
  const featured = FEATURED_BRANDS.filter(matches).sort((a, b) => sort === "Featured" ? 0 : compareNames(a, b));
  const showFullDirectory = expanded || hasFilters || sort !== "Featured";

  function reset() {
    setQuery(""); setTab("All Brands"); setLetter(""); setType(""); setRegion("");
    setPrice(""); setSustainable(""); setFollowingOnly(false); setExpanded(false); setSort("Featured");
  }

  function toggleFollow(name: string) {
    const next = following.includes(name) ? following.filter((item) => item !== name) : [...following, name];
    try {
      window.localStorage.setItem(FOLLOW_KEY, JSON.stringify(next));
      setTemporaryFollowing(null);
      window.dispatchEvent(new Event(FOLLOW_EVENT));
    } catch { setTemporaryFollowing(next); }
  }

  function renderColumns(columns: string[][], className: string) {
    return <div className={`gap-x-7 ${className}`}>
      {columns.map((initials, index) => <div key={index} className="brand-directory-column">
        {initials.map((initial) => <section key={initial} aria-label={`Brands starting with ${initial}`} className="mb-5 grid grid-cols-[32px_minmax(0,1fr)] gap-x-2 last:mb-0 sm:block">
          <h3 className="pt-2 text-[14px] font-semibold sm:mb-1.5 sm:pt-0">{initial}</h3>
          <ul className="min-w-0">{results.filter((brand) => normalise(brand.name)[0].toUpperCase() === initial).map((brand) => <li key={brand.name}>
            <button type="button" onClick={() => setQuery(brand.name)} className="flex min-h-9 w-full cursor-pointer items-center justify-between gap-2 border-b border-line/60 py-1.5 text-left text-[12px] text-ink-soft hover:text-rose-gold-dark sm:min-h-0 sm:border-0 sm:py-0.5">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">{brand.name}{brand.badge && <span className="rounded bg-[#f9dfb6] px-1.5 py-0.5 text-[9px] text-ink">{brand.badge}</span>}</span>
              <ChevronRightIcon width={12} height={12} className="shrink-0 text-muted sm:hidden" />
            </button>
          </li>)}</ul>
        </section>)}
      </div>)}
    </div>;
  }

  return <main className="min-w-0 flex-1 bg-[#fdfcf9]">
    <section aria-labelledby="brands-title" className="relative isolate overflow-hidden bg-[#ede5dc]">
      <div className="absolute inset-y-0 right-0 -z-20 w-[62%] sm:w-[58%] lg:w-[55%]">
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktopHeroProps.srcSet} sizes={desktopHeroProps.sizes} />
          <Image src={heroImage} alt="The diamond rings shown in the SIDRA brand edit" fill fetchPriority="high" sizes="(min-width: 1024px) 55vw, 62vw" className="object-cover object-[65%_center]" />
        </picture>
      </div>
      <div className="brand-hero-blend pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#f3eee7] via-[#f3eee7]/85 to-transparent sm:via-[#f3eee7]/50" />
      <div className="relative mx-auto min-h-[240px] max-w-[1440px] px-4 pt-5 pb-6 sm:min-h-[280px] sm:px-6 lg:min-h-[315px] lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-5 hidden items-center gap-1 text-[11px] text-ink-soft sm:flex"><Link href="/" className="hover:underline">Home</Link><ChevronRightIcon width={12} height={12} /><span aria-current="page">Brands</span></nav>
        <h1 id="brands-title" className="font-serif text-[30px] leading-tight sm:text-[38px] lg:text-[52px]">Jewellery Brands</h1>
        <p className="mt-2 max-w-[265px] text-[12px] leading-relaxed text-ink-soft sm:max-w-[340px] sm:text-[13px] lg:max-w-[540px] lg:text-[16px]">Discover exceptional jewellery houses, independent<br className="hidden lg:block" /> designers and emerging names from around the world.</p>
        <div role="search" className="relative mt-5 max-w-[540px] sm:max-w-[410px] lg:max-w-[540px]">
          <SearchIcon width={17} height={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
          <input aria-label="Search brands or designers" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search brands or designers..." className="h-11 w-full rounded-full border border-line bg-white pr-4 pl-11 text-[12px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sand-400 lg:h-12" />
        </div>
        <p className="absolute top-[21%] right-[6.3%] hidden text-[12px] leading-[1.55] font-normal tracking-[0.16em] text-ink-soft uppercase lg:block xl:text-[13px]">
          Great<br />brands<br />brighter<br />stories
          <span aria-hidden="true" className="mt-3 block h-px w-12 bg-ink-soft/60" />
        </p>
      </div>
    </section>

    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <nav aria-label="Brand categories" className="flex justify-between gap-3 border-b border-line sm:justify-start sm:gap-8">
        {TABS.map((item) => <button key={item} type="button" aria-pressed={tab === item} onClick={() => setTab(item)} className={`relative min-h-12 cursor-pointer whitespace-nowrap py-3 text-[12px] sm:text-[13px] ${tab === item ? "font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ink" : "text-ink-soft hover:text-rose-gold-dark"}`}>{item === "All Brands" ? <><span className="sm:hidden">All</span><span className="hidden sm:inline">All Brands</span></> : item}</button>)}
      </nav>
      <div aria-label="Filter by first letter" className="flex w-full gap-1 overflow-x-auto py-3 [scrollbar-width:none] sm:gap-0 lg:justify-between">
        {ALPHABET.map((initial) => <button key={initial} type="button" aria-pressed={letter === initial} onClick={() => setLetter(letter === initial ? "" : initial)} className={`grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-[11px] sm:size-9 ${letter === initial ? "bg-ink text-white" : "hover:bg-cream-200"}`}>{initial}</button>)}
        <button type="button" aria-label="Show all letters" onClick={() => setLetter("")} className="grid size-8 shrink-0 cursor-pointer place-items-center text-[11px] sm:size-9">#</button>
      </div>
      <div className="flex flex-wrap items-center gap-2 pb-5 sm:gap-3">
        <SelectFilter label="Type" value={type} onChange={setType} options={["Rings", "Necklaces", "Earrings", "Bracelets"]} className="flex-1 sm:hidden" />
        <SelectFilter label="Jewellery Type" value={type} onChange={setType} options={["Rings", "Necklaces", "Earrings", "Bracelets"]} className="hidden sm:block sm:w-36" />
        <SelectFilter label="Region" value={region} onChange={setRegion} options={["Europe", "Middle East", "Asia", "Americas"]} className="flex-1 sm:flex-none sm:w-28" />
        <SelectFilter label="Price Range" value={price} onChange={setPrice} options={PRICE_OPTIONS} className="hidden lg:block lg:w-40" />
        <SelectFilter label="Sustainable" value={sustainable} onChange={setSustainable} options={["Sustainable brands"]} className="hidden lg:block lg:w-36" />
        <button type="button" aria-expanded={moreFilters} aria-controls="brand-more-filters" onClick={() => setMoreFilters(!moreFilters)} className="inline-flex h-9 flex-1 cursor-pointer items-center justify-between gap-2 rounded-md border border-line bg-white px-3 text-[12px] sm:flex-none"><span className="sm:hidden">Filters</span><span className="hidden sm:inline">More Filters</span><ChevronDownIcon width={12} height={12} /></button>
        <div className="ml-auto hidden items-center gap-2 lg:flex"><span className="text-[12px] text-muted">Sort by:</span><SelectFilter label="Sort brands" value={sort} onChange={setSort} options={SORT_OPTIONS} className="w-28" /></div>
      </div>
      <div id="brand-more-filters" hidden={!moreFilters} className="mb-5 flex flex-wrap items-center gap-5 rounded-lg border border-line bg-cream-100 p-4">
        <SelectFilter label="Price Range" value={price} onChange={setPrice} options={PRICE_OPTIONS} className="w-full sm:w-44 lg:hidden" />
        <SelectFilter label="Sort brands" value={sort} onChange={setSort} options={SORT_OPTIONS} className="w-full sm:w-36 lg:hidden" />
        <SelectFilter label="Sustainable" value={sustainable} onChange={setSustainable} options={["Sustainable brands"]} className="w-full sm:w-44 lg:hidden" />
        <label className="inline-flex cursor-pointer items-center gap-2 text-[12px]"><input type="checkbox" checked={followingOnly} onChange={(event) => setFollowingOnly(event.target.checked)} className="size-4 accent-ink" />Brands I follow ({following.length})</label>
      </div>
      {hasFilters && <div className="mb-5 flex items-center justify-between gap-3"><p role="status" className="text-[12px] text-muted">{results.length} brands found</p><button type="button" onClick={reset} className="cursor-pointer text-[12px] underline underline-offset-4">Clear filters</button></div>}

      {featured.length > 0 && <section aria-labelledby="featured-title">
        <div className="mb-4 flex items-center justify-between gap-4"><h2 id="featured-title" className="font-serif text-[23px] sm:text-[26px]">Featured Brands</h2><a href="#all-brands" onClick={() => { reset(); setExpanded(true); }} className="inline-flex items-center gap-2 text-[12px] hover:text-rose-gold-dark">View all <ArrowRightIcon width={13} height={13} /></a></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">
          {featured.map((brand) => <article key={brand.name} className="min-w-0 overflow-hidden rounded-sm bg-[#f8f6f1] pb-3 text-center">
            <div className="relative aspect-[5/4] overflow-hidden bg-cream-200"><Image src={brand.image!} alt={`${brand.name} jewellery`} fill sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 16vw" className="object-cover" /></div>
            <h3 className="mt-3 px-1 font-serif text-[18px] sm:text-[20px]">{brand.name}</h3>
            <p className="mx-auto mt-2 hidden min-h-10 max-w-[180px] px-3 text-[11px] leading-relaxed lg:block">{brand.description}</p>
            <button type="button" aria-pressed={following.includes(brand.name)} aria-label={`${following.includes(brand.name) ? "Unfollow" : "Follow"} ${brand.name}`} onClick={() => toggleFollow(brand.name)} className={`mx-auto mt-3 inline-flex min-h-9 min-w-24 cursor-pointer items-center justify-center gap-1.5 rounded-md border px-3 text-[12px] ${following.includes(brand.name) ? "border-ink bg-ink text-white" : "border-muted/40 bg-white hover:border-ink"}`}>{following.includes(brand.name) ? "Following" : "Follow"}<HeartIcon width={15} height={15} fill={following.includes(brand.name) ? "currentColor" : "none"} /></button>
          </article>)}
        </div>
      </section>}

      <section id="all-brands" aria-labelledby="directory-title" className="mt-7 scroll-mt-24 sm:mt-8">
        <div className="mb-4 flex items-center justify-between gap-3"><h2 id="directory-title" className="font-serif text-[23px] sm:text-[26px]">All Brands (A – Z)</h2><p role="status" className="text-[11px] text-muted">{hasFilters ? `${results.length} brands` : DESIGN_BRAND_COUNT_LABEL}</p></div>
        {results.length ? <>
          {renderColumns(showFullDirectory ? [groups] : [["A", "B", "C"]], "grid grid-cols-1 sm:hidden")}
          {renderColumns(showFullDirectory ? splitColumns(groups, 2) : [["A", "B", "C"], ["D", "E", "F"]], "hidden grid-cols-2 sm:grid lg:hidden")}
          {renderColumns(showFullDirectory ? splitColumns(groups, 5) : DESIGN_COLUMNS, "hidden grid-cols-5 lg:grid")}
        </> : <div className="rounded-lg border border-line bg-cream-100 px-5 py-10 text-center"><h3 className="font-serif text-xl">No brands found</h3><p className="mt-2 text-[12px] text-muted">Try a different search or clear your filters.</p><button type="button" onClick={reset} className="mt-4 cursor-pointer text-[12px] underline">Show all brands</button></div>}
        {!showFullDirectory && <div className="mt-6 mb-6 flex justify-center"><button type="button" onClick={() => setExpanded(true)} className="inline-flex min-h-10 w-full max-w-[300px] cursor-pointer items-center justify-center gap-3 rounded-full border border-line bg-white px-6 text-[12px] hover:border-sand-400">Load More Brands <ArrowRightIcon width={14} height={14} className="rotate-90" /></button></div>}
      </section>

      <section aria-labelledby="emerging-title" className="relative isolate -mx-4 mt-6 overflow-hidden bg-[#e5d6c5] sm:-mx-6 lg:mx-0 lg:mb-5">
        <div className="absolute inset-y-0 right-0 -z-20 w-[58%] lg:w-[55%]"><Image src={emergingImage} alt="Emerging designers' rings from the SIDRA edit" fill sizes="(min-width: 1024px) 55vw, 58vw" className="object-cover object-[40%_center] lg:object-center" /></div>
        <div className="brand-emerging-blend pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#eee3d6] via-[#eee3d6]/55 to-transparent" />
        <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-6"><h2 id="emerging-title" className="font-serif text-[18px] leading-tight sm:text-[22px] lg:max-w-[310px] lg:text-[30px]">Discover<br className="hidden lg:block" /> Emerging Designers</h2><p className="mt-2 hidden max-w-[320px] text-[12px] leading-relaxed lg:block">Fresh perspectives. Extraordinary craftsmanship.<br />The next generation of jewellery.</p><a href="#all-brands" onClick={() => { reset(); setTab("New"); }} className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-sm bg-ink px-4 text-[11px] font-medium text-white hover:bg-ink-soft">Explore New Names <ArrowRightIcon width={13} height={13} /></a></div>
        <p className="absolute top-[16%] right-[4%] hidden text-[11px] leading-[1.55] tracking-[0.16em] uppercase lg:block xl:text-[12px]">Small<br />creators<br />a brighter<br />tomorrow<span className="mt-3 block h-px w-12 bg-ink" /></p>
      </section>
    </div>

    <section aria-label="Why choose Sidra" className="border-t border-line">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-4 gap-2 px-4 py-6 sm:gap-5 sm:px-6 lg:grid-cols-5 lg:px-10">
        {TRUST.map(({ icon: Icon, mobileIcon: MobileIcon, title, text }, index) => <li key={title} className={`min-w-0 flex-col items-center gap-2 text-center lg:flex-row lg:gap-3 lg:text-left ${index === 4 ? "hidden lg:flex" : "flex"}`}><MobileIcon width={26} height={26} className="shrink-0 lg:hidden" /><Icon width={25} height={25} className="hidden shrink-0 lg:block" /><div><p className="max-w-[90px] text-[10px] leading-snug sm:text-[11px] lg:max-w-none">{title}</p><p className="mt-0.5 hidden text-[10px] text-muted lg:block">{text}</p></div></li>)}
      </ul>
    </section>
  </main>
}
