import React, { useState } from 'react';
import { Play, Clock, ExternalLink } from 'lucide-react';
import { vlogs } from '../data/content';
import { companyDetails } from '../data/company';

export default function Vlogs() {
  const [active, setActive] = useState(vlogs[0]);
  const [filter, setFilter] = useState('ALL');
  const cats = ['ALL', ...new Set(vlogs.map((v) => v.category))];
  const list =
    filter === 'ALL' ? vlogs : vlogs.filter((v) => v.category === filter);

  return (
    <div className="pb-16">
      <section className="brand-gradient text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <p className="page-eyebrow">Video · Vlogs</p>
          <h1 className="page-title text-3xl sm:text-5xl">Watch AT Solar in action</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed">
            Installations, site visits, structure work and net-metering tips — short videos for
            homeowners in Islamabad.
          </p>
          <p
            className="font-urdu text-[var(--gold)] text-base sm:text-lg pt-1"
            dir="rtl"
            lang="ur"
          >
            {companyDetails.sloganUrdu}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Player */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-3">
            <div className="relative aspect-video bg-[var(--navy-deep)] overflow-hidden border border-slate-800">
              <iframe
                key={active.id}
                title={active.title}
                src={`https://www.youtube.com/embed/${active.youtubeId}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold-deep)]">
                {active.category} · {active.duration}
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--navy)] mt-1">
                {active.title}
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{active.excerpt}</p>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Up next</p>
            <div className="space-y-2 max-h-[420px] overflow-y-auto">
              {vlogs.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActive(v)}
                  className={`w-full flex gap-3 text-left p-2 border transition-colors ${
                    active.id === v.id
                      ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                      : 'border-slate-200 bg-white hover:border-[var(--navy)]'
                  }`}
                >
                  <div className="relative w-28 aspect-video shrink-0 overflow-hidden bg-slate-100">
                    <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </span>
                  </div>
                  <div className="min-w-0 py-0.5">
                    <p className="text-xs font-bold text-[var(--navy)] line-clamp-2 leading-snug">
                      {v.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {v.duration}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>

        {/* Grid */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide ${
                  filter === c
                    ? 'bg-[var(--navy)] text-white'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {list.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setActive(v);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left bg-white border border-slate-200 overflow-hidden hover:border-[var(--gold)] transition-colors group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={v.thumbnail}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-10 h-10 text-white fill-white" />
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5">
                    {v.duration}
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-[10px] font-bold uppercase text-[var(--gold-deep)]">
                    {v.category}
                  </p>
                  <p className="font-display font-bold text-sm text-[var(--navy)] line-clamp-2">
                    {v.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--navy)] text-white px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold">More videos on Facebook</h2>
            <p className="text-sm text-white/70 mt-1">Follow AT Solar for new install vlogs.</p>
          </div>
          <a
            href={companyDetails.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--navy-deep)] font-bold text-sm px-5 py-3"
          >
            Open Facebook <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
