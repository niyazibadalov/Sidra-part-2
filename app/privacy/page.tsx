import type { Metadata } from "next";
import { PrivacyPage } from "@/components/privacy/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy — SIDRA",
  description: "How SIDRA collects, uses and protects your information.",
};

export default function Page() {
  return <PrivacyPage />;
}
