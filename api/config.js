// MASTER - Future NEW_ auto include - Adaptability availability fluctuating improve adjust - PATH 5 Most Best
export default function handler(req,res){
  const env=process.env;
  const ALL=["starhubigdp.vercel.app","starhubigdb.pages.dev","starhub-eta.surge.sh","starhub.web.app","starhubigdp.onrender.com",env.NEW_DOMAIN_1,...Object.keys(env).filter(k=>k.startsWith('DOMAIN_')||k.startsWith('NEW_DOMAIN_')).map(k=>env[k])].filter(Boolean);
  let storage='github';if(env.B2_KEY_ID)storage='b2';if(env.GOFILE_TOKEN)storage='gofile';if(env.CLOUDINARY_URL)storage='cloudinary';
  let db='kv';if(env.D1_DATABASE_ID)db='d1';if(env.TURSO_URL)db='turso';if(env.SUPABASE_URL)db='supabase';
  res.setHeader('Cache-Control','public, max-age=60');
  res.json({domains:ALL,bestDomain:ALL[0],storage,db,PAID_ENABLED:false,ARGO_ENABLED:false,STORJ_ENABLED:false,R2_ENABLED:false,TRANSACTION_ENABLED:false,FREE_ONLY:true,LEGAL_MODE:"info-only",PRIVACY:"no-cookie",future_envs:Object.keys(env).filter(k=>k.includes('NEW_')),fallback:{storage:['cloudinary','catbox','b2','gofile','telegram','github_raw'],db:['d1','kv','turso','b2_json','github_raw'],hosting:ALL},adaptability:"Availability fluctuating improve adjust capability - If power down adjust if improving adjust as improve - Combined combinations circulations support each other - Compliment resonance - Universal dynamic - Maximum auto best performance sab jagah sab jagah ma on same Web pages"});
}