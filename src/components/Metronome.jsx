import React, { useState, useEffect, useRef } from 'react';

export default function Metronome() {
  const [bpm, setBpm] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [beat, setBeat] = useState(false);

  const audioCtxRef = useRef(null);
  const timerIdRef = useRef(null);

  const playClick = () => {
    if (isMuted) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);

    setBeat(true);
    setTimeout(() => setBeat(false), 100);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = (60 / bpm) * 1000;
      timerIdRef.current = setInterval(() => {
        playClick();
      }, interval);
    } else {
      clearInterval(timerIdRef.current);
    }

    return () => clearInterval(timerIdRef.current);
  }, [isPlaying, bpm, isMuted]);

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-blue-500/5 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className={`w-4 h-4 rounded-full transition-all duration-100 ${beat ? 'bg-blue-600 scale-125 shadow-lg shadow-blue-500/50' : 'bg-slate-300'}`} />
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Metrónomo</h3>
          <p className="text-2xl font-black text-slate-800">{bpm} <span className="text-sm font-medium text-slate-500">BPM</span></p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-xs flex items-center gap-3">
        <span className="text-xs font-bold text-slate-400">60</span>
        <input 
          type="range" 
          min="60" 
          max="150" 
          value={bpm} 
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <span className="text-xs font-bold text-slate-400">150</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-md ${
            isPlaying 
              ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
          }`}
        >
          {isPlaying ? 'Detener' : 'Iniciar'}
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-2.5 rounded-2xl border font-semibold text-sm transition-all ${
            isMuted 
              ? 'bg-slate-200 border-slate-300 text-slate-600' 
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
          title={isMuted ? 'Quitar silencio' : 'Silenciar'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
}
