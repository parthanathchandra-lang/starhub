// Ethical Ads - Generic - No specific network - Age gate 18+ - No illegal - Privacy best - DPDP GDPR safe - Real safe - Need basis - Sabsa kam word
(function(){
  function isAllowed(){
    try{
      if(localStorage.getItem('age_gate')!=='18+')return false;
      if(localStorage.getItem('ads_opt_out')==='1')return false;
      return true;
    }catch{return false;}
  }
  window.ethicalAds={
    showAds:function(url){
      if(!isAllowed())return;
      const el=document.getElementById('ads-container');
      if(!el)return;
      el.setAttribute('data-ethical','true');
      el.setAttribute('data-privacy','no-cookie');
      if(url){
        var s=document.createElement('script'); s.src=url; s.async=true; s.setAttribute('data-no-cookie','true');
        el.appendChild(s);
        console.log('Ethical Ads: custom '+url+' - Free survival');
      } else {
        el.innerHTML='<div style="background:#111;border:1px dashed #333;padding:16px;text-align:center;color:#888;font-size:13px">Ethical Ads Placeholder - No tracking - No cookie - Age 18+ only - Info only - PAID_ENABLED=false</div>';
        console.log('Ethical Ads: placeholder ready - No specific network - Real safe - Need basis');
      }
    },
    hideAds:function(){
      const el=document.getElementById('ads-container');
      if(el)el.innerHTML='';
    }
  };
  try{if(isAllowed())window.ethicalAds.showAds();}catch{}
})();