export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret || req.headers["x-webhook-secret"] !== secret) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/webhook_events`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      source: String(req.headers["x-source"] || "unknown").slice(0, 64),
      payload: req.body ?? {}
    })
  });

  if (!r.ok) return res.status(502).json({ error: "storage failed" });
  return res.status(200).json({ ok: true });
}