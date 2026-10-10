import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingCart, FileText, Zap } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';
import { getOfferPricing } from '../utils/pricing';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { addToCart } = useApp();
  const pricing = getOfferPricing(product);
  const whatsappUrl = createWhatsAppLink(product);

  return (
    <article className="group bg-white border border-slate-200 flex flex-col h-full overflow-hidden hover:border-[var(--navy)] transition-colors">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/3] sm:aspect-[5/4] bg-slate-50 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        {pricing.hasOffer && (
          <span className="absolute top-2 left-2 bg-[var(--gold)] text-[var(--navy-deep)] text-[10px] font-extrabold px-2 py-1 uppercase tracking-wide">
            {pricing.label}
          </span>
        )}
        {product.watts && (
          <span className="absolute top-2 right-2 bg-[var(--navy)]/90 text-white text-[10px] font-bold px-2 py-1 inline-flex items-center gap-0.5">
            <Zap className="w-3 h-3" /> {product.watts}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute bottom-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-1">
            Out of stock
          </span>
        )}
      </Link>

      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--navy-mid)] truncate">
          {product.brand}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-bold text-[var(--navy)] text-sm sm:text-[15px] leading-snug line-clamp-2 min-h-[2.5rem] hover:text-[var(--navy-mid)]">
            {product.name}
          </h3>
        </Link>

        {(product.caption || product.shortDescription) && (
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.caption || product.shortDescription}
          </p>
        )}

        <div className="mt-auto pt-2 border-t border-slate-100 space-y-2.5">
          <div className="flex items-end justify-between gap-2">
            <div>
              {pricing.compareAt && (
                <span className="text-[10px] text-slate-400 line-through block">
                  {pricing.compareAt}
                </span>
              )}
              <span className="text-base sm:text-lg font-extrabold text-[var(--navy)]">
                {pricing.displayPrice}
              </span>
            </div>
            {product.pdfUrl && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-500">
                <FileText className="w-3 h-3" /> PDF
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => addToCart(product, 1)}
              className="flex items-center justify-center gap-1 bg-[var(--navy)] disabled:opacity-40 text-white text-[10px] sm:text-xs font-bold py-2 sm:py-2.5 hover:bg-[var(--navy-mid)] transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Cart
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-emerald-600 text-white text-[10px] sm:text-xs font-bold py-2 sm:py-2.5 hover:bg-emerald-500 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Quote
            </a>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="block text-center text-[11px] font-bold text-[var(--navy)] hover:underline py-0.5"
          >
            Full details →
          </Link>
        </div>
      </div>
    </article>
  );
}
