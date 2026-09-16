import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TourDetails from './pages/TourDetails';
import ApartmentDetails from './pages/ApartmentDetails';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminDashboard from './pages/AdminDashboard';
import AdminTourForm from './pages/AdminTourForm';
import AdminApartmentForm from './pages/AdminApartmentForm';
import AdminLogin from './pages/AdminLogin';
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('admin_token'));
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
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
      </main>
      <Footer />
      {!isAdminRoute && <WhatsAppButton />}
      <CookieBanner />
    </div>
  );
}

export default App;
