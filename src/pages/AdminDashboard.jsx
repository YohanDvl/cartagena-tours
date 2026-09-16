import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, LogOut, Compass, Building, RefreshCw, Eye } from 'lucide-react';
import { store } from '../data/store';
import { getImageUrl } from '../utils/imageUrl';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('tours'); // 'tours' | 'apartments'
  const [tours, setTours] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: 'tour', itemId: null, itemTitle: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [toursData, aptsData] = await Promise.all([
        store.getTours(),
        store.getApartments()
      ]);
      setTours(toursData);
      setApartments(aptsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleDelete = async () => {
    if (!deleteModal.itemId) return;
    if (deleteModal.type === 'tour') {
      await store.deleteTour(deleteModal.itemId);
      showNotification(`Tour "${deleteModal.itemTitle}" eliminado con éxito.`);
    } else {
      await store.deleteApartment(deleteModal.itemId);
      showNotification(`Apartamento "${deleteModal.itemTitle}" eliminado con éxito.`);
    }
    setDeleteModal({ isOpen: false, type: 'tour', itemId: null, itemTitle: '' });
    loadAll();
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Restaurar los tours y apartamentos a sus datos originales?')) {
      store.resetDefaults();
      loadAll();
      showNotification('Catálogo restaurado a valores iniciales.');
    }
  };

  const filteredTours = tours.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredApartments = apartments.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.category && a.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Dedicated Clean Admin Topbar */}
      <header style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0.9rem 0',
        boxShadow: 'var(--shadow-sm)',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <img 
              src={getImageUrl('/images/favicon-square.svg')} 
              alt="YouTours" 
              style={{ height: '40px', width: '40px', objectFit: 'contain' }} 
            />
            <div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.1, color: 'var(--text-main)' }}>
                YOUTOURS
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Panel de Administración Privado
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link 
              to="/" 
              className="btn" 
              style={{ 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--border)', 
                color: 'var(--text-main)', 
                fontSize: '0.85rem', 
                padding: '0.5rem 1rem', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <Eye size={16} /> Ver Sitio Web
            </Link>
            <button 
              onClick={handleResetDefaults} 
              className="btn" 
              style={{ 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--border)', 
                color: 'var(--text-muted)', 
                fontSize: '0.85rem', 
                padding: '0.5rem 1rem', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <RefreshCw size={15} /> Restaurar Catálogo
            </button>
            <button 
              onClick={onLogout} 
              className="btn" 
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                color: '#ef4444', 
                border: '1px solid rgba(239, 68, 68, 0.3)', 
                fontSize: '0.85rem', 
                padding: '0.5rem 1rem', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.3rem', color: 'var(--text-main)' }}>
            Gestión de Catálogo
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Administra precios, descripciones, itinerarios y fotografías de tours y apartamentos.
          </p>
        </div>

        {notification && (
          <div style={{ backgroundColor: '#10b981', color: '#fff', padding: '0.9rem 1.4rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, boxShadow: 'var(--shadow-md)' }}>
            {notification}
          </div>
        )}

        {/* Tab & Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--surface)', padding: '0.3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <button 
              onClick={() => setActiveTab('tours')}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: activeTab === 'tours' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'tours' ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.2s'
              }}
            >
              <Compass size={18} /> Tours ({tours.length})
            </button>
            <button 
              onClick={() => setActiveTab('apartments')}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: activeTab === 'apartments' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'apartments' ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.2s'
              }}
            >
              <Building size={18} /> Apartamentos ({apartments.length})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '500px', justifyContent: 'flex-end' }}>
            <input 
              type="text" 
              placeholder={`Buscar en ${activeTab === 'tours' ? 'tours' : 'apartamentos'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-main)',
                flex: 1
              }}
            />
            <button 
              onClick={() => navigate(activeTab === 'tours' ? '/admin/tours/new' : '/admin/apartments/new')}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', whiteSpace: 'nowrap' }}
            >
              <Plus size={18} /> Crear {activeTab === 'tours' ? 'Tour' : 'Apartamento'}
            </button>
          </div>
        </div>

        {/* Content Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h3>Cargando registros...</h3>
          </div>
        ) : activeTab === 'tours' ? (
          <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '1rem 1.5rem' }}>Experiencia</th>
                    <th style={{ padding: '1rem' }}>Categoría</th>
                    <th style={{ padding: '1rem' }}>Precio Adulto</th>
                    <th style={{ padding: '1rem' }}>Duración</th>
                    <th style={{ padding: '1rem' }}>Rating</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTours.map((tour) => {
                    const thumb = tour.images && tour.images[0] ? getImageUrl(tour.images[0]) : getImageUrl('/images/ciudad_amurallada.png');
                    return (
                      <tr key={tour.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }}>
                        <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img 
                            src={thumb} 
                            alt={tour.title} 
                            style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = getImageUrl('/images/ciudad_amurallada.png'); }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{tour.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tour.shortDescription}</div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span className="badge badge-accent" style={{ fontSize: '0.8rem' }}>{tour.category}</span>
                        </td>
                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
                          ${tour.price ? tour.price.toLocaleString('es-CO') : 0} COP
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          {tour.duration}
                        </td>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>
                          ★ {tour.rating || 5.0}
                        </td>
                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <Link to={`/tour/${tour.id}`} target="_blank" className="btn" style={{ padding: '0.4rem 0.6rem', backgroundColor: 'var(--background)', color: 'var(--text-muted)' }} title="Ver en la web">
                              <Eye size={16} />
                            </Link>
                            <Link to={`/admin/tours/${tour.id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.6rem' }} title="Editar tour">
                              <Edit size={16} />
                            </Link>
                            <button 
                              onClick={() => setDeleteModal({ isOpen: true, type: 'tour', itemId: tour.id, itemTitle: tour.title })}
                              style={{ padding: '0.4rem 0.6rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                              title="Eliminar tour"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--background)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '1rem 1.5rem' }}>Apartamento</th>
                    <th style={{ padding: '1rem' }}>Categoría</th>
                    <th style={{ padding: '1rem' }}>Precio por Noche</th>
                    <th style={{ padding: '1rem' }}>Capacidad</th>
                    <th style={{ padding: '1rem' }}>Rating</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApartments.map((apt) => {
                    const thumb = apt.images && apt.images[0] ? getImageUrl(apt.images[0]) : '';
                    return (
                      <tr key={apt.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }}>
                        <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img 
                            src={thumb} 
                            alt={apt.title} 
                            style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{apt.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{apt.shortDescription}</div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span className="badge badge-accent" style={{ fontSize: '0.8rem' }}>{apt.category}</span>
                        </td>
                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
                          ${apt.price ? apt.price.toLocaleString('es-CO') : 0} COP
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          {apt.duration}
                        </td>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>
                          ★ {apt.rating || 5.0}
                        </td>
                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <Link to={`/apartamento/${apt.id}`} target="_blank" className="btn" style={{ padding: '0.4rem 0.6rem', backgroundColor: 'var(--background)', color: 'var(--text-muted)' }} title="Ver en la web">
                              <Eye size={16} />
                            </Link>
                            <Link to={`/admin/apartments/${apt.id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.6rem' }} title="Editar apartamento">
                              <Edit size={16} />
                            </Link>
                            <button 
                              onClick={() => setDeleteModal({ isOpen: true, type: 'apartment', itemId: apt.id, itemTitle: apt.title })}
                              style={{ padding: '0.4rem 0.6rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                              title="Eliminar apartamento"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '420px', width: '90%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>¿Eliminar este elemento?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Vas a eliminar <strong>"{deleteModal.itemTitle}"</strong>. Esta acción actualizará el catálogo local de inmediato.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setDeleteModal({ isOpen: false, type: 'tour', itemId: null, itemTitle: '' })} 
                className="btn" 
                style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)', border: '1px solid var(--border)' }}
              >
                Cancelar
              </button>
              <button 
                onClick={handleDelete} 
                className="btn" 
                style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none' }}
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
