# Mangura Privacy Policy

**Effective date:** 6 August 2026  
**Last updated:** 6 August 2026

Mangura is an iOS manga reader that connects directly to content sources and services you choose. This policy explains what information Mangura handles, where it goes, and the controls available to you.

In this policy, “Mangura,” “we,” and “us” refer to Mangura and its independent developer. This policy covers the Mangura app and this legal website.

## The short version

- Mangura has no developer-operated user-account or content backend.
- Mangura and its developer do not own, host, provide, sell, license, or distribute manga content.
- The App Store version contains no manga catalog and no preconfigured scraping sources. You must manually add only sources you own, operate, or are authorized to use.
- Your library, downloads, settings, cookies, and credentials are stored on your device by default.
- Mangura does not sell personal information, show third-party ads, or track you across other companies’ apps and websites.
- The app connects directly to manga websites, media servers, AniList, MyAnimeList, Apple iCloud, and RevenueCat only as needed for the features you use.
- Optional iCloud Sync stores selected library data in your private iCloud database. Credentials, account tokens, cookies, local manga, downloads, and appearance settings are excluded.

## Information handled on your device

Mangura stores information needed to provide the reader, including:

- saved manga and chapter metadata;
- reading history and progress, including pages read and reading status;
- library categories and reader preferences;
- downloaded chapters and other files you import;
- enabled source definitions and source settings;
- media-server connection settings;
- authentication tokens for AniList and MyAnimeList;
- media-server usernames, passwords, API keys, tokens, and cookies; and
- website cookies used for source access or bot-protection challenges.

Tracking-service tokens and media-server credentials are stored in the iOS Keychain. Other app data is stored in the app’s local database, preferences, file storage, and system cookie storage. Mangura’s developer does not receive this on-device data.

Mangura also writes operational messages to Apple’s unified logging system on your device. Those logs may include requested URLs, search terms, content identifiers, or error details. We do not automatically receive these logs. Apple may provide diagnostics to developers if you separately choose to share analytics or diagnostics with Apple under your device settings.

## Network requests and content sources

Mangura retrieves catalog data, manga details, chapter lists, images, and pages directly from content sources. When you browse or search a source, that source and its infrastructure may receive:

- your IP address and general device/network information;
- the requested URL and content;
- search terms and filters;
- HTTP headers, including a user agent and referrer; and
- cookies, including Cloudflare or similar clearance cookies.

Some source-access challenges open the source in a web view, where the source may run scripts or set cookies. These websites are independent services, are not controlled by Mangura, and may retain or use information under their own privacy policies. Mangura’s developer does not receive your source browsing or search activity.

You can remove website data by clearing Mangura’s app data or uninstalling the app, subject to iOS behavior for system storage.

## Content sources and intellectual property

Mangura is a general-purpose client and reader. The App Store version is distributed without manga works, chapter pages, a manga catalog, or preconfigured scraping sources. Mangura does not provide or operate an in-app source directory. Mangura’s developer does not host, upload, publish, provide, sell, license, sublicense, or distribute manga content, and does not operate a proxy through which manga content is delivered.

You may manually add a declarative source configuration or connect a media server. A source configuration contains connection and parsing instructions, such as URLs, request rules, and selectors. It is not manga content, does not contain manga rights, and does not itself grant permission to access any website, server, or work.

When you use a source or media server, your device connects directly to that service. Content is retrieved from the service you selected and may be stored locally on your device when you request a download. Mangura’s developer does not receive or keep a copy of that content.

Neither Mangura nor its developer owns or claims any copyright, trademark, distribution right, or other intellectual-property right in third-party manga, artwork, titles, or related materials. All such rights remain with their respective authors, artists, publishers, licensors, and other rights holders. Mangura cannot grant you access or usage rights that belong to someone else.

You are solely responsible for every source you add and for all content you access through it. You may add or use a source only when you own or operate it, have explicit authorization from its operator, or are otherwise legally permitted to use it. You may access or download only content that you own, have licensed, have permission to use, is in the public domain, or that you are otherwise legally entitled to access. You must comply with applicable copyright law, the source operator’s terms, and any access restrictions. Do not use Mangura to access, copy, download, or distribute unauthorized content, or to bypass access controls.

Mangura does not verify, endorse, approve, or certify user-added sources. Successfully importing a configuration or connecting a server is not evidence of authorization. A Mangura Pro purchase licenses only Mangura software features; it does not purchase, license, authorize, or grant access to any manga, source, website, or third-party service.

Rights holders and service operators can [open a content or source concern](https://github.com/SutiApplications/mangura-legal/issues/new?labels=content-rights&title=Content%20or%20source%20concern). Please identify the work or service, explain your authority, and include enough information for us to evaluate the request without posting confidential credentials. We can take reasonable action concerning Mangura functionality or references under our control. Requests concerning content hosted by another service should also be directed to that service’s operator.

## Media servers you connect

Mangura can connect to a Komga, Kavita, or Suwayomi server that you configure. Requests go directly between your device and that server. Depending on the server and your settings, Mangura may send authentication credentials, library selections, manga and chapter identifiers, and reading progress.

Credentials are stored in the iOS Keychain and are not included in iCloud Sync. Connection metadata—such as the server URL, display name, selected libraries, and progress-sync mode—may be included in iCloud Sync if you enable it. The operator of the server determines its retention and privacy practices.

## Optional manga tracking services: AniList and MyAnimeList

If you connect an AniList or MyAnimeList account, Mangura uses OAuth to obtain a token and stores that token in the iOS Keychain. Mangura may then:

- search the provider’s manga catalog;
- retrieve your manga-list entries and related account identifiers;
- create or update manga status, chapter progress, dates, and scores; and
- keep local tracking links in sync with the provider.

These requests are sent directly to the provider and are associated with your account there. Mangura’s developer does not receive your provider credentials, tokens, or list data. Disconnecting a provider removes its token from Mangura; it does not delete information already held by that provider. See the [AniList terms and privacy policy](https://anilist.co/terms) and [MyAnimeList privacy policy](https://myanimelist.net/about/privacy_policy).

## Optional iCloud Sync

If you enable iCloud Sync and choose **Sync Now**, Mangura uses Apple CloudKit to store data in a private database associated with your Apple Account. Synced information can include:

- saved manga metadata and source identifiers;
- chapter reading progress;
- tracking links and tracking status;
- library category names and order;
- enabled source definitions; and
- media-server connection metadata without credentials.

Mangura also stores random device and record identifiers, modification dates, and synchronization metadata needed to merge changes safely. Sync is manual and is available only when you enable it.

Your Apple Account credentials are handled by Apple and are not available to Mangura. Apple states that private CloudKit data is not shared with developers unless a user chooses to share or post it publicly. Apple processes iCloud data under its [Privacy Policy](https://www.apple.com/legal/privacy/).

You can delete Mangura’s synced records at any time in **Settings → iCloud Sync → Delete iCloud Data**. This does not delete the copy stored on your device.

## Subscriptions and RevenueCat

Mangura uses Apple’s in-app purchase system and RevenueCat to offer and verify Mangura Pro subscriptions. RevenueCat receives an automatically generated anonymous app-user identifier, transaction and receipt information, product and entitlement information, and limited technical information needed to operate the subscription service. Mangura does not send RevenueCat your name, email address, advertising identifier, manga library, searches, or reading history.

A Mangura Pro purchase licenses only software features in the app. It does not sell manga content or grant permission, access, or rights to any source or third-party content.

Payment-card and billing details are entered with Apple and are not available to Mangura or RevenueCat. Apple and RevenueCat retain transaction records as required to provide purchases, restore entitlements, prevent fraud, perform subscription analytics, and meet legal obligations. See [Apple’s Privacy Policy](https://www.apple.com/legal/privacy/) and [RevenueCat’s Privacy Policy](https://www.revenuecat.com/privacy-policy).

## Notifications and background activity

Mangura may ask for notification permission and schedule local notifications for library updates or download activity. The current app does not register your device with a Mangura-operated push-notification server. Background refreshes may contact enabled content sources, and those requests are subject to the section on network requests above.

## The legal website

This website does not use analytics, advertising pixels, marketing cookies, forms, or local storage. It is hosted through GitHub Pages. GitHub may process standard server information, such as IP addresses and request logs, under the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## How information is used

Information is handled only to:

- provide requested app features and remember your settings;
- retrieve and display content from sources you choose;
- maintain your library and reading progress;
- synchronize data with services you connect;
- process purchases and restore subscription access;
- protect connections and complete source-access challenges; and
- diagnose problems on your device or respond to support requests you initiate.

Where data-protection law requires a legal basis, processing is based on performance of the service you request, your consent for optional connections and iCloud Sync, compliance with legal obligations for transactions, and legitimate interests in security and reliable operation.

## Sharing

Mangura does not sell or rent personal information. Data is shared only with the service needed for a feature you choose: Apple, RevenueCat, a content source, a tracking provider, or a media server you configure. We may also disclose information if required by law or necessary to protect rights, safety, and security.

Mangura does not use data for third-party advertising and does not combine app data with data from other companies for advertising or advertising measurement.

## Retention and deletion

On-device data remains until you delete it in the app, clear the relevant connection, or remove the app. Some Keychain items can survive app deletion under iOS behavior; disconnect tracking accounts and remove media-server connections before uninstalling if you want those credentials removed first.

iCloud data remains until you use Mangura’s **Delete iCloud Data** control or manage it through Apple. Data sent to AniList, MyAnimeList, a content source, or your media server is retained under that service’s rules. RevenueCat and Apple retain purchase records for service, fraud-prevention, accounting, and legal purposes.

## Your choices and controls

You can:

- use Mangura without connecting AniList, MyAnimeList, a media server, or iCloud Sync;
- disable or remove individual content sources;
- disconnect tracking accounts and delete media-server connections;
- clear downloads and local library data in the app;
- disable iCloud Sync or delete all Mangura records from iCloud;
- change notification permission in iOS Settings; and
- contact us about access, correction, deletion, objection, restriction, or portability rights that apply in your region.

Because most information is held only on your device or by a service you chose, we may direct you to the relevant in-app control or third-party provider. We may need reasonable information to verify and fulfill a request, but please do not post credentials, access tokens, or sensitive personal information in a public support request.

## Security

Mangura uses platform protections such as the iOS app sandbox, Keychain storage for credentials, HTTPS when supported by the service, and private CloudKit databases. No method of storage or transmission is completely secure. A media server or source that you configure with an unencrypted HTTP URL does not receive HTTPS transport protection; use trusted servers and secure connections.

## International transfers

Apple, RevenueCat, content sources, tracking providers, GitHub, and user-configured servers may process information in countries other than your own. Their privacy policies describe the safeguards and locations relevant to their services.

## Children

Mangura is not directed to children under 13, or under the minimum age required to consent to online services in their country. Some user-configured sources may contain mature content. If you believe a child has provided personal information through a service connected to Mangura, contact that service and notify us.

## Changes to this policy

We may update this policy when Mangura’s features or legal requirements change. The latest version will remain at this URL and will show a revised “Last updated” date. Material changes will be highlighted in the app or release notes when appropriate.

## Contact

For privacy questions or requests, [open a privacy request in the Mangura legal repository](https://github.com/SutiApplications/mangura-legal/issues/new?labels=privacy&title=Privacy%20request). Do not include passwords, API keys, access tokens, or sensitive personal information in a public issue.

Mangura’s independent developer is responsible for this policy. This contact method is also available for data-protection complaints; you may additionally contact your local data-protection authority where applicable.
