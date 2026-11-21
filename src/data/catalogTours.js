// Tours reales del catálogo de YouTours (nombres y precios del catálogo de WhatsApp).
// Fotos: reales de YouTours mientras subes las oficiales de cada club desde /admin.
// "Qué incluye" está por completar desde el panel con la información de cada club.

// Fotos reales propias (public/images/downloads) y algunas generales del proyecto.
// Cada tour tiene una portada distinta (la primera imagen).
const R = (n) => `/images/downloads/IMG_${n}`;
const IMG = {
  p1934: R("1934.JPG.jpeg"),
  p1934b: "/images/opt/downloads/IMG_1934_playa.webp",
  p1935: R("1935.JPG.jpeg"),
  p1936: R("1936.JPG.jpeg"),
  p1937: R("1937.JPG.jpeg"),
  p1938: R("1938.JPG.jpeg"),
  p5687: R("5687.JPG.jpeg"),
  p6186: R("6186.JPG.jpeg"),
  p6187: R("6187.JPG.jpeg"),
  islas1: "/images/islas_del_rosario.png",
  islas2: "/images/islas_del_rosario_2.png",
  islas3: "/images/islas_del_rosario_3.png",
  catamaran: "/images/catamaran.png",
  atardecer: "/images/cartagena_generic_1.png",
};

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
    images: [R('6923.JPG.jpeg'), R('5008.PNG'), R('5010.PNG'), R('5011.PNG'), R('4956.JPG.jpeg')],
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
    images: [IMG.p6186, IMG.p1935],
    includes: ['Open bar'],
  }),
  pasadia({
    id: 'luxury-open-bar-ambiente-beach',
    title: 'Luxury Open Bar Ambiente Beach',
    price: 430000,
    short: 'Día de playa con open bar, música y aguas cristalinas en un club de playa de lujo.',
    images: [IMG.p1936, IMG.p6187],
    includes: ['Open bar'],
  }),
  pasadia({
    id: 'pao-pao-beach-club',
    title: 'Pao Pao Beach Club',
    price: 390000,
    short: 'Pasadía en Pao Pao: piscina, playa, gastronomía y relax frente al mar Caribe.',
    images: [IMG.p1937, IMG.p1936],
  }),
  pasadia({
    id: 'bora-bora-area-club',
    title: 'Bora Bora Beach Club – Área Club',
    price: 450000,
    short: 'Vive el ambiente de Bora Bora Beach Club en su Área Club, uno de los pasadías más populares de Cartagena.',
    images: [IMG.p1935, IMG.p5687],
  }),
  pasadia({
    id: 'bora-bora-vip',
    title: 'Bora Bora Beach Club – VIP',
    price: 490000,
    short: 'La experiencia VIP de Bora Bora Beach Club: zona exclusiva, más comodidad y el mejor ambiente de playa.',
    images: [IMG.p6187, IMG.p6186],
  }),
  pasadia({
    id: 'coco-loco-oceanario',
    title: 'Coco Loco + Oceanario – Islas del Rosario',
    price: 350000,
    short: 'Día de descanso y diversión en las Islas del Rosario: playa en Coco Loco y visita al Oceanario.',
    images: [IMG.islas2, IMG.islas3],
    extraKeywords: 'Perfecto para ir en familia y con niños.',
  }),
  pasadia({
    id: 'mantas-beach-vip',
    title: 'Mantas Beach VIP',
    price: 440000,
    short: 'Pasadía VIP en Mantas Beach: arena blanca, mar turquesa y servicio exclusivo.',
    images: [IMG.p5687, IMG.p1934],
  }),
  pasadia({
    id: 'capri-premium-day-pass',
    title: 'Capri Premium Day Pass',
    price: 550000,
    short: 'El day pass premium de Capri: una experiencia de playa de alto nivel para disfrutar el Caribe con estilo.',
    images: [IMG.islas1, IMG.p1938],
  }),
  pasadia({
    id: 'ibizza-beach-club',
    title: 'Ibizza Beach Club',
    price: 380000,
    short: 'Prepárate para vivir un pasadía lleno de cultura, música y playa en Ibizza Beach Club.',
    images: [IMG.p1934, IMG.p1937],
  }),
  pasadia({
    id: 'sabai-beach-venue',
    title: 'Sabai Beach Venue – Sabai Marítimo',
    price: 480000,
    short: 'Pasadía en Sabai Beach: diseño, piscina y playa en uno de los clubes más elegantes cerca de Cartagena.',
    images: [IMG.catamaran, IMG.p6186],
  }),
  pasadia({
    id: 'rosario-beach-playa',
    title: 'Rosario Beach Playa',
    price: 360000,
    short: 'Pasadía de playa en Rosario Beach, en el archipiélago de las Islas del Rosario.',
    images: [IMG.atardecer, IMG.islas2],
  }),
  pasadia({
    id: 'rosario-del-mar-plan-arrecife',
    title: 'Rosario del Mar – Plan Arrecife',
    price: 410000,
    short: 'Plan Arrecife en Rosario del Mar: playa, mar cristalino y descanso en las Islas del Rosario.',
    images: [IMG.islas3, IMG.islas1],
  }),
  pasadia({
    id: 'full-day-mapaches-islas-del-rosario',
    title: 'Full Day Mapaches – Islas del Rosario',
    price: 315000,
    short: 'Full day por las Islas del Rosario con visita a la isla de los mapaches. Ideal para familias.',
    images: [IMG.p1934b, IMG.islas2],
  }),
  pasadia({
    id: 'palmeritto-beach',
    title: 'Palmeritto Beach',
    price: 230000,
    short: 'Pasadía económico en Palmeritto Beach: playa, palmeras y relax a pocos minutos de Cartagena.',
    images: [IMG.p1938, IMG.p1935],
  }),
];
