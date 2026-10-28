export default async function handler(req,res){
 const E=process.env; const get=(ks)=>{for(let k of ks){if(E[k]) return E[k];} return '';};
 const ALL_KEYS=Object.keys(E).filter(k=>k.includes('_KEY')||k.includes('_TOKEN'));
 const RAWG_KEY=get(['RAWG_KEY','VITE_RAWG_KEY']); const YT_KEY=get(['YT_KEY','YOUTUBE_KEY']);
 const TELEGRAM_TOKEN=get(['TELEGRAM_TOKEN']); const NOWPAYMENTS_KEY=get(['NOWPAYMENTS_KEY']);
 let list=[]; let env_used=[]; let improvements=[];
 try{ const r=await fetch('https://www.freetogame.com/api/games'); const j=await r.json(); list=list.concat(j.slice(0,40).map(g=>({type:'game',title:g.title,dev:g.publisher,icon:g.thumbnail,link:g.game_url,cat:g.genre,rating:'4.5',rights_owner:g.publisher,host:'FreeToGame Real'}))); env_used.push('FreeToGame 40'); }catch(e){}
 if(RAWG_KEY){ try{ const r=await fetch(`https://api.rawg.io/api/games?key=${RAWG_KEY}&page_size=40`); const j=await r.json(); list=list.concat((j.results||[]).slice(0,40).map(g=>({type:'game',title:g.name,dev:g.publishers?.[0]?.name||'RAWG',icon:g.background_image,link:`https://rawg.io/games/${g.slug}`,cat:g.genres?.[0]?.name||'Action',rating:g.rating,rights_owner:g.publishers?.[0]?.name,host:'RAWG Real'}))); improvements.push('RAWG ON Power 40>120'); env_used.push('RAWG'); }catch(e){} }
 try{ const prot=req.headers['x-forwarded-proto']||'https'; const host=req.headers.host; const r=await fetch(`${prot}://${host}/features.json`); const j=await r.json(); list=list.concat(j); }catch(e){}
 const banWords=['apk mod','hack','adult','gamble','casino','betting','sporty','dream11','full movie','full song hosting','xxx','porn'];
 list=list.filter(it=>!banWords.some(b=>JSON.stringify(it).toLowerCase().includes(b)));
 const seen=new Set(); list=list.filter(it=>{const id=(it.title+it.dev).toLowerCase(); if(seen.has(id)) return false; seen.add(id); return true;});
 if(YT_KEY) improvements.push('YT Watch ON'); if(TELEGRAM_TOKEN) improvements.push('TELEGRAM Mass Push ON'); if(NOWPAYMENTS_KEY) improvements.push('NOWPAYMENTS Backend Earn ON');
 res.setHeader('Cache-Control','public, max-age=60');
 res.json({list:list.slice(0,200),power:list.length,env_detected:ALL_KEYS,env_used,improvements,FREE_ONLY:true,PAID:false,backend_earn:!!(NOWPAYMENTS_KEY&&TELEGRAM_TOKEN)});
}