// FILE: /api/sitemap-[id].xml.js - DYNAMIC UNLIMITED AUTO - 11th se infinite - 1 file se 50k files - 1000% BEST - No more manual
export default function handler(req,res){
  try{
    res.setHeader('Content-Type','application/xml');res.setHeader('Cache-Control','public, s-maxage=21600, stale-while-revalidate=86400');
    res.setHeader('X-Universal','true');res.setHeader('X-Past-Present-Future-Safe','true');res.setHeader('X-Akela-Work','true');res.setHeader('X-Sab-Ka-Sath-Work','true');res.setHeader('X-No-PII','true');res.setHeader('X-Universal-Auto-Unspecified','true');res.setHeader('X-Filter-Valid','true');res.setHeader('X-Efficiency-10x','true');res.setHeader('X-Unlimited-Auto','true');
    let base='';try{const p=req.headers['x-forwarded-proto']||'https';const h=req.headers.host||req.headers['x-forwarded-host']||'';base=h?`${p}://${h}`:'';}catch{base='';}
    const loc=p=>base?`${base}${p}`:p;const now=new Date().toISOString();
    let id=1;try{id=parseInt((req.query.id||req.url.match(/sitemap-(\d+)/)?.[1]||'1'),10)||1;if(id<1)id=1;if(id>50000)id=50000;}catch{id=1;}
    const START=(id-1)*50000+1;const END=id*50000;
    const urls=[];for(let i=START;i<=END;i++){const prio=(i===122||i===133)?'0.9':'0.8';urls.push(`<url><loc>${loc('/api/'+i)}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>${prio}</priority></url>`);}
    urls.push(`<url><loc>${loc('/')}</loc><lastmod>${now}</lastmod><changefreq>hourly</changefreq><priority>1.0</priority></url>`,`<url><loc>${loc('/api/all')}</loc><lastmod>${now}</lastmod><changefreq>hourly</changefreq><priority>0.9</priority></url>`);
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`);
  }catch{return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>/</loc><lastmod>${new Date().toISOString()}</lastmod><priority>1.0</priority></url></urlset>`);}
}