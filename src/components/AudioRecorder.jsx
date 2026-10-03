import React, { useState, useRef } from 'react';
import { Mic, Square, Share2 } from 'lucide-react';
import { shareToVoiceMemos } from '../utils/audioExporter';

export const AudioRecorder = ({ label = 'Grabar idea' }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error al acceder al micrófono:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
      {!isRecording ? (
        <button
          onClick={startRecording}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition"
        >
          <Mic className="w-4 h-4" />
          {label}
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg animate-pulse"
        >
          <Square className="w-4 h-4 text-red-400" />
          Detener
        </button>
      )}

      {audioBlob && (
        <button
          onClick={() => shareToVoiceMemos(audioBlob)}
          className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition"
        >
          <Share2 className="w-4 h-4" />
          Exportar a Notas de Voz / Notas
        </button>
      )}
    </div>
  );
};
