// lib/toggle.js - Toggle - Auto - Free only lock
export const TOGGLE = {
  FREE_ONLY: true,
  PAID_ENABLED: false,
  auto: (feature, date) => {
    const now = new Date();
    const enableDate = new Date(date);
    return now >= enableDate ? { feature, enabled: true, auto: true, free_only: true, done: true } : { feature, enabled: false, auto: false, free_only: true, done: true };
  },
  getAll: () => ({
    voice: { enabled: false, future: false, free_only: true },
    image: { enabled: false, future: false, free_only: true },
    video: { enabled: false, future: false, free_only: true },
    blockchain: { enabled: false, future: '2027-01-01', free_only: true },
    nft: { enabled: false, future: '2027-01-01', free_only: true },
    metaverse: { enabled: false, future: '2028-01-01', free_only: true },
    paid: { enabled: false, forever: false, free_only: true },
    done: true,
    win: true
  })
};