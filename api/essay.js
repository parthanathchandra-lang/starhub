// api/essay.js - Essay - Auto think
import { ESSAY } from '../lib/essay.js';
export default (req,res)=>{
  const topic = req.query.topic || 'Worlds Best Web';
  return res.status(200).json({ essay: ESSAY.think(topic), auto_think: true, improve: true, done: true, win: true });
};