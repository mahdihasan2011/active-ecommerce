import React from 'react';
import ProductCard from './ProductCard';

interface CategorizedShelfProps {
  title: string;
  subcategories: string[];
  bannerBg: string;
  bannerTitle: string;
  bannerTagline: string;
  products: {
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    imageColor: string;
    rating: number;
    reviews: number;
  }[];
}

export default function CategorizedShelf({ title, subcategories, bannerBg, bannerTitle, bannerTagline, products }: CategorizedShelfProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Category Title Header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">{title}</h2>
        <div className="hidden md:flex space-x-6 text-sm text-gray-500 font-medium">
          {subcategories.slice(0, 4).map((sub, i) => (
            <a key={i} href="#" className="hover:text-[#e62e04] transition-colors">{sub}</a>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* 1. Left Sub-Links & Banner Column */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          {/* Sub-links List */}
          <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hidden lg:block">
            <h4 className="font-bold text-gray-800 text-sm mb-4 border-b border-gray-50 pb-2">Sub Categories</h4>
            <ul className="space-y-3 text-xs text-gray-500 font-medium">
              {subcategories.map((sub, i) => (
                <li key={i} className="hover:text-[#e62e04] cursor-pointer transition-colors flex justify-between items-center">
                  {sub}
                  <span className="text-[10px] text-gray-300">»</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tall Vertical Banner */}
          <div className={`flex-1 min-h-[220px] rounded-lg p-6 flex flex-col justify-end ${bannerBg} relative overflow-hidden group border border-orange-100/40 shadow-sm cursor-pointer`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <div className="relative z-20 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-300 mb-1 block">{bannerTagline}</span>
              <h3 className="text-xl font-black leading-tight mb-4">{bannerTitle}</h3>
              <span className="text-xs font-bold underline hover:text-orange-200 transition-colors">Shop Now</span>
            </div>
          </div>
        </div>

        {/* 2. Right Products Grid (6 items, 3 cols desktop, 2 cols tablet) */}
        <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>

      </div>
    </div>
  );
}
