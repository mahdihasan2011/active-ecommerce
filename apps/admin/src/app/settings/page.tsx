'use client';

import React, { useState } from 'react';
import { Settings, Mail, Shield, Save, ChevronLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SettingsConsole() {
  const [smtp, setSmtp] = useState({
    host: 'smtp.sendgrid.net',
    port: '587',
    user: 'apikey',
    pass: 'SG.dummyKey...',
    encryption: 'TLS',
  });

  const [business, setBusiness] = useState({
    name: 'Bumppa Marketplace Ltd',
    currency: 'USD',
    language: 'English',
    walletStatus: true,
  });

  const [success, setSuccess] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('Configuration settings saved successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans py-12 px-6 relative">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl space-y-8">
        
        {/* Back Link */}
        <div>
          <Link href="/" className="text-slate-400 hover:text-white flex items-center text-xs space-x-1.5 transition-colors mb-4">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            System Settings Console
          </h1>
          <p className="text-sm text-slate-400 font-light mt-1">
            Configure default variables, SMTP credentials, and file system backends.
          </p>
        </div>

        {success && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 text-emerald-400 text-sm flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SMTP Settings Panel */}
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center space-x-2 uppercase tracking-wide">
              <Mail className="h-4 w-4" />
              <span>SMTP / Mailer Credentials</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500 font-light block mb-1">SMTP Server Host</label>
                <input
                  type="text"
                  value={smtp.host}
                  onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 font-light block mb-1">Port</label>
                  <input
                    type="text"
                    value={smtp.port}
                    onChange={(e) => setSmtp({ ...smtp, port: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-light block mb-1">Encryption</label>
                  <select
                    value={smtp.encryption}
                    onChange={(e) => setSmtp({ ...smtp, encryption: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="TLS">TLS</option>
                    <option value="SSL">SSL</option>
                    <option value="NONE">None</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-light block mb-1">Username / Key ID</label>
                <input
                  type="text"
                  value={smtp.user}
                  onChange={(e) => setSmtp({ ...smtp, user: e.target.value })}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 font-light block mb-1">Password / API Token</label>
                <input
                  type="password"
                  value={smtp.pass}
                  onChange={(e) => setSmtp({ ...smtp, pass: e.target.value })}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Business configuration variables */}
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center space-x-2 uppercase tracking-wide">
              <Settings className="h-4 w-4" />
              <span>Business Settings</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500 font-light block mb-1">Platform Brand Name</label>
                <input
                  type="text"
                  value={business.name}
                  onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 font-light block mb-1">Currency Code</label>
                  <input
                    type="text"
                    value={business.currency}
                    onChange={(e) => setBusiness({ ...business, currency: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-light block mb-1">Default Language</label>
                  <input
                    type="text"
                    value={business.language}
                    onChange={(e) => setBusiness({ ...business, language: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-850 bg-slate-950/20 flex justify-between items-center mt-6">
                <div>
                  <p className="text-xs font-bold text-white">Client Deposits Wallet</p>
                  <p className="text-[10px] text-slate-500 font-light">Allow users to pay with internal wallet credits</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBusiness({ ...business, walletStatus: !business.walletStatus })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    business.walletStatus
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {business.walletStatus ? 'Active' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-cyan-500/15 transition-all hover:scale-[1.02]"
            >
              <Save className="h-4 w-4" />
              <span>Save System Settings</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
