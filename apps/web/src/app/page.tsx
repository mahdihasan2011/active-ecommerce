import React from 'react';
import Navbar from '../components/navbar';
import { ShoppingBag, Search, Shield, Zap, Database, Server, Cpu, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />

      {/* Header / Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-semibold text-purple-300 tracking-wider uppercase">
            <Zap className="h-3 w-3 animate-pulse" />
            <span>Next-Gen Enterprise Architecture</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Scale Multi-Vendor <br />
            Commerce Effortlessly
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            A premium, high-performance monorepo platform built on Next.js 15, NestJS, and Prisma. Powering ultra-fast queries with OpenSearch, microtask execution via BullMQ, and distributed storage.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-semibold shadow-xl shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]">
              <span>Explore Marketplace</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl font-semibold transition-all">
              View Developer Guide
            </button>
          </div>
        </div>

        {/* Tech Stack Cards */}
        <section className="py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mt-4 mb-2 text-white">Next.js 15 SSR Catalog</h3>
            <p className="text-sm text-slate-400 font-light">
              Server-side rendered dynamic listings for SEO optimization and instant interaction.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mt-4 mb-2 text-white">NestJS Core API</h3>
            <p className="text-sm text-slate-400 font-light">
              Strongly typed modular gateway handling auth, commissions, and seller logic.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mt-4 mb-2 text-white">PostgreSQL & Prisma</h3>
            <p className="text-sm text-slate-400 font-light">
              ACID transactional ledgers guaranteeing accurate payouts and inventory balance.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mt-4 mb-2 text-white">Faceted OpenSearch</h3>
            <p className="text-sm text-slate-400 font-light">
              High throughput full-text search with instant autocomplete and attribute filtering.
            </p>
          </div>
        </section>

        {/* Database Status Panel Preview */}
        <section className="mt-12 p-8 rounded-3xl border border-slate-800 bg-slate-900/20 backdrop-blur-md max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <Shield className="text-purple-500 h-6 w-6" />
                <span>System Orchestrator Console</span>
              </h2>
              <p className="text-sm text-slate-400">Environment status and network configurations</p>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
              Infrastructure Ready
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-500 block uppercase font-semibold">Database Driver</span>
              <span className="text-lg font-mono font-bold mt-1 block">PostgreSQL (Prisma)</span>
              <span className="text-xs text-slate-400 mt-2 block">Host: active-ecommerce-postgres</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-500 block uppercase font-semibold">Queue Broker</span>
              <span className="text-lg font-mono font-bold mt-1 block">Redis (BullMQ)</span>
              <span className="text-xs text-slate-400 mt-2 block">Host: active-ecommerce-redis</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-500 block uppercase font-semibold">Object Storage</span>
              <span className="text-lg font-mono font-bold mt-1 block">MinIO (S3 API)</span>
              <span className="text-xs text-slate-400 mt-2 block">Host: active-ecommerce-minio</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 mt-24">
        <div className="container mx-auto px-6 text-center text-sm text-slate-500 font-light">
          &copy; {new Date().getFullYear()} ActiveCommerce Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
