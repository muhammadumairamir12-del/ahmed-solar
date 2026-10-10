import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRs } from '../utils/pricing';
import { createCartWhatsAppLink } from '../utils/whatsapp';

export default function Cart() {
  const { cart, cartTotal, cartCount, updateCartQty, removeFromCart, clearCart } = useApp();

  if (!cart.length) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
        <h1 className="font-display text-2xl font-extrabold text-[var(--navy)]">Your cart is empty</h1>
        <p className="text-sm text-slate-500">Browse the shop and add panels, inverters or batteries.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[var(--navy)] text-white font-bold text-sm px-5 py-3"
        >
          <ArrowLeft className="w-4 h-4" /> Go to shop
        </Link>
      </div>
    );
  }

  const checkoutUrl = createCartWhatsAppLink(cart, cartTotal);

  return (
    <div className="pb-16">
      <section className="bg-[var(--navy)] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-extrabold">Shopping cart</h1>
          <p className="text-white/70 text-sm mt-1">
            {cartCount} item{cartCount !== 1 ? 's' : ''} · Checkout via WhatsApp
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 p-3 sm:p-4 flex gap-3 sm:gap-4"
            >
              <Link to={`/product/${item.id}`} className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-slate-50 overflow-hidden">
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase text-[var(--navy-mid)]">
                      {item.brand}
                    </p>
                    <Link
                      to={`/product/${item.id}`}
                      className="font-display font-bold text-sm sm:text-base text-[var(--navy)] line-clamp-2 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 shrink-0 h-fit"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center border border-slate-200">
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, (item.qty || 1) - 1)}
                      className="p-2"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, (item.qty || 1) + 1)}
                      className="p-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-extrabold text-[var(--navy)] text-sm sm:text-base">
                    {formatRs((item.numericPrice || 0) * (item.qty || 1))}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-bold text-rose-600 hover:underline"
          >
            Clear cart
          </button>
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-white border border-slate-200 p-5 sm:p-6 space-y-4 sticky top-24">
            <h2 className="font-display font-bold text-lg text-[var(--navy)]">Order summary</h2>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-extrabold text-[var(--navy)]">{formatRs(cartTotal)}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Final quote confirmed on WhatsApp after stock & delivery check. Installation packages
              available separately.
            </p>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5"
            >
              <MessageCircle className="w-4 h-4" /> Checkout on WhatsApp
            </a>
            <Link
              to="/shop"
              className="w-full flex items-center justify-center gap-2 border border-slate-200 text-[var(--navy)] font-bold text-xs py-3 hover:border-[var(--navy)]"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
