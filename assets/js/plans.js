/* ============================================================
   ARIX DIGITAL SYSTEMS — plans.js
   FUENTE ÚNICA DE VERDAD para precios y datos comerciales.
   ------------------------------------------------------------
   Para actualizar precios/servicios, edita SOLO este archivo.
   Nada de esto se envía a un servidor: es 100% frontend estático.
   ============================================================ */

/* ---------- Formato de moneda COP ---------- */
function formatCOP(n){
  if (typeof n !== "number") return n; // p.ej. "Cotización personalizada"
  return "$" + n.toLocaleString("es-CO") + " COP";
}

/* ---------- EXTRAS (valores orientativos centralizados) ----------
   cat  = categoría (para agrupar el checklist)
   icon = emoji ilustrativo
   desc = descripción corta que ve el usuario
------------------------------------------------------------------- */
const EXTRAS = {
  seccion:        { name: "Sección adicional",       price: 120000,               cat: "func",    icon: "🧩", desc: "Una sección más en tu sitio" },
  formulario:     { name: "Formulario avanzado",     price: 180000,               cat: "func",    icon: "📋", desc: "Campos, validación y lógica" },
  reservas:       { name: "Módulo de reservas",      price: 400000, from: true,    cat: "func",    icon: "📅", desc: "Agenda de citas o servicios" },
  panel:          { name: "Panel administrativo",    price: 700000, from: true,    cat: "func",    icon: "🖥️", desc: "Gestiona tu contenido tú mismo" },
  integracion:    { name: "Integración especial",    price: 250000, from: true,    cat: "func",    icon: "🔌", desc: "Conecta con otras herramientas" },
  automatizacion: { name: "Automatización sencilla", price: 300000, from: true,    cat: "func",    icon: "⚡", desc: "Ahorra tareas repetitivas" },

  productos:      { name: "Productos adicionales",   price: 8000, perUnit: true,   cat: "ventas",  icon: "🛍️", desc: "Carga de productos por unidad", note: "desde $8.000 por producto" },
  pagos:          { name: "Integración de pagos",    price: 350000, from: true,    cat: "ventas",  icon: "💳", desc: "Cobra en línea con pasarelas" },

  blog:           { name: "Blog básico",             price: 250000,               cat: "market",  icon: "📝", desc: "Publica artículos y novedades" },
  seo:            { name: "SEO adicional",           price: 300000,               cat: "market",  icon: "🔍", desc: "Mejora tu posicionamiento" },
  analytics:      { name: "Configuración Analytics", price: 150000,               cat: "market",  icon: "📊", desc: "Mide tus visitas y resultados" },
  contenido:      { name: "Paquete de contenido",    price: 300000, from: true,    cat: "market",  icon: "🎬", desc: "Piezas para redes y web" },
  branding:       { name: "Branding básico",         price: 400000,               cat: "market",  icon: "🎨", desc: "Identidad visual esencial" },

  whatsapp:       { name: "Integración WhatsApp",    price: 40000,                cat: "soporte", icon: "💬", desc: "Botón y chat directo" },
  mantenimiento:  { name: "Mantenimiento (Care)",    price: 220000, perMonth: true,cat: "soporte", icon: "🛠️", desc: "Soporte y cambios mensuales" }
};

/* Orden y nombre de las categorías del checklist */
const EXTRA_CATEGORIES = [
  { key: "func",    label: "Funcionalidad",         icon: "⚙️" },
  { key: "ventas",  label: "Ventas y pagos",        icon: "🛒" },
  { key: "market",  label: "Contenido y marketing", icon: "📣" },
  { key: "soporte", label: "Comunicación y soporte",icon: "💬" }
];

/* ---------- PLANES (precios de lanzamiento sostenibles) ----------
   Estructura:  PLANS[service].plans[level] = { ... }
   'price' numérico = precio fijo | string = "Desde $..." o "Personalizada"
------------------------------------------------------------------- */
const PLANS = {

  /* ===== PÁGINAS WEB ===== */
  web: {
    label: "Páginas Web", tag: "WEB", icon: "web",
    intro: "Sitios modernos, rápidos y adaptados a todos los dispositivos.",
    forWho: "Emprendedores, profesionales y negocios que necesitan presencia digital profesional.",
    plans: {
      start: {
        name: "Web Start", price: 650000, time: "Aprox. 1 a 2 semanas",
        desc: "Tu presencia digital esencial, lista para empezar hoy.",
        includes: ["Página basada en plantilla","Hasta 4 secciones","Diseño responsive","Botón de WhatsApp","Enlaces a redes sociales","Formulario de contacto","Google Maps","SEO básico","Configuración básica","1 ronda de ajustes"],
        benefits: ["Presencia profesional rápida","Contacto directo por WhatsApp","Optimizado para móvil"]
      },
      pro: {
        name: "Web Pro", price: 1200000, badge: "Más elegido", time: "Aprox. 2 a 3 semanas",
        desc: "Diseño avanzado con más secciones, animaciones y analítica.",
        includes: ["Hasta 7 secciones","Diseño avanzado","Personalización de plantilla","Animaciones","Formularios","Galería","Testimonios","Mapas","Redes sociales","WhatsApp","SEO inicial","Analytics","Optimización móvil","2 rondas de ajustes"],
        benefits: ["Imagen premium y confiable","Mejor posicionamiento inicial","Métricas para tomar decisiones"]
      },
      custom: {
        name: "Web Custom", price: "Desde $2.000.000 COP", time: "Según alcance",
        desc: "Diseño totalmente personalizado, hecho desde cero para tu marca.",
        includes: ["Diseño UX/UI personalizado","Estructura desde cero","Animaciones a medida","Funcionalidades especiales","Integraciones","Formularios avanzados","Adaptación total a la marca"],
        benefits: ["Experiencia única de marca","Escalable a futuro","Sin límites de plantilla"]
      }
    }
  },

  /* ===== TIENDAS VIRTUALES ===== */
  store: {
    label: "Tiendas Virtuales", tag: "E-COMMERCE", icon: "store",
    intro: "Vende en línea con carrito, categorías, pagos compatibles y pedidos.",
    forWho: "Comercios y marcas que quieren vender productos por internet.",
    plans: {
      start: {
        name: "Store Start", price: 1200000, time: "Aprox. 2 a 3 semanas",
        desc: "Tu tienda en línea lista con lo esencial para vender.",
        includes: ["Tienda basada en plantilla","Hasta 20 productos iniciales","Categorías","Carrito","WhatsApp","Información de envíos","Adaptación móvil","Configuración visual","Enlaces sociales"],
        benefits: ["Empieza a vender rápido","Gestión sencilla","Contacto directo con clientes"]
      },
      pro: {
        name: "Store Pro", price: 2200000, badge: "Más elegido", time: "Aprox. 3 a 5 semanas",
        desc: "Tienda profesional con filtros, promociones y gestión de pedidos.",
        includes: ["Hasta 50 productos iniciales","Carrito","Categorías","Filtros","Buscador","Promociones","Gestión de pedidos","Clientes","Configuración de pagos compatible","Adaptación móvil","Analítica"],
        benefits: ["Experiencia de compra completa","Más conversión de ventas","Control de pedidos y clientes"]
      },
      custom: {
        name: "Store Custom", price: "Desde $3.500.000 COP", time: "Según alcance",
        desc: "E-commerce a medida con flujos e integraciones especiales.",
        includes: ["Diseño personalizado","Flujo de compra a medida","Inventario avanzado","Clientes y pedidos","Múltiples métodos de entrega","Integraciones especiales"],
        benefits: ["Tienda a la medida del negocio","Escalable y potente","Integraciones avanzadas"]
      }
    }
  },

  /* ===== CATÁLOGOS ===== */
  catalog: {
    label: "Catálogos Digitales", tag: "CATALOG", icon: "catalog",
    intro: "Muestra tus productos o servicios de forma elegante con contacto directo.",
    forWho: "Negocios que quieren mostrar su oferta sin carrito de compra.",
    plans: {
      start: {
        name: "Catalog Start", price: 500000, time: "Aprox. 1 semana",
        desc: "Catálogo digital simple con contacto por WhatsApp.",
        includes: ["Catálogo digital","Hasta 20 productos o servicios","Imágenes","Descripción","Precio","Botón de WhatsApp","Diseño responsive"],
        benefits: ["Muestra tu oferta al instante","Contacto directo","Fácil de compartir"]
      },
      pro: {
        name: "Catalog Pro", price: 850000, badge: "Más elegido", time: "Aprox. 1 a 2 semanas",
        desc: "Catálogo avanzado con categorías, buscador y filtros.",
        includes: ["Hasta 50 productos","Categorías","Buscador","Filtros","Promociones","Contacto","WhatsApp","Diseño avanzado"],
        benefits: ["Navegación cómoda","Más productos organizados","Imagen profesional"]
      },
      custom: {
        name: "Catalog Custom", price: "Desde $1.300.000 COP", time: "Según alcance",
        desc: "Catálogo a medida con diseño y funciones personalizadas.",
        includes: ["Diseño y funciones a medida","Estructura según tu negocio","Integraciones opcionales"],
        benefits: ["Adaptado a tu marca","Escalable","Funciones especiales"]
      }
    }
  },

  /* ===== PEDIDOS ===== */
  orders: {
    label: "Sistema de Pedidos", tag: "ORDERS", icon: "orders",
    intro: "Ideal para restaurantes, reposterías, tiendas y negocios de comida.",
    forWho: "Negocios que reciben pedidos y quieren organizarlos.",
    plans: {
      start: {
        name: "Orders Start", price: 900000, time: "Aprox. 2 semanas",
        desc: "Pedido conectado a WhatsApp, simple y efectivo.",
        includes: ["Catálogo","Selección de productos","Resumen del pedido","Datos del cliente","Envío del pedido a WhatsApp","Diseño responsive"],
        benefits: ["Recibe pedidos ordenados","Sin llamadas confusas","Rápido de usar"]
      },
      pro: {
        name: "Orders Pro", price: 1700000, badge: "Más elegido", time: "Aprox. 3 a 4 semanas",
        desc: "Gestión visual de pedidos con estados y estadísticas.",
        includes: ["Pedidos con estados","Clientes","Administración básica","Productos y categorías","Promociones","Información de domicilio","Estadísticas básicas"],
        benefits: ["Control total de pedidos","Seguimiento de estados","Datos para crecer"]
      },
      custom: {
        name: "Orders Custom", price: "Desde $2.800.000 COP", time: "Según alcance",
        desc: "Sistema de pedidos completo y personalizado.",
        includes: ["Flujos a medida","Integraciones","Módulos especiales según negocio"],
        benefits: ["Adaptado a tu operación","Escalable","Integraciones avanzadas"]
      }
    }
  },

  /* ===== DOMICILIOS ===== */
  delivery: {
    label: "Domicilios", tag: "DELIVERY", icon: "delivery",
    intro: "Gestiona el ciclo completo de una entrega de forma clara y visual.",
    forWho: "Negocios con entregas a domicilio que quieren seguimiento de estados.",
    plans: {
      start: {
        name: "Delivery Start", price: "Desde $900.000 COP", time: "Aprox. 2 a 3 semanas",
        desc: "Gestión básica de domicilios con estados del pedido.",
        includes: ["Gestión básica de domicilios","Estados del pedido","Datos de entrega"],
        benefits: ["Orden en las entregas","Estados claros","Fácil de operar"]
      },
      pro: {
        name: "Delivery Pro", price: "Desde $1.700.000 COP", badge: "Más elegido", time: "Aprox. 3 a 5 semanas",
        desc: "Flujo completo de entregas con panel de administración.",
        includes: ["Flujo completo de entregas","Asignación y seguimiento de estado","Panel de administración"],
        benefits: ["Control del proceso completo","Seguimiento de estados","Mejor experiencia del cliente"]
      },
      custom: {
        name: "Delivery Custom", price: "Desde $3.000.000 COP", time: "Según complejidad",
        desc: "Funciones avanzadas a medida (según complejidad).",
        includes: ["Funciones avanzadas a medida","Integraciones especiales","Cotización según complejidad"],
        benefits: ["Solución a tu medida","Escalable","Integraciones avanzadas"]
      }
    }
  },

  /* ===== RESERVAS ===== */
  booking: {
    label: "Reservas y Citas", tag: "BOOKING", icon: "booking",
    intro: "Ideal para peluquerías, barberías, spas, consultorios y profesionales.",
    forWho: "Negocios de servicios que agendan citas.",
    plans: {
      start: {
        name: "Booking Start", price: 800000, time: "Aprox. 2 semanas",
        desc: "Reserva simple: servicio, fecha, hora y confirmación.",
        includes: ["Selección del servicio","Fecha y hora","Información del cliente","Confirmación"],
        benefits: ["Menos citas perdidas","Agenda ordenada","Fácil para el cliente"]
      },
      pro: {
        name: "Booking Pro", price: 1400000, badge: "Más elegido", time: "Aprox. 3 a 4 semanas",
        desc: "Calendario con varios servicios, profesionales y disponibilidad.",
        includes: ["Calendario","Diferentes servicios y profesionales","Disponibilidad","Reservas","Administración","Notificaciones básicas"],
        benefits: ["Gestión completa de agenda","Varios profesionales","Menos trabajo manual"]
      },
      custom: {
        name: "Booking Custom", price: "Desde $2.300.000 COP", time: "Según alcance",
        desc: "Sistema de reservas a medida con integraciones.",
        includes: ["Sistema a medida","Integraciones","Reglas de disponibilidad avanzadas"],
        benefits: ["Adaptado a tu servicio","Escalable","Integraciones avanzadas"]
      }
    }
  },

  /* ===== CRM ===== */
  crm: {
    label: "CRM", tag: "CRM", icon: "crm",
    intro: "Organiza clientes desde el primer contacto hasta la recompra.",
    forWho: "Negocios que quieren gestionar clientes y ventas de forma ordenada.",
    plans: {
      start: {
        name: "CRM Start", price: "Desde $1.400.000 COP", time: "Aprox. 3 a 4 semanas",
        desc: "Gestión de clientes esencial con etapas de venta.",
        includes: ["Gestión de clientes","Etapas de venta básicas","Seguimiento simple"],
        benefits: ["Clientes organizados","Seguimiento de ventas","Nada se pierde"]
      },
      pro: {
        name: "CRM Pro", price: "Desde $2.500.000 COP", badge: "Recomendado", time: "Aprox. 4 a 6 semanas",
        desc: "Embudo completo de ventas con historial y reportes.",
        includes: ["Embudo completo de ventas","Historial y reportes","Usuarios y seguimiento"],
        benefits: ["Más ventas cerradas","Visión clara del negocio","Trabajo en equipo"]
      },
      custom: {
        name: "CRM Custom", price: "Desde $4.200.000 COP", time: "Según alcance",
        desc: "CRM a medida con automatizaciones e integraciones.",
        includes: ["CRM a medida","Integraciones avanzadas","Automatizaciones incluidas"],
        benefits: ["Adaptado a tu proceso","Automatizado","Escalable"]
      }
    }
  },

  /* ===== SISTEMAS EMPRESARIALES ===== */
  business: {
    label: "Sistemas Empresariales", tag: "SYSTEMS", icon: "systems",
    intro: "CRM, inventario, cotizaciones, reportes, usuarios y paneles a medida.",
    forWho: "Empresas que necesitan digitalizar y organizar su operación.",
    plans: {
      start: {
        name: "Business Start", price: "Desde $1.500.000 COP", time: "Aprox. 4 semanas",
        desc: "Sistema administrativo básico con lo esencial.",
        includes: ["Sistema administrativo básico","Gestión de datos esencial","Panel simple"],
        benefits: ["Operación ordenada","Base para crecer","Menos hojas de cálculo"]
      },
      pro: {
        name: "Business Pro", price: "Desde $2.600.000 COP", badge: "Recomendado", time: "Aprox. 5 a 8 semanas",
        desc: "Sistema empresarial con varios módulos y usuarios.",
        includes: ["Varios módulos","Usuarios y roles","Reportes y seguimiento"],
        benefits: ["Gestión integral","Control por roles","Decisiones con datos"]
      },
      custom: {
        name: "Business Custom", price: "Desde $4.500.000 COP", time: "Según requerimientos",
        desc: "Desarrollo personalizado según tus requerimientos.",
        includes: ["Módulos a medida","Integraciones avanzadas","Desarrollo personalizado"],
        benefits: ["Sistema propio","Totalmente adaptado","Escalable a futuro"]
      }
    }
  },

  /* ===== AUTOMATIZACIONES ===== */
  automation: {
    label: "Automatizaciones", tag: "AUTOMATION", icon: "automation",
    intro: "Conecta tus procesos para ahorrar tiempo y no perder oportunidades.",
    forWho: "Negocios que repiten tareas manuales y quieren optimizarlas.",
    plans: {
      start: {
        name: "Automation Start", price: "Desde $450.000 COP", time: "Aprox. 1 semana",
        desc: "Una automatización sencilla que te ahorra tiempo.",
        includes: ["Una automatización sencilla","Conexión básica","Configuración inicial"],
        benefits: ["Ahorro de tiempo","Menos errores","Empieza simple"]
      },
      pro: {
        name: "Automation Pro", price: "Desde $850.000 COP", badge: "Recomendado", time: "Aprox. 2 semanas",
        desc: "Varias acciones conectadas en un mismo flujo.",
        includes: ["Varias acciones conectadas","Flujos combinados","Notificaciones"],
        benefits: ["Procesos conectados","Más eficiencia","Seguimiento automático"]
      },
      custom: {
        name: "Automation Custom", price: "Desde $1.400.000 COP", time: "Según alcance",
        desc: "Procesos personalizados e integraciones avanzadas.",
        includes: ["Procesos personalizados","Integraciones avanzadas","Cotización según alcance"],
        benefits: ["Automatización a medida","Integraciones potentes","Escalable"],
        note: "Los costos de plataformas externas, APIs o servicios de terceros no están incluidos salvo que se indique expresamente."
      }
    }
  },

  /* ===== INTELIGENCIA ARTIFICIAL ===== */
  ai: {
    label: "Inteligencia Artificial", tag: "AI", icon: "ai",
    intro: "Asistentes virtuales, chatbots, FAQ inteligentes e integraciones con IA.",
    forWho: "Negocios que quieren atender y responder de forma más inteligente.",
    plans: {
      start: {
        name: "AI Start", price: "Desde $800.000 COP", time: "Aprox. 1 a 2 semanas",
        desc: "Asistente o FAQ inteligente básico para tu negocio.",
        includes: ["Asistente / FAQ inteligente básico","Respuestas automatizadas","Configuración inicial"],
        benefits: ["Atención más rápida","Menos preguntas repetidas","Disponible siempre"]
      },
      pro: {
        name: "AI Business", price: "Desde $1.500.000 COP", badge: "Recomendado", time: "Aprox. 2 a 4 semanas",
        desc: "Chatbot avanzado integrado a tus canales.",
        includes: ["Chatbot avanzado","Integraciones con tus canales","Asistente para tu equipo"],
        benefits: ["Atención escalable","Integrado a tu operación","Ahorro de tiempo"]
      },
      custom: {
        name: "AI Custom", price: "Cotización personalizada", time: "Según requerimientos",
        desc: "Soluciones de IA a medida según tus requerimientos.",
        includes: ["Soluciones de IA a medida","Integraciones especiales","Según requerimientos"],
        benefits: ["Solución única","Integraciones avanzadas","Escalable"],
        note: "Los consumos de APIs o plataformas de terceros se cobran aparte cuando corresponda."
      }
    }
  },

  /* ===== BRANDING ===== */
  branding: {
    label: "Branding Digital", tag: "BRAND", icon: "branding",
    intro: "Construye una identidad visual coherente y profesional.",
    forWho: "Marcas nuevas o en renovación que quieren verse profesionales.",
    plans: {
      start: {
        name: "Brand Start", price: 400000, time: "Aprox. 1 semana",
        desc: "Base visual esencial para tu marca.",
        includes: ["Paleta","Tipografías","Concepto visual","Adaptación digital básica"],
        benefits: ["Identidad clara","Coherencia visual","Base para crecer"]
      },
      pro: {
        name: "Brand Pro", price: 750000, badge: "Recomendado", time: "Aprox. 1 a 2 semanas",
        desc: "Identidad visual completa con piezas y plantillas.",
        includes: ["Identidad visual","Paleta y tipografía","Lineamientos","Piezas digitales","Foto de perfil","Banner","Plantillas"],
        benefits: ["Imagen profesional","Listo para redes","Consistencia total"]
      },
      custom: {
        name: "Brand Custom", price: "Desde $1.200.000 COP", time: "Según alcance",
        desc: "Sistema de marca completo a medida.",
        includes: ["Identidad completa a medida","Sistema de marca","Piezas ampliadas"],
        benefits: ["Marca sólida y única","Sistema escalable","Aplicaciones ampliadas"]
      }
    }
  },

  /* ===== CONTENIDO ===== */
  content: {
    label: "Contenido Digital", tag: "CONTENT", icon: "content",
    intro: "Reels, TikTok, edición, fotografías, posts y contenido para tu web.",
    forWho: "Negocios que necesitan contenido para redes y presencia digital.",
    plans: {
      start: {
        name: "Content Start", price: 450000, time: "Según agenda",
        desc: "Hasta 4 piezas cortas editadas para redes.",
        includes: ["Hasta 4 piezas cortas editadas","Formato para redes"],
        benefits: ["Contenido listo","Formato optimizado","Presencia activa"]
      },
      pro: {
        name: "Content Pro", price: 800000, badge: "Recomendado", time: "Según agenda",
        desc: "Hasta 8 piezas combinadas entre video y diseño.",
        includes: ["Hasta 8 piezas combinadas","Video y diseño","Formatos variados"],
        benefits: ["Más volumen de contenido","Video + diseño","Mayor alcance"]
      },
      custom: {
        name: "Content Business", price: "Desde $1.200.000 COP", time: "Según necesidades",
        desc: "Producción y estrategia según tus necesidades.",
        includes: ["Producción y estrategia","Plan de contenido","Producción ampliada"],
        benefits: ["Estrategia real","Producción a medida","Resultados sostenidos"],
        note: "Desplazamientos, modelos, locaciones, pauta y producción especial pueden generar costos adicionales."
      }
    }
  }
};

/* ---------- MANTENIMIENTO (planes mensuales) ---------- */
const CARE_PLANS = [
  { name: "Care", price: 220000, per: "/ mes",
    features: ["Revisión mensual","Pequeños cambios","Soporte básico","Actualización de contenido menor","Hasta 2 solicitudes pequeñas mensuales"] },
  { name: "Care Pro", price: 450000, per: "/ mes", badge: "Recomendado",
    features: ["Soporte prioritario","Cambios mensuales","Actualización de contenidos","Revisión de funcionamiento","Respaldos cuando aplique","Pequeñas mejoras","Hasta 5 solicitudes mensuales"] },
  { name: "Business Care", price: "Desde $850.000 COP", per: "/ mes",
    features: ["Soporte prioritario","Mantenimiento de sistemas","Seguimiento","Corrección de errores","Pequeñas implementaciones","Revisión técnica","Atención preferencial"] }
];

/* ---------- Costos adicionales de soporte (para FAQ / condiciones) ---------- */
const SUPPORT_RATES = {
  hour: "Hora adicional de desarrollo / soporte: desde $80.000 COP",
  urgent: "Soporte urgente fuera de horario: desde $120.000 COP"
};

/* ---------- EJEMPLOS / DEMOS por servicio ----------
   Pega aquí el enlace a una plantilla o proyecto de muestra.
   - Puedes poner un link general con "all", o uno distinto por nivel.
   - Deja "" para que NO aparezca el botón "Ver ejemplo".
   Ejemplo:
     web: { all: "https://midemo.netlify.app" }
     store: { start:"...", pro:"...", custom:"..." }
------------------------------------------------------------------- */
const EXAMPLES = {
  web:        { all: "", start: "", pro: "", custom: "" },
  store:      { all: "", start: "", pro: "", custom: "" },
  catalog:    { all: "", start: "", pro: "", custom: "" },
  orders:     { all: "", start: "", pro: "", custom: "" },
  delivery:   { all: "", start: "", pro: "", custom: "" },
  booking:    { all: "", start: "", pro: "", custom: "" },
  crm:        { all: "", start: "", pro: "", custom: "" },
  business:   { all: "", start: "", pro: "", custom: "" },
  automation: { all: "", start: "", pro: "", custom: "" },
  ai:         { all: "", start: "", pro: "", custom: "" },
  branding:   { all: "", start: "", pro: "", custom: "" },
  content:    { all: "", start: "", pro: "", custom: "" }
};

/* ---------- CASOS / EJEMPLOS por servicio ----------
   Tipos de negocio con los que la gente se identifica. Se muestran como chips. */
const SERVICE_CASES = {
  web:        ["Emprendedores", "Profesionales", "Marca personal", "Negocios locales"],
  store:      ["Ropa", "Accesorios", "Postres", "Productos naturales"],
  catalog:    ["Restaurantes", "Ferreterías", "Distribuidoras", "Servicios"],
  orders:     ["Restaurantes", "Reposterías", "Comidas rápidas", "Cafeterías"],
  delivery:   ["Comida a domicilio", "Mensajería", "Tiendas con envío"],
  booking:    ["Barberías", "Peluquerías", "Spa", "Consultorios", "Entrenadores"],
  crm:        ["Ventas", "Inmobiliarias", "Agencias", "Servicios B2B"],
  business:   ["Empresas", "Distribuidoras", "Franquicias", "PYMEs"],
  automation: ["Captar clientes", "Seguimiento", "Notificaciones", "Post-venta"],
  ai:         ["Atención 24/7", "FAQ inteligente", "Chatbot de ventas"],
  branding:   ["Marcas nuevas", "Rebranding", "Emprendimientos"],
  content:    ["Redes sociales", "Reels / TikTok", "Campañas", "Fotografía"]
};
function casesFor(service){ return SERVICE_CASES[service] || []; }

/** Devuelve el enlace de ejemplo para un servicio (y nivel opcional), o "" si no hay. */
function exampleFor(service, level){
  var e = EXAMPLES[service];
  if (!e) return "";
  return (level && e[level]) ? e[level] : (e.all || "");
}

/* ---------- Helper: obtener un plan por servicio+nivel ---------- */
function getPlan(service, level){
  if (PLANS[service] && PLANS[service].plans[level]){
    const p = PLANS[service].plans[level];
    return Object.assign({ service, level, serviceLabel: PLANS[service].label, tag: PLANS[service].tag }, p);
  }
  return null;
}
