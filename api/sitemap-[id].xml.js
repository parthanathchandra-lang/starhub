export default function handler(req,res){
  try{
    res.setHeader('Content-Type','application/xml');res.setHeader('Cache-Control','public, s-maxage=21600, stale-while-revalidate=86400');
    res.setHeader('X-Unlimited-Auto','true');
    let base='';try{const p=req.headers['x-forwarded-proto']||'https';const h=req.headers.host||req.headers['x-forwarded-host']||'';base=h?`${p}://${h}`:'';}catch{base='';}
    const loc=p=>base?`${base}${p}`:p;const now=new Date().toISOString();
    let id=1;try{id=parseInt((req.query.id||req.url.match(/sitemap-(\d+)/)?.[1]||'11'),10)||11;if(id<11)id=11;if(id>50000)id=50000;}catch{id=11;}
    const START=(id-1)*50000+1;const END=id*50000;
    const urls=[];for(let i=START;i<=END;i++){urls.push(`<url><loc>${loc('/api/'+i)}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`);}
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`);
  }catch{return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>/</loc></url></urlset>`);}
}