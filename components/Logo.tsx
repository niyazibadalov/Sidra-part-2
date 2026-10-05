import Link from "next/link";

export function Logo({ className = "", hideMobileTagline = false }: { className?: string; hideMobileTagline?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="SIDRA home"
      className={`inline-flex cursor-pointer flex-col items-center leading-none ${className}`}
    >
      <span className="font-serif text-[26px] tracking-[0.14em] text-ink sm:text-[28px]">
        SIDRA
      </span>
      <span className={`${hideMobileTagline ? "hidden sm:block" : ""} mt-1 text-[7.5px] font-medium tracking-[0.28em] text-muted uppercase`}>
        Jewellery lives further
      </span>
    </Link>
  );
}
