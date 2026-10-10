import React from 'react';
import { MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { createWhatsAppLink } from '../utils/whatsapp';
import { companyDetails } from '../data/company';

export default function Projects() {
  const { projects } = useApp();
  const [filter, setFilter] = React.useState('ALL');

  const filteredProjects =
    filter === 'ALL'
      ? projects
      : projects.filter((p) => p.type.toUpperCase().includes(filter));

  return (
    <div className="pb-16">
      <section className="bg-[var(--navy)] text-white py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            Projects
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
            Installed solar projects
          </h1>
          <p className="text-white/75 text-sm max-w-xl leading-relaxed">
            Residential, commercial and hybrid installations across Islamabad & Rawalpindi —
            complete setups with transparent scope.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-wrap gap-2">
          {['ALL', 'COMMERCIAL', 'RESIDENTIAL', 'HYBRID'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 text-xs font-bold transition-colors ${
                filter === tag
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((proj) => (
            <article
              key={proj.id}
              className="bg-white border border-slate-200 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[var(--navy)]/90 text-white text-[10px] font-bold px-2.5 py-1 uppercase">
                  {proj.type}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1 space-y-3">
                <h2 className="font-display font-bold text-lg text-[var(--navy)] leading-snug">
                  {proj.title}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed flex-1">{proj.description}</p>

                <ul className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                  <li className="flex items-start gap-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-[var(--gold)] shrink-0 mt-0.5" />
                    {proj.location}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--navy-mid)]" />
                    <span className="font-bold text-[var(--navy)]">{proj.capacity}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-emerald-700 font-semibold">{proj.savings}</span>
                  </li>
                  <li className="text-slate-500">Panels: {proj.panels}</li>
                  <li className="text-slate-500">Inverter: {proj.inverter}</li>
                </ul>

                <a
                  href={createWhatsAppLink(
                    `Assalam-o-Alaikum AT Solar! I want a similar project to: ${proj.title} (${proj.capacity}).`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-[var(--navy)] hover:bg-[var(--navy-mid)] text-white font-bold text-xs py-3 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> Request similar setup
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-12">No projects in this filter.</p>
        )}

        <div className="bg-[var(--gold)] px-6 py-8 text-center space-y-3">
          <h2 className="font-display text-xl font-extrabold text-[var(--navy-deep)]">
            Want your project featured next?
          </h2>
          <p className="text-sm text-[var(--navy-deep)]/80">
            Free site visit · Call {companyDetails.phone}
          </p>
          <a
            href={createWhatsAppLink(
              'Assalam-o-Alaikum AT Solar! I want a free site visit for my solar project.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--navy)] text-white font-bold text-sm px-6 py-3"
          >
            Book free survey
          </a>
        </div>
      </div>
    </div>
  );
}
