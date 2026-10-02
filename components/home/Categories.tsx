import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "../Icons";

import img1 from "@/app/images/img1.png";
import img2 from "@/app/images/img2.png";
import img3 from "@/app/images/img3.png";
import img4 from "@/app/images/img4.png";
import img5 from "@/app/images/img5.png";
import img6 from "@/app/images/img6.png";
import img7 from "@/app/images/img7.png";
import img8 from "@/app/images/img8.png";
import img9 from "@/app/images/img9.png";

type CategoryItem = {
  name: string;
  href: string;
  image: StaticImageData;
};

const CATEGORIES: CategoryItem[] = [
  { name: "Rings", href: "/category/rings", image: img1 },
  { name: "Necklaces", href: "/category/necklaces", image: img2 },
  { name: "Earrings", href: "/category/earrings", image: img3 },
  { name: "Bracelets", href: "/category/bracelets", image: img4 },
  { name: "Pendants", href: "/category/pendants", image: img5 },
  { name: "Wedding & Engagement", href: "/category/wedding-engagement", image: img6 },
  { name: "Men's Jewellery", href: "/category/mens-jewellery", image: img7 },
  { name: "Sets", href: "/category/sets", image: img8 },
  { name: "Fine Jewellery", href: "/category/fine-jewellery", image: img9 },
];

export function ShopByCategory() {
  return (
    <section aria-labelledby="shop-by-category-title" className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-8 flex items-baseline justify-between sm:mb-10">
          <h2
            id="shop-by-category-title"
            className="font-serif text-2xl text-ink sm:text-[32px]"
          >
            Shop by Category
          </h2>
          <Link
            href="/categories"
            className="group flex items-center gap-1 text-[12.5px] font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <span>View All Categories</span>
            <ArrowRightIcon
              width={14}
              height={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* 9 Circular Category Items */}
        <div className="grid grid-cols-3 gap-3.5 sm:grid-cols-5 md:gap-5 lg:grid-cols-9 lg:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center text-center"
            >
              {/* Circular image frame */}
              <div className="relative aspect-square w-full max-w-[124px] overflow-hidden rounded-full border border-line/60 bg-[#efe4d9] p-2 shadow-xs transition-all duration-300 group-hover:-translate-y-1 group-hover:border-sand-400 group-hover:shadow-md">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 11vw"
                  className="object-contain p-1 transition-transform duration-300 group-hover:scale-108"
                />
              </div>

              {/* Title label */}
              <span className="mt-2.5 text-[11.5px] font-medium leading-snug text-ink transition-colors group-hover:text-rose-gold-dark sm:text-[12.5px]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
