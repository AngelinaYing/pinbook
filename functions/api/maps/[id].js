export async function onRequestGet({ params, env }) {
  const raw = await env.MAPS.get(params.id);
  if (!raw) return json({ error: 'Map not found.' }, 404);
  return new Response(raw, { headers: { 'Content-Type': 'application/json' } });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
