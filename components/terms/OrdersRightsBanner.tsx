import Link from "next/link";

export function OrdersRightsBanner() {
  return (
    <section
      aria-labelledby="orders-rights"
      className="flex flex-col gap-4 rounded-xl border border-line bg-sand-200/80 p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-7"
    >
      <div>
        <h2 id="orders-rights" className="font-serif text-[20px] text-ink lg:text-[22px]">
          Your Orders &amp; Rights
        </h2>
        <p className="mt-1 max-w-md text-[12px] leading-snug text-ink-soft lg:max-w-none lg:text-[12.5px]">
          Manage your orders, track deliveries, start a return or get help from our support team.
        </p>
      </div>
      <div className="flex flex-col gap-2.5 sm:flex-row lg:shrink-0 lg:gap-3">
        <Link
          href="/account/orders"
          className="flex h-11 items-center justify-center rounded-md bg-ink px-8 text-[13px] font-medium text-white transition-colors hover:bg-ink-soft sm:flex-1 lg:flex-none lg:px-12"
        >
          Manage Orders
        </Link>
        <Link
          href="/help"
          className="flex h-11 items-center justify-center rounded-md border border-ink/50 bg-white/70 px-8 text-[13px] text-ink transition-colors hover:bg-white sm:flex-1 lg:flex-none lg:px-12"
        >
          Contact Support
        </Link>
      </div>
    </section>
  );
}
