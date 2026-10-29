import type { Metadata } from "next";
import { CookiePage } from "@/components/cookies/CookiePage";

export const metadata: Metadata = {
  title: "Cookie Policy — SIDRA",
  description: "How SIDRA uses cookies and similar technologies, and how you can manage your preferences.",
};

export default function Page() {
  return <CookiePage />;
}
