import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MessageCircle,
  ShieldCheck,
  ArrowLeft,
  Zap,
  FileText,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { createWhatsAppLink } from '../utils/whatsapp';
import { getOfferPricing } from '../utils/pricing';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { products, addToCart } = useApp();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-[var(--navy)]">Product not found</h2>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--navy)] text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>
      </div>
    );
  }

  const pricing = getOfferPricing(product);
  const images = product.images?.length ? product.images : [product.image];
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pb-20 sm:pb-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
        <nav className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-400 overflow-x-auto">
          <Link to="/" className="hover:text-[var(--navy)] shrink-0">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[var(--navy)] shrink-0">
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/category/${product.category}`}
            className="hover:text-[var(--navy)] capitalize shrink-0"
          >
            {product.category?.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-[var(--navy)] font-bold truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Gallery */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-white border border-slate-200 overflow-hidden">
              <img
                src={images[activeImg] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {pricing.hasOffer && (
                <span className="absolute top-3 left-3 bg-[var(--gold)] text-[var(--navy-deep)] text-xs font-extrabold px-3 py-1.5 uppercase">
                  {pricing.label}
                  {pricing.percent ? ` · ${pricing.percent}%` : ''}
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 border-2 overflow-hidden ${
                      activeImg === i ? 'border-[var(--navy)]' : 'border-slate-200'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buy box */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--navy-mid)]">
                  {product.brand}
                </span>
                {product.sku && (
                  <span className="text-[10px] text-slate-400">SKU: {product.sku}</span>
                )}
                {product.inStock ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5">
                    In stock{product.stockQty ? ` · ${product.stockQty}` : ''}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5">
                    Out of stock
                  </span>
                )}
              </div>
              <h1 className="font-display text-xl sm:text-3xl font-extrabold text-[var(--navy)] leading-tight">
                {product.name}
              </h1>
              {product.caption && (
                <p className="mt-2 text-sm sm:text-base text-[var(--navy-mid)] font-semibold leading-snug">
                  {product.caption}
                </p>
              )}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="bg-[var(--paper)] border border-slate-200 p-4 sm:p-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                {pricing.compareAt && (
                  <span className="text-sm text-slate-400 line-through block">
                    {pricing.compareAt}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--navy)]">
                  {pricing.displayPrice}
                </span>
                {product.watts && (
                  <span className="mt-1 flex items-center gap-1 text-xs font-bold text-slate-500">
                    <Zap className="w-3.5 h-3.5" /> {product.watts}
                    {product.efficiency ? ` · ${product.efficiency}` : ''}
                  </span>
                )}
              </div>
              {product.warranty && (
                <div className="flex items-start gap-2 text-xs font-semibold text-emerald-800 max-w-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  {product.warranty}
                </div>
              )}
            </div>

            {product.features?.length > 0 && (
              <ul className="grid sm:grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[var(--navy-mid)] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Qty + actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center border border-slate-200">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2.5 hover:bg-slate-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="p-2.5 hover:bg-slate-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                disabled={!product.inStock}
                onClick={handleAdd}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-[var(--navy)] disabled:opacity-40 text-white font-bold text-sm py-3 hover:bg-[var(--navy-mid)] transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? 'Added!' : 'Add to cart'}
              </button>

              <a
                href={createWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-sm py-3 hover:bg-emerald-500"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp quote
              </a>
            </div>

            {/* PDF datasheet */}
            <div className="border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[var(--navy)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-[var(--navy)]">
                    {product.pdfLabel || 'Manufacturer datasheet (PDF)'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Official company PDF — specs, warranty & dimensions
                  </p>
                </div>
              </div>
              {product.pdfUrl ? (
                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--gold)] text-[var(--navy-deep)] font-bold text-xs px-4 py-2.5 shrink-0"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              ) : (
                <a
                  href={createWhatsAppLink(
                    `Assalam-o-Alaikum AT Solar! Please send the PDF datasheet for ${product.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[var(--navy)] text-[var(--navy)] font-bold text-xs px-4 py-2.5 shrink-0"
                >
                  Request PDF
                </a>
              )}
            </div>

            <Link
              to={`/cart`}
              className="inline-flex text-xs font-bold text-[var(--navy)] hover:underline"
            >
              View cart →
            </Link>
          </div>
        </div>

        {/* Specs table */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--navy)]">
              Technical specifications
            </h2>
            <div className="bg-white border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <tr
                      key={key}
                      className={i % 2 === 0 ? 'bg-slate-50/80' : 'bg-white'}
                    >
                      <th className="text-left font-semibold text-slate-600 px-4 py-3 w-[40%] sm:w-1/3 border-b border-slate-100">
                        {key}
                      </th>
                      <td className="px-4 py-3 font-bold text-[var(--navy)] border-b border-slate-100">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="space-y-5">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--navy)]">
              Related products
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky buy bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white border-t border-slate-200 px-3 py-2.5 flex gap-2 safe-pb">
        <button
          type="button"
          disabled={!product.inStock}
          onClick={handleAdd}
          className="flex-1 bg-[var(--navy)] text-white font-bold text-xs py-3 disabled:opacity-40"
        >
          Add to cart
        </button>
        <a
          href={createWhatsAppLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-emerald-600 text-white font-bold text-xs py-3 text-center"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
