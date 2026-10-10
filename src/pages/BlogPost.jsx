import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { blogs } from '../data/content';

export default function BlogPost() {
  const { postId } = useParams();
  const post = blogs.find((b) => b.id === postId);

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-[var(--navy)]">Article not found</h1>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--solar-blue)]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
      </div>
    );
  }

  const related = blogs.filter((b) => b.id !== post.id).slice(0, 2);

  return (
    <div className="pb-16">
      <article>
        <header className="brand-gradient text-white py-10 sm:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--gold)] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All articles
            </Link>
            <p className="page-eyebrow">{post.category}</p>
            <h1 className="page-title text-2xl sm:text-4xl leading-tight">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-xs text-white/70 font-semibold">
              <span className="inline-flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {post.author}
              </span>
              <span>{post.date}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTime} read
              </span>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8">
          <img
            src={post.image}
            alt=""
            className="w-full aspect-[16/9] object-cover border border-slate-200 shadow-lg"
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 prose-at">
          {post.content.map((para) => (
            <p key={para.slice(0, 32)} className="text-[15px] sm:text-base">
              {para}
            </p>
          ))}

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 mt-8">
              <Tag className="w-4 h-4 text-[var(--gold)]" />
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 space-y-4">
          <h2 className="section-title text-xl">More articles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/blog/${r.id}`}
                className="block border border-slate-200 bg-white p-4 hover:border-[var(--gold)]"
              >
                <p className="text-[10px] font-bold uppercase text-[var(--gold-deep)]">
                  {r.category}
                </p>
                <p className="font-display font-bold text-[var(--navy)] text-sm mt-1 leading-snug">
                  {r.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
