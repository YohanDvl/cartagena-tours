import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, CheckCircle2, Check, CalendarDays, Shield, Star, Flame } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import { store } from '../data/store';
import { getImageUrl } from '../utils/imageUrl';

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchTour() {
      try {
        const data = await store.getTourById(id);
        setTour(data);
      } catch (err) {
        console.error('Error fetching tour:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTour();
  }, [id]);

  useEffect(() => {
    if (!tour || !tour.images || tour.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tour]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Cargando experiencia...</h2>
      </div>
    );
  }

  if (!tour) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h2>Tour no encontrado</h2>
        <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
      </div>
    );
  }

  const images = tour.images && tour.images.length > 0 ? tour.images : ['/images/ciudad_amurallada.png'];

  return (
    <div style={{ backgroundColor: 'var(--background)', paddingBottom: '4rem' }}>
      {/* Header Image Carousel */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden' }}>
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={getImageUrl(img)} 
            alt={`${tour.title} ${idx + 1}`} 
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
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getImageUrl('/images/ciudad_amurallada.png');
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
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-accent" style={{ color: 'var(--text-main)', alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.92)', fontWeight: 700 }}>
              {tour.category}
            </span>
            {(tour.isBestSeller === 1 || tour.isBestSeller === true) && (
              <span className="badge badge-orange" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem', backgroundColor: 'rgba(255, 107, 53, 0.95)', color: '#fff' }}>
                <Flame size={14} /> Más vendido
              </span>
            )}
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            {tour.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
            <Star size={20} fill="currentColor" /> {tour.rating || 5.0}
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, marginLeft: '0.5rem' }}>({tour.reviews || 95} valoraciones verificadas)</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255,255,255,0.95)', fontSize: '1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--primary)" />
              <span>{tour.duration}</span>
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
          
          {/* Main Info */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Sobre esta experiencia en Cartagena</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              {tour.fullDescription || tour.shortDescription}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2.5rem' }} className="grid-sm">
              {/* Includes */}
              {tour.includes && tour.includes.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={24} color="var(--primary)" />
                    ¿Qué incluye?
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {tour.includes.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <Check size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Not Includes */}
              {tour.notIncludes && tour.notIncludes.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={24} color="var(--accent-orange)" />
                    No incluye / Recomendaciones
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {tour.notIncludes.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <span style={{ color: 'var(--text-light)', fontWeight: 700 }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>Itinerario del Tour</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {tour.itinerary.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1.2rem' }}>
                      <div style={{ 
                        backgroundColor: 'var(--primary-light)', 
                        color: 'var(--primary)', 
                        fontWeight: 700, 
                        padding: '0.5rem 1rem', 
                        borderRadius: 'var(--radius-md)',
                        height: 'fit-content',
                        minWidth: '110px',
                        textAlign: 'center'
                      }}>
                        {step.time}
                      </div>
                      <div style={{ paddingTop: '0.25rem', color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        {step.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Booking Card */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                {tour.price > 0 && (
                  <>
                    <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Precio por Adulto</span>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'Outfit', lineHeight: 1 }}>
                      ${tour.price.toLocaleString('es-CO')}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> COP</span>
                    
                    {tour.priceChild > 0 && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Tarifa Niños</span>
                        <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'Outfit', lineHeight: 1 }}>
                          ${tour.priceChild.toLocaleString('es-CO')}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> COP</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                  <CalendarDays size={20} color="var(--primary)" />
                  <span>Reserva anticipada sin pago inicial</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                  <Shield size={20} color="var(--primary)" />
                  <span>Cancelación gratuita 24h antes</span>
                </div>
              </div>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="btn btn-action animate-pulse-action" 
                style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', fontWeight: 700, borderRadius: 'var(--radius-md)' }}
              >
                ¡Asegurar mi cupo YA!
              </button>
              
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                Reserva rápida directa por WhatsApp con el asesor oficial.
              </p>
            </div>
          </div>
          
        </div>
      </div>

      <BookingModal 
        tour={tour} 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />

      <style>{`
        @media (min-width: 992px) {
          .grid-md { grid-template-columns: 2fr 1fr !important; }
        }
        @media (min-width: 768px) {
          .grid-sm { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
