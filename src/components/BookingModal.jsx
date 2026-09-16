import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { X, Calendar, Users } from 'lucide-react';
import { addDays } from 'date-fns';

export default function BookingModal({ tour, isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const check = () => setIsAccepted(localStorage.getItem('cookiesAccepted') === 'true');
    check();
    const inv = setInterval(check, 1000);
    return () => clearInterval(inv);
  }, []);

  if (!isOpen) return null;

  const parsedAdults = adults === '' ? 1 : (parseInt(adults) || 1);
  const parsedChildren = children === '' ? 0 : (parseInt(children) || 0);
  const total = tour.price * parsedAdults + (tour.price * 0.7) * parsedChildren; // Children get 30% discount

  const handleBooking = (e) => {
    e.preventDefault();
    if (!isAccepted) {
      window.dispatchEvent(new Event('showCookieBanner'));
      return;
    }
    
    // Simulate booking process - In reality this would go to a backend or WhatsApp
    const message = `Hola! Quiero reservar el tour: ${tour.title}%0AFecha: ${selectedDate.toLocaleDateString()}%0AAdultos: ${parsedAdults}%0ANiños: ${parsedChildren}%0ATotal estimado: $${total.toLocaleString('es-CO')} COP`;
    const whatsappUrl = `https://wa.me/573015147536?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const tourImage = (tour.images && tour.images[0]) || tour.image;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-xl)',
        width: '100%',
        maxWidth: '550px',
        maxHeight: 'min(900px, 92vh)',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ 
          padding: '1.5rem 2rem', 
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--surface)',
          zIndex: 10
        }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 0, letterSpacing: '-0.02em' }}>Reservar Tour</h3>
          <button onClick={onClose} style={{ 
            color: 'var(--text-muted)', 
            padding: '0.5rem', 
            borderRadius: '50%', 
            backgroundColor: 'var(--background)',
            transition: 'var(--transition)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            marginBottom: '2.5rem',
            backgroundColor: 'rgba(255,255,255,0.03)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)'
          }}>
            <img src={tourImage} alt={tour.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{tour.title}</h4>
              <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>
                ${tour.price.toLocaleString('es-CO')} 
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.25rem' }}>COP / adulto</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleBooking}>
            <div className="input-group" style={{ marginBottom: '2rem' }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
                <Calendar size={18} style={{ color: 'var(--primary)' }} />
                Fecha del Tour
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={addDays(new Date(), 1)}
                placeholderText="Selecciona una fecha"
                className="input-field"
                dateFormat="dd/MM/yyyy"
                wrapperClassName="date-picker-wrapper"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <Users size={18} style={{ color: 'var(--primary)' }} />
                  Adultos
                </label>
                <input 
                  type="number" 
                  min="1" 
                  value={adults} 
                  onChange={(e) => setAdults(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="input-group">
                <label className="input-label" style={{ marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>Niños (2-12 años)</label>
                <input 
                  type="number" 
                  min="0" 
                  value={children} 
                  onChange={(e) => setChildren(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value, 10)))}
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'var(--background)', 
              padding: '1.75rem', 
              borderRadius: 'var(--radius-lg)',
              marginBottom: '2.5rem',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Adultos ({parsedAdults})</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${(tour.price * parsedAdults).toLocaleString('es-CO')}</span>
              </div>
              {parsedChildren > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Niños ({parsedChildren})</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${((tour.price * 0.7) * parsedChildren).toLocaleString('es-CO')}</span>
                </div>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '1.25rem', 
                paddingTop: '1.25rem', 
                borderTop: '1px dashed var(--border)',
                fontWeight: 800,
                fontSize: '1.5rem',
                color: 'var(--primary)',
                fontFamily: 'Outfit'
              }}>
                <span style={{ color: 'var(--text-main)' }}>Total</span>
                <span>${total.toLocaleString('es-CO')} <span style={{ fontSize: '0.9rem' }}>COP</span></span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem', boxShadow: '0 10px 25px rgba(255, 191, 0, 0.3)' }}>
              Confirmar Reserva (WhatsApp)
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .date-picker-wrapper { width: 100%; }
        .date-picker-wrapper input { 
          width: 100% !important;
          background-color: var(--background) !important;
          border: 1px solid var(--border) !important;
          color: var(--text-main) !important;
          padding: 0.75rem 1rem !important;
        }
        .close-btn:hover {
          background-color: var(--primary) !important;
          color: #111 !important;
        }
      `}</style>
    </div>
  );
}
