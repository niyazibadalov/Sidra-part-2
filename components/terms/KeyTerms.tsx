import { ArrowRightIcon, InfoIcon } from "../Icons";
import { KEY_TERMS_ID } from "./termsConstants";
import { KEY_TERMS } from "./termsData";

export function KeyTerms() {
  return (
    <section id={KEY_TERMS_ID} aria-labelledby="key-terms-title" className="scroll-mt-28">
      <h2 id="key-terms-title" className="font-serif text-[24px] text-ink sm:text-[26px] lg:text-[28px]">
        Key Terms at a Glance
      </h2>
      <p className="mt-0.5 text-[12.5px] text-muted sm:text-[13px]">A quick overview of what you need to know.</p>

      <ul className="mt-3 sm:mt-4 sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {KEY_TERMS.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="grid grid-cols-[auto_1fr] items-center gap-x-3.5 gap-y-0.5 border-b border-line py-3.5 last:border-b-0 sm:rounded-xl sm:border sm:bg-cream-50 sm:p-4 sm:last:border-b lg:flex lg:flex-col lg:gap-2 lg:p-5 lg:text-center"
          >
            <Icon width={30} height={30} strokeWidth={1.3} className="row-span-2 text-ink sm:row-span-1 sm:h-7 sm:w-7 lg:h-[34px] lg:w-[34px]" />
            <h3 className="font-serif text-[15px] text-ink sm:text-[14.5px] lg:text-[16px]">{title}</h3>
            <p className="col-start-2 text-[12px] leading-snug text-muted sm:col-span-2 sm:col-start-1 sm:mt-1 lg:mt-0">{text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-start gap-3 rounded-xl border border-line bg-[#f6ece0] px-4 py-3.5 sm:mt-4 lg:items-center lg:py-4">
        <InfoIcon width={20} height={20} className="mt-0.5 shrink-0 text-ink lg:mt-0" />
        <p className="flex-1 text-[11.5px] leading-snug text-ink-soft sm:text-[12px] lg:text-[12.5px]">
          Seller identity and status (professional trader or private seller) is shown on each listing. Your consumer rights may depend on the seller&apos;s status and applicable local laws.
        </p>
        <a
          href="#seller-status"
          className="hidden shrink-0 items-center gap-1.5 text-[12px] text-ink underline underline-offset-2 sm:flex"
        >
          Learn more <ArrowRightIcon width={13} height={13} />
        </a>
      </div>
      <a
        href="#seller-status"
        className="mt-2 inline-flex items-center gap-1.5 pl-8 text-[12px] text-ink underline underline-offset-2 sm:hidden"
      >
        Learn more <ArrowRightIcon width={13} height={13} />
      </a>
    </section>
  );
}
