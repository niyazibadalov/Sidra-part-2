import { Metadata } from "next";
import { BagPage } from "@/components/bag/BagPage";

export const metadata: Metadata = {
  title: "Shopping Cart — SIDRA",
  description: "View and manage items in your SIDRA shopping cart.",
};

export default function Cart() {
  return <BagPage />;
}
