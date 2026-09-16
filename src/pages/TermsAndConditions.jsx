import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function TermsAndConditions() {
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
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'white' }}>Términos y Condiciones</h1>
        
        <div style={{ lineHeight: 1.8, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Introducción</h2>
            <p>Bienvenido a Youtours. Al utilizar nuestro sitio web y reservar nuestros servicios, usted acepta cumplir con los siguientes términos y condiciones. Estos términos rigen la relación entre usted (el cliente) y Youtours en relación con los servicios turísticos ofrecidos.</p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>2. Reservas y Pagos</h2>
            <p>Las reservas se inician a través de nuestro sitio web y se finalizan de manera directa vía WhatsApp. Los precios mostrados son informativos y pueden variar según la temporada. El pago final se acordará directamente con el asesor al momento de la reserva.</p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>3. Política de Cancelación</h2>
            <p>Entendemos que los planes pueden cambiar. Nuestra política estándar permite:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Cancelación gratuita hasta 24 horas antes del inicio del tour.</li>
              <li>Cancelaciones con menos de 24 horas o "No Show" no tendrán derecho a reembolso (en caso de pagos anticipados).</li>
              <li>En caso de mal clima o cierre de muelle por autoridades locales, se ofrecerá reprogramación o reembolso total.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Responsabilidad</h2>
            <p>Youtours actúa como intermediario y operador directo. No nos hacemos responsables por accidentes derivados de la negligencia del pasajero o por pérdida de objetos personales durante los tours. Se recomienda a todos los clientes contar con su propio seguro de viaje, aunque cada tour incluye un seguro básico de asistencia médica.</p>
          </section>

          <section>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Modificaciones</h2>
            <p>Nos reservamos el derecho de modificar el itinerario de los tours por razones logísticas, condiciones climáticas o seguridad, siempre buscando la mejor experiencia para el cliente.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
