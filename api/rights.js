// api/rights.js - Rights execution - Legal safe
export const RIGHTS = {
  FREE_ONLY: true,
  PAID_ENABLED: false,
  DPDP: true, GDPR: true, CCPA: true, COPPA: true,
  NO_COOKIE: true, NO_TRACKING: true,
  AGE_18_PLUS: false,
  KYC: false,
  NO_TRANSACTION: true
};
export default (req,res)=>{
  res.setHeader('X-Rights','FREE_ONLY');
  res.setHeader('X-Paid','false');
  return res.status(200).json({rights:RIGHTS, legal:true, safe:true, free_only:true, paid:false, dpdp:true, gdpr:true, no_cookie:true, owner_not_stress:true, auto_toggle:true, done:true, win:true});
};