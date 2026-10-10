import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ClipboardCheck,
  ShieldCheck,
  Tag,
  Wrench,
  Share2,
  ArrowRight,
  BookOpen,
  PlayCircle,
} from 'lucide-react';
import { resources } from '../data/content';
import { companyDetails } from '../data/company';

const icons = {
  Package,
  ClipboardCheck,
  ShieldCheck,
  Tag,
  Wrench,
  Share2,
};

export default function Resources() {
  return (
    <div className="pb-16">
      <section className="brand-gradient text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          <p className="page-eyebrow">Contents · Resources</p>
          <h1 className="page-title text-3xl sm:text-5xl">Everything in one place</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed">
            Guides, checklists, shop offers, services and media — explore AT Solar content hub.
          </p>
          <p
            className="font-urdu text-[var(--gold)] text-lg sm:text-xl"
            dir="rtl"
            lang="ur"
          >
            {companyDetails.sloganUrdu}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Quick media links */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/blog"
            className="group flex items-center gap-4 bg-white border border-slate-200 p-5 hover:border-[var(--gold)] transition-colors"
          >
            <div className="w-12 h-12 bg-[var(--navy)] text-[var(--gold)] flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display font-bold text-[var(--navy)]">Blog & Articles</h2>
              <p className="text-xs text-slate-500 mt-0.5">Guides on sizing, hybrid systems & net metering</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[var(--gold)]" />
          </Link>
          <Link
            to="/vlogs"
            className="group flex items-center gap-4 bg-white border border-slate-200 p-5 hover:border-[var(--gold)] transition-colors"
          >
            <div className="w-12 h-12 bg-[var(--navy)] text-[var(--gold)] flex items-center justify-center shrink-0">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display font-bold text-[var(--navy)]">Vlogs & Videos</h2>
              <p className="text-xs text-slate-500 mt-0.5">Install tours, site visits and structure work</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[var(--gold)]" />
          </Link>
        </div>

        <div>
          <h2 className="section-title text-2xl mb-6">Resource library</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((r) => {
              const Icon = icons[r.icon] || Package;
              const TagEl = r.external ? 'a' : Link;
              const props = r.external
                ? { href: r.link, target: '_blank', rel: 'noopener noreferrer' }
                : { to: r.link };

              return (
                <TagEl
                  key={r.id}
                  {...props}
                  className="block bg-white border border-slate-200 p-5 hover:border-[var(--gold)] transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <Icon className="w-6 h-6 text-[var(--solar-blue)]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold-deep)] bg-[var(--gold)]/15 px-2 py-0.5">
                      {r.type}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-[var(--navy)] text-base leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{r.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--navy)]">
                    Open <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </TagEl>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
