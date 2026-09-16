import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '2rem', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={20} />
          Volver al Inicio
        </Link>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'white' }}>Política de Privacidad</h1>
        
        <div style={{ lineHeight: 1.8, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Protección de Datos</h2>
            <p>En Youtours, la privacidad de nuestros clientes es una prioridad. En cumplimiento con la Ley 1581 de 2012 (Habeas Data) en Colombia, le informamos que los datos recolectados a través de nuestro sitio web y WhatsApp son tratados de manera confidencial y segura.</p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>2. ¿Qué información recolectamos?</h2>
            <p>Solo solicitamos la información necesaria para gestionar su reserva, la cual incluye:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Nombre y Apellido</li>
              <li>Número de contacto (WhatsApp)</li>
              <li>Correo electrónico (opcional)</li>
              <li>Información sobre el tour de su interés</li>
            </ul>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>3. Uso de la Información</h2>
            <p>Su información se utiliza exclusivamente para:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Confirmar y coordinar los detalles de sus tours.</li>
              <li>Enviar recordatorios sobre la hora de recogida.</li>
              <li>Atender sus dudas y solicitudes de soporte.</li>
              <li>Enviar información sobre promociones especiales (solo si usted lo autoriza).</li>
            </ul>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>4. No compartimos sus datos</h2>
            <p>Youtours no vende, alquila ni comparte su información personal con terceras empresas para fines comerciales o de marketing ajenos a la prestación de nuestros servicios.</p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Sus Derechos</h2>
            <p>Usted tiene derecho a conocer, actualizar y rectificar sus datos personales en cualquier momento enviando un mensaje a nuestro WhatsApp oficial o correo electrónico.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
