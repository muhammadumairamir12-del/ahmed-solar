import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for browser-native speech recognition with multilingual support.
 * Requests microphone permission ONLY when startListening() is invoked.
 */
export function useSpeechRecognition({ onResult, onError } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentLang, setCurrentLang] = useState('ur-PK'); // Default to Urdu (or en-US)
  const recognitionRef = useRef(null);

  const isSupported = typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop error if already stopped
      }
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback((lang = currentLang) => {
    setErrorMessage(null);
    if (!isSupported) {
      const err = 'Voice recognition is not supported in this browser. Please try Chrome, Edge, or Safari.';
      setErrorMessage(err);
      if (onError) onError(err);
      return;
    }

    // Stop existing instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setErrorMessage(null);
    };

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
      if (onResult) {
        onResult(currentTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      let friendlyError = 'Speech recognition error. Please try again.';
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        friendlyError = 'Microphone permission was denied. Please allow microphone access in your browser settings.';
      } else if (event.error === 'no-speech') {
        friendlyError = 'No speech was detected. Please try speaking again.';
      } else if (event.error === 'network') {
        friendlyError = 'Network error during speech recognition.';
      }
      setErrorMessage(friendlyError);
      setIsListening(false);
      if (onError) onError(friendlyError);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      setErrorMessage('Could not access microphone: ' + e.message);
      setIsListening(false);
    }
  }, [currentLang, isSupported, onError, onResult]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    errorMessage,
    currentLang,
    setCurrentLang,
    startListening,
    stopListening,
    resetTranscript: () => setTranscript(''),
  };
}
