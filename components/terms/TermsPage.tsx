import { TopBar } from "../layout/TopBar";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { ServiceAssuranceBar } from "../common/ServiceAssuranceBar";
import { TermsHero } from "./TermsHero";
import { TermsBody } from "./TermsBody";

export function TermsPage() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-cream-100">
      <TopBar />
      <Header />

      <main className="flex-1">
        <TermsHero />
        <TermsBody />
      </main>

      <ServiceAssuranceBar />
      <Footer />
    </div>
  );
}
