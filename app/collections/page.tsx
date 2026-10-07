import type { Metadata } from "next";
import { CollectionsPage } from "@/components/collections/CollectionsPage";

export const metadata: Metadata = {
  title: "Rings Collection | SIDRA — Jewellery Lives Further",
  description:
    "Discover timeless rings handcrafted from 18K gold, platinum, and certified diamonds for proposals, anniversaries, and everyday elegance.",
};

export default function Page() {
  return <CollectionsPage />;
}
