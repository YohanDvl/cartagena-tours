import { useState, useEffect } from 'react';
import { Search, Compass, Shield, ThumbsUp, Building } from 'lucide-react';
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
        console.error("Error cargando catálogo:", err);
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

  return (
    <div>
      {/* Hero Section */}
      <section id="home" style={{
        position: 'relative',
        height: '85vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image with Overlay */}
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
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(20, 20, 20, 0.45)',
          backgroundImage: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.75) 100%)',
          zIndex: -1
        }}></div>

        <div className="container animate-fade-in" style={{ zIndex: 1, padding: '0 1rem' }}>
          <span className="badge badge-accent" style={{ marginBottom: '1.5rem', display: 'inline-block', letterSpacing: '0.1em', padding: '0.6rem 1.2rem', fontSize: '0.9rem', fontWeight: 700 }}>
            EXPLORA CARTAGENA DE INDIAS
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
            Descansa Seguro, <br />
            <span style={{ color: 'var(--primary)' }}>Explora Sin Límites</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', maxWidth: '750px', margin: '0 auto 2.5rem auto', color: 'rgba(255,255,255,0.95)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Tours exclusivos, alquiler de botes deportivos y apartamentos vacacionales con atención VIP personalizada en Cartagena.
          </p>
          
          {/* Search Bar */}
          <div style={{
            maxWidth: '650px',
            margin: '0 auto',
            position: 'relative',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-full)'
          }}>
            <input 
              type="text" 
              placeholder="¿Qué experiencia o alojamiento buscas? (Ej: Islas del Rosario, Catamarán, Loft...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1.2rem 3.5rem 1.2rem 2rem',
                borderRadius: 'var(--radius-full)',
                border: '2px solid rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
              }}
            />
            <div style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'var(--primary)',
              color: '#fff',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Search size={20} />
            </div>
          </div>
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
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No encontramos tours que coincidan con tu búsqueda.</p>
              <button onClick={() => setSearchTerm('')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Ver todos los tours</button>
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
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No encontramos alojamientos para tu búsqueda.</p>
              <button onClick={() => setSearchTerm('')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Ver todos los apartamentos</button>
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
