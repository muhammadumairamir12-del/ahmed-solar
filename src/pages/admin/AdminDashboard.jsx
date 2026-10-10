import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sun,
  Package,
  Grid,
  Database,
  LogOut,
  PlusCircle,
  ShoppingBag,
  Sparkles,
  Phone,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { fetchAdminLeads, updateLeadStatus } from '../../services/assistantApi';
import { createWhatsAppLink } from '../../utils/whatsapp';

export default function AdminDashboard() {
  const { products, logoutAdmin, isAdminLoggedIn } = useApp();
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const loadLeads = async () => {
    setLoadingLeads(true);
    const data = await fetchAdminLeads();
    setLeads(data);
    setLoadingLeads(false);
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadLeads();
    }
  }, [isAdminLoggedIn]);

  const handleStatusChange = async (id, newStatus) => {
    await updateLeadStatus(id, newStatus);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
        <p className="text-xs text-slate-500">Please log in with AT Solar admin credentials first.</p>
        <Link to="/admin" className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs">
          Go to Login Page
        </Link>
      </div>
    );
  }

  const panelCount = products.filter(p => p.category === 'solar-panels').length;
  const inverterCount = products.filter(p => p.category === 'inverters').length;
  const otherCount = products.length - (panelCount + inverterCount);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-900 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <Sun className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">AT Solar Admin Dashboard</h1>
            <p className="text-xs text-sky-200">Manage products, update price lists & configure WhatsApp auto-messaging</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" /> Logout Admin
        </button>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Catalog Items</span>
            <span className="text-2xl font-black text-slate-900">{products.length} Products</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Solar Panels</span>
            <span className="text-2xl font-black text-slate-900">{panelCount} Items</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Inverters</span>
            <span className="text-2xl font-black text-slate-900">{inverterCount} Items</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">AI Solar Leads</span>
            <span className="text-2xl font-black text-slate-900">{leads.length} Received</span>
          </div>
        </div>
      </div>

      {/* Admin Modules Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link
          to="/admin/products"
          className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">Product Management</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Add new solar panels or inverters, update daily price rates, upload photos, and edit specifications.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1 pt-2">
            Manage Products & Price Updates →
          </span>
        </Link>

        <Link
          to="/admin/categories"
          className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
            <Grid className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-purple-600 transition-colors">Category & Brand Admin</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Add new solar panel or inverter brands (e.g. JA Solar, Solis, Sungrow) and organize category trees.
            </p>
          </div>
          <span className="text-xs font-bold text-purple-600 flex items-center gap-1 pt-2">
            Manage Brands & Categories →
          </span>
        </Link>

        <Link
          to="/admin/firebase"
          className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">Firebase & WhatsApp Setup</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Configure live Firebase Firestore cloud database keys and update the AT Solar WhatsApp number.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1 pt-2">
            Configure Firebase Cloud →
          </span>
        </Link>

      </div>

      {/* Ahmed Assistant Inquiries & Leads Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-deep)] text-[var(--navy-deep)] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Ahmed Assistant — AI Solar Leads</h2>
              <p className="text-xs text-slate-500">Customer quote inquiries & site visit requests submitted via AI</p>
            </div>
          </div>

          <button
            onClick={loadLeads}
            disabled={loadingLeads}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? 'animate-spin' : ''}`} />
            <span>Refresh Inquiries</span>
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-10 text-slate-400 space-y-2">
            <Sparkles className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-medium">No leads submitted yet. New inquiries from Ahmed Assistant will appear here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Phone / WhatsApp</th>
                  <th className="py-3 px-4">City / Area</th>
                  <th className="py-3 px-4">Property & Size</th>
                  <th className="py-3 px-4">Monthly Bill</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {leads.map((lead) => {
                  const dateStr = lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-GB') : 'Recent';
                  const waUrl = createWhatsAppLink(`Assalam-o-Alaikum ${lead.name}! This is AT Solar regarding your solar quote inquiry for ${lead.systemSize || 'solar installation'}.`);

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{dateStr}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{lead.name}</td>
                      <td className="py-3 px-4">
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          {lead.phone}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{lead.city}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800">{lead.systemSize || 'Custom'}</span>
                        <span className="text-[10px] text-slate-400 block capitalize">{lead.propertyType}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {lead.monthlyBill ? `Rs. ${lead.monthlyBill}` : 'Not specified'}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={lead.status || 'new'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            lead.status === 'site_survey_booked'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : lead.status === 'contacted'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : lead.status === 'closed'
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <option value="new">New Inquiry</option>
                          <option value="contacted">Contacted</option>
                          <option value="site_survey_booked">Site Survey Booked</option>
                          <option value="quotation_sent">Quotation Sent</option>
                          <option value="closed">Closed / Installed</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition-colors shadow-sm"
                        >
                          <Phone className="w-3 h-3" /> WhatsApp
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
