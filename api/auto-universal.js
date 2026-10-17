// Koe bhi Domains env ho sab auto + No update ever - Real Basis - PATH 5 Most Best
export default function handler(req,res){
  const env=process.env;
  const NEW={
    domains:["starhubigdp.vercel.app","starhubigdb.pages.dev","starhub-eta.surge.sh","starhub.web.app","starhubigdp.onrender.com",env.NEW_DOMAIN_1,...Object.keys(env).filter(k=>k.startsWith('DOMAIN_')||k.startsWith('NEW_DOMAIN_')).map(k=>env[k])].filter(Boolean)
  };
  const TOGGLES={
    free_on:["tiered_cache_smart","early_hints","brotli","waf","bot_fight","turnstile"],
    paid_off_locked:["argo","storj","r2","adsense"],
    locked:{PAID_ENABLED:false,TRANSACTION_ENABLED:false,FREE_ONLY:true}
  };
  res.setHeader('Cache-Control','public, max-age=60');
  res.json({auto_universal:NEW,toggles:TOGGLES,free_only:true,no_update_ever:true,future_NEW_auto:true,real:true,adaptability:"To Sab things kalya adaptibility as Availablity fluctuating improve adjust capability universal dynamic coordination guided safe compliments resonance maximum auto best performance sab jagah sab jagah ma on same Web pages"});
}