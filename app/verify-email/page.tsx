import { Metadata } from "next";
import { VerifyEmailPage } from "@/components/auth/VerifyEmailPage";

export const metadata: Metadata = {
  title: "Verify Your Email — SIDRA",
  description: "Verify your email to keep your SIDRA account secure.",
};

export default function VerifyEmail() {
  return <VerifyEmailPage />;
}
