export type Genre = 'Indie Rock' | 'Indie Folk' | 'Pop' | 'R&B' | 'Lo-Fi'; // Synthwave eliminado

export type SectionType = 'Intro' | 'Verso' | 'Coro' | 'Puente';

export interface Section {
  id: string;
  type: SectionType;
  progression: string[];
  key: string;
}

export interface SongScenario {
  genre: Genre;
  feelings: string[];
  concepts: string[];
  objects: string[];
  otherWords: string[]; // Renombrado de "inspiración lírica"
  progression: string[];
  bpm: number;
}
