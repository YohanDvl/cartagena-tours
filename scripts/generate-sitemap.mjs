// Genera public/sitemap.xml con una URL por cada tour y apartamento.
// Se ejecuta automáticamente antes de cada build (ver package.json).
import { writeFileSync } from 'node:fs';
import { defaultTours, defaultApartments } from '../src/data/defaultData.js';

const SITE = 'https://youtourscartagena.vercel.app';
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  ...defaultTours.map((t) => ({ loc: `/tour/${t.id}`, priority: '0.9', changefreq: 'weekly' })),
  ...defaultApartments.map((a) => ({ loc: `/apartamento/${a.id}`, priority: '0.8', changefreq: 'weekly' })),
  { loc: '/terminos-y-condiciones', priority: '0.3', changefreq: 'yearly' },
  { loc: '/politica-de-privacidad', priority: '0.3', changefreq: 'yearly' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml generado con ${urls.length} URLs`);
