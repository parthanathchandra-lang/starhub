// Ethical Ads - Generic - No specific network - Age gate 18+ - No illegal - Privacy best - DPDP GDPR safe - Real safe
(function(){
  function isAllowed(){
    try{
      if(localStorage.getItem('age_gate')!=='18+')return false;
      if(localStorage.getItem('ads_opt_out')==='1')return false;
      return true;
    }catch{return false;}
  }
  window.ethicalAds={
    showAds:function(){
      if(!isAllowed())return;
      const el=document.getElementById('ads-container');
      if(!el)return;
      // No specific network - Placeholder only - Owner will inject ethical script manually if needed
      // Privacy best - No cookie - No tracking - Info-Only - Free only locked
      el.setAttribute('data-ethical','true');
      el.setAttribute('data-privacy','no-cookie');
      el.innerHTML='<div style="background:#111;border:1px dashed #333;padding:16px;text-align:center;color:#888;font-size:13px">Ethical Ads Placeholder - No tracking - No cookie - Age 18+ only - Info only - PAID_ENABLED=false</div>';
      console.log('Ethical Ads: placeholder ready - No specific network - Real safe');
    },
    hideAds:function(){
      const el=document.getElementById('ads-container');
      if(el)el.innerHTML='';
    }
  };
  try{if(isAllowed())window.ethicalAds.showAds();}catch{}
})();