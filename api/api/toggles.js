// api/toggle.js - Toggle - Auto
import { TOGGLE } from '../lib/toggle.js';
export default (req,res)=>{
  return res.status(200).json({ toggle: TOGGLE.getAll(), free_only: true, paid_enabled: false, done: true, win: true });
};