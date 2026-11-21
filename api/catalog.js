import { readCatalog, writeCatalog } from './_lib/catalog.js';
import { requireAdmin } from './_lib/auth.js';

// GET  /api/catalog          → catálogo público (tours + apartamentos), cacheado 1 min
// GET  /api/catalog?fresh=1  → versión sin caché (panel admin)
// PUT  /api/catalog          → guarda el catálogo completo (requiere sesión admin)
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const fresh = req.query?.fresh === '1';
      const catalog = await readCatalog({ fresh });
      res.setHeader(
        'Cache-Control',
        fresh ? 'no-store' : 'public, max-age=0, s-maxage=60, stale-while-revalidate=600'
      );
      return res.status(200).json(catalog);
    }

    if (req.method === 'PUT') {
      if (!requireAdmin(req, res)) return;
      const { tours, apartments } = req.body || {};
      if (!Array.isArray(tours) || !Array.isArray(apartments)) {
        return res.status(400).json({ error: 'Formato de catálogo inválido.' });
      }
      const hasInlineImages = [...tours, ...apartments].some((item) =>
        (item.images || []).some((img) => typeof img === 'string' && img.startsWith('data:'))
      );
      if (hasInlineImages) {
        return res.status(400).json({ error: 'Las imágenes deben subirse antes de guardar.' });
      }
      const saved = await writeCatalog({ tours, apartments });
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(saved);
    }

    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Método no permitido' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message || 'Error interno' });
  }
}
