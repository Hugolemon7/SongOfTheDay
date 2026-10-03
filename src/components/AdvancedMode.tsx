import React, { useState } from 'react';
import { Section, SectionType } from '../types/song';
import { PROGRESSIONS_BY_SECTION } from '../data/mockData';
import { Plus, Trash2, Copy, Play, Pause, Volume2, Mic } from 'lucide-react';
import { AudioRecorder } from './AudioRecorder';

const TONALITIES = ['C', 'G', 'D', 'A', 'E', 'F', 'Am', 'Em', 'Dm'];
const HARMONIC_DEGREES = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

export const AdvancedMode: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [quizData, setQuizData] = useState<{
    type: SectionType;
    key: string;
    progression: string[];
    bpm: number;
  }>({
    type: 'Intro',
    key: 'C',
    progression: ['I', 'V', 'vi', 'IV'],
    bpm: 100
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [metronomeActive, setMetronomeActive] = useState(false); // Requisito 5: Desactivado por defecto

  const handleAddSectionFromQuiz = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      type: quizData.type,
      key: quizData.key,
      progression: quizData.progression
    };
    setSections([...sections, newSection]);
    setCurrentStep(5); // Ir al Lienzo de trabajo
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-white text-center">Crea una Maqueta</h1>

      {currentStep < 5 ? (
        /* Quizz Interactivo Paso a Paso */
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Paso {currentStep} de 4
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">¿Qué parte de la canción buscas crear?</h3>
              <div className="grid grid-cols-2 gap-3">
                {(['Intro', 'Verso', 'Coro', 'Puente'] as SectionType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setQuizData({ ...quizData, type });
                      setCurrentStep(2);
                    }}
                    className="p-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-center border border-zinc-700 transition"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Tonalidad de la canción</h3>
              <div className="grid grid-cols-3 gap-3">
                {TONALITIES.map(key => (
                  <button
                    key={key}
                    onClick={() => {
                      setQuizData({ ...quizData, key });
                      setCurrentStep(3);
                    }}
                    className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-center border border-zinc-700 transition"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Sugerencia de Progresión</h3>
              <div className="space-y-3">
                {PROGRESSIONS_BY_SECTION[quizData.type].map((prog, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuizData({ ...quizData, progression: prog });
                      setCurrentStep(4);
                    }}
                    className="w-full p-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-left rounded-xl flex justify-between items-center"
                  >
                    <span className="font-mono font-bold text-amber-400">{prog.join(' - ')}</span>
                    <span className="text-xs text-zinc-400">Opción {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Tempo y Balanza de Energía</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => { setQuizData({ ...quizData, bpm: 75 }); handleAddSectionFromQuiz(); }}
                  className="flex-1 p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold text-white border border-zinc-700"
                >
                  Lenta / Balada (75 BPM)
                </button>
                <button
                  onClick={() => { setQuizData({ ...quizData, bpm: 120 }); handleAddSectionFromQuiz(); }}
                  className="flex-1 p-4 bg-amber-500 hover:bg-amber-400 rounded-xl font-bold text-zinc-950"
                >
                  Energética / Movida (120 BPM)
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Lienzo de Trabajo y Vista de Maqueta Completa */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Estructura de la Maqueta</h2>
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-zinc-950 font-bold rounded-lg hover:bg-amber-400 transition"
            >
              <Plus className="w-4 h-4" /> Agregar sección
            </button>
          </div>

          {/* Lista de Secciones */}
          <div className="space-y-3">
            {sections.map((sec, idx) => (
              <div key={sec.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase">{sec.type}</span>
                  <div className="font-mono font-bold text-lg text-white">{sec.progression.join(' - ')} ({sec.key})</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSections(sections.filter(s => s.id !== sec.id))}
                    className="p-2 text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sustitución por Grados Armónicos */}
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3">
            <h4 className="text-sm font-bold text-zinc-400">Grados Armónicos Disponibles</h4>
            <div className="flex gap-2">
              {HARMONIC_DEGREES.map(deg => (
                <span key={deg} className="px-3 py-1.5 bg-zinc-800 text-amber-300 font-mono text-sm rounded-lg border border-zinc-700">
                  {deg}
                </span>
              ))}
            </div>
          </div>

          {/* Reproductor de Maqueta */}
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 bg-amber-500 text-zinc-950 rounded-full font-bold hover:bg-amber-400 transition"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              {/* Metrónomo desactivado por defecto */}
              <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={metronomeActive}
                  onChange={(e) => setMetronomeActive(e.target.checked)}
                  className="rounded bg-zinc-800 border-zinc-700 text-amber-500 focus:ring-amber-500"
                />
                Metrónomo
              </label>
            </div>

            {/* Requisito 6: Grabar Maqueta */}
            <AudioRecorder label="Grabar Maqueta" />
          </div>
        </div>
      )}
    </div>
  );
};
