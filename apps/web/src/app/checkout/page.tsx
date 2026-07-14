'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import { useAuth } from '../../context/auth-context';
import { ShoppingBag, ArrowRight, ShieldCheck, Wallet, Truck, CheckCircle2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { user, token } = useAuth();
  const [cartGroups, setCartGroups] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'WALLET' | 'COD'>('WALLET');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 1. Initial cart setup (Mock items grouped by vendor for checkout)
  useEffect(() => {
    setCartGroups([
      {
        shopId: 'shop-1',
        shopName: 'RedWing Official Store',
        items: [
          { productId: 'prod-1', variantId: 'var-1', name: 'Premium Leather Boots', price: 189, quantity: 1 },
        ],
      },
      {
        shopId: 'shop-2',
        shopName: 'LG Electronics Store',
        items: [
          { productId: 'prod-3', variantId: 'var-3', name: 'Ultra-Wide Curved Monitor', price: 699, quantity: 1 },
        ],
      },
    ]);
  }, []);

  const calculateTotal = () => {
    return cartGroups.reduce((total, group) => {
      const groupSum = group.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
      return total + groupSum;
    }, 0);
  };

  const handleCheckout = async (group: any) => {
    if (!user || !token) {
      setError('Please sign in to place an order');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const payload = {
      shopId: group.shopId,
      items: group.items.map((item: any) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
      paymentMethod,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/orders/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Checkout failed');
      }

      setSuccess(`Checkout successful for ${group.shopName}!`);
      // Remove successfully checked out group
      setCartGroups((prev) => prev.filter((g) => g.shopId !== group.shopId));
    } catch (err: any) {
      setError(err.message || 'Failed to complete transaction.');
    } finally {
      setLoading(false);
    }
  };

  const totalCost = calculateTotal();

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />

      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

      <main className="container mx-auto px-6 py-12 relative z-10 max-w-5xl">
        <div className="space-y-4 mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Multi-Vendor Checkout
          </h1>
          <p className="text-sm text-slate-400 font-light">
            Review your order items grouped by shop. Complete transactions individually via Postgres ACID pipelines.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-sm flex items-center space-x-2 mb-6">
            <ShieldAlert className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 text-emerald-400 text-sm flex items-center space-x-2 mb-6">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Split checkout list */}
          <div className="lg:col-span-2 space-y-6">
            {cartGroups.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 backdrop-blur-md">
                <ShoppingBag className="h-10 w-10 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-light mb-4">Your checkout queue is empty.</p>
                <Link href="/products" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-semibold transition-colors">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              cartGroups.map((group) => (
                <div key={group.shopId} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-sm text-slate-300">
                      Store: <span className="text-purple-400">{group.shopName}</span>
                    </h3>
                    <span className="text-xs text-slate-500">Split Session</span>
                  </div>

                  <div className="space-y-4">
                    {group.items.map((item: any) => (
                      <div key={item.variantId} className="flex justify-between items-center text-sm">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-xs text-slate-500 font-light">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-mono font-bold">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-850 pt-4 mt-2">
                    <div>
                      <p className="text-xs text-slate-500">Group Subtotal</p>
                      <p className="text-xl font-bold text-white">
                        ${group.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCheckout(group)}
                      disabled={loading}
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl text-xs font-semibold shadow-lg shadow-purple-500/10 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                      <span>Checkout Split</span>
                      <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment Method & Summary Details Panel */}
          <div className="space-y-6">
            
            {/* Wallet Info Cards */}
            {user && (
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                  Your Account Balance
                </span>
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono text-white">${user.walletBalance || '0.00'}</p>
                    <p className="text-xs text-slate-500 font-light">Wallet Cash Available</p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment options Selector */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md space-y-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Payment Method
              </span>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('WALLET')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                    paymentMethod === 'WALLET'
                      ? 'border-purple-500 bg-purple-500/10 text-white'
                      : 'border-slate-850 bg-slate-950/20 text-slate-400 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Wallet className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-bold">Wallet Cash</p>
                      <p className="text-xs opacity-75 font-light">Instant safe split payouts</p>
                    </div>
                  </div>
                  <ShieldCheck className={`h-5 w-5 ${paymentMethod === 'WALLET' ? 'text-purple-400' : 'opacity-0'}`} />
                </button>

                <button
                  onClick={() => setPaymentMethod('COD')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-purple-500 bg-purple-500/10 text-white'
                      : 'border-slate-850 bg-slate-950/20 text-slate-400 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-bold">Cash on Delivery</p>
                      <p className="text-xs opacity-75 font-light">Pay upon doorstep package drop</p>
                    </div>
                  </div>
                  <ShieldCheck className={`h-5 w-5 ${paymentMethod === 'COD' ? 'text-purple-400' : 'opacity-0'}`} />
                </button>
              </div>
            </div>

            {/* Total Order Summary */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md space-y-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Order Summary
              </span>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Cart Subtotal</span>
                  <span>${totalCost}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Logistics/Shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
                <div className="flex justify-between font-bold text-white border-t border-slate-800 pt-3 text-lg">
                  <span>Total Cost</span>
                  <span>${totalCost}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
