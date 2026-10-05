import { Bodoni_Moda } from "next/font/google";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { TopBar } from "../layout/TopBar";
import { BrandDirectory } from "./BrandDirectory";

const brandsDisplay = Bodoni_Moda({
  variable: "--font-brands-display",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function BrandsPage() {
  return (
    <div className={`${brandsDisplay.variable} brands-design flex min-h-screen min-w-0 flex-col`}>
      <TopBar showOnMobile />
      <Header hideMobileTagline />
      <BrandDirectory />
      <Footer />
    </div>
  );
}
