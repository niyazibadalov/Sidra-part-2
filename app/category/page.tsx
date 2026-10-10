import { Metadata } from "next";
import { CollectionsPage } from "@/components/collections/CollectionsPage";

export const metadata: Metadata = {
  title: "Category — Rings & Fine Jewellery | SIDRA",
  description:
    "Explore our complete collection of handcrafted rings, wedding bands, and fine jewellery. Ethical diamonds and precious gemstones.",
};

export default function CategoryRoute() {
  return <CollectionsPage />;
}
