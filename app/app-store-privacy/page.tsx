import type { Metadata } from "next";
import { LegalDocument } from "../components/LegalDocument";
import { appStorePrivacyAnswers } from "../../lib/legal-documents";

export const metadata: Metadata = {
  title: "App Store Privacy Answers",
  description: "Audited App Store Connect privacy answers for Mangura 1.0.",
  alternates: {
    canonical: "https://sutiapplications.github.io/mangura-legal/app-store-privacy/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AppStorePrivacyPage() {
  return <LegalDocument eyebrow="Submission reference · Audited 6 August 2026" markdown={appStorePrivacyAnswers} />;
}
