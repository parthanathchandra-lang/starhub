const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS"
};
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...CORS }
  });

export async function onRequest({ request, env }) {
  if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (!env.GAME_HUB_KV) return json({ error: "KV binding missing" }, 500);

  const key = new URL(request.url).searchParams.get("key");
  if (!key || !/^[a-zA-Z0-9:_-]{1,128}$/.test(key)) return json({ error: "bad key" }, 400);

  if (request.method === "GET") {
    const value = await env.GAME_HUB_KV.get(key);
    return json({ key, value });
  }

  if (request.method === "PUT") {
    const auth = request.headers.get("Authorization") || "";
    if (!env.ADMIN_TOKEN || auth !== `Bearer ${env.ADMIN_TOKEN}`) {
      return json({ error: "unauthorized" }, 401);
    }
    const body = await request.text();
    if (body.length > 64 * 1024) return json({ error: "too large" }, 413);
    await env.GAME_HUB_KV.put(key, body);
    return json({ ok: true, key });
  }

  return json({ error: "method not allowed" }, 405);
}