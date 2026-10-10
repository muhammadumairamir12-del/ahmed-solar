import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { blogs } from '../data/content';

export default function Blog() {
  const [filter, setFilter] = useState('ALL');
  const cats = ['ALL', ...new Set(blogs.map((b) => b.category))];
  const list =
    filter === 'ALL' ? blogs : blogs.filter((b) => b.category === filter);

  return (
    <div className="pb-16">
      <section className="brand-gradient text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-3">
          <p className="page-eyebrow">Blog & Articles</p>
          <h1 className="page-title text-3xl sm:text-5xl">
            Solar tips, guides & updates
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed font-[var(--font-body)]">
            Practical articles from AT Solar — system sizing, net metering, batteries and more.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                filter === c
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[var(--gold)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {list.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-slate-200 overflow-hidden flex flex-col hover:border-[var(--gold)] transition-colors group"
            >
              <Link to={`/blog/${post.id}`} className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[var(--gold)] text-[var(--navy-deep)] text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1">
                  {post.category}
                </span>
              </Link>
              <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <User className="w-3 h-3" /> {post.author}
                  </span>
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--navy)] leading-snug">
                  <Link to={`/blog/${post.id}`} className="hover:text-[var(--solar-blue)]">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--navy)] hover:text-[var(--gold-deep)] pt-1"
                >
                  Read article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
