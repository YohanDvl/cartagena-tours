import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle2, Check, CalendarDays, Shield, Star, Users } from 'lucide-react';
import ApartmentBookingModal from '../components/ApartmentBookingModal';
import { store } from '../data/store';
import { getImageUrl } from '../utils/imageUrl';

export default function ApartmentDetails() {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchApartment() {
      try {
        const data = await store.getApartmentById(id);
        setApartment(data);
      } catch (err) {
        console.error('Error fetching apartment:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchApartment();
  }, [id]);

  useEffect(() => {
    if (!apartment || !apartment.images || apartment.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [apartment]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Cargando alojamiento...</h2>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h2>Apartamento no encontrado</h2>
        <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
      </div>
    );
  }

  const images = apartment.images && apartment.images.length > 0 ? apartment.images : [];

  return (
    <div style={{ backgroundColor: 'var(--background)', paddingBottom: '4rem' }}>
      {/* Header Carousel */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden' }}>
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={getImageUrl(img)} 
            alt={`${apartment.title} ${idx + 1}`} 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'opacity 1s ease-in-out',
              opacity: idx === currentImageIndex ? 1 : 0,
              zIndex: idx === currentImageIndex ? 1 : 0
            }} 
          />
        ))}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.45)',
          zIndex: 5
        }}></div>
        
        <div className="container" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '3rem', zIndex: 10 }}>
          <Link to="/" style={{ color: 'white', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', width: 'fit-content' }}>
            <ArrowLeft size={20} />
            Volver al Catálogo
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="badge badge-accent" style={{ color: 'var(--text-main)', alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.92)', fontWeight: 700 }}>
              {apartment.category}
            </span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            {apartment.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
            <Star size={20} fill="currentColor" /> {apartment.rating || 5.0}
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, marginLeft: '0.5rem' }}>({apartment.reviews || 40} opiniones de huéspedes)</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255,255,255,0.95)', fontSize: '1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} color="var(--primary)" />
              <span>Capacidad: {apartment.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={20} color="var(--primary)" />
              <span>Cartagena de Indias, Colombia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="grid-md">
          
          <div style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Detalles del Alojamiento</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              {apartment.fullDescription || apartment.shortDescription}
            </p>

            {/* Amenities & Includes */}
            {apartment.includes && apartment.includes.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={24} color="var(--primary)" />
                  Amenidades & Equipamiento
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                  {apartment.includes.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', backgroundColor: 'var(--background)', padding: '0.6rem 0.9rem', borderRadius: 'var(--radius-sm)' }}>
                      <Check size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules / Itinerary */}
            {apartment.itinerary && apartment.itinerary.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>Reglas y Horarios</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {apartment.itinerary.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', minWidth: '110px', textAlign: 'center' }}>
                        {step.time}
                      </span>
                      <span style={{ color: 'var(--text-main)', fontSize: '1.05rem' }}>{step.description || step.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Tarifa por Noche</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'Outfit', lineHeight: 1 }}>
                  ${apartment.price.toLocaleString('es-CO')}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> COP</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                  <CalendarDays size={20} color="var(--primary)" />
                  <span>Consulta fechas disponibles</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                  <Shield size={20} color="var(--primary)" />
                  <span>Check-in seguro & asistencia 24/7</span>
                </div>
              </div>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="btn btn-action animate-pulse-action" 
                style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', fontWeight: 700, borderRadius: 'var(--radius-md)' }}
              >
                Cotizar Estadía por WhatsApp
              </button>
            </div>
          </div>
          
        </div>
      </div>

      <ApartmentBookingModal 
        apartment={apartment} 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />

      <style>{`
        @media (min-width: 992px) {
          .grid-md { grid-template-columns: 2fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
