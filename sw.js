const CACHE_NAME = "starhub-v16-crystal";
const ASSETS = ["/","/index.html","/manifest.json","/icon-512.png","/icon-192.png","/icon-108.png","/auth-client.js","/performance.js"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetched = fetch(e.request).then(r => {
        if (r.ok && e.request.url.startsWith(self.location.origin)) {
          const clone = r.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return r;
      }).catch(()=>cached);
      return cached || fetched;
    })
  );
});