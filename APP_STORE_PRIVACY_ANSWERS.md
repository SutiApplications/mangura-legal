# Mangura App Store Privacy Answers

**Code audit date:** 6 August 2026  
**Applies to:** Mangura 1.0, bundle identifier `com.moguizan.Mangura`

This is the working reference for the App Store Connect **App Privacy** questionnaire. It reflects the code and integrations present on the audit date. Re-check it before every submission, especially after changing SDKs, RevenueCat settings, tracking integrations, web-source behavior, or diagnostics.

## URLs for App Store Connect

- **Privacy Policy URL:** `https://sutiapplications.github.io/mangura-legal/privacy/`
- **Privacy Choices URL (optional):** `https://sutiapplications.github.io/mangura-legal/privacy/#your-choices-and-controls`

## Content and source review notes

Apple’s intellectual-property rules apply in addition to the App Privacy questionnaire. A user-responsibility disclaimer does not replace the developer’s obligation to ensure the app’s behavior complies with the App Review Guidelines and the terms of any third-party service it accesses.

### Suggested App Review note

> Mangura is a general-purpose manga reader and client. The submitted App Store build contains no manga works, chapter pages, manga catalog, preconfigured scraping sources, or developer-operated source directory. It is empty of third-party content at first launch.
>
> Users may manually import a declarative source configuration or connect a media server only when they own or operate the source or have explicit authorization to use it. A source configuration contains connection and parsing instructions; it is not manga content and does not grant rights to any content or service. Content travels directly from the user-selected service to the user’s device. Mangura’s developer does not host, proxy, receive, sell, license, or distribute that content.
>
> Users are expressly required to access only sources and content they are legally authorized to use and to comply with copyright law, service terms, and access restrictions. Mangura does not verify, endorse, or provide user-added sources. Mangura Pro purchases license only app functionality and do not purchase or grant access to manga or third-party services.

Tailor this note to the exact submitted binary. If App Review asks for authorization for any demonstrated source or service, provide written authorization or remove that integration; the disclaimer above is not a substitute.

### Hard release gate: remove packaged source definitions

The repository currently contains `MangaFireSource.json`, `ManganeloSource.json`, and `WeebCentralSource.json` inside the Infrastructure resource folder, and `Package.swift` processes that folder as Swift Package resources. Although startup seeding is wrapped in `#if DEBUG`, those files can still be present in a Release app bundle.

Before submitting or using the suggested review note:

1. Remove the source definitions from the production target or explicitly exclude them from Release packaging.
2. Archive the actual App Store configuration and inspect the `.app` and embedded bundles to confirm that no source-definition JSON files are included.
3. Launch a clean install of that archive and confirm that no sources, content catalog, chapters, or content are available before the user imports an authorized source.
4. Capture the clean-launch state and source-import flow for App Review notes if needed.

## First question

**Do you or your third-party partners collect data from this app?**  
Select **Yes**.

Apple defines “collect” as transmitting data off the device in a way that lets the developer or a third-party partner access it for longer than necessary to service a request in real time. The definite collection in the current build is RevenueCat purchase history. Optional AniList and MyAnimeList connections also retain account-linked reading activity when a user enables them.

## Data types to select

| App Store data type | Purpose | Linked to the user? | Used for tracking? | Why |
| --- | --- | --- | --- | --- |
| **Identifiers → User ID** | App Functionality | **Yes** | **No** | A connected AniList or MyAnimeList account uses an account-level identifier to authenticate requests and associate reading-list changes with that provider account. |
| **Purchases → Purchase History** | **App Functionality** and **Analytics** | **No** | **No** | RevenueCat validates receipts, provides entitlements, restores purchases, and supplies subscription dashboards. Mangura configures RevenueCat with its automatically generated anonymous app-user ID and does not set a custom identity or contact attributes. |
| **Usage Data → Product Interaction** | App Functionality | **Yes** | **No** | If the user connects AniList or MyAnimeList, manga selections, reading status, chapter progress, dates, and scores are retained in that provider account. Media-server progress can also be sent to a user-configured server. |

For each selected type, answer **No** when App Store Connect asks whether it is used for tracking. The current app has no advertising SDK, does not access IDFA, and does not combine data with third-party data for targeted advertising or advertising measurement.

## Data types not selected

Do **not** select the following for the audited build:

- Contact Info
- Health & Fitness
- Financial Info, including Payment Info
- Location
- Sensitive Info
- Contacts
- Emails or Text Messages
- Photos or Videos
- Audio Data
- Gameplay Content
- Customer Support
- Other User Content
- Browsing History
- Search History
- Device ID
- Advertising Data
- Other Usage Data
- Diagnostics
- Environment Scanning
- Hands or Head
- Other Data Types

### Why these are not selected

- **Payment Info:** payment details are entered with Apple. Mangura and RevenueCat do not receive card or bank details.
- **Device ID:** Mangura does not use IDFA. RevenueCat is configured without a custom app-user ID or advertising attribution integration in code. Its anonymous app-user ID does not identify the real-world user and RevenueCat’s guidance does not require selecting Device ID for this setup.
- **Diagnostics:** the app has no remote crash-reporting, performance-monitoring, or analytics SDK. Its operational logs remain in Apple’s on-device unified logging system unless the user separately shares diagnostics with Apple.
- **iCloud data:** optional sync uses Apple’s private CloudKit database. Apple states developers are not responsible for disclosing data collected by Apple, and Mangura’s developer does not receive private CloudKit contents through an app backend.
- **Search and web browsing:** Mangura does not send searches or browsing history to a developer server and does not retain a server-side history. Requests go in real time to a content source selected by the user, similar to navigating external web content. The source may independently receive IP addresses, URLs, search terms, headers, and cookies under its own policy.
- **Credentials and tokens:** tracking tokens, media-server credentials, and source cookies are stored on device and sent only to the service they authenticate. They are not sent to Mangura’s developer.

## Web-content review checkpoint

Apple says data collected through web traffic must normally be declared unless the app enables navigation of the open web. Mangura retrieves user-selected external sources and may open those sources in a web view to complete access challenges.

Before submission, confirm that App Review accepts user-added sources as user-directed external web content rather than integrated third-party collection. The absence of bundled sources reduces ambiguity but does not decide how Apple classifies traffic after a user imports one. If Apple treats supported source types or demonstrated services as third-party partners, add the following conservative disclosures:

| Additional type | Purpose | Linked? | Tracking? |
| --- | --- | --- | --- |
| Browsing History | App Functionality | Verify each service shown to App Review; use **Yes** if URLs can be tied to an account, cookie, or persistent identifier | Verify the service operator’s practices |
| Search History | App Functionality | Verify each service shown to App Review; use **Yes** if searches can be tied to an account, cookie, or persistent identifier | Verify the service operator’s practices |
| Device ID | App Functionality | **Yes** if a demonstrated service sets a persistent unique cookie or similar identifier | Verify the service operator’s practices |

Do not answer **No** to tracking for a demonstrated website unless its privacy practices have been verified. Mangura itself performs no tracking, but web content can execute scripts and set cookies during a source-access challenge.

## RevenueCat dashboard checklist

The answers above assume all of the following remain true:

- `Purchases.configure(withAPIKey:)` is used without `appUserID`.
- Mangura does not call RevenueCat `logIn`, set email/name/phone customer attributes, or set advertising identifiers.
- No RevenueCat attribution, advertising, or analytics integration is enabled in the RevenueCat dashboard.
- RevenueCat data is used only for subscription functionality, fraud prevention, customer history, charts, and experiments.

If any assumption changes, revisit Contact Info, User ID, Device ID, Usage Data, linked-to-user answers, and tracking answers.

## Evidence from the audited build

- RevenueCat is configured on first app appearance using only the API key.
- Purchases, restores, offerings, customer information, and entitlements use the RevenueCat SDK.
- AniList and MyAnimeList use OAuth tokens stored in the iOS Keychain and can update reading status, progress, dates, and score.
- Media-server credentials are stored in the iOS Keychain with this-device-only accessibility.
- Cloud sync is manual and uses the user’s private CloudKit database.
- Cloud sync excludes credentials, tracking tokens, cookies, downloads, local manga, and appearance settings.
- Notifications are scheduled locally; there is no Mangura-operated push-token registration.
- There is no advertising, IDFA access, remote analytics, or crash-reporting SDK in the current dependency graph.

## Submission checklist

1. Verify the production build has the same dependencies and feature flags as this audit.
2. Confirm the archived app contains no source definitions, bundled manga, content catalog, or preloaded third-party content.
3. Launch a clean install and verify the app is content-empty until the user manually imports an authorized source or connects a server.
4. Check RevenueCat dashboard integrations and customer attributes, not only source code.
5. Verify the privacy and tracking practices of any service or test source demonstrated to App Review.
6. Confirm the public privacy-policy URL loads without authentication.
7. Add the content-and-source explanation to App Review notes and provide authorization for any demonstrated third-party service if requested.
8. Enter the selected data types and purposes in App Store Connect.
9. Review Apple’s generated product-page preview for “Data Linked to You,” “Data Not Linked to You,” and “Data Used to Track You.”
10. Update this document and App Store Connect whenever practices change; Apple allows privacy answers to be updated without a new app version.

## Official references

- [Apple: App Review Guidelines — Intellectual Property](https://developer.apple.com/app-store/review/guidelines/#intellectual-property)
- [Apple: App privacy details on the App Store](https://developer.apple.com/app-store/app-privacy-details/)
- [Apple: Manage app privacy in App Store Connect](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/)
- [RevenueCat: Apple App Privacy questionnaire](https://www.revenuecat.com/docs/platform-resources/apple-platform-resources/apple-app-privacy)
- [RevenueCat Privacy Policy](https://www.revenuecat.com/privacy-policy)

This document is a technical implementation aid, not legal advice. App Store Connect answers must reflect the production app and all third-party configurations at the time of submission.
