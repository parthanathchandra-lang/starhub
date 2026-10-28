// api/reserves.js - Reserves - Secret hidden rare rights
export default (req,res)=>{
  return res.status(200).json({
    reserves: {
      secret: true,
      hidden: true,
      rare: true,
      rights: true,
      world: true,
      universe: true,
      global: true,
      reserve_files: 100000,
      range: '122+ 133±',
      year: 2026,
      legal: true,
      safe: true,
      free_only: true,
      heavy: false,
      storage: 'zero',
      done: true,
      win: true
    }
  });
};