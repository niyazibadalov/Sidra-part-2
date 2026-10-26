import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRightIcon } from "@/components/Icons";

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  crumbs: Crumb[];
  title: string;
  tagline?: string;
  description?: string;
  image: StaticImageData;
  /** Tailwind object-position class, e.g. "object-right" */
  imagePosition?: string;
  children?: ReactNode;
};

export function PageHero({
  crumbs,
  title,
  tagline,
  description,
  image,
  imagePosition = "object-right",
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream-100">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`-z-20 object-cover ${imagePosition}`}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-cream-100 from-30% via-cream-100/75 to-transparent sm:via-cream-100/55 lg:via-cream-100/25"
      />

      <div className="mx-auto max-w-360 px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-10">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-[11.5px] text-ink-soft lg:mb-6 lg:text-[12px]">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRightIcon width={11} height={11} className="text-muted" />}
              {c.href ? (
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="max-w-[58%] sm:max-w-[60%] lg:max-w-2xl">
          <h1 className="font-serif text-[32px] leading-[1.1] text-ink sm:text-5xl lg:text-[56px]">
            {title}
          </h1>
          {tagline && (
            <p className="mt-2 text-[15px] text-ink sm:text-lg lg:mt-3 lg:text-xl">{tagline}</p>
          )}
          {description && (
            <p className="mt-2 text-[12px] leading-relaxed text-ink-soft sm:text-[13.5px] lg:mt-3 lg:text-[15px]">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
