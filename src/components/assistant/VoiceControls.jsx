import React from 'react';
import { Mic, MicOff, Square, Globe } from 'lucide-react';

export default function VoiceControls({
  isListening,
  currentLang,
  onChangeLang,
  onStart,
  onStop,
  transcript,
  errorMessage,
}) {
  return (
    <div className="relative">
      {/* Listening Banner */}
      {isListening && (
        <div className="mb-2 bg-blue-950/90 border border-blue-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs text-blue-200 animate-fade-in shadow-lg">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="font-semibold text-white">
              Listening ({currentLang === 'ur-PK' ? 'اردو' : 'English'})...
            </span>
            {transcript && (
              <span className="italic text-slate-300 truncate max-w-[180px]">
                "{transcript}"
              </span>
            )}
          </div>
          <button
            onClick={onStop}
            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition-colors"
          >
            <Square className="w-3 h-3 fill-white" /> Stop
          </button>
        </div>
      )}

      {/* Error alert if mic denied or failed */}
      {errorMessage && (
        <div className="mb-2 bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px] p-2 rounded-xl">
          {errorMessage}
        </div>
      )}

      <div className="flex items-center gap-1.5">
        {/* Language selector toggle */}
        <button
          type="button"
          onClick={() => onChangeLang(currentLang === 'ur-PK' ? 'en-US' : 'ur-PK')}
          title={`Switch Voice Language (Current: ${currentLang === 'ur-PK' ? 'Urdu' : 'English'})`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--gold)] hover:bg-white/5 text-[11px] font-bold flex items-center gap-1 transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{currentLang === 'ur-PK' ? 'UR' : 'EN'}</span>
        </button>

        {/* Microphone Button */}
        <button
          type="button"
          onClick={isListening ? onStop : onStart}
          aria-label={isListening ? 'Stop recording voice' : 'Start recording voice'}
          title={isListening ? 'Click to finish speaking' : 'Click to speak in Urdu or English'}
          className={`p-2 rounded-xl transition-all ${
            isListening
              ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-[var(--gold)] hover:bg-white/10'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
