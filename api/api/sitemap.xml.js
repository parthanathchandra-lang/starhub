// api/sitemap.xml.js - Sitemap dynamic - 100000 URLs - SEO Best
export default (req,res)=>{
  res.setHeader('Content-Type','application/xml');
  let urls = '';
  for(let i=1;i<=100;i++) urls+=`<url><loc>https://starhubigdp.vercel.app/api/auto-${i}</loc><changefreq>daily</changefreq><priority>0.9</priority></url>\n`;
  urls+=`<url><loc>https://starhubigdp.vercel.app/api/filter-2026</loc><priority>1.0</priority></url>\n`;
  urls+=`<url><loc>https://starhubigdp.vercel.app/api/search?q=122</loc><priority>1.0</priority></url>\n`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return res.status(200).send(xml);
};