# Pinbook

Turn a Google Maps "saved places" export into a personal, shareable travel map — grouped by city, with your own notes and ratings, not just a flat list of links.

**Live:** https://pinbook-bd9.pages.dev
**Repo:** https://github.com/AngelinaYing/pinbook

## How it works

1. Export your **Saved** places from Google Maps via [Google Takeout](https://takeout.google.com) (CSV).
2. Drop the CSV into Pinbook, name the trip. A server-side function extracts each place's Google CID from its Maps URL and geocodes it via the Places API (New).
3. Review the results, grouped by city — uncheck anything you didn't actually visit (it stays on the map, just faded), fix or drop anything that didn't match confidently.
4. Rate and add notes to the places you visited, then hit **Share Map**. Anyone with the link sees a read-only map of your visited places.

## Stack

- **Frontend:** static HTML/CSS/JS + [Leaflet](https://leafletjs.com/) — no build step, no framework.
- **Backend:** [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) — one project, one deploy, file-based API routes.
- **Storage:** Cloudflare KV — one namespace caches geocode results by CID (free re-imports), one stores finished shareable maps.
- **Geocoding:** Google Places API (New), Text Search.

```
public/
  index.html          landing + review screen + app shell (all three "pages" in one file, toggled via CSS classes)
  app.js              all client state + rendering — three modes share one render path: demo, live import, viewer (shared link)
  style.css           includes a full mobile breakpoint at the bottom (@media max-width: 760px)
functions/
  api/import.js        POST: CSV rows -> geocoded places (calls Google Places API, caches by CID in KV)
  api/maps/index.js     POST: persist a finished map, returns a shareId + URL
  api/maps/[id].js       GET: fetch a shared map by id
  _lib/pipeline.js      geocoding/categorization logic, ported from reference/pipeline.mjs for the Workers runtime
  _lib/id.js             short shareId generator
reference/            the original hand-built prototype (Prototype.html) + CLI pipeline (pipeline.mjs) this app was built from
fixtures/              real sample Takeout CSVs (Colombia, Yosemite) used for testing
```

## Run it locally

```bash
npm install
cp .dev.vars.example .dev.vars   # then edit .dev.vars and paste in your own Google Places API key
npm run dev                       # wrangler pages dev, http://localhost:8788
```

Requires a Google Cloud project with **Places API (New)** enabled and billing configured (usage at this scale — dozens of calls per import, cached by CID — is effectively free, but Google requires a card on file). Create a key at [console.cloud.google.com](https://console.cloud.google.com/) → APIs & Services → Credentials, restrict it to Places API (New).

**Never commit `.dev.vars` or paste the key anywhere public** — it's already gitignored.

## Deploy

Deploys are manual (`wrangler pages deploy`), not CI/CD — there's no GitHub Actions workflow wired up. Every deploy is a conscious command:

```bash
git push                          # keep GitHub in sync — the deployed site and the repo should never silently drift apart
npx wrangler pages deploy public
```

One-time setup (already done for the live project, only needed again for a fresh Cloudflare account/project):

```bash
npx wrangler kv namespace create GEOCODE_CACHE   # paste the returned id into wrangler.toml
npx wrangler kv namespace create MAPS            # paste the returned id into wrangler.toml
npx wrangler pages project create pinbook
npx wrangler pages secret put GOOGLE_MAPS_KEY --project-name=pinbook   # pastes the key straight to Cloudflare, never into your shell history if piped from a file
```

## Common changes — where to look

| I want to... | Edit |
|---|---|
| Change hero copy, landing page text | `public/index.html` |
| Change colors, spacing, add a breakpoint | `public/style.css` — mobile rules are one block at the bottom |
| Change map/pin behavior, ratings, review screen logic | `public/app.js` |
| Change how a place gets categorized (food/nature/culture/...) | `functions/_lib/pipeline.js` → `TYPE_TO_CAT` (Google types) and `KEYWORD_RULES` (name-based fallback) |
| Change the demo dataset | `public/app.js` → `PLACES_DEMO` and `DEMO_RATINGS` near the top |
| Change what a shared map stores/shows | `functions/api/maps/index.js` (save) and `public/app.js` → `loadViewerData()` (load) |
| Add a new API route | New file under `functions/api/` — Cloudflare Pages uses file-based routing automatically, `[id].js` = dynamic segment |

After any change: `npm run dev` and click through the actual flow in a browser before deploying — there's no automated test suite.

## Maintaining it

- **Rotate the Google API key:** generate a new one in Google Cloud Console, restrict it to Places API (New), then `npx wrangler pages secret put GOOGLE_MAPS_KEY --project-name=pinbook` with the new value, then redeploy so the change definitely takes.
- **Check usage/cost:** Google Cloud Console → APIs & Services → Places API (New) → Metrics. Cloudflare Pages/Functions/KV usage: Cloudflare dashboard → the `pinbook` project. Both are comfortably inside free tiers at portfolio-project traffic levels.
- **See what's stored:** `npx wrangler kv key list --namespace-id=<id>` (ids are in `wrangler.toml`) to list geocode cache entries or saved maps; `npx wrangler kv key get <key> --namespace-id=<id>` to inspect one.
- **No rate limiting exists yet** on `/api/import` or `/api/maps` — see `ROADMAP.md` if this ever needs addressing.

## Troubleshooting

- **"Server is missing GOOGLE_MAPS_KEY"** — the secret isn't set for the environment you're hitting. Locally, check `.dev.vars` exists and has the right line. In production, `npx wrangler pages secret list --project-name=pinbook` to confirm it's set, and note secrets only apply to *new* deployments after they're set — redeploy if you just added one.
- **A place resolves to totally the wrong location** — almost always the `region` field was left blank or the trip label doesn't read as a real place/region hint (the text query sent to Google is `"<place name>, <trip label>"`). Use a real region code and a trip label that's actually a place name.
- **Changes not showing on the live site** — confirm you ran `npx wrangler pages deploy public` after your last commit; git push alone does not deploy anything (no CI is wired up).

## Status & what's next

v1 shipped: upload → review → live map → real shareable link, deployed, mobile-responsive, public repo. See [`ROADMAP.md`](ROADMAP.md) for known limitations and v2 ideas — start there when picking this back up.
