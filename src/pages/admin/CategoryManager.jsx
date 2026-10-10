import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Grid, Tag, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CategoryManager() {
  const { categories, brands, addCategory, addBrandToCategory, isAdminLoggedIn } = useApp();

  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || 'solar-panels');
  const [newBrandName, setNewBrandName] = useState('');
  const [message, setMessage] = useState('');

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
        <Link to="/admin" className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs">Login First</Link>
      </div>
    );
  }

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;

    const catId = newCatName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    addCategory({
      id: catId,
      name: newCatName,
      description: newCatDesc || `${newCatName} lineup and brands`
    });

    setNewCatName('');
    setNewCatDesc('');
    setMessage(`Category "${newCatName}" added successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!newBrandName) return;

    addBrandToCategory(selectedCatId, newBrandName);
    setNewBrandName('');
    setMessage(`Brand "${newBrandName}" added to category successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
        <Link to="/admin/dashboard" className="text-xs font-bold text-blue-600 flex items-center gap-1 mb-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Category & Brand Management</h1>
        <p className="text-xs text-slate-500">Add new product categories or append solar brands (e.g. JA Solar, Solis, Sungrow)</p>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-2xl flex items-center gap-2 font-bold">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Module 1: Add New Brand to Existing Category */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600">Brand Management</span>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-600" /> Add Brand / Manufacturer
            </h2>
          </div>

          <form onSubmit={handleAddBrand} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Category</label>
              <select
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Brand Name *</label>
              <input
                type="text"
                required
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Astroenergy, Sungrow, Solis"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Add Brand To Category
            </button>
          </form>

          {/* Current Brands in Selected Category */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-500 block">Existing Brands in Selected Category:</span>
            <div className="flex flex-wrap gap-2">
              {(brands[selectedCatId] || []).map((b, i) => (
                <span key={i} className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Module 2: Add New Category */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-600">Category Trees</span>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Grid className="w-5 h-5 text-purple-600" /> Create New Main Category
            </h2>
          </div>

          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category Title *</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Solar Accessories, Net Metering Devices"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category Description</label>
              <textarea
                rows={3}
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500"
                placeholder="Brief description for catalog banner..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Create Category
            </button>
          </form>

          {/* Existing Categories List */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-500 block">Existing Active Categories:</span>
            <div className="space-y-1">
              {categories.map((c) => (
                <div key={c.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs flex justify-between items-center">
                  <span className="font-bold text-slate-800">{c.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">{c.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
