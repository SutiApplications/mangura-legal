# Mangura Legal

Privacy documentation, terms, the source configuration guide, and the GitHub Pages site for the Mangura iOS app.

## Public URLs

- Privacy center: <https://sutiapplications.github.io/mangura-legal/>
- Privacy policy: <https://sutiapplications.github.io/mangura-legal/privacy/>
- Terms of use: <https://sutiapplications.github.io/mangura-legal/terms/>
- Source configuration guide: <https://sutiapplications.github.io/mangura-legal/sources/>

## Documents

- [`PRIVACY_POLICY.md`](PRIVACY_POLICY.md) is the public privacy policy.
- [`TERMS_OF_USE.md`](TERMS_OF_USE.md) is the public terms of use.
- [`SOURCE_CONFIGURATION.md`](SOURCE_CONFIGURATION.md) documents the version 2 source configuration JSON format for user-added sources.

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

## Updating the source guide

The guide mirrors the decoders in the app repository under `ManguraKit/Sources/Domain/Sources/Configuration/` and the engine in `ManguraKit/Services/MangaSource/`. When a key, rule, op, or required field changes there, update the guide and its example in the same change.

## Updating the policy

1. Review the production app’s dependencies, enabled services, and remote dashboard settings.
2. Update the Markdown documents and their effective dates.
3. Build the site and inspect the generated privacy pages.
4. Update App Store Connect if any disclosed data type, purpose, linkage, or tracking answer changed.
