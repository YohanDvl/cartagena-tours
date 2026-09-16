import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'server', 'tours.db');
const db = new sqlite3.Database(dbPath);

const imagesDir = path.join(__dirname, 'public/images');
const files = fs.readdirSync(imagesDir);

// Filtrar solo imagenes locales (excluir youtours-logo y carpetas)
const localImages = files.filter(file => {
  if (file.includes('youtours-logo')) return false;
  return /\.(png|jpe?g|heic)$/i.test(file);
}).map(file => `/images/${file}`);

if (localImages.length === 0) {
  console.log('No hay imagenes locales disponibles.');
  process.exit(1);
}

// Helper para sacar imagenes al azar
function getRandom(arr, n) {
  let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len) n = len; // Si hay menos imagenes de las pedidas
  while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

db.all('SELECT id, title, category FROM tours', (err, rows) => {
  if (err) throw err;

  rows.forEach(tour => {
    // Tomamos 3 imagenes locales al azar para cada tour
    const imagesToAssign = getRandom(localImages, 3);
    const newImagesJson = JSON.stringify(imagesToAssign);

    db.run('UPDATE tours SET images = ? WHERE id = ?', [newImagesJson, tour.id], (updateErr) => {
      if (updateErr) console.error(updateErr);
      else console.log(`Asignadas imagenes locales a: ${tour.title}`);
    });
  });
});

// Tambien para los apartamentos
db.all('SELECT id, title FROM apartments', (err, rows) => {
  if (err) {
    console.log('No apartments table or error', err.message);
    return;
  }
  rows.forEach(apt => {
    const imagesToAssign = getRandom(localImages, 3);
    const newImagesJson = JSON.stringify(imagesToAssign);

    db.run('UPDATE apartments SET images = ? WHERE id = ?', [newImagesJson, apt.id], (updateErr) => {
      if (updateErr) console.error(updateErr);
      else console.log(`Asignadas imagenes locales a apartamento: ${apt.title}`);
    });
  });
});
