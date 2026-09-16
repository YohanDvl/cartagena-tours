import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, MapPin, CheckCircle2, Check, XCircle, CalendarDays, Shield, Star, Flame } from 'lucide-react';
import ApartmentBookingModal from '../components/ApartmentBookingModal';

export default function ApartmentDetails() {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/apartments/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Apartamento no encontrado');
        return res.json();
      })
      .then(data => {
        setApartment(data);
        setCurrentImageIndex(0);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching apartment:', err);
        setLoading(false);
      });
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
        <h2>Cargando apartamento...</h2>
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

  return (
    <div style={{ backgroundColor: 'var(--background)', paddingBottom: '4rem' }}>
      {/* Header Image Carousel */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden' }}>
        {(apartment.images || [apartment.image]).map((img, idx) => (
          <img 
            key={idx}
            src={img} 
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
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 5
        }}></div>
        
        <div className="container" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '3rem', zIndex: 10 }}>
          <Link to="/" style={{ color: 'white', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', width: 'fit-content' }}>
            <ArrowLeft size={20} />
            Volver
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-accent" style={{ color: 'var(--text-main)', alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>
              {apartment.category}
            </span>
            {(apartment.isBestSeller === 1 || apartment.isBestSeller === true) && (
              <span className="badge badge-orange" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem', backgroundColor: 'rgba(255, 107, 53, 0.95)', color: '#fff' }}>
                <Flame size={14} /> Más rentado
              </span>
            )}
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '0.5rem' }}>
            {apartment.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
            <Star size={20} fill="currentColor" /> {apartment.rating || 5.0}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} color="var(--primary)" />
              <span>Capacidad: {apartment.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={20} color="var(--primary)" />
              <span>Cartagena, Colombia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="grid-md">
          
          {/* Main Info */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Sobre este apartamento</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {apartment.fullDescription}
            </p>

            {/* Capacity (added to match cards) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
              <Users size={18} color="var(--primary)" />
              <span style={{ fontWeight: 600 }}>Capacidad:</span>
              <span style={{ color: 'var(--text-muted)' }}>{apartment.duration}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2rem' }} className="grid-sm">
              {/* Includes */}
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={24} color="var(--primary)" />
                  Comodidades
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {apartment.includes.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <Check size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>


            </div>

            {/* Rules / Itinerary */}
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>Reglas y Más Info</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {apartment.itinerary.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ 
                      backgroundColor: 'var(--primary-light)', 
                      color: 'var(--primary)', 
                      fontWeight: 700, 
                      padding: '0.5rem 1rem', 
                      borderRadius: 'var(--radius-md)',
                      height: 'fit-content',
                      minWidth: '100px',
                      textAlign: 'center'
                    }}>
                      {step.time}
                    </div>
                    <div style={{ paddingTop: '0.25rem', color: 'var(--text-main)' }}>
                      {step.activity || step.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div style={{ backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Precio por Noche desde</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'Outfit', lineHeight: 1 }}>
                  ${apartment.price.toLocaleString('es-CO')}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> COP</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                  <CalendarDays size={20} color="var(--primary)" />
                  <span>Reserva ahora, asegura tus fechas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                  <Shield size={20} color="var(--primary)" />
                  <span>Soporte 24/7 en tu estadía</span>
                </div>
              </div>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="btn btn-secondary" 
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
              >
                Solicitar Reserva
              </button>
              
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                Validaremos disponibilidad por WhatsApp.
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {isBookingModalOpen && (
        <ApartmentBookingModal 
          apartment={apartment} 
          isOpen={isBookingModalOpen} 
          onClose={() => setIsBookingModalOpen(false)} 
        />
      )}

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
