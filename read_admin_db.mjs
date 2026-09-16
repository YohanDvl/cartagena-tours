import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('C:/Users/dvlyo/.gemini/antigravity/scratch/cartagena-tours/server/tours.db');

db.all('SELECT * FROM admins', [], (err, rows) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('--- ADMIN USERS IN DATABASE ---');
    console.log(JSON.stringify(rows, null, 2));
  }
  db.close();
});
