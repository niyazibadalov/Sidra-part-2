import { TopBar } from "../layout/TopBar";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { PrivacyHero } from "./PrivacyHero";
import { PrivacyBody } from "./PrivacyBody";

export function PrivacyPage() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-cream-100">
      <TopBar />
      <Header />

      <main className="flex-1">
        <PrivacyHero />
        <PrivacyBody />
      </main>

      <Footer />
    </div>
  );
}
