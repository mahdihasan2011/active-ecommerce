'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/auth-context';
import { ShoppingBag, LogOut, User, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            ActiveCommerce
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/products" className="hover:text-purple-400 transition-colors">Products</Link>
          <Link href="/" className="hover:text-purple-400 transition-colors">Shops</Link>
          <Link href="/" className="hover:text-purple-400 transition-colors">Analytics</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-300 text-sm">
                <User className="h-4 w-4 text-purple-400" />
                <span className="font-semibold text-white">{user.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {user.role}
                </span>
              </div>

              {(user.role === 'VENDOR' || user.role === 'CUSTOMER') && (
                <Link
                  href="/"
                  className="hidden sm:inline-flex items-center space-x-1 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Onboard Store</span>
                </Link>
              )}

              <button
                onClick={logout}
                className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/30 hover:text-red-400 border border-slate-800 hover:border-red-900/50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/signin"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
