// lib/infinite.js - Infinite scroll - 1 file = 100000 - Storage zero
export const INFINITE = {
  total: 100000,
  per_page: 12,
  getPage: (page=1) => {
    const start = (page-1)*INFINITE.per_page + 1;
    const end = Math.min(start + INFINITE.per_page - 1, INFINITE.total);
    const items = [];
    for(let i=start; i<=end; i++){
      const type = i>=122 && i<=133 ? (i%2===0 ? '122+' : '133±') : 'auto';
      items.push({ id: i, name: `Auto ${i} - ${type} - Worlds Best Web`, type, range: '122+ 133±', year: 2026, instant: true, heavy: false, storage: 'zero', win: true, done: true });
    }
    return { page, per_page: INFINITE.per_page, total: INFINITE.total, total_pages: Math.ceil(INFINITE.total/INFINITE.per_page), items, infinite: true, win: true, done: true };
  },
  status: () => ({ infinite: true, total: 100000, per_page: 12, heavy: false, storage: 'zero', speed: 'unlimited', done: true })
};