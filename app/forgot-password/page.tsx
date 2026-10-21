import { Metadata } from "next";
import { ForgotPasswordPage } from "@/components/auth/ForgotPasswordPage";

export const metadata: Metadata = {
  title: "Forgot Password — SIDRA",
  description: "Reset your SIDRA account password.",
};

export default function ForgotPassword() {
  return <ForgotPasswordPage />;
}
