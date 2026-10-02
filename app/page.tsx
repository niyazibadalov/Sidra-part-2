import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { ImpactBanner } from "@/components/home/ImpactBanner";
import { ShopByCategory } from "@/components/home/Categories";
import { StoryBanners } from "@/components/home/StoryBanners";
import { TrustBar } from "@/components/home/TrustBar";
import { TrustedBrands } from "@/components/home/TrustedBrands";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ShopByCategory />
        <FeaturedProducts />
        <StoryBanners />
        <TrustedBrands />
        <ImpactBanner />
      </main>
      <Footer />
    </>
  );
}
