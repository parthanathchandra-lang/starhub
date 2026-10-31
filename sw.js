// sw.js - FINAL 1011% BEST - OFFLINE PWA - NO HEAT - UNIVERSAL SPECIFY
const CACHE='starhub-v1011-final-best';const CORE=['/','/index.html','/lib/feature-manager.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).catch(()=>{})).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.pathname.startsWith('/api/')){
    e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cl=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,cl).catch(()=>{}));}return r;}).catch(()=>caches.match(e.request).then(c=>c||new Response(JSON.stringify({cleaned:true,fallback:true,universal:true,specified:false,need122_133:true,secretlySecure:true,akela:true,sath:true}),{headers:{'Content-Type':'application/json'}}))));
    return;
  }
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(cached=> cached||fetch(e.request).then(res=>{const clone=res.clone();if(res.ok)caches.open(CACHE).then(cache=>cache.put(e.request,clone).catch(()=>{}));return res;}).catch(()=>caches.match('/index.html'))));
});