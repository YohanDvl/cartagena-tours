import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { X, Calendar, Users } from 'lucide-react';
import { addDays, differenceInDays } from 'date-fns';

export default function ApartmentBookingModal({ apartment, isOpen, onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);

  // Parse numeric capacity from a string like 'Hasta 6 Personas'
  const maxGuestsFromApartment = parseInt((apartment.duration || '').match(/\d+/)?.[0]) || null;

  useEffect(() => {
    const check = () => setIsAccepted(localStorage.getItem('cookiesAccepted') === 'true');
    check();
    const inv = setInterval(check, 1000);
    return () => clearInterval(inv);
  }, []);

  if (!isOpen) return null;

  const nights = startDate && endDate ? Math.max(1, differenceInDays(endDate, startDate)) : 1;
  const parsedGuests = guests === '' ? 1 : (parseInt(guests) || 1);
  const total = apartment.price * nights;

  const handleBooking = (e) => {
    e.preventDefault();
    if (!isAccepted) {
      window.dispatchEvent(new Event('showCookieBanner'));
      return;
    }
    
    const checkIn = startDate ? startDate.toLocaleDateString() : 'No definida';
    const checkOut = endDate ? endDate.toLocaleDateString() : 'No definida';
    const message = `Hola! Quiero reservar el apartamento: ${apartment.title}%0ADesde: ${checkIn}%0AHasta: ${checkOut}%0ANoches: ${nights}%0AHuéspedes: ${parsedGuests}%0ATotal estimado: $${total.toLocaleString('es-CO')} COP`;
    const whatsappUrl = `https://wa.me/573009446681?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const apartmentImage = (apartment.images && apartment.images[0]) || apartment.image;

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
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 0, letterSpacing: '-0.02em' }}>Solicitar Reserva</h3>
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
            <img src={apartmentImage} alt={apartment.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{apartment.title}</h4>
              <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ${apartment.price.toLocaleString('es-CO')} 
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.25rem' }}>COP / noche</span>

              </p>
            </div>
          </div>

          <form onSubmit={handleBooking}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <Calendar size={18} style={{ color: 'var(--primary)' }} />
                  Ingreso
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    if (endDate && date >= endDate) {
                      setEndDate(addDays(date, 1));
                    }
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={addDays(new Date(), 1)}
                  placeholderText="Fecha de ingreso"
                  className="input-field"
                  dateFormat="dd/MM/yyyy"
                  wrapperClassName="date-picker-wrapper"
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <Calendar size={18} style={{ color: 'var(--primary)' }} />
                  Salida
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate ? addDays(startDate, 1) : addDays(new Date(), 2)}
                  placeholderText="Fecha de salida"
                  className="input-field"
                  dateFormat="dd/MM/yyyy"
                  wrapperClassName="date-picker-wrapper"
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <Users size={18} style={{ color: 'var(--primary)' }} />
                  Huéspedes
                </label>
                <input 
                  type="number" 
                  min="1" 
                  value={guests} 
                  max={maxGuestsFromApartment || undefined}
                  onChange={(e) => {
                    if (e.target.value === '') return setGuests('');
                    const val = Math.max(1, parseInt(e.target.value) || 1);
                    if (maxGuestsFromApartment) {
                      setGuests(Math.min(val, maxGuestsFromApartment));
                    } else {
                      setGuests(val);
                    }
                  }}
                  className="input-field"
                  style={{ width: '100%' }}
                  required
                />
                {maxGuestsFromApartment && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Máximo de huéspedes: {maxGuestsFromApartment}
                  </div>
                )}
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
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Noches ({nights})</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${total.toLocaleString('es-CO')}</span>
              </div>
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
