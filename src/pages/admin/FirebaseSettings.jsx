import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, ArrowLeft, Check, ShieldCheck, PhoneCall, Key } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { defaultFirebaseConfig, initFirebase } from '../../services/firebase';

export default function FirebaseSettings() {
  const { firebaseConfig, saveFirebaseConfig, companyDetails, isAdminLoggedIn } = useApp();

  const [config, setConfig] = useState(firebaseConfig || defaultFirebaseConfig);
  const [whatsappPhone, setWhatsappPhone] = useState(companyDetails.whatsapp);
  const [statusMsg, setStatusMsg] = useState('');

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
        <Link to="/admin" className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs">Login First</Link>
      </div>
    );
  }

  const handleSaveConfig = (e) => {
    e.preventDefault();
    saveFirebaseConfig(config);
    const result = initFirebase(config);
    if (result.success) {
      setStatusMsg('Firebase connection config saved & initialized successfully!');
    } else {
      setStatusMsg('Config saved locally! (Note: Check API keys for remote cloud database sync)');
    }
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
        <Link to="/admin/dashboard" className="text-xs font-bold text-blue-600 flex items-center gap-1 mb-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Firebase & WhatsApp Target Settings</h1>
        <p className="text-xs text-slate-500">Connect live Firebase Firestore database or update AT Solar WhatsApp number</p>
      </div>

      {statusMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-2xl flex items-center gap-2 font-bold">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSaveConfig} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-amber-600 font-bold text-sm border-b border-slate-100 pb-3">
          <Database className="w-5 h-5" /> Firebase Cloud Firestore Configuration
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">API Key (apiKey)</label>
            <input
              type="text"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-mono text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Auth Domain (authDomain)</label>
            <input
              type="text"
              value={config.authDomain}
              onChange={(e) => setConfig({ ...config, authDomain: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-mono text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Project ID (projectId)</label>
            <input
              type="text"
              value={config.projectId}
              onChange={(e) => setConfig({ ...config, projectId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-mono text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Storage Bucket (storageBucket)</label>
            <input
              type="text"
              value={config.storageBucket}
              onChange={(e) => setConfig({ ...config, storageBucket: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-mono text-xs"
            />
          </div>
        </div>

        {/* WhatsApp Phone Config */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <PhoneCall className="w-5 h-5" /> WhatsApp Target Auto-Message Receiver Number
          </div>

          <div>
            <label className="font-bold text-slate-700 text-xs block mb-1">AT Solar WhatsApp Number (with country code)</label>
            <input
              type="text"
              value={whatsappPhone}
              onChange={(e) => setWhatsappPhone(e.target.value)}
              className="w-full max-w-md px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-xs font-bold"
              placeholder="923001234567"
            />
            <p className="text-[11px] text-slate-400 mt-1">All "Price Puchen" and calculator quote buttons automatically format inquiries for this number.</p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all"
          >
            <ShieldCheck className="w-4 h-4" /> Save Firebase & WhatsApp Config
          </button>
        </div>
      </form>

    </div>
  );
}
