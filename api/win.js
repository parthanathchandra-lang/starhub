// api/win.js - Win algorithm - Best power
export const WIN_ALGO = {
  win: true,
  infinite: true,
  loop: true,
  best_more_than_big_platforms: true,
  power: 'Best Power Free Basis Web'
};
export default (req,res)=>{
  const n = parseInt(req.query.n || '122');
  return res.status(200).json({
    win: true,
    id: n,
    algorithm: 'win_algorithm',
    power: WIN_ALGO.power,
    infinite_loop: true,
    from: 122, to: 133, plus: '122+', minus_plus: '133±',
    year: 2026, day: 365, week: 52, month: 12,
    total_files: 100000,
    heavy: false, storage: 'zero', speed: 'unlimited',
    best: true, done: true,
    message: 'Win Infinite - Worlds Best Web'
  });
};