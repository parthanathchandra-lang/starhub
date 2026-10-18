// Best Advance - Universal Auto - Any ENV future auto - Owner not stress
export default async function handler(req, res) {
  const env = process.env || {};
  const allEnv = Object.keys(env);
  const autoDomains = allEnv.filter(k => /DOMAIN/i.test(k));
  const autoStorage = allEnv.filter(k => /STORAGE/i.test(k));
  const autoDB = allEnv.filter(k => /DB_/i.test(k));
  let items = [];
  try {
    let f = await fetch('https://www.freetogame.com/api/games?sort-by=popularity').then(r => r.json());
    items = f.slice(0,20).map(g => ({ id: g.id, title: g.title, link: g.game_url, type: 'free' }));
  } catch(e) { items = [{ id: 'fallback', title: 'Pokémon UNITE', link: 'https://play.google.com/store/apps/details?id=jp.pokemon.pokemonunite' }]; }
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).json({
    engine: 'auto-universal Best Advance',
    env_total: allEnv.length,
    auto_detected: { domains: autoDomains, storage: autoStorage, db: autoDB },
    count: items.length,
    items: items,
    free_basis: { paid_enabled: false, auto_toggle: true, owner_not_stress: true, never_lower: true }
  });
}