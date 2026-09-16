import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { getImageUrl } from '../utils/imageUrl';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${targetId}`);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (location.pathname === '/') {
        const sections = ['inicio', 'tours', 'apartments', 'about'];
        const scrollPosition = window.scrollY + 100;
        for (const section of sections) {
          const element = document.getElementById(section === 'inicio' ? 'home' : section);
          if (element) {
            const offsetTop = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
              setActiveSection(section);
            }
          }
        }
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <nav 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        transition: 'var(--transition)',
        backgroundColor: isScrolled ? 'rgba(241, 239, 234, 0.95)' : 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : '0 4px 30px rgba(0, 0, 0, 0.15)',
        borderBottom: isScrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
        padding: '0.8rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isScrolled ? 'var(--text-main)' : 'white' }}>
          <img 
            src={getImageUrl('/images/favicon-square.svg')} 
            alt="YouTours Logo" 
            style={{ height: '48px', width: '48px', objectFit: 'contain', filter: isScrolled ? 'none' : 'drop-shadow(0 0 6px rgba(0,0,0,0.5))' }} 
          />
          <span className="notranslate" translate="no" style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.02em', color: isScrolled ? 'var(--text-main)' : '#ffffff' }}>
            YOUTOURS
          </span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="nav-desktop">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            style={{ 
              color: isScrolled ? (activeSection === 'inicio' ? 'var(--primary)' : 'var(--text-main)') : (activeSection === 'inicio' ? 'var(--primary)' : 'white'),
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            Inicio
          </a>
          <a 
            href="#tours" 
            onClick={(e) => handleNavClick(e, 'tours')}
            style={{ 
              color: isScrolled ? (activeSection === 'tours' ? 'var(--primary)' : 'var(--text-main)') : (activeSection === 'tours' ? 'var(--primary)' : 'white'),
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            Tours & Botes
          </a>
          <a 
            href="#apartments" 
            onClick={(e) => handleNavClick(e, 'apartments')}
            style={{ 
              color: isScrolled ? (activeSection === 'apartments' ? 'var(--primary)' : 'var(--text-main)') : (activeSection === 'apartments' ? 'var(--primary)' : 'white'),
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            Apartamentos
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, 'about')}
            style={{ 
              color: isScrolled ? (activeSection === 'about' ? 'var(--primary)' : 'var(--text-main)') : (activeSection === 'about' ? 'var(--primary)' : 'white'),
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            Nosotros
          </a>

          <Link 
            to="/admin" 
            className="btn"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: isScrolled ? 'var(--surface)' : 'rgba(255,255,255,0.15)',
              color: isScrolled ? 'var(--text-main)' : '#fff',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <Shield size={15} color="var(--primary)" />
            Panel Admin
          </Link>

          <a 
            href="https://wa.me/573009446681?text=Hola!%20Quiero%20informaci%C3%B3n%20sobre%20los%20tours%20en%20Cartagena"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
          >
            Reservar por WhatsApp
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ display: 'flex', background: 'none', border: 'none', color: isScrolled ? 'var(--text-main)' : 'white', cursor: 'pointer' }}
          className="nav-mobile-toggle"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          borderTop: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}>Inicio</a>
          <a href="#tours" onClick={(e) => handleNavClick(e, 'tours')} style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}>Tours & Botes</a>
          <a href="#apartments" onClick={(e) => handleNavClick(e, 'apartments')} style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}>Apartamentos</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}>Nosotros</a>
          <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={18} /> Panel de Administración
          </Link>
          <a 
            href="https://wa.me/573009446681" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ textAlign: 'center', padding: '0.8rem' }}
          >
            Escribir por WhatsApp
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 850px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
