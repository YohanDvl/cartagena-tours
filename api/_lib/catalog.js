import { put, list } from '@vercel/blob';
import { defaultTours, defaultApartments } from '../../src/data/defaultData.js';

const CATALOG_PATH = 'catalog/catalog.json';

export function defaultCatalog() {
  return { tours: defaultTours, apartments: defaultApartments, updatedAt: null };
}

async function catalogUrl() {
  const { blobs } = await list({ prefix: CATALOG_PATH, limit: 1 });
  return blobs[0]?.url || null;
}

// La URL pública del catálogo no cambia; la guardamos en memoria mientras la
// función siga "caliente" para no gastar operaciones list().
let cachedUrl = null;

/**
 * Lee el catálogo guardado en Vercel Blob. Si todavía no existe, devuelve los
 * datos de ejemplo. `fresh` evita la caché (para el panel admin).
 */
export async function readCatalog({ fresh = false } = {}) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { ...defaultCatalog(), storage: 'none' };
  if (!cachedUrl) cachedUrl = await catalogUrl();
  if (!cachedUrl) return { ...defaultCatalog(), storage: 'blob' };

  const bucket = fresh ? Date.now() : Math.floor(Date.now() / 60000);
  const res = await fetch(`${cachedUrl}?v=${bucket}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`No se pudo leer el catálogo (${res.status})`);
  const data = await res.json();
  return {
    tours: Array.isArray(data.tours) ? data.tours : [],
    apartments: Array.isArray(data.apartments) ? data.apartments : [],
    updatedAt: data.updatedAt || null,
    storage: 'blob',
  };
}

export async function writeCatalog({ tours, apartments }) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('El almacenamiento (Vercel Blob) no está conectado al proyecto.');
  }
  const catalog = { tours, apartments, updatedAt: new Date().toISOString() };
  const blob = await put(CATALOG_PATH, JSON.stringify(catalog), {
    access: 'public',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
  });
  cachedUrl = blob.url;
  return { ...catalog, storage: 'blob' };
}
