import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'server', 'tours.db');
const db = new sqlite3.Database(dbPath);

const beachImages = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', // Tropical beach
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800', // Clear water beach
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800', // Palm trees beach
  'https://images.unsplash.com/photo-1533587851505-d119e13bf0b5?auto=format&fit=crop&q=80&w=800', // Aerial beach
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800', // Snorkeling water
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800' // Relaxing beach chair
];

const cityImages = [
  'https://images.unsplash.com/photo-1583507221287-73b320dae22c?auto=format&fit=crop&q=80&w=800', // Cartagena street
  'https://images.unsplash.com/photo-1596423735880-5c6fa95a75b2?auto=format&fit=crop&q=80&w=800', // Colorful architecture
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', // Sunny city
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800', // Sunset city
  'https://images.unsplash.com/photo-1444723121867-7a241cbdefac?auto=format&fit=crop&q=80&w=800'  // City street people
];

const natureImages = [
  'https://images.unsplash.com/photo-1518182170546-0766de6b6acb?auto=format&fit=crop&q=80&w=800', // Jungle coast (Tayrona vibe)
  'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800', // Forest path
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800', // Green landscape
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', // Eco tourism
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800'  // Nature hike
];

const boatImages = [
  'https://images.unsplash.com/photo-1565138134768-466d74dc488e?auto=format&fit=crop&q=80&w=800', // Yacht
  'https://images.unsplash.com/photo-1516663713099-37ea96e1d2d7?auto=format&fit=crop&q=80&w=800', // Boat party
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800', // Catamaran sunset
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800'  // Mountain lake boat
];

// Shuffle helper
function getRandom(arr, n) {
  let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
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
    let title = tour.title.toLowerCase();
    let category = (tour.category || '').toLowerCase();
    
    let selectedPool = beachImages;

    if (title.includes('tayrona') || title.includes('minca') || title.includes('manglares') || title.includes('totumo') || title.includes('aviario') || title.includes('palomino') || title.includes('buritaca') || category.includes('naturaleza') || category.includes('aventura')) {
      selectedPool = natureImages;
    } else if (title.includes('city') || title.includes('amurallada') || title.includes('palenque') || title.includes('castillo') || title.includes('barranquilla') || category.includes('cultural')) {
      selectedPool = cityImages;
    } else if (title.includes('boat') || title.includes('catamarán') || title.includes('chiva') || title.includes('yate')) {
      selectedPool = boatImages;
    } else {
      selectedPool = beachImages;
    }

    const imagesToAssign = getRandom(selectedPool, 3);
    const newImagesJson = JSON.stringify(imagesToAssign);

    db.run('UPDATE tours SET images = ? WHERE id = ?', [newImagesJson, tour.id], (updateErr) => {
      if (updateErr) console.error(updateErr);
      else console.log(`Assigned 3 matching images to: ${tour.title}`);
    });
  });
});
