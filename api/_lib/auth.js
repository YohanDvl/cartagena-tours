import crypto from 'node:crypto';

const SESSION_DAYS = 7;

function secret() {
  const base = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!base) throw new Error('ADMIN_PASSWORD no está configurada en Vercel');
  // Si cambias la contraseña, todas las sesiones abiertas se cierran.
  return crypto.createHash('sha256').update(`youtours-session:${base}`).digest();
}

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function checkCredentials(username, password) {
  const expectedUser = (process.env.ADMIN_USER || 'admin').toLowerCase();
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedPass) return false;
  const userOk = safeEqual(String(username || '').trim().toLowerCase(), expectedUser);
  const passOk = safeEqual(String(password || ''), expectedPass);
  return userOk && passOk;
}

export function createToken(username) {
  const payload = Buffer.from(
    JSON.stringify({ u: username, exp: Date.now() + SESSION_DAYS * 86400000 })
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  if (!safeEqual(sig, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

/** Devuelve true si la petición trae un token válido; si no, responde 401. */
export function requireAdmin(req, res) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  try {
    if (verifyToken(token)) return true;
  } catch (e) {
    res.status(500).json({ error: e.message });
    return false;
  }
  res.status(401).json({ error: 'Sesión expirada. Vuelve a iniciar sesión.' });
  return false;
}
