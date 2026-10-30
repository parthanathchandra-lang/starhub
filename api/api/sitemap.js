// FILE NAME: api/sitemap.js
// FILE PATH: /api/sitemap.js
// ROUTE: /api/sitemap (fallback without dot)
// TYPE: Dynamic - Same as api/sitemap.xml.js - cp copy - Vercel safe - No dot problem
// Created by: cp api/sitemap.xml.js api/sitemap.js

export default async function handler(req,res){
  try{
    res.setHeader('Content-Type','application/xml');
    res.setHeader('Cache-Control','public, max-age=3600, stale-while-revalidate=600');
    res.setHeader('X-No-Ping','true');res.setHeader('X-Universal','true');res.setHeader('X-No-Specify','true');res.setHeader('X-File-Name','api/sitemap.js');res.setHeader('X-Route','/api/sitemap');res.setHeader('X-Akela-Work','true');res.setHeader('X-Sab-Ka-Sath-Work','true');
    let base='';
    try{
      const proto=req.headers?.['x-forwarded-proto']||'https';
      const host=req.headers?.host||req.headers?.['x-forwarded-host']||'';
      base=host?`${proto}://${host}`:'';
    }catch{base='';}
    const now=new Date().toISOString();
    const loc=(path)=>base?`${base}${path}`:path;
    let urls=`<url><loc>${loc('/')}</loc><lastmod>${now}</lastmod><changefreq>hourly</changefreq><priority>1.0</priority></url>`;
    urls+=`<url><loc>${loc('/api/all')}</loc><lastmod>${now}</lastmod><changefreq>hourly</changefreq><priority>0.9</priority></url>`;
    for(let i=1;i<=20;i++){urls+=`<url><loc>${loc('/api/'+i)}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`;}
    urls+=`<url><loc>${loc('/api/122')}</loc><changefreq>daily</changefreq><priority>0.9</priority></url><url><loc>${loc('/api/133')}</loc><changefreq>daily</changefreq><priority>0.9</priority></url><url><loc>${loc('/api/2026')}</loc><changefreq>daily</changefreq><priority>0.9</priority></url><url><loc>${loc('/api/999999')}</loc><changefreq>always</changefreq><priority>1.0</priority></url>`;
    return res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  }catch{
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>/</loc><priority>1.0</priority></url><url><loc>/api/all</loc><priority>0.9</priority></url></urlset>`);
  }
}