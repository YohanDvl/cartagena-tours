// Convierte las fotos de public/images a WebP livianas en public/images/opt/.
// Uso: npm run images   (vuelve a ejecutarlo cuando agregues fotos a public/images)
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';

const SRC = join('public', 'images');
const OUT = join('public', 'images', 'opt');
const MAX = 1400;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return p === OUT ? [] : walk(p);
    return /\.(png|jpe?g)$/i.test(name) ? [p] : [];
  });
}

let before = 0;
let after = 0;
for (const file of walk(SRC)) {
  const rel = relative(SRC, file).split(sep).join('/').replace(/\.(png|jpe?g)$/i, '.webp');
  const out = join(OUT, rel);
  mkdirSync(dirname(out), { recursive: true });
  const info = await sharp(file)
    .rotate()
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(out);
  before += statSync(file).size;
  after += info.size;
}

// Recorte adicional de una foto aérea para tener otra portada distinta.
const aerial = join(SRC, 'downloads', 'IMG_1934.JPG.jpeg');
if (existsSync(aerial)) {
  const { width, height } = await sharp(aerial).metadata();
  await sharp(aerial)
    .rotate()
    .extract({ left: 0, top: Math.round(height * 0.3), width: Math.round(width * 0.55), height: Math.round(height * 0.7) })
    .resize({ width: MAX, withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(join(OUT, 'downloads', 'IMG_1934_playa.webp'));
}

console.log(`Imágenes: ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(1)} MB`);
