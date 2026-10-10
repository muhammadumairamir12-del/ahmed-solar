import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  X,
  RotateCcw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  Sun,
  MessageSquare,
  Calculator,
  UserCheck,
} from 'lucide-react';
import { sendChatMessage } from '../../services/assistantApi';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useSpeechSynthesis } from './useSpeechSynthesis';
import VoiceControls from './VoiceControls';
import LeadCaptureCard from './LeadCaptureCard';
import { createWhatsAppLink } from '../../utils/whatsapp';

const QUICK_SUGGESTIONS = [
  { label: 'Get a Solar Quote', prompt: 'I want a preliminary solar quote for my home. What details do you need?' },
  { label: 'Find the Right System', prompt: 'How do I choose between 5kW, 7kW, and 10kW systems for Islamabad?' },
  { label: 'Solar Panel Info', prompt: 'Which Tier-1 solar panels do you provide and what are their warranties?' },
  { label: 'Inverter & Battery Options', prompt: 'What hybrid inverters and lithium batteries do you recommend?' },
  { label: 'Installation Services', prompt: 'What is included in AT Solar complete installation and net metering service?' },
  { label: 'Contact Our Team', prompt: 'What are AT Solar office address, phone number, and working hours?' },
];

/**
 * Format markdown text (bold, bullet points, headers) for chat bubbles
 */
function FormattedMessage({ text }) {
  if (!text) return null;

  // Split lines
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed text-[13px]">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header ###
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-bold text-white text-sm pt-1 border-b border-white/10 pb-0.5">
              {trimmed.replace(/^###\s+/, '')}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="font-black text-[var(--gold)] text-sm pt-1">
              {trimmed.replace(/^##\s+/, '')}
            </h3>
          );
        }

        // Bullet point
        const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
        const cleanLine = isBullet ? trimmed.replace(/^[*•-]\s+/, '') : trimmed;

        // Parse bold **text**
        const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
        const parsedContent = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="font-bold text-[var(--gold-soft)]">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[var(--gold)] text-xs mt-1">•</span>
              <span className="flex-1">{parsedContent}</span>
            </div>
          );
        }

        return <p key={idx}>{parsedContent}</p>;
      })}
    </div>
  );
}

export default function AhmedAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      role: 'assistant',
      text: 'Assalam-o-Alaikum! I am **Ahmed Assistant**, the AI solar advisor for **AT Solar Power Solutions** in Islamabad.\n\nI can help you calculate estimated system sizing, compare Tier-1 panels & hybrid inverters, guide you on IESCO Net Metering, and schedule a **100% free site survey** across the Twin Cities.\n\nHow can I help power your home or business today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Text to speech
  const { isSupported: isTtsSupported, speakingId, isSpeaking, speak, stop: stopTts } = useSpeechSynthesis();

  // Speech to text
  const {
    isListening,
    transcript,
    errorMessage: voiceError,
    currentLang,
    setCurrentLang,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    onResult: (text) => {
      setInputValue(text);
    },
  });

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isLoading]);

  // Handle send message
  const handleSendMessage = useCallback(async (textToSend = inputValue) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    if (isListening) {
      stopListening();
    }
    stopTts();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    resetTranscript();
    setIsLoading(true);

    // Call backend API
    const historyPayload = newMessages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      text: m.text,
    }));

    const result = await sendChatMessage(trimmed, historyPayload);
    setIsLoading(false);

    const assistantMsg = {
      id: `ast-${Date.now()}`,
      role: 'assistant',
      text: result.reply,
      toolExecuted: result.toolExecuted,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, assistantMsg]);

    // If estimate was calculated, suggest opening the lead form
    if (result.toolExecuted?.name === 'calculateSolarEstimate') {
      setShowLeadForm(true);
    }
  }, [inputValue, isLoading, isListening, messages, resetTranscript, stopListening, stopTts]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    stopTts();
    stopListening();
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        text: 'Assalam-o-Alaikum! Conversation cleared. How can I assist you with AT Solar solutions today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setShowClearConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-modal-title"
      className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[60] w-full sm:w-[440px] md:w-[480px] h-[100dvh] sm:h-[660px] max-h-[100dvh] sm:max-h-[85vh] flex flex-col bg-[var(--navy-deep)] text-slate-100 rounded-none sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all animate-drawer-in"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--navy-deep)] via-[var(--navy)] to-[var(--navy-mid)] p-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-deep)] flex items-center justify-center text-[var(--navy-deep)] font-black shadow-lg">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[var(--navy-deep)]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 id="assistant-modal-title" className="font-display font-extrabold text-sm text-white">
                Ahmed Assistant
              </h2>
              <span className="text-[10px] bg-[var(--gold)]/20 text-[var(--gold-soft)] font-bold px-1.5 py-0.5 rounded border border-[var(--gold)]/30">
                AI Solar Advisor
              </span>
            </div>
            <p className="text-[11px] text-slate-300 flex items-center gap-1">
              <span>AT Solar Power Solutions • Islamabad</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowClearConfirm(true)}
            aria-label="Clear chat conversation"
            title="Clear Chat History"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="Minimize Ahmed Assistant"
            title="Minimize Chat"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Clear Confirmation Banner */}
      {showClearConfirm && (
        <div className="bg-rose-950/95 border-b border-rose-500/40 p-3 flex items-center justify-between text-xs text-rose-200 animate-fade-in shrink-0">
          <span>Clear this conversation history?</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-2.5 py-1 rounded-lg text-xs"
            >
              Yes, Clear
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="text-slate-300 hover:text-white px-2 py-1 text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-[var(--navy-deep)]/90 backdrop-blur-sm">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fade-up`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[84%] rounded-2xl p-3.5 shadow-md relative group ${
                  isUser
                    ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-br-sm'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-sm'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-white/10 text-[10px] text-slate-400">
                    <span className="font-bold text-[var(--gold)] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[var(--gold)]" /> Ahmed Assistant
                    </span>
                    <div className="flex items-center gap-1">
                      {/* Audio playback button */}
                      {isTtsSupported && (
                        <button
                          onClick={() => speak(msg.id, msg.text)}
                          title={speakingId === msg.id && isSpeaking ? 'Stop audio' : 'Listen in Urdu/English'}
                          className="p-1 hover:text-white rounded hover:bg-white/10 transition-colors"
                        >
                          {speakingId === msg.id && isSpeaking ? (
                            <VolumeX className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                      {/* Copy message button */}
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        title="Copy message"
                        className="p-1 hover:text-white rounded hover:bg-white/10 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <FormattedMessage text={msg.text} />

                {/* Structured Estimate Card if returned from tool */}
                {msg.toolExecuted?.name === 'calculateSolarEstimate' && msg.toolExecuted.data?.result && (
                  <div className="mt-3 pt-2.5 border-t border-slate-700/60 bg-blue-950/40 p-3 rounded-xl space-y-1.5 text-[11px]">
                    <div className="font-bold text-sky-300 flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5" /> Quick Sizing Summary
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-300 pt-1">
                      <div>Recommended Size: <strong className="text-white">{msg.toolExecuted.data.result.recommendedKw} kW</strong></div>
                      <div>Panels: <strong className="text-white">{msg.toolExecuted.data.result.panelsCount} Pieces</strong></div>
                      <div>Turnkey Cost: <strong className="text-emerald-400">{msg.toolExecuted.data.result.estimatedCostRange.display}</strong></div>
                      <div>Yearly Savings: <strong className="text-[var(--gold)]">{msg.toolExecuted.data.result.estimatedYearlySavings.display}</strong></div>
                    </div>
                  </div>
                )}

                <div
                  className={`text-[9px] mt-1 text-right ${
                    isUser ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 bg-slate-900/60 border border-slate-800 p-3 rounded-2xl max-w-[180px] animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] font-medium text-slate-300 ml-1">Analyzing...</span>
          </div>
        )}

        {/* Lead Capture Modal / Card if triggered */}
        {showLeadForm && (
          <div className="pt-2 animate-fade-in">
            <LeadCaptureCard
              onClose={() => setShowLeadForm(false)}
              onSubmitted={(lead) => {
                setMessages(prev => [
                  ...prev,
                  {
                    id: `ast-lead-${Date.now()}`,
                    role: 'assistant',
                    text: `✅ Free Site Visit inquiry booked for **${lead.name}** in ${lead.city} for **${lead.systemSize}**! Our senior solar consultant will call/WhatsApp you shortly.`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-3 py-2 bg-[var(--navy)]/80 border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
        <button
          onClick={() => setShowLeadForm(prev => !prev)}
          className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--gold-deep)] text-[var(--navy-deep)] font-extrabold text-[11px] shrink-0 shadow-sm hover:brightness-110 transition-all flex items-center gap-1"
        >
          <UserCheck className="w-3.5 h-3.5" /> Book Free Site Visit
        </button>
        {QUICK_SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 text-[11px] font-medium transition-colors shrink-0"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[var(--navy-deep)] border-t border-white/10 shrink-0 space-y-2">
        <VoiceControls
          isListening={isListening}
          currentLang={currentLang}
          onChangeLang={setCurrentLang}
          onStart={() => startListening(currentLang)}
          onStop={stopListening}
          transcript={transcript}
          errorMessage={voiceError}
        />

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-2xl px-3 py-1.5 focus-within:border-[var(--gold)] transition-colors shadow-inner">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              currentLang === 'ur-PK'
                ? 'اپنا سوال اردو، انگلش یا رومن میں پوچھیں...'
                : 'Ask in English, Urdu, or Roman Urdu...'
            }
            className="flex-1 bg-transparent text-white text-xs placeholder-slate-500 focus:outline-none py-1.5"
            disabled={isLoading}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
            className="p-2 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--gold-deep)] text-[var(--navy-deep)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Footnote */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-0.5">
          <span>AT Solar Islamabad • Bahria Town Phase 6</span>
          <a
            href={createWhatsAppLink("Assalam-o-Alaikum AT Solar! I have a question regarding solar installation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline font-bold flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3" /> WhatsApp: 0330 0002629
          </a>
        </div>
      </div>
    </div>
  );
}
