import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function WhatsAppButton() {
  const url = createWhatsAppLink(
    'Assalam-o-Alaikum AT Solar Power Solutions! I want a free site visit and solar quotation.',
  );

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 group">
      <div className="hidden sm:block bg-[var(--navy)] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
        Chat with AT Solar
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform ring-4 ring-emerald-500/30"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--gold)] rounded-full animate-ping motion-reduce:animate-none" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--gold)] rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-white stroke-emerald-600" />
      </a>
    </div>
  );
}
