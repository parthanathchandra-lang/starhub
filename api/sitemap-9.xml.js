export default function handler(req,res){
  try{
    res.setHeader('Content-Type','application/xml');res.setHeader('Cache-Control','public, s-maxage=21600, stale-while-revalidate=86400');
    let base='';try{const p=req.headers['x-forwarded-proto']||'https';const h=req.headers.host||req.headers['x-forwarded-host']||'';base=h?`${p}://${h}`:'';}catch{base='';}
    const loc=p=>base?`${base}${p}`:p;const now=new Date().toISOString();
    const START=400001;const END=450000;const urls=[];for(let i=START;i<=END;i++){urls.push(`<url><loc>${loc('/api/'+i)}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`);}
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`);
  }catch{return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>/</loc></url></urlset>`);}
}