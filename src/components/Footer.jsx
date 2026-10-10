import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Share2 } from 'lucide-react';
import { companyDetails } from '../data/company';
import { createWhatsAppLink } from '../utils/whatsapp';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-[var(--navy-deep)] text-slate-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <div className="max-h-10 overflow-hidden">
              <BrandLogo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Complete solar energy solutions for homes, businesses, and industries in Islamabad —
              efficiency, durability, and real savings.
            </p>
            <p className="text-[var(--gold)] text-xs font-semibold font-display tracking-wide">
              {companyDetails.tagline}
            </p>
            <p
              className="font-urdu text-[var(--gold)]/90 text-sm"
              dir="rtl"
              lang="ur"
            >
              {companyDetails.sloganUrdu}
            </p>
            <a
              href={createWhatsAppLink(
                'Assalam-o-Alaikum AT Solar! I want a free site visit and quotation.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Chat
            </a>
          </div>

          <div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-[var(--gold)] pl-3">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop" className="hover:text-[var(--gold)] transition-colors">
                  Shop / Products
                </Link>
              </li>
              <li>
                <Link to="/shop?offers=1" className="hover:text-[var(--gold)] transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[var(--gold)] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-[var(--gold)] transition-colors">
                  Solar Packages
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[var(--gold)] transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-[var(--gold)] pl-3">
              Content
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/resources" className="hover:text-[var(--gold)] transition-colors">
                  Resources Hub
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[var(--gold)] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/vlogs" className="hover:text-[var(--gold)] transition-colors">
                  Vlogs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--gold)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[var(--gold)] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href={companyDetails.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--gold)] transition-colors inline-flex items-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5" /> Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-[var(--solar-blue)] pl-3">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                <span>{companyDetails.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--gold)] shrink-0" />
                <a href={`tel:${companyDetails.whatsapp}`} className="hover:text-[var(--gold)]">
                  {companyDetails.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${companyDetails.email}`}
                  className="hover:text-[var(--gold)] break-all"
                >
                  {companyDetails.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {companyDetails.name}. All rights reserved.
          </p>
          <p className="font-urdu text-[var(--gold)]/80" dir="rtl" lang="ur">
            {companyDetails.sloganUrdu}
          </p>
        </div>
      </div>
    </footer>
  );
}
