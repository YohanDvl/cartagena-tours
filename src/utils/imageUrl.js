// Resuelve la URL de una imagen. Las fotos locales (.png/.jpg en /images) se
// sirven en su versión WebP optimizada de /images/opt (ver `npm run images`).
export function getImageUrl(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  let clean = src.replace(/^\.?\//, '');
  const local = /^images\/(?!opt\/)(.+)\.(png|jpe?g)$/i.exec(clean);
  if (local) clean = `images/opt/${local[1]}.webp`;
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}
