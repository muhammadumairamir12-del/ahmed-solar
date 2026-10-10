import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { getOfferPricing } from '../utils/pricing';

export default function Shop() {
  const { products, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || 'ALL';
  const offerOnly = searchParams.get('offers') === '1';

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let list = [...products];
    if (catParam !== 'ALL') list = list.filter((p) => p.category === catParam);
    if (offerOnly) list = list.filter((p) => getOfferPricing(p).hasOffer);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.caption?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q),
      );
    }
    if (sort === 'price-asc') {
      list.sort(
        (a, b) => getOfferPricing(a).numeric - getOfferPricing(b).numeric,
      );
    } else if (sort === 'price-desc') {
      list.sort(
        (a, b) => getOfferPricing(b).numeric - getOfferPricing(a).numeric,
      );
    } else if (sort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [products, catParam, offerOnly, search, sort]);

  const setCat = (id) => {
    const next = new URLSearchParams(searchParams);
    if (id === 'ALL') next.delete('cat');
    else next.set('cat', id);
    setSearchParams(next);
  };

  const toggleOffers = () => {
    const next = new URLSearchParams(searchParams);
    if (offerOnly) next.delete('offers');
    else next.set('offers', '1');
    setSearchParams(next);
  };

  return (
    <div className="pb-16">
      <section className="bg-[var(--navy)] text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            Online shop
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold">
            Solar products & equipment
          </h1>
          <p className="text-white/70 text-sm max-w-xl">
            Panels, inverters, batteries, structures — with captions, offers, specs & company PDF
            datasheets. Add to cart or get a WhatsApp quote.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
        {/* Filters toolbar */}
        <div className="bg-white border border-slate-200 p-3 sm:p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, brand, SKU..."
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="flex-1 sm:flex-none border border-slate-200 text-xs font-semibold px-3 py-2.5 bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name">Name A–Z</option>
              </select>
              <button
                type="button"
                onClick={toggleOffers}
                className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border ${
                  offerOnly
                    ? 'bg-[var(--gold)] border-[var(--gold)] text-[var(--navy-deep)]'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <Tag className="w-3.5 h-3.5" /> Offers
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button
              type="button"
              onClick={() => setCat('ALL')}
              className={`shrink-0 px-3 py-1.5 text-[11px] font-bold ${
                catParam === 'ALL'
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className={`shrink-0 px-3 py-1.5 text-[11px] font-bold ${
                  catParam === c.id
                    ? 'bg-[var(--navy)] text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            <strong className="text-[var(--navy)]">{filtered.length}</strong> products
          </span>
          <Link to="/cart" className="font-bold text-[var(--navy)] hover:underline">
            View cart →
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            No products match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
