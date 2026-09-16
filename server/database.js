import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a la base de datos (se creará si no existe en la carpeta server)
const dbPath = path.resolve(__dirname, 'tours.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
    
    // Crear tabla de tours si no existe
    db.run(`
      CREATE TABLE IF NOT EXISTS tours (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        shortDescription TEXT,
        fullDescription TEXT,
        price INTEGER,
        priceChild INTEGER DEFAULT 0,
        duration TEXT,
        rating REAL DEFAULT 5.0,
        reviews INTEGER DEFAULT 0,
        images TEXT,
        category TEXT,
        includes TEXT,
        notIncludes TEXT,
        itinerary TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla tours:', err.message);
      } else {
        console.log('Tabla tours lista.');
        // Intentar añadir la columna priceChild si la tabla ya existía (ignorará el error si ya existe)
        db.run("ALTER TABLE tours ADD COLUMN priceChild INTEGER DEFAULT 0", (err) => {
           if(err) { /* Ignorar, ya existe */ }
        });
        db.run("ALTER TABLE tours ADD COLUMN isBestSeller INTEGER DEFAULT 0", (err) => {
           if(err) { /* Ignorar, ya existe */ }
        });
      }
    });

    // Opcional: Crear tabla de administradores
    db.run(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        securityQuestion TEXT,
        securityAnswer TEXT
      )
    `, (err) => {
      if (!err) {
        // Intentar añadir las columnas si la tabla ya existía
        db.run("ALTER TABLE admins ADD COLUMN securityQuestion TEXT", () => {});
        db.run("ALTER TABLE admins ADD COLUMN securityAnswer TEXT", () => {});
      }
    });

    // Crear tabla de apartamentos
    db.run(`
      CREATE TABLE IF NOT EXISTS apartments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        shortDescription TEXT,
        fullDescription TEXT,
        price INTEGER,
        priceChild INTEGER DEFAULT 0,
        duration TEXT,
        rating REAL DEFAULT 5.0,
        reviews INTEGER DEFAULT 0,
        images TEXT,
        category TEXT,
        includes TEXT,
        notIncludes TEXT,
        itinerary TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla apartments:', err.message);
      } else {
        console.log('Tabla apartments lista.');
        db.run("ALTER TABLE apartments ADD COLUMN isBestSeller INTEGER DEFAULT 0", (err) => {
           if(err) { /* Ignorar, ya existe */ }
        });
        // Poblar con 3 apartamentos de prueba si está vacía
        db.get("SELECT COUNT(*) AS count FROM apartments", (err, row) => {
          if (!err && row.count === 0) {
            console.log('Poblando apartamentos de prueba...');
            const seedApartments = [
              {
                title: 'Apartamento de Lujo con Vista al Mar',
                shortDescription: 'Espectacular apartamento de 3 habitaciones frente a la playa en Bocagrande.',
                fullDescription: 'Disfruta de amaneceres y atardeceres mágicos desde el balcón de este lujoso apartamento. Equipado con todo lo que necesitas para una estancia perfecta en Cartagena. Cuenta con piscina, gimnasio y acceso directo a la playa.',
                price: 450000,
                duration: 'Hasta 6 Personas', // Capacidad
                images: JSON.stringify([
                  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
                  'https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?auto=format&fit=crop&q=80&w=800',
                  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800'
                ]),
                category: 'Lujo',
                includes: JSON.stringify(['WiFi de alta velocidad', 'Aire Acondicionado', 'Piscina compartida', 'Cocina equipada']),
                notIncludes: JSON.stringify(['Servicio de limpieza diario (costo extra)']),
                itinerary: JSON.stringify([{ time: 'Regla', activity: 'No se permiten fiestas.' }, { time: 'Check-in', activity: 'A partir de las 3:00 PM' }])
              },
              {
                title: 'Loft Romántico Centro Histórico',
                shortDescription: 'Acogedor loft ideal para parejas dentro de la ciudad amurallada.',
                fullDescription: 'Ubicado en el corazón del Centro Histórico de Cartagena, este loft combina la arquitectura colonial con comodidades modernas. A pocos pasos de los mejores restaurantes y plazas.',
                price: 320000,
                duration: '2 Personas',
                images: JSON.stringify([
                  'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800',
                  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
                  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'
                ]),
                category: 'Romántico',
                includes: JSON.stringify(['WiFi', 'Smart TV', 'Agua caliente', 'Aire Acondicionado']),
                notIncludes: JSON.stringify(['Estacionamiento', 'Desayuno']),
                itinerary: JSON.stringify([{ time: 'Ruido', activity: 'Moderar ruido después de las 10 PM.' }])
              },
              {
                title: 'Penthouse Exclusivo Morros',
                shortDescription: 'Increíble Penthouse en zona norte con playa privada y jacuzzi.',
                fullDescription: 'Vive una experiencia inigualable en este penthouse moderno. Dispone de jacuzzi privado en la terraza, vistas panorámicas al Mar Caribe y acceso exclusivo a piscinas y zonas húmedas.',
                price: 850000,
                duration: 'Hasta 8 Personas',
                images: JSON.stringify([
                  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
                  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
                  'https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?auto=format&fit=crop&q=80&w=800'
                ]),
                category: 'Familiar',
                includes: JSON.stringify(['Jacuzzi Privado', 'Playa Privada', 'Cocina Completa', 'Parqueadero cubierto']),
                notIncludes: JSON.stringify(['Alimentación', 'Transporte desde el aeropuerto']),
                itinerary: JSON.stringify([{ time: 'Mascotas', activity: 'Se admiten mascotas pequeñas.' }])
              }
            ];

            const stmt = db.prepare(`INSERT INTO apartments (title, shortDescription, fullDescription, price, duration, rating, reviews, images, category, includes, notIncludes, itinerary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            seedApartments.forEach(apt => {
              stmt.run(apt.title, apt.shortDescription, apt.fullDescription, apt.price, apt.duration, 5.0, 12, apt.images, apt.category, apt.includes, apt.notIncludes, apt.itinerary);
            });
            stmt.finalize();
          }
        });
      }
    });
  }
});

export default db;
