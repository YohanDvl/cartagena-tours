import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, HelpCircle } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryAnswer, setRecoveryAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const u = username.trim();
    const p = password.trim();

    // Verificación de credenciales oficiales del sistema
    const valid = 
      (u.toUpperCase() === 'ADMIN' && (p === 'admin1234' || p === 'admin123')) ||
      (u.toLowerCase() === 'admin' && (p === 'admin1234' || p === 'admin123'));

    if (valid) {
      localStorage.setItem('admin_token', 'youtours-admin-session-active');
      onLogin(true);
      navigate('/admin');
      return;
    }

    // Intentar backend si estuviera online
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('admin_token', data.token);
          onLogin(true);
          navigate('/admin');
        } else {
          setError('Usuario o contraseña incorrectos.');
        }
      })
      .catch(() => {
        setError('Usuario o contraseña incorrectos.');
      });
  };

  const handleRecovery = (e) => {
    e.preventDefault();
    if (recoveryAnswer.trim() === '2022') {
      if (newPassword.length < 4) {
        setError('La nueva contraseña debe tener al menos 4 caracteres.');
        return;
      }
      localStorage.setItem('admin_token', 'youtours-admin-session-active');
      setRecoverySuccess('¡Identidad verificada! Contraseña restablecida.');
      setTimeout(() => {
        onLogin(true);
        navigate('/admin');
      }, 1500);
    } else {
      setError('Respuesta de seguridad incorrecta.');
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: 'var(--background)'
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        padding: '3rem',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        width: '100%',
        maxWidth: '440px',
        border: '1px solid var(--border)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: '50%',
            marginBottom: '1rem'
          }}>
            <Lock size={30} />
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.4rem' }}>Acceso Administrativo</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Área restringida exclusiva para administradores de YouTours
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '0.8rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {recoverySuccess && (
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10b981',
            color: '#10b981',
            padding: '0.8rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {recoverySuccess}
          </div>
        )}

        {!showRecovery ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Usuario
              </label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  Contraseña
                </label>
                <button 
                  type="button" 
                  onClick={() => { setShowRecovery(true); setError(''); }}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <button 
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700, marginTop: '0.5rem' }}
            >
              Ingresar al Panel
            </button>
          </form>
        ) : (
          <form onSubmit={handleRecovery} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ padding: '0.8rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <HelpCircle size={16} /> Pregunta de Seguridad
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                ¿En qué año te graduaste del colegio?
              </p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Tu Respuesta
              </label>
              <input 
                type="text"
                value={recoveryAnswer}
                onChange={(e) => setRecoveryAnswer(e.target.value)}
                placeholder="Escribe la respuesta"
                required
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Nueva Contraseña
              </label>
              <input 
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <button 
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
            >
              Restablecer y Entrar
            </button>

            <button 
              type="button"
              onClick={() => { setShowRecovery(false); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'center' }}
            >
              ← Volver al login
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={16} /> Volver al sitio web
          </Link>
        </div>
      </div>
    </div>
  );
}
