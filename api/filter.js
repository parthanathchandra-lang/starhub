// api/filter.js - Filter 122+ 133± - Whole Year - Unique - Best
import { FILTER_ENGINE } from '../lib/filter-engine.js';
export default (req,res)=>{
  const type = req.query.type || 'all';
  const value = parseInt(req.query.value || '122');
  if(type==='all'){
    return res.status(200).json({ filter: FILTER_ENGINE.wholeYear(), done: true, win: true });
  }
  return res.status(200).json({ filter: FILTER_ENGINE.filter(type, value), type, value, done: true, win: true });
};