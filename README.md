# Pinbook

Turn a Google Maps "saved places" export into a personal, shareable travel map — grouped by city, with your own notes and ratings, not just a flat list of links.

**Live:** https://pinbook-bd9.pages.dev

## How it works

1. Export your **Saved** places from Google Maps via [Google Takeout](https://takeout.google.com) (CSV).
2. Drop the CSV into Pinbook. A server-side function extracts each place's Google CID from its Maps URL and geocodes it via the Places API (New).
3. Review the results, grouped by city — uncheck anything you didn't actually visit, fix or drop anything that didn't match confidently.
4. Rate and add notes to the places you visited, then generate a link. Anyone with the link sees a read-only map of your visited places.

## Stack

- **Frontend:** static HTML/CSS/JS + [Leaflet](https://leafletjs.com/) — no build step, no framework.
- **Backend:** [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) — one project, one deploy, file-based API routes.
- **Storage:** Cloudflare KV — one namespace caches geocode results by CID (free re-imports), one stores finished shareable maps.
- **Geocoding:** Google Places API (New), Text Search.

```
public/              static site (index.html, app.js, style.css)
functions/api/       import.js (CSV rows -> geocoded places), maps/ (create + fetch shared maps)
functions/_lib/      shared geocoding logic, ported from reference/pipeline.mjs
reference/           the original hand-built prototype + CLI pipeline this project was built from
fixtures/            real sample Takeout CSVs used for testing
```

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars   # then add your own Google Places API key
npm run dev                       # wrangler pages dev, http://localhost:8788
```

Requires a [Google Cloud project with the Places API (New) enabled](https://console.cloud.google.com/) and billing configured (usage at this scale is effectively free).

## Deploy

```bash
npx wrangler kv namespace create GEOCODE_CACHE   # once, then paste the id into wrangler.toml
npx wrangler kv namespace create MAPS            # once, then paste the id into wrangler.toml
npx wrangler pages secret put GOOGLE_MAPS_KEY --project-name=pinbook
npm run deploy
```

## Status

v1: upload → review → live map → shareable link. See [`reference/`](reference/) for the original prototype and CLI pipeline this was built on top of. No accounts, no photos — see project notes for what's next.
