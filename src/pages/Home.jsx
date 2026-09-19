import { useState, useEffect } from 'react';
import { Search, Compass, Shield, ThumbsUp, Building, X, ArrowDown } from 'lucide-react';
import TourCard from '../components/TourCard';
import ApartmentCard from '../components/ApartmentCard';
import { store } from '../data/store';
import { getImageUrl } from '../utils/imageUrl';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tours, setTours] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [toursData, aptsData] = await Promise.all([
          store.getTours(),
          store.getApartments()
        ]);
        setTours(toursData);
        setApartments(aptsData);
      } catch (err) {
        console.error('Error cargando catálogo:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!loading && window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [loading]);

  const filteredTours = tours.filter(tour => 
    tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tour.category && tour.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (tour.shortDescription && tour.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredApartments = apartments.filter(apt => 
    apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (apt.category && apt.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (apt.shortDescription && apt.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const scrollToResults = (forcedTarget = null) => {
    const term = searchTerm.toLowerCase().trim();

    let targetId = forcedTarget;
    if (!targetId) {
      const isApartmentSearch = 
        term.includes('apartamento') || 
        term.includes('apto') || 
        term.includes('loft') || 
        term.includes('hospedaje') || 
        term.includes('alojamiento') || 
        term.includes('piso') || 
        term.includes('habitacion') || 
        term.includes('habitación') || 
        term.includes('suite') || 
        term.includes('morros') || 
        term.includes('bocagrande') || 
        term.includes('penthouse');

      if (isApartmentSearch || (filteredTours.length === 0 && filteredApartments.length > 0)) {
        targetId = 'apartments';
      } else {
        targetId = 'tours';
      }
    }

    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -85; // Altura de navbar fija
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    scrollToResults();
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="home" style={{
        position: 'relative',
        height: '88vh',
        minHeight: '620px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url("${getImageUrl('/images/ciudad_amurallada.png')}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2
        }}></div>
        {/* High Contrast Dark Overlay for Maximum Readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backgroundImage: 'linear-gradient(to bottom, rgba(10, 15, 30, 0.45) 0%, rgba(10, 15, 30, 0.88) 100%)',
          zIndex: -1
        }}></div>

        <div className="container animate-fade-in" style={{ zIndex: 1, padding: '0 1rem' }}>
          
          {/* Badge Notable y Luminoso */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            padding: '0.65rem 1.5rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.85rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            marginBottom: '1.8rem',
            border: '2px solid rgba(255, 255, 255, 0.9)'
          }}>
            🌴 EXPLORA CARTAGENA DE INDIAS
          </div>

          {/* Refrán con Colores Vivos y Contraste Total */}
          <h1 style={{
            fontSize: 'clamp(2.7rem, 6vw, 4.8rem)',
            fontWeight: 900,
            marginBottom: '1.5rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 25px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.9)'
          }}>
            <span style={{ color: '#ffffff', display: 'block' }}>
              Descansa Seguro,
            </span>
            <span style={{
              color: '#fbbf24',
              display: 'block',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.95), 0 0 35px rgba(251, 191, 36, 0.6)'
            }}>
              Explora Sin Límites.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            maxWidth: '750px',
            margin: '0 auto 2.5rem auto',
            color: '#f8fafc',
            fontWeight: 500,
            lineHeight: 1.6,
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Tours exclusivos, alquiler de botes deportivos y apartamentos vacacionales con atención VIP personalizada en Cartagena.
          </p>
          
          {/* Search Bar Form */}
          <form 
            onSubmit={handleSearchSubmit}
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'relative',
              boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
              borderRadius: 'var(--radius-full)'
            }}>
              <input 
                type="text" 
                placeholder="¿Qué experiencia o alojamiento buscas? (Ej: Islas del Rosario, Loft...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: searchTerm ? '1.2rem 6.5rem 1.2rem 2rem' : '1.2rem 4rem 1.2rem 2rem',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  color: 'var(--text-main)',
                  fontSize: '1.05rem',
                  outline: 'none',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                  transition: 'all 0.2s ease'
                }}
              />

              {/* Botón limpiar búsqueda */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '58px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(15, 23, 42, 0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b',
                    transition: 'all 0.2s'
                  }}
                  title="Borrar búsqueda"
                >
                  <X size={16} />
                </button>
              )}

              {/* Botón enviar búsqueda */}
              <button 
                type="submit"
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                  transition: 'transform 0.2s, background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                title="Buscar y ver resultados"
              >
                <Search size={22} />
              </button>
            </div>

            {/* Live feedback pill when user is typing */}
            {searchTerm.trim().length > 0 && (
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => scrollToResults()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    padding: '0.6rem 1.4rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(251, 191, 36, 0.6)',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.35)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = '#0f172a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
                  }}
                >
                  <span>
                    {filteredTours.length + filteredApartments.length > 0
                      ? `✨ ${filteredTours.length + filteredApartments.length} resultado(s) (${filteredTours.length} tours, ${filteredApartments.length} alojamientos) — Ver abajo`
                      : '🔍 Ver catálogo de experiencias'}
                  </span>
                  <ArrowDown size={16} color="#fbbf24" />
                </button>
              </div>
            )}

            {/* Accesos rápidos populares si no hay búsqueda activa */}
            {searchTerm === '' && (
              <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', alignSelf: 'center', marginRight: '0.2rem', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                  Búsquedas sugeridas:
                </span>
                {[
                  { label: '🏢 Apartamentos', term: 'apartamento', target: 'apartments' },
                  { label: '🏝️ Islas del Rosario', term: 'islas', target: 'tours' },
                  { label: '⛵ Catamarán & Botes', term: 'catamarán', target: 'tours' },
                  { label: '🎉 Chiva Rumbera', term: 'chiva', target: 'tours' },
                ].map((chip) => (
                  <button
                    key={chip.term}
                    type="button"
                    onClick={() => {
                      setSearchTerm(chip.term);
                      setTimeout(() => scrollToResults(chip.target), 60);
                    }}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#ffffff',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.32)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-lg)', color: 'var(--primary)' }}>
                <Compass size={32} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Operadores Locales</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Guías certificados y capitanes con amplia trayectoria.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-lg)', color: 'var(--primary)' }}>
                <Shield size={32} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Reserva Segura</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pólizas médicas incluidas y cancelación transparente.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-lg)', color: 'var(--primary)' }}>
                <ThumbsUp size={32} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Calificación 4.9/5</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Más de 500 viajeros satisfechos en todo el mundo.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-lg)', color: 'var(--primary)' }}>
                <Building size={32} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Apartamentos Top</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Propiedades exclusivas frente al mar y en el centro amurallado.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tours Catalog */}
      <section id="tours" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-accent" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>EXPERIENCIAS</span>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>Tours & Excursiones en Cartagena</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              Navega a las Islas del Rosario, recorre la historia colonial o disfruta de la fiesta tradicional sobre ruedas.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <h3>Cargando experiencias...</h3>
            </div>
          ) : filteredTours.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {filteredTours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              {filteredApartments.length > 0 ? (
                <div>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
                    No encontramos tours para <strong>"{searchTerm}"</strong>, pero encontramos <strong>{filteredApartments.length} alojamiento{filteredApartments.length > 1 ? 's' : ''}</strong> en la sección siguiente.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.2rem', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => scrollToResults('apartments')} 
                      className="btn btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      Ver Alojamientos ({filteredApartments.length}) <ArrowDown size={16} />
                    </button>
                    <button onClick={() => setSearchTerm('')} className="btn" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                      Limpiar búsqueda
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No encontramos experiencias que coincidan con tu búsqueda.</p>
                  <button onClick={() => setSearchTerm('')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Ver todas las experiencias</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Apartments Section */}
      <section id="apartments" style={{ padding: '5rem 0', backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-accent" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>HOSPEDAJE SELECTO</span>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>Apartamentos Turísticos Exclusivos</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              Apartamentos de lujo en Bocagrande, lofts coloniales y penthouses en Morros con vistas al mar y máxima comodidad.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <h3>Cargando alojamientos...</h3>
            </div>
          ) : filteredApartments.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {filteredApartments.map(apt => (
                <ApartmentCard key={apt.id} apartment={apt} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              {filteredTours.length > 0 ? (
                <div>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
                    No encontramos alojamientos para <strong>"{searchTerm}"</strong>, pero encontramos <strong>{filteredTours.length} experiencia{filteredTours.length > 1 ? 's' : ''} / tour{filteredTours.length > 1 ? 's' : ''}</strong> disponibles arriba.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.2rem', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => scrollToResults('tours')} 
                      className="btn btn-primary"
                    >
                      Ver Tours ({filteredTours.length}) ↑
                    </button>
                    <button onClick={() => setSearchTerm('')} className="btn" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                      Limpiar búsqueda
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No encontramos alojamientos para tu búsqueda.</p>
                  <button onClick={() => setSearchTerm('')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Ver todos los alojamientos</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="badge badge-accent" style={{ marginBottom: '1rem', display: 'inline-block' }}>NUESTRA PROMESA</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>Más que un viaje, una memoria inolvidable</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              En <strong>YouTours</strong> nos especializamos en ofrecer una experiencia auténtica y sin complicaciones. Sabemos que tus vacaciones son sagradas: por eso garantizamos puntualidad, embarcaciones seguras, traslados climatizados y la atención cálida y transparente que mereces en la Heroica.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '0.2rem', fontFamily: 'Outfit' }}>100%</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Atención Personalizada</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '0.2rem', fontFamily: 'Outfit' }}>+500</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Clientes Felices</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '0.2rem', fontFamily: 'Outfit' }}>4.9★</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Satisfacción Media</p>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img 
              src={getImageUrl('/images/cartagena_generic_1.png')} 
              alt="Cartagena de Indias Bahía" 
              style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
