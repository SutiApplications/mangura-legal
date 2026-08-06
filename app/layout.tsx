import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = "https://sutiapplications.github.io/mangura-legal";

export const metadata: Metadata = {
  metadataBase: new URL("https://sutiapplications.github.io"),
  title: {
    default: "Mangura Privacy Center",
    template: "%s · Mangura",
  },
  description:
    "Mangura's privacy policy, user-added source responsibilities, and App Store privacy disclosures.",
  applicationName: "Mangura Privacy Center",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  icons: {
    icon: `${basePath}/app-icon.png`,
    apple: `${basePath}/app-icon.png`,
  },
  openGraph: {
    type: "website",
    siteName: "Mangura Privacy Center",
    title: "Mangura Privacy Center",
    description: "Privacy and content-source responsibilities for Mangura’s user-configured reader.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1536,
        height: 1024,
        alt: "Mangura — Your library stays yours. Privacy center.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mangura Privacy Center",
    description: "Privacy and content-source responsibilities for Mangura’s user-configured reader.",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/" aria-label="Mangura privacy center home">
              <Image src={`${basePath}/app-icon.png`} alt="" width={42} height={42} priority />
              <span>
                <strong>Mangura</strong>
                <small>Privacy center</small>
              </span>
            </Link>
            <nav aria-label="Primary navigation">
              <Link href="/privacy/">Privacy policy</Link>
              <Link href="/app-store-privacy/">App Store answers</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="shell footer-inner">
            <div>
              <strong>Mangura</strong>
              <p>A private-by-default, user-configured manga reader for iOS.</p>
            </div>
            <div className="footer-links">
              <Link href="/privacy/">Privacy</Link>
              <a href="https://github.com/SutiApplications/mangura-legal">Source</a>
              <a href="https://github.com/SutiApplications/mangura-legal/issues/new?labels=privacy&title=Privacy%20request">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
