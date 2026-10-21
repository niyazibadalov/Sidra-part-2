import { Metadata } from "next";
import { CreateAccountPage } from "@/components/auth/CreateAccountPage";

export const metadata: Metadata = {
  title: "Create Account — SIDRA",
  description: "Join Sidra and be part of a more beautiful jewellery journey.",
};

export default function CreateAccount() {
  return <CreateAccountPage />;
}
