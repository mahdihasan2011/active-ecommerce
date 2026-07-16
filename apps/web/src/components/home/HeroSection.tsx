'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap, Star } from 'lucide-react';

export default function HeroSection() {
  const categories = [
    "Electronics & Gadgets", "Fashion & Apparel", "Home & Garden", 
    "Beauty & Health", "Sports & Outdoors", "Toys & Hobbies",
    "Automotive & Bikes", "Books & Stationery", "Groceries & Fresh Food", "Pet Supplies"
  ];

  // Countdown timer for Today's Deal
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6">
      
      {/* 1. Left Column: Categories Sidebar (Persistent on homepage) */}
      <div className="hidden lg:block w-72 shrink-0 bg-white border border-gray-100 rounded-lg shadow-sm">
        <ul className="py-1">
          {categories.map((cat, i) => (
            <li 
              key={i} 
              className="px-5 py-3 text-sm text-gray-700 hover:bg-[#e62e04]/5 hover:text-[#e62e04] cursor-pointer flex justify-between items-center group transition-colors border-b border-gray-50 last:border-b-0 font-medium"
            >
              <span>{cat}</span>
              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#e62e04] transition-colors" />
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Middle Column: Main Promo Banner Slider */}
      <div className="flex-1 min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-orange-50 to-rose-50 rounded-lg flex items-center p-8 md:p-12 relative overflow-hidden group cursor-pointer border border-orange-100/50 shadow-sm">
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
          <div className="w-[450px] h-[450px] bg-[#e62e04]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        </div>
        <div className="relative z-10 max-w-md">
          <span className="inline-block px-3 py-1 bg-[#e62e04] text-white text-xs font-bold uppercase rounded-md mb-4 tracking-wider">
            Festival Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
            Smart Home <br/><span className="text-[#e62e04]">Upgrades</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 font-light">
            Enjoy premium smart assistants and intelligent lighting with up to 45% flat discount. 
          </p>
          <button className="px-8 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-[#e62e04] transition-colors shadow-md">
            Explore Deals
          </button>
        </div>
      </div>

      {/* 3. Right Column: Today's Deal Block (Signature CMS card) */}
      <div className="w-full lg:w-80 bg-white border border-gray-100 rounded-lg shadow-sm p-5 flex flex-col shrink-0">
        <div className="flex items-center space-x-2 text-gray-900 font-bold border-b border-gray-100 pb-3 mb-4">
          <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
          <h3 className="text-base uppercase tracking-wider">Today's Deal</h3>
        </div>

        {/* Product Box */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-md relative mb-4 flex items-center justify-center">
            {/* Promo badge */}
            <span className="absolute top-2 left-2 bg-[#e62e04] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              -35%
            </span>
            <div className="text-xs font-semibold text-gray-400">Device Render Placeholder</div>
          </div>

          <h4 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug mb-2 hover:text-[#e62e04] transition-colors cursor-pointer">
            Samsung Galaxy Watch Ultra LTE 47mm Titanium Grey
          </h4>

          {/* Pricing */}
          <div className="mb-3">
            <span className="text-xl font-bold text-[#e62e04]">$419.00</span>
            <span className="text-xs text-gray-400 line-through ml-2">$649.00</span>
          </div>

          {/* Ratings */}
          <div className="flex items-center space-x-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-gray-400">(48)</span>
          </div>

          {/* Sold limit progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2 relative">
            <div className="bg-[#e62e04] h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="flex justify-between w-full text-[10px] text-gray-500 mb-6">
            <span>Sold: 15/20</span>
            <span>Available: 5</span>
          </div>

          {/* Timer */}
          <div className="mt-auto w-full pt-4 border-t border-gray-100 flex justify-center gap-3">
            <div className="flex flex-col items-center">
              <span className="bg-gray-100 text-gray-800 font-bold text-sm px-2 py-1 rounded w-10">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] text-gray-400 mt-1 uppercase">Hrs</span>
            </div>
            <span className="font-bold text-gray-400 pt-1">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-gray-100 text-gray-800 font-bold text-sm px-2 py-1 rounded w-10">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] text-gray-400 mt-1 uppercase">Min</span>
            </div>
            <span className="font-bold text-gray-400 pt-1">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-[#e62e04] text-white font-bold text-sm px-2 py-1 rounded w-10">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] text-gray-400 mt-1 uppercase">Sec</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
