import type { Metadata } from "next";
import { TermsPage } from "@/components/terms/TermsPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — SIDRA",
  description:
    "The terms that govern your use of SIDRA and purchases through our marketplace.",
};

export default function Page() {
  return <TermsPage />;
}
