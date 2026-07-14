import React from 'react';
import { Shield, Users, DollarSign, Settings, Bell, TrendingUp, Key } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Bumppa Admin
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-semibold">Super Admin</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Staff
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="container mx-auto px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              System Command Center
            </h1>
            <p className="text-sm text-slate-400 font-light mt-1">
              Configure system parameters, verify seller onboardings, and track transactional splits.
            </p>
          </div>
          <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl font-semibold shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02]">
            <Settings className="h-4 w-4" />
            <span>Settings Console</span>
          </button>
        </div>

        {/* Operational Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Gross GMV</span>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">$1,249,850</p>
            <span className="text-xs text-slate-400 flex items-center space-x-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400 mr-1" />
              <span className="text-emerald-400 font-bold">+18.4%</span>
              <span>this month</span>
            </span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Commission Income</span>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">$124,985</p>
            <span className="text-xs text-slate-400">10% Platform Cut</span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Active Sellers</span>
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">412</p>
            <span className="text-xs text-slate-400">18 pending onboarding review</span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Security Status</span>
              <Key className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-emerald-400">SECURE</p>
            <span className="text-xs text-slate-400">All services active</span>
          </div>
        </section>

        {/* Panel controls */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-3xl border border-slate-900 bg-slate-900/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Shield className="text-cyan-400 h-5 w-5" />
              <span>Staff Configuration</span>
            </h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Create, configure, and monitor internal roles and permission sets for support staff, content managers, and financial analysts.
            </p>
            <button className="px-4 py-2 border border-slate-800 hover:bg-slate-900 text-xs font-semibold rounded-lg transition-colors">
              Manage Staff Roles
            </button>
          </div>

          <div className="p-6 rounded-3xl border border-slate-900 bg-slate-900/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Settings className="text-cyan-400 h-5 w-5" />
              <span>Verification Center Audit</span>
            </h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Audit KYC documents submitted by sellers, evaluate trade license verification parameters, and clear merchants for platform sales.
            </p>
            <button className="px-4 py-2 border border-slate-800 hover:bg-slate-900 text-xs font-semibold rounded-lg transition-colors">
              Audit Queue
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
