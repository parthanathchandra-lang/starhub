// lib/future.js - Future - Auto enable - Best
export const FUTURE = {
  blockchain: { date: '2027-01-01', enabled: false, free_only: true },
  nft: { date: '2027-01-01', enabled: false, free_only: true },
  metaverse: { date: '2028-01-01', enabled: false, free_only: true },
  voice: { enabled: false, free_only: true },
  image: { enabled: false, free_only: true },
  video: { enabled: false, free_only: true },
  check: (feature) => {
    const f = FUTURE[feature];
    if(!f) return { enabled: false, done: true };
    if(f.date) return { feature, enabled: new Date() >= new Date(f.date), date: f.date, free_only: true, done: true };
    return { feature, enabled: f.enabled, free_only: true, done: true };
  }
};