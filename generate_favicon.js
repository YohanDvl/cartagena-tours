import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, 'public/images/logoredondo.png');
const outPath = path.join(__dirname, 'public/images/favicon-square.svg');

try {
  const imgBuffer = fs.readFileSync(imgPath);
  const base64Str = imgBuffer.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50">
  <image href="data:image/png;base64,${base64Str}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  
  fs.writeFileSync(outPath, svg);
  console.log('Favicon SVG successfully generated with embedded base64 image.');
} catch (err) {
  console.error('Error:', err.message);
}
