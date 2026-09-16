import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { store } from '../data/store';
import { getImageUrl } from '../utils/imageUrl';

export default function AdminApartmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    duration: '',
    category: 'Lujo & Playa',
    rating: 5.0,
    isBestSeller: false,
  });

  const [images, setImages] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      async function loadApartment() {
        try {
          const data = await store.getApartmentById(id);
          if (data) {
            setFormData({
              title: data.title || '',
              shortDescription: data.shortDescription || '',
              fullDescription: data.fullDescription || '',
              price: data.price ? new Intl.NumberFormat('es-CO').format(data.price) : '',
              duration: data.duration || '',
              category: data.category || 'Lujo & Playa',
              rating: data.rating || 5.0,
              isBestSeller: data.isBestSeller === 1 || data.isBestSeller === true,
            });
            setImages(data.images || (data.image ? [data.image] : []));
            setIncludes(data.includes || []);
            setItinerary(data.itinerary || []);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
      loadApartment();
    }
  }, [id, isNew]);

  const handlePriceChange = (value) => {
    const raw = value.replace(/\D/g, '');
    const formatted = raw ? new Intl.NumberFormat('es-CO').format(parseInt(raw)) : '';
    setFormData(prev => ({ ...prev, price: formatted }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImages(prev => [...prev, evt.target.result]);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const priceNum = parseInt(String(formData.price).replace(/\D/g, '') || '0');

    const aptData = {
      ...formData,
      id: isNew ? undefined : id,
      price: priceNum,
      rating: parseFloat(formData.rating) || 5.0,
      isBestSeller: formData.isBestSeller ? 1 : 0,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'],
      includes: includes.filter(s => s && s.trim()),
      itinerary: itinerary.filter(i => i.time || i.description || i.activity)
    };

    await store.saveApartment(aptData);
    navigate('/admin');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Cargando formulario...</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '90vh', padding: '3rem 0' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <ArrowLeft size={20} /> Volver al Panel
          </Link>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{isNew ? 'Nuevo Apartamento' : 'Editar Apartamento'}</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Título de la Propiedad</label>
            <input 
              type="text" 
              required
              value={formData.title} 
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej: Apartamento de Lujo con Vista Panorámica al Mar"
              style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)', fontSize: '1.05rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Categoría</label>
              <input 
                type="text" 
                required
                value={formData.category} 
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                placeholder="Lujo & Playa, Romántico, etc."
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Capacidad / Huéspedes</label>
              <input 
                type="text" 
                required
                value={formData.duration} 
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Ej: Hasta 6 Huéspedes"
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Tarifa por Noche (COP)</label>
              <input 
                type="text" 
                required
                value={formData.price} 
                onChange={e => handlePriceChange(e.target.value)}
                placeholder="450.000"
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)', fontWeight: 700 }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Descripción Breve</label>
            <textarea 
              rows={2}
              required
              value={formData.shortDescription} 
              onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
              style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Descripción Completa</label>
            <textarea 
              rows={4}
              required
              value={formData.fullDescription} 
              onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
              style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
            />
          </div>

          {/* Images */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.6rem' }}>Galería de Fotos</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', width: '100px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={getImageUrl(img)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    type="button" 
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
              />
              <button 
                type="button" 
                onClick={() => fileInputRef.current.click()} 
                className="btn" 
                style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <ImageIcon size={18} /> Subir Imágenes
              </button>
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <Link to="/admin" className="btn" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.8rem' }}>
              <Save size={18} /> Guardar Alojamiento
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
