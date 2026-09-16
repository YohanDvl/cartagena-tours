import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isAccepted, setIsAccepted] = useState(false);
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
      // Background change on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section detection
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
    // Initial check
    handleScroll();

    // Check for cookie acceptance
    const checkAcceptance = () => {
      setIsAccepted(localStorage.getItem('cookiesAccepted') === 'true');
    };
    checkAcceptance();
    const interval = setInterval(checkAcceptance, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
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
        backgroundColor: isScrolled ? 'rgba(241, 239, 234, 0.95)' : 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderBottom: isScrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        padding: '0.8rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0rem', color: isScrolled ? 'var(--text-main)' : 'white' }}>
          <img src="/images/favicon-square.svg" alt="Youtours Logo" style={{ height: '55px', width: '55px', minWidth: '55px', objectFit: 'contain', filter: isScrolled ? 'none' : 'drop-shadow(0 0 4px rgba(0,0,0,0.4))' }} />
          <span className="notranslate" translate="no" style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.02em', marginTop: '4px', marginLeft: '5px' }}>
            YOUTOURS
          </span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'none', gap: '1rem', alignItems: 'center' }} className="desktop-menu">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}
            style={{ 
              color: activeSection === 'inicio' ? '#111' : (isScrolled ? 'var(--text-main)' : 'white'),
              backgroundColor: activeSection === 'inicio' ? 'var(--primary)' : 'transparent'
            }}
          >
            Inicio
          </Link>
          <a 
            href="/#tours" 
            onClick={(e) => handleNavClick(e, 'tours')}
            className={`nav-link ${activeSection === 'tours' ? 'active' : ''}`}
            style={{ 
              color: activeSection === 'tours' ? '#111' : (isScrolled ? 'var(--text-main)' : 'white'),
              backgroundColor: activeSection === 'tours' ? 'var(--primary)' : 'transparent'
            }}
          >
            Tours
          </a>
          <a 
            href="/#apartments" 
            onClick={(e) => handleNavClick(e, 'apartments')}
            className={`nav-link ${activeSection === 'apartments' ? 'active' : ''}`}
            style={{ 
              color: activeSection === 'apartments' ? '#111' : (isScrolled ? 'var(--text-main)' : 'white'),
              backgroundColor: activeSection === 'apartments' ? 'var(--primary)' : 'transparent'
            }}
          >
            Apartamentos
          </a>
          <a 
            href="/#about" 
            onClick={(e) => handleNavClick(e, 'about')}
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            style={{ 
              color: activeSection === 'about' ? '#111' : (isScrolled ? 'var(--text-main)' : 'white'),
              backgroundColor: activeSection === 'about' ? 'var(--primary)' : 'transparent'
            }}
          >
            Nosotros
          </a>
          {isAccepted && (
            <a 
              href="https://wa.me/573009446681?text=Hola! Quiero más información sobre sus tours." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary" 
              style={{ padding: '0.5rem 1.25rem', marginLeft: '1rem' }}
            >
              Contacto
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn"
          style={{ display: 'block', color: isScrolled ? 'var(--text-main)' : 'white' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          backgroundColor: 'var(--surface)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-md)',
          borderTop: '1px solid var(--border)'
        }}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Inicio</Link>
          <a href="/#tours" onClick={(e) => handleNavClick(e, 'tours')} style={{ padding: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Tours</a>
          <a href="/#apartments" onClick={(e) => handleNavClick(e, 'apartments')} style={{ padding: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Apartamentos</a>
          <a href="/#about" onClick={(e) => handleNavClick(e, 'about')} style={{ padding: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Nosotros</a>
          {isAccepted && (
            <a 
              href="https://wa.me/573009446681?text=Hola! Quiero más información sobre sus tours." 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ padding: '0.5rem', fontWeight: 500, color: 'var(--primary)' }}
            >
              Contacto (WhatsApp)
            </a>
          )}
        </div>
      )}

      <style>{`
        .nav-link {
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: var(--transition);
          font-size: 0.95rem;
        }
        .nav-link:not(.active):hover {
          color: var(--primary) !important;
        }
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
