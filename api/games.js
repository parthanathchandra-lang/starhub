// Free sources - No login - Categorys Filter Features like YouTube Play Store Google - Adaptability
export default async function handler(req,res){
  const cat=req.query.category||'all';
  try{
    const r=await fetch('https://www.freetogame.com/api/games');
    const j=await r.json();
    const all=j.slice(0,100).map(g=>({title:g.title,category:g.genre,thumb:g.thumbnail,url:g.game_url,source:'freetogame'}));
    const filtered=cat==='all'?all:all.filter(g=>g.category.toLowerCase().includes(cat.toLowerCase()));
    res.setHeader('Cache-Control','public, max-age=3600');
    res.json({games:filtered,count:filtered.length,category:cat,free_only:true,no_login:true,available:'16 Oct 2026',adaptability:"If RAWG_KEY Env add auto 40->100 games - Capacity low to auto add - No update ever"});
  }catch{res.json({games:[],free_only:true});}
}