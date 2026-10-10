import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Clean markdown symbols for natural text-to-speech reading
 */
function cleanMarkdownForSpeech(text) {
  if (!text) return '';
  return text
    .replace(/[*_#`~>]/g, '') // remove markdown markers
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // remove links, keep text
    .replace(/[-•]\s+/g, ', ') // replace bullets with breath pause
    .replace(/\n+/g, '. ') // replace newlines with period pause
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Detect script/language from text snippet
 */
function detectTextLanguage(text) {
  if (!text) return 'en-US';
  // Urdu / Arabic unicode range: 0600-06FF
  const hasUrduArabic = /[\u0600-\u06FF]/.test(text);
  if (hasUrduArabic) return 'ur-PK';
  // Devanagari range: 0900-097F
  const hasHindi = /[\u0900-\u097F]/.test(text);
  if (hasHindi) return 'hi-IN';
  return 'en-US';
}

export function useSpeechSynthesis() {
  const [speakingId, setSpeakingId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback((messageId, rawText) => {
    if (!isSupported) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    // Toggle off if currently speaking the exact same message
    if (speakingId === messageId && isSpeaking) {
      stop();
      return;
    }

    window.speechSynthesis.cancel(); // cancel any active utterance

    const cleanText = cleanMarkdownForSpeech(rawText);
    if (!cleanText) return;

    const lang = detectTextLanguage(rawText);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;
    utterance.lang = lang;
    utterance.rate = 0.95; // slightly measured for clarity
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(lang.slice(0, 2)));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      setSpeakingId(messageId);
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setSpeakingId(null);
      setIsSpeaking(false);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      setSpeakingId(null);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, isSupported, speakingId, stop]);

  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  return {
    isSupported,
    speakingId,
    isSpeaking,
    speak,
    stop,
  };
}
