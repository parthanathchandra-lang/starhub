// api/[...all].js - OWN BEST MAXIMUM - MINIMUM + MAXIMUM - ANY POSSIBILITIES - FINAL LOCK
const C={
  bad:['gambling','casino','betting','adult','porn','piracy','malware','scam','weapon','drug','fraud','rummy','poker','xxx','hack'],
  laws:{'IN':{b:['casino','betting','rummy','gambling','adult'],l:'DPDP-IN',s:{'Assam':{b:['rummy','poker','betting','casino'],l:'Assam Act'},'Telangana':{b:['rummy','poker','betting'],l:'Telangana Act'}}},'AE':{b:['gambling','betting','casino','adult'],l:'UAE'},'SA':{b:['gambling','betting','casino','adult'],l:'KSA'},'W':{b:['piracy','malware','scam','weapon','drug','fraud','hack'],l:'Global'}},
  f:{valid:['free','safe','legal','instant','zero','no-gps','no-cookie','secret','akela','sath'],spec:{'122+':[122,123,124,125,126,127],'133±':[128,129,130,131,132,133],d:[1,2,3],w:[1,52],m:[1,12],y:[2026]},unspec:['auto','giga','tera','infinite','piped','invidious','searx','nitter','ffmpeg','webnn','webgpu','pipeTo','transform','locks','popover','anchor','contain-strict','battery-saver','edge-30','search-open'],uni:['time','range','area','law','env','geo','feature-right','auto-hide','ban-unban','new-law','fallback','mask','main-link','no-ping','any-possibility']}
};

const getAll=()=>{
  try{const e=process.env||{};const bans={};Object.keys(e).filter(k=>k.startsWith('NEW_BAN_')).forEach(k=>bans[k]=e[k]);return{bans,masked:Object.keys(e).filter(k=>k.startsWith('NEW_')).map(k=>({name:k,exists:true})),vercel:!!e.VERCEL,unspec:true};}
  catch{return{bans:{},unspec:true};}
};

const lawAuto=(p,req,all)=>{
  try{
    const h=req.headers||{};const c=(h['x-vercel-ip-country']||h['cf-ipcountry']||'W').toUpperCase();const st=(h['x-vercel-ip-country-region']||'default').toString();const city=(h['x-vercel-ip-city']||'default').toString();
    const L=C.laws;let ban=[...(L[c]?.b||L['W'].b)];let law=L[c]?.l||L['W'].l;let area=c;
    if(L[c]?.s){const s=L[c].s[st]||L[c].s['default'];if(s){ban=[...ban,...(s.b||[])];law=s.l||law;area=`${c}-${st}`;}}
    Object.keys(all.bans||{}).forEach(k=>{try{const v=String(all.bans[k]).toLowerCase();const item=k.replace('NEW_BAN_','').toLowerCase();if(v==='true'||v.includes('ban')){if(!ban.includes(item))ban.push(item);}if(v==='false'||v.includes('unban')){ban=ban.filter(x=>x!==item);}}catch{}});
    const bad=ban.some(b=>p.includes(b));return{c,state:st,city,district:city,area,ban_list:ban,law,bad,is_ban:bad,auto_hide:bad,auto_show:!bad,feature:true,world:true,unspec:true,principle:'Kuch specify nahi - World any country - Country state district town - New law auto ban/unban hide/show - Feature right'};
  }catch{return{c:'W',area:'WORLD',ban_list:C.laws.W.b,bad:false,is_ban:false,auto_show:true,feature:true,unspec:true};}
};

const filterEngine=(p,q,R)=>{
  const need=s=>/(122|133|win|filter|special|auto|day|week|month|year)/.test(s);
  const base=C.f.valid.reduce((a,k)=>({...a,[k]:true}),{});
  let r=[];if(!q||!need(q))r=C.f.unspec.map(id=>({id,...base,universal:true,unspec:true,valid:true}));
  if(need(q||p)){
    Object.keys(C.f.spec).forEach(t=>{C.f.spec[t].forEach(v=>{if(!q||String(v).includes(q)||t.includes(q)){r.unshift({id:`auto-${v}`,name:`Auto ${v} ${t} WIN`,type:t,tag:t.includes('122')?'plus':'minus',v,spec:true,valid:true,...base});}});});
    for(let i=R.min;i<=R.max;i++){if(String(i).includes(q)||(q||'').includes('122')||(q||'').includes('133')||(q||'').includes('win')){r.unshift({id:`auto-${i}`,name:`Auto ${i} WIN`,type:i<=127?'122+':'133±',spec:true,auto:true,...base});}}
  }
  if(!r.length)r=C.f.unspec.map(id=>({id,...base,fallback:true}));
  return r;
};

export default async function handler(req,res){
  try{
    res.setHeader('X-Best','true');res.setHeader('X-Min-Max','true');res.setHeader('X-Akela','true');res.setHeader('X-No-Ping','true');res.setHeader('X-Global-Law-Auto','true');res.setHeader('X-Feature-Right','true');res.setHeader('Cache-Control','s-maxage=86400, stale-while-revalidate');
    const raw=(req.query.all?.join('/')||req.url?.split('/api/')[1]?.split('?')[0]||'').toLowerCase().trim();const p=raw.replace(/\.js$/,'').replace(/[^a-z0-9\-_]/g,'').slice(0,200);const q=(req.query.q||'').toLowerCase();const n=parseInt((p+q).match(/\d+/)?.[0]||'0')||0;
    const all=getAll();const L=lawAuto(p||q,req,all);const R={min:122,max:133,start:1,end:100000};
    if(L.is_ban)return res.status(200).json({file:p,blocked:true,reason:`Banned in ${L.area} - ${L.law}`,law:L,feature:true,auto_hide:true,legal:false,zero:true});
    if(C.bad.some(x=>p.includes(x)))return res.status(200).json({file:p,blocked:true,reason:'MUST.ILLEGAL',law:L,feature:true,legal:false});
    let results=filterEngine(p,q,R);
    return res.json({file:p||'root',q,type:n<=1e3?'auto':n<=1e6?'giga-auto':n<=1e9?'tera-auto':'infinite-auto',area:L.area,country:L.c,law:L.law,ban_list:L.ban_list,global_law:L,feature:true,apps_games_platforms_sites_videos_images_whole_web:true,where_what_ban_auto:true,world_any_country:true,country_state_district_town:true,new_law_auto:true,ban_unban_auto:true,filters:C.f,results:results.slice(0,60),counts:{valid:results.filter(r=>r.valid).length,spec:results.filter(r=>r.spec).length,unspec:results.filter(r=>r.unspec).length,total:results.length},range:R,akela:true,sath:true,unspec:true,valid:true,maximum:true,advance:true,anyPossibility:true,zeroError:true,ownBest:true,version:'OWN BEST MAXIMUM - Minimum + Maximum - Valid Specified Unspecified Universal - Global Law Country State District Town - Ban/unban New law auto - Any Possibilities - Final Lock',win:true,best:true});
  }catch(e){return res.json({fallback:true,universal:true,akela:true,zero:true,feature:true,best:true,error:e.message});}
}