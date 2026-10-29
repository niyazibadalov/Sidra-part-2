import { TopBar } from "../layout/TopBar";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { CookieHero } from "./CookieHero";
import { CookieBody } from "./CookieBody";

export function CookiePage() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-cream-100">
      <TopBar />
      <Header />

      <main className="flex-1">
        <CookieHero />
        <CookieBody />
      </main>

      <Footer />
    </div>
  );
}
