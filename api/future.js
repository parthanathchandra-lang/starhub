// api/future.js - Future - Auto enable when possible - Free only
export default (req,res)=>{
  const future = [
    { id: 2027, feature: 'blockchain', auto: '2027-01-01', enabled: false, free_only: true },
    { id: 2027, feature: 'nft', auto: '2027-01-01', enabled: false, free_only: true },
    { id: 2028, feature: 'metaverse', auto: '2028-01-01', enabled: false, free_only: true },
    { id: 2026, feature: 'voice', auto: false, enabled: false, free_only: true },
    { id: 2026, feature: 'image', auto: false, enabled: false, free_only: true },
    { id: 2026, feature: 'video', auto: false, enabled: false, free_only: true }
  ];
  return res.status(200).json({
    future: { year: 2026, total: future.length, features: future, auto_enable: 'When possible auto - No owner stress', free_only: true, done: true, win: true }
  });
};