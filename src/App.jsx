import React, { useState } from 'react';
import Metronome from './components/Metronome';
import { 
  SENTIMIENTOS, OBJETOS, COLORES, FECHAS, CONCEPTOS, GENEROS, 
  PROGRESIONES, INITIAL_KEYS, getKeyDisplay, transposeProgression 
} from './data/musicData';

export default function App() {
  const [scenario, setScenario] = useState(null);
  const [keyState, setKeyState] = useState({ rootIndex: 0, isMinor: false });
  const [copied, setCopied] = useState(false);

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateScenario = () => {
    const sentimiento = getRandomItem(SENTIMIENTOS);
    const objeto = getRandomItem(OBJETOS);
    const color = getRandomItem(COLORES);
    const fecha = getRandomItem(FECHAS);
    const concepto = getRandomItem(CONCEPTOS);
    const genero = getRandomItem(GENEROS);
    const progresionObj = getRandomItem(PROGRESIONES);
    const keyObj = getRandomItem(INITIAL_KEYS);

    setKeyState({ rootIndex: keyObj.rootIndex, isMinor: keyObj.isMinor });

    // Construcción del texto narrativo
    const narrative = `Un tema de género ${genero} que explora el concepto de ${concepto} a través de una marcada sensación de ${sentimiento}. La historia se desarrolla en torno a un/a ${objeto} de color ${color}, tomando como marco temporal el/la ${fecha}.`;

    setScenario({
      sentimiento,
      objeto,
      color,
      fecha,
      concepto,
      genero,
      progresionObj,
      narrative
    });
  };

  const handleShiftKey = (delta) => {
    setKeyState((prev) => {
      let newIndex = (prev.rootIndex + delta) % 12;
      if (newIndex < 0) newIndex += 12;
      return { ...prev, rootIndex: newIndex };
    });
  };

  const currentChords = scenario 
    ? transposeProgression(scenario.progresionObj.numerales, keyState.rootIndex, keyState.isMinor)
    : [];

  const copyToClipboard = () => {
    if (!scenario) return;
    const textToCopy = `🎵 SONG OF THE DAY 🎵\n\n${scenario.narrative}\n\n• Tonalidad: ${getKeyDisplay(keyState.rootIndex, keyState.isMinor)}\n• Progresión: ${scenario.progresionObj.name} (${currentChords.join(' - ')})\n• Género: ${scenario.genero}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 text-slate-800 font-sans p-4 md:p-8 flex flex-col items-center">
      <header className="max-w-2xl w-full text-center my-6">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
          Song of the day
        </h1>
        <p className="text-slate-500 font-medium mt-2">
          Disparadores creativos y escenarios de composición
        </p>
      </header>

      <main className="max-w-2xl w-full flex flex-col gap-8">
        {/* Sección Botón Shazam */}
        <div className="flex flex-col items-center justify-center py-6">
          <button
            onClick={generateScenario}
            className="group relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-lg shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center gap-1 border-4 border-white"
          >
            <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">✨</span>
            <span>GENERAR</span>
            <span className="text-[10px] uppercase font-semibold tracking-widest opacity-80">Idea</span>
          </button>
        </div>

        {/* Metrónomo */}
        <Metronome />

        {/* Resultados del Escenario */}
        {scenario && (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-500/10 border border-white flex flex-col gap-6 animate-fade-in">
            
            {/* Historia / Escenario Narrativo */}
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-5 rounded-2xl border border-blue-200/50">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Escenario Inicial</h2>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-800">
                "{scenario.narrative}"
              </p>
            </div>

            {/* Tags de Elementos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold">
              <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[10px]">SENTIMIENTO</span>{scenario.sentimiento}</div>
              <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[10px]">OBJETO</span>{scenario.objeto}</div>
              <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[10px]">COLOR</span>{scenario.color}</div>
              <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[10px]">FECHA</span>{scenario.fecha}</div>
              <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[10px]">CONCEPTO</span>{scenario.concepto}</div>
              <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[10px]">GÉNERO</span>{scenario.genero}</div>
            </div>

            {/* Módulo Musical: Tonalidad y Transposición */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Tonalidad & Transposición</span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-black text-slate-800">
                    {getKeyDisplay(keyState.rootIndex, keyState.isMinor)}
                  </span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleShiftKey(-1)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center transition-colors"
                      title="Bajar semitono"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => handleShiftKey(1)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center transition-colors"
                      title="Subir semitono"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Acordes Transpuestos */}
              <div className="text-right w-full sm:w-auto bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 block">Progresión ({scenario.progresionObj.name})</span>
                <div className="flex items-center justify-end gap-2 mt-1">
                  {currentChords.map((chord, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white shadow-sm border border-slate-200 rounded-lg text-sm font-bold text-blue-600">
                      {chord}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Botón Copiar */}
            <button
              onClick={copyToClipboard}
              className="w-full py-3 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 font-bold text-sm text-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <span>{copied ? '✓ Escenario copiado' : '📋 Copiar escenario al portapapeles'}</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
