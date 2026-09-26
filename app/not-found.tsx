import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found shell">
      <p className="eyebrow">404 · Page not found</p>
      <h1>This page is not in the library.</h1>
      <p>The privacy policy, terms of use, and source guide are still available from the home page.</p>
      <Link className="button button-primary" href="/">Return home</Link>
    </main>
  );
}
