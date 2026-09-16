import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, LogOut, Settings as SettingsIcon, Map, CheckCircle2, AlertCircle, Building } from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('tours');
  const [tours, setTours] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Settings State
  const [config, setConfig] = useState({ username: '', securityQuestion: '' });
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [settingsMessage, setSettingsMessage] = useState('');
  const [settingsError, setSettingsError] = useState('');

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: 'tour', itemId: null, itemTitle: '' });

  const navigate = useNavigate();

  useEffect(() => {
    fetchTours();
    fetchApartments();
    fetchConfig();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchTours = () => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        setTours(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tours:', err);
        setLoading(false);
      });
  };

  const fetchApartments = () => {
    fetch('/api/apartments')
      .then(res => res.json())
      .then(data => {
        setApartments(data);
      })
      .catch(err => {
        console.error('Error fetching apartments:', err);
      });
  };

  const fetchConfig = () => {
    fetch('/api/admin/config', { headers: getAuthHeaders() })
      .then(res => {
        if(res.status === 401 || res.status === 403) {
           onLogout();
           return;
        }
        return res.json();
      })
      .then(data => {
        if(data && data.username) {
          setConfig(data);
          setSettingsForm(prev => ({ ...prev, newUsername: data.username, securityQuestion: data.securityQuestion || '' }));
        }
      })
      .catch(err => console.error(err));
  };

  const confirmDelete = () => {
    if (!deleteModal.itemId) return;
    const url = deleteModal.type === 'tour' ? `/api/tours/${deleteModal.itemId}` : `/api/apartments/${deleteModal.itemId}`;
    
    fetch(url, { method: 'DELETE', headers: getAuthHeaders() })
      .then(() => {
        if (deleteModal.type === 'tour') {
          fetchTours();
        } else {
          fetchApartments();
        }
        setDeleteModal({ isOpen: false, type: 'tour', itemId: null, itemTitle: '' });
      })
      .catch(err => {
        if (err.status === 401 || err.status === 403) onLogout();
        console.error(err);
        setDeleteModal({ isOpen: false, type: 'tour', itemId: null, itemTitle: '' });
      });
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setSettingsMessage('');
    setSettingsError('');
    
    fetch('/api/admin/config', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settingsForm)
    })
    .then(res => {
      if(res.status === 401 || res.status === 403) {
         if (res.status === 401) setSettingsError('Contraseña actual incorrecta o sesión expirada');
         return res.json();
      }
      return res.json();
    })
    .then(data => {
      if(data.success) {
        setSettingsMessage('Configuración actualizada correctamente.');
        setSettingsForm(prev => ({ ...prev, currentPassword: '', newPassword: '', securityAnswer: '' }));
        fetchConfig();
        // Auto-hide toast after 3 seconds
        setTimeout(() => setSettingsMessage(''), 3000);
      } else if (data.error) {
        setSettingsError(data.error);
        setTimeout(() => setSettingsError(''), 4000);
      }
    })
    .catch(err => {
       setSettingsError('Error de conexión');
    });
  };

  if (loading) return <div style={{ padding: '100px 2rem 4rem', textAlign: 'center' }}>Cargando Panel...</div>;

  const filteredTours = tours.filter(tour => 
    tour.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tour.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApartments = apartments.filter(apt => 
    apt.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    apt.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '100px 2rem 4rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'var(--background)' }}>
      {/* Floating Notifications */}
      {settingsMessage && (
        <div style={{ position: 'fixed', top: '3rem', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', color: 'white', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', animation: 'slideDown 0.3s ease-out' }}>
          <CheckCircle2 size={24} />
          {settingsMessage}
        </div>
      )}
      {settingsError && (
        <div style={{ position: 'fixed', top: '3rem', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ef4444', color: 'white', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', animation: 'slideDown 0.3s ease-out' }}>
          <AlertCircle size={24} />
          {settingsError}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>Panel Administrativo</h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={onLogout} className="btn" style={{ border: '1px solid var(--border)', color: '#ef4444' }}>
            <LogOut size={18} style={{ marginRight: '0.5rem' }} /> Cerrar Sesión
          </button>
          <Link to="/" className="btn" style={{ border: '1px solid var(--border)' }}>
            <LogOut size={18} style={{ marginRight: '0.5rem', transform: 'rotate(180deg)' }} /> Ver Sitio Web
          </Link>
          <Link to="/admin/tours/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} /> Nuevo Tour
          </Link>
          <Link to="/admin/apartments/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} /> Nuevo Apartamento
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', overflowX: 'auto' }}>
        <button 
          onClick={() => setActiveTab('tours')} 
          className="btn" 
          style={{ backgroundColor: activeTab === 'tours' ? 'var(--primary)' : 'transparent', color: activeTab === 'tours' ? '#000' : 'var(--text-main)', whiteSpace: 'nowrap' }}>
          <Map size={18} style={{ marginRight: '0.5rem' }} /> Mis Tours
        </button>
        <button 
          onClick={() => setActiveTab('apartments')} 
          className="btn" 
          style={{ backgroundColor: activeTab === 'apartments' ? 'var(--primary)' : 'transparent', color: activeTab === 'apartments' ? '#000' : 'var(--text-main)', whiteSpace: 'nowrap' }}>
          <Building size={18} style={{ marginRight: '0.5rem' }} /> Mis Apartamentos
        </button>
        <button 
          onClick={() => setActiveTab('config')} 
          className="btn" 
          style={{ backgroundColor: activeTab === 'config' ? 'var(--primary)' : 'transparent', color: activeTab === 'config' ? '#000' : 'var(--text-main)', whiteSpace: 'nowrap' }}>
          <SettingsIcon size={18} style={{ marginRight: '0.5rem' }} /> Configuración
        </button>
      </div>

      {activeTab === 'tours' && (
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <input 
              type="text" 
              placeholder="Buscar tour por título o categoría..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', maxWidth: '400px', padding: '0.6rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)', outline: 'none' }}
            />
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Título</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Categoría</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Precio</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map(tour => (
                <tr key={tour.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>{tour.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{tour.title}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge glass">{tour.category}</span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--primary)' }}>${tour.price.toLocaleString('es-CO')}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/admin/tours/${tour.id}`} className="btn" style={{ padding: '0.5rem', backgroundColor: 'rgba(37,99,235,0.1)', color: '#3b82f6' }}>
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => setDeleteModal({ isOpen: true, type: 'tour', itemId: tour.id, itemTitle: tour.title })} className="btn" style={{ padding: '0.5rem', backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTours.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {searchQuery ? 'No se encontraron tours con esa búsqueda.' : 'No hay tours creados todavía.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'apartments' && (
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <input 
              type="text" 
              placeholder="Buscar apartamento por título o categoría..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', maxWidth: '400px', padding: '0.6rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--text-main)', outline: 'none' }}
            />
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Título</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Categoría</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Precio / Noche</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredApartments.map(apt => (
                <tr key={apt.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>{apt.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{apt.title}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge glass">{apt.category}</span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--primary)' }}>${apt.price.toLocaleString('es-CO')}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/admin/apartments/${apt.id}`} className="btn" style={{ padding: '0.5rem', backgroundColor: 'rgba(37,99,235,0.1)', color: '#3b82f6' }}>
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => setDeleteModal({ isOpen: true, type: 'apartment', itemId: apt.id, itemTitle: apt.title })} className="btn" style={{ padding: '0.5rem', backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApartments.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {searchQuery ? 'No se encontraron apartamentos con esa búsqueda.' : 'No hay apartamentos creados todavía.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'config' && (
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', maxWidth: '650px', boxShadow: 'var(--shadow-lg)' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.8rem' }}>Configuración de Cuenta</h2>

          <form onSubmit={handleSettingsSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                Usuario <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text" 
                value={settingsForm.newUsername} 
                onChange={(e) => setSettingsForm({...settingsForm, newUsername: e.target.value})}
                required
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: '500' }}>Nueva Contraseña (Opcional)</label>
              <input 
                type="password" 
                placeholder="Dejar en blanco para mantener la actual"
                value={settingsForm.newPassword} 
                onChange={(e) => setSettingsForm({...settingsForm, newPassword: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
            </div>
            
            <hr style={{ borderColor: 'var(--border)', margin: '2rem 0' }} />
            
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Recuperación de Contraseña</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Configura una pregunta secreta. Si olvidas tu contraseña, podrás recuperarla respondiendo a esta pregunta.
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                Pregunta de Seguridad <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select 
                value={settingsForm.securityQuestion} 
                onChange={(e) => setSettingsForm({...settingsForm, securityQuestion: e.target.value})}
                required
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              >
                <option value="" disabled>Selecciona una pregunta de seguridad...</option>
                <option value="¿En qué ciudad se conocieron tus padres?">¿En qué ciudad se conocieron tus padres?</option>
                <option value="¿Cuál era el nombre de tu primer colegio?">¿Cuál era el nombre de tu primer colegio?</option>
                <option value="¿Cuál es el nombre de la ciudad donde naciste?">¿Cuál es el nombre de la ciudad donde naciste?</option>
                <option value="¿Cuál era el nombre de tu mejor amigo de la infancia?">¿Cuál era el nombre de tu mejor amigo de la infancia?</option>
                <option value="¿Cuál es el segundo nombre de tu madre?">¿Cuál es el segundo nombre de tu madre?</option>
                <option value="¿En qué año te graduaste del colegio?">¿En qué año te graduaste del colegio?</option>
                <option value="¿Cuál fue tu primer vehículo u objeto preciado?">¿Cuál fue tu primer vehículo u objeto preciado?</option>
              </select>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                Respuesta a la Pregunta {!config.securityQuestion && <span style={{ color: '#ef4444' }}>*</span>}
              </label>
              <input 
                type="password" 
                placeholder={config.securityQuestion ? "Dejar en blanco para no cambiarla" : "Escribe tu respuesta secreta"}
                value={settingsForm.securityAnswer} 
                onChange={(e) => setSettingsForm({...settingsForm, securityAnswer: e.target.value})}
                required={!config.securityQuestion}
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
            </div>

            <hr style={{ borderColor: 'var(--border)', margin: '2rem 0' }} />

            <div style={{ marginBottom: '2rem', backgroundColor: 'rgba(239,68,68,0.05)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ef4444', fontWeight: 'bold' }}>
                Contraseña Actual (Requerida para guardar) <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="password" 
                placeholder="Ingresa tu contraseña actual para confirmar los cambios"
                value={settingsForm.currentPassword} 
                onChange={(e) => setSettingsForm({...settingsForm, currentPassword: e.target.value})}
                required
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid rgba(239,68,68,0.4)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 2rem', width: '100%', fontSize: '1.1rem', fontWeight: 'bold' }}>
              Guardar Configuración
            </button>
          </form>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', maxWidth: '450px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', textAlign: 'center', animation: 'slideDown 0.3s ease-out' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Trash2 size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>¿Eliminar {deleteModal.type === 'tour' ? 'Tour' : 'Apartamento'}?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Estás a punto de eliminar permanentemente el {deleteModal.type === 'tour' ? 'tour' : 'apartamento'}: <br/>
              <strong style={{ color: 'var(--text-main)', display: 'block', marginTop: '0.5rem' }}>"{deleteModal.itemTitle}"</strong><br/>
              Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setDeleteModal({ isOpen: false, type: 'tour', itemId: null, itemTitle: '' })} 
                className="btn" 
                style={{ padding: '0.8rem 1.5rem', border: '1px solid var(--border)', flex: 1 }}
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete} 
                className="btn" 
                style={{ padding: '0.8rem 1.5rem', backgroundColor: '#ef4444', color: 'white', border: 'none', flex: 1, fontWeight: 'bold' }}
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
