import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Star, Flame } from 'lucide-react';
import { getImageUrl } from '../utils/imageUrl';

export default function TourCard({ tour }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = tour.images && tour.images.length > 0 ? tour.images : (tour.image ? [tour.image] : ['/images/ciudad_amurallada.png']);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="tour-card"
      style={{ 
        backgroundColor: 'var(--surface)', 
        borderRadius: 'var(--radius-lg)', 
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        transition: 'var(--transition)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }} className="image-container">
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
              transition: 'opacity 0.8s ease-in-out, transform 0.5s ease',
              opacity: idx === currentImageIndex ? 1 : 0,
              zIndex: idx === currentImageIndex ? 1 : 0
            }}
            className="card-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getImageUrl('/images/ciudad_amurallada.png');
            }}
          />
        ))}

        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="carousel-btn" style={{ left: '0.5rem' }}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImage} className="carousel-btn" style={{ right: '0.5rem' }}>
              <ChevronRight size={20} />
            </button>
            <div style={{ 
              position: 'absolute', 
              bottom: '0.75rem', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              display: 'flex', 
              gap: '0.4rem',
              zIndex: 10 
            }}>
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    backgroundColor: idx === currentImageIndex ? 'var(--primary)' : 'rgba(255,255,255,0.6)',
                    transition: 'var(--transition)'
                  }}
                />
              ))}
            </div>
          </>
        )}

        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge-accent" style={{ color: 'var(--text-main)', fontWeight: 700, backgroundColor: 'rgba(255,255,255,0.92)' }}>
            {tour.category}
          </span>
          {tour.category && tour.category.toLowerCase().includes('isla') && (
            <span className="badge badge-cyan" style={{ fontWeight: 700, backgroundColor: 'rgba(46, 196, 182, 0.95)', color: '#fff' }}>
              🌊 Mar & Playa
            </span>
          )}
        </div>
        {(tour.isBestSeller === 1 || tour.isBestSeller === true) && (
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
             <span className="badge badge-orange" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem', backgroundColor: 'rgba(255, 107, 53, 0.95)', color: '#fff' }}>
               <Flame size={14} /> Más vendido
             </span>
          </div>
        )}
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 0 }}>{tour.title}</h3>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
          <Star size={16} fill="currentColor" /> {tour.rating || 5.0}
          <span style={{ color: 'var(--text-light)', fontWeight: 400, marginLeft: '0.3rem' }}>({tour.reviews || 95} reseñas)</span>
        </div>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1, lineHeight: 1.5 }}>
          {tour.shortDescription}
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={16} />
            <span>{tour.duration}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <div>
            {tour.price > 0 && (
              <>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Por persona desde</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit' }}>
                  ${tour.price.toLocaleString('es-CO')} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>COP</span>
                </span>
              </>
            )}
          </div>
          <Link to={`/tour/${tour.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Ver Detalles
          </Link>
        </div>
      </div>

      <style>{`
        .tour-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: var(--shadow-xl);
        }
        .tour-card:hover .card-img {
          transform: scale(1.08);
        }
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.4);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 10;
          backdrop-filter: blur(4px);
        }
        .image-container:hover .carousel-btn {
          opacity: 1;
        }
        .carousel-btn:hover {
          background: var(--primary);
          color: #111;
        }
      `}</style>
    </div>
  );
}
