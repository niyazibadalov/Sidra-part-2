import { Metadata } from "next";
import { BagPage } from "@/components/bag/BagPage";

export const metadata: Metadata = {
  title: "Shopping Bag — SIDRA",
  description: "View and manage items in your SIDRA shopping bag.",
};

export default function Bag() {
  return <BagPage />;
}
