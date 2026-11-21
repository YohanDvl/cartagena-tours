// Servidor local de desarrollo: ejecuta las mismas funciones de /api que usa
// Vercel en producción. Uso: `npm run server` (puerto 3001) junto a `npm run dev`.
//
// Para guardar en el almacenamiento real descarga las variables de Vercel:
//   npx vercel env pull .env.local
import 'dotenv/config';
import dotenv from 'dotenv';
import express from 'express';
import catalog from '../api/catalog.js';
import login from '../api/login.js';
import upload from '../api/upload.js';
import sitemap from '../api/sitemap.js';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '5mb' }));
app.all('/api/catalog', catalog);
app.all('/api/login', login);
app.all('/api/upload', upload);
app.get(['/api/sitemap', '/sitemap.xml'], sitemap);

app.listen(PORT, () => {
  console.log(`API local en http://localhost:${PORT}`);
  if (!process.env.ADMIN_PASSWORD) console.log('Aviso: falta ADMIN_PASSWORD en .env.local');
  if (!process.env.BLOB_READ_WRITE_TOKEN) console.log('Aviso: falta BLOB_READ_WRITE_TOKEN (solo lectura de datos de ejemplo)');
});
