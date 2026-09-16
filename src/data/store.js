import { defaultTours, defaultApartments } from './defaultData';

const TOURS_KEY = 'cartagena_tours_data';
const APTS_KEY = 'cartagena_apartments_data';

// Initialize localStorage if empty
function initStorage() {
  try {
    if (!localStorage.getItem(TOURS_KEY)) {
      localStorage.setItem(TOURS_KEY, JSON.stringify(defaultTours));
    }
    if (!localStorage.getItem(APTS_KEY)) {
      localStorage.setItem(APTS_KEY, JSON.stringify(defaultApartments));
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

initStorage();

export const store = {
  // TOURS
  async getTours() {
    try {
      const res = await fetch('/api/tours');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      // Fallback
    }
    try {
      const local = localStorage.getItem(TOURS_KEY);
      if (local) return JSON.parse(local);
    } catch (e) {}
    return defaultTours;
  },

  async getTourById(id) {
    try {
      const res = await fetch(`/api/tours/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    const tours = await this.getTours();
    const found = tours.find(t => String(t.id) === String(id));
    if (found) return found;
    return defaultTours.find(t => String(t.id) === String(id)) || null;
  },

  async saveTour(tourData) {
    // Attempt backend save
    let backendSaved = false;
    try {
      const isNew = !tourData.id || tourData.id === 'new';
      const url = isNew ? '/api/tours' : `/api/tours/${tourData.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const token = localStorage.getItem('admin_token');
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tourData)
      });
      if (res.ok) backendSaved = true;
    } catch (e) {}

    // Save in LocalStorage
    const tours = await this.getTours();
    let updated;
    if (!tourData.id || tourData.id === 'new') {
      const newId = String(Date.now());
      updated = [...tours, { ...tourData, id: newId }];
    } else {
      updated = tours.map(t => String(t.id) === String(tourData.id) ? { ...t, ...tourData } : t);
    }
    localStorage.setItem(TOURS_KEY, JSON.stringify(updated));
    return { success: true, backendSaved };
  },

  async deleteTour(id) {
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/tours/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {}
    const tours = await this.getTours();
    const updated = tours.filter(t => String(t.id) !== String(id));
    localStorage.setItem(TOURS_KEY, JSON.stringify(updated));
    return { success: true };
  },

  // APARTMENTS
  async getApartments() {
    try {
      const res = await fetch('/api/apartments');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}
    try {
      const local = localStorage.getItem(APTS_KEY);
      if (local) return JSON.parse(local);
    } catch (e) {}
    return defaultApartments;
  },

  async getApartmentById(id) {
    try {
      const res = await fetch(`/api/apartments/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    const apts = await this.getApartments();
    const found = apts.find(a => String(a.id) === String(id));
    if (found) return found;
    return defaultApartments.find(a => String(a.id) === String(id)) || null;
  },

  async saveApartment(aptData) {
    let backendSaved = false;
    try {
      const isNew = !aptData.id || aptData.id === 'new';
      const url = isNew ? '/api/apartments' : `/api/apartments/${aptData.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const token = localStorage.getItem('admin_token');
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(aptData)
      });
      if (res.ok) backendSaved = true;
    } catch (e) {}

    const apts = await this.getApartments();
    let updated;
    if (!aptData.id || aptData.id === 'new') {
      const newId = String(Date.now());
      updated = [...apts, { ...aptData, id: newId }];
    } else {
      updated = apts.map(a => String(a.id) === String(aptData.id) ? { ...a, ...aptData } : a);
    }
    localStorage.setItem(APTS_KEY, JSON.stringify(updated));
    return { success: true, backendSaved };
  },

  async deleteApartment(id) {
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/apartments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {}
    const apts = await this.getApartments();
    const updated = apts.filter(a => String(a.id) !== String(id));
    localStorage.setItem(APTS_KEY, JSON.stringify(updated));
    return { success: true };
  },

  resetDefaults() {
    localStorage.setItem(TOURS_KEY, JSON.stringify(defaultTours));
    localStorage.setItem(APTS_KEY, JSON.stringify(defaultApartments));
  }
};
