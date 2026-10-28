// api/performance.js - Performance - Speed unlimited
import { PERFORMANCE } from '../lib/performance.js';
export default (req,res)=>{
  return res.status(200).json({ performance: PERFORMANCE.audit(), headers: PERFORMANCE.getHeaders(), done: true, win: true });
};