#!/usr/bin/env bash
set -euo pipefail

echo "Creating StarHub project..."

mkdir -p api lib public .github/workflows

if [ ! -d .git ]; then
  git init
fi

CURRENT_BRANCH="$(git branch --show-current 2>/dev/null || true)"
if [ -z "$CURRENT_BRANCH" ]; then
  git checkout -b main >/dev/null 2>&1 || true
fi

cat > index.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0f8a3d" />
  <title>StarHub</title>
  <link rel="manifest" href="/manifest.json" />
  <style>
    :root {
      --bg: #08111d;
      --panel: #101827;
      --line: #243046;
      --green: #0f8a3d;
      --text: #edf6ff;
      --muted: #a8b0bf;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      min-height: 100vh;
      background: linear-gradient(180deg, #08111d, #0c1524);
      color: var(--text);
      font-family: Arial, sans-serif;
    }
    body { padding: 20px 18px 90px; }
    .container { max-width: 1280px; margin: 0 auto; }
    .topbar {
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(16,24,39,0.92);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 14px 18px;
      position: sticky; top: 12px; z-index: 20;
    }
    .hero {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 24px;
      margin-top: 22px;
      padding: 24px;
      background: linear-gradient(135deg, rgba(15,138,61,.2), rgba(25,35,50,.8));
      border: 1px solid var(--line);
      border-radius: 22px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 18px;
      margin-top: 22px;
    }
    .card {
      background: linear-gradient(180deg, rgba(15,23,42,.96), rgba(17,24,39,.96));
      border: 1px solid var(--line);
      border-radius: 20px;
      overflow: hidden;
    }
    .card-body { padding: 18px; }
    .btn {
      border: none; border-radius: 12px; padding: 11px 16px; font-weight: 700; cursor: pointer;
      margin-right: 8px; margin-top: 8px; background: rgba(255,255,255,.04); color: var(--text);
      border: 1px solid var(--line);
    }
    .btn.primary { background: var(--green); border-color: var(--green); }
    .muted { color: var(--muted); }
    .search {
      width: 100%; margin-top: 14px; background: rgba(15,23,42,.9); color: var(--text);
      border: 1px solid var(--line); border-radius: 16px; padding: 14px 16px; font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="topbar">
      <div><strong>★ StarHub</strong></div>
      <div class="muted">Safe • Legal • Adaptive</div>
    </div>

    <div class="hero">
      <div>
        <h1>Adaptive platform experience</h1>
        <p class="muted">
          Safe discovery, upload flow, moderation, creator tools, analytics, and a clean startup-style product ready for deployment.
        </p>
        <div>
          <button class="btn primary" onclick="location.href='/upload.html'">Upload</button>
          <button class="btn" onclick="location.href='/dashboard.html'">Dashboard</button>
          <button class="btn" onclick="location.href='/admin.html'">Admin</button>
          <button class="btn" onclick="location.href='/terms.html'">Terms</button>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h3>Platform status</h3>
          <p class="muted">Live</p>
          <p class="muted">Moderation enabled</p>
          <p class="muted">Analytics online</p>
        </div>
      </div>
    </div>

    <input id="search" class="search" placeholder="Search apps, creators, videos..." />

    <div id="status" class="muted" style="margin-top:12px;">Loading feed...</div>
    <div id="grid" class="grid"></div>
  </div>

  <script>
    let feed = [];

    function render(items) {
      const grid = document.getElementById('grid');
      grid.innerHTML = items.map(item => `
        <div class="card">
          <div class="card-body">
            <div class="muted">${item.source || 'Featured'}</div>
            <h3>${item.name}</h3>
            <p class="muted">${item.about || 'Safe product listing'}</p>
            <div class="muted">★ ${item.rating || '4.8'}</div>
          </div>
        </div>
      `).join('');
    }

    async function loadFeed() {
      try {
        const response = await fetch('/api/feed');
        const data = await response.json();
        feed = data.items || [];
        render(feed);
        document.getElementById('status').textContent = 'Feed loaded successfully.';
      } catch (error) {
        feed = [
          { name: 'StarHub Discovery', about: 'Discovery and curated browsing experience', rating: '4.9', source: 'Featured' },
          { name: 'Creator Studio', about: 'Tools for uploads and creator management', rating: '4.8', source: 'Trending' },
          { name: 'Video Daily', about: 'Video publishing and short-form content', rating: '4.8', source: 'Featured' }
        ];
        render(feed);
        document.getElementById('status').textContent = 'Using fallback feed.';
      }
    }

    document.getElementById('search').addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        render(feed);
        return;
      }
      const filtered = feed.filter(item => {
        const text = `${item.name} ${item.about} ${item.source}`.toLowerCase();
        return text.includes(q);
      });
      render(filtered);
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    loadFeed();
  </script>
</body>
</html>
EOF

cat > dashboard.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:1000px; margin:48px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:20px; }
    .row { display:flex; justify-content:space-between; border-bottom:1px solid #243046; padding:10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Dashboard</h1>
      <div class="row"><span>Total apps</span><span>1,248</span></div>
      <div class="row"><span>Reviews</span><span>8,420</span></div>
      <div class="row"><span>Installations</span><span>40.2k</span></div>
      <div class="row"><span>Active creators</span><span>536</span></div>
    </div>
  </div>
</body>
</html>
EOF

cat > admin.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:1000px; margin:48px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:20px; }
    .row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #243046; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Admin</h1>
      <div class="row"><span>Pending review</span><span>7</span></div>
      <div class="row"><span>Approved</span><span>124</span></div>
      <div class="row"><span>Rejected</span><span>2</span></div>
    </div>
  </div>
</body>
</html>
EOF

cat > upload.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Upload</title>
  <style>
    body { margin: 0; background: #08111d; color: #fff; font-family: Arial, sans-serif; }
    .container { max-width: 900px; margin: 48px auto; padding: 24px; }
    .card { background: #101827; border: 1px solid #243046; border-radius: 20px; padding: 24px; }
    input, textarea { width: 100%; padding: 12px 14px; margin-top: 8px; margin-bottom: 18px; border-radius: 12px; border: 1px solid #243046; background: #0d1726; color: #fff; }
    .btn { background: #0f8a3d; color: #fff; border: none; border-radius: 12px; padding: 12px 16px; font-weight: 700; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Upload</h1>
      <label>App Name<input type="text" placeholder="My app" /></label>
      <label>Developer<input type="text" placeholder="Creator name" /></label>
      <label>Description<textarea placeholder="Describe your app"></textarea></label>
      <button class="btn">Submit for review</button>
    </div>
  </div>
</body>
</html>
EOF

cat > login.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { min-height:100vh; display:grid; place-items:center; }
    .card { width:min(420px,90vw); background:#101827; border:1px solid #243046; border-radius:20px; padding:24px; }
    input { width:100%; padding:12px 14px; background:#0d1726; color:#fff; border:1px solid #243046; border-radius:12px; margin-top:8px; margin-bottom:18px; }
    .btn { width:100%; background:#0f8a3d; color:#fff; border:none; border-radius:12px; padding:12px 16px; font-weight:700; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Login</h1>
      <label>Email<input type="email" value="demo@starhub.app" /></label>
      <label>Password<input type="password" value="demo123" /></label>
      <button class="btn">Continue</button>
    </div>
  </div>
</body>
</html>
EOF

cat > search.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Search</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:1100px; margin:32px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:20px; }
    input { width:100%; padding:14px 16px; border-radius:12px; border:1px solid #243046; background:#0d1726; color:#fff; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Search</h1>
      <input placeholder="Search apps, creators, videos..." />
    </div>
  </div>
</body>
</html>
EOF

cat > detail.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Detail</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:1000px; margin:48px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>StarHub Discovery</h1>
      <p>Safe curated product discovery and strong creator experience.</p>
    </div>
  </div>
</body>
</html>
EOF

cat > pricing.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pricing</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:1100px; margin:48px auto; padding:24px; }
    .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:20px; }
    .btn { background:#0f8a3d; color:#fff; border:none; border-radius:12px; padding:12px 16px; font-weight:700; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Pricing</h1>
    <div class="cards">
      <div class="card"><h3>Free</h3><p>$0</p><button class="btn">Get started</button></div>
      <div class="card"><h3>Creator</h3><p>$9</p><button class="btn">Choose</button></div>
      <div class="card"><h3>Pro</h3><p>$19</p><button class="btn">Choose</button></div>
    </div>
  </div>
</body>
</html>
EOF

cat > terms.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Terms</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:900px; margin:48px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:22px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Terms</h1>
      <p>Use the platform responsibly and only post safe, legal, approved content.</p>
      <p>We maintain moderation, privacy, and policy protections.</p>
    </div>
  </div>
</body>
</html>
EOF

cat > privacy.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:900px; margin:48px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:22px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Privacy</h1>
      <p>We protect user data and moderation records with secure infrastructure and access controls.</p>
    </div>
  </div>
</body>
</html>
EOF

cat > safety.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Safety</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:900px; margin:48px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:22px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Safety</h1>
      <p>We reject unsafe and harmful content, maintain review queues, and protect user trust.</p>
    </div>
  </div>
</body>
</html>
EOF

cat > faq.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FAQ</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:900px; margin:48px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:22px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>FAQ</h1>
      <p>Q: How do reviews work? A: uploads go through a moderation queue before public approval.</p>
    </div>
  </div>
</body>
</html>
EOF

cat > policy.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Policy</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:900px; margin:48px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:22px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Policy</h1>
      <p>We maintain safe moderation, legal compliance, privacy controls, and quality review.</p>
    </div>
  </div>
</body>
</html>
EOF

cat > about.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>About</title>
  <style>
    body { margin:0; background:#08111d; color:#fff; font-family:Arial,sans-serif; }
    .container { max-width:900px; margin:48px auto; padding:24px; }
    .card { background:#101827; border:1px solid #243046; border-radius:18px; padding:22px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>About</h1>
      <p>StarHub is a clean startup-style platform focused on discovery, moderation, and creator tools.</p>
    </div>
  </div>
</body>
</html>
EOF

cat > api/feed.js <<'EOF'
export default async function handler(req, res) {
  return res.status(200).json({
    items: [
      { id: 1, name: 'StarHub Discovery', rating: 4.9, source: 'Featured', about: 'Curated safe discovery experience' },
      { id: 2, name: 'Creator Studio', rating: 4.8, source: 'Trending', about: 'Tools for creator management and upload lifecycle' },
      { id: 3, name: 'Video Daily', rating: 4.8, source: 'Featured', about: 'Short-form and publishing experience' }
    ]
  });
}
EOF

cat > api/apps.js <<'EOF'
export default async function handler(req, res) {
  return res.status(200).json({
    apps: [
      { id: 1, name: 'StarHub Discovery', category: 'featured' },
      { id: 2, name: 'Creator Studio', category: 'creator' },
      { id: 3, name: 'Video Daily', category: 'video' }
    ]
  });
}
EOF

cat > api/admin.js <<'EOF'
export default async function handler(req, res) {
  return res.status(200).json({
    queue: [
      { id: 1, name: 'New discovery app', status: 'pending' },
      { id: 2, name: 'Creator upload 12', status: 'review' }
    ]
  });
}
EOF

cat > api/upload.js <<'EOF'
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  return res.status(200).json({
    success: true,
    message: 'Upload submitted for moderation.',
    data: body
  });
}
EOF

cat > api/analytics.js <<'EOF'
export default async function handler(req, res) {
  return res.status(200).json({
    total_apps: 1248,
    installs: 40200,
    reviews: 8420,
    creators: 536
  });
}
EOF

cat > api/users.js <<'EOF'
export default async function handler(req, res) {
  return res.status(200).json({
    users: [
      { id: 1, name: 'Demo User', role: 'user' },
      { id: 2, name: 'Creator One', role: 'creator' }
    ]
  });
}
EOF

cat > api/config.js <<'EOF'
export default async function handler(req, res) {
  return res.status(200).json({
    app_name: 'StarHub',
    status: 'online',
    version: 'v1',
    free_only: true
  });
}
EOF

cat > lib/supabase.js <<'EOF'
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(url, key);
EOF

cat > lib/security.js <<'EOF'
export function isSafeContent(text = '') {
  const blocked = [
    'gambling', 'casino', 'betting', 'adult', 'porn', 'piracy',
    'malware', 'virus', 'illegal', 'weapon', 'drug', 'terror',
    'hate', 'harassment', 'scam', 'fraud'
  ];

  const value = String(text).toLowerCase();
  return !blocked.some(item => value.includes(item));
}
EOF

cat > lib/format.js <<'EOF'
export function formatRating(value = 0) {
  return Number(value).toFixed(1);
}

export function safeText(input = '') {
  return String(input).slice(0, 180);
}
EOF

cat > sw.js <<'EOF'
const CACHE_NAME = 'starhub-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/upload.html',
  '/admin.html',
  '/login.html',
  '/search.html',
  '/detail.html',
  '/pricing.html',
  '/terms.html',
  '/privacy.html',
  '/safety.html',
  '/faq.html',
  '/policy.html',
  '/about.html',
  '/manifest.json'
];

self.a