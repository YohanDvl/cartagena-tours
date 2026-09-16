import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toursDir = path.resolve(__dirname, '../src/data/tours');

fs.readdir(toursDir, (err, files) => {
  if (err) {
    console.error('Error leyendo directorio de tours:', err);
    return;
  }

  const jsonFiles = files.filter(f => f.endsWith('.json'));
  let inserted = 0;

  jsonFiles.forEach(file => {
    const filePath = path.join(toursDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const sql = `INSERT INTO tours (id, title, shortDescription, fullDescription, price, duration, rating, reviews, images, category, includes, notIncludes, itinerary)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      data.id,
      data.title,
      data.shortDescription,
      data.fullDescription,
      data.price,
      data.duration,
      data.rating || 5.0,
      data.reviews || 0,
      JSON.stringify(data.images || []),
      data.category || '',
      JSON.stringify(data.includes || []),
      JSON.stringify(data.notIncludes || []),
      JSON.stringify(data.itinerary || [])
    ];

    db.run(sql, params, (err) => {
      if (err) {
        // Ignorar error si ya existe por ID
        if (!err.message.includes('UNIQUE constraint failed')) {
           console.error(`Error insertando ${file}:`, err.message);
        }
      } else {
        inserted++;
      }
    });
  });

  setTimeout(() => {
    console.log(`Migración completada: ${inserted} tours insertados.`);
    process.exit(0);
  }, 2000);
});
