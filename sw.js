// sw.js - Offline shell. Network-first. Supabase, API aur POST requests ko touch nahi karta.
const CACHE = "game-hub-v4";
const SHELL = ["/", "/index.html", "/config.js"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) {
      if (k !== CACHE) await caches.delete(k);
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;                      // POST/PUT ko bilkul na chhuo
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;       // Supabase, CDN, doosre domains
  if (url.pathname.startsWith("/api/")) return;          // API responses cache nahi karni

  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res.ok) {
        const cache = await caches.open(CACHE);
        cache.put(req, res.clone());
      }
      return res;
    } catch {
      const cached = (await caches.match(req)) || (await caches.match("/index.html"));
      return cached || new Response("Offline", { status: 503 });
    }
  })());
});