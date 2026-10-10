import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ArrowRight, MapPin } from 'lucide-react';
import { companyDetails, policies, services } from '../data/company';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function About() {
  return (
    <div className="pb-16">
      <section className="bg-[var(--navy)] text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">About Us</p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
            AT Solar Power Solutions
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed">
            Clean Energy | Better Tomorrow — complete solar for homes, businesses and industries in
            Islamabad.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--navy)]">
              Who we are
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We provide complete solar energy solutions for homes, businesses, and industries. Our
              systems are designed for maximum efficiency, durability, and savings. We use
              high-quality components and professional installation to ensure long-term performance.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Led by {companyDetails.owner}, AT Solar focuses on transparent pricing, free site
              visits, and reliable after-sales support — on-grid, hybrid, and off-grid.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 pt-2">
              {policies.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[var(--navy-mid)] mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="relative min-h-[260px] overflow-hidden bg-[var(--navy)]">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
                alt="AT Solar installation work"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/80 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="font-display font-bold text-lg">Islamabad · Bahria Town</p>
                <p className="text-xs text-white/75 mt-1 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  {companyDetails.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-[var(--navy)] mb-8">
            What we offer
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((svc) => (
              <div key={svc.id} className="border-t-2 border-[var(--gold)] pt-4 space-y-2">
                <h3 className="font-display font-bold text-[var(--navy)]">{svc.title}</h3>
                <p className="text-sm text-slate-600">{svc.description}</p>
              </div>
            ))}
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-[var(--navy)]"
          >
            Full services list <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-[var(--gold)] px-6 sm:px-10 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-[var(--navy-deep)]">
              Ready to go solar?
            </h2>
            <p className="text-sm text-[var(--navy-deep)]/80 mt-1">
              Free professional advice — no consultation charges.
            </p>
          </div>
          <a
            href={createWhatsAppLink(
              'Assalam-o-Alaikum AT Solar! I want to know more about your company and book a free site visit.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--navy)] text-white font-bold text-sm px-6 py-3.5"
          >
            <MessageCircle className="w-4 h-4" /> Contact AT Solar
          </a>
        </div>
      </section>
    </div>
  );
}
