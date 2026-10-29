import type { Metadata } from "next";
import { DM_Serif_Display, Inter, Nothing_You_Could_Do } from "next/font/google";
import "./globals.css";
import { CartWishlistProvider } from "@/context/CartWishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toast } from "@/components/common/Toast";
import { CookieConsent } from "@/components/cookie-consent/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const display = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const hand = Nothing_You_Could_Do({
  variable: "--font-hand",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIDRA — Jewellery Lives Further",
  description:
    "A global jewellery marketplace. Meaningful pieces, extraordinary craftsmanship and a more brilliant tomorrow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${hand.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <AuthProvider>
          <CartWishlistProvider>
            {children}
            <Toast />
            <CookieConsent />
          </CartWishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

