import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Sun, User, KeyRound, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('ahmed');
  const [password, setPassword] = useState('solar123');
  const [error, setError] = useState('');
  const { loginAdmin } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const res = loginAdmin(username, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">AT Solar Admin Portal</h1>
          <p className="text-xs text-slate-500">Sign in to manage solar products, prices, and categories</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ahmed"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
          >
            <Lock className="w-4 h-4" /> Secure Admin Login
          </button>
        </form>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <p className="text-[11px] text-slate-500 font-medium">
            Default Demo Credentials: <br />
            <strong>Username:</strong> ahmed | <strong>Password:</strong> solar123
          </p>
        </div>

      </div>
    </div>
  );
}
