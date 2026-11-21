import { defaultTours, defaultApartments } from './defaultData';

// El catálogo vive en el servidor (Vercel Blob) y es el mismo para todos los
// visitantes. Este módulo lo lee y, en el panel admin, lo guarda.

const TOKEN_KEY = 'admin_token';
const CACHE_KEY = 'yt_catalog_cache';
let catalogPromise = null;
let freshCatalog = null; // copia más reciente conocida tras un guardado del admin

const fallback = () => ({ tours: defaultTours, apartments: defaultApartments, storage: 'offline' });

function authHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiError(res) {
  let message = `Error ${res.status}`;
  try {
    const data = await res.json();
    if (data?.error) message = data.error;
  } catch { /* respuesta sin JSON */ }
  if (res.status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event('admin-logout'));
  }
  return new Error(message);
}

async function loadCatalog({ fresh = false } = {}) {
  if (freshCatalog) return freshCatalog;
  if (!fresh && catalogPromise) return catalogPromise;
  const request = fetch(`/api/catalog${fresh ? '?fresh=1' : ''}`)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.status))))
    .then((data) => {
      if (!Array.isArray(data?.tours)) return fallback();
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch { /* sin almacenamiento */ }
      return data;
    })
    .catch(() => fallback());
  catalogPromise = request;
  return request;
}

async function saveCatalog(next) {
  const res = await fetch('/api/catalog', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ tours: next.tours, apartments: next.apartments }),
  });
  if (!res.ok) throw await apiError(res);
  freshCatalog = await res.json();
  catalogPromise = Promise.resolve(freshCatalog);
  return freshCatalog;
}

function upsert(list, item) {
  const isNew = !item.id || item.id === 'new';
  if (isNew) return [...list, { ...item, id: String(Date.now()) }];
  return list.map((x) => (String(x.id) === String(item.id) ? { ...x, ...item } : x));
}

// Reduce la foto (máx. 1600 px, JPEG) antes de subirla: carga más rápido y
// cabe en el límite de tamaño del servidor.
function compressImage(file, maxSize = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`No se pudo leer la imagen "${file.name}". Usa JPG o PNG.`));
    };
    img.src = url;
  });
}

/** Catálogo disponible al instante: la última copia vista en este navegador o los datos incluidos en la web. */
export function getInstantCatalog() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (Array.isArray(cached?.tours)) return cached;
  } catch { /* sin copia */ }
  return fallback();
}

export const store = {
  // ---------- Lectura (web pública y panel) ----------
  async getTours({ fresh = false } = {}) {
    return (await loadCatalog({ fresh })).tours;
  },
  async getTourById(id) {
    const { tours } = await loadCatalog();
    return tours.find((t) => String(t.id) === String(id)) || null;
  },
  async getApartments({ fresh = false } = {}) {
    return (await loadCatalog({ fresh })).apartments;
  },
  async getApartmentById(id) {
    const { apartments } = await loadCatalog();
    return apartments.find((a) => String(a.id) === String(id)) || null;
  },
  async getStorageStatus() {
    return (await loadCatalog({ fresh: true })).storage;
  },

  // ---------- Escritura (solo admin) ----------
  async saveTour(tour) {
    const current = await loadCatalog({ fresh: true });
    await saveCatalog({ ...current, tours: upsert(current.tours, tour) });
    return { success: true };
  },
  async deleteTour(id) {
    const current = await loadCatalog({ fresh: true });
    await saveCatalog({ ...current, tours: current.tours.filter((t) => String(t.id) !== String(id)) });
    return { success: true };
  },
  async saveApartment(apt) {
    const current = await loadCatalog({ fresh: true });
    await saveCatalog({ ...current, apartments: upsert(current.apartments, apt) });
    return { success: true };
  },
  async deleteApartment(id) {
    const current = await loadCatalog({ fresh: true });
    await saveCatalog({
      ...current,
      apartments: current.apartments.filter((a) => String(a.id) !== String(id)),
    });
    return { success: true };
  },
  async resetDefaults() {
    await saveCatalog({ tours: defaultTours, apartments: defaultApartments });
  },

  async uploadImage(file) {
    const dataUrl = await compressImage(file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ dataUrl }),
    });
    if (!res.ok) throw await apiError(res);
    return (await res.json()).url;
  },

  // ---------- Sesión ----------
  async login(username, password) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.token) throw new Error(data.error || 'No se pudo iniciar sesión.');
    localStorage.setItem(TOKEN_KEY, data.token);
    return true;
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    freshCatalog = null;
  },
};
