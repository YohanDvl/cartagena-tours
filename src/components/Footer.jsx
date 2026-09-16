import { Palmtree, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--surface)', color: 'var(--text-main)', paddingTop: '4rem', paddingBottom: '2rem', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0rem', marginBottom: '1.5rem' }}>
            <img src="/images/favicon-square.svg" alt="Youtours Icon" style={{ height: '65px', width: '65px', minWidth: '65px', objectFit: 'contain' }} />
            <span className="notranslate" translate="no" style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.02em', color: 'var(--text-main)', marginTop: '4px', marginLeft: '8px' }}>
              YOUTOURS
            </span>
          </div>
          <p style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 600, fontStyle: 'italic' }}>
            "DESCANSA SEGURO, EXPLORA SIN LÍMITES."
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://www.instagram.com/youtours?igsh=MXd2N3k0NWRodnUxMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} className="hover-primary">Instagram</a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Enlaces Rápidos</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-muted)' }} className="hover-primary">Inicio</Link></li>
            <li><a href="#tours" style={{ color: 'var(--text-muted)' }} className="hover-primary">Nuestros Tours</a></li>
            <li><a href="#about" style={{ color: 'var(--text-muted)' }} className="hover-primary">Sobre Nosotros</a></li>
            <li><Link to="/terminos-y-condiciones" style={{ color: 'var(--text-muted)' }} className="hover-primary">Términos y Condiciones</Link></li>
            <li><Link to="/politica-de-privacidad" style={{ color: 'var(--text-muted)' }} className="hover-primary">Política de Privacidad</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Contacto</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <MapPin size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>Cartagena, Bolívar</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Phone size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span>+57 300 944 6681</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} <span className="notranslate" translate="no">Youtours</span>. Todos los derechos reservados.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
          Creado por <span className="notranslate" translate="no" style={{ color: 'var(--primary)', fontWeight: 600 }}>Yohan Alexander Maldonado Santana</span>
        </p>
      </div>

      <style>{`
        .hover-primary:hover { color: var(--primary) !important; }
      `}</style>
    </footer>
  );
}
