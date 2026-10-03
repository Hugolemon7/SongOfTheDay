// Banco de datos enriquecido V2

export const SENTIMIENTOS = [
  'amor', 'tristeza', 'alegría', 'enojo', 'miedo', 'repulsión', 'intriga', 
  'ansiedad', 'aburrimiento', 'envidia', 'pasión', 'deseo', 'nostalgia', 
  'melancolía', 'euforia', 'soledad', 'gratitud', 'culpa', 'desesperanza', 
  'serenidad', 'vulnerabilidad', 'asombro', 'frustración', 'esperanza',
  'vergüenza', 'orgullo', 'despecho', 'desolación', 'compasión', 'rencor'
];

export const OBJETOS = [
  'familiar', 'infante', 'amigo', 'pareja', 'desconocido', 'luna', 'ojos', 
  'boca', 'nariz', 'cabello', 'cama', 'taza', 'instrumento musical', 'juguete', 
  'espejo', 'reloj antiguo', 'fotografía desgastada', 'carta sin enviar', 
  'teléfono descompuesto', 'ventana lluviosa', 'llave oxidada', 'diario íntimo', 
  'boleto de tren', 'chaqueta de cuero', 'anillo', 'radio de transistores',
  'maleta vieja', 'faro distante', 'piano desafinado', 'vela encendida', 
  'disco de vinilo', 'caja de cerillos', 'paraguas roto', 'botella con nota'
];

// Color, Fecha y Género se mantienen acotados según tus indicaciones
export const COLORES = [
  'rojo', 'verde', 'azul', 'negro', 'amarillo', 'blanco', 'violeta', 
  'gris', 'dorado', 'turquesa', 'rosa', 'marrón', 'naranja', 'plata'
];

export const FECHAS = [
  'primavera', 'verano', 'otoño', 'invierno', 'halloween', 'navidad', 
  'año nuevo', 'día de gracias', 'independencia', 'cumpleaños', 'aniversario', 
  'madrugada de domingo', 'último día de clases', 'atardecer de verano', 
  'medianoche', 'lunes por la mañana', 'eclipse', 'solsticio'
];

export const CONCEPTOS = [
  'vida', 'muerte', 'pérdida', 'reflexión', 'carta', 'película', 'canción', 
  'recuerdo', 'sueño', 'idea', 'viaje sin retorno', 'tiempo perdido', 
  'identidad', 'transformación', 'secreto guardado', 'promesa rota', 
  'segunda oportunidad', 'destino', 'distancia', 'perdón', 'despedida', 'origen',
  'ambición', 'caos', 'iluminación', 'laberinto', 'renacimiento'
];

// Géneros (sin Reggae ni R&B)
export const GENEROS = [
  { id: 'Rock', name: 'Rock', defaultBpm: 120 },
  { id: 'Pop', name: 'Pop', defaultBpm: 115 },
  { id: 'Punk', name: 'Punk', defaultBpm: 145 },
  { id: 'Balada', name: 'Balada', defaultBpm: 70 },
  { id: 'Folk', name: 'Folk', defaultBpm: 95 },
  { id: 'Country', name: 'Country', defaultBpm: 105 },
  { id: 'BossaNova', name: 'BossaNova', defaultBpm: 80 },
  { id: 'Indie Rock', name: 'Indie Rock', defaultBpm: 125 },
  { id: 'Synthwave', name: 'Synthwave', defaultBpm: 110 },
  { id: 'Bolero', name: 'Bolero', defaultBpm: 75 }
];

// Progresiones ampliadas
export const PROGRESIONES = [
  { name: 'Pop Básico', numerales: ['I', 'IV', 'V'] },
  { name: 'Cuatro Acordes', numerales: ['I', 'V', 'vi', 'IV'] },
  { name: 'Cadencia Jazz / Pop', numerales: ['ii', 'V', 'I'] },
  { name: 'Balada 50s', numerales: ['I', 'vi', 'IV', 'V'] },
  { name: 'Nostálgica', numerales: ['vi', 'IV', 'I', 'V'] },
  { name: 'Cánon Pachelbel', numerales: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'] },
  { name: 'Épica Modern', numerales: ['I', 'IV', 'vi', 'V'] },
  { name: 'Melancólica', numerales: ['I', 'vi', 'ii', 'V'] },
  { name: 'Pop Épico Menor', numerales: ['i', 'VI', 'III', 'VII'] },
  { name: '12-Bar Blues', numerales: ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'V'] },
  { name: 'Rock Modal', numerales: ['I', 'bVII', 'IV', 'I'] },
  { name: 'Andaluza / Épica', numerales: ['i', 'VII', 'VI', 'VII'] },
  { name: 'Cambio de Modo (Piccardy)', numerales: ['I', 'III', 'IV', 'iv'] },
  { name: 'Menor Sencilla', numerales: ['i', 'iv', 'v'] },
  { name: 'Folk Acústico', numerales: ['I', 'IV', 'I', 'V'] }
];

// Escalas cromáticas y frecuencias para sintetizador Web Audio API
const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const INITIAL_KEYS = [
  { rootIndex: 0, isMinor: false, display: 'C Mayor' },
  { rootIndex: 9, isMinor: true, display: 'A menor' },
  { rootIndex: 7, isMinor: false, display: 'G Mayor' },
  { rootIndex: 2, isMinor: false, display: 'D Mayor' },
  { rootIndex: 4, isMinor: true, display: 'E menor' },
  { rootIndex: 5, isMinor: false, display: 'F Mayor' },
  { rootIndex: 9, isMinor: false, display: 'A Mayor' }
];

const MAJOR_INTERVALS = { 'I': 0, 'ii': 2, 'iii': 4, 'IV': 5, 'V': 7, 'vi': 9, 'vii°': 11, 'III': 4, 'iv': 5, 'bVII': 10 };
const MINOR_INTERVALS = { 'i': 0, 'ii°': 2, 'III': 3, 'iv': 5, 'v': 7, 'VI': 8, 'VII': 10, 'I': 0, 'IV': 5, 'V': 7 };

export function getKeyDisplay(rootIndex, isMinor) {
  const note = CHROMATIC[rootIndex];
  return `${note} ${isMinor ? 'menor' : 'Mayor'}`;
}

export function transposeProgression(numerales, rootIndex, isMinor) {
  const intervals = isMinor ? MINOR_INTERVALS : MAJOR_INTERVALS;
  
  return numerales.map(num => {
    let cleanNum = num.replace('b', '');
    let semitones = intervals[cleanNum] !== undefined ? intervals[cleanNum] : 0;
    if (num.startsWith('b')) semitones -= 1;
    
    let noteIndex = (rootIndex + semitones) % 12;
    if (noteIndex < 0) noteIndex += 12;
    let noteName = CHROMATIC[noteIndex];

    if (num === num.toLowerCase() && !num.includes('°')) {
      return noteName + 'm';
    }
    return noteName;
  });
}

// Frecuencias base en Hz (Octava 3 y 4)
export const NOTE_FREQUENCIES = {
  'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63, 
  'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00, 
  'A#': 466.16, 'B': 493.88
};

// Base de datos de sinónimos para inspiración de letras
export const SINONIMOS_DB = {
  "amor": ["afecto", "cariño", "devoción", "apego", "ternura"],
  "tristeza": ["melancolía", "desolación", "pesadumbre", "nostalgia", "pena"],
  "alegría": ["gozo", "júbilo", "entusiasmo", "regocijo", "vitalidad"],
  "enojo": ["furia", "rabia", "indignación", "ira", "frustración"],
  "miedo": ["temor", "pavor", "angustia", "pánico", "recelo"],
  "repulsión": ["asco", "aversión", "rechazo", "desagrado", "repugnancia"],
  "intriga": ["curiosidad", "misterio", "fascinación", "suspenso", "interés"],
  "ansiedad": ["inquietud", "desasosiego", "impaciencia", "tensión", "zozobra"],
  "aburrimiento": ["apatía", "tedio", "desinterés", "hastío", "monotonía"],
  "envidia": ["celos", "anhelo", "resentimiento", "codicia", "despecho"],
  "pasión": ["ardor", "fervor", "fuego", "obsesión", "vehemencia"],
  "deseo": ["anhelo", "impulso", "tentación", "ambición", "aspiración"],
  "melancolía": ["añoranza", "tristeza", "soledad", "ensimismamiento"],
  "euforia": ["éxtasis", "exaltación", "frenesí", "exuberancia"],
  "soledad": ["aislamiento", "desamparo", "retiro", "vacío", "intimidad"],
  "gratitud": ["agradecimiento", "reconocimiento", "aprecio"],
  "culpa": ["remordimiento", "pesar", "cargo de conciencia"],
  "desesperanza": ["desaliento", "desesperación", "derrota"],
  "serenidad": ["calma", "paz", "tranquilidad", "sosiego"],
  "vulnerabilidad": ["fragilidad", "sensibilidad", "exposición"],
  "asombro": ["deslumbramiento", "estupefacción", "maravilla"],
  "frustración": ["impotencia", "desengaño", "contrariedad"],
  "esperanza": ["ilusión", "fe", "optimismo", "confianza"],
  " familiar": ["pariente", "allegado", "sangre", "ancestro"],
  "infante": ["niño", "criatura", "pequeño", "infancia"],
  "amigo": ["compañero", "confidente", "camarada"],
  "pareja": ["amante", "compañero/a", "amor", "mitad"],
  "desconocido": ["extraño", "forastero", "transeúnte", "sombra"],
  "luna": ["astro nocturno", "satélite", "plata celeste"],
  "ojos": ["mirada", "pupilas", "destellos", "visión"],
  "boca": ["labios", "sonrisa", "suspiro", "aliento"],
  "cama": ["lecho", "refugio", "sábanas", "descanso"],
  "espejo": ["reflejo", "cristal", "reverso", "duplicado"],
  "reloj antiguo": ["cronómetro", "péndulo", "segundero"],
  "fotografía desgastada": ["retrato", "instantánea", "captura"],
  "carta sin enviar": ["epístola", "confesión", "mensaje mudo"],
  "diario íntimo": ["cuaderno", "bitácora", "confesionario"],
  "vida": ["existencia", "latido", "transcurso", "camino"],
  "muerte": ["final", "despedida", "partida", "silencio eterno"],
  "pérdida": ["ausencia", "extravío", "vacío", "despojo"],
  "reflexión": ["meditación", "pensamiento", "introspección"],
  "recuerdo": ["memoria", "evocación", "huella", "reminiscencia"],
  "sueño": ["anhelo", "quimera", "ilusión", "fantasía"],
  "tiempo perdido": ["horas muertas", "pasado irrecuperable"],
  "secreto guardado": ["confidencia", "misterio oculto", "sigilo"],
  "promesa rota": ["juramento vano", "traición", "desengaño"],
  "destino": ["azar", "camino trazado", "futuro"],
  "distancia": ["lejanía", "abismo", "separación", "horizonte"]
};

import { Genre, SectionType } from '../types/song';

export const EXPANDED_WORDS = {
  feelings: [
    'Melancolía', 'Euforia', 'Nostalgia', 'Serenidad', 'Desasosiego',
    'Anhelo', 'Gratitud', 'Incertidumbre', 'Calidez', 'Vulnerabilidad'
  ],
  concepts: [
    'Paso del tiempo', 'Identidad', 'Distancia', 'Efímero', 'Transformación',
    'Raíces', 'Silencio', 'Dualidad', 'Memorias', 'Nuevos comienzos'
  ],
  objects: [ // Priorizado y ampliado
    'Reloj de pared', 'Taza de café fría', 'Fotografía desgastada', 'Cinta magnética',
    'Espejo empañado', 'Llave oxidada', 'Silla vacía', 'Lámpara de noche',
    'Cuaderno de notas', 'Ventana empañada', 'Disco de vinilo', 'Cables cruzados'
  ],
  otherWords: [ // Renombrado con sinónimos
    'Luz / Destello / Brillo', 'Sombra / Penumbra / Oscuridad',
    'Viento / Brisa / Eco', 'Camino / Ruta / Senderos',
    'Mar / Marea / Océano', 'Fuego / Chispa / Ardor'
  ]
};

export const PROGRESSIONS_BY_SECTION: Record<SectionType, string[][]> = {
  Intro: [
    ['I', 'V', 'vi', 'IV'],
    ['I', 'IV', 'V', 'I'],
    ['vi', 'IV', 'I', 'V']
  ],
  Verso: [
    ['I', 'V', 'vi', 'IV'],
    ['ii', 'V', 'I', 'IV'],
    ['I', 'vi', 'IV', 'V']
  ],
  Coro: [
    ['VI', 'VII', 'i', 'i'],
    ['IV', 'V', 'iii', 'vi'],
    ['I', 'V', 'vi', 'IV']
  ],
  Puente: [
    ['IV', 'I', 'V', 'vi'],
    ['ii', 'IV', 'vi', 'V'],
    ['VI', 'IV', 'I', 'V']
  ]
};

export const DRUM_BEATS_BY_GENRE: Record<Genre, string> = {
  'Indie Rock': 'Patrón dinámico con hi-hat abierto y caja potente (Driving 8ths)',
  'Indie Folk': 'Ritmo orgánico con bombo sutil y chasquido de aro (Rimshot Acoustic)',
  'Pop': 'Kick cuatro sobre piso (Four-on-the-floor) con claps brillantes',
  'R&B': 'Groove sincopado con hi-hats ajustados y bombo profundo',
  'Lo-Fi': 'Beat desacoplado, bombo cálido y swing suave de hi-hat'
};
