// api/infinite.js - Infinite scroll API - 100000
import { INFINITE } from '../lib/infinite.js';
export default (req,res)=>{
  const page = parseInt(req.query.page || '1');
  const data = INFINITE.getPage(page);
  return res.status(200).json({ infinite: data, win: true, done: true });
};