# Mangura Legal

Privacy documentation and the GitHub Pages site for the Mangura iOS app.

## Public URLs

- Privacy center: <https://sutiapplications.github.io/mangura-legal/>
- Privacy policy: <https://sutiapplications.github.io/mangura-legal/privacy/>
- App Store privacy answers: <https://sutiapplications.github.io/mangura-legal/app-store-privacy/>

## Documents

- [`PRIVACY_POLICY.md`](PRIVACY_POLICY.md) is the public privacy policy.
- [`APP_STORE_PRIVACY_ANSWERS.md`](APP_STORE_PRIVACY_ANSWERS.md) is the internal submission reference rendered on the site with `noindex` metadata.

The website reads these Markdown files at build time, so the documents are the single source of truth.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Build and deployment

```bash
npm run build
```

The static export is written to `out/`. Pushes to `main` deploy through the GitHub Pages workflow. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

The workflow obtains the repository base path from GitHub Pages and passes it to Next.js, so project-page assets and links work under `/mangura-legal`.

## Updating the policy

1. Review the production app’s dependencies, enabled services, and remote dashboard settings.
2. Update the Markdown documents and their effective/audit dates.
3. Build the site and inspect the generated privacy pages.
4. Update App Store Connect if any disclosed data type, purpose, linkage, or tracking answer changed.

The App Store answers are a technical implementation aid and are not legal advice.
