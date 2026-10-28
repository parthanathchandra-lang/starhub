// lib/offline.js - Offline manager - PWA - Service Worker ready
export const OFFLINE = {
  enabled: true,
  strategy: 'cache-first',
  cache_name: 'starhub-v8-best',
  urls: ['/', '/api/filter-2026', '/api/config', '/manifest.json'],
  sw: `
self.addEventListener('install', e=>{ e.waitUntil(caches.open('starhub-v8-best').then(c=>c.addAll(['/','/manifest.json']))); self.skipWaiting(); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{ caches.open('starhub-v8-best').then(c=>c.put(e.request,res.clone())); return res; })))}); 
`.trim(),
  status: () => ({offline: true, pwa: true, cache_first: true, heavy: false, storage: 'zero', done: true})
};