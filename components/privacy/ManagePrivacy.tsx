import Link from "next/link";
import { ArrowRightIcon } from "../Icons";

export function ManagePrivacy() {
  return (
    <section aria-labelledby="manage-privacy" className="rounded-xl border border-line bg-cream-50 p-4 lg:p-5">
      <h2 id="manage-privacy" className="font-serif text-[18px] text-ink">
        Manage Privacy
      </h2>
      <p className="mt-0.5 text-[11.5px] text-muted sm:text-[12px]">
        You can manage your preferences and rights at any time.
      </p>

      <div className="mt-3 flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-3">
        <Link
          href="/cookies"
          className="flex h-10 items-center justify-center rounded-md bg-ink px-6 text-[12.5px] font-medium text-white transition-colors hover:bg-ink-soft lg:h-9"
        >
          Manage Cookie Preferences
        </Link>
        <Link
          href="/account/preferences"
          className="flex h-10 items-center justify-center rounded-md border border-ink/50 bg-white/70 px-6 text-[12.5px] text-ink transition-colors hover:bg-white lg:h-9"
        >
          Manage Marketing Preferences
        </Link>
        <Link
          href="mailto:privacy@sidra.to?subject=Privacy%20request"
          className="mt-1 inline-flex items-center justify-center gap-1.5 text-[12px] text-ink underline underline-offset-2 lg:mt-0 lg:ml-2"
        >
          Submit a Privacy Request <ArrowRightIcon width={13} height={13} />
        </Link>
      </div>
    </section>
  );
}
