// lib/global-law.js - BEST - Universal unspecified - No touch main js - Add only
export const GlobalLaw = {
  bad: ['gambling','casino','betting','adult','porn','piracy','malware','scam','weapon','drug','fraud','rummy','poker','xxx','hack'],
  laws: {
    IN: { ban: ['casino','betting','rummy','poker','adult','porn','gambling'], states: { AS: ['rummy','poker','betting'], ASSAM: ['rummy','poker','betting'] } },
    AE: { ban: ['gambling','betting','casino','adult','porn'] },
    WORLD: { ban: ['piracy','malware','scam','weapon','drug','fraud'] }
  },
  check: (p, country='WORLD', state='') => {
    country = country.toUpperCase();
    const base = GlobalLaw.laws[country]?.ban || GlobalLaw.laws.WORLD.ban;
    const stateBan = GlobalLaw.laws[country]?.states?.[state.toUpperCase()] || [];
    const all = [...base, ...stateBan];
    return { is_banned: all.some(b=>p.includes(b)), ban_list: all, area: state||country, feature_right: true, auto_hide: all.some(b=>p.includes(b)) };
  }
};