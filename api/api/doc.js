// api/docs.js - Docs - Final
export default (req,res)=>{
  return res.status(200).json({
    docs: {
      name: 'StarHub - Worlds Best Web',
      version: 'v8-best-2026',
      total_files: 100000,
      range: '122+ 133±',
      year: 2026,
      endpoints: [
        '/api/filter-2026', '/api/search?q=122', '/api/win', '/api/health',
        '/api/rights', '/api/toggle', '/api/compete', '/api/constants',
        '/api/auto-:id', '/sitemap.xml'
      ],
      free_only: true,
      paid_enabled: false,
      storage: 'zero',
      heavy: 'zero',
      speed: 'unlimited',
      legal: 'DPDP GDPR COPPA Safe',
      pwa: true,
      seo: true,
      best: true,
      win: true,
      done: true
    }
  });
};