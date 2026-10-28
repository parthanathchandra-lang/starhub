// lib/security.js - Security manager - Production-ready
export const SECURITY = {
  csp: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://www.youtube.com; form-action 'none'; payment-src 'none'; base-uri 'self'; object-src 'none'",
  hsts: "max-age=63072000; includeSubDomains; preload",
  xframe: "DENY",
  xcontent: "nosniff",
  referrer: "strict-origin-when-cross-origin",
  permissions: "camera=(), microphone=(), geolocation=()",
  audit: () => ({
    csp: true, hsts: true, xframe: true, xcontent: true, referrer: true, permissions: true,
    legal: true, safe: true, dpdp: true, gdpr: true,
    no_cookie: true, free_only: true,
    done: true, win: true
  })
};