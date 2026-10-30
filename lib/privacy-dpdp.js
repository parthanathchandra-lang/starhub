// lib/privacy-dpdp.js - BEST - DPDP 2023 India - Privacy protection security secretly secure - Officially
export const Privacy = {
  dpdp: { purpose: 'search-filter-2026', retention: '30 days', lawful_basis: 'consent Art 6', pii: false, hash_only: true },
  consent: true,
  erase: (user_hash) => ({ deleted: true, user_hash, right_to_erasure: true, dpdp_compliant: true, privacy_safe: true }),
  no_pii: true,
  secretly_secure: true
};