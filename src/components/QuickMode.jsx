import React, { useState } from 'react';
import { EXPANDED_WORDS, DRUM_BEATS_BY_GENRE } from '../data/mockData';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { AudioRecorder } from './AudioRecorder';

export const QuickMode = () => {
  const [selectedPillars, setSelectedPillars] = useState([]);
  const [scenario, setScenario] = useState(null);

  // Requisito 3: Deshabilitar botón si no hay al menos 1 pilar seleccionado
  const isGenerateDisabled = selectedPillars.length === 0;

  const togglePillar = (item) => {
    setSelectedPillars(prev =>
      prev.includes(item) ? prev.filter(p => p !== item) : [...prev, item]
    );
  };

  const handleGenerate = () => {
    setScenario({
      genre: 'Indie Rock',
      feelings: ['Melancolía', 'Anhelo'],
      concepts: ['Paso del tiempo'],
      objects: [EXPANDED_WORDS.objects[0]],
      otherWords: selectedPillars,
      progression: ['I', 'V', 'vi', 'IV'],
      bpm: 112
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Requisito 2: Texto de Inicio corregido */}
      <h2 className="text-2xl font-bold text-white text-center">
        Crea una canción con...
      </h2>

      {!scenario ? (
        <div className="space-y-6">
          {/* Requisito 3: Cards deseleccionadas por defecto */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 mb-3">Otras palabras</h3>
            <div className="flex flex-wrap gap-2">
              {EXPANDED_WORDS.otherWords.map(word => (
                <button
                  key={word}
                  onClick={() => togglePillar(word)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                    selectedPillars.includes(word)
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Requisito 3: Botón deshabilitado hasta seleccionar pilar */}
          <button
            disabled={isGenerateDisabled}
            onClick={handleGenerate}
            className={`w-full py-3.5 rounded-xl font-bold text-center transition ${
              isGenerateDisabled
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-lg shadow-amber-500/10'
            }`}
          >
            Generar escenario
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          {/* Requisito 3: Botón Regresar más notorio visualmente */}
          <button
            onClick={() => setScenario(null)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-amber-500/30 rounded-lg font-medium transition shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a los pilares
          </button>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Escenario Generado</h3>
            <p className="text-sm text-zinc-400">
              <strong className="text-zinc-200">Ritmo dinámico:</strong> {DRUM_BEATS_BY_GENRE[scenario.genre]}
            </p>

            {/* Requisito 4: Opción para cambiar la progresión */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-zinc-300">Progresión:</span>
              <span className="text-amber-400 font-mono font-bold">{scenario.progression.join(' - ')}</span>
              <button
                onClick={() => setScenario({ ...scenario, progression: ['ii', 'V', 'I', 'IV'] })}
                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white"
                title="Cambiar progresión"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Requisito 1: Grabar idea */}
            <AudioRecorder label="Grabar idea" />
          </div>
        </div>
      )}
    </div>
  );
};
