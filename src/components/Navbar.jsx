import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  PhoneCall,
  ChevronDown,
  ShoppingCart,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { companyDetails } from '../data/company';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { categories, cartCount } = useApp();

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const closeMobile = () => setMobileMenuOpen(false);

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`hover:text-[var(--gold)] transition-colors ${
        isActive(path) ? 'text-[var(--gold)]' : ''
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-[var(--navy-deep)]/95 backdrop-blur-md border-b border-white/10 text-white">
      <div className="gold-band text-[var(--navy-deep)] py-1 px-4 text-[11px] sm:text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span className="font-display font-semibold tracking-wide">
            {companyDetails.tagline}
          </span>
          <a href={`tel:${companyDetails.whatsapp}`} className="hover:underline font-bold">
            Call: {companyDetails.phone}
          </a>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-[4.25rem] flex items-center justify-between gap-2">
        <div className="shrink-0 max-h-10 overflow-hidden">
          <BrandLogo />
        </div>

        <div className="hidden lg:flex items-center gap-4 xl:gap-5 text-[13px] font-semibold text-white/85 font-display">
          {navLink('/', 'Home')}
          {navLink('/shop', 'Shop')}
          {navLink('/services', 'Services')}
          {navLink('/packages', 'Packages')}

          {/* Categories — clickable + dropdown (not clipped) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('products')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/categories"
              className={`flex items-center gap-1 hover:text-[var(--gold)] py-2 ${
                isActive('/categories') || isActive('/category') ? 'text-[var(--gold)]' : ''
              }`}
            >
              Categories <ChevronDown className="w-4 h-4 opacity-70" />
            </Link>
            {activeDropdown === 'products' && (
              <div className="absolute top-full left-0 pt-1 z-[60]">
                <div className="w-60 bg-white text-slate-800 shadow-2xl border border-slate-100 p-2">
                  <Link
                    to="/categories"
                    className="block p-2.5 hover:bg-slate-50 text-sm font-semibold text-[var(--navy)]"
                  >
                    All Categories
                  </Link>
                  <Link
                    to="/shop?offers=1"
                    className="block p-2.5 hover:bg-slate-50 text-sm font-semibold text-[var(--gold-deep)]"
                  >
                    Special Offers
                  </Link>
                  {(categories || []).map((c) => (
                    <Link
                      key={c.id}
                      to={`/category/${c.id}`}
                      className="block p-2.5 hover:bg-slate-50 text-sm font-semibold"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content — clickable + dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('media')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/resources"
              className={`flex items-center gap-1 hover:text-[var(--gold)] py-2 ${
                isActive('/resources') || isActive('/blog') || isActive('/vlogs')
                  ? 'text-[var(--gold)]'
                  : ''
              }`}
            >
              Content <ChevronDown className="w-4 h-4 opacity-70" />
            </Link>
            {activeDropdown === 'media' && (
              <div className="absolute top-full left-0 pt-1 z-[60]">
                <div className="w-52 bg-white text-slate-800 shadow-2xl border border-slate-100 p-2">
                  <Link to="/resources" className="block p-2.5 hover:bg-slate-50 text-sm font-semibold">
                    Resources Hub
                  </Link>
                  <Link to="/blog" className="block p-2.5 hover:bg-slate-50 text-sm font-semibold">
                    Blog
                  </Link>
                  <Link to="/vlogs" className="block p-2.5 hover:bg-slate-50 text-sm font-semibold">
                    Vlogs
                  </Link>
                  <Link to="/projects" className="block p-2.5 hover:bg-slate-50 text-sm font-semibold">
                    Projects
                  </Link>
                  <Link to="/faq" className="block p-2.5 hover:bg-slate-50 text-sm font-semibold">
                    FAQ
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLink('/about', 'About')}
          {navLink('/contact', 'Contact')}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/cart"
            className="relative p-2 text-white hover:text-[var(--gold)] transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-1 bg-[var(--gold)] text-[var(--navy-deep)] text-[10px] font-extrabold flex items-center justify-center rounded-full">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-1.5 border border-white/25 hover:border-[var(--gold)] hover:text-[var(--gold)] text-white px-3 py-2 font-bold text-xs transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Shop
          </Link>

          <Link
            to="/contact"
            className="hidden sm:flex items-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-[var(--navy-deep)] px-4 py-2.5 font-bold text-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4" /> Contact
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--navy-deep)] border-t border-white/10 px-4 pt-2 pb-6 space-y-1 font-medium text-white/90 animate-drawer-in max-h-[80vh] overflow-y-auto">
          {[
            ['/', 'Home'],
            ['/shop', 'Shop'],
            ['/categories', 'All Categories'],
            ['/category/solar-panels', 'Solar Panels'],
            ['/category/inverters', 'Inverters'],
            ['/category/batteries', 'Batteries'],
            ['/category/wires', 'Cables & Wires'],
            ['/category/stands', 'Structures'],
            ['/category/accessories', 'Accessories / Electronics'],
            ['/services', 'Services'],
            ['/packages', 'Packages'],
            ['/resources', 'Content / Resources'],
            ['/blog', 'Blog'],
            ['/vlogs', 'Vlogs'],
            ['/projects', 'Projects'],
            ['/cart', 'Cart'],
            ['/about', 'About'],
            ['/faq', 'FAQ'],
            ['/contact', 'Contact'],
          ].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              onClick={closeMobile}
              className="block py-2.5 border-b border-white/10 hover:text-[var(--gold)] px-1 font-display text-sm font-semibold"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
