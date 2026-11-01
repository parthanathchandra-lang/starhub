const mem=new Map();
export function getStore(){try{return localStorage;}catch{return {getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v),removeItem:k=>mem.delete(k),clear:()=>mem.clear()};}}
export function saveHistory(q){try{const S=getStore();let h=JSON.parse(S.getItem('starhub_history')||'[]');h=[q,...h.filter(x=>x!==q)].slice(0,20);S.setItem('starhub_history',JSON.stringify(h));}catch{}}
export function saveWatchLater(id){try{const S=getStore();let l=JSON.parse(S.getItem('starhub_watch_later')||'[]');l=[id,...l.filter(x=>x!==id)].slice(0,100);S.setItem('starhub_watch_later',JSON.stringify(l));}catch{}}
export function saveLikes(id){try{const S=getStore();let l=JSON.parse(S.getItem('starhub_likes')||'[]');l=[id,...l.filter(x=>x!==id)].slice(0,100);S.setItem('starhub_likes',JSON.stringify(l));}catch{}}
export default {getStore,saveHistory,saveWatchLater,saveLikes};