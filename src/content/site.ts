/** Contenido del sitio (fuente: brochure y brandbook). Un solo lugar para editar textos. */
import { Flame, Zap, Cpu, Network, Cctv, HardHat, Search, DraftingCompass, CalendarRange, PackageCheck, Wrench, Power, LifeBuoy, Activity, Blocks, MountainSnow } from 'lucide-react'

export const SERVICES = [
  { n: '01', slug: 'proteccion-contra-incendios', icon: Flame, short: 'Incendios', title: 'Protección contra incendios', q: '¿Cómo se detecta el humo antes de que sea fuego?', desc: 'La aspiración y la detección inteligente identifican partículas en fase incipiente; los agentes limpios extinguen sin dañar equipos energizados.', items: ['Detección inteligente y convencional', 'Extinción por agentes limpios', 'Detección por aspiración'], img: '/img/svc-incendios.webp', alt: 'Técnico trabajando en un sistema contra incendios' },
  { n: '02', slug: 'electricidad-e-instrumentacion', icon: Zap, short: 'Electricidad', title: 'Electricidad e instrumentación', q: '¿Qué ocurre aguas abajo cuando cae una alimentación?', desc: 'Distribución en media y baja tensión, con instrumentación de campo integrada al sistema de control.', items: ['Media y baja tensión', 'Instrumentación industrial', 'Integración con automatización'], img: '/img/svc-electricidad.webp', alt: 'Tablero eléctrico' },
  { n: '03', slug: 'automatizacion-industrial', icon: Cpu, short: 'Automatización', title: 'Automatización industrial', q: '¿Cuánto demora el operador en enterarse de una desviación?', desc: 'Control de procesos y supervisión SCADA: las variables de campo llegan a sala de control con registro histórico.', items: ['Control automatizado de procesos', 'Integración de plataformas SCADA', 'Trazabilidad operacional'], img: '/img/svc-automatizacion.webp', alt: 'Sala de control' },
  { n: '04', slug: 'telecomunicaciones', icon: Network, short: 'Telecom', title: 'Telecomunicaciones', q: '¿Y si el enlace cae en plena faena?', desc: 'Fibra óptica, cableado estructurado y redes industriales con topologías redundantes, más enlaces inalámbricos robustos.', items: ['Fibra óptica y cableado estructurado', 'Redes industriales de alta disponibilidad', 'Sistemas inalámbricos robustos'], img: '/img/svc-telecom.webp', alt: 'Rack de fibra óptica' },
  { n: '05', slug: 'seguridad-electronica', icon: Cctv, short: 'Seguridad', title: 'Seguridad electrónica', q: '¿Quién entra, a qué zona y a qué hora?', desc: 'CCTV, control de acceso perimetral e interior y detección de intrusión, integrados al centro de control.', items: ['CCTV y videovigilancia', 'Control de acceso perimetral e interior', 'Detección de intrusión'], img: '/img/svc-seguridad.webp', alt: 'Sistema de seguridad electrónica' },
  { n: '06', slug: 'construccion-industrial', icon: HardHat, short: 'Construcción', title: 'Construcción industrial', q: '¿Quién monta lo que otro diseñó?', desc: 'Climatización, obras civiles y piping industrial: ingeniería, fabricación y montaje bajo una misma coordinación.', items: ['Climatización y obras civiles', 'Piping industrial: ingeniería, fabricación y montaje'], img: '/img/svc-construccion.webp', alt: 'Obra industrial' },
] as const

export const PILLARS = [
  { icon: Blocks, title: 'Interfaces resueltas en ingeniería', text: 'Detección, potencia, control y redes se coordinan en un solo diseño. Sin traspasos entre proveedores.' },
  { icon: Activity, title: 'Diseño para continuidad', text: 'Redundancia, respaldo y mantenimiento planificado, definidos desde la ingeniería de detalle.' },
  { icon: MountainSnow, title: 'Terreno extremo', text: 'Desierto de alta montaña y faenas remotas, con logística y soporte técnico especializados.' },
]

export const STEPS = [
  { icon: Search, title: 'Diagnóstico', text: 'Levantamiento en terreno: criticidad, condiciones ambientales y alcance.' },
  { icon: DraftingCompass, title: 'Ingeniería', text: 'Ingeniería de detalle bajo los estándares de cada cliente.' },
  { icon: CalendarRange, title: 'Planificación', text: 'Cronograma, recursos y ventanas de intervención.' },
  { icon: PackageCheck, title: 'Abastecimiento', text: 'Equipos certificados, con trazabilidad de origen.' },
  { icon: Wrench, title: 'Montaje', text: 'Ejecución en terreno bajo protocolos de seguridad y calidad.' },
  { icon: Power, title: 'Puesta en marcha', text: 'Comisionamiento y pruebas funcionales contra la ingeniería.' },
  { icon: LifeBuoy, title: 'Mantenimiento', text: 'Soporte preventivo y correctivo.' },
]

export const CASES = [
  { id: 'teck', title: 'Minera Teck · Quebrada Blanca', sector: 'Minería', img: '/img/proy-teck.webp', alt: 'Faena minera de gran escala', desafio: 'Gran escala, con exigencias estrictas de continuidad y seguridad.', solucion: 'Ingeniería de precisión y suministro integral de sistemas especializados y equipos certificados.', resultado: 'Plazos y calidad cumplidos.' },
  { id: 'escondida', title: 'Minera Escondida', sector: 'Minería', img: '/img/proy-escondida.webp', alt: 'Sala de control de faena', desafio: 'Integración multidisciplinaria con la faena en operación.', solucion: 'Automatización y control sobre SCADA, con monitoreo continuo.', resultado: 'Mejora operacional y seguridad reforzada.' },
  { id: 'salares', title: 'Salares Norte y Central · Hidroeléctrica Cóndores', sector: 'Minería y energía', img: '/img/proy-salares.webp', alt: 'Instalación en altura', desafio: 'Alta montaña, instalaciones de difícil acceso y plazos ajustados.', solucion: 'Soporte técnico permanente y logística especializada.', resultado: 'Mantenimiento continuo bajo estándares internacionales.' },
]

/* TODO: reemplazar por los logos de fabricantes (brochure p.17) */
export const CERTS: { name: string; kind: 'cert' | 'fab' }[] = [
  { name: 'Notifier', kind: 'fab' }, { name: 'CCNA', kind: 'cert' }, { name: 'Bticino My Home', kind: 'fab' },
  { name: 'Furukawa', kind: 'fab' }, { name: 'IOM Siemens', kind: 'cert' }, { name: 'Leviton', kind: 'fab' },
  { name: 'March Networks', kind: 'fab' }, { name: 'FOA Fibra Óptica', kind: 'cert' }, { name: 'Systimax · CommScope', kind: 'fab' },
  { name: 'Daitsu · Fujitsu', kind: 'fab' },
]

export const CONTACT = {
  name: 'Cesar Diaz',
  email: 'cdiaz@w-currents.cl',
  phone: '+56 9 6325 2488',
  wa: '56963252488',
  place: 'Santiago, Chile',
}

export const NAV = [
  { id: 'empresa', label: 'Empresa' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'metodo', label: 'Método' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'cotizar', label: 'Contacto' },
]

/** Indicadores por disciplina. Prioridad: fuentes nacionales. `intl` marca referencias internacionales. */
export type Fact = { v: string; l: string; src: string; year: string; url: string; intl?: boolean }
export const FACTS: { facts: Fact[]; plazo: string }[] = [
  { // Incendios
    facts: [{ v: 'DS 132 · Art. 196', l: 'Toda faena minera debe contar con instalaciones de detección y extinción de incendios, con inspección y mantención permanentes', src: 'Reglamento de Seguridad Minera, Ministerio de Minería', year: 'vigente desde 2004', url: 'https://iura.cl/dto-132-minmineria-2004/196' }],
    plazo: 'El alcance lo fijan las zonas a proteger, el agente extintor y la integración con el control de planta. Se acota tras el levantamiento en terreno.',
  },
  { // Electricidad
    facts: [
      { v: '27,6 → 33,2 TWh', l: 'proyección del consumo eléctrico de la minería del cobre entre 2025 y 2034 (+20,2 %), con la concentración en 55 % del total', src: 'Cochilco · Proyección del consumo de energía eléctrica, 2025-2034', year: 'proyección', url: 'https://www.guiaminera.cl/cochilco-consumo-electrico-en-la-mineria-se-incrementara-202-al-2034/' },
      { v: 'Apagón 25F', l: 'La comisión investigadora concluyó que no fue un evento aislado ni una sola falla, y que faltó coordinación y monitoreo del sistema', src: 'Cámara de Diputadas y Diputados', year: '2025', url: 'https://www.camara.cl/cms/2025/08/08/explican-falencias-en-corte-de-energia-de-febrero/' },
    ],
    plazo: 'El alcance lo definen el nivel de tensión, la criticidad de las cargas y el suministro de equipos. Se confirma con la ingeniería básica.',
  },
  { // Automatización
    facts: [{ v: '≈ 1/3', l: 'de las horas de paro no planificado respecto de 2019 en industria pesada, tras adoptar IoT y mantenimiento predictivo', src: 'Siemens · The True Cost of Downtime', year: '2024', url: 'https://assets.new.siemens.com/siemens/assets/api/uuid:1b43afb5-2d07-47f7-9eb7-893fe7d0bc59/TCOD-2024_original.pdf', intl: true }],
    plazo: 'El alcance depende de la cantidad de señales, los lazos de control y la migración de la plataforma existente. Se define con el levantamiento de variables.',
  },
  { // Telecom
    facts: [{ v: 'Ley 21.663', l: 'Marco de Ciberseguridad: los prestadores de servicios esenciales deben gestionar riesgos y reportar incidentes a la ANCI', src: 'Diario Oficial', year: '8 abr 2024', url: 'https://www.diariooficial.interior.gob.cl/publicaciones/2024/04/08/43820/01/2475674.pdf' }],
    plazo: 'El alcance depende de la longitud de trazado, la canalización disponible y el tipo de enlace. Se acota tras el estudio de ruta.',
  },
  { // Seguridad
    facts: [{ v: '45 → 11', l: 'fallecidos en accidentes de la minería chilena entre 2010 y 2024; la tasa de fatalidad bajó 83 %', src: 'Sernageomin · Estadísticas de Accidentabilidad', year: '2024', url: 'https://www.sernageomin.cl' }],
    plazo: 'El alcance depende de las zonas a cubrir, el tipo de control de acceso y la red disponible. Se confirma con el recorrido en terreno.',
  },
  { // Construcción
    facts: [{ v: 'NCh 2369', l: 'Diseño sísmico de estructuras e instalaciones industriales: criterio base para soportes, piping y obras civiles', src: 'INN', year: '2003', url: 'https://www.inn.cl' }],
    plazo: 'El alcance lo determinan la obra civil, la fabricación de piping y la ventana de montaje disponible en la planta.',
  },
]

/** «Qué exige» (norma o marco aplicable) frente a «qué entrega wcurrents». Sin norma nacional verificada, se indica que lo fija el estándar del mandante. */
export const MARCO: { ref: string; exige: string; entrega: string }[] = [
  { ref: 'DS 132 · Art. 196', exige: 'Instalaciones de detección y extinción de incendios, con inspección y mantención permanentes.', entrega: 'Detección (incluida aspiración) y extinción por agentes limpios, con plan de mantención desde la puesta en marcha.' },
  { ref: 'NCh Elec. 4/2003 · SEC', exige: 'Instalaciones de consumo en baja tensión conforme a la norma chilena, fiscalizadas por la SEC.', entrega: 'Distribución en media y baja tensión, e instrumentación de campo integrada al sistema de control.' },
  { ref: 'DS 132 · Art. 196 f)', exige: 'Registros del desempeño de los sistemas de ventilación durante una emergencia.', entrega: 'Supervisión SCADA con registro histórico de variables y eventos, disponible para auditoría.' },
  { ref: 'Ley 21.663 · ANCI', exige: 'Gestionar los riesgos y reportar los incidentes de ciberseguridad a la ANCI.', entrega: 'Redes industriales con topologías redundantes y arquitectura documentada para la gestión de riesgo del mandante.' },
  { ref: 'Estándar del mandante', exige: 'No hay una norma única: cada operación fija sus zonas, niveles de acceso y retención de registros.', entrega: 'CCTV, control de acceso y detección de intrusión dimensionados según ese estándar, integrados al centro de control.' },
  { ref: 'NCh 2369', exige: 'Criterio de diseño sísmico para estructuras e instalaciones industriales.', entrega: 'Ingeniería, fabricación y montaje de piping y obras civiles bajo una misma coordinación.' },
]
