// api/docker.js - Docker API
import { DOCKER } from '../lib/docker.js';
export default (req,res)=>{
  return res.status(200).json({ docker: DOCKER.status(), done: true, win: true });
};