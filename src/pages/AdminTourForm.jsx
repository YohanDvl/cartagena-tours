import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { store } from '../data/store';
import { getImageUrl } from '../utils/imageUrl';

export default function AdminTourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    priceChild: '',
    duration: '',
    category: 'Playa & Mar',
    rating: 5.0,
    isBestSeller: false,
  });

  const [images, setImages] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [notIncludes, setNotIncludes] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      async function loadTour() {
        try {
          const data = await store.getTourById(id);
          if (data) {
            setFormData({
              title: data.title || '',
              shortDescription: data.shortDescription || '',
              fullDescription: data.fullDescription || '',
              price: data.price ? new Intl.NumberFormat('es-CO').format(data.price) : '',
              priceChild: data.priceChild ? new Intl.NumberFormat('es-CO').format(data.priceChild) : '',
              duration: data.duration || '',
              category: data.category || 'Playa & Mar',
              rating: data.rating || 5.0,
              isBestSeller: data.isBestSeller === 1 || data.isBestSeller === true,
            });
            setImages(data.images || (data.image ? [data.image] : []));
            setIncludes(data.includes || []);
            setNotIncludes(data.notIncludes || []);
            setItinerary(data.itinerary || []);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
      loadTour();
    }
  }, [id, isNew]);

  const handlePriceChange = (field, value) => {
    const raw = value.replace(/\D/g, '');
    const formatted = raw ? new Intl.NumberFormat('es-CO').format(parseInt(raw)) : '';
    setFormData(prev => ({ ...prev, [field]: formatted }));
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
    const priceChildNum = parseInt(String(formData.priceChild).replace(/\D/g, '') || '0');

    const tourData = {
      ...formData,
      id: isNew ? undefined : id,
      price: priceNum,
      priceChild: priceChildNum,
      rating: parseFloat(formData.rating) || 5.0,
      isBestSeller: formData.isBestSeller ? 1 : 0,
      images: images.length > 0 ? images : ['/images/ciudad_amurallada.png'],
      includes: includes.filter(s => s && s.trim()),
      notIncludes: notIncludes.filter(s => s && s.trim()),
      itinerary: itinerary.filter(i => i.time || i.description)
    };

    await store.saveTour(tourData);
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
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{isNew ? 'Nuevo Tour' : 'Editar Tour'}</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Título de la Experiencia</label>
            <input 
              type="text" 
              required
              value={formData.title} 
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej: Día de Lujo en Islas del Rosario"
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
                placeholder="Playa & Mar, Cultura, etc."
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Duración</label>
              <input 
                type="text" 
                required
                value={formData.duration} 
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Ej: 8 horas, 4 horas"
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Calificación (1 - 5)</label>
              <input 
                type="number" 
                step="0.1"
                min="1"
                max="5"
                value={formData.rating} 
                onChange={e => setFormData({ ...formData, rating: e.target.value })}
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Precio Adulto (COP)</label>
              <input 
                type="text" 
                required
                value={formData.price} 
                onChange={e => handlePriceChange('price', e.target.value)}
                placeholder="850.000"
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)', fontWeight: 700 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Precio Niño (COP)</label>
              <input 
                type="text" 
                value={formData.priceChild} 
                onChange={e => handlePriceChange('priceChild', e.target.value)}
                placeholder="450.000"
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.8rem' }}>
              <input 
                type="checkbox" 
                id="isBestSeller"
                checked={formData.isBestSeller}
                onChange={e => setFormData({ ...formData, isBestSeller: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <label htmlFor="isBestSeller" style={{ fontWeight: 700, cursor: 'pointer' }}>Marcar como Más Vendido 🔥</label>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Descripción Corta (Tarjeta)</label>
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
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.6rem' }}>Galería de Imágenes</label>
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

          {/* Includes */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 700 }}>¿Qué incluye?</label>
              <button 
                type="button" 
                onClick={() => setIncludes([...includes, ''])} 
                className="btn" 
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}
              >
                <Plus size={14} /> Añadir elemento
              </button>
            </div>
            {includes.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input 
                  type="text" 
                  value={item} 
                  onChange={e => {
                    const copy = [...includes];
                    copy[idx] = e.target.value;
                    setIncludes(copy);
                  }}
                  placeholder="Ej: Transporte en yate deportivo"
                  style={{ flex: 1, padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
                />
                <button 
                  type="button" 
                  onClick={() => setIncludes(includes.filter((_, i) => i !== idx))} 
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <Link to="/admin" className="btn" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.8rem' }}>
              <Save size={18} /> Guardar Tour
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
