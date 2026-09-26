import type { Metadata } from "next";
import { LegalDocument } from "../components/LegalDocument";
import { sourceConfigurationGuide } from "../../lib/legal-documents";

export const metadata: Metadata = {
  title: "Source Configuration Guide",
  description: "The JSON format Mangura uses for user-added sources: requests, parsers, placeholders, and a complete example.",
  alternates: {
    canonical: "https://sutiapplications.github.io/mangura-legal/sources/",
  },
};

export default function SourceConfigurationPage() {
  return <LegalDocument eyebrow="Guide · Format version 2" markdown={sourceConfigurationGuide} />;
}
