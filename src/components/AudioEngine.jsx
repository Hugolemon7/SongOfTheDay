import React, { useState, useEffect, useRef } from 'react';
import { NOTE_FREQUENCIES } from '../data/musicData';

export default function AudioEngine({ bpm, setBpm, chords, genre }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muteClick, setMuteClick] = useState(false);
  const [muteDrums, setMuteDrums] = useState(false);
  const [muteChords, setMuteChords] = useState(false);
  const [step, setStep] = useState(0);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const stepRef = useRef(0);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Sonido de Metrónomo
  const triggerClick = (ctx, isFirstBeat) => {
    if (muteClick) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(isFirstBeat ? 1200 : 800, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  };

  // Batería sintetizada por género (Kick, Snare, HiHat)
  const triggerDrums = (ctx, currentStep) => {
    if (muteDrums) return;

    const isKick = currentStep === 0 || currentStep === 8 || (genre === 'Punk' && currentStep % 4 === 0);
    const isSnare = currentStep === 4 || currentStep === 12;
    const isHiHat = currentStep % 2 === 0;

    // Kick
    if (isKick) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(130, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }

    // Snare
    if (isSnare) {
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < ctx.sampleRate * 0.1; i++) output[i] = Math.random() * 2 - 1;
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();
    }

    // HiHat
    if (isHiHat) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(8000, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    }
  };

  // Reproductor de Acordes Synth Pad
  const triggerChord = (ctx, chordName) => {
    if (muteChords || !chordName) return;

    const rootNote = chordName.replace('m', '').replace('°', '');
    const isMinor = chordName.includes('m');
    const baseFreq = NOTE_FREQUENCIES[rootNote] || 261.63;

    // Tríada: Tónica, Tercera (mayor/menor), Quinta
    const thirdMult = isMinor ? 1.1892 : 1.2599; // 3 semitonos vs 4 semitonos
    const fifthMult = 1.4983; // 7 semitonos

    const freqs = [baseFreq, baseFreq * thirdMult, baseFreq * fifthMult];

    freqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    });
  };

  useEffect(() => {
    if (isPlaying) {
      const sixteenthInterval = ((60 / bpm) * 1000) / 4;

      timerRef.current = setInterval(() => {
        initAudio();
        const ctx = audioCtxRef.current;
        const currentS = stepRef.current;

        // Pulso de click por beat (cada 4 dieciseisavos)
        if (currentS % 4 === 0) {
          triggerClick(ctx, currentS === 0);
        }

        // Batería por semicorchea
        triggerDrums(ctx, currentS);

        // Cambio de Acorde en cada compás/beat
        if (chords.length > 0 && currentS % 4 === 0) {
          const chordIdx = Math.floor(currentS / 4) % chords.length;
          triggerChord(ctx, chords[chordIdx]);
        }

        setStep(currentS);
        stepRef.current = (currentS + 1) % 16;
      }, sixteenthInterval);
    } else {
      clearInterval(timerRef.current);
      stepRef.current = 0;
      setStep(0);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, bpm, muteClick, muteDrums, muteChords, chords, genre]);

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-slate-200/80 flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Play/Stop & Tempo Control */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => { initAudio(); setIsPlaying(!isPlaying); }}
            className={`w-14 h-14 rounded-2xl font-black text-xl flex items-center justify-center transition-all shadow-md ${
              isPlaying ? 'bg-rose-500 text-white shadow-rose-500/30' : 'bg-blue-600 text-white shadow-blue-500/30 hover:scale-105'
            }`}
          >
            {isPlaying ? '⏹' : '▶'}
          </button>
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase">Tempo Sugerido</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-800">{bpm}</span>
              <span className="text-xs font-bold text-slate-500">BPM</span>
              
              {/* Ajuste de BPM en intervalos de 5 en 5 */}
              <div className="flex gap-1 ml-2">
                <button 
                  onClick={() => setBpm(prev => Math.max(60, prev - 5))}
                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold text-sm"
                >
                  -
                </button>
                <button 
                  onClick={() => setBpm(prev => Math.min(180, prev + 5))}
                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador visual de Beat */}
        <div className="flex gap-1">
          {[0, 4, 8, 12].map((bIdx) => (
            <div 
              key={bIdx} 
              className={`w-3 h-3 rounded-full transition-colors ${
                isPlaying && step >= bIdx && step < bIdx + 4 ? 'bg-blue-600 scale-110' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Toggles Mute Individuales */}
      <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
        <button
          onClick={() => setMuteClick(!muteClick)}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
            muteClick ? 'bg-slate-100 border-slate-200 text-slate-400 line-through' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}
        >
          ⏱️ Metrónomo
        </button>

        <button
          onClick={() => setMuteDrums(!muteDrums)}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
            muteDrums ? 'bg-slate-100 border-slate-200 text-slate-400 line-through' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}
        >
          🥁 Beat ({genre})
        </button>

        <button
          onClick={() => setMuteChords(!muteChords)}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
            muteChords ? 'bg-slate-100 border-slate-200 text-slate-400 line-through' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}
        >
          🎹 Acordes
        </button>
      </div>
    </div>
  );
}
