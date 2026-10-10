import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Building2,
  FileCheck,
  ArrowUpCircle,
  Wrench,
  ClipboardCheck,
  Layers,
  Hammer,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { services, companyDetails } from '../data/company';
import { createWhatsAppLink } from '../utils/whatsapp';
import { useMotionPrefs } from '../hooks/useMotionPrefs';

const icons = {
  Home,
  Building2,
  FileCheck,
  ArrowUpCircle,
  Wrench,
  ClipboardCheck,
  Layers,
  Hammer,
};

const detailBlocks = [
  {
    id: 'residential',
    title: 'Residential Solar',
    points: [
      '5KW–15KW hybrid and on-grid designs for Islamabad homes',
      'Bill analysis and load sizing before you buy',
      'Battery backup options for load-shedding',
      'Clean rooftop layout with GI / aluminium structure',
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial & Industrial',
    points: [
      'Offices, shops, warehouses and factory rooftops',
      'Three-phase systems with monitoring',
      'Net-metering coordination with local DISCO',
      'Scalable designs for future expansion',
    ],
  },
  {
    id: 'net-metering',
    title: 'Net Metering',
    points: [
      'Documentation and application support',
      'Green meter testing coordination',
      'Export surplus units to the grid',
      'Guidance until approval is complete',
    ],
  },
];

export default function Services() {
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">Services</p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
            Complete solar solutions for every rooftop
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed">
            On-grid · Hybrid · Off-grid — installation, structure work, net metering, upgrades and
            free site consultation across Islamabad.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((svc) => {
            const Icon = icons[svc.icon] || Wrench;
            return (
              <motion.article
                key={svc.id}
                variants={fadeUp}
                className="space-y-3 border-t-2 border-[var(--gold)] pt-5"
              >
                <Icon className="w-6 h-6 text-[var(--navy)]" />
                <h2 className="font-display font-bold text-lg text-[var(--navy)]">{svc.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{svc.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      <section className="bg-white border-y border-slate-200 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-3xl font-extrabold text-[var(--navy)]">
              How we deliver
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Clear scope, quality components, and professional installation — no hidden costs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {detailBlocks.map((block) => (
              <div key={block.id} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-[var(--navy)]">{block.title}</h3>
                <ul className="space-y-2.5">
                  {block.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[var(--navy-mid)] mt-0.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-[var(--navy)] px-6 sm:px-10 py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Free site visit & consultation
            </h2>
            <p className="text-white/70 text-sm">
              Call {companyDetails.phone} or message us — we survey your site at no charge.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={createWhatsAppLink(
                'Assalam-o-Alaikum AT Solar! I want details about your solar services and a free site visit.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--navy-deep)] font-bold text-sm px-5 py-3.5"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-5 py-3.5 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              See packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
