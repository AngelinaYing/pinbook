# Pinbook — orientation for Claude

Read this first in any new session on this repo — it front-loads the context a fresh session won't have.

## What this is

Pinbook turns a Google Maps "Saved places" Takeout export into a personal, shareable travel map. The user (Angie) is building this as both a real product and a portfolio piece. She's technical (CS background, uses Claude Code daily) but wants **fully spelled-out step-by-step instructions for one-off account/CLI auth flows** (`wrangler login`, `gh auth login`, git config) — don't just hand her a bare command, write out each prompt and the exact choice to make.

Full product spec, phased framework (Discovery → Planning → Building → Polish → Handoff), and the original hand-off files are in this repo's git history (first commit) — read `git log` if you need the original brief verbatim.

## Where things actually live

- **Live site:** https://pinbook-bd9.pages.dev
- **Repo:** https://github.com/AngelinaYing/pinbook (public)
- **Cloudflare Pages project:** `pinbook` (account: angelinayyt@gmail.com)
- **KV namespaces:** `GEOCODE_CACHE` (CID → resolved place, shared/permanent cache) and `MAPS` (shareId → finished map JSON) — ids are in `wrangler.toml`
- **Secrets:** `GOOGLE_MAPS_KEY` lives as a Cloudflare Pages secret (production env) and in the user's local `.dev.vars` (gitignored). **Never** ask the user to paste it into chat — if it's needed for a shell command, pipe it from `.dev.vars` directly (see git log for the pattern used during setup) so it never enters your own output.

## Architecture (read `README.md` for the full run/deploy guide)

Static frontend (`public/`) + Cloudflare Pages Functions (`functions/api/`) + two KV namespaces. No separate backend, no database, no build step, no framework — deliberately simple. `functions/_lib/pipeline.js` is a port of the original standalone `reference/pipeline.mjs` CLI script, adapted to run in the Workers runtime (KV instead of a local file cache).

`public/app.js` is one file holding all client state and rendering — it runs in three modes (`state.viewer`, `isDemo`, or plain live-import) that share the same render/map code. Read the top of the file (state vars) before editing rendering logic.

## Decisions already made — don't re-litigate these without asking

- No user accounts, no login, no photos (v1 scope, explicit from the original brief).
- Shared map links are **read-only snapshots filtered to visited-only places** (not live/editable by viewers) — this was Claude's call during Phase 3, based on wording already in the prototype's share modal, flagged to the user afterward rather than asked upfront. Confirmed acceptable since no pushback.
- **v1 is one trip per shareable map.** Uploading multiple CSVs into one multi-trip map (like the demo shows) is a known, deliberately deferred v2 feature — see `ROADMAP.md`.
- The demo dataset (`PLACES_DEMO` / `DEMO_RATINGS` in `app.js`) is intentionally curated/embellished, not the user's real original data — Colombia '24 was deleted entirely per explicit request, and ratings/comments on ~28 places were invented to make the demo look lived-in. Treat it as fair game to keep editing for polish, it's not sacred data.

## Before you touch account/infra state

Creating KV namespaces, setting secrets, deploying, or pushing to GitHub are all real actions against the user's live accounts — this project is **already live and public**, so redeploys are low-risk (just updates the live site) but always deploy from a clean `git status` and push to `main` after, don't let the working tree and deployed site drift apart silently.

## Known gaps worth surfacing proactively if relevant

- `/api/import` and `/api/maps` are open, unauthenticated POST endpoints — no rate limiting. Fine for a portfolio-scale project, but flag it if traffic ever becomes a real concern (Google Places API costs could accumulate from abuse).
- No Open Graph/Twitter meta tags — a shared Pinbook link has no rich preview card on social/iMessage. Cheap, high-value fix, see `ROADMAP.md`.

Full run/change/deploy instructions: `README.md`. Full v2 idea list and known limitations: `ROADMAP.md`.
