import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import db from './database.js';

const JWT_SECRET = 'super-secret-cartagena-tours-key';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configurar multer para guardar imágenes en la carpeta public/images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../public/images');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --- MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: 'Acceso denegado' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado' });
    req.user = user;
    next();
  });
};

// POST: Subir imagen
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }
  // Devolver la ruta relativa de la imagen
  res.json({ imageUrl: `/images/${req.file.filename}` });
});

// --- ADMIN API ---

// POST: Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      const token = jwt.sign({ id: row.id, username: row.username }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  });
});

// GET: Obtener configuración
app.get('/api/admin/config', authenticateToken, (req, res) => {
  db.get('SELECT username, securityQuestion FROM admins WHERE id = ?', [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// PUT: Actualizar configuración
app.put('/api/admin/config', authenticateToken, (req, res) => {
  const { currentPassword, newUsername, newPassword, securityQuestion, securityAnswer } = req.body;
  
  db.get('SELECT * FROM admins WHERE id = ? AND password = ?', [req.user.id, currentPassword], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: 'La contraseña actual es incorrecta' });

    const updatedUsername = newUsername || row.username;
    const updatedPassword = newPassword || row.password;
    const updatedQuestion = securityQuestion !== undefined ? securityQuestion : row.securityQuestion;
    const updatedAnswer = securityAnswer !== undefined ? securityAnswer : row.securityAnswer;

    const sql = 'UPDATE admins SET username = ?, password = ?, securityQuestion = ?, securityAnswer = ? WHERE id = ?';
    db.run(sql, [updatedUsername, updatedPassword, updatedQuestion, updatedAnswer, req.user.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Configuración actualizada exitosamente' });
    });
  });
});

// GET: Obtener pregunta de seguridad
app.get('/api/admin/recover/:username', (req, res) => {
  db.get('SELECT securityQuestion FROM admins WHERE username = ?', [req.params.username], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row || !row.securityQuestion) return res.status(404).json({ error: 'Usuario no encontrado o sin pregunta configurada' });
    res.json({ question: row.securityQuestion });
  });
});

// POST: Verificar respuesta
app.post('/api/admin/recover/verify', (req, res) => {
  const { username, answer } = req.body;
  db.get('SELECT * FROM admins WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row || !row.securityAnswer) return res.status(404).json({ error: 'Usuario o respuesta incorrecta' });
    
    const normalize = str => str.toLowerCase().trim();
    if (normalize(row.securityAnswer) === normalize(answer)) {
      const token = jwt.sign({ id: row.id, username: row.username }, JWT_SECRET, { expiresIn: '15m' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Respuesta incorrecta' });
    }
  });
});

// POST: Restablecer contraseña
app.post('/api/admin/recover/reset', authenticateToken, (req, res) => {
  const { newPassword } = req.body;
  db.run('UPDATE admins SET password = ? WHERE id = ?', [newPassword, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Contraseña actualizada' });
  });
});

// --- TOURS API ---

// GET: Obtener todos los tours
app.get('/api/tours', (req, res) => {
  db.all('SELECT * FROM tours', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Parse JSON strings back to arrays
    const tours = rows.map(row => ({
      ...row,
      images: JSON.parse(row.images || '[]'),
      includes: JSON.parse(row.includes || '[]'),
      notIncludes: JSON.parse(row.notIncludes || '[]'),
      itinerary: JSON.parse(row.itinerary || '[]')
    }));
    res.json(tours);
  });
});

// GET: Obtener un tour por ID
app.get('/api/tours/:id', (req, res) => {
  db.get('SELECT * FROM tours WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Tour no encontrado' });
      return;
    }
    row.images = JSON.parse(row.images || '[]');
    row.includes = JSON.parse(row.includes || '[]');
    row.notIncludes = JSON.parse(row.notIncludes || '[]');
    row.itinerary = JSON.parse(row.itinerary || '[]');
    res.json(row);
  });
});

// POST: Crear un nuevo tour
app.post('/api/tours', authenticateToken, (req, res) => {
  const { title, shortDescription, fullDescription, price, priceChild, duration, rating, reviews, isBestSeller, images, category, includes, notIncludes, itinerary } = req.body;
  
  const sql = `INSERT INTO tours (title, shortDescription, fullDescription, price, priceChild, duration, rating, reviews, isBestSeller, images, category, includes, notIncludes, itinerary)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
               
  const params = [
    title, shortDescription, fullDescription, price, priceChild || 0, duration, rating || 5.0, reviews || 0, isBestSeller ? 1 : 0,
    JSON.stringify(images || []),
    category,
    JSON.stringify(includes || []),
    JSON.stringify(notIncludes || []),
    JSON.stringify(itinerary || [])
  ];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, message: 'Tour creado exitosamente' });
  });
});

// PUT: Actualizar un tour
app.put('/api/tours/:id', authenticateToken, (req, res) => {
  const { title, shortDescription, fullDescription, price, priceChild, duration, rating, isBestSeller, images, category, includes, notIncludes, itinerary } = req.body;
  
  const sql = `UPDATE tours SET 
                title = ?, shortDescription = ?, fullDescription = ?, price = ?, priceChild = ?, 
                duration = ?, rating = ?, isBestSeller = ?, images = ?, category = ?, includes = ?, notIncludes = ?, itinerary = ?
               WHERE id = ?`;
               
  const params = [
    title, shortDescription, fullDescription, price, priceChild || 0, duration, rating || 5.0, isBestSeller ? 1 : 0,
    JSON.stringify(images || []),
    category,
    JSON.stringify(includes || []),
    JSON.stringify(notIncludes || []),
    JSON.stringify(itinerary || []),
    req.params.id
  ];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Tour actualizado', changes: this.changes });
  });
});

// DELETE: Borrar un tour
app.delete('/api/tours/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM tours WHERE id = ?', req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Tour eliminado', changes: this.changes });
  });
});

// --- APARTMENTS API ---

// GET: Obtener todos los apartamentos
app.get('/api/apartments', (req, res) => {
  db.all('SELECT * FROM apartments', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Parse JSON strings back to arrays
    const apartments = rows.map(row => ({
      ...row,
      images: JSON.parse(row.images || '[]'),
      includes: JSON.parse(row.includes || '[]'),
      notIncludes: JSON.parse(row.notIncludes || '[]'),
      itinerary: JSON.parse(row.itinerary || '[]')
    }));
    res.json(apartments);
  });
});

// GET: Obtener un apartamento por ID
app.get('/api/apartments/:id', (req, res) => {
  db.get('SELECT * FROM apartments WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Apartamento no encontrado' });
      return;
    }
    row.images = JSON.parse(row.images || '[]');
    row.includes = JSON.parse(row.includes || '[]');
    row.notIncludes = JSON.parse(row.notIncludes || '[]');
    row.itinerary = JSON.parse(row.itinerary || '[]');
    res.json(row);
  });
});

// POST: Crear un nuevo apartamento
app.post('/api/apartments', authenticateToken, (req, res) => {
  const { title, shortDescription, fullDescription, price, priceChild, duration, rating, reviews, isBestSeller, images, category, includes, notIncludes, itinerary } = req.body;
  
  const sql = `INSERT INTO apartments (title, shortDescription, fullDescription, price, priceChild, duration, rating, reviews, isBestSeller, images, category, includes, notIncludes, itinerary)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
               
  const params = [
    title, shortDescription, fullDescription, price, priceChild || 0, duration, rating || 5.0, reviews || 0, isBestSeller ? 1 : 0,
    JSON.stringify(images || []),
    category,
    JSON.stringify(includes || []),
    JSON.stringify(notIncludes || []),
    JSON.stringify(itinerary || [])
  ];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, message: 'Apartamento creado exitosamente' });
  });
});

// PUT: Actualizar un apartamento
app.put('/api/apartments/:id', authenticateToken, (req, res) => {
  const { title, shortDescription, fullDescription, price, priceChild, duration, rating, isBestSeller, images, category, includes, notIncludes, itinerary } = req.body;
  
  const sql = `UPDATE apartments SET 
                title = ?, shortDescription = ?, fullDescription = ?, price = ?, priceChild = ?, 
                duration = ?, rating = ?, isBestSeller = ?, images = ?, category = ?, includes = ?, notIncludes = ?, itinerary = ?
               WHERE id = ?`;
               
  const params = [
    title, shortDescription, fullDescription, price, priceChild || 0, duration, rating || 5.0, isBestSeller ? 1 : 0,
    JSON.stringify(images || []),
    category,
    JSON.stringify(includes || []),
    JSON.stringify(notIncludes || []),
    JSON.stringify(itinerary || []),
    req.params.id
  ];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Apartamento actualizado', changes: this.changes });
  });
});

// DELETE: Borrar un apartamento
app.delete('/api/apartments/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM apartments WHERE id = ?', req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Apartamento eliminado', changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Backend API corriendo en http://localhost:${PORT}`);
  
  // Crear usuario administrador por defecto si no existe
  db.get('SELECT * FROM admins WHERE username = "admin"', (err, row) => {
    if (!row) {
      db.run('INSERT INTO admins (username, password) VALUES ("admin", "admin123")');
    }
  });
});
