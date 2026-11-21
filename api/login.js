import { checkCredentials, createToken } from './_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(503).json({
      error: 'Falta configurar ADMIN_PASSWORD en Vercel (Settings → Environment Variables).',
    });
  }

  const { username, password } = req.body || {};
  if (checkCredentials(username, password)) {
    return res.status(200).json({ success: true, token: createToken(String(username).trim().toLowerCase()) });
  }

  // Pequeña pausa para frenar ataques de fuerza bruta.
  await new Promise((r) => setTimeout(r, 1000));
  return res.status(401).json({ success: false, error: 'Usuario o contraseña incorrectos.' });
}
