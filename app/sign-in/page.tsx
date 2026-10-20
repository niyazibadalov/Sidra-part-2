import { Metadata } from "next";
import { SignInPage } from "@/components/auth/SignInPage";

export const metadata: Metadata = {
  title: "Sign In — SIDRA",
  description: "Sign in to your SIDRA account to access your wishlist, orders, and personalised jewellery experience.",
};

export default function SignIn() {
  return <SignInPage />;
}
