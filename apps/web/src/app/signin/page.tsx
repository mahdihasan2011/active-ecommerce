'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/auth-context';
import { ShoppingBag, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Login failed. Please check credentials.');
      }

      setSuccess('Logged in successfully!');
      login(result.data.accessToken, result.data.user);
      
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-6 overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 z-10">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ActiveCommerce
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-400">Enter your credentials to access your console</p>
        </div>

        {/* Form Container with Glassmorphism */}
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/50 text-red-400 text-sm flex items-center space-x-2">
                <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 text-sm flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 focus:border-purple-500 text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Password
                </label>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 focus:border-purple-500 text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-6 font-light">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
