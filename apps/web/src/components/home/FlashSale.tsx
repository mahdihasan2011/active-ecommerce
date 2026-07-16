'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Zap } from 'lucide-react';

export default function FlashSale() {
  const products = [
    { name: "Sony WH-1000XM4 Noise Canceling Headphones", price: 248.00, originalPrice: 348.00, discount: 28, imageColor: "bg-gray-100", rating: 5, reviews: 124, sold: 14, total: 30 },
    { name: "Apple Watch Series 9 GPS 41mm", price: 329.00, originalPrice: 399.00, discount: 17, imageColor: "bg-rose-100", rating: 4, reviews: 89, sold: 25, total: 40 },
    { name: "Nike Air Max 270 React", price: 119.00, originalPrice: 150.00, discount: 20, imageColor: "bg-blue-100", rating: 4, reviews: 56, sold: 8, total: 20 },
    { name: "Samsung Galaxy Tab S9 Ultra", price: 999.00, originalPrice: 1199.00, discount: 16, imageColor: "bg-slate-200", rating: 5, reviews: 42, sold: 19, total: 20 },
    { name: "Dyson V15 Detect Cordless Vacuum", price: 599.00, originalPrice: 749.00, discount: 20, imageColor: "bg-purple-100", rating: 5, reviews: 215, sold: 60, total: 100 },
  ];

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 12, minutes: 34, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center space-x-2 text-2xl font-black text-gray-900">
            <Zap className="h-6 w-6 text-[#e62e04] fill-[#e62e04]" />
            <h2>Flash Sale</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ends in</span>
            <div className="flex space-x-1.5 text-xs font-bold text-white">
              <span className="bg-[#e62e04] px-2.5 py-1.5 rounded">{timeLeft.days}d</span>
              <span className="bg-[#e62e04] px-2.5 py-1.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span className="bg-[#e62e04] px-2.5 py-1.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span className="bg-[#e62e04] px-2.5 py-1.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>
        <a href="#" className="text-sm font-bold text-[#e62e04] hover:text-[#d02500] hover:underline transition-colors mt-2 md:mt-0">View All Deals</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="flex-1">
              <ProductCard {...product} />
            </div>
            {/* Quantity sold progress bar (Specific to Active eCommerce Flash deals) */}
            <div className="mt-3 px-3">
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1.5 relative overflow-hidden">
                <div className="bg-[#e62e04] h-1.5 rounded-full" style={{ width: `${(product.sold / product.total) * 100}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Sold: {product.sold}/{product.total}</span>
                <span>Available: {product.total - product.sold}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
