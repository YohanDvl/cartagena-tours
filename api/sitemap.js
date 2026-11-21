import { readCatalog } from './_lib/catalog.js';

const SITE = 'https://youtourscartagena.vercel.app';

// /sitemap.xml → se genera con el catálogo actual, así Google descubre
// automáticamente cada tour o apartamento nuevo que agregues en el panel.
export default async function handler(req, res) {
  let catalog;
  try {
    catalog = await readCatalog();
  } catch {
    catalog = { tours: [], apartments: [] };
  }
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ['/', '1.0'],
    ...catalog.tours.map((t) => [`/tour/${encodeURIComponent(t.id)}`, '0.9']),
    ...catalog.apartments.map((a) => [`/apartamento/${encodeURIComponent(a.id)}`, '0.8']),
    ['/terminos-y-condiciones', '0.3'],
    ['/politica-de-privacidad', '0.3'],
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(([loc, priority]) => `  <url><loc>${SITE}${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`)
  .join('\n')}
</urlset>
`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(xml);
}
