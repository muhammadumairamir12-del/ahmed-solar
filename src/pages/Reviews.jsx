import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ThumbsUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Reviews() {
  const { reviews, addReview } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rating: 5,
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;
    
    addReview(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setFormData({ name: '', role: '', rating: 5, comment: '' });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-sky-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-3 text-center md:text-left">
          <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">Customer Voice</span>
          <h1 className="text-3xl md:text-4xl font-black">Client Feedback & Ratings</h1>
          <p className="text-blue-100 text-sm max-w-xl">
            Read honest feedback from residential, commercial, and agricultural solar system owners.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all shrink-0"
        >
          <MessageSquarePlus className="w-5 h-5" /> Write A Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
            </div>

            <p className="text-slate-700 text-sm italic leading-relaxed">"{rev.comment}"</p>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                {rev.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{rev.name}</h4>
                <span className="text-[11px] text-slate-400 block">{rev.role || 'Verified Customer'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <h3 className="text-xl font-bold text-slate-900">Share Your Feedback</h3>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Thank You!</h4>
                <p className="text-xs text-slate-500">Your review has been successfully submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Imran Khan"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">City / Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Home Owner, Lahore"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Feedback *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your solar generation performance or installation experience..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
