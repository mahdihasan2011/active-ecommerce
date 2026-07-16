import React from 'react';
import { Smartphone, Shirt, Home, Watch, Car, Coffee, Music, Dumbbell, Gamepad, Baby, Camera, Plane } from 'lucide-react';

export default function CategoryGrid() {
  const categories = [
    { name: "Electronics", icon: Smartphone, bg: "bg-blue-50/50", border: "hover:border-blue-200" },
    { name: "Fashion", icon: Shirt, bg: "bg-pink-50/50", border: "hover:border-pink-200" },
    { name: "Home & Kitchen", icon: Home, bg: "bg-emerald-50/50", border: "hover:border-emerald-200" },
    { name: "Accessories", icon: Watch, bg: "bg-amber-50/50", border: "hover:border-amber-200" },
    { name: "Automotive", icon: Car, bg: "bg-gray-50/50", border: "hover:border-gray-200" },
    { name: "Groceries", icon: Coffee, bg: "bg-orange-50/50", border: "hover:border-orange-200" },
    { name: "Music & Audio", icon: Music, bg: "bg-indigo-50/50", border: "hover:border-indigo-200" },
    { name: "Sports Gear", icon: Dumbbell, bg: "bg-red-50/50", border: "hover:border-red-200" },
    { name: "Gaming Zone", icon: Gamepad, bg: "bg-purple-50/50", border: "hover:border-purple-200" },
    { name: "Baby & Toys", icon: Baby, bg: "bg-teal-50/50", border: "hover:border-teal-200" },
    { name: "Photography", icon: Camera, bg: "bg-cyan-50/50", border: "hover:border-cyan-200" },
    { name: "Travel Deals", icon: Plane, bg: "bg-sky-50/50", border: "hover:border-sky-200" },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="border-b border-gray-100 pb-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">Featured Categories</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            className={`bg-white border border-gray-100 rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all group ${cat.border}`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
              <cat.icon className="h-6 w-6 text-gray-600 group-hover:text-[#e62e04] transition-colors" />
            </div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-[#e62e04] transition-colors leading-tight">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
