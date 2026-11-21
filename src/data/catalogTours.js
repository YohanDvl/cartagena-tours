// Tours reales del catálogo de YouTours (nombres y precios del catálogo de WhatsApp).
// Las fotos son provisionales: cámbialas por las de cada plan desde /admin.
// "Qué incluye" está por completar desde el panel con la información de cada club.

const PLAYA_1 = '/images/downloads/IMG_6186.JPG.jpeg';
const PLAYA_2 = '/images/downloads/IMG_1934.JPG.jpeg';
const ISLAS_1 = '/images/islas_del_rosario.png';
const ISLAS_2 = '/images/islas_del_rosario_2.png';
const ISLAS_3 = '/images/islas_del_rosario_3.png';

const pasadia = ({ id, title, price, short, full, images, includes = [], extraKeywords = '' }) => ({
  id,
  title,
  shortDescription: short,
  fullDescription:
    full ||
    `${short} Un plan ideal para desconectarte del ruido de la ciudad y disfrutar del mar Caribe cerca de Cartagena de Indias. ` +
      `Reserva directamente con YouTours por WhatsApp: te confirmamos disponibilidad, punto de encuentro y todo lo que incluye tu día. ${extraKeywords}`.trim(),
  price,
  priceChild: 0,
  duration: 'Día completo',
  rating: 5,
  reviews: 0,
  isBestSeller: false,
  images,
  category: 'Playa & Mar',
  includes,
  notIncludes: [],
  itinerary: [],
});

export const catalogTours = [
  {
    id: 'city-tour-cartagena',
    title: 'City Tour Cartagena con Recogida en el Hotel',
    shortDescription:
      'Recorre lo mejor de Cartagena de Indias en chiva típica: Castillo de San Felipe, los Zapatos Viejos y la Ciudad Amurallada, con recogida en tu hotel.',
    fullDescription:
      'Conoce los lugares más emblemáticos de Cartagena de Indias en un recorrido guiado a bordo de la tradicional chiva colorida. ' +
      'Pasamos por el Castillo de San Felipe de Barajas, el monumento a los Zapatos Viejos y el Centro Histórico amurallado, con paradas para tomar fotos. ' +
      'Te recogemos en tu hotel para que solo te preocupes por disfrutar. Reserva por WhatsApp y te confirmamos el horario.',
    price: 100000,
    priceChild: 0,
    duration: 'Medio día',
    rating: 5,
    reviews: 0,
    isBestSeller: true,
    images: ['/images/downloads/IMG_6923.JPG.jpeg', '/images/castillo.png', '/images/ciudad_amurallada.png'],
    category: 'Cultura & Historia',
    includes: ['Recogida en el hotel', 'Recorrido en chiva típica'],
    notIncludes: [],
    itinerary: [],
  },
  pasadia({
    id: 'luxury-ambiente-vip',
    title: 'Luxury Ambiente VIP – Pasadía Open Bar',
    price: 480000,
    short: 'Pasadía con open bar y ambiente VIP en un exclusivo club de playa cerca de Cartagena.',
    images: [PLAYA_1, ISLAS_1, PLAYA_2],
    includes: ['Open bar'],
  }),
  pasadia({
    id: 'luxury-open-bar-ambiente-beach',
    title: 'Luxury Open Bar Ambiente Beach',
    price: 430000,
    short: 'Día de playa con open bar, música y aguas cristalinas en un club de playa de lujo.',
    images: [PLAYA_2, ISLAS_2, PLAYA_1],
    includes: ['Open bar'],
  }),
  pasadia({
    id: 'pao-pao-beach-club',
    title: 'Pao Pao Beach Club',
    price: 390000,
    short: 'Pasadía en Pao Pao: piscina, playa, gastronomía y relax frente al mar Caribe.',
    images: [ISLAS_3, PLAYA_1, ISLAS_1],
  }),
  pasadia({
    id: 'bora-bora-area-club',
    title: 'Bora Bora Beach Club – Área Club',
    price: 450000,
    short: 'Vive el ambiente de Bora Bora Beach Club en su Área Club, uno de los pasadías más populares de Cartagena.',
    images: [PLAYA_1, ISLAS_2, PLAYA_2],
  }),
  pasadia({
    id: 'bora-bora-vip',
    title: 'Bora Bora Beach Club – VIP',
    price: 490000,
    short: 'La experiencia VIP de Bora Bora Beach Club: zona exclusiva, más comodidad y el mejor ambiente de playa.',
    images: [PLAYA_2, ISLAS_1, PLAYA_1],
  }),
  pasadia({
    id: 'coco-loco-oceanario',
    title: 'Coco Loco + Oceanario – Islas del Rosario',
    price: 350000,
    short: 'Día de descanso y diversión en las Islas del Rosario: playa en Coco Loco y visita al Oceanario.',
    images: [ISLAS_1, ISLAS_2, ISLAS_3],
    extraKeywords: 'Perfecto para ir en familia y con niños.',
  }),
  pasadia({
    id: 'mantas-beach-vip',
    title: 'Mantas Beach VIP',
    price: 440000,
    short: 'Pasadía VIP en Mantas Beach: arena blanca, mar turquesa y servicio exclusivo.',
    images: [PLAYA_2, PLAYA_1, ISLAS_3],
  }),
  pasadia({
    id: 'capri-premium-day-pass',
    title: 'Capri Premium Day Pass',
    price: 550000,
    short: 'El day pass premium de Capri: una experiencia de playa de alto nivel para disfrutar el Caribe con estilo.',
    images: [ISLAS_2, PLAYA_1, ISLAS_1],
  }),
  pasadia({
    id: 'ibizza-beach-club',
    title: 'Ibizza Beach Club',
    price: 380000,
    short: 'Prepárate para vivir un pasadía lleno de cultura, música y playa en Ibizza Beach Club.',
    images: [PLAYA_1, ISLAS_3, PLAYA_2],
  }),
  pasadia({
    id: 'sabai-beach-venue',
    title: 'Sabai Beach Venue – Sabai Marítimo',
    price: 480000,
    short: 'Pasadía en Sabai Beach: diseño, piscina y playa en uno de los clubes más elegantes cerca de Cartagena.',
    images: [ISLAS_3, PLAYA_2, ISLAS_1],
  }),
  pasadia({
    id: 'rosario-beach-playa',
    title: 'Rosario Beach Playa',
    price: 360000,
    short: 'Pasadía de playa en Rosario Beach, en el archipiélago de las Islas del Rosario.',
    images: [ISLAS_1, PLAYA_1, ISLAS_2],
  }),
  pasadia({
    id: 'rosario-del-mar-plan-arrecife',
    title: 'Rosario del Mar – Plan Arrecife',
    price: 410000,
    short: 'Plan Arrecife en Rosario del Mar: playa, mar cristalino y descanso en las Islas del Rosario.',
    images: [ISLAS_2, ISLAS_3, PLAYA_1],
  }),
  pasadia({
    id: 'full-day-mapaches-islas-del-rosario',
    title: 'Full Day Mapaches – Islas del Rosario',
    price: 315000,
    short: 'Full day por las Islas del Rosario con visita a la isla de los mapaches. Ideal para familias.',
    images: [ISLAS_3, ISLAS_1, PLAYA_2],
  }),
  pasadia({
    id: 'palmeritto-beach',
    title: 'Palmeritto Beach',
    price: 230000,
    short: 'Pasadía económico en Palmeritto Beach: playa, palmeras y relax a pocos minutos de Cartagena.',
    images: [PLAYA_2, PLAYA_1, ISLAS_2],
  }),
];
