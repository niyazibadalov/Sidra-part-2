import { Metadata } from "next";
import { ReviewPage } from "@/components/review/ReviewPage";

export const metadata: Metadata = {
  title: "Review Your Order — SIDRA",
  description: "Review your luxury jewellery order details before completing payment at SIDRA.",
};

export default function Review() {
  return <ReviewPage />;
}
