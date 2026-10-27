import Image from "next/image";
import Link from "next/link";
import promoImage from "@/app/images/img1.png";

export function PrivacyPromo({ className = "" }: { className?: string }) {
  return (
    <aside className={`relative overflow-hidden rounded-xl border border-line bg-[#f1e5d7] ${className}`}>
      <div className="flex xl:block">
        <div className="relative w-[34%] shrink-0 sm:w-[24%] xl:absolute xl:top-0 xl:right-0 xl:h-24 xl:w-[40%]">
          <Image src={promoImage} alt="" fill sizes="(min-width: 1280px) 130px, 140px" className="object-cover" />
          <div aria-hidden className="absolute inset-0 hidden bg-linear-to-r from-[#f1e5d7] to-transparent xl:block" />
        </div>
        <div className="flex-1 p-4">
          <h3 className="font-serif text-[16px] text-ink">Your data. Your choices.</h3>
          <p className="mt-1 text-[11.5px] leading-snug text-ink-soft xl:max-w-[58%]">
            Take control of your personal information and privacy settings.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Link
              href="mailto:privacy@sidra.to?subject=Privacy%20request"
              className="flex h-9 flex-1 items-center justify-center rounded-md bg-ink px-3 text-[11.5px] font-medium text-white transition-colors hover:bg-ink-soft"
            >
              Submit a Privacy Request
            </Link>
            <Link
              href="mailto:privacy@sidra.to"
              className="flex h-9 flex-1 items-center justify-center rounded-md border border-ink/50 bg-white/70 px-3 text-[11.5px] text-ink transition-colors hover:bg-white"
            >
              Contact Privacy Team
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
