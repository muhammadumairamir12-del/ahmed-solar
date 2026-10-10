import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function FAQ() {
  const { faqs } = useApp();
  const [openId, setOpenId] = useState('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3.5 py-1.5 rounded-full">
          <HelpCircle className="w-4 h-4 text-blue-600" /> Common Questions
        </span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-sm">
          Everything you need to know about solar installation time, warranties, net-metering, and SBP bank financing.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          placeholder="Search question or keyword (e.g., warranty, net metering, timeline)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full px-6 py-5 text-left font-bold text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
              >
                <span className="text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp Help CTA */}
      <div className="bg-gradient-to-r from-blue-900 to-sky-900 rounded-2xl p-6 text-white text-center space-y-3">
        <h3 className="font-bold text-lg">Still have questions?</h3>
        <p className="text-xs text-blue-100">Contact AT Solar on WhatsApp for technical advice and instant estimations.</p>
        <a
          href={createWhatsAppLink("Assalam-o-Alaikum AT Solar! I have a question regarding solar installation.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
        >
          <MessageSquare className="w-4 h-4 fill-slate-900" /> Ask On WhatsApp
        </a>
      </div>

    </div>
  );
}
