import type { Metadata } from "next";
import { LegalDocument } from "../components/LegalDocument";
import { privacyPolicy } from "../../lib/legal-documents";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mangura stores, uses, shares, and protects information.",
  alternates: {
    canonical: "https://sutiapplications.github.io/mangura-legal/privacy/",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalDocument eyebrow="Policy · Effective 6 August 2026" markdown={privacyPolicy} />;
}
