// Public config only. Yahan secret keys mat rakhna (service_role nahi).
window.SITE_CONFIG = {
  supabaseUrl: "https://tsomtfhynwhjsypojlbn.supabase.co",
  supabaseAnonKey: "PASTE_PUBLISHABLE_KEY_FROM_DASHBOARD",
  mirrors: [
    "https://starhubigdp.vercel.app",
    "https://starhubigdp.pages.dev",
    "https://starhubigdp.netlify.app",
    "https://starhubigdp.surge.sh"
    // naya domain yahan add karo
  ],
  apis: {
    webhook: "https://starhubigdp.vercel.app/api/webhook",
    kv: "https://starhubigdp.pages.dev/api/kv"
  }
};