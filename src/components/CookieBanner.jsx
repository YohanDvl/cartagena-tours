import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Show automatically if not accepted yet
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // 2. ALWAYS listen for the custom event to show banner again
    const showBanner = () => {
      setIsVisible(true);
      // Give it a little "look at me" effect
      const banner = document.querySelector('.cookie-banner-box');
      if (banner) {
        banner.classList.add('shake-animation');
        setTimeout(() => banner.classList.remove('shake-animation'), 500);
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
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      left: '1rem',
      right: '1rem',
      maxWidth: '500px',
      backgroundColor: 'rgba(25, 25, 25, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      margin: '0 auto',
    }} className="animate-fade-in cookie-banner-box">
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '1.5rem' }}>🍪</div>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: 'white', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Aviso de Cookies y Privacidad</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
            Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra <Link to="/politica-de-privacidad" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Política de Privacidad</Link>.
          </p>
          <p style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, fontStyle: 'italic' }}>
            ⚠️ Es obligatorio aceptar para habilitar el contacto por WhatsApp y reservas.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => setIsVisible(false)}
          style={{ 
            backgroundColor: 'transparent', 
            color: 'var(--text-muted)', 
            border: '1px solid var(--border)', 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Rechazar
        </button>
        <button 
          onClick={acceptCookies}
          className="btn btn-primary" 
          style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
        >
          Aceptar y habilitar contacto
        </button>
      </div>
      <style>{`
        @media (max-width: 600px) {
          div {
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 20px 20px 0 0 !important;
          }
        }
        .shake-animation {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          transform: translate3d(0, 0, 0);
          border: 2px solid var(--primary) !important;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
