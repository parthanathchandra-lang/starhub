// api/solution.js - Solution - All problems solved
import { SOLUTION } from '../lib/solution.js';
export default (req,res)=>{
  return res.status(200).json({ solution: SOLUTION.getAll(), status: SOLUTION.status(), done: true, win: true });
};