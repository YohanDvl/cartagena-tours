import { useState, useEffect } from 'react';
import { Search, Compass, Shield, ThumbsUp, Building } from 'lucide-react';
import TourCard from '../components/TourCard';
import ApartmentCard from '../components/ApartmentCard';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tours, setTours] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/tours').then(res => res.json()),
      fetch('/api/apartments').then(res => res.json())
    ])
    .then(([toursData, aptsData]) => {
      setTours(toursData);
      setApartments(aptsData);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error cargando datos:", err);
      setLoading(false);
    });
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
    tour.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredApartments = apartments.filter(apt => 
    apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
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
          backgroundImage: 'url("/images/ciudad_amurallada.png")',
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
          backgroundColor: 'rgba(30, 30, 30, 0.2)', // Dark gray overlay
          backgroundImage: 'linear-gradient(to bottom, rgba(20, 20, 20, 0.1) 0%, rgba(10, 10, 10, 0.5) 100%)',
          zIndex: -1
        }}></div>

        <div className="container animate-fade-in" style={{ zIndex: 1, padding: '0 1rem' }}>
          <span className="badge badge-cyan glass" style={{ marginBottom: '1.5rem', fontWeight: 700 }}>
            ✨ El Caribe te espera
          </span>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            fontWeight: 800, 
            marginBottom: '1rem',
          }}>
            <span style={{ 
              background: 'linear-gradient(to bottom, #FFF3B0 0%, #FFB703 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              display: 'inline-block',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}>Vive la Magia del</span> 
            <br/>
            <span style={{ background: 'linear-gradient(to bottom, #E0FBFC 0%, var(--accent-cyan) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>Caribe Colombiano</span>
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)', opacity: 0.9 }}>
            "Cartagena, Santa Marta, Barranquilla y más. Tu aventura comienza aquí."
          </p>

          {/* Quick Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button className="badge glass" onClick={() => setSearchTerm('Cartagena')}>📍 Cartagena</button>
            <button className="badge glass" onClick={() => setSearchTerm('Santa Marta')}>📍 Santa Marta</button>
            <button className="badge glass" onClick={() => setSearchTerm('Palenque')}>🥁 Palenque</button>
            <button className="badge glass" onClick={() => setSearchTerm('Barranquilla')}>🎭 Barranquilla</button>
          </div>

          {/* Search Bar Simulator */}
          <div className="search-container glass">
            <div className="search-icon">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Ej: Tour a Islas del Rosario, Tayrona..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="search-input"
            />
            <button 
              className="btn btn-action search-btn"
              onClick={() => {
                document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Buscar Tours</span>
              <Search size={20} className="search-mobile-icon" />
            </button>
          </div>
        </div>

        <style>{`
          .search-container {
            display: flex;
            align-items: center;
            max-width: 700px;
            margin: 0 auto;
            padding: 0.4rem;
            border-radius: var(--radius-full);
            background-color: rgba(20, 20, 20, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .search-icon {
            padding: 0 0.8rem 0 1.2rem;
            color: var(--text-muted);
            display: flex;
            align-items: center;
          }
          .search-input {
            flex: 1;
            border: none;
            background: transparent;
            padding: 0.8rem 0;
            font-size: 1rem;
            color: white !important;
            outline: none;
            min-width: 0;
          }
          .search-btn {
            padding: 0.8rem 1.5rem !important;
            white-space: nowrap;
          }
          .search-mobile-icon {
            display: none;
          }
          
          @media (max-width: 600px) {
            .search-container {
              border-radius: var(--radius-lg);
              padding: 0.5rem;
            }
            .search-icon {
              padding: 0 0.5rem 0 0.5rem;
            }
            .search-btn span {
              display: none;
            }
            .search-mobile-icon {
              display: block;
            }
            .search-btn {
              padding: 0.8rem !important;
              aspect-ratio: 1/1;
              border-radius: var(--radius-md) !important;
            }
            .search-input::placeholder {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </section>

      {/* Featured Tours Section */}
      <section id="tours" style={{ padding: '6rem 0', backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Tours Imperdibles</span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Experiencias Destacadas</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto', borderRadius: '2px' }}></div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {filteredTours.length > 0 ? (
              filteredTours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.2rem' }}>No se encontraron tours que coincidan con tu búsqueda.</p>
                <button 
                  onClick={() => setSearchTerm('')} 
                  style={{ color: 'var(--primary)', marginTop: '1rem', fontWeight: 600, textDecoration: 'underline' }}
                >
                  Ver todos los tours
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Apartments Section */}
      <section id="apartments" style={{ padding: '0 0 6rem 0', backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Estadías Exclusivas</span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Apartamentos Destacados</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto', borderRadius: '2px' }}></div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {filteredApartments.length > 0 ? (
              filteredApartments.map(apt => (
                <ApartmentCard key={apt.id} apartment={apt} />
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.2rem' }}>No se encontraron apartamentos que coincidan con tu búsqueda.</p>
                <button 
                  onClick={() => setSearchTerm('')} 
                  style={{ color: 'var(--primary)', marginTop: '1rem', fontWeight: 600, textDecoration: 'underline' }}
                >
                  Ver todos los apartamentos
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" style={{ padding: '6rem 0', backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Por qué viajar con nosotros</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
                Nos dedicamos a mostrarte la verdadera esencia de Cartagena con seguridad, comodidad y la mejor energía caribeña.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                  <Compass size={40} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Guías Locales Expertos</h3>
                <p style={{ color: 'var(--text-muted)' }}>Conoce la ciudad de la mano de cartageneros que conocen cada historia y secreto de sus calles.</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                  <Building size={40} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Alojamientos Exclusivos</h3>
                <p style={{ color: 'var(--text-muted)' }}>Te ofrecemos apartamentos de lujo y confort para una estadía inolvidable en la ciudad.</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                  <Shield size={40} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Seguridad Garantizada</h3>
                <p style={{ color: 'var(--text-muted)' }}>Trabajamos solo con operadores certificados y embarcaciones seguras para tu tranquilidad.</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                  <ThumbsUp size={40} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Mejor Precio</h3>
                <p style={{ color: 'var(--text-muted)' }}>Sin intermediarios innecesarios. Ofrecemos tarifas justas y transparentes para todas nuestras experiencias.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{ padding: '6rem 0', background: 'var(--brand-gradient)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '1.5rem', fontWeight: 800 }}>¿Listo para tu próxima aventura?</h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            No dejes que te lo cuenten. Contáctanos hoy mismo y armamos un paquete a tu medida con las mejores tarifas.
          </p>
          <a href="#tours" className="btn btn-action animate-pulse-action" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', fontWeight: 700, borderRadius: 'var(--radius-full)' }}>
            ¡Reserva tu aventura AHORA!
          </a>
        </div>
      </section>
    </div>
  );
}
