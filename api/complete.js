// api/compete.js - Compete - Big platforms
import { COMPETE } from '../lib/compete.js';
export default (req,res)=>{
  const platforms = (req.query.platforms || 'google,youtube,facebook').split(',');
  return res.status(200).json({ compete: COMPETE.compete(platforms), done: true, win: true });
};