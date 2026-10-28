// lib/feature-manager.js
// SECOND FILE - Worlds Best Web - Smart Manager - FINAL - Best
// Jo file nahi chalna chahiye na chela - Jo chalna chahiye chalega
// Auto adjust adaptability - Situation ke hisab se - Kab chalega kab nahi

export const FEATURE_MANAGER = {
  // FLAGS - true = chalega, false = nahi - Simple
  FLAGS: {
    // Core - Chalega abhi - 50+ - Legal safe
    ai: true, recommend: true, rank: true, feature: true, moderate: true, secret: true, hidden: true, rare: true, rights: true, reserves: true,
    world: true, universe: true, global: true, translate: true, local: true, win_algorithm: true, best_algorithm: true, compete: true, growth: true, power: true,
    offline: true, creator_economy: true, reward: true, security_audit: true, legal_audit: true, performance: true,
    analytics: true, infinite: true, auto: true, filter_2026: true, search: true, user: true, community: true, forum: true, groups: true,
    // Future - Nahi chalega abhi - Situation pe auto
    voice: false, image: false, video: false, blockchain: false, nft: false, metaverse: false, ar: false, vr: false, chat: false, monetize: false,
    super_auto: false, mega_auto: false
  },

  // ILLEGAL - Kabhi nahi - 403
  ILLEGAL: ['gambling','casino','betting','adult','porn','piracy','malware','scam','weapon','drug','fraud'],

  // RANGE - 122+ 133± Whole Year 2026
  RANGE: { min: 122, max: 133, plus: true, minus_plus: true, year: 2026, day: 365, week: 52, month: 12, total: 100000 },

  // ADAPT - Kab chalega - Situation
  ADAPT: {
    voice: { when: 'Browser me speechSynthesis ho', check: () => typeof window !== 'undefined' && 'speechSynthesis' in window, auto: true },
    offline: { when: 'SW support ho', check: () => typeof navigator !== 'undefined' && 'serviceWorker' in navigator, auto: true },
    blockchain: { when: '2027 ke baad', check: () => Date.now() > Date.parse('2027-01-01'), auto: true },
    nft: { when: '2027 ke baad', check: () => Date.now() > Date.parse('2027-01-01'), auto: true },
    metaverse: { when: '2028 ke baad', check: () => Date.now() > Date.parse('2028-01-01'), auto: true },
    ar: { when: 'XR API ho', check: () => typeof navigator !== 'undefined' && 'xr' in navigator, auto: true },
    vr: { when: 'XR API ho', check: () => typeof navigator !== 'undefined' && 'xr' in navigator, auto: true },
    chat: { when: 'Moderation ready - Manual', check: () => false, auto: false },
    monetize: { when: 'Free basis - Kabhi nahi', check: () => false, auto: false },
    auto: { when: 'Hamesha - 1 to 100000', check: () => true, auto: true },
    super_auto: { when: '1000 tak', check: (n) => n <= 1000, auto: true },
    mega_auto: { when: '10000 tak', check: (n) => n <= 10000, auto: true }
  },

  isLegal: (f) => {
    if(!f) return true;
    return !FEATURE_MANAGER.ILLEGAL.some(x => f.toLowerCase().includes(x));
  },

  isEnabled: (f) => {
    if(!f) return true;
    return FEATURE_MANAGER.FLAGS[f.toLowerCase()] ?? true;
  },

  shouldRun: (feature, num=0) => {
    if(!feature) return true;
    const f = feature.toLowerCase();
    if(!FEATURE_MANAGER.isLegal(f)) return false; // Illegal never
    const rule = FEATURE_MANAGER.ADAPT[f];
    if(!rule) return FEATURE_MANAGER.isEnabled(f); // No rule = flag
    if(!rule.auto) return false; // manual/never = false
    return rule.check(num); // situation check
  },

  getSituation: (file) => {
    const rule = FEATURE_MANAGER.ADAPT[file];
    if(!rule) return { file, should_run: FEATURE_MANAGER.shouldRun(file), when: 'Abhi - Hamesha', auto: 'Yes' };
    return { file, should_run: FEATURE_MANAGER.shouldRun(file), when: rule.when, auto: rule.auto ? 'Yes - Auto' : 'No - Manual/Blocked' };
  },

  getStatus: () => {
    return {
      total: Object.keys(FEATURE_MANAGER.FLAGS).length,
      enabled: Object.values(FEATURE_MANAGER.FLAGS).filter(v=>v).length,
      disabled: Object.values(FEATURE_MANAGER.FLAGS).filter(v=>!v).length,
      range: FEATURE_MANAGER.RANGE,
      legal: true, safe: true, auto: true, delete_safe: true, done: true
    };
  }
};

export function shouldRunFile(file, num=0){
  const f = file.replace('api/','').replace('.js','').replace('auto-','');
  return FEATURE_MANAGER.shouldRun(f, num);
}

export function isLegalFile(file){
  return FEATURE_MANAGER.isLegal(file);
}