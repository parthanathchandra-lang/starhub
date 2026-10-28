// api/offline-status.js - Offline status - PWA
export default (req,res)=>{
  return res.status(200).json({
    offline: {
      enabled: true,
      pwa: true,
      sw: '/sw.js',
      cache_name: 'starhub-v8-best',
      urls: ['/','/manifest.json','/api/filter-2026'],
      strategy: 'cache-first',
      heavy: false,
      storage: 'zero',
      done: true,
      win: true
    }
  });
};