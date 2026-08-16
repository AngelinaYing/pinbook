import { resolveRow } from '../_lib/pipeline.js';

const MAX_ROWS = 300;

export async function onRequestPost({ request, env }) {
  if (!env.GOOGLE_MAPS_KEY) {
    return json({ error: 'Server is missing GOOGLE_MAPS_KEY.' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Expected JSON body.' }, 400);
  }

  const { trip, label, region, rows } = body || {};
  if (!trip || !Array.isArray(rows) || !rows.length) {
    return json({ error: 'Missing trip slug or rows.' }, 400);
  }
  if (rows.length > MAX_ROWS) {
    return json({ error: `That's ${rows.length} places — v1 caps imports at ${MAX_ROWS}.` }, 400);
  }

  const tripLabel = (label || trip).replace(/['’]\d+$/, '').trim();
  const cache = env.GEOCODE_CACHE;

  const places = [];
  let needsReviewCount = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row.name) continue;
    const resolved = await resolveRow(row, {
      apiKey: env.GOOGLE_MAPS_KEY,
      region,
      lang: 'en',
      tripLabel,
      cache,
    });
    if (resolved.needsReview) needsReviewCount++;
    places.push({ id: i + 1, trip, ...resolved });
  }

  return json({
    places,
    stats: { total: places.length, needsReview: needsReviewCount },
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
