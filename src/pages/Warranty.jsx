import React from 'react';
import { ShieldCheck, Award, Clock, FileCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Warranty() {
  const { companyDetails } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Official Guarantee
        </span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Comprehensive Warranty Policy
        </h1>
        <p className="text-slate-600 text-sm">
          At {companyDetails.name}, all products are 100% genuine with direct manufacturer warranty backing.
        </p>
      </div>

      {/* Warranty Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Panel Warranty */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Solar Panels (Tier-1 Brands)</h3>
            <span className="text-xs font-semibold text-amber-600 block mt-1">Jinko, Longi, Canadian, JA, Trina, Risen</span>
          </div>
          <ul className="space-y-3 text-xs text-slate-600 font-medium border-t border-slate-100 pt-4">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>12 - 15 Years Product Warranty:</strong> Covers manufacturing defects, glass breakage due to thermal stress, and frame joint failures.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>25 - 30 Years Power Output Warranty:</strong> Guarantees minimum 87.4% linear power output efficiency after 25-30 years.</span>
            </li>
          </ul>
        </div>

        {/* Inverter & Battery Warranty */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Inverters & Lithium Storage</h3>
            <span className="text-xs font-semibold text-blue-600 block mt-1">Growatt, Huawei, Fox ESS, Deye, Pylontech</span>
          </div>
          <ul className="space-y-3 text-xs text-slate-600 font-medium border-t border-slate-100 pt-4">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>5 - 10 Years Inverter Replacement Warranty:</strong> Free repair or replacement for main board failure, internal short circuits, and MPPT faults.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>6000+ Cycles Lithium Battery Warranty:</strong> Guaranteed 80% capacity retention over 10 years of daily charge-discharge usage.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Claim Process Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-sky-400" /> Simple 3-Step Warranty Claim Process
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-amber-400 font-extrabold text-sm block">01. Serial Scan</span>
            <p className="text-xs text-slate-300">Share your panel or inverter original barcode number via WhatsApp with AT Solar.</p>
          </div>
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-amber-400 font-extrabold text-sm block">02. Site Inspection</span>
            <p className="text-xs text-slate-300">Our technical team verifies system wiring and conducts voltage testing on site.</p>
          </div>
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-amber-400 font-extrabold text-sm block">03. Fast Replacement</span>
            <p className="text-xs text-slate-300">Defective parts are replaced under manufacturer warranty without long waiting times.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
