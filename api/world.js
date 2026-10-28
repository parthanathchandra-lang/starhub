// api/world.js - World - Local global universe
import { WORLD } from '../lib/world.js';
export default (req,res)=>{
  return res.status(200).json({ world: WORLD.getWorld(), done: true, win: true });
};