export const defaultTours = [
  {
    id: "1",
    title: "Día de Lujo en Islas del Rosario",
    shortDescription: "Escápate a aguas cristalinas y playas de arena blanca en un tour en yate exclusivo por el archipiélago.",
    fullDescription: "Disfruta de un día inolvidable navegando por las hermosas Islas del Rosario. Nuestro yate de lujo te llevará a los rincones más exclusivos del archipiélago, donde podrás hacer snorkel en arrecifes de coral vibrantes y relajarte en un club de playa privado. Incluye almuerzo típico caribeño y cóctel de bienvenida.",
    price: 850000,
    priceChild: 450000,
    duration: "8 horas",
    rating: 4.9,
    reviews: 142,
    isBestSeller: true,
    images: [
      "/images/islas_del_rosario.png",
      "/images/islas_del_rosario_2.png",
      "/images/islas_del_rosario_3.png"
    ],
    category: "Playa & Mar",
    includes: [
      "Transporte en yate deportivo de alta gama",
      "Cóctel de bienvenida caribeño",
      "Almuerzo gourmet típico con pescado fresco y arroz con coco",
      "Careta y equipo de snorkel profesional",
      "Seguro de viaje y asistencia médica"
    ],
    notIncludes: [
      "Impuesto de muelle (Aprox. $26,500 COP)",
      "Bebidas alcohólicas adicionales en el club",
      "Propinas voluntarias"
    ],
    itinerary: [
      { time: "08:00 AM", description: "Punto de encuentro y abordaje en Muelle de la Bodeguita." },
      { time: "09:15 AM", description: "Recorrido panorámico por las 27 islas del archipiélago." },
      { time: "11:00 AM", description: "Sesión de snorkel guiado en la avioneta sumergida de Pablo Escobar." },
      { time: "01:00 PM", description: "Almuerzo VIP en Club de Playa Privado (Isla Grande)." },
      { time: "03:30 PM", description: "Pausa en Cholón para ambiente musical y relax." },
      { time: "04:30 PM", description: "Navegación de retorno hacia la bahía de Cartagena viendo el atardecer." }
    ]
  },
  {
    id: "2",
    title: "Walking Tour: Ciudad Amurallada & Getsemaní",
    shortDescription: "Descubre la magia, secretos coloniales, arquitectura militar y el vibrante arte urbano de Cartagena.",
    fullDescription: "Sumérgete en más de 400 años de historia viva. Guiado por historiadores locales certificados, recorrerás callejones coloniales, balcones floridos, iglesias ancestrales y las imponentes fortificaciones militares. Luego cruzaremos a Getsemaní para explorar el epicentro del arte callejero y la cultura afrocaribeña.",
    price: 90000,
    priceChild: 50000,
    duration: "3.5 horas",
    rating: 4.9,
    reviews: 98,
    isBestSeller: true,
    images: [
      "/images/ciudad_amurallada.png",
      "/images/ciudad_amurallada_2.png",
      "/images/ciudad_amurallada_3.png"
    ],
    category: "Cultura & Historia",
    includes: [
      "Guía profesional bilingüe e historiador certificado",
      "Degustación de café especial colombiano",
      "Cata de dulces típicos en el Portal de los Dulces",
      "Recorrido por murales de Getsemaní",
      "Fotografías digitales del tour"
    ],
    notIncludes: [
      "Entradas a museos específicos no contemplados",
      "Transporte terrestre hasta el punto de encuentro",
      "Gastos personales"
    ],
    itinerary: [
      { time: "09:00 AM / 03:00 PM", description: "Encuentro bajo la Torre del Reloj." },
      { time: "09:30 AM", description: "Visita a Plaza de la Aduana, San Pedro Claver y Plaza de Bolívar." },
      { time: "10:30 AM", description: "Caminata sobre las murallas y Baluarte de Santo Domingo." },
      { time: "11:30 AM", description: "Callejones de Getsemaní, Callejón Angosto de sombrillas y muralismo." }
    ]
  },
  {
    id: "3",
    title: "Chiva Rumbera Típica Nocturna",
    shortDescription: "La fiesta más tradicional sobre ruedas con música en vivo, animación, barra libre de licor nacional y snacks.",
    fullDescription: "La auténtica experiencia festiva caribeña. Recorre los principales barrios turísticos de Cartagena (Bocagrande, Castillo Grande, Manga y el Centro Histórico) al ritmo de vallenato, champeta y salsa con un grupo de música en vivo a bordo del bus tradicional de madera.",
    price: 75000,
    priceChild: 45000,
    duration: "3 horas",
    rating: 4.8,
    reviews: 185,
    isBestSeller: false,
    images: [
      "/images/chiva_rumbera.png",
      "/images/chiva_rumbera_2.png",
      "/images/chiva_rumbera_3.png"
    ],
    category: "Vida Nocturna",
    includes: [
      "Paseo panorámico nocturno en chiva tradicional decorada",
      "Conjunto musical folclórico en vivo y animador",
      "Barra libre de licor nacional típico y mezcladores",
      "Degustación de fritos típicos cartageneros (arepa de huevo, empanada)",
      "Entrada de cortesía a discoteca reconocida en Getsemaní"
    ],
    notIncludes: [
      "Bebidas y consumo dentro de la discoteca",
      "Transporte de regreso al hotel al finalizar la fiesta"
    ],
    itinerary: [
      { time: "07:30 PM", description: "Recogida en puntos estratégicos de Bocagrande y Laguito." },
      { time: "08:30 PM", description: "Paseo rumbero por la bahía y parada fotográfica en Los Zapatos Viejos." },
      { time: "09:30 PM", description: "Parada rumbera en el Castillo de San Felipe con baile folclórico." },
      { time: "10:30 PM", description: "Llegada al Centro Histórico y acceso a discoteca aliada." }
    ]
  },
  {
    id: "4",
    title: "Baño de Lodo Terapéutico en Volcán del Totumo",
    shortDescription: "Sumérgete en las propiedades minerales y relajantes de un cráter de lodo natural flotante.",
    fullDescription: "Una de las atracciones más curiosas y relajantes del Caribe. Sube las escaleras de madera hasta la cima de este cono volcánico de 15 metros y flota sin esfuerzo en una mezcla de minerales terapéuticos reconocidos para rejuvenecer la piel y aliviar el estrés.",
    price: 120000,
    priceChild: 80000,
    duration: "5 horas",
    rating: 4.7,
    reviews: 73,
    isBestSeller: false,
    images: [
      "/images/volcan_totumo.png",
      "/images/volcan_totumo_2.png",
      "/images/volcan_totumo_3.png"
    ],
    category: "Naturaleza & Relax",
    includes: [
      "Transporte ida y vuelta en van climatizada",
      "Ingreso al Parque Natural Volcán del Totumo",
      "Baño en el cráter de lodo mineral",
      "Lavado en la ciénaga de agua dulce",
      "Almuerzo caribeño junto a la laguna"
    ],
    notIncludes: [
      "Masaje opcional dentro del lodo ($10,000 COP aprox)",
      "Fotografías tomadas por locales",
      "Propinas a las lavadoras locales"
    ],
    itinerary: [
      { time: "08:30 AM", description: "Salida desde Cartagena rumbo a Santa Catalina." },
      { time: "10:00 AM", description: "Ascenso al volcán e inmersión en lodo terapéutico." },
      { time: "11:30 AM", description: "Baño refrescante en la ciénaga y tiempo de descanso." },
      { time: "12:30 PM", description: "Almuerzo típico frente a la ciénaga." },
      { time: "02:00 PM", description: "Regreso cómodo a Cartagena." }
    ]
  },
  {
    id: "5",
    title: "Atardecer Mágico en Catamarán por la Bahía",
    shortDescription: "Navega con copa de vino y música chill out mientras el sol caribeño se oculta tras los rascacielos.",
    fullDescription: "La experiencia romántica y visual por excelencia en Cartagena. Zarpa al atardecer a bordo de un moderno catamarán a vela con amplias mallas de descanso sobre el mar, disfrutando de vistas 360° del skyline de Bocagrande y las murallas coloniales bañadas por la luz dorada.",
    price: 150000,
    priceChild: 100000,
    duration: "2 horas",
    rating: 5.0,
    reviews: 110,
    isBestSeller: true,
    images: [
      "/images/catamaran.png",
      "/images/cartagena_generic_1.png",
      "/images/cartagena_generic_2.png"
    ],
    category: "Playa & Mar",
    includes: [
      "Navegación de 2 horas en catamarán de vela de doble casco",
      "Cóctel de bienvenida o copa de vino espumoso",
      "Snacks gourmet finger food",
      "Música ambiental lounge & DJ en vivo",
      "Atención de tripulación y capitán calificado"
    ],
    notIncludes: [
      "Tasa portuaria ($15,000 COP aprox)",
      "Bebidas premium a la carta"
    ],
    itinerary: [
      { time: "04:30 PM", description: "Abordaje en Muelle de la Marina de Santa Cruz (Manga)." },
      { time: "05:00 PM", description: "Zarpe hacia la Bahía de las Ánimas y canal de Bocagrande." },
      { time: "06:00 PM", description: "Puesta de sol en mar abierto con brindis musical." },
      { time: "07:00 PM", description: "Regreso al muelle con la vista nocturna iluminada." }
    ]
  },
  {
    id: "6",
    title: "San Basilio de Palenque: Primer Pueblo Libre de América",
    shortDescription: "Vive la cuna de la libertad afrodescendiente, patrimonio cultural e inmaterial de la humanidad UNESCO.",
    fullDescription: "Un viaje conmovedor a la raíz de la resistencia y dignidad afroamericana. Palenque preserva su propia lengua palenquera, medicina tradicional con plantas curativas, música de tambores y gastronomía comunitaria.",
    price: 250000,
    priceChild: 150000,
    duration: "6 horas",
    rating: 4.9,
    reviews: 64,
    isBestSeller: false,
    images: [
      "/images/palenque.png",
      "/images/palenque_2.png",
      "/images/palenque_3.png"
    ],
    category: "Cultura & Historia",
    includes: [
      "Transporte privado ida y vuelta desde Cartagena",
      "Guía nativo palenquero certificado por UNESCO",
      "Taller interactivo de percusión y baile de tambores",
      "Visita a la casa de la medicina tradicional",
      "Almuerzo comunitario típico servido en hoja de plátano",
      "Degustación de dulces palenqueros tradicionales"
    ],
    notIncludes: [
      "Souvenirs y artesanías locales",
      "Bebidas alcohólicas adicionales"
    ],
    itinerary: [
      { time: "08:00 AM", description: "Recogida y viaje por la sabana de Bolívar." },
      { time: "09:30 AM", description: "Bienvenida en la estatua de Benkos Biohó y recorrido histórico." },
      { time: "11:00 AM", description: "Taller musical con maestros cimarrones." },
      { time: "01:00 PM", description: "Almuerzo tradicional preparado por las palenqueras." },
      { time: "02:30 PM", description: "Retorno a la ciudad de Cartagena." }
    ]
  },
  {
    id: "7",
    title: "Aviario Nacional de Colombia",
    shortDescription: "Conoce el aviario más grande de Sudamérica con más de 170 especies de aves en hábitats naturales.",
    fullDescription: "Ubicado en la Península de Barú, este santuario ecológico de 7 hectáreas alberga cóndores de los Andes, flamencos rosados, águilas arpías, tucanes y pericos en tres ecosistemas recreados al detalle: selva húmeda tropical, zona de costas y desierto.",
    price: 180000,
    priceChild: 110000,
    duration: "5 horas",
    rating: 4.8,
    reviews: 87,
    isBestSeller: false,
    images: [
      "/images/aviario.png",
      "/images/aviario_2.png",
      "/images/aviario_3.png"
    ],
    category: "Naturaleza & Relax",
    includes: [
      "Transporte terrestre en van con aire acondicionado",
      "Boleto oficial de ingreso al Aviario Nacional",
      "Show didáctico de vuelo de aves entrenadas",
      "Hidratación durante el recorrido ecológico",
      "Guía orientador del parque"
    ],
    notIncludes: [
      "Almuerzo (disponible en el restaurante del aviario)",
      "Propinas"
    ],
    itinerary: [
      { time: "08:30 AM", description: "Recogida en hotel y traslado a Barú." },
      { time: "09:45 AM", description: "Ingreso al aviario e inicio de los senderos ecológicos." },
      { time: "11:30 AM", description: "Espectáculo educativo 'Vuelo de Aves'." },
      { time: "01:00 PM", description: "Tiempo libre para fotos y refrigerio." },
      { time: "02:00 PM", description: "Regreso a Cartagena." }
    ]
  },
  {
    id: "8",
    title: "City Tour Histórico: Castillo San Felipe & Convento La Popa",
    shortDescription: "La mayor fortaleza militar española en América y el mirador más alto de la bahía de Cartagena.",
    fullDescription: "Recorre los túneles subterráneos, rampas de cañones y murallas defensivas del imponente Castillo San Felipe de Barajas, diseñado para resistir invasiones piratas. Luego ascenderemos al Convento de la Popa a 150 metros de altura para la panorámica más sobrecogedora de toda Cartagena.",
    price: 130000,
    priceChild: 85000,
    duration: "4 horas",
    rating: 4.9,
    reviews: 131,
    isBestSeller: true,
    images: [
      "/images/castillo.png",
      "/images/castillo_2.png",
      "/images/castillo_3.png"
    ],
    category: "Cultura & Historia",
    includes: [
      "Transporte turístico climatizado",
      "Boletos de entrada a Castillo San Felipe y Convento La Popa",
      "Guía oficial de turismo historiador",
      "Parada fotográfica en Monumento a los Zapatos Viejos e India Catalina",
      "Seguro contra accidentes"
    ],
    notIncludes: [
      "Gastos personales y souvenirs",
      "Alimentación no descrita"
    ],
    itinerary: [
      { time: "02:00 PM", description: "Recogida y ascenso al cerro de La Popa." },
      { time: "03:15 PM", description: "Visita guiada por los túneles y baluartes del Castillo San Felipe." },
      { time: "05:00 PM", description: "Paseo fotográfico por monumentos insignes." },
      { time: "06:00 PM", description: "Retorno al alojamiento." }
    ]
  },
  {
    id: "9",
    title: "Ecoturismo en Túneles de Manglares de La Boquilla",
    shortDescription: "Navega en canoa ancestral de pescadores a través de túneles naturales de manglar y avistamiento de aves.",
    fullDescription: "Un contacto directo con las tradiciones de la comunidad pesquera de La Boquilla. Nos adentraremos en canoas ecológicas de madera guiadas con pértiga por laberintos de manglares donde habitan garzas, martines pescadores y cangrejos azules, aprendiendo técnicas ancestrales de pesca con atarraya.",
    price: 110000,
    priceChild: 70000,
    duration: "3.5 horas",
    rating: 4.8,
    reviews: 59,
    isBestSeller: false,
    images: [
      "/images/manglares.png",
      "/images/manglares_2.png",
      "/images/cartagena_generic_1.png"
    ],
    category: "Naturaleza & Relax",
    includes: [
      "Transporte terrestre hasta el corregimiento de La Boquilla",
      "Paseo guiado en canoa artesanal de madera con remero nativo",
      "Paso por los Túneles del Amor, de la Felicidad y de la Chidi",
      "Demostración interactiva de pesca tradicional",
      "Coco frío de bienvenida y degustación caribeña"
    ],
    notIncludes: [
      "Propinas voluntarias a los pescadores",
      "Souvenirs artesanales de coco"
    ],
    itinerary: [
      { time: "08:30 AM", description: "Salida hacia La Boquilla." },
      { time: "09:00 AM", description: "Embarque en canoa artesanal e ingreso a la Ciénaga de la Virgen." },
      { time: "10:30 AM", description: "Cruce por túneles verdes de manglares y fotos de aves." },
      { time: "11:30 AM", description: "Regreso a la playa y refresco de coco natural." },
      { time: "12:00 PM", description: "Retorno a la zona hotelera de Cartagena." }
    ]
  }
];

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
      "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?auto=format&fit=crop&q=80&w=1000",
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
      "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?auto=format&fit=crop&q=80&w=1000"
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
