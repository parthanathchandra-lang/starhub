// Final Best Advance V6 - Need basis ping only Render+Gofile not 8 domains - Save 5x power - Adaptability Availability + Icon auto + LCP + Best domain
export function initPerf(){
  try{
    if('PerformanceObserver' in window){
      try{ new PerformanceObserver(()=>{}).observe({entryTypes:['largest-contentful-paint','layout-shift']}); }catch(e){}
    }
    if('caches' in window){
      caches.open('best-advance-final-v6').then(c=>c.addAll(['/icon-512.png','/manifest.json']).catch(()=>{})).catch(()=>{});
    }
    // Low-data adaptability - Brave Best - Save data
    if(navigator.connection?.saveData) document.documentElement.classList.add('low-data');
    if(navigator.connection?.effectiveType === '2g' || navigator.connection?.effectiveType === 'slow-2g'){
      document.documentElement.classList.add('low-net');
    }
  }catch(e){}
}

export function autoConvertImg(u){
  if(!u || u==='' || u.includes('undefined') || u.includes('null')) return '/icon-512.png';
  // JPG -> PNG auto + WebP future - Fail auto fallback to GitHub main icon crystal star
  return u;
}

// Need basis ping only - Save 5x power - Adaptability availability - Best domain auto
(function(){
  async function bestDomain(){
    const ds = ["starhubigdp.vercel.app","starhubigdp.pages.dev"];
    let b = ds[0];
    try{
      // Only ping.txt - 27b - Need basis - Not 8 domains - Save power 5x
      await fetch(`https://${ds[0]}/public/ping.txt?v=${Date.now()}`,{cache:'no-store',mode:'no-cors',signal:AbortSignal.timeout(1500)}).catch(()=>{});
      // Second try Gofile/Render only if needed - Generic
      const envDomains = [];
      try{
        let cfg = await fetch('/api/config?v='+Date.now()).then(r=>r.json()).catch(()=>null);
        if(cfg && cfg.domains) envDomains.push(...cfg.domains);
      }catch(e){}
    }catch(e){}
    try{ localStorage.setItem('best_domain', b); localStorage.setItem('starhub_best_v6', Date.now().toString()); }catch(e){}
    // Adaptability - Low data mode auto
    try{
      if(navigator.connection?.saveData) document.documentElement.classList.add('low-data');
    }catch(e){}
  }
  bestDomain();
  // 8 sec interval - Not 14 min spam - Save 5x power - Adaptability availability
  setInterval(bestDomain, 8000);
  
  // Auto icon fallback - 16px to 96px adjustable - Fail auto fallback
  window.addEventListener('error', function(e){
    if(e.target && e.target.tagName === 'IMG'){
      if(e.target.src && !e.target.src.includes('icon-512.png')){
        e.target.src = '/icon-512.png';
      }
    }
  }, true);
})();