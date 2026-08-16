// Ported from reference/pipeline.mjs — same logic, adapted to run in a Cloudflare Pages Function
// (KV instead of a local file cache, no Node fs/CLI). Keep in sync if the categorization rules change.

// Prototype's category keys: food nature culture market nightlife activity stay transport neighborhood
const TYPE_TO_CAT = {
  restaurant: 'food', cafe: 'food', coffee_shop: 'food', bakery: 'food', food: 'food',
  meal_takeaway: 'food', meal_delivery: 'food', ice_cream_shop: 'food',
  bar: 'nightlife', night_club: 'nightlife',
  park: 'nature', national_park: 'nature', natural_feature: 'nature', hiking_area: 'nature',
  campground: 'nature', beach: 'nature',
  museum: 'culture', art_gallery: 'culture', tourist_attraction: 'culture', historical_landmark: 'culture',
  church: 'culture', place_of_worship: 'culture', hindu_temple: 'culture', mosque: 'culture',
  synagogue: 'culture', university: 'culture', library: 'culture', monument: 'culture', cultural_landmark: 'culture',
  shopping_mall: 'market', market: 'market', supermarket: 'market', department_store: 'market',
  store: 'market', clothing_store: 'market', flea_market: 'market',
  lodging: 'stay', hotel: 'stay', hostel: 'stay', resort_hotel: 'stay', bed_and_breakfast: 'stay',
  airport: 'transport', international_airport: 'transport', transit_station: 'transport',
  bus_station: 'transport', subway_station: 'transport', train_station: 'transport', light_rail_station: 'transport',
  locality: 'neighborhood', sublocality: 'neighborhood', neighborhood: 'neighborhood',
};

const KEYWORD_RULES = [
  [/airport|aeropuerto/i, 'transport'],
  [/museo|museum|gallery|galer|monumento?|catedral|cathedral|iglesia|church|santuario|universi|library|biblioteca|plaza|candelaria/i, 'culture'],
  [/mall|mercado|market|shopping|comercial|flea|victorino/i, 'market'],
  [/hostel|hotel|viajero|airbnb|hospedaje|lodge/i, 'stay'],
  [/park|parque|falls?|lago?|beach|playa|island|isla|trail|cerro|natural|tayrona|glacier|monserrate|point|lineal|frontera/i, 'nature'],
  [/club|theatron|music hall|discoteca|\bbar\b|pagano|goce/i, 'nightlife'],
  [/cafe|caf[eé]|coffee|restaurante?|crepes|waffles|grill|bbq|pizz|goce|champi|mondongo|matuca|chato|abbiocco|salvo|tierra|soloio|provenza/i, 'food'],
  [/bike|tour|trek|run club/i, 'activity'],
];

export function keywordCat(name) {
  for (const [re, cat] of KEYWORD_RULES) if (re.test(name)) return cat;
  return 'activity';
}

export function typesToCat(types = []) {
  for (const t of types) if (TYPE_TO_CAT[t]) return TYPE_TO_CAT[t];
  return null;
}

export function extractIds(url = '') {
  const m = url.match(/!1s(0x[0-9a-f]+):(0x[0-9a-f]+)/i);
  if (!m) return { featureId: null, cid: null };
  let cid = null;
  try { cid = BigInt(m[2]).toString(10); } catch { /* leave null */ }
  return { featureId: `${m[1]}:${m[2]}`, cid };
}

export const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

export function cityFrom(place) {
  const comps = place?.addressComponents || [];
  const pick = t => comps.find(c => c.types?.includes(t))?.longText;
  return pick('locality') || pick('administrative_area_level_2') || pick('administrative_area_level_1') || null;
}

export async function geocode(query, { apiKey, region, lang = 'en' }) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': [
        'places.id', 'places.location', 'places.displayName',
        'places.formattedAddress', 'places.types', 'places.addressComponents',
      ].join(','),
    },
    body: JSON.stringify({ textQuery: query, regionCode: region || undefined, languageCode: lang }),
  });
  if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.places?.[0] || null;
}

// One row ({ name, note, url }) -> a resolved place fragment (no id/trip yet — caller assigns those).
export async function resolveRow(row, { apiKey, region, lang, tripLabel, cache }) {
  const { cid } = extractIds(row.url);
  const query = region ? `${row.name}, ${tripLabel}` : row.name;
  const cacheKey = cid || norm(row.name);

  let cached = null;
  if (cache) {
    const hit = await cache.get(cacheKey, 'json');
    if (hit) cached = hit;
  }

  if (cached) {
    return { ...cached, name: row.name, note: row.note, cid, needsReview: false };
  }

  try {
    const p = await geocode(query, { apiKey, region, lang });
    if (!p) {
      return { lat: null, lng: null, city: null, cat: keywordCat(row.name), name: row.name, note: row.note, cid, needsReview: true };
    }
    const resolved = {
      lat: p.location.latitude,
      lng: p.location.longitude,
      city: cityFrom(p),
      cat: typesToCat(p.types) || keywordCat(row.name),
    };
    const a = norm(p.displayName?.text), b = norm(row.name);
    const needsReview = !(a.includes(b) || b.includes(a));
    if (cache && !needsReview) await cache.put(cacheKey, JSON.stringify(resolved));
    return { ...resolved, name: row.name, note: row.note, cid, needsReview };
  } catch (e) {
    return { lat: null, lng: null, city: null, cat: keywordCat(row.name), name: row.name, note: row.note, cid, needsReview: true, error: e.message };
  }
}
