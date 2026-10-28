// lib/seo-manager.js - SEO - Robots Sitemap - Best
export const SEO = {
  robots: true,
  sitemap: true,
  getRobots: () => `User-agent: *\nAllow: /\nSitemap: https://starhubigdp.vercel.app/sitemap.xml\n`,
  getSitemap: (from=1,to=100000) => {
    let xml = '<?xml version="1.0"?><urlset>';
    for(let i=from;i<=to;i++) xml+=`<url><loc>/api/auto-${i}</loc></url>`;
    return xml+'</urlset>';
  },
  status: () => ({ seo: true, robots: true, sitemap: true, total: 100000, best: true, done: true, win: true })
};