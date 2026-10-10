import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, Clock, Share2 } from 'lucide-react';
import { companyDetails } from '../data/company';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Islamabad',
    systemSize: '7kW Hybrid Complete',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Assalam-o-Alaikum AT Solar Power Solutions! Contact form inquiry:
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
🏙️ City: ${formData.city}
⚡ Interested Capacity: ${formData.systemSize}
📝 Message: ${formData.message}`;

    window.open(createWhatsAppLink(msg), '_blank');
    setSent(true);
  };

  return (
    <div className="pb-16">
      <section className="bg-[var(--navy)] text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Contact</p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
            Get a free site visit
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed">
            Call, WhatsApp, or send a message — professional advice with no consultation charges.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6 bg-[var(--navy)] p-8 text-white">
            <h2 className="font-display text-2xl font-extrabold">AT Solar Power Solutions</h2>
            <p className="text-xs text-white/70 leading-relaxed">
              Office open 6 days a week for consultations and site surveys across Islamabad.
            </p>

            <div className="space-y-5 pt-2 text-sm">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">
                    Address
                  </span>
                  <p className="font-semibold text-white/95">{companyDetails.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[var(--gold)] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">
                    Phone & WhatsApp
                  </span>
                  <a
                    href={`tel:${companyDetails.whatsapp}`}
                    className="font-semibold text-white hover:text-[var(--gold)]"
                  >
                    {companyDetails.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">
                    Email
                  </span>
                  <a
                    href={`mailto:${companyDetails.email}`}
                    className="font-semibold text-white/95 hover:text-[var(--gold)] break-all"
                  >
                    {companyDetails.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-[var(--gold)] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">
                    Hours
                  </span>
                  <p className="font-semibold text-white/95">{companyDetails.hours}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <a
                href={createWhatsAppLink(
                  'Assalam-o-Alaikum AT Solar! I want a free site visit.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm py-3.5 transition-colors"
              >
                <MessageSquare className="w-5 h-5" /> WhatsApp Chat
              </a>
              <a
                href={companyDetails.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-white/25 hover:border-[var(--gold)] hover:text-[var(--gold)] text-white font-semibold text-sm py-3 transition-colors"
              >
                <Share2 className="w-4 h-4" /> Facebook Page
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-8 border border-slate-200 space-y-6">
            <h2 className="font-display text-2xl font-bold text-[var(--navy)]">Send a message</h2>

            {sent ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                <h3 className="font-display text-2xl font-bold text-[var(--navy)]">
                  Opening WhatsApp…
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you! Our team will reply shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
                      placeholder="03XX XXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      City / area *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
                      placeholder="e.g. Bahria Town, Islamabad"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      System size
                    </label>
                    <select
                      value={formData.systemSize}
                      onChange={(e) => setFormData({ ...formData, systemSize: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
                    >
                      <option value="5kW Hybrid">5KW Hybrid</option>
                      <option value="7kW Hybrid Complete">7KW Complete Setup</option>
                      <option value="10kW Hybrid">10KW Hybrid</option>
                      <option value="15kW Commercial">15KW Commercial</option>
                      <option value="Custom / Site Survey">Custom / Site Survey</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
                    placeholder="Rooftop size, monthly bill, or preferred package..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[var(--navy)] hover:bg-[var(--navy-mid)] text-white font-bold text-sm py-4 transition-colors"
                >
                  <Send className="w-4 h-4" /> Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[var(--navy)] font-bold text-sm">
            <MapPin className="w-5 h-5 text-[var(--gold)]" />
            {companyDetails.address}
          </div>
          <div className="w-full h-72 border border-slate-200 overflow-hidden bg-slate-100">
            <iframe
              title="AT Solar location map"
              src={companyDetails.mapEmbed}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
