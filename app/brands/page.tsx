import type { Metadata } from "next";
import { BrandsPage } from "@/components/brands/BrandsPage";

export const metadata: Metadata = {
  title: "Brands | SIDRA",
  description:
    "Discover extraordinary jewellery brands and find your next favourite with SIDRA's A–Z brand directory.",
};

export default function Brands() {
  return <BrandsPage />;
}
