// api/health.js - Health - Docker - Keep alive
export default (req,res)=>{
  return res.status(200).json({
    health: 'alive',
    version: '8.0 - Worlds Best Web',
    range: '122+ 133±',
    year: 2026,
    total_files: 100000,
    docker: true,
    ping: true,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    heavy: false,
    storage: 'zero',
    speed: 'unlimited',
    done: true,
    win: true
  });
};