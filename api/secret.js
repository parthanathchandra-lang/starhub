// api/secret.js - Secret - Hidden rare
import { SECRET } from '../lib/secret.js';
export default (req,res)=>{
  return res.status(200).json({ secret: SECRET.getSecret(), done: true, win: true });
};