// Datos verificados en sushiber.com el 18/10/2026. No añadir nada que no esté confirmado
// por el restaurante: horario, precios de sala y validez del bono siguen pendientes.

export const BRAND = 'Sushiber';

export const LINKS = {
  reservar: 'https://sushiber.com/reservar-mesa',
  bono: 'https://sushiber.com/bono-regalo-sushiber',
  carta: 'https://sushiber.com/sushi-a-domicilio',
  whatsapp: 'https://wa.me/34647617878',
  instagram: 'https://www.instagram.com/sushiberdenia/',
  facebook: 'https://www.facebook.com/sushiber/',
  tripadvisor:
    'https://www.tripadvisor.es/Restaurant_Review-g609043-d13797595-Reviews-Sushiber-Denia_Costa_Blanca_Province_of_Alicante_Valencian_Country.html',
  // Búsqueda por dirección: no hay una ficha de Maps verificada en la web oficial.
  maps: 'https://www.google.com/maps/search/?api=1&query=Sushiber%2C%20Av.%20Juan%20Chab%C3%A1s%2C%203%2C%2003700%20D%C3%A9nia',
};

export const CONTACT = {
  street: 'Av. Juan Chabás, 3',
  postalCode: '03700',
  city: 'Dénia',
  region: 'Alicante',
  phoneDisplay: '647 617 878',
  phoneHref: 'tel:+34647617878',
  email: 'info@sushiber.com',
  // Grupos de más de 8 personas: la web indica reservar por teléfono.
  groupThreshold: 8,
};

export const LEGAL = [
  { label: 'Aviso legal', href: 'https://sushiber.com/aviso-legal' },
  { label: 'Condiciones generales', href: 'https://sushiber.com/condiciones-generales' },
  { label: 'Política de privacidad', href: 'https://sushiber.com/politica-de-privacidad' },
  { label: 'Condiciones de compra', href: 'https://sushiber.com/condiciones-de-compra' },
  { label: 'Política de cookies', href: 'https://sushiber.com/politica-de-cookies' },
];

// Importes publicados en la página del bono regalo.
export const BONO_IMPORTES = [50, 75, 100, 125, 150, 175, 200];

// Platos de la carta online. Pendiente: confirmar disponibilidad en la carta de sala.
// No se muestran precios: los publicados corresponden al servicio de pedidos.
export const PLATOS = [
  {
    name: 'Acevichado roll',
    description: 'Uramaki de langostino en tempura y aguacate, cubierto de atún marinado en leche de tigre.',
  },
  {
    name: 'Anticuchero',
    description: 'Uramaki de langostino en tempura y aguacate, cubierto de pescado blanco del día soasado con salsa peruana.',
  },
  {
    name: 'Crispy tacos de atún',
    description: 'Tacos crujientes con tartar de atún picante y guacamole.',
  },
  {
    name: 'Japan in Perú',
    description: 'Uramaki de langostino en tempura y aguacate, con salmón soasado en crema de ají amarillo.',
  },
  {
    name: 'Sushiber salmón',
    description: 'Hosomaki de aguacate con tartar de salmón y salsa teriyaki. El roll de la casa desde nuestros inicios.',
  },
  {
    name: 'Mochi de cheesecake',
    description: 'Bola de helado cubierta de gelatina de arroz.',
  },
];

export const FAQ = [
  {
    q: '¿Cómo reservo mesa?',
    a: 'Desde nuestra página de reservas en sushiber.com: elige día y hora en el sistema de reservas.',
  },
  {
    q: `¿Y si somos más de ${CONTACT.groupThreshold} personas?`,
    a: `Para grupos de más de ${CONTACT.groupThreshold} personas, reserva por teléfono en el ${CONTACT.phoneDisplay}.`,
  },
  {
    q: '¿Puedo consultar una duda antes de reservar?',
    a: `Sí. Escríbenos por WhatsApp o llámanos al ${CONTACT.phoneDisplay}.`,
  },
  {
    q: '¿Qué tipo de cocina hacéis?',
    a: 'Cocina japonesa fusión: partimos de la tradición japonesa y la cruzamos con sabores mediterráneos y peruanos.',
  },
  {
    q: '¿Tenéis opciones sin pescado crudo o para alergias?',
    a: 'Consúltanos antes de tu visita por teléfono o WhatsApp y te informamos.',
  },
  {
    q: '¿Puedo pedir para llevar o a domicilio?',
    a: 'Ahora mismo los pedidos online no están disponibles. Puedes consultar la carta en nuestra web.',
  },
  {
    q: '¿Cómo funciona el bono regalo?',
    a: 'Eliges el importe, entre 50 € y 200 €, y a quién se lo envías, con una dedicatoria opcional. Para canjearlo, se reserva mesa por teléfono.',
  },
  {
    q: '¿Dónde estáis?',
    a: `En ${CONTACT.street}, ${CONTACT.postalCode} ${CONTACT.city} (${CONTACT.region}).`,
  },
];
