// api/search.js
const isHttp = u => /^https?:\/\//i.test(u || '');
const clamp = (n, lo, hi, d) => Number.isFinite(n) ? Math.min(Math.max(n, lo), hi) : d;
const SAFE = ['off', 'moderate', 'strict'];
const FRESH = ['pd', 'pw', 'pm', 'py'];
const TYPES = ['web', 'news', 'images', 'videos'];
const TIME = { pd: 'day', pw: 'week', pm: 'month', py: 'year' };
const SEARX_CAT = { web: 'general', news: 'news', images: 'images', videos: 'videos' };
const BRAVE = {
  web: 'https://api.search.brave.com/res/v1/web/search',
  news: 'https://api.search.brave.com/res/v1/news/search',
  images: 'https://api.search.brave.com/res/v1/images/search',
  videos: 'https://api.search.brave.com/res/v1/videos/search',
};

const item = (o) => ({
  title: o.title || '',
  url: o.url || '',
  thumbnail: o.thumbnail || '',
  description: o.description || '',
  source: o.source || '',
  age: o.age || '',
  engine: o.engine,
});
const host = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

async function getJson(url, opts = {}) {
  const r = await fetch(url, { ...opts, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(`${r.status}`);
  return r.json();
}

// 1. SearXNG: your own instance(s), comma-separated in SEARX_URLS
async function fromSearx({ q, type, page, safe, time }) {
  const bases = (process.env.SEARX_URLS || '').split(',').map(s => s.trim()).filter(Boolean);
  for (const base of bases) {
    try {
      const u = new URL('/search', base);
      u.search = new URLSearchParams({
        q, format: 'json', categories: SEARX_CAT[type], pageno: String(page),
        safesearch: String(SAFE.indexOf(safe)), ...(time && { time_range: time }),
      });
      const j = await getJson(u);
      return (j.results || []).map(r => item({
        title: r.title, url: r.url, thumbnail: r.thumbnail || r.img_src,
        description: r.content, source: host(r.url), age: r.publishedDate, engine: 'searxng',
      }));
    } catch (e) { console.error('SearXNG', base, e.message); }
  }
  return [];
}

// 2. Brave Search API
async function fromBrave({ q, type, count, offset, safe, time }) {
  const key = process.env.BRAVE_API_KEY;
  if (!key) return [];
  const p = new URLSearchParams({
    q, count: String(count), offset: String(offset), safesearch: safe,
    ...(time && type !== 'images' && { freshness: time }),
  });
  const j = await getJson(`${BRAVE[type]}?${p}`, {
    headers: { Accept: 'application/json', 'X-Subscription-Token': key },
  });
  const raw = type === 'web' ? j.web?.results : j.results;
  return (raw || []).map(x => item({
    title: x.title, url: x.url || x.properties?.url, thumbnail: x.thumbnail?.src,
    description: x.description, source: x.meta_url?.hostname, age: x.age || x.page_age,
    engine: 'brave',
  }));
}

// 3. Google Programmable Search (100 free/day)
async function fromGoogle({ q, type, page, safe }) {
  const key = process.env.GOOGLE_CSE_KEY, cx = process.env.GOOGLE_CSE_CX;
  if (!key || !cx || type === 'videos' || type === 'news') return [];
  const p = new URLSearchParams({
    key, cx, q, num: '10', start: String((page - 1) * 10 + 1),
    safe: safe === 'off' ? 'off' : 'active',
    ...(type === 'images' && { searchType: 'image' }),
  });
  const j = await getJson(`https://www.googleapis.com/customsearch/v1?${p}`);
  return (j.items || []).map(x => item({
    title: x.title, url: x.link, thumbnail: x.pagemap?.cse_thumbnail?.[0]?.src || x.image?.thumbnailLink,
    description: x.snippet, source: x.displayLink, engine: 'google',
  }));
}

// 4. Wikipedia (free, no key, web only)
async function fromWiki({ q, type }) {
  if (type !== 'web') return [];
  const p = new URLSearchParams({ action: 'opensearch', search: q, limit: '8', format: 'json', origin: '*' });
  const [, titles, descs, urls] = await getJson(`https://en.wikipedia.org/w/api.php?${p}`);
  return titles.map((t, i) => item({
    title: t, url: urls[i], description: descs[i], source: 'wikipedia.org', engine: 'wikipedia',
  }));
}

// Merge lists round-robin and drop duplicate URLs
function merge(lists, max) {
  const seen = new Set(), out = [];
  const longest = Math.max(0, ...lists.map(l => l.length));
  for (let i = 0; i < longest && out.length < max; i++) {
    for (const l of lists) {
      const r = l[i];
      if (!r || !isHttp(r.url)) continue;
      const k = r.url.replace(/[/#?]+$/, '').toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(r);
      if (out.length >= max) break;
    }
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const q = String(req.query.q || '').trim().slice(0, 200);
  if (!q) return res.status(400).json({ error: 'Missing query' });

  const type = TYPES.includes(req.query.type) ? req.query.type : 'web';
  const count = clamp(parseInt(req.query.count), 1, 20, 20);
  const page = clamp(parseInt(req.query.page), 1, 10, 1);
  const offset = clamp(parseInt(req.query.offset), 0, 9, 0);
  const safe = SAFE.includes(req.query.safesearch) ? req.query.safesearch : 'moderate';
  const time = TIME[req.query.freshness] || '';

  const args = { q, type, count, page, offset, safe, time };
  const settled = await Promise.allSettled([
    fromSearx(args), fromBrave(args), fromGoogle(args), fromWiki(args),
  ]);
  const lists = settled.filter(s => s.status === 'fulfilled').map(s => s.value);
  const failed = settled.filter(s => s.status === 'rejected').length;
  settled.forEach(s => s.status === 'rejected' && console.error('Provider failed:', s.reason?.message));

  const results = merge(lists, count);
  if (!results.length) {
    return res.status(failed ? 502 : 200).json({
      type, query: q, count: 0, results: [],
      error: failed ? 'Search providers failed. Try again.' : undefined,
    });
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  return res.status(200).json({
    type, query: q, count: results.length,
    sources: [...new Set(results.map(r => r.engine))],
    results,
  });
}