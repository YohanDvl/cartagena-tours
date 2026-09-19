import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const showBanner = () => {
      setIsVisible(true);
      const banner = document.querySelector('.cookie-banner-box');
      if (banner) {
        banner.classList.add('shake-mini');
        setTimeout(() => banner.classList.remove('shake-mini'), 400);
      }
    };
    
    window.addEventListener('showCookieBanner', showBanner);
    return () => window.removeEventListener('showCookieBanner', showBanner);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      role="dialog" 
      aria-label="Aviso de cookies"
      className="cookie-banner-box"
      style={{
        position: 'fixed',
        bottom: '12px',
        left: '12px',
        right: '12px',
        maxWidth: '480px',
        margin: '0 auto',
        backgroundColor: 'rgba(20, 24, 30, 0.96)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '14px',
        padding: '0.65rem 0.9rem',
        zIndex: 10000,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>🍪</span>
        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.78rem', lineHeight: 1.3 }}>
          Usamos cookies para tu experiencia. Ver{' '}
          <Link to="/politica-de-privacidad" style={{ color: '#f97316', textDecoration: 'underline' }}>
            Privacidad
          </Link>.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
        <button 
          onClick={() => setIsVisible(false)}
          type="button"
          style={{ 
            background: 'transparent', 
            color: 'rgba(255, 255, 255, 0.6)', 
            border: 'none',
            padding: '0.35rem 0.6rem', 
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          Cerrar
        </button>
        <button 
          onClick={acceptCookies}
          type="button"
          style={{ 
            backgroundColor: '#f97316', 
            color: '#ffffff', 
            border: 'none',
            padding: '0.4rem 0.85rem', 
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(249, 115, 22, 0.35)'
          }}
        >
          Aceptar
        </button>
      </div>

      <style>{`
        .cookie-banner-box {
          animation: slideUpCookie 0.3s ease-out;
        }
        @keyframes slideUpCookie {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .shake-mini {
          animation: shakeMini 0.4s ease;
          border-color: #f97316 !important;
        }
        @keyframes shakeMini {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </aside>
  );
}
