# Pinbook ingestion pipeline

Turns a Google Takeout **Saved** CSV into the `places[]` array your map prototype consumes.

```
parse → clean → extract CID → geocode (Places Text Search) → categorize → emit
```

## Run it

**Dry run** — parses, extracts CIDs, previews queries + rough categories. No API key, no cost:

```bash
node pipeline.mjs Colombia_2025.csv --trip=colombia2025 --label="Colombia '25" --region=CO
```

**Full run** — resolves real coordinates via the Google Places API (New):

```bash
node pipeline.mjs Colombia_2025.csv \
  --key=YOUR_GOOGLE_MAPS_KEY \
  --trip=colombia2025 --label="Colombia '25" --region=CO \
  --out=places.js
```

Produces `places.js` (a drop-in `const places = […]`) and `places.json`.

## Flags

| flag | meaning |
|------|---------|
| `--key` | Google Maps API key (or set `GOOGLE_MAPS_KEY`). Omit → dry run. |
| `--trip` | trip slug, e.g. `colombia2025` (matches the prototype's `TRIPS`) |
| `--label` | display label, e.g. `"Colombia '25"` |
| `--region` | ISO country code, e.g. `CO` — biases geocoding, big accuracy win |
| `--out` | output filename (default `places.js`) |

## What each stage does

- **Parse** — uses `csv-parse`, so multi-line quoted notes (your Usaquén entry) and
  commas inside fields (Plaza Botero) are read correctly. The file is valid CSV; only
  naive `split(',')` breaks it.
- **CID** — pulls the Feature ID / CID out of each `…/data=!1s0x…:0x…` URL. Used as a
  stable cache key and a tiebreaker for ambiguous names. (Google has no public
  CID→coordinates endpoint, so it is *not* the coordinate source.)
- **Geocode** — Places API (New) Text Search on `name, <region>`. Returns coordinates,
  place ID, address, and `types` in one call. Cached by CID in `.geocode-cache.json`,
  so re-runs cost nothing and you never re-bill a place.
- **Categorize** — maps Google `types` → your prototype categories
  (food/nature/culture/market/nightlife/activity/stay/transport/neighborhood),
  with a name-keyword fallback.
- **Confidence** — if the returned name barely matches the saved name, the place is
  flagged `needsReview: true` for your confirm/fix step.

## Notes

- Cost at your scale is negligible: ~41 calls per import, all cached after the first run.
- Setup: `npm install` (only dependency is `csv-parse`).
