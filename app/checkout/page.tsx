import { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout — SIDRA",
  description: "Secure checkout for fine jewellery pieces at SIDRA.",
};

export default function Checkout() {
  return <CheckoutPage />;
}
