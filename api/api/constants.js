// api/constants.js - Constants API
import { CONSTANTS } from '../lib/constants.js';
export default (req,res)=>{
  return res.status(200).json({ constants: CONSTANTS, done: true, win: true });
};