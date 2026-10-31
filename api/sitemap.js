// FILE: api/sitemap.js
// TYPE: 1000% ULTIMATE BEST - Universal auto - Past Present Future safe - Akela + Sab ka sath - Self heal - No crash - No PII
// Best possible results - Effective Efficient performance advanced - Full potential Ability properties
export default function handler(req,res){
  try{
    // SPECIFY MUST: Content-Type + Cache - Where need - Must specify - Real - When bot needs
    res.setHeader('Content-Type','application/xml');
    res.setHeader('Cache-Control','public, s-maxage=21600, stale-while-revalidate=86400');
    // UNSPECIFIED AUTO: No X headers - Don't specify extra - Universal auto - Past Present Future safe - Really best - Secure - Secretly secure - No leak

    let base='';try{const p=req.headers['x-forwarded-proto']||'https';const h=req.headers.host||req.headers['x-forwarded-host']||'';base=h?`${p}://${h}`:'';}catch{base='';}
    const loc=p=>base?`${base}${p}`:p;const now=new Date().toISOString();

    // FULL POTENTIAL: Sitemap index - 10 files default + ?count=50 -> 50 files auto - Unlimited practical - Universal auto - Really best
    let count=10;try{count=parseInt(req.query.count||'10',10)||10;if(count<1)count=1;if(count>100)count=100;}catch{count=10;}
    
    let xml=`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    for(let i=1;i<=count;i++){xml+=`<sitemap><loc>${loc('/api/sitemap-'+i+'.xml')}</loc><lastmod>${now}</lastmod></sitemap>`;}
    // Universal auto: Always include main sitemap.xml
    xml+=`<sitemap><loc>${loc('/api/sitemap.xml')}</loc><lastmod>${now}</lastmod></sitemap>`;
    xml+=`</sitemapindex>`;
    return res.status(200).send(xml);
  }catch{
    // Akela work - Self heal - No crash - Past Present Future safe - Even crash return valid XML - Maximum Best - Safe legal - Privacy secure - Secretly secure
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>/</loc><lastmod>${new Date().toISOString()}</lastmod><priority>1.0</priority></url></urlset>`);
  }
}