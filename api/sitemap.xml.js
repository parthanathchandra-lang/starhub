// FILE: api/sitemap.xml.js - TYPE: 1000% ULTIMATE BEST - FINAL ADVANCED
export default function handler(req,res){
  try{
    res.setHeader('Content-Type','application/xml');
    res.setHeader('Cache-Control','public, s-maxage=21600, stale-while-revalidate=86400');
    res.setHeader('X-Robots-Tag','noindex'); // Index itself noindex - Child index - SEO best
    let base='';try{const p=req.headers['x-forwarded-proto']||'https';const h=req.headers.host||req.headers['x-forwarded-host']||'';base=h?`${p}://${h}`:'';}catch{base='';}
    const loc=p=>base?`${base}${p}`:p;const now=new Date().toISOString();
    let count=10;try{count=parseInt(req.query.count||'10',10)||10;if(count<1)count=1;if(count>500)count=500;}catch{count=10;}
    let xml=`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    for(let i=1;i<=count;i++){xml+=`<sitemap><loc>${loc('/api/sitemap-'+i+'.xml')}</loc><lastmod>${now}</lastmod></sitemap>`;}
    // Universal auto: Always include root + all api
    xml+=`<sitemap><loc>${loc('/sitemap.xml')}</loc><lastmod>${now}</lastmod></sitemap>`;
    xml+=`</sitemapindex>`;return res.status(200).send(xml);
  }catch{
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>/</loc><lastmod>${new Date().toISOString()}</lastmod><priority>1.0</priority></url></urlset>`);
  }
}