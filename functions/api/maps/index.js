import { generateId } from '../../_lib/id.js';

const MAX_PLACES = 500;

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Expected JSON body.' }, 400);
  }

  const { trips, places } = body || {};
  if (!trips || typeof trips !== 'object' || !Array.isArray(places) || !places.length) {
    return json({ error: 'Missing trips or places.' }, 400);
  }
  if (places.length > MAX_PLACES) {
    return json({ error: `That's ${places.length} places — v1 caps a map at ${MAX_PLACES}.` }, 400);
  }

  const payload = { trips, places, createdAt: new Date().toISOString() };

  let id;
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = generateId();
    const existing = await env.MAPS.get(candidate);
    if (!existing) { id = candidate; break; }
  }
  if (!id) return json({ error: 'Could not allocate a share id, try again.' }, 500);

  await env.MAPS.put(id, JSON.stringify(payload));

  const url = new URL(request.url);
  const shareUrl = `${url.origin}/?m=${id}`;
  return json({ id, url: shareUrl });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
