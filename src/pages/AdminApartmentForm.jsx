import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

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
    priceChild: '', // We can hide this in UI, or keep for consistency with db
    duration: '', // Capacity
    category: '',
    rating: 5.0,
    isBestSeller: false,
  });

  // States for arrays to make UX better
  const [images, setImages] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [notIncludes, setNotIncludes] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [saveModal, setSaveModal] = useState(false);

  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/apartments/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            title: data.title,
            shortDescription: data.shortDescription,
            fullDescription: data.fullDescription,
            price: data.price ? new Intl.NumberFormat('es-CO').format(data.price) : '',
            priceChild: data.priceChild ? new Intl.NumberFormat('es-CO').format(data.priceChild) : '',
            duration: data.duration,
            category: data.category,
            rating: data.rating || 5.0,
            isBestSeller: data.isBestSeller === 1 || data.isBestSeller === true,
          });
          setImages(data.images || []);
          setIncludes(data.includes || []);
          setNotIncludes(data.notIncludes || []);
          setItinerary(data.itinerary || []);
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    if (numericValue === '') {
      setFormData({ ...formData, [name]: '' });
      return;
    }
    // Format with Colombian locale (thousands separated by dot)
    const formatted = new Intl.NumberFormat('es-CO').format(numericValue);
    setFormData({ ...formData, [name]: formatted });
  };

  // --- Array Handlers ---
  const handleArrayChange = (setter, index, value) => {
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const addArrayItem = (setter, defaultValue = '') => {
    setter(prev => [...prev, defaultValue]);
  };

  const removeArrayItem = (setter, index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  // --- Itinerary Handlers ---
  const handleItineraryChange = (index, field, value) => {
    setItinerary(prev => {
      const newArr = [...prev];
      newArr[index] = { ...newArr[index], [field]: value };
      return newArr;
    });
  };

  // --- Image Upload Handler ---
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setIsUploading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        if (data.imageUrl) {
          setImages(prev => [...prev, data.imageUrl]);
        }
      } catch (err) {
        console.error('Error subiendo imagen:', err);
        alert('Error subiendo una imagen');
      }
    }
    setIsUploading(false);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSaveModal(true);
  };

  const confirmSave = () => {
    const payload = {
      ...formData,
      price: parseInt(String(formData.price).replace(/\D/g, '') || '0'),
      priceChild: formData.priceChild ? parseInt(String(formData.priceChild).replace(/\D/g, '')) : 0,
      rating: parseFloat(formData.rating) || 5.0,
      isBestSeller: formData.isBestSeller ? 1 : 0,
      images: images.filter(s => s),
      includes: includes.filter(s => s.trim()),
      notIncludes: notIncludes.filter(s => s.trim()),
      itinerary: itinerary.filter(i => i.time || i.description)
    };

    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/apartments' : `/api/apartments/${id}`;

    const token = localStorage.getItem('admin_token');
    fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        navigate('/admin');
      })
      .catch(err => console.error(err));
  };

  if (loading) return <div style={{ padding: '100px 2rem 4rem', textAlign: 'center' }}>Cargando datos del apartamento...</div>;

  return (
    <div style={{ padding: '100px 2rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        <ArrowLeft size={20} /> Volver al Panel
      </Link>
      
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{isNew ? 'Crear Nuevo Apartamento' : 'Editar Apartamento'}</h1>

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
        
        {/* Basic Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Título del Apartamento</label>
            <input required name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Categoría (Ej: Lujo, Familiar)</label>
              <input required name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Precio por Noche (COP)</label>
              <input required type="text" name="price" value={formData.price} onChange={handlePriceChange} style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Capacidad</label>
              <input required name="duration" value={formData.duration} onChange={handleChange} placeholder="Ej. Hasta 6 personas" style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Calificación (1-5)</label>
              <input type="number" step="0.1" min="1" max="5" name="rating" value={formData.rating} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="isBestSeller" name="isBestSeller" checked={formData.isBestSeller} onChange={handleChange} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
            <label htmlFor="isBestSeller" style={{ cursor: 'pointer', fontWeight: 600 }}>Destacar como "Más rentado"</label>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Descripción Corta</label>
            <textarea required name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows="2" style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Descripción Completa</label>
            <textarea required name="fullDescription" value={formData.fullDescription} onChange={handleChange} rows="4" style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} />
          </div>
        </div>

        {/* Images Upload Section */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ImageIcon size={20} /> Imágenes
          </h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            {images.map((img, idx) => (
              <div key={idx} style={{ position: 'relative', width: '120px', height: '120px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={img} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  type="button" 
                  onClick={() => removeArrayItem(setImages, idx)}
                  style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239,68,68,0.9)', color: 'white', border: 'none', borderRadius: '50%', padding: '0.2rem', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }} 
              id="image-upload"
            />
            <label htmlFor="image-upload" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <Plus size={18} /> Subir Imágenes
            </label>
            {isUploading && <span style={{ color: 'var(--text-muted)' }}>Subiendo...</span>}
          </div>
        </div>

        {/* Includes & Not Includes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Comodidades</h3>
            {includes.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input 
                  value={item} 
                  onChange={(e) => handleArrayChange(setIncludes, idx, e.target.value)} 
                  style={{ flex: 1, padding: '0.6rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
                  placeholder="Ej: WiFi, Piscina"
                />
                <button type="button" onClick={() => removeArrayItem(setIncludes, idx)} className="btn" style={{ padding: '0.6rem', backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem(setIncludes)} className="btn" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              + Añadir Comodidad
            </button>
          </div>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>No Incluye</h3>
            {notIncludes.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input 
                  value={item} 
                  onChange={(e) => handleArrayChange(setNotIncludes, idx, e.target.value)} 
                  style={{ flex: 1, padding: '0.6rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
                  placeholder="Ej: Limpieza diaria"
                />
                <button type="button" onClick={() => removeArrayItem(setNotIncludes, idx)} className="btn" style={{ padding: '0.6rem', backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem(setNotIncludes)} className="btn" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              + Añadir Item
            </button>
          </div>
        </div>

        {/* Itinerary */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Reglas y Más Info</h3>
          {itinerary.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
              <input 
                placeholder="Título (Ej. Regla, Mascotas)"
                value={item.time} 
                onChange={(e) => handleItineraryChange(idx, 'time', e.target.value)} 
                style={{ width: '150px', padding: '0.6rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
              <textarea 
                placeholder="Detalle"
                value={item.description} 
                onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)} 
                rows="2"
                style={{ flex: 1, padding: '0.6rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
              <button type="button" onClick={() => removeArrayItem(setItinerary, idx)} className="btn" style={{ padding: '0.6rem', backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setItinerary, { time: '', description: '' })} className="btn" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            + Añadir Regla / Info
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }} disabled={isUploading}>
            <Save size={20} /> Guardar Apartamento
          </button>
        </div>
      </form>

      {/* Custom Save Confirmation Modal */}
      {saveModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', maxWidth: '450px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', textAlign: 'center', animation: 'slideDown 0.3s ease-out' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Save size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              ¿Estás seguro de {isNew ? 'crear' : 'guardar'} este apartamento?
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              El apartamento <strong>"{formData.title}"</strong> será {isNew ? 'publicado y estará visible en el sitio web principal.' : 'actualizado con los nuevos cambios.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setSaveModal(false)} 
                className="btn" 
                style={{ padding: '0.8rem 1.5rem', border: '1px solid var(--border)', flex: 1 }}
              >
                Cancelar
              </button>
              <button 
                onClick={confirmSave} 
                className="btn btn-primary" 
                style={{ padding: '0.8rem 1.5rem', border: 'none', flex: 1, fontWeight: 'bold' }}
              >
                Sí, {isNew ? 'Crear' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
