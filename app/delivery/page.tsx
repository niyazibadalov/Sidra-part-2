import { Metadata } from "next";
import { DeliveryPage } from "@/components/delivery/DeliveryPage";

export const metadata: Metadata = {
  title: "Delivery Method — SIDRA",
  description: "Select delivery options for each seller at SIDRA.",
};

export default function Delivery() {
  return <DeliveryPage />;
}
