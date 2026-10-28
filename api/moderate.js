// api/moderate.js - Moderate - Secret hidden rare - Safety
export default (req,res)=>{
  const content = (req.query.content || '').toLowerCase();
  const illegal = ['gambling','casino','betting','adult','porn','piracy','malware','scam','weapon','drug'];
  const isIllegal = illegal.some(x=>content.includes(x));
  return res.status(200).json({
    moderate: {
      content: content || 'all',
      legal: !isIllegal,
      safe: !isIllegal,
      should_run: !isIllegal,
      secret: false,
      hidden: false,
      rare: true,
      rights: true,
      reserves: true,
      dpdp: true,
      gdpr: true,
      free_only: true,
      done: true,
      win: true
    }
  });
};