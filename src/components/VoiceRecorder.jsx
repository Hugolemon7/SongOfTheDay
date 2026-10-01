import React, { useState, useRef } from 'react';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert('Permiso de micrófono denegado o no disponible.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Apagar micrófono
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">🎙️ Grabadora de Ideas Rápidas</span>
        {isRecording && <span className="text-xs font-bold text-rose-500 animate-pulse">● Grabando audio...</span>}
      </div>

      <div className="flex items-center gap-3">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            ● Grabar Maqueta
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-slate-800 hover:bg-black text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            ⏹ Detener
          </button>
        )}

        {audioUrl && (
          <div className="flex items-center gap-2 flex-1">
            <audio src={audioUrl} controls className="h-8 w-full max-w-xs" />
            <a 
              href={audioUrl} 
              download="song-idea-sketch.webm" 
              className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Exportar
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
