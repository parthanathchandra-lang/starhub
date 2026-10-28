// api/user.js - User - Free only - No KYC - No stress
export default (req,res)=>{
  return res.status(200).json({
    user: {
      free_only: true,
      paid_enabled: false,
      kyc: false,
      age_18: false,
      no_transaction: true,
      owner_not_stress: true,
      auto_toggle: true,
      rights: { dpdp: true, gdpr: true, coppa: true },
      features: ['122+','133±','Day','Week','Month','Whole Year 2026'],
      total: 100000,
      heavy: false,
      storage: 'zero',
      done: true
    }
  });
};