"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from "../Icons";

import img1 from "@/app/images/img1.png";
import img2 from "@/app/images/img2.png";
import img3 from "@/app/images/img3.png";
import img4 from "@/app/images/img4.png";
import img5 from "@/app/images/img5.png";
import img6 from "@/app/images/img6.png";
import img7 from "@/app/images/img7.png";
import img8 from "@/app/images/img8.png";
import img9 from "@/app/images/img9.png";

type Product = {
  id: string;
  name: string;
  category: string;
  material: string;
  price: string;
  variants: string;
  badge?: "Bestseller" | "New" | "Trending";
  image: StaticImageData;
};

const PRODUCTS: Product[] = [
  {
    id: "solitaire-ring",
    name: "Solitaire Diamond Ring",
    category: "Rings",
    material: "18K Gold · Diamond",
    price: "$1,250",
    variants: "3 variants",
    badge: "Bestseller",
    image: img1,
  },
  {
    id: "clover-necklace",
    name: "Clover Necklace",
    category: "Necklaces",
    material: "18K Gold",
    price: "$980",
    variants: "2 variants",
    badge: "New",
    image: img2,
  },
  {
    id: "gold-hoop-earrings",
    name: "Gold Hoop Earrings",
    category: "Earrings",
    material: "18K Gold",
    price: "$1,420",
    variants: "2 variants",
    image: img3,
  },
  {
    id: "tennis-bracelet",
    name: "Classic Tennis Bracelet",
    category: "Bracelets",
    material: "18K Gold · Diamonds",
    price: "$2,300",
    variants: "2 variants",
    badge: "Trending",
    image: img4,
  },
  {
    id: "heart-diamond-pendant",
    name: "Heart Diamond Pendant",
    category: "Pendants",
    material: "18K Gold",
    price: "$860",
    variants: "3 variants",
    image: img5,
  },
  {
    id: "wedding-ring-set",
    name: "Eternity Wedding Band",
    category: "Rings",
    material: "Platinum · Diamonds",
    price: "$2,100",
    variants: "4 variants",
    image: img6,
  },
  {
    id: "onyx-signet-ring",
    name: "Black Onyx Signet Ring",
    category: "Rings",
    material: "18K Yellow Gold",
    price: "$1,350",
    variants: "2 variants",
    image: img7,
  },
  {
    id: "bridal-jewellery-set",
    name: "Lumina Bridal Suite",
    category: "Sets",
    material: "18K White Gold",
    price: "$3,450",
    variants: "2 variants",
    image: img8,
  },
  {
    id: "statement-cuff",
    name: "Pavé Diamond Cuff",
    category: "Bracelets",
    material: "18K Rose Gold",
    price: "$2,890",
    variants: "3 variants",
    badge: "Bestseller",
    image: img9,
  },
];

const TABS = ["All", "Rings", "Necklaces", "Earrings", "Bracelets", "Pendants", "Sets"];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("All");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const filtered = activeTab === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeTab);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 4
    );
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0 });
    updateScrollState();
  }, [activeTab]);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="featured-products-title" className="pb-12 sm:py-5">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header & Tabs */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <h2
              id="featured-products-title"
              className="font-serif text-2xl text-ink sm:text-[32px]"
            >
              Featured Products
            </h2>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-6 overflow-x-auto pb-1 sm:gap-7">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative cursor-pointer pb-1 text-[13px] font-medium transition-colors sm:text-[14px] ${
                      isActive
                        ? "font-semibold text-ink after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:bg-ink"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            href="/category"
            className="group flex cursor-pointer items-center gap-1 self-start text-[12.5px] font-medium text-ink-soft transition-colors hover:text-ink sm:self-auto"
          >
            <span>View All</span>
            <ArrowRightIcon
              width={14}
              height={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Products Carousel */}
        <div className="relative mt-8">
          <div
            ref={trackRef}
            onScroll={updateScrollState}
            className="scrollbar-none grid grid-flow-col auto-cols-[calc((100%-1.5rem)/2.2)] gap-3.5 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:auto-cols-[calc((100%-3rem)/3.3)] md:auto-cols-[calc((100%-4rem)/4)] md:gap-5 lg:auto-cols-[calc((100%-5rem)/5)]"
          >
          {filtered.map((product) => {
            const isLiked = !!wishlist[product.id];
            return (
              <div
                key={product.id}
                className="group relative flex snap-start flex-col transition-all duration-300"
              >
                {/* Product Image Frame: Perfectly centered, never cropped */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#efe4d9] sm:aspect-[4/3.1] sm:rounded-2xl">
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-2.5 left-2.5 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide uppercase shadow-2xs sm:top-3 sm:left-3 ${
                        product.badge === "Bestseller"
                          ? "bg-[#faf0e6] text-rose-gold-dark ring-1 ring-rose-gold/30"
                          : product.badge === "New"
                            ? "bg-cream-200 text-ink-soft"
                            : "bg-sand-200 text-ink"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    className="absolute top-3 right-3 z-10 grid size-8 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:text-rose-gold"
                  >
                    <HeartIcon
                      width={18}
                      height={18}
                      className={isLiked ? "fill-rose-gold text-rose-gold" : ""}
                    />
                  </button>

                  <Link href="/category" className="absolute inset-0 block cursor-pointer">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                      className="object-contain p-1.5 sm:p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Product Info below the image */}
                <div className="mt-3.5 flex flex-1 flex-col">
                  <Link href="/category" className="cursor-pointer">
                    <h3 className="line-clamp-1 text-[13.5px] font-medium text-ink transition-colors group-hover:text-rose-gold-dark sm:text-[14.5px]">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="mt-0.5 text-[12px] text-muted">
                    {product.material}
                  </p>

                  <div className="mt-2.5 flex items-baseline justify-between">
                    <span className="text-[15px] font-semibold text-ink sm:text-[16px]">
                      {product.price}
                    </span>
                    <span className="text-[11.5px] text-muted">
                      {product.variants}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          </div>

          {/* Carousel Navigation */}
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous products"
            className={`absolute top-[38%] left-0 z-20 grid size-10 -translate-x-1/3 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-white/95 text-ink shadow-md transition-all duration-300 hover:bg-cream-100 sm:size-11 ${
              canScrollPrev ? "opacity-100" : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronLeftIcon width={18} height={18} />
          </button>

          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Next products"
            className={`absolute top-[38%] right-0 z-20 grid size-10 translate-x-1/3 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-white/95 text-ink shadow-md transition-all duration-300 hover:bg-cream-100 sm:size-11 ${
              canScrollNext ? "opacity-100" : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronRightIcon width={18} height={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
