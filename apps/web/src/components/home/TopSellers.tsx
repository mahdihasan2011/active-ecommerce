import React from 'react';
import { Store, Star, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TopSellers() {
  const sellers = [
    { name: "Super Gadget Store", rating: 4.8, salesCount: "1.2k+ Sales", productsCount: "120 Products", imageColor: "bg-blue-50/50" },
    { name: "Fashion Zone Ltd.", rating: 4.9, salesCount: "3.4k+ Sales", productsCount: "450 Products", imageColor: "bg-pink-50/50" },
    { name: "Home Comforts", rating: 4.7, salesCount: "820 Sales", productsCount: "95 Products", imageColor: "bg-emerald-50/50" },
    { name: "A1 Accessories", rating: 4.6, salesCount: "2.1k+ Sales", productsCount: "180 Products", imageColor: "bg-amber-50/50" },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-xl font-bold text-gray-900 uppercase tracking-wider">
          <Store className="h-5 w-5 text-[#e62e04]" />
          <h2>Top Rated Shops</h2>
        </div>
        <a href="#" className="text-sm font-bold text-[#e62e04] hover:text-[#d02500]">View All Shops</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sellers.map((shop, idx) => (
          <div key={idx} className="group bg-white border border-gray-100 rounded-lg p-5 flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:border-orange-200 transition-all">
            {/* Logo box */}
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${shop.imageColor} relative group-hover:scale-105 transition-transform`}>
              <Store className="h-8 w-8 text-gray-500 group-hover:text-[#e62e04] transition-colors" />
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full shadow-sm" title="Verified Shop">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <h3 className="font-bold text-gray-800 text-sm mb-1.5 hover:text-[#e62e04] transition-colors">
              {shop.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-gray-700">{shop.rating}</span>
            </div>

            {/* Info details */}
            <div className="text-[11px] text-gray-400 mb-5 space-y-0.5">
              <span className="block font-medium">{shop.salesCount}</span>
              <span className="block">{shop.productsCount}</span>
            </div>

            {/* Visit Store Button */}
            <button className="w-full py-2 bg-gray-50 text-gray-600 font-semibold text-xs rounded-md group-hover:bg-[#e62e04] group-hover:text-white transition-colors flex items-center justify-center space-x-1">
              <span>Visit Store</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
