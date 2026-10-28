// lib/all.js - All wrapper - 100000 files
export const ALL = {
  total: 100000,
  range: { from: 122, to: 133, plus: '122+', minus_plus: '133±' },
  year: 2026,
  free_only: true,
  get: (id) => ({ id, win: true, best: true, done: true })
};