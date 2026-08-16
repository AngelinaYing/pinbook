# Roadmap & known limitations

Where Pinbook stands after v1 (upload → review → live map → real shareable link, deployed, mobile-responsive) and what's worth doing next. Pick from here when picking the project back up in a new session.

## Known limitations (v1, by design or by not-yet)

- **One trip per shareable map.** Uploading multiple CSVs into a single map with multiple trip tabs — like the demo showcases — isn't wired up yet. The data model already supports it (`places[]` has a `trip` field, `TRIPS` is keyed by slug); it needs an "add another trip" step in the upload/review flow before saving, plus letting `/api/maps` accept an existing shareId to append to instead of always creating new.
- **Shared links are read-only**, filtered to visited places only. This was a judgment call made during the build (matched wording already in the prototype's share modal), not an explicit spec requirement — worth deciding for real: should the person who made a map be able to open their own link and keep editing it, rather than only editing from the original browser session that created it?
- **No accounts.** By design for v1. Means: no way to edit a map after the browser tab/session that made it is gone (nothing to log back into), and no "my maps" list — you have to keep the share link yourself.
- **No rate limiting** on `/api/import` (calls the paid-above-free-tier Google Places API) or `/api/maps` (writes to KV). Fine at portfolio-project traffic. If this ever gets shared somewhere with real traffic, worth adding basic abuse protection (Cloudflare has a built-in rate-limiting rule you can add in the dashboard with no code changes, or a Turnstile captcha on the upload form).
- **No expiration on shared maps.** `MAPS` KV entries live forever. Not a cost problem at this scale (KV free tier is generous), but there's no cleanup story if it ever needed one.
- **No Open Graph / Twitter Card meta tags.** Sharing a Pinbook link in iMessage/Slack/Twitter shows a bare URL, no preview image or description. Cheap, high-value fix — a few `<meta property="og:...">` tags in `index.html`, ideally with a dynamic preview (place count, trip name) which would need the Function to serve different meta tags per shareId, or a simpler static fallback.
- **No photos.** Explicit v1 cut.

## v2 ideas, roughly in order of "probably worth doing next"

1. **Open Graph tags** — small effort, makes every shared link look like a real product instead of a bare link.
2. **Multi-trip maps** — the single biggest gap between the demo's charm (trip tabs, multiple destinations) and what a real upload currently produces.
3. **Decide the read-only-vs-editable share question** above, deliberately rather than by default.
4. **"My map" persistence for the creator** — even without full accounts, something like a signed edit-token in localStorage tied to a shareId so the person who made a map can come back and edit it from the same browser, without needing a login system.
5. **CSV edge cases** — the pipeline assumes one clean Takeout "Saved" CSV. Real Takeout exports can include multiple named lists; worth testing what happens with lists that have different column layouts or non-English Google account locales.
6. **Rate limiting / abuse protection**, once/if this gets real outside traffic.
7. **Custom domain**, once the user wants one instead of the free `pages.dev` subdomain.
8. **Mobile polish pass 2** — the responsive breakpoint added in Phase 4 is functional but hasn't been stress-tested on notch/safe-area devices, landscape orientation, or very small (< 360px) screens.
9. **Photos** — explicitly deferred, but the biggest "wow" feature likely left on the table for a travel-blog product.

## Explicitly not planned unless requested

- User accounts / login (deliberate v1-and-beyond simplicity choice, revisit only if multi-map management becomes a real need)
- Any backend beyond Cloudflare Pages Functions + KV (works fine at this scale; a real database would only make sense with accounts)
