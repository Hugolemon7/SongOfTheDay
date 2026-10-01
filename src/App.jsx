import React, { useState } from 'react';
import AudioEngine from './components/AudioEngine';
import VoiceRecorder from './components/VoiceRecorder';
import { 
  SENTIMIENTOS, OBJETOS, COLORES, FECHAS, CONCEPTOS, GENEROS, 
  PROGRESIONES, INITIAL_KEYS, SINONIMOS_DB, getKeyDisplay, transposeProgression 
} from './data/musicData';

export default function App() {
  // Estado de Selección de Pilares (Pantalla Inicio)
  const [activePillars, setActivePillars] = useState({
    sentimiento: true,
    objeto: true,
    color: true,
    fecha: true,
    concepto: true,
    tonalidad: true,
    progresion: true,
    genero: true
  });

  const [isLoading, setIsLoading] = useState(false);
  const [scenario, setScenario] = useState(null); // null = Pantalla Inicio
  const [keyState, setKeyState] = useState({ rootIndex: 0, isMinor: false });
  const [bpm, setBpm] = useState(115);
  const [copied, setCopied] = useState(false);

  const togglePillar = (key) => {
    setActivePillars(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const handleGenerate = () => {
    setIsLoading(true);

    setTimeout(() => {
      const sentimiento = activePillars.sentimiento ? getRandom(SENTIMIENTOS) : null;
      const objeto = activePillars.objeto ? getRandom(OBJETOS) : null;
      const color = activePillars.color ? getRandom(COLORES) : null;
      const fecha = activePillars.fecha ? getRandom(FECHAS) : null;
      const concepto = activePillars.concepto ? getRandom(CONCEPTOS) : null;
      const generoObj = activePillars.genero ? getRandom(GENEROS) : GENEROS[0];
      const progresionObj = activePillars.progresion ? getRandom(PROGRESIONES) : PROGRESIONES[1];
      const keyObj = activePillars.tonalidad ? getRandom(INITIAL_KEYS) : INITIAL_KEYS[0];

      setKeyState({ rootIndex: keyObj.rootIndex, isMinor: keyObj.isMinor });
      setBpm(generoObj.defaultBpm);

      // Redacción del escenario con frases fluidas y congruentes para el cantante
      const partGenre = generoObj ? `Propuesta estilística orientada al género ${generoObj.name}.` : '';
      const partCore = (sentimiento && concepto)
        ? `La atmósfera principal transmite una profunda sensación de ${sentimiento}, estructurada bajo el concepto narrativo de ${concepto}.`
        : 'La atmósfera invita a explorar una interpretación vocal íntima y expresiva.';

      const partContext = (objeto || color || fecha)
        ? `La composición se sitúa en un marco donde ${objeto ? `un/a ${objeto}` : 'un elemento clave'} ${color ? `de tonalidad ${color}` : ''} cobra protagonismo, evocando memorias durante ${fecha || 'un momento suspendido en el tiempo'}.`
        : 'El contexto lírico permanece abierto para la libre inspiración libre del autor.';

      setScenario({
        sentimiento,
        objeto,
        color,
        fecha,
        concepto,
        generoObj,
        progresionObj,
        partGenre,
        partCore,
        partContext
      });

      setIsLoading(false);
    }, 600); // Carga fluida de 600ms
  };

  const currentChords = scenario 
    ? transposeProgression(scenario.progresionObj.numerales, keyState.rootIndex, keyState.isMinor)
    : [];

  const copyToClipboard = () => {
    if (!scenario) return;
    const textToCopy = `🎵 SONG OF THE DAY 🎵\n\nESCENARIO:\n${scenario.partGenre}\n${scenario.partCore}\n${scenario.partContext}\n\n• Tonalidad: ${getKeyDisplay(keyState.rootIndex, keyState.isMinor)}\n• Progresión: ${scenario.progresionObj.name} (${currentChords.join(' - ')})\n• Género: ${scenario.generoObj.name} (${bpm} BPM)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 text-slate-800 font-sans p-4 md:p-8 flex flex-col items-center">
      
      {/* Header Fijo */}
      <header className="max-w-2xl w-full text-center my-4">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
          Song of the day
        </h1>
        <p className="text-slate-500 font-medium text-sm mt-1">
          Generador de ideas y maquetas de composición
        </p>
      </header>

      {/* PANTALLA DE CARGA */}
      {isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center my-20 gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="font-bold text-blue-600 animate-pulse text-sm">Mezclando elementos creativos...</p>
        </div>
      )}

      {/* PANTALLA 1: SELECCIÓN DE PILARES (INICIO) */}
      {!isLoading && !scenario && (
        <main className="max-w-xl w-full bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl border border-white flex flex-col gap-6 animate-fade-in my-auto">
          <div>
            <h2 className="text-lg font-black text-slate-800">Selecciona los pilares a aleatorizar</h2>
            <p className="text-xs text-slate-500 mt-0.5">Elige los elementos que quieres incluir en tu propuesta creativa de hoy.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'sentimiento', label: '❤️ Sentimiento' },
              { id: 'objeto', label: '🔍 Objeto' },
              { id: 'color', label: '🎨 Color' },
              { id: 'fecha', label: '📅 Fecha' },
              { id: 'concepto', label: '💡 Concepto' },
              { id: 'tonalidad', label: '🎼 Tonalidad' },
              { id: 'progresion', label: '🎹 Progresión' },
              { id: 'genero', label: '🎸 Género' }
            ].map(pillar => (
              <label 
                key={pillar.id}
                onClick={() => togglePillar(pillar.id)}
                className={`p-3.5 rounded-2xl border font-bold text-xs flex items-center justify-between cursor-pointer transition-all ${
                  activePillars[pillar.id] 
                    ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm' 
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span>{pillar.label}</span>
                <input 
                  type="checkbox" 
                  checked={activePillars[pillar.id]} 
                  onChange={() => {}} 
                  className="accent-blue-600"
                />
              </label>
            ))}
          </div>

          {/* Botón Principal con Outline Gradiente Animado */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={handleGenerate}
              className="relative p-[3px] rounded-2xl group overflow-hidden w-full max-w-sm transition-transform active:scale-95"
            >
              {/* Borde gradiente en movimiento */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 rounded-2xl animate-spin-slow group-hover:opacity-100 opacity-80 transition-opacity" />
              
              <div className="relative px-8 py-4 bg-white rounded-[13px] flex items-center justify-center gap-2 font-black text-blue-600 text-base shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                <span>✨ GENERAR ESCENARIO</span>
              </div>
            </button>
          </div>
        </main>
      )}

      {/* PANTALLA 2: RESULTADOS DE LA GENERACIÓN */}
      {!isLoading && scenario && (
        <main className="max-w-2xl w-full flex flex-col gap-6 animate-fade-in mb-12">
          
          {/* Botón Superior para Regresar */}
          <button
            onClick={() => setScenario(null)}
            className="self-start text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            ← Volver a configurar pilares
          </button>

          {/* Tarjeta de Escenario */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border border-white flex flex-col gap-6">
            
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-200/50 flex flex-col gap-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-blue-600">Escenario</h2>
              <p className="text-base font-semibold text-slate-800 leading-relaxed">{scenario.partGenre}</p>
              <p className="text-base font-medium text-slate-700 leading-relaxed">{scenario.partCore}</p>
              <p className="text-base font-medium text-slate-700 leading-relaxed">{scenario.partContext}</p>
            </div>

            {/* Pilares Usados (Tags) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
              {scenario.sentimiento && <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[9px]">SENTIMIENTO</span>{scenario.sentimiento}</div>}
              {scenario.objeto && <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[9px]">OBJETO</span>{scenario.objeto}</div>}
              {scenario.color && <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[9px]">COLOR</span>{scenario.color}</div>}
              {scenario.fecha && <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[9px]">FECHA</span>{scenario.fecha}</div>}
              {scenario.concepto && <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[9px]">CONCEPTO</span>{scenario.concepto}</div>}
              <div className="bg-slate-100 p-2.5 rounded-xl"><span className="text-slate-400 block text-[9px]">GÉNERO</span>{scenario.generoObj.name}</div>
            </div>

            {/* Transposición de Acordes */}
            <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Tonalidad</span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-black text-slate-800">
                    {getKeyDisplay(keyState.rootIndex, keyState.isMinor)}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => setKeyState(prev => ({ ...prev, rootIndex: (prev.rootIndex + 11) % 12 }))} className="w-7 h-7 bg-slate-100 rounded-lg font-bold text-slate-700 hover:bg-slate-200">-</button>
                    <button onClick={() => setKeyState(prev => ({ ...prev, rootIndex: (prev.rootIndex + 1) % 12 }))} className="w-7 h-7 bg-slate-100 rounded-lg font-bold text-slate-700 hover:bg-slate-200">+</button>
                  </div>
                </div>
              </div>

              <div className="text-right w-full sm:w-auto bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 block">{scenario.progresionObj.name}</span>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  {currentChords.map((chord, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white shadow-sm border border-slate-200 rounded-md text-xs font-bold text-blue-600">
                      {chord}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Engine (Beat + Metrónomo + Sintetizador) */}
            <AudioEngine 
              bpm={bpm} 
              setBpm={setBpm} 
              chords={currentChords} 
              genre={scenario.generoObj.name} 
            />

            {/* Grabadora de Maqueta Voice Notes */}
            <VoiceRecorder />

            {/* Panel de Sinónimos Sugeridos */}
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold uppercase text-slate-400 mb-3">💡 Inspiración Lírica (Sinónimos sugeridos)</h3>
              <div className="flex flex-wrap gap-2">
                {[scenario.sentimiento, scenario.objeto, scenario.concepto].filter(Boolean).map(word => {
                  const syns = SINONIMOS_DB[word] || [];
                  if (syns.length === 0) return null;
                  return (
                    <div key={word} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-xs">
                      <span className="font-bold text-blue-600 capitalize block mb-1">{word}:</span>
                      <span className="text-slate-600">{syns.join(', ')}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botón Copiar */}
            <button
              onClick={copyToClipboard}
              className="w-full py-3 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 font-bold text-xs text-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <span>{copied ? '✓ Escenario copiado' : '📋 Copiar escenario al portapapeles'}</span>
            </button>
          </div>
        </main>
      )}
    </div>
  );
}
