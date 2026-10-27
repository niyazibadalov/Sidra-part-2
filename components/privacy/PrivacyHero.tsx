import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "../Icons";
import heroImage from "@/app/images/jewelleryHero.png";

export function PrivacyHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream-100">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[78%_center] lg:object-right"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-cream-100 from-30% via-cream-100/65 to-transparent sm:via-cream-100/40 lg:via-cream-100/5"
      />

      <div className="mx-auto max-w-360 px-4 pt-3 pb-8 sm:px-6 sm:pb-10 lg:px-10 lg:pt-6 lg:pb-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11.5px] text-ink-soft lg:text-[12.5px]">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRightIcon width={11} height={11} className="text-muted" />
          <span aria-current="page">Privacy Policy</span>
        </nav>

        <div className="mt-8 max-w-[62%] sm:mt-9 sm:max-w-[60%] lg:mt-10 lg:max-w-160">
          <h1 className="font-serif text-[30px] leading-[1.08] text-ink min-[400px]:text-[34px] sm:text-5xl lg:text-[56px]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-[12px] leading-snug text-ink-soft sm:text-[14px] lg:mt-3 lg:text-[16px]">
            How SIDRA collects, uses and protects your information.
          </p>
          <p className="mt-3 text-[11px] text-ink-soft sm:text-[12px] lg:mt-5 lg:text-[13px]">
            Last updated: September 2026
          </p>
        </div>
      </div>
    </section>
  );
}
