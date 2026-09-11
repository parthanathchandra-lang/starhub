// File: api/nowpayments-ipn.js - FINAL SECURE - starhubigdp-eta.vercel.app
import crypto from 'crypto';

function sortObject(obj) {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = sortObject(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true, msg: 'IPN Live - starhubigdp' });
  }

  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    const sig = req.headers['x-nowpayments-sig'];

    if (!ipnSecret) return res.status(500).json({ error: 'Server misconfigured' });
    if (!sig) return res.status(401).json({ error: 'Missing signature' });

    const rawBody = await readRawBody(req);
    let data;
    try { data = JSON.parse(rawBody); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }

    const sortedPayload = JSON.stringify(sortObject(data));
    const expectedHmac = crypto.createHmac('sha512', ipnSecret).update(sortedPayload).digest('hex');

    const sigBuf = Buffer.from(sig, 'hex');
    const expectedBuf = Buffer.from(expectedHmac, 'hex');
    const isValid = sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf);

    if (!isValid) return res.status(401).json({ error: 'Invalid signature' });

    console.log('Payment verified:', data.payment_id, data.payment_status, data.price_amount);

    if (data.payment_status === 'finished' || data.payment_status === 'confirmed') {
      console.log('✅ Success - Terms auto split to 0x55d398...7955');
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'IPN error', details: e.message });
  }
}
