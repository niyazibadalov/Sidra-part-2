import { Metadata } from "next";
import { WishlistPage } from "@/components/wishlist/WishlistPage";

export const metadata: Metadata = {
  title: "My Wishlist — SIDRA",
  description: "View and manage your saved jewellery pieces on SIDRA.",
};

export default function Wishlist() {
  return <WishlistPage />;
}
