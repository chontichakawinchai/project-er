const GAS_URL = process.env.GAS_URL || 'YOUR_GAS_DEPLOY_URL';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const params = new URLSearchParams(req.query).toString();
      const url = params ? `${GAS_URL}?${params}` : GAS_URL;
      const gasRes = await fetch(url, { redirect: 'follow' });
      const data = await gasRes.text();
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(data);
    } catch (err) {
      return res.status(200).json({ ok: false, error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      const gasRes = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
        redirect: 'follow',
      });
      const data = await gasRes.text();
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(data);
    } catch (err) {
      return res.status(200).json({ ok: true, proxied: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
