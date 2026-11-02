// api/search.js
const ENDPOINTS = {
  web: 'https://api.search.brave.com/res/v1/web/search',
  news: 'https://api.search.brave.com/res/v1/news/search',
  images: 'https://api.search.brave.com/res/v1/images/search',
  videos: 'https://api.search.brave.com/res/v1/videos/search',
};
const SAFE = ['off', 'moderate', 'strict'];
const FRESH = ['pd', 'pw', 'pm', 'py'];
const isHttp = u => /^https?:\/\//i.test(u || '');

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.BRAVE_API_KEY;
  if (!key) return res.status(500).json({ error: 'Search is not configured' });

  const q = String(req.query.q || '').trim().slice(0, 200);
  if (!q) return res.status(400).json({ error: 'Missing query' });

  const type = ENDPOINTS[req.query.type] ? req.query.type : 'web';
  const params = new URLSearchParams({
    q,
    count: String(Math.min(Math.max(parseInt(req.query.count) || 20, 1), 20)),
    offset: String(Math.min(Math.max(parseInt(req.query.offset) || 0, 0), 9)),
    safesearch: SAFE.includes(req.query.safesearch) ? req.query.safesearch : 'moderate',
  });
  if (/^[a-z]{2}$/i.test(req.query.country || '')) params.set('country', req.query.country.toUpperCase());
  if (FRESH.includes(req.query.freshness) && type !== 'images') params.set('freshness', req.query.freshness);

  try {
    const r = await fetch(`${ENDPOINTS[type]}?${params}`, {
      headers: { Accept: 'application/json', 'X-Subscription-Token': key },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return res.status(502).json({ error: `Search provider error (${r.status})` });

    const data = await r.json();
    const raw = type === 'web' ? data.web?.results : data.results;

    const results = (raw || [])
      .map(x => ({
        title: x.title || '',
        url: x.url || x.properties?.url || '',
        description: x.description || '',
        thumbnail: x.thumbnail?.src || '',
        source: x.meta_url?.hostname || '',
        age: x.age || x.page_age || '',
      }))
      .filter(x => isHttp(x.url));

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.json({ type, query: q, count: results.length, results });
  } catch (err) {
    console.error('Search failed:', err);
    return res.status(502).json({ error: 'Search failed. Try again.' });
  }
}