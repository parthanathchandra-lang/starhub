// api/translate.js - Translate - Local global - World universe
export default (req,res)=>{
  const lang = (req.query.lang || 'en').toLowerCase();
  const dict = {
    en: { best: 'Worlds Best Web', range: '122+ 133±', year: 'Whole Year 2026', win: 'Win Infinite', done: 'DONE' },
    hi: { best: 'Duniya ka Sabse Best Web', range: '122+ 133±', year: 'Pura Saal 2026', win: 'Jeet Infinite', done: 'HO GAYA' },
    as: { best: 'Prithibir Best Web', range: '122+ 133±', year: 'Guta Bosor 2026', win: 'Joy Infinite', done: 'DONE' }
  };
  return res.status(200).json({
    translate: { lang, dict: dict[lang] || dict.en, local: true, global: true, world: true, universe: true, auto: true, done: true, win: true }
  });
};