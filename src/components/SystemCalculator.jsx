import React, { useState } from 'react';
import { Calculator, Zap, DollarSign, TrendingDown, MessageSquare } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function SystemCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(45000);
  const [propertyType, setPropertyType] = useState('residential');

  // Calculation estimates for Pakistan market (Avg unit rate ~ Rs 55/unit)
  const avgUnitRate = 55;
  const unitsPerMonth = Math.round(monthlyBill / avgUnitRate);
  // 1kW generates ~120 units per month
  const estimatedKw = Math.max(3, Math.round((unitsPerMonth / 120) * 10) / 10);
  const estimatedCost = Math.round(estimatedKw * 125000); // Approx ~125,000 per kW complete system
  const yearlySavings = Math.round(monthlyBill * 12 * 0.90); // ~90% reduction

  const whatsappMsg = `Assalam-o-Alaikum! I calculated my solar requirement on your website:
🏠 Property Type: ${propertyType.toUpperCase()}
⚡ Current Monthly Bill: Rs. ${monthlyBill.toLocaleString()} (~${unitsPerMonth} units)
☀️ Recommended System Size: ${estimatedKw} kW
💰 Estimated Turnkey Cost: Rs. ${estimatedCost.toLocaleString()}
📉 Projected Yearly Savings: Rs. ${yearlySavings.toLocaleString()}

Please confirm panel availability and custom design breakdown.`;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 md:p-10 text-white shadow-2xl border border-blue-500/20 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-sky-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
            <Calculator className="w-3.5 h-3.5" /> Instant Savings Estimator
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Calculate Your Solar System & ROI
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto">
            Drag the slider to match your average electricity bill and discover instant estimated capacity, system cost, and monthly savings.
          </p>
        </div>

        {/* Input Controls */}
        <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-700/60 space-y-6">
          {/* Property Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
              Select Property Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'residential', label: 'Residential' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'agricultural', label: 'Agricultural / Tube Well' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPropertyType(item.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    propertyType === item.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bill Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Average Monthly Electricity Bill
              </span>
              <span className="text-xl font-black text-sky-400 bg-sky-950/60 border border-sky-500/30 px-4 py-1 rounded-xl">
                Rs. {monthlyBill.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
              <span>Rs. 10,000 / mo</span>
              <span>Rs. 250,000 / mo</span>
              <span>Rs. 500,000 / mo</span>
            </div>
          </div>
        </div>

        {/* Output Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-4 text-center space-y-1">
            <Zap className="w-6 h-6 text-amber-400 mx-auto" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Recommended System</span>
            <span className="text-2xl font-black text-white block">{estimatedKw} kW</span>
            <span className="text-[10px] text-sky-300 font-medium">On-Grid / Hybrid</span>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-1">
            <TrendingDown className="w-6 h-6 text-emerald-400 mx-auto" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Projected Yearly Savings</span>
            <span className="text-2xl font-black text-emerald-400 block">Rs. {yearlySavings.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-300 font-medium">~90% Electricity Cut</span>
          </div>

          <div className="bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 text-center space-y-1">
            <DollarSign className="w-6 h-6 text-purple-400 mx-auto" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Est. Complete Turnkey Cost</span>
            <span className="text-2xl font-black text-purple-300 block">Rs. {estimatedCost.toLocaleString()}</span>
            <span className="text-[10px] text-purple-200 font-medium">Includes Tier-1 Panels & Inverter</span>
          </div>
        </div>

        {/* WhatsApp Quote Trigger */}
        <div className="text-center pt-2">
          <a
            href={createWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            <MessageSquare className="w-5 h-5 fill-white" /> Get Custom Quotation on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
