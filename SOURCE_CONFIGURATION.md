# Source configuration guide

Format version 2 · Updated 19 September 2026

Mangura does not ship with manga sources. To let the app read a website, you describe that website in a small JSON file called a **source configuration** and import it into the app. This page documents the format so you can write, host, and maintain your own.

A configuration contains connection and parsing instructions: URLs, request rules, and selectors. It is not manga content, and it does not grant any right to use a website. Before you write one, read [Content sources and your responsibilities](https://sutiapplications.github.io/mangura-legal/terms/#content-sources-and-your-responsibilities) in the Terms of Use. You may add a source only when you own or operate it, have explicit authorization from its operator, or are otherwise legally permitted to access it in that way. Mangura does not verify, endorse, or certify user-added sources, and you may share a configuration only when you have the rights and permissions needed to do so.

## How Mangura uses a configuration

The app performs six operations. Each one sends a request, parses the response, and reads specific named fields from the result.

| Operation | When it runs | What it must produce |
|-----------|--------------|----------------------|
| `catalog.trending` | Opening the source on the Search screen | A list of manga (`results`) |
| `catalog.newest` | The optional “latest” feed | A list of manga (`results`) |
| `catalog.search` | Typing a query | A list of manga (`results`) |
| `details` | Opening a manga | Title, description, status, authors, tags |
| `chapters` | Opening a manga | A list of chapters (`chapters`) |
| `pages` | Opening a chapter | A list of image URLs (`pages`) |

Values flow between operations through placeholders. A catalog result yields `{manga_id}`, the details request resolves `{manga_url}`, each chapter yields `{chapter_url}`, and so on.

Mangura reads the HTML or JSON that the server returns. It does not run the site’s JavaScript, except when a request is captured (see “Captured requests”).

## Importing a configuration

1. Host the JSON file at a public HTTPS URL, or save it on your device.
2. In Mangura, open **Settings → Sources** and tap **+**.
3. Choose **From URL** and paste the link, or choose **From File** and pick the JSON file.

The same options are available from the **Search** screen. Enabled sources appear on the Search screen. You can enable, disable, update, or remove them under **Settings → Sources**.

A source imported from a URL remembers that URL. To publish a fix, change the file at the same address and increase `version`. Mangura installs the new file when you pull down on the Sources screen or tap **Update** on the source. A file with the same or a lower version is skipped.

### Collections

A collection is a JSON file that points to several source files. Importing a collection installs all of them.

```json
{
  "name": "My sources",
  "sources": [
    "https://example.com/sources/alpha.json",
    { "url": "https://example.com/sources/beta.json" }
  ]
}
```

`name` is optional. Every entry must be reachable over HTTPS, and source `id` values must be unique across the collection.

## File layout

```json
{
  "id": "examplecomics",
  "name": "Example Comics",
  "version": 2,
  "logo": "https://example.com/icon.png",
  "base_url": "https://example.com/",
  "adult_only": false,
  "catalog": { "…": "…" },
  "details": { "request": { "…": "…" }, "parser": { "…": "…" } },
  "chapters": { "request": { "…": "…" }, "parser": { "…": "…" } },
  "pages": { "request": { "…": "…" }, "parser": { "…": "…" } },
  "mapping": { "manga_status": { "…": "…" } }
}
```

| Key | Type | Required | Notes |
|-----|------|----------|-------|
| `id` | string | yes | Stable lowercase identifier. Two installed sources cannot share an `id`. |
| `name` | string | yes | Display name. |
| `version` | integer | yes | Start at `2`. Increase it every time you publish a change. |
| `logo` | string | yes | URL of an icon. |
| `base_url` | string | yes | Absolute URL with a trailing slash. Relative requests and `{base_url}` resolve against it. |
| `adult_only` | boolean | no | Defaults to `false`. |
| `catalog` | object | yes | Trending, newest, and search. See “Catalog”. |
| `details`, `chapters`, `pages` | object | yes | Each needs both a `request` and a `parser`. |
| `mapping` | object | yes | Status mapping. `manga_status` is required but may be an empty object. |

Keys are `snake_case`. The file must be plain JSON: no comments and no trailing commas.

## Catalog

```json
"catalog": {
  "default_parser": { "…": "…" },
  "trending": { "request": { "…": "…" } },
  "newest": { "request": { "…": "…" }, "parser": { "…": "…" } },
  "search": { "request": { "…": "…" }, "filters": [] }
}
```

- `trending` and `search` are required. Omit `newest` entirely when the site has no “latest” feed.
- Each operation has a required `request` and an optional `parser`.
- An operation without its own `parser` uses `default_parser`. When neither exists, the file is rejected at import.

## Requests

```json
"request": {
  "request_type": "html_request",
  "type": "relative",
  "base": "search/",
  "method": "GET",
  "path_parameters": [ { "value": "{query}", "rules": ["forceNonEmpty"] } ],
  "query_parameters": [ { "name": "page", "value": "{page}", "rules": ["startsAtOne"] } ],
  "headers": { "Referer": "{base_url}" }
}
```

| Key | Values | Notes |
|-----|--------|-------|
| `request_type` | `html_request` (default), `json_request`, `request_capture` | How the response is treated. |
| `type` | `relative`, `absolute`, `placeholder` | `relative` appends `base` to `base_url`. `absolute` uses `base` as a full URL. `placeholder` uses the URL stored in the placeholder named by `base`. |
| `base` | string | Path, URL, or placeholder name. Write `"base": "chapter_url"`, not `"{chapter_url}"`. |
| `method` | `GET` (default), `POST`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`, `TRACE`, `CONNECT` | Request bodies are not supported. |
| `path_parameters` | array | Appended to the path in order. `name` is ignored. |
| `query_parameters` | array | Added to the query string. |
| `headers` | object | Header name to value. Values may contain placeholders. |

### Parameters

```json
{ "name": "genre", "value": "{genres}", "rules": ["omitWhenZero"], "collection_encoding": "repeat", "separator": "," }
```

`value` is required and may be a literal or a placeholder. `collection_encoding` controls multi-value filters: `single` (default), `repeat` (`genre=a&genre=b`), or `joined` (`genre=a,b`, using `separator`).

These four rules are the only ones. They run in a fixed order.

| Rule | Effect |
|------|--------|
| `startsAtOne` | Treat page 0 as page 1, for 1-indexed sites. |
| `multiplyBy(N)` | Multiply the numeric value by N, for offset pagination. |
| `forceNonEmpty` | Fail the request when the value is empty. |
| `omitWhenZero` | Drop the parameter when the value is 0. |

### JSON requests

`json_request` parses the response as JSON and can follow pages automatically.

```json
"request": {
  "request_type": "json_request",
  "type": "relative",
  "base": "api/chapters",
  "method": "GET",
  "paginated": true,
  "pagination_delay": 350,
  "query_parameters": [ { "name": "offset", "value": "{page}", "rules": ["multiplyBy(50)"] } ],
  "has_more": { "type": "bool", "key": "pagination.has_more" }
}
```

`paginated` defaults to `false`. `pagination_delay` is the wait between pages in milliseconds and defaults to 350. `has_more` is a JSON field scraper that returns a boolean.

### Captured requests

Some pages load their data through a background request after the HTML arrives. `request_capture` opens the first URL, watches outgoing requests for one whose URL contains any of the `capture_patterns`, and then re-issues that request as described in `on_capture`. The captured URL is available as `{captured_url}`.

```json
"request": {
  "request_type": "request_capture",
  "type": "placeholder",
  "base": "chapter_url",
  "method": "GET",
  "capture_patterns": ["ajax/read/chapter"],
  "on_capture": {
    "request_type": "json_request",
    "type": "placeholder",
    "base": "captured_url",
    "method": "GET",
    "headers": { "Referer": "{base_url}" }
  }
}
```

`on_capture` accepts `html_request` or `json_request`.

## Parsers

A parser turns a response into named fields.

```json
"parser": {
  "response_type": "html",
  "manga_title": { "expr": "h1.title", "attr": "text" },
  "manga_cover": { "type": "url", "expr": "img.cover", "attr": "src", "headers": { "Referer": "{base_url}" } }
}
```

`response_type` is `html` (default) or `json`. Every other key is a field name mapped to a field scraper. Field names are fixed per operation. See “Required fields”.

### Field scrapers

HTML scrapers select with a CSS selector in `expr` and read `attr`. JSON scrapers select with a dotted path in `key`.

| Key | Applies to | Notes |
|-----|------------|-------|
| `type` | both | Field type. Defaults to `string`. |
| `expr` | HTML | CSS selector. Omit it to read the current node. |
| `attr` | HTML | `text` (all text), `ownText` (direct text only), or any attribute name such as `href`, `src`, or `title`. |
| `key` | JSON | Dotted path such as `data.chapters`. `[0]` selects the first array element. |
| `format` | `date` fields | Unicode date pattern such as `MMM dd, yyyy`. Omit it to try ISO 8601 and epoch formats. |
| `headers` | `url` fields | Stored with the URL and sent when the app loads it. Needed for hotlink-protected images. |
| `ops` | both | Ordered text transforms. See “Ops”. |
| `for_each` | `node` fields | Sub-scrapers that run once per matched element or array item. |

### Field types

| Type | Meaning |
|------|---------|
| `string` | Text. Default. |
| `int` | Integer. |
| `double` | Decimal number. Used for chapter numbers. |
| `bool` | Boolean. |
| `list` | Collects every match as a list of strings. |
| `node` | A container that matches many elements. Requires `for_each`. |
| `date` | A date parsed with `format`. |
| `url` | An absolute URL resolved against the page. Accepts optional `headers`. |

### Ops

`ops` runs left to right on the extracted text. Each entry is `{ "type": "…", "pattern": "…", "value": "…" }`, and `pattern` and `value` are used only where noted.

| Type | Effect |
|------|--------|
| `trim` | Remove surrounding whitespace. |
| `lowercase` | Lowercase the text. |
| `replace` | Replace literal `pattern` with `value`. |
| `regex_replace` | Replace regular expression `pattern` with `value`. |
| `split` | Split on `pattern`. |
| `extract_last` | Keep the last element after a split. |
| `extract_second_last` | Keep the second-to-last element after a split. |
| `prepend_if_missing` | Prepend `value` when the text does not already start with it. |
| `append` | Append `value`. |
| `as_path_parameter` | Append the text as a path segment to the URL in `value`, for example `{manga_url}`. |

There is no base64, URL-decode, arithmetic, or conditional op.

This idiom turns a link into an id:

```json
"manga_id": {
  "expr": "a",
  "attr": "href",
  "ops": [
    { "type": "regex_replace", "pattern": "^.*/series/", "value": "" },
    { "type": "trim" }
  ]
}
```

## Placeholders

A placeholder is only available in the operations where the app has populated it. Using it elsewhere produces an empty value.

| Placeholder | Available in | Value |
|-------------|--------------|-------|
| `{base_url}` | everywhere | The source `base_url`. |
| `{page}` | catalog requests | Page index, starting at 0. |
| `{query}` | search request | The search text. |
| `{genres}` or any filter `id` | search request | The selected filter values. |
| `{manga_id}` | details and chapters requests | The id from the catalog result. |
| `{manga_url}` | details, chapters, and pages | The resolved details URL. |
| `{chapter_id}` | pages request | The chapter id. |
| `{chapter_url}` | pages request | The resolved chapter URL. |
| `{captured_url}` | `on_capture` requests | The intercepted request URL. |

## Required fields

Missing required fields fail when the operation runs, not at import.

**Catalog listings** (`trending`, `newest`, `search`): the top field is `results` of type `node`. Each item must yield `manga_id` (string), `manga_title` (string), and `manga_cover` (url).

**Details**: `manga_title` (string), `manga_description` (string), `manga_status` (string, mapped later), `manga_authors` (list), and `manga_tags` (list). Optional: `manga_cover` (url) and `manga_last_updated` (date). The app fills `manga_id` and `manga_url` itself.

**Chapters**: the top field is `chapters` of type `node`. Each item must yield `chapter_id` (string), `chapter_url` (url), `chapter_number` (double), and `chapter_uploaded_at` (date). Optional: `chapter_title` (string).

When the details page already contains the chapter list, give `chapters` the same request as `details`. Mangura then fetches the page once and runs both parsers on it.

**Pages**: the top field is `pages`. Use either a `node` whose `for_each` yields `page_url` (url) per image, or a `list` of image URLs. In the list case Mangura sends the chapter URL as the Referer.

## Search filters

```json
"filters": [
  {
    "id": "genres",
    "kind": "tags",
    "title": "Genres",
    "selection": "multiple",
    "options": [
      { "value": "action" },
      { "value": "12", "title": "Comedy" }
    ]
  }
]
```

`kind` must be `tags`. `selection` is `single` or `multiple`. Each option needs a `value`, and `title` defaults to the value. The filter `id` becomes a placeholder in the search request, usually paired with `collection_encoding` set to `repeat` or `joined`.

## Status mapping

The app lowercases the raw `manga_status` text and looks it up in `mapping.manga_status`. Allowed targets are `ongoing`, `completed`, `hiatus`, `cancelled`, and `unknown`. Raw values that already match one of these need no entry.

```json
"mapping": {
  "manga_status": {
    "releasing": "ongoing",
    "discontinued": "cancelled"
  }
}
```

## Complete example

This configuration describes a fictional site. Use it as a template and replace every selector and path with the ones from your site.

```json
{
  "id": "examplecomics",
  "name": "Example Comics",
  "version": 2,
  "logo": "https://example.com/icon.png",
  "base_url": "https://example.com/",
  "catalog": {
    "default_parser": {
      "response_type": "html",
      "results": {
        "type": "node",
        "expr": ".series-card",
        "for_each": {
          "manga_id": {
            "expr": "a.series-link",
            "attr": "href",
            "ops": [
              { "type": "regex_replace", "pattern": "^.*/series/", "value": "" },
              { "type": "trim" }
            ]
          },
          "manga_title": { "expr": ".series-title", "attr": "text" },
          "manga_cover": {
            "type": "url",
            "expr": "img.series-cover",
            "attr": "src",
            "headers": { "Referer": "{base_url}" }
          }
        }
      }
    },
    "trending": {
      "request": {
        "request_type": "html_request",
        "type": "relative",
        "base": "popular/",
        "method": "GET",
        "query_parameters": [ { "name": "page", "value": "{page}", "rules": ["startsAtOne"] } ],
        "headers": { "Referer": "{base_url}" }
      }
    },
    "newest": {
      "request": {
        "request_type": "html_request",
        "type": "relative",
        "base": "latest/",
        "method": "GET",
        "query_parameters": [ { "name": "page", "value": "{page}", "rules": ["startsAtOne"] } ],
        "headers": { "Referer": "{base_url}" }
      }
    },
    "search": {
      "request": {
        "request_type": "html_request",
        "type": "relative",
        "base": "search/",
        "method": "GET",
        "query_parameters": [
          { "name": "q", "value": "{query}", "rules": ["forceNonEmpty"] },
          { "name": "page", "value": "{page}", "rules": ["startsAtOne"] },
          { "name": "genre", "value": "{genres}", "collection_encoding": "repeat" }
        ],
        "headers": { "Referer": "{base_url}" }
      },
      "filters": [
        {
          "id": "genres",
          "kind": "tags",
          "title": "Genres",
          "selection": "multiple",
          "options": [
            { "value": "action", "title": "Action" },
            { "value": "comedy", "title": "Comedy" },
            { "value": "drama", "title": "Drama" }
          ]
        }
      ]
    }
  },
  "details": {
    "request": {
      "request_type": "html_request",
      "type": "relative",
      "base": "series/",
      "method": "GET",
      "path_parameters": [ { "value": "{manga_id}", "rules": ["forceNonEmpty"] } ],
      "headers": { "Referer": "{base_url}" }
    },
    "parser": {
      "response_type": "html",
      "manga_title": { "expr": "h1.series-name", "attr": "text" },
      "manga_description": { "expr": ".series-summary", "attr": "text", "ops": [ { "type": "trim" } ] },
      "manga_status": { "expr": ".series-status", "attr": "text", "ops": [ { "type": "trim" } ] },
      "manga_authors": { "type": "list", "expr": ".series-author a", "attr": "text" },
      "manga_tags": { "type": "list", "expr": ".series-genres a", "attr": "text" },
      "manga_cover": {
        "type": "url",
        "expr": "img.series-cover",
        "attr": "src",
        "headers": { "Referer": "{base_url}" }
      },
      "manga_last_updated": {
        "type": "date",
        "expr": ".series-updated",
        "attr": "text",
        "format": "yyyy-MM-dd"
      }
    }
  },
  "chapters": {
    "request": {
      "request_type": "html_request",
      "type": "relative",
      "base": "series/",
      "method": "GET",
      "path_parameters": [ { "value": "{manga_id}", "rules": ["forceNonEmpty"] } ],
      "headers": { "Referer": "{base_url}" }
    },
    "parser": {
      "response_type": "html",
      "chapters": {
        "type": "node",
        "expr": ".chapter-list li",
        "for_each": {
          "chapter_id": {
            "expr": "a",
            "attr": "href",
            "ops": [ { "type": "split", "pattern": "/" }, { "type": "extract_last" } ]
          },
          "chapter_url": { "type": "url", "expr": "a", "attr": "href" },
          "chapter_number": { "type": "double", "expr": "a", "attr": "data-number" },
          "chapter_title": { "expr": "a", "attr": "title" },
          "chapter_uploaded_at": {
            "type": "date",
            "expr": "time",
            "attr": "datetime",
            "format": "yyyy-MM-dd'T'HH:mm:ssZ"
          }
        }
      }
    }
  },
  "pages": {
    "request": {
      "request_type": "html_request",
      "type": "placeholder",
      "base": "chapter_url",
      "method": "GET",
      "headers": { "Referer": "{base_url}" }
    },
    "parser": {
      "response_type": "html",
      "pages": {
        "type": "node",
        "expr": ".reader img",
        "for_each": {
          "page_url": {
            "type": "url",
            "attr": "src",
            "headers": { "Referer": "{base_url}" }
          }
        }
      }
    }
  },
  "mapping": {
    "manga_status": {
      "releasing": "ongoing",
      "finished": "completed",
      "on hold": "hiatus",
      "dropped": "cancelled"
    }
  }
}
```

In this example `details` and `chapters` request the same page, so Mangura loads it once.

## Checklist

- The file is valid JSON.
- `version` is an integer, `id` is lowercase and unique, and `base_url` ends with `/`.
- `catalog.trending` and `catalog.search` exist, and every catalog operation has a `parser` or a `default_parser` exists.
- `details`, `chapters`, and `pages` each have both `request` and `parser`.
- Listing parsers produce `results` with `manga_id`, `manga_title`, and `manga_cover`.
- The chapters parser produces `chapters` with `chapter_id`, `chapter_url`, `chapter_number`, and `chapter_uploaded_at`.
- The pages parser produces `pages`.
- Every placeholder is available in the operation that uses it.
- Every `node` field has `for_each`, and every `date` field has a `format` unless the site uses ISO 8601 dates.
- `url` fields for covers and page images carry a `Referer` header when the site protects its images.
- Every `rules`, `request_type`, `type`, `method`, `attr`, and op `type` value comes from the lists on this page.

## Troubleshooting

| Symptom | Likely cause | What to check |
|---------|--------------|---------------|
| Import fails with a decoding error | Invalid JSON or a missing required key | Validate the file with a JSON checker and compare it with “File layout”. |
| Listing is empty | Selectors do not match | View the page source in a desktop browser. Mangura reads the returned HTML, not the page after scripts run. |
| Covers or pages do not load | Hotlink protection | Add `headers` with a `Referer` to the `url` field. |
| The same items repeat on every page | Wrong page arithmetic | Check `startsAtOne` and `multiplyBy(N)` on the page parameter. |
| The site shows a verification page | Bot protection | Mangura opens the site so you can complete the check, then retries. |
| A source that worked stops working | The site changed its markup or URLs | Update the selectors, increase `version`, and publish the file at the same URL. |

## What the format cannot express

- Request bodies, such as form posts or GraphQL queries.
- Values that the site computes in JavaScript, such as signed tokens, unless a captured request exposes them.
- Filters other than tag lists.
- Text transforms beyond the ten ops listed above.

If a site needs one of these, the format cannot describe it today. You can [open an issue](https://github.com/SutiApplications/mangura-legal/issues/new?labels=sources&title=Source%20format%20request) to describe the case. Do not include credentials, and do not name or link to sites you are not authorized to use.
