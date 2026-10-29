import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "../Icons";
import heroImage from "@/app/images/lifetimeHero.png";

export function CookieHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream-100">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[80%_center] lg:object-right"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-cream-100 from-30% via-cream-100/70 to-transparent sm:via-cream-100/45 lg:via-cream-100/5"
      />

      <p
        aria-hidden
        className="absolute top-[34%] right-[8%] hidden w-[230px] font-serif text-[19px] leading-snug text-ink xl:block"
      >
        A more personal and seamless experience, always in your control.
      </p>

      <div className="mx-auto max-w-[1440px] px-4 pt-3 pb-6 sm:px-6 sm:pb-8 lg:px-10 lg:pt-5 lg:pb-9">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11.5px] text-ink-soft lg:text-[12.5px]">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRightIcon width={11} height={11} className="text-muted" />
          <span aria-current="page">Cookie Policy</span>
        </nav>

        <div className="mt-5 max-w-[66%] sm:mt-6 sm:max-w-[60%] lg:mt-8 lg:max-w-[640px]">
          <p className="text-[10px] font-medium tracking-[0.3em] text-ink-soft uppercase sm:text-[11px]">
            Trust &amp; Transparency
          </p>
          <h1 className="mt-2 font-serif text-[30px] leading-[1.08] text-ink min-[400px]:text-[34px] sm:text-5xl lg:mt-3 lg:text-[56px]">
            Cookie Policy
          </h1>
          <p className="mt-2 text-[12px] leading-snug text-ink-soft sm:text-[14px] lg:mt-3 lg:text-[16px]">
            How SIDRA uses cookies and similar technologies.
          </p>
          <p className="mt-2 text-[11px] text-ink-soft sm:text-[12px] lg:text-[13px]">Last updated: September 2026</p>
        </div>
      </div>
    </section>
  );
}
