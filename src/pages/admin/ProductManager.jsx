import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Trash2, ArrowLeft, Search, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const emptyForm = {
  name: '',
  category: 'solar-panels',
  brand: 'Jinko Solar',
  price: 'Rs. ',
  compareAtPrice: '',
  watts: '',
  technology: '',
  warranty: '',
  caption: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
  pdfUrl: '',
  pdfLabel: 'Manufacturer Datasheet (PDF)',
  offerPercent: '',
  offerLabel: '',
  sku: '',
  stockQty: '25',
  inStock: true,
  featured: false,
};

export default function ProductManager() {
  const {
    products,
    categories,
    brands,
    addProduct,
    updateProduct,
    deleteProduct,
    isAdminLoggedIn,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
        <Link
          to="/admin"
          className="inline-block px-5 py-2.5 bg-[var(--navy)] text-white font-bold text-xs"
        >
          Login First
        </Link>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addProduct({
      ...form,
      offerPercent: form.offerPercent,
      offerLabel: form.offerLabel,
      stockQty: Number(form.stockQty) || 0,
    });
    setShowAddModal(false);
    setForm({
      ...emptyForm,
      brand: brands['solar-panels']?.[0] || 'Jinko Solar',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-slate-200">
        <div className="space-y-1">
          <Link
            to="/admin/dashboard"
            className="text-xs font-bold text-[var(--navy)] flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-black text-slate-900">
            Products ({products.length})
          </h1>
          <p className="text-xs text-slate-500">
            Price, caption, offer %, PDF datasheet URL, stock — full e-commerce fields
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 shrink-0"
        >
          <PlusCircle className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search name, brand, SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--navy)] bg-white"
        />
      </div>

      <div className="bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Item</th>
                <th className="p-3">Price</th>
                <th className="p-3">Offer %</th>
                <th className="p-3">PDF</th>
                <th className="p-3">Caption</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="p-3">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <img
                        src={p.image}
                        alt=""
                        className="w-10 h-10 object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block line-clamp-1">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {p.sku || p.id} · {p.brand}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      defaultValue={p.price}
                      onBlur={(e) => updateProduct(p.id, { price: e.target.value })}
                      className="px-2 py-1 border border-slate-200 text-[var(--navy)] font-black text-xs w-28 focus:ring-2 focus:ring-[var(--navy)]"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      max="90"
                      defaultValue={p.offer?.percent || ''}
                      placeholder="0"
                      onBlur={(e) => {
                        const percent = Number(e.target.value) || 0;
                        updateProduct(p.id, {
                          offer: percent
                            ? { percent, label: p.offer?.label || 'Offer' }
                            : null,
                        });
                      }}
                      className="px-2 py-1 border border-slate-200 text-xs w-16"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="url"
                      defaultValue={p.pdfUrl || ''}
                      placeholder="https://...pdf"
                      onBlur={(e) => updateProduct(p.id, { pdfUrl: e.target.value || null })}
                      className="px-2 py-1 border border-slate-200 text-xs w-36"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      defaultValue={p.caption || ''}
                      placeholder="Short caption"
                      onBlur={(e) => updateProduct(p.id, { caption: e.target.value })}
                      className="px-2 py-1 border border-slate-200 text-xs w-40"
                    />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                      }}
                      className="p-2 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Add product</h2>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Product title *">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    placeholder="Product name"
                  />
                </Field>
                <Field label="SKU">
                  <input
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="input"
                    placeholder="e.g. JK-TIGER-585"
                  />
                </Field>
                <Field label="Category *">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Brand *">
                  <input
                    required
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="input"
                  />
                </Field>
                <Field label="Price *">
                  <input
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="input"
                    placeholder="Rs. 22,500"
                  />
                </Field>
                <Field label="Compare-at price">
                  <input
                    value={form.compareAtPrice}
                    onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })}
                    className="input"
                    placeholder="Rs. 24,500"
                  />
                </Field>
                <Field label="Offer %">
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={form.offerPercent}
                    onChange={(e) => setForm({ ...form, offerPercent: e.target.value })}
                    className="input"
                  />
                </Field>
                <Field label="Offer label">
                  <input
                    value={form.offerLabel}
                    onChange={(e) => setForm({ ...form, offerLabel: e.target.value })}
                    className="input"
                    placeholder="Hot Deal"
                  />
                </Field>
                <Field label="Watts / capacity">
                  <input
                    value={form.watts}
                    onChange={(e) => setForm({ ...form, watts: e.target.value })}
                    className="input"
                  />
                </Field>
                <Field label="Technology">
                  <input
                    value={form.technology}
                    onChange={(e) => setForm({ ...form, technology: e.target.value })}
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Caption (short marketing line)">
                <input
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  className="input"
                  placeholder="Shown under product title"
                />
              </Field>

              <Field label="Full description">
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input"
                />
              </Field>

              <Field label="Image URL">
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="input"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Company PDF / datasheet URL">
                  <input
                    value={form.pdfUrl}
                    onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
                    className="input"
                    placeholder="https://company.com/datasheet.pdf"
                  />
                </Field>
                <Field label="PDF button label">
                  <input
                    value={form.pdfLabel}
                    onChange={(e) => setForm({ ...form, pdfLabel: e.target.value })}
                    className="input"
                  />
                </Field>
              </div>

              <div className="flex flex-wrap gap-4 items-center pt-1">
                <label className="flex items-center gap-2 text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                  />
                  In stock
                </label>
                <Field label="Stock qty">
                  <input
                    type="number"
                    value={form.stockQty}
                    onChange={(e) => setForm({ ...form, stockQty: e.target.value })}
                    className="input w-24"
                  />
                </Field>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold bg-emerald-600 text-white"
                >
                  Save product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .input {
          width: 100%;
          padding: 0.625rem 1rem;
          border: 1px solid #e2e8f0;
          font-size: 0.75rem;
        }
        .input:focus {
          outline: none;
          box-shadow: 0 0 0 2px var(--navy);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-700 block mb-1">{label}</label>
      {children}
    </div>
  );
}
