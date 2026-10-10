import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Leaf,
  ShieldCheck,
  Wallet,
  BatteryCharging,
  TrendingUp,
  CheckCircle2,
  Sun,
  BookOpen,
  PlayCircle,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SystemCalculator from '../components/SystemCalculator';
import { useApp } from '../context/AppContext';
import {
  companyDetails,
  services,
  benefits,
  packages,
  policies,
} from '../data/company';
import { blogs } from '../data/content';
import { createWhatsAppLink } from '../utils/whatsapp';
import { useMotionPrefs } from '../hooks/useMotionPrefs';

const benefitIcons = {
  Wallet,
  BatteryCharging,
  TrendingUp,
  Leaf,
  ShieldCheck,
};

export default function Home() {
  const { products, projects, reviews, categories } = useApp();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const featuredPackage = packages.find((p) => p.highlight) || packages[0];
  const { duration, stagger, y, reduceMotion } = useMotionPrefs();

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
    show: {
      transition: { staggerChildren: stagger, delayChildren: reduceMotion ? 0 : 0.06 },
    },
  };

  return (
    <div className="pb-16">
      {/* HERO — flyer photo visible with light/white overlay */}
      <section className="relative min-h-[88svh] sm:min-h-[92svh] flex items-end overflow-hidden bg-white">
        <img
          src={companyDetails.heroImage}
          alt="Rooftop solar installation"
          className="absolute inset-0 w-full h-full object-cover object-[center_10%] hero-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-24">
          <motion.div
            className="max-w-xl space-y-4 sm:space-y-5"
            variants={staggerParent}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold-deep)] font-display"
            >
              {companyDetails.tagline}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-[1.1] tracking-tight"
            >
              Power your life with{' '}
              <span className="text-[var(--gold-deep)]">solar energy</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-slate-700 text-sm sm:text-base max-w-md leading-relaxed"
            >
              Save today, secure tomorrow — on-grid, hybrid & off-grid systems in Islamabad.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-urdu text-[var(--gold-deep)] text-sm sm:text-base"
              dir="rtl"
              lang="ur"
            >
              {companyDetails.sloganUrdu}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href={createWhatsAppLink(
                  'Assalam-o-Alaikum AT Solar! I want a free site visit and quotation.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-[var(--navy-deep)] font-bold text-sm px-5 sm:px-6 py-3.5 transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Free Site Visit
              </a>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 border border-[var(--navy)]/30 hover:border-[var(--navy)] text-[var(--navy)] font-semibold text-sm px-5 sm:px-6 py-3.5 transition-colors bg-white/70"
              >
                Shop Products <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-[var(--navy)] text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left">
          {[
            { icon: Wallet, label: 'Lower Electricity Bills' },
            { icon: Leaf, label: 'Eco Friendly Solution' },
            { icon: ShieldCheck, label: 'Reliable & Long Lasting' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center sm:justify-start gap-3">
              <Icon className="w-5 h-5 text-[var(--gold)] shrink-0" />
              <span className="text-sm font-semibold text-white/90">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured package teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerParent}
        >
          <motion.div variants={fadeUp} className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--navy-mid)]">
              Flagship Package
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--navy)] leading-tight">
              {featuredPackage.name}
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-lg">{featuredPackage.summary}</p>
            <ul className="grid sm:grid-cols-2 gap-2 pt-2">
              {featuredPackage.equipment.slice(0, 6).map((item) => (
                <li key={item.name} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[var(--navy-mid)] mt-0.5 shrink-0" />
                  <span>
                    <strong className="font-semibold">{item.name}</strong>
                    <span className="text-slate-500"> — {item.qty}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 bg-[var(--navy)] hover:bg-[var(--navy-mid)] text-white font-bold text-sm px-5 py-3 transition-colors"
              >
                Full Equipment List <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={createWhatsAppLink(
                  `Assalam-o-Alaikum AT Solar! I want a quote for the ${featuredPackage.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--navy)]/25 hover:border-[var(--navy)] text-[var(--navy)] font-semibold text-sm px-5 py-3 transition-colors"
              >
                Get Quote
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative min-h-[280px] sm:min-h-[360px] overflow-hidden bg-[var(--navy)]"
          >
            <img
              src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
              alt="7KW solar complete setup"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--gold)]">
                {featuredPackage.capacity}
              </p>
              <p className="text-white/85 text-sm mt-1">Complete setup · panels · inverter · battery · structure</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services overview */}
      <section className="bg-white border-y border-slate-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mb-10 sm:mb-12 space-y-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--navy-mid)]">
              Our Services
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--navy)]">
              Everything for homes, business & industry
            </h2>
            <p className="text-slate-600">
              From free site survey to net metering and maintenance — one team, transparent pricing.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {services.slice(0, 8).map((svc) => (
              <motion.div key={svc.id} variants={fadeUp} className="space-y-2 border-t-2 border-[var(--gold)] pt-4">
                <h3 className="font-display font-bold text-[var(--navy)] text-base">{svc.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{svc.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[var(--navy)] font-bold text-sm hover:text-[var(--navy-mid)]"
            >
              All services detail <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[var(--navy)] py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-center text-xl sm:text-2xl font-bold text-white mb-8">
            Benefits of Solar Energy
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4">
            {benefits.map((b) => {
              const Icon = benefitIcons[b.icon] || Sun;
              return (
                <div key={b.title} className="text-center space-y-2">
                  <Icon className="w-7 h-7 text-[var(--gold)] mx-auto" />
                  <p className="text-xs sm:text-sm font-semibold text-white/90 leading-snug">{b.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          className="max-w-2xl mb-10 space-y-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--navy-mid)]">
            Equipment
          </span>
          <h2 className="font-display text-3xl font-extrabold text-[var(--navy)]">
            Browse solar products by category
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={fadeUp}>
              <Link
                to={`/category/${cat.id}`}
                className="group block bg-white p-4 sm:p-5 border border-slate-200 hover:border-[var(--navy)] transition-colors text-center space-y-3"
              >
                <Sun className="w-6 h-6 text-[var(--navy)] mx-auto group-hover:text-[var(--gold)] transition-colors" />
                <span className="font-semibold text-slate-800 text-xs sm:text-sm block">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured products */}
      <section className="bg-white border-y border-slate-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--navy-mid)]">
                Inventory
              </span>
              <h2 className="font-display text-3xl font-extrabold text-[var(--navy)] mt-1">
                Featured solar products
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm font-bold text-[var(--navy)] hover:text-[var(--navy-mid)] inline-flex items-center gap-1"
            >
              Full shop ({products.length}) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featuredProducts.map((p) => (
              <motion.div key={p.id} variants={fadeUp}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <SystemCalculator />
      </motion.section>

      {/* Projects */}
      <section className="bg-[var(--paper)] py-16 sm:py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--navy-mid)]">
                Work
              </span>
              <h2 className="font-display text-3xl font-extrabold text-[var(--navy)] mt-1">
                Featured installations
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-sm font-bold text-[var(--navy)] inline-flex items-center gap-1"
            >
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <article key={proj.id} className="bg-white overflow-hidden border border-slate-200">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
                <div className="p-5 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--navy-mid)]">
                    {proj.type}
                  </p>
                  <h3 className="font-display font-bold text-[var(--navy)]">{proj.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{proj.description}</p>
                  <div className="pt-3 border-t border-slate-100 flex justify-between text-xs font-semibold">
                    <span>{proj.capacity}</span>
                    <span className="text-emerald-700">{proj.savings}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Policies + CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[var(--gold)] px-6 sm:px-10 py-10 sm:py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--navy-deep)] leading-tight">
                Free site visit — professional advice with no charges
              </h2>
              <ul className="space-y-2">
                {policies.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-[var(--navy-deep)]/90">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <a
                href={`tel:${companyDetails.whatsapp}`}
                className="inline-flex items-center justify-center gap-2 bg-[var(--navy)] text-white font-bold text-sm px-6 py-3.5 hover:bg-[var(--navy-mid)] transition-colors"
              >
                <Phone className="w-4 h-4" /> Call {companyDetails.phone}
              </a>
              <a
                href={createWhatsAppLink(
                  'Assalam-o-Alaikum AT Solar! Please book my free site visit.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[var(--navy)] font-bold text-sm px-6 py-3.5 border border-[var(--navy)]/15 hover:bg-[var(--navy-deep)] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white border-t border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--navy-mid)] font-display">
              Reviews
            </span>
            <h2 className="section-title text-3xl">What customers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <blockquote
                key={rev.id}
                className="border-l-4 border-[var(--gold)] pl-5 py-1 space-y-3"
              >
                <p className="text-slate-600 text-sm leading-relaxed">“{rev.comment}”</p>
                <footer>
                  <cite className="not-italic font-bold text-[var(--navy)] text-sm block font-display">
                    {rev.name}
                  </cite>
                  <span className="text-xs text-slate-400">
                    {rev.role} · {rev.date}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Content hub teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="page-eyebrow !text-[var(--gold-deep)]">Learn</span>
            <h2 className="section-title text-3xl mt-2">Blog & vlogs</h2>
          </div>
          <div className="flex gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--navy)]"
            >
              <BookOpen className="w-4 h-4" /> All blogs
            </Link>
            <Link
              to="/vlogs"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--navy)]"
            >
              <PlayCircle className="w-4 h-4" /> Vlogs
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs.slice(0, 4).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="bg-white border border-slate-200 overflow-hidden hover:border-[var(--gold)] transition-colors group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <p className="text-[10px] font-bold uppercase text-[var(--gold-deep)]">
                  {post.category}
                </p>
                <h3 className="font-display font-bold text-sm text-[var(--navy)] line-clamp-2 leading-snug">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--navy)] hover:text-[var(--gold-deep)]"
          >
            Full content & resources hub <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
