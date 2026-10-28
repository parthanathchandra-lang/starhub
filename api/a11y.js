// api/a11y.js - A11y - Alt ARIA check
import { A11Y } from '../lib/a11y.js';
export default (req,res)=>{
  return res.status(200).json({ a11y: A11Y.status(), done: true, win: true });
};