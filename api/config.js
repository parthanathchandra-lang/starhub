// Best Advance - Config Generic - Future any feature auto
export default async function handler(req, res) {
  const env = process.env || {};
  const get = (names) => { for(let n of names) if(env[n]) return env[n]; return ''; };
  return res.status(200).json({
    version: 'v6-best-advance-final',
    paid_enabled: false,
    free_only: true,
    icon: '/icon-512.png',
    icon_main: 'starhubigdp main crystal star',
    theme: '#01875f',
    capabilities: ['Play Store Best','YouTube Best','Google Best','Pinterest Best','Brave Best','Creator Studio Best','Safety Best'],
    env_generic: true,
    future_proof: true,
    never_lower: true,
    rawg_available: !!get(['RAWG_KEY','RAWG_API_KEY']),
    youtube_available: !!get(['YT_KEY','YOUTUBE_KEY']),
    auto_organised: true
  });
}