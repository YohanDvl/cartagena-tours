import { MapPin, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrl';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--surface)', color: 'var(--text-main)', paddingTop: '4rem', paddingBottom: '2.5rem', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <img 
              src={getImageUrl('/images/favicon-square.svg')} 
              alt="YouTours Logo" 
              style={{ height: '48px', width: '48px', objectFit: 'contain' }} 
            />
            <span className="notranslate" translate="no" style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
              YOUTOURS
            </span>
          </div>
          <p style={{ color: 'var(--text-main)', marginBottom: '1.2rem', fontWeight: 600, fontStyle: 'italic', fontSize: '0.95rem' }}>
            "DESCANSA SEGURO, EXPLORA SIN LÍMITES."
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Tours marítimos, paseos en bote privado, excursiones culturales y reservas de apartamentos turísticos en Cartagena de Indias, Colombia.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://www.instagram.com/youtours" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Instagram Oficial
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', color: 'var(--text-main)' }}>Enlaces Rápidos</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-muted)' }} className="hover-primary">Inicio</Link></li>
            <li><a href="#tours" style={{ color: 'var(--text-muted)' }} className="hover-primary">Nuestros Tours & Botes</a></li>
            <li><a href="#apartments" style={{ color: 'var(--text-muted)' }} className="hover-primary">Apartamentos Turísticos</a></li>
            <li><a href="#about" style={{ color: 'var(--text-muted)' }} className="hover-primary">Sobre YouTours</a></li>
            <li>
              <Link to="/admin" style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }} className="hover-primary">
                <Shield size={16} /> Panel de Administración
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', color: 'var(--text-main)' }}>Información Legal</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/terminos-y-condiciones" style={{ color: 'var(--text-muted)' }} className="hover-primary">Términos y Condiciones</Link></li>
            <li><Link to="/politica-de-privacidad" style={{ color: 'var(--text-muted)' }} className="hover-primary">Política de Privacidad y Cookies</Link></li>
            <li><span style={{ color: 'var(--text-muted)' }}>Registro Nacional de Turismo (RNT)</span></li>
            <li><span style={{ color: 'var(--text-muted)' }}>Pólizas de Asistencia al Viajero</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', color: 'var(--text-main)' }}>Atención al Cliente</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <MapPin size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>Centro Histórico & Bocagrande, Cartagena de Indias, Colombia</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Phone size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <a href="https://wa.me/573009446681" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', fontWeight: 700 }}>
                +57 300 944 6681
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} <strong>YouTours Cartagena</strong>. Todos los derechos reservados.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.85 }}>
          Desarrollado con Arquitectura Web Moderna por <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Yohan Alexander Maldonado Santana</span> - Ingeniero de Software
        </p>
      </div>

      <style>{`
        .hover-primary:hover { color: var(--primary) !important; }
      `}</style>
    </footer>
  );
}
