export default function handler(req,res){
 const q=(req.query.q||'').toLowerCase(); let ans="FREE_ONLY PAID=false Real Links Only Others gateway Their KYC - Teacher beneficial for all - User picks - Self cleaning - Constitution area wise";
 if(q.includes('free')) ans="Yes FREE_ONLY PAID=false No owner gateway Others gateway Their KYC No Cookie No Tracking Universal laws";
 if(q.includes('legal')) ans="Legal constitution.json IN DPDP IT Act EU GDPR US DMCA COPPA - No Hosting Real Links Only";
 if(q.includes('earn')) ans="Earn owner direct UPI QR separate wallet Crypto direct ?aff=starhub direct - Web hold nahi - Owner safe";
 res.json({question:q,answer:ans});
}