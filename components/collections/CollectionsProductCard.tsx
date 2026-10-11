"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "../Icons";
import { RingProduct } from "./data";

type ProductCardProps = {
  product: RingProduct;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
};

export function CollectionsProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col transition-all duration-300">
      {/* Image container frame */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-line/70 bg-[#f9f5f0] transition-all duration-300 group-hover:border-sand-400 group-hover:shadow-md">
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 rounded-md px-2 py-0.5 text-[10.5px] font-semibold tracking-wide ${
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

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 grid size-8 cursor-pointer place-items-center rounded-full bg-white/80 text-ink-soft backdrop-blur-xs transition-colors hover:bg-white hover:text-ink"
        >
          <HeartIcon
            width={16}
            height={16}
            className={`transition-transform active:scale-125 ${
              isWishlisted ? "fill-[#b74134] text-[#b74134]" : ""
            }`}
          />
        </button>

        {/* Ring Image */}
        <Link href={`/category/${product.id}`} className="relative block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
            className="object-contain transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* Info details */}
      <div className="mt-3 flex flex-col">
        <Link href={`/category/${product.id}`} className="group-hover:text-rose-gold-dark">
          <h3 className="text-[13.5px] font-medium leading-snug text-ink transition-colors sm:text-[14px]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-[11.5px] text-muted sm:text-[12px]">
          {product.materialDetail}
        </p>

        <div className="mt-1.5 flex items-baseline justify-between">
          <span className="text-[14px] font-semibold text-ink sm:text-[15px]">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-[11.5px] text-muted">
            {product.variants} variants
          </span>
        </div>
      </div>
    </div>
  );
}
