// api/creator.js - Creator economy - Reward - Free basis
export default (req,res)=>{
  return res.status(200).json({
    creator_economy: {
      free_only: true,
      paid_enabled: false,
      no_transaction: true,
      reward: true,
      owner_not_stress: true,
      rights: { dpdp: true, gdpr: true, coppa: true },
      features: ['122+','133±','Day','Week','Month','Whole Year'],
      total_creators: 100000,
      total_files: 100000,
      heavy: false,
      storage: 'zero',
      win: true,
      done: true,
      message: 'Creator economy - Free basis - Best power'
    }
  });
};