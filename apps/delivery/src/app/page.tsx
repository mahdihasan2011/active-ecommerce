import React from 'react';
import { Truck, ShieldCheck, MapPin, Navigation, Phone, CheckCircle2, DollarSign } from 'lucide-react';

export default function DeliveryDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Bumppa Logistics
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold">Rider John</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              On Duty
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="container mx-auto px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              Logistics Dispatch Panel
            </h1>
            <p className="text-sm text-slate-400 font-light mt-1">
              Check incoming pickup requests, route doorstep navigation, and record digital signatures PoD.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-2.5 rounded-xl border border-emerald-500/30 text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mr-2" />
            Fulfillment Active
          </div>
        </div>

        {/* Operational Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Active Tasks</span>
              <Truck className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">3 Packages</p>
            <span className="text-xs text-slate-400">2 in transit, 1 ready for pickup</span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">COD Cash Collected</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">$450</p>
            <span className="text-xs text-slate-400">Requires daily cash reconciliation</span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Delivered Today</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">12 Trips</p>
            <span className="text-xs text-slate-400">100% successful handovers</span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Rider Rating</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">4.92 / 5.0</p>
            <span className="text-xs text-slate-400">Top Tier Logistics Partner</span>
          </div>
        </section>

        {/* Active Delivery Handovers */}
        <section className="p-8 rounded-3xl border border-slate-900 bg-slate-900/20 backdrop-blur-md max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold flex items-center space-x-2 border-b border-slate-900 pb-4">
            <MapPin className="text-emerald-500 h-6 w-6" />
            <span>Active Assignment Details</span>
          </h2>

          <div className="space-y-4">
            {/* Active task 1 */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Ready for Pickup
                  </span>
                  <span className="text-xs text-slate-500">Order #BUMP-9584</span>
                </div>
                <h4 className="font-bold text-base text-slate-200">RedWing Store (Boot collection)</h4>
                <p className="text-xs text-slate-400 font-light flex items-center">
                  <MapPin className="h-3.5 w-3.5 text-purple-400 mr-1" />
                  <span>Downtown Commercial Area, Shop 12</span>
                </p>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                <button className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-all">
                  <Phone className="h-4.5 w-4.5" />
                </button>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-semibold shadow-lg shadow-emerald-500/10 flex items-center space-x-1.5 transition-all">
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
