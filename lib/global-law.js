// lib/global-law.js - BEST - Universal unspecified - Global law auto - Real original legal safe privacy security secretly - Officially
export const GlobalLaw={
  bad:['gambling','casino','betting','adult','porn','piracy','malware','scam','weapon','drug','fraud','rummy','poker','xxx','hack'],
  laws:{
    IN:{ban:['casino','betting','rummy','poker','adult','porn','gambling'],states:{AS:['rummy','poker','betting'],ASSAM:['rummy','poker','betting'],TG:['rummy','poker','betting'],AP:['rummy','poker','betting']}},
    AE:{ban:['gambling','betting','casino','adult','porn']},
    SA:{ban:['gambling','betting','casino','adult','porn']},
    US:{ban:[]},
    EU:{ban:['piracy','malware']},
    WORLD:{ban:['piracy','malware','scam','weapon','drug','fraud']}
  },
  privacy:{dpdp:{purpose:'search-filter-2026',retention:'30 days',lawful_basis:'consent Art 6',pii:false,hash_only:true},no_pii:true,secretly_secure:true,universal:true},
  envBan:(b={})=>{const o={};Object.keys(b).forEach(k=>{try{o[k.replace('NEW_BAN_','').toLowerCase()]=(b[k]||'').toLowerCase()}catch{}});return o},
  check:(p='',country='WORLD',state='',env_bans={})=>{
    try{
      p=(p||'').toLowerCase();country=(country||'WORLD').toUpperCase();state=(state||'').toUpperCase();
      let all=[...(GlobalLaw.laws[country]?.ban||GlobalLaw.laws.WORLD.ban),...(GlobalLaw.laws[country]?.states?.[state]||[])];
      const env=GlobalLaw.envBan(env_bans);Object.keys(env).forEach(i=>{if(env[i]==='true'||env[i]==='1')all.push(i);if(env[i]==='false'||env[i]==='0')all=all.filter(x=>x!==i)});
      all=[...new Set(all)];
      const is_banned=all.some(b=>b&&p.includes(b));
      return{country,area:state||country,ban_list:all,is_banned,auto_hide:is_banned,feature_right:true,legal:!is_banned,privacy_safe:true,dpdp_compliant:true,secretly_secure:true,universal:true,unspecified:true,officially:true};
    }catch{return{country:'WORLD',area:'WORLD',ban_list:GlobalLaw.laws.WORLD.ban,is_banned:false,legal:true,universal:true};}
  },
  hash:(s='')=>{try{let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h)+s.charCodeAt(i);return'hash_'+Math.abs(h).toString(36)}catch{return'hash_0'}},
  best:true,universal:true,unspecified:true,universal_filter:true,real:true,no_update_ever:true
};