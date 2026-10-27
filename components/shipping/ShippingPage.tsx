import { TopBar } from "../layout/TopBar";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { ServiceAssuranceBar } from "../common/ServiceAssuranceBar";
import { ShippingHero } from "./ShippingHero";
import { ShippingHighlights } from "./ShippingHighlights";
import { DeliveryOptions } from "./DeliveryOptions";
import { ShippingDetailsGrid, ShippingAccordion } from "./ShippingDetails";
import { CommitmentBanner } from "./CommitmentBanner";

export function ShippingPage() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-cream-100">
      <TopBar />
      <Header />

      <main className="flex-1">
        <ShippingHero />
        <div className="mx-auto max-w-[1440px] space-y-5 px-4 py-5 sm:px-6 sm:py-6 lg:space-y-6 lg:px-10 lg:py-8">
          <ShippingHighlights />
          <DeliveryOptions />
          <ShippingDetailsGrid />
          <ShippingAccordion />
          <CommitmentBanner />
        </div>
      </main>

      <ServiceAssuranceBar />
      <Footer />
    </div>
  );
}
