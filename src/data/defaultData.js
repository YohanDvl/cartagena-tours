import { catalogTours } from './catalogTours.js';

export const defaultTours = catalogTours;

export const defaultApartments = [
  {
    id: "1",
    title: "Apartamento de Lujo con Vista Panorámica al Mar",
    shortDescription: "Espectacular apartamento de 3 habitaciones frente a las playas de Bocagrande con balcón infinito y amenidades 5 estrellas.",
    fullDescription: "Disfruta de amaneceres y atardeceres mágicos sobre el Mar Caribe desde el balcón de este lujoso apartamento en el piso 24. Completamente remodelado con acabados italianos, cocina integral tipo isla, aire acondicionado inverter en todas las áreas, WiFi 300 Mbps simétrico, piscinas infinitas climatizadas, gimnasio de última generación y acceso directo a la playa.",
    price: 450000,
    priceChild: 0,
    duration: "Hasta 6 Huéspedes",
    rating: 4.9,
    reviews: 46,
    isBestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000"
    ],
    category: "Lujo & Playa",
    includes: [
      "3 Habitaciones con camas King y Queen ergonómicas",
      "Balcón con juego de sala exterior y vista al mar",
      "WiFi de fibra óptica 300 Mbps y Smart TV 65'' 4K",
      "Piscinas infinitas para adultos y niños",
      "Gimnasio panorámico y sauna",
      "Seguridad privada 24/7 y parqueadero cubierto"
    ],
    notIncludes: [
      "Manilla de registro del edificio ($30,000 COP por persona, pago único)",
      "Servicio de limpieza diario adicional (opcional bajo solicitud)",
      "Alimentación"
    ],
    itinerary: [
      { time: "Check-in", description: "A partir de las 03:00 PM con cerradura inteligente." },
      { time: "Check-out", description: "Hasta las 11:00 AM." },
      { time: "Convivencia", description: "Edificio familiar y exclusivo. No se permiten eventos o fiestas estridentes." },
      { time: "Capacidad", description: "Máximo 6 personas registradas." }
    ]
  },
  {
    id: "2",
    title: "Loft Colonial Romántico en Centro Histórico",
    shortDescription: "Acogedor loft con techos altos de madera y paredes de calicanto en el corazón de la Ciudad Amurallada.",
    fullDescription: "Ubicado en el epicentro colonial de Cartagena a pocos pasos de la Plaza de Santo Domingo y San Pedro Claver. Este exclusivo loft rescata la arquitectura del siglo XVIII fusionada con el confort contemporáneo: tina de hidromasaje, aire acondicionado, balcón colonial hacia calles empedradas y cocina equipada.",
    price: 320000,
    priceChild: 0,
    duration: "2 a 3 Huéspedes",
    rating: 5.0,
    reviews: 62,
    isBestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000"
    ],
    category: "Romántico & Colonial",
    includes: [
      "Cama King Size con lencería de algodón egipcio",
      "Tina de hidromasaje privada en el dormitorio",
      "Balcón colonial tradicional con vista a la calle histórica",
      "Aire acondicionado ultrasilencioso y agua caliente",
      "Cocina de concepto abierto con cafetera Nespresso y vajilla",
      "Caja de seguridad electrónica"
    ],
    notIncludes: [
      "Parqueadero propio (parqueaderos públicos a 150m)",
      "Desayuno"
    ],
    itinerary: [
      { time: "Check-in", description: "Desde las 03:00 PM con anfitrión personal." },
      { time: "Check-out", description: "Hasta las 12:00 PM." },
      { time: "Tranquilidad", description: "Zona residencial colonial silenciosa para descanso reparador." }
    ]
  },
  {
    id: "3",
    title: "Penthouse Exclusivo Morros con Jacuzzi & Playa Privada",
    shortDescription: "Penthouse de 4 habitaciones en Zona Norte con terraza privada, jacuzzi exterior y salida directa a la playa.",
    fullDescription: "La propiedad cumbre para familias y grupos selectos. Ubicado en los exclusivos condominios de Morros en la Zona Norte de Cartagena. Cuenta con terraza de 80 m² con jacuzzi climatizado propio, BBQ a gas, vista despejada al mar y acceso directo a playas tranquilas sin vendedores ambulantes.",
    price: 850000,
    priceChild: 0,
    duration: "Hasta 8 Huéspedes",
    rating: 4.9,
    reviews: 38,
    isBestSeller: false,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
    ],
    category: "Familiar & Playa",
    includes: [
      "4 Habitaciones completas con baño privado cada una",
      "Jacuzzi privado en la terraza superior con vista al mar",
      "Zona BBQ a gas y comedor exterior al aire libre",
      "Complejo con 3 piscinas, turco, sauna y canchas",
      "Salida directa a la playa privada del condominio",
      "2 Parqueaderos cubiertos y vigilancia 24 horas"
    ],
    notIncludes: [
      "Costo de registro de administración en el condominio",
      "Consumo de carbón o insumos de BBQ"
    ],
    itinerary: [
      { time: "Check-in", description: "03:00 PM con conserjería 24 horas." },
      { time: "Check-out", description: "11:00 AM." },
      { time: "Normas", description: "Mascotas pequeñas permitidas previa solicitud. No música alta en terraza tras las 10 PM." }
    ]
  }
];
