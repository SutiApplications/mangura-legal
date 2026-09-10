import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Center",
  description: "Clear answers about Mangura’s privacy practices, user-added sources, and content responsibility.",
};

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Mangura · Privacy center</p>
          <h1>Your library stays yours.</h1>
          <p className="hero-lede">
            Mangura is built around direct connections and on-device storage. No developer account,
            no advertising profile, and no cross-app tracking. The App Store version ships without
            manga content or preconfigured scraping sources.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/privacy/">
              Read the privacy policy
            </Link>
            <Link className="button button-secondary" href="/terms/">
              Read the terms of use
            </Link>
          </div>
          <p className="status-line"><span aria-hidden="true">●</span> Current for Mangura 1.0 · Updated 10 September 2026</p>
        </div>
        <aside className="privacy-note" aria-label="Privacy summary">
          <p className="note-label">At a glance</p>
          <strong>No Mangura cloud account.</strong>
          <ul>
            <li>No bundled manga catalog or scraping sources</li>
            <li>Library and downloads stay on device by default</li>
            <li>iCloud Sync is optional and manual</li>
            <li>Credentials live in the iOS Keychain</li>
            <li>RevenueCat receives purchase history, not payment details</li>
            <li>Firebase receives basic app analytics and crash diagnostics</li>
          </ul>
        </aside>
      </section>

      <section className="principles shell" aria-labelledby="principles-title">
        <div className="section-heading">
          <p className="eyebrow">Designed with restraint</p>
          <h2 id="principles-title">Three simple boundaries</h2>
        </div>
        <div className="card-grid">
          <article className="principle-card">
            <span className="card-number">01</span>
            <h3>On your device</h3>
            <p>Your library, downloads, settings, source cookies, and service credentials are local by default.</p>
          </article>
          <article className="principle-card">
            <span className="card-number">02</span>
            <h3>Only when you choose</h3>
            <p>User-added authorized sources, media servers, tracking services, and iCloud are connections you control.</p>
          </article>
          <article className="principle-card">
            <span className="card-number">03</span>
            <h3>No advertising layer</h3>
            <p>Mangura has no advertising SDK, does not access IDFA, and does not track activity across apps.</p>
          </article>
        </div>
      </section>

      <section className="document-links shell" aria-labelledby="documents-title">
        <div className="section-heading">
          <p className="eyebrow">The documents</p>
          <h2 id="documents-title">Clear terms. Straight answers.</h2>
        </div>
        <div className="document-grid">
          <Link className="document-card featured" href="/privacy/">
            <span>For everyone</span>
            <h3>Privacy Policy</h3>
            <p>What the app stores, which services receive data, and who is responsible for user-added sources and content.</p>
            <strong>Read policy <span aria-hidden="true">→</span></strong>
          </Link>
          <Link className="document-card" href="/terms/">
            <span>Using Mangura</span>
            <h3>Terms of Use</h3>
            <p>The rules for using the app, connected services, user-added sources, and Mangura Pro.</p>
            <strong>Read terms <span aria-hidden="true">→</span></strong>
          </Link>
        </div>
      </section>

      <section className="callout shell">
        <div>
          <p className="eyebrow">Need help?</p>
          <h2>Privacy requests start here.</h2>
        </div>
        <a
          className="button button-secondary"
          href="https://github.com/SutiApplications/mangura-legal/issues/new?labels=privacy&title=Privacy%20request"
        >
          Contact the developer
        </a>
      </section>
    </main>
  );
}
