import { Metadata } from "next";
import { PaymentPage } from "@/components/payment/PaymentPage";

export const metadata: Metadata = {
  title: "Payment — SIDRA",
  description: "Secure payment methods for your luxury jewellery orders at SIDRA.",
};

export default function Payment() {
  return <PaymentPage />;
}
