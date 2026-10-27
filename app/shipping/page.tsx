import type { Metadata } from "next";
import { ShippingPage } from "@/components/shipping/ShippingPage";

export const metadata: Metadata = {
  title: "Shipping & Delivery — SIDRA",
  description:
    "Secure, insured delivery with real-time tracking and dedicated support at every step.",
};

export default function Page() {
  return <ShippingPage />;
}
