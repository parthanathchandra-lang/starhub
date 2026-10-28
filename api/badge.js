// api/badge.js - Badge - Best power - Win
export default (req,res)=>{
  const n = parseInt(req.query.n || '122');
  const badge = n>=122 && n<=133 ? 'BEST - 122+ 133±' : n>=1 && n<=100000 ? 'AUTO - Win' : 'WORLDS BEST WEB';
  return res.status(200).json({
    badge: {
      id: n,
      badge,
      range: '122+ 133±',
      year: 2026,
      win: true,
      best: true,
      best_more_than_big_platforms: true,
      heavy: false,
      storage: 'zero',
      done: true
    }
  });
};