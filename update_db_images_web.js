import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'server', 'tours.db');
const db = new sqlite3.Database(dbPath);

const imagesDir = path.join(__dirname, 'public/images/downloads');
const downloadedFiles = fs.readdirSync(imagesDir).filter(file => /\.(png|jpe?g|heic)$/i.test(file));
let downloadedImages = downloadedFiles.map(img => `/images/downloads/${img}`);

// Extra web images if we run out of downloaded ones
const webImages = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1518182170546-0766de6b6acb?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1565138134768-466d74dc488e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1583507221287-73b320dae22c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1596423735880-5c6fa95a75b2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1533587851505-d119e13bf0b5?auto=format&fit=crop&q=80&w=800'
];

db.all('SELECT id, title, images FROM tours', (err, rows) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  let webIndex = 0;

  rows.forEach(tour => {
    let currentImages = [];
    try {
      currentImages = JSON.parse(tour.images);
    } catch (e) {
      currentImages = [];
    }

    if (!currentImages || currentImages.length === 0) {
      let assignedImage;
      if (downloadedImages.length > 0) {
        assignedImage = downloadedImages.shift(); // Take one from downloads
      } else {
        assignedImage = webImages[webIndex % webImages.length];
        webIndex++;
      }
      
      const newImagesJson = JSON.stringify([assignedImage]);
      
      db.run('UPDATE tours SET images = ? WHERE id = ?', [newImagesJson, tour.id], (updateErr) => {
        if (updateErr) console.error('Error updating tour', tour.id, updateErr);
        else console.log(`Updated tour ${tour.id} ("${tour.title}") with image: ${assignedImage}`);
      });
    }
  });
});
