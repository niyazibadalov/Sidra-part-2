import { Metadata } from "next";
import { ResetPasswordPage } from "@/components/auth/ResetPasswordPage";

export const metadata: Metadata = {
  title: "Create a New Password — SIDRA",
  description: "Set a new, secure password for your SIDRA account.",
};

export default function NewPasswordCamel() {
  return <ResetPasswordPage />;
}
