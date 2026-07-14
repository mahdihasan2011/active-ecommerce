import React from 'react';
import { Store, PlusCircle, Package, ArrowUpRight, Folder, Printer, CircleDollarSign } from 'lucide-react';

export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Bumppa Merchant
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold">Jane Shop owner</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30">
              Premium Seller
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="container mx-auto px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              Seller Cockpit
            </h1>
            <p className="text-sm text-slate-400 font-light mt-1">
              Add new catalog products, fulfill pending customer orders, and manage financial payouts.
            </p>
          </div>
          <button className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 rounded-xl font-semibold shadow-lg shadow-pink-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02]">
            <PlusCircle className="h-4 w-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Operational Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Net Sales Revenue</span>
              <CircleDollarSign className="h-4 w-4 text-pink-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">$24,850</p>
            <span className="text-xs text-slate-400">Net after platform commissions</span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Withdrawable Balance</span>
              <CircleDollarSign className="h-4 w-4 text-pink-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">$4,250</p>
            <button className="text-xs text-pink-400 hover:text-pink-300 font-semibold flex items-center space-x-1">
              <span>Withdraw Request</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Active Inventory</span>
              <Package className="h-4 w-4 text-pink-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">124 Items</p>
            <span className="text-xs text-slate-400">All variations active</span>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-3">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs uppercase font-semibold tracking-wider">Media Uploads</span>
              <Folder className="h-4 w-4 text-pink-400" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-white">48 files</p>
            <span className="text-xs text-slate-400">12.4 MB on S3 Storage</span>
          </div>
        </section>

        {/* Panel controls */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-3xl border border-slate-900 bg-slate-900/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Package className="text-pink-400 h-5 w-5" />
              <span>Bulk Data Engine</span>
            </h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Quickly sync price sheets or restock items across all colors and sizes variations using spreadsheet operations.
            </p>
            <button className="px-4 py-2 border border-slate-800 hover:bg-slate-900 text-xs font-semibold rounded-lg transition-colors">
              CSV Bulk Import
            </button>
          </div>

          <div className="p-6 rounded-3xl border border-slate-900 bg-slate-900/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Printer className="text-pink-400 h-5 w-5" />
              <span>Thermal Printer Hub</span>
            </h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Export transactional packing slips and generate receipts instantly using background PDF creation templates.
            </p>
            <button className="px-4 py-2 border border-slate-800 hover:bg-slate-900 text-xs font-semibold rounded-lg transition-colors">
              Print Pending Slips
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
