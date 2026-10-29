import Link from "next/link";
import { CloseIcon, LeafIcon } from "../Icons";

type CookieBannerProps = {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onManage: () => void;
  onDismiss: () => void;
};

export function CookieBanner({ onAcceptAll, onRejectNonEssential, onManage, onDismiss }: CookieBannerProps) {
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[90] sm:p-3 lg:p-4"
    >
      <div className="relative mx-auto max-w-[1360px] rounded-t-2xl border border-line bg-white px-4 pt-3 pb-5 shadow-[0_-8px_40px_rgba(22,20,18,0.16)] sm:rounded-xl sm:px-5 sm:py-4 lg:flex lg:items-center lg:gap-5 lg:py-4">
        {/* mobile grab handle */}
        <span aria-hidden className="mx-auto mb-3 block h-1 w-10 rounded-full bg-sand-300 sm:hidden" />

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Close cookie banner"
          className="absolute top-3 right-3 hidden size-7 cursor-pointer place-items-center rounded-full text-ink-soft hover:bg-cream-200 sm:grid"
        >
          <CloseIcon width={15} height={15} />
        </button>

        <div className="flex gap-3.5 sm:pr-8 lg:flex-1 lg:items-center lg:pr-0">
          <span className="hidden size-11 shrink-0 place-items-center rounded-full bg-cream-200 text-rose-gold-dark sm:grid">
            <LeafIcon width={20} height={20} />
          </span>
          <div className="min-w-0">
            <h2 className="font-serif text-[18px] leading-tight text-ink sm:text-[17px]">Your Privacy, Your Choice.</h2>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft sm:text-[12.5px]">
              We use essential cookies to make SIDRA work properly, and with your permission, we also use preference,
              analytics and marketing cookies to improve your experience and show you relevant content.
            </p>
            <Link href="/cookies" className="mt-1 inline-block text-[12px] text-ink underline underline-offset-2">
              Learn more in our Cookie Policy.
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2.5 sm:grid sm:grid-cols-2 lg:mt-0 lg:w-[400px] lg:shrink-0 lg:pr-9">
          <button
            type="button"
            onClick={onAcceptAll}
            className="h-11 cursor-pointer rounded-md bg-ink px-4 text-[13px] font-medium text-white transition-colors hover:bg-ink-soft"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="h-11 cursor-pointer rounded-md border border-ink/60 bg-white px-4 text-[13px] text-ink transition-colors hover:bg-cream-200"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={onManage}
            className="cursor-pointer py-1 text-center text-[12.5px] text-ink underline underline-offset-2 sm:col-span-2"
          >
            Manage Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
