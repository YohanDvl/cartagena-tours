import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldQuestion, CheckCircle2 } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login', 'recover-user', 'recover-answer', 'recover-reset', 'recover-success'
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Recovery State
  const [recoverUser, setRecoverUser] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('admin_token', data.token);
          onLogin(true);
          navigate('/admin');
        } else {
          setError(data.message || 'Error al iniciar sesión');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Error de conexión con el servidor');
      });
  };

  const handleRecoverUser = (e) => {
    e.preventDefault();
    setError('');
    fetch(`/api/admin/recover/${recoverUser}`)
      .then(res => res.json())
      .then(data => {
        if (data.question) {
          setSecurityQuestion(data.question);
          setMode('recover-answer');
        } else {
          setError(data.error || 'Usuario no encontrado o no tiene pregunta configurada');
        }
      })
      .catch(err => setError('Error de conexión'));
  };

  const handleRecoverAnswer = (e) => {
    e.preventDefault();
    setError('');
    fetch('/api/admin/recover/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: recoverUser, answer: securityAnswer })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('admin_token', data.token);
          setMode('recover-reset');
        } else {
          setError(data.message || 'Respuesta incorrecta');
        }
      })
      .catch(err => setError('Error de conexión'));
  };

  const handleRecoverReset = (e) => {
    e.preventDefault();
    setError('');
    fetch('/api/admin/recover/reset', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify({ newPassword })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMode('recover-success');
        } else {
          setError(data.error || 'Error al restablecer contraseña');
        }
      })
      .catch(err => setError('Error de conexión'));
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--background)', padding: '100px 2rem 4rem' }}>
      <div style={{ backgroundColor: 'var(--surface)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '400px' }}>
        
        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>
              <Lock size={48} />
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-main)' }}>Acceso Administrativo</h2>
            
            {error && <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Usuario</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Contraseña</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}>
              Iniciar Sesión
            </button>
            <div style={{ textAlign: 'center' }}>
              <button type="button" onClick={() => { setMode('recover-user'); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        )}

        {mode === 'recover-user' && (
          <form onSubmit={handleRecoverUser}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>
              <ShieldQuestion size={48} />
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-main)' }}>Recuperar Contraseña</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>Ingresa tu usuario para buscar tu pregunta de seguridad.</p>
            
            {error && <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Usuario</label>
              <input 
                type="text" 
                value={recoverUser} 
                onChange={(e) => setRecoverUser(e.target.value)} 
                required
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}>
              Continuar
            </button>
            <div style={{ textAlign: 'center' }}>
              <button type="button" onClick={() => { setMode('login'); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}>
                Volver al inicio de sesión
              </button>
            </div>
          </form>
        )}

        {mode === 'recover-answer' && (
          <form onSubmit={handleRecoverAnswer}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>
              <ShieldQuestion size={48} />
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-main)' }}>Pregunta de Seguridad</h2>
            
            {error && <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

            <div style={{ marginBottom: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem', textAlign: 'center' }}>{securityQuestion}</p>
              <input 
                type="password" 
                placeholder="Tu respuesta secreta"
                value={securityAnswer} 
                onChange={(e) => setSecurityAnswer(e.target.value)} 
                required
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}>
              Verificar Respuesta
            </button>
            <div style={{ textAlign: 'center' }}>
              <button type="button" onClick={() => { setMode('login'); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}>
                Cancelar
              </button>
            </div>
          </form>
        )}

        {mode === 'recover-reset' && (
          <form onSubmit={handleRecoverReset}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>
              <Lock size={48} />
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-main)' }}>Nueva Contraseña</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>Crea tu nueva contraseña de acceso.</p>
            
            {error && <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nueva Contraseña</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required
                style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)' }} 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
              Guardar Contraseña
            </button>
          </form>
        )}

        {mode === 'recover-success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: '#22c55e' }}>
              <CheckCircle2 size={48} />
            </div>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>¡Contraseña Actualizada!</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Tu contraseña se ha restablecido correctamente. Ya puedes iniciar sesión.</p>
            <button 
              onClick={() => { setMode('login'); setPassword(''); }} 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem' }}
            >
              Ir a Iniciar Sesión
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
