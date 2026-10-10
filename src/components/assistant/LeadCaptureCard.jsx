import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Phone, ShieldCheck, X } from 'lucide-react';
import { submitCustomerLead } from '../../services/assistantApi';
import { createWhatsAppLink } from '../../utils/whatsapp';

export default function LeadCaptureCard({ initialSystemSize = '', onClose, onSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Islamabad',
    propertyType: 'residential',
    monthlyBill: '',
    systemSize: initialSystemSize || '7KW Complete Setup',
    preferredContact: 'WhatsApp',
    consentGiven: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.consentGiven) {
      setErrorMsg('Please confirm your consent before submitting your details.');
      return;
    }

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your contact number.');
      return;
    }

    setLoading(true);
    const result = await submitCustomerLead({
      ...formData,
      notes: `Submitted via Ahmed Assistant widget. System: ${formData.systemSize}, Bill: ${formData.monthlyBill}`,
    });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      if (onSubmitted) {
        onSubmitted({
          ...formData,
          leadId: result.leadId,
        });
      }
    } else {
      setErrorMsg(result.error || 'Failed to submit. Please try contacting on WhatsApp.');
    }
  };

  if (success) {
    const waMsg = `Assalam-o-Alaikum AT Solar! I just booked a free site survey on your website.\nName: ${formData.name}\nCity: ${formData.city}\nSystem: ${formData.systemSize}\nPhone: ${formData.phone}`;
    return (
      <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-2xl p-5 text-white space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Inquiry Submitted Successfully!</span>
        </div>
        <p className="text-xs text-emerald-200/90 leading-relaxed">
          Thank you, <strong>{formData.name}</strong>! AT Solar Power Solutions will review your requirements and reach out to you via {formData.preferredContact}.
        </p>
        <div className="pt-2 flex flex-wrap gap-2">
          <a
            href={createWhatsAppLink(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md"
          >
            <Phone className="w-3.5 h-3.5" /> Instant WhatsApp Connect
          </a>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs text-emerald-300 hover:text-white px-3 py-2 rounded-xl border border-emerald-500/30"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/95 border border-[var(--gold)]/30 rounded-2xl p-4 sm:p-5 text-white shadow-2xl relative">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--gold)] block">
            Official Consultation
          </span>
          <h4 className="text-sm font-bold text-white">Book Free Site Survey & Quotation</h4>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        {errorMsg && (
          <div className="bg-rose-950/80 border border-rose-500/40 text-rose-300 p-2.5 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tariq Mehmood"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--gold)]"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
              Contact / WhatsApp *
            </label>
            <input
              type="tel"
              required
              placeholder="0330 0002629"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--gold)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
              City / Sector
            </label>
            <input
              type="text"
              placeholder="Islamabad / Rawalpindi"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--gold)]"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-300 font-semibold block mb-1">
              Avg. Monthly Bill (PKR)
            </label>
            <input
              type="text"
              placeholder="e.g. 50,000"
              value={formData.monthlyBill}
              onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--gold)]"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-1">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
            <input
              type="radio"
              name="propertyType"
              checked={formData.propertyType === 'residential'}
              onChange={() => setFormData({ ...formData, propertyType: 'residential' })}
              className="accent-[var(--gold)]"
            />
            <span>Residential</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
            <input
              type="radio"
              name="propertyType"
              checked={formData.propertyType === 'commercial'}
              onChange={() => setFormData({ ...formData, propertyType: 'commercial' })}
              className="accent-[var(--gold)]"
            />
            <span>Commercial</span>
          </label>
        </div>

        {/* Customer consent checkbox */}
        <label className="flex items-start gap-2 pt-1 text-[11px] text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={formData.consentGiven}
            onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
            className="mt-0.5 accent-[var(--gold)] rounded"
          />
          <span>
            I consent to AT Solar Power Solutions contacting me regarding this solar quotation and site survey.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[var(--gold-deep)] via-[var(--gold)] to-[var(--gold-soft)] hover:brightness-110 active:scale-98 text-[var(--navy-deep)] font-extrabold py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-pulse">Submitting Request...</span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Submit for Free Site Survey</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
