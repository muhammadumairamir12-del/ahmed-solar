import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, Package } from 'lucide-react';
import { packages, companyDetails } from '../data/company';
import { createWhatsAppLink } from '../utils/whatsapp';
import { useMotionPrefs } from '../hooks/useMotionPrefs';

export default function Packages() {
  const [activeId, setActiveId] = useState(
    packages.find((p) => p.highlight)?.id || packages[0]?.id,
  );
  const active = packages.find((p) => p.id === activeId) || packages[0];
  const { duration, stagger, y } = useMotionPrefs();

  const fadeUp = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerParent = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  return (
    <div className="pb-16">
      <section className="bg-[var(--navy)] text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Packages</p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
            Complete solar system packages
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed">
            Ready setups from 5KW to 15KW — panels, inverter, battery, structure, cabling and
            installation kit. Transparent pricing, free site visit.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setActiveId(pkg.id)}
              className={`px-4 py-2.5 text-sm font-bold transition-colors ${
                activeId === pkg.id
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-white text-[var(--navy)] border border-slate-200 hover:border-[var(--navy)]'
              }`}
            >
              {pkg.capacity}
              {pkg.highlight ? (
                <span className="ml-2 text-[10px] uppercase tracking-wide text-[var(--gold)]">
                  Best
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      {active && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--navy-mid)]">
                <Package className="w-4 h-4" /> {active.badge}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--navy)] leading-tight">
                {active.name}
              </h2>
              <p className="text-slate-600 leading-relaxed">{active.summary}</p>
              <p className="font-display text-5xl font-extrabold text-[var(--gold)] drop-shadow-sm">
                <span className="text-[var(--navy)]">{active.capacity}</span>
              </p>
              <a
                href={createWhatsAppLink(
                  `Assalam-o-Alaikum AT Solar! I want a quotation for the ${active.name} (${active.capacity}).`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-[var(--navy-deep)] font-bold text-sm px-6 py-3.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Get package quote
              </a>
              <p className="text-xs text-slate-500">
                Or call {companyDetails.phone} · Free site visit available
              </p>
            </div>

            <div className="lg:col-span-7">
              <h3 className="font-display font-bold text-[var(--navy)] mb-4 text-lg">
                Equipment included
              </h3>
              <motion.ul
                className="grid sm:grid-cols-2 gap-3"
                variants={staggerParent}
                initial="hidden"
                animate="show"
              >
                {active.equipment.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={fadeUp}
                    className="flex items-start gap-3 bg-white border border-slate-200 p-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[var(--navy-mid)] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-[var(--navy)]">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.qty}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </section>
      )}

      <section className="bg-[var(--paper)] border-y border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-[var(--navy)] mb-8">
            Compare packages
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => {
                  setActiveId(pkg.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left p-5 border transition-colors ${
                  pkg.highlight
                    ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                    : 'bg-white border-slate-200 hover:border-[var(--navy)]'
                }`}
              >
                <p
                  className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                    pkg.highlight ? 'text-[var(--gold)]' : 'text-[var(--navy-mid)]'
                  }`}
                >
                  {pkg.badge}
                </p>
                <p
                  className={`font-display text-2xl font-extrabold ${
                    pkg.highlight ? 'text-[var(--gold)]' : 'text-[var(--navy)]'
                  }`}
                >
                  {pkg.capacity}
                </p>
                <p
                  className={`text-sm font-semibold mt-1 ${
                    pkg.highlight ? 'text-white' : 'text-slate-800'
                  }`}
                >
                  {pkg.name}
                </p>
                <p
                  className={`text-xs mt-2 leading-relaxed ${
                    pkg.highlight ? 'text-white/70' : 'text-slate-500'
                  }`}
                >
                  {pkg.summary}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
