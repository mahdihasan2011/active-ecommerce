import React from 'react';
import { Tag, MapPin, BadgePercent } from 'lucide-react';

export default function ClassifiedGrid() {
  const classifieds = [
    { name: "iPhone 13 Pro Max - 256GB - Sierra Blue (Used)", price: 550.00, condition: "Excellent", location: "New York, NY", imageColor: "bg-blue-50/30" },
    { name: "Mountain Bike Trek Marlin 7 (Used 6 months)", price: 420.00, condition: "Good", location: "Austin, TX", imageColor: "bg-emerald-50/30" },
    { name: "PlayStation 5 Console with 2 Controllers", price: 320.00, condition: "Like New", location: "Miami, FL", imageColor: "bg-slate-100/30" },
    { name: "Office Ergonomic Mesh Chair (Used)", price: 80.00, condition: "Fair", location: "Chicago, IL", imageColor: "bg-amber-50/30" },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-xl font-bold text-gray-900 uppercase tracking-wider">
          <Tag className="h-5 w-5 text-[#e62e04]" />
          <h2>Classified Ads</h2>
        </div>
        <a href="#" className="text-sm font-bold text-[#e62e04] hover:text-[#d02500]">View Classified Listings</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {classifieds.map((item, idx) => (
          <div key={idx} className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 relative flex flex-col h-full">
            {/* Condition badge */}
            <div className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide flex items-center">
              <BadgePercent className="w-3 h-3 mr-1" /> {item.condition}
            </div>

            {/* Image Placeholder */}
            <div className={`w-full aspect-[4/3] ${item.imageColor} relative overflow-hidden flex items-center justify-center`}>
              <Tag className="h-10 w-10 text-gray-200 group-hover:scale-110 transition-transform" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-gray-800 text-xs mb-3 line-clamp-2 leading-normal hover:text-[#e62e04] transition-colors cursor-pointer min-h-[32px]">
                {item.name}
              </h3>
              
              <div className="mt-auto">
                <div className="flex items-center text-[10px] text-gray-400 mb-3">
                  <MapPin className="w-3 h-3 mr-1 text-gray-300 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                
                <div className="flex items-end justify-between border-t border-gray-50 pt-3">
                  <span className="text-base font-black text-gray-900">${item.price.toFixed(2)}</span>
                  
                  <button className="text-[#e62e04] hover:text-[#d02500] text-xs font-bold transition-colors">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
