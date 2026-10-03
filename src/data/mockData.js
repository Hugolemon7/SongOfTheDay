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
  otherWords: [ // Renombrado de "Inspiración lírica"
    'Luz / Destello / Brillo', 'Sombra / Penumbra / Oscuridad',
    'Viento / Brisa / Eco', 'Camino / Ruta / Senderos',
    'Mar / Marea / Océano', 'Fuego / Chispa / Ardor'
  ]
};

export const PROGRESSIONS_BY_SECTION = {
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

export const DRUM_BEATS_BY_GENRE = {
  'Indie Rock': 'Patrón dinámico con hi-hat abierto y caja potente (Driving 8ths)',
  'Indie Folk': 'Ritmo orgánico con bombo sutil y chasquido de aro (Rimshot Acoustic)',
  'Pop': 'Kick cuatro sobre piso (Four-on-the-floor) con claps brillantes',
  'R&B': 'Groove sincopado con hi-hats ajustados y bombo profundo',
  'Lo-Fi': 'Beat desacoplado, bombo cálido y swing suave de hi-hat'
};
