export function shareToVoiceMemos(blob, filename = 'Idea_SOTD.wav') {
  const file = new File([blob], filename, { type: 'audio/wav' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    navigator.share({
      files: [file],
      title: 'Exportar Idea / Maqueta',
      text: 'Guardar en Notas de Voz / Notas'
    });
  } else {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
}
