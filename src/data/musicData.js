export const SENTIMIENTOS = [
  'amor', 'tristeza', 'alegría', 'enojo', 'miedo', 'repulsión', 'intriga', 
  'ansiedad', 'aburrimiento', 'envidia', 'pasión', 'deseo', 'nostalgia', 
  'melancolía', 'euforia', 'soledad', 'gratitud', 'culpa', 'desesperanza', 
  'serenidad', 'vulnerabilidad', 'asombro', 'frustración', 'esperanza'
];

export const OBJETOS = [
  'familiar', 'infante', 'amigo', 'pareja', 'desconocido', 'luna', 'ojos', 
  'boca', 'nariz', 'cabello', 'cama', 'taza', 'instrumento musical', 'juguete', 
  'espejo', 'reloj antiguo', 'fotografía desgastada', 'carta sin enviar', 
  'teléfono descompuesto', 'ventana lluviosa', 'llave oxidada', 'diario íntimo', 
  'boleto de tren', 'chaqueta de cuero', 'anillo', 'radio de transistores'
];

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
  'segunda oportunidad', 'destino', 'distancia', 'perdón', 'despedida', 'origen'
];

export const GENEROS = [
  'Rock', 'Pop', 'Punk', 'Balada', 'Folk', 'Country', 'BossaNova', 
  'Indie Rock', 'R&B', 'Synthwave', 'Reggae', 'Bolero'
];

// Mapeo numérico de notas (12 semitonos)
const CHROMATIC_SCALE = [
  { name: 'C', alt: 'C' },
  { name: 'C#', alt: 'Db' },
  { name: 'D', alt: 'D' },
  { name: 'D#', alt: 'Eb' },
  { name: 'E', alt: 'E' },
  { name: 'F', alt: 'F' },
  { name: 'F#', alt: 'Gb' },
  { name: 'G', alt: 'G' },
  { name: 'G#', alt: 'Ab' },
  { name: 'A', alt: 'A' },
  { name: 'A#', alt: 'Bb' },
  { name: 'B', alt: 'B' }
];

export const INITIAL_KEYS = [
  { rootIndex: 0, isMinor: false, display: 'C Mayor' },
  { rootIndex: 9, isMinor: true, display: 'A menor' },
  { rootIndex: 7, isMinor: false, display: 'G Mayor' },
  { rootIndex: 2, isMinor: false, display: 'D Mayor' },
  { rootIndex: 4, isMinor: true, display: 'E menor' },
  { rootIndex: 5, isMinor: false, display: 'F Mayor' },
  { rootIndex: 9, isMinor: false, display: 'A Mayor' }
];

export const PROGRESIONES = [
  { name: 'Pop Clásico', numerales: ['I', 'V', 'vi', 'IV'] },
  { name: 'Cadencia Perfecta', numerales: ['I', 'ii', 'V', 'I'] },
  { name: 'Balada / 50s', numerales: ['I', 'vi', 'IV', 'V'] },
  { name: 'Andaluza / Emotiva', numerales: ['i', 'VII', 'VI', 'V'] },
  { name: 'Nostálgica', numerales: ['vi', 'IV', 'I', 'V'] },
  { name: 'Épica Modern', numerales: ['I', 'IV', 'vi', 'V'] },
  { name: 'Jazz / Bossa', numerales: ['ii', 'V', 'I', 'VI'] }
];

// Intervalos en semitonos desde la tónica para escala mayor y menor
const MAJOR_INTERVALS = { 'I': 0, 'ii': 2, 'iii': 4, 'IV': 5, 'V': 7, 'vi': 9, 'vii°': 11 };
const MINOR_INTERVALS = { 'i': 0, 'ii°': 2, 'III': 3, 'iv': 5, 'v': 7, 'VI': 8, 'VII': 10 };

export function getKeyDisplay(rootIndex, isMinor) {
  const note = CHROMATIC_SCALE[rootIndex].name;
  return `${note} ${isMinor ? 'menor' : 'Mayor'}`;
}

export function transposeProgression(numerales, rootIndex, isMinor) {
  const intervals = isMinor ? MINOR_INTERVALS : MAJOR_INTERVALS;
  
  return numerales.map(num => {
    const isUpper = num === num.toUpperCase();
    const cleanNum = num;
    const semitones = intervals[cleanNum] !== undefined ? intervals[cleanNum] : 0;
    const noteIndex = (rootIndex + semitones) % 12;
    const noteName = CHROMATIC_SCALE[noteIndex].name;
    
    // Si el numeral original es en minúscula en escala mayor o minúscula en menor, le damos sufijo m
    if (!isMinor && num === num.toLowerCase() && !num.includes('°')) {
      return noteName + 'm';
    }
    if (isMinor && num === num.toLowerCase() && !num.includes('°')) {
      return noteName + 'm';
    }
    return noteName;
  });
}
