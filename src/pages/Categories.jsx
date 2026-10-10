import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Zap, BatteryCharging, Grid3x3, Cable, Cpu, Wrench } from 'lucide-react';
import { useApp } from '../context/AppContext';

const iconMap = {
  Sun,
  Zap,
  BatteryCharging,
  Grid: Grid3x3,
  ShieldAlert: Cable,
  Cpu,
};

export default function Categories() {
  const { categories, products } = useApp();

  return (
    <div className="pb-16">
      <section className="bg-[var(--navy)] text-white py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            Categories
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
            Complete solar equipment
          </h1>
          <p className="text-white/75 text-sm max-w-xl">
            Panels, inverters, batteries, cables, structures, VFDs and installation accessories —
            everything available at AT Solar.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Wrench;
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group bg-white border border-slate-200 p-5 sm:p-6 hover:border-[var(--gold)] transition-colors space-y-3"
              >
                <div className="w-11 h-11 bg-[var(--navy)] text-[var(--gold)] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="font-display font-bold text-lg text-[var(--navy)] group-hover:text-[var(--solar-blue)]">
                  {cat.name}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{cat.description}</p>
                <p className="text-xs font-bold text-slate-400">
                  {count} product{count !== 1 ? 's' : ''} available
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-[var(--navy)]">
                  Browse <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[var(--navy)] text-white font-bold text-sm px-6 py-3.5"
          >
            View full shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
