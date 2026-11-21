import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TourDetails from './pages/TourDetails';
import ApartmentDetails from './pages/ApartmentDetails';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminTourForm = lazy(() => import('./pages/AdminTourForm'));
const AdminApartmentForm = lazy(() => import('./pages/AdminApartmentForm'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';
import Seo from './components/Seo';
import { store } from './data/store';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('admin_token'));
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    store.logout();
    setIsAuthenticated(false);
  };

  // Si el servidor rechaza la sesión (expirada), volvemos al login.
  useEffect(() => {
    const onExpired = () => setIsAuthenticated(false);
    window.addEventListener('admin-logout', onExpired);
    return () => window.removeEventListener('admin-logout', onExpired);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isAdminRoute && <Seo title="Panel administrativo" path={location.pathname} noindex />}
      {!isAdminRoute && <Navbar />}
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Cargando…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/apartamento/:id" element={<ApartmentDetails />} />
          <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin onLogin={setIsAuthenticated} />} />
          <Route path="/admin" element={isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/tours/:id" element={isAuthenticated ? <AdminTourForm /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/apartments/:id" element={isAuthenticated ? <AdminApartmentForm /> : <Navigate to="/admin/login" />} />
        </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
      <CookieBanner />
    </div>
  );
}

export default App;
