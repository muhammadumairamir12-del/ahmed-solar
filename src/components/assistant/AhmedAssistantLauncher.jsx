import React, { useState } from 'react';
import { Sparkles, Sun, X } from 'lucide-react';
import AhmedAssistantModal from './AhmedAssistantModal';

export default function AhmedAssistantLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const handleToggle = () => {
    setIsOpen(prev => {
      const next = !prev;
      if (next) setHasUnread(false);
      return next;
    });
  };

  return (
    <>
      {/* Floating launcher fixed on bottom-right corner (stacked above WhatsApp button) */}
      <div className="fixed bottom-36 right-4 sm:bottom-24 sm:right-6 z-50 flex items-center gap-2 group select-none">
        {/* Label badge on hover (desktop) */}
        <div className="hidden sm:block bg-[var(--navy-deep)] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none border border-[var(--gold)]/30 backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-[var(--gold)]">
            <Sparkles className="w-3.5 h-3.5" /> Ahmed Assistant
          </span>
        </div>

        {/* Circular Avatar Button */}
        <button
          onClick={handleToggle}
          aria-label={isOpen ? 'Close Ahmed Assistant' : 'Open Ahmed Assistant (AI Solar Advisor)'}
          title="Chat with Ahmed Assistant (AI Solar Advisor)"
          className="relative w-14 h-14 bg-gradient-to-br from-[var(--navy-deep)] via-[var(--navy)] to-[var(--navy-mid)] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform ring-4 ring-[var(--gold)]/40 border-2 border-[var(--gold)] cursor-pointer"
        >
          {/* Subtle spinning solar halo */}
          <span className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--gold)]/30 animate-spin-slow pointer-events-none" />

          {/* Unread notification ping */}
          {hasUnread && !isOpen && (
            <>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full animate-ping motion-reduce:animate-none" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white" />
            </>
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-[var(--gold)] transition-transform duration-200" />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <Sun className="w-6 h-6 text-[var(--gold)]" />
              <span className="text-[8px] font-black uppercase tracking-tighter text-[var(--gold-soft)] leading-none mt-0.5">
                AI
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Main Chat Panel */}
      <AhmedAssistantModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
