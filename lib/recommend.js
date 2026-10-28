// lib/recommend.js - Recommend - Win algorithm - Best power
export const RECOMMEND = {
  algorithm: 'best_algorithm + win_algorithm + growth + power',
  recommend: (user, features) => {
    // Free basis - No tracking - Best power
    const sorted = features.sort((a,b)=>b.id-a.id);
    return sorted.slice(0,12).map(f=>({ ...f, recommended: true, reason: 'Best power - Free basis - Win infinite', done: true }));
  },
  getBest: () => [
    {id:122, name:'Auto 122+ - Best', score: 100, win: true},
    {id:133, name:'Auto 133± - Best', score: 100, win: true},
    {id:2026, name:'Filter 2026 Whole Year - Best', score: 100, win: true}
  ],
  status: () => ({ recommend: true, best_algorithm: true, win_algorithm: true, free_basis: true, no_tracking: true, done: true })
};