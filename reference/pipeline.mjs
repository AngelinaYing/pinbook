#!/usr/bin/env node
/**
 * Pinbook ingestion pipeline
 * Google Takeout "Saved" CSV  ->  the `places[]` array the map prototype consumes.
 *
 * Stages:  parse -> clean -> extract IDs (CID) -> geocode (Places Text Search) -> categorize -> emit
 *
 * Usage:
 *   Dry run (no API, parses + previews queries/categories on the real file):
 *     node pipeline.mjs Colombia_2025.csv --trip=colombia2025 --region=CO
 *
 *   Full run (resolves coordinates via Google Places API New):
 *     node pipeline.mjs Colombia_2025.csv --key=YOUR_KEY --trip=colombia2025 \
 *          --label="Colombia '25" --region=CO --out=places.js
 *
 * The geocode step is cached by CID in .geocode-cache.json, so re-runs cost nothing.
 */
import { parse } from 'csv-parse/sync';
import fs from 'node:fs';

// ── CLI ────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).filter(a => a.startsWith('--'))
    .map(a => { const [k, ...v] = a.replace(/^--/, '').split('='); return [k, v.join('=') || true]; })
);
const csvPath = process.argv.slice(2).find(a => !a.startsWith('--'));
if (!csvPath) { console.error('Pass a CSV path. See header for usage.'); process.exit(1); }

const TRIP     = args.trip   || 'trip1';
const LABEL    = args.label  || TRIP;
const REGION   = args.region || undefined;         // ISO code, e.g. CO — biases Places results
const LANG     = args.lang   || 'en';
const OUT       = args.out    || 'places.js';
const API_KEY  = args.key    || process.env.GOOGLE_MAPS_KEY || null;
const CACHE    = '.geocode-cache.json';

// ── Category maps ──────────────────────────────────────────────────────────
// Prototype's category keys: food nature culture market nightlife activity stay transport neighborhood
const TYPE_TO_CAT = {
  restaurant:'food', cafe:'food', coffee_shop:'food', bakery:'food', food:'food',
  meal_takeaway:'food', meal_delivery:'food', ice_cream_shop:'food',
  bar:'nightlife', night_club:'nightlife',
  park:'nature', national_park:'nature', natural_feature:'nature', hiking_area:'nature',
  campground:'nature', beach:'nature',
  museum:'culture', art_gallery:'culture', tourist_attraction:'culture', historical_landmark:'culture',
  church:'culture', place_of_worship:'culture', hindu_temple:'culture', mosque:'culture',
  synagogue:'culture', university:'culture', library:'culture', monument:'culture', cultural_landmark:'culture',
  shopping_mall:'market', market:'market', supermarket:'market', department_store:'market',
  store:'market', clothing_store:'market', flea_market:'market',
  lodging:'stay', hotel:'stay', hostel:'stay', resort_hotel:'stay', bed_and_breakfast:'stay',
  airport:'transport', international_airport:'transport', transit_station:'transport',
  bus_station:'transport', subway_station:'transport', train_station:'transport', light_rail_station:'transport',
  locality:'neighborhood', sublocality:'neighborhood', neighborhood:'neighborhood',
};
// Rough name-based fallback — only used in dry mode / when Places returns no usable type.
const KEYWORD_RULES = [
  [/airport|aeropuerto/i,                                              'transport'],
  [/museo|museum|gallery|galer|monumento?|catedral|cathedral|iglesia|church|santuario|universi|library|biblioteca|plaza|candelaria/i, 'culture'],
  [/mall|mercado|market|shopping|comercial|flea|victorino/i,          'market'],
  [/hostel|hotel|viajero|airbnb|hospedaje|lodge/i,                     'stay'],
  [/park|parque|falls?|lago?|beach|playa|island|isla|trail|cerro|natural|tayrona|glacier|monserrate|point|lineal|frontera/i, 'nature'],
  [/club|theatron|music hall|discoteca|\bbar\b|pagano|goce/i,          'nightlife'],
  [/cafe|caf[eé]|coffee|restaurante?|crepes|waffles|grill|bbq|pizz|goce|champi|mondongo|matuca|chato|abbiocco|salvo|tierra|soloio|provenza/i, 'food'],
  [/bike|tour|trek|run club/i,                                        'activity'],
];
function keywordCat(name) {
  for (const [re, cat] of KEYWORD_RULES) if (re.test(name)) return cat;
  return 'activity';
}
function typesToCat(types = []) {
  for (const t of types) if (TYPE_TO_CAT[t]) return TYPE_TO_CAT[t];
  return null;
}

// ── ID extraction: pull the Feature ID / CID out of the /data=!1s… URL ──────
function extractIds(url = '') {
  const m = url.match(/!1s(0x[0-9a-f]+):(0x[0-9a-f]+)/i);
  if (!m) return { featureId: null, cid: null };
  let cid = null;
  try { cid = BigInt(m[2]).toString(10); } catch { /* leave null */ }
  return { featureId: `${m[1]}:${m[2]}`, cid };
}

// ── Places API (New) Text Search ────────────────────────────────────────────
async function geocode(query) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': [
        'places.id', 'places.location', 'places.displayName',
        'places.formattedAddress', 'places.types', 'places.addressComponents',
      ].join(','),
    },
    body: JSON.stringify({ textQuery: query, regionCode: REGION, languageCode: LANG }),
  });
  if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.places?.[0] || null;
}

function cityFrom(place) {
  const comps = place?.addressComponents || [];
  const pick = t => comps.find(c => c.types?.includes(t))?.longText;
  return pick('locality') || pick('administrative_area_level_2') || pick('administrative_area_level_1') || null;
}
const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

// ── Pipeline ────────────────────────────────────────────────────────────────
const raw  = fs.readFileSync(csvPath, 'utf8');
const rows = parse(raw, { columns: true, skip_empty_lines: true, relax_column_count: true, trim: true })
  .filter(r => r.Title && r.Title.trim())      // drop the blank spacer row
  .map(r => ({ name: r.Title.trim(), note: (r.Note || '').trim(), url: (r.URL || '').trim() }));

const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
const cidHits = rows.filter(r => extractIds(r.url).cid).length;

console.log(`\n  parsed:        ${rows.length} places`);
console.log(`  CID extracted: ${cidHits}/${rows.length} (${Math.round(cidHits / rows.length * 100)}%)`);
console.log(`  mode:          ${API_KEY ? 'GEOCODE (live Places API)' : 'DRY RUN (no --key)'}\n`);

const places = [];
let id = 0, reviewCount = 0, apiCalls = 0;

for (const r of rows) {
  id += 1;
  const { featureId, cid } = extractIds(r.url);
  const query = REGION ? `${r.name}, ${LABEL.replace(/['’]\d+$/, '').trim()}` : r.name;
  const cacheKey = cid || norm(r.name);

  let lat = null, lng = null, city = null, placeId = null, address = null, cat = null, needsReview = false;

  if (API_KEY) {
    if (cache[cacheKey]) {
      ({ lat, lng, city, placeId, address, cat } = cache[cacheKey]);
    } else {
      try {
        const p = await geocode(query);
        apiCalls += 1;
        if (p) {
          lat = p.location.latitude; lng = p.location.longitude;
          placeId = p.id; address = p.formattedAddress;
          city = cityFrom(p);
          cat = typesToCat(p.types) || keywordCat(r.name);
          // low-confidence flag: returned name barely resembles the saved name
          const a = norm(p.displayName?.text), b = norm(r.name);
          needsReview = !(a.includes(b) || b.includes(a));
          cache[cacheKey] = { lat, lng, city, placeId, address, cat };
        } else {
          needsReview = true;
        }
      } catch (e) {
        console.error(`  ! ${r.name}: ${e.message.split('\n')[0]}`);
        needsReview = true;
      }
    }
  } else {
    cat = keywordCat(r.name);          // dry-run preview only
  }

  if (needsReview) reviewCount += 1;
  places.push({ id, trip: TRIP, name: r.name, cat: cat || 'activity',
    lat, lng, note: r.note, city, placeId, cid, needsReview });
}

if (API_KEY) fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));

// ── Output ──────────────────────────────────────────────────────────────────
if (API_KEY) {
  const clean = places.map(({ id, trip, name, cat, lat, lng, note, city }) =>
    ({ id, trip, name, cat, lat, lng, note, city }));
  fs.writeFileSync(OUT, `const places = ${JSON.stringify(clean, null, 2)};\n`);
  fs.writeFileSync('places.json', JSON.stringify(places, null, 2));
  console.log(`  geocoded:      ${places.length - reviewCount}/${places.length} confident`);
  console.log(`  needs review:  ${reviewCount}`);
  console.log(`  API calls:     ${apiCalls} (rest cached)`);
  console.log(`  wrote:         ${OUT}  +  places.json\n`);
} else {
  // Dry run: show what WOULD be sent, and the rough categories, on the real data
  console.log('  name'.padEnd(38) + 'cat(kw)'.padEnd(12) + 'CID');
  console.log('  ' + '-'.repeat(72));
  for (const p of places)
    console.log('  ' + p.name.slice(0, 34).padEnd(36) + (p.cat).padEnd(12) + (p.cid || '—'));
  fs.writeFileSync('queries-preview.json', JSON.stringify(
    places.map(p => ({ name: p.name, cid: p.cid,
      query: REGION ? `${p.name}, ${LABEL.replace(/['’]\d+$/, '').trim()}` : p.name })), null, 2));
  console.log(`\n  wrote queries-preview.json — add --key=… to resolve coordinates.\n`);
}
