import crypto from 'node:crypto';
import { put } from '@vercel/blob';
import { requireAdmin } from './_lib/auth.js';

const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const MAX_BYTES = 3.5 * 1024 * 1024;

// POST /api/upload  { dataUrl: "data:image/jpeg;base64,..." }  → { url }
// El navegador reduce la foto antes de enviarla, así cabe en el límite de Vercel.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }
  if (!requireAdmin(req, res)) return;
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: 'El almacenamiento (Vercel Blob) no está conectado al proyecto.' });
  }

  const match = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(req.body?.dataUrl || '');
  if (!match) return res.status(400).json({ error: 'Imagen no válida (usa JPG, PNG o WebP).' });

  const buffer = Buffer.from(match[2], 'base64');
  if (buffer.length > MAX_BYTES) return res.status(413).json({ error: 'La imagen es demasiado grande.' });

  try {
    const name = `images/${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${TYPES[match[1]]}`;
    const blob = await put(name, buffer, { access: 'public', contentType: match[1] });
    return res.status(200).json({ url: blob.url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message || 'No se pudo subir la imagen.' });
  }
}
