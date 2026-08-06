import type { Metadata } from "next";
import { LegalDocument } from "../components/LegalDocument";
import { termsOfUse } from "../../lib/legal-documents";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern use of Mangura, connected services, sources, and Mangura Pro.",
  alternates: {
    canonical: "https://sutiapplications.github.io/mangura-legal/terms/",
  },
};

export default function TermsOfUsePage() {
  return <LegalDocument eyebrow="Terms · Effective 6 August 2026" markdown={termsOfUse} />;
}
