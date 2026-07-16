import React from 'react';
import { Gavel, Users } from 'lucide-react';

export default function AuctionGrid() {
  const auctions = [
    { name: "Vintage Rolex Submariner Date 1984", currentBid: 8200.00, bidsCount: 24, imageColor: "bg-amber-100/40", endTime: "2h 15m" },
    { name: "Autographed Michael Jordan Bulls Jersey", currentBid: 3400.00, bidsCount: 18, imageColor: "bg-red-50/40", endTime: "4h 05m" },
    { name: "First Edition Pokémon Charizard Card Holo", currentBid: 12500.00, bidsCount: 42, imageColor: "bg-orange-50/40", endTime: "1h 45m" },
    { name: "DJI Inspire 3 Professional Cinema Drone", currentBid: 6800.00, bidsCount: 11, imageColor: "bg-slate-100/40", endTime: "6h 30m" },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-xl font-bold text-gray-900 uppercase tracking-wider">
          <Gavel className="h-5 w-5 text-[#e62e04]" />
          <h2>Live Auctions</h2>
        </div>
        <a href="#" className="text-sm font-bold text-[#e62e04] hover:text-[#d02500]">View All Auctions</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {auctions.map((auc, idx) => (
          <div key={idx} className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 relative flex flex-col h-full">
            {/* End time badge */}
            <div className="absolute top-2.5 left-2.5 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
              Ends in: {auc.endTime}
            </div>

            {/* Image Placeholder */}
            <div className={`w-full aspect-[4/3] ${auc.imageColor} relative overflow-hidden flex items-center justify-center`}>
              <Gavel className="h-10 w-10 text-gray-300 group-hover:scale-110 transition-transform" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-gray-800 text-xs mb-3 line-clamp-2 leading-normal hover:text-[#e62e04] transition-colors cursor-pointer min-h-[32px]">
                {auc.name}
              </h3>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1 text-gray-400" /> {auc.bidsCount} Bids</span>
                  <span>Current Bid</span>
                </div>
                
                <div className="flex items-end justify-between">
                  <span className="text-base font-bold text-[#e62e04]">${auc.currentBid.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  
                  <button className="bg-[#e62e04] text-white hover:bg-[#d02500] px-4 py-1.5 rounded text-xs font-bold transition-colors shadow-sm">
                    Bid Now
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
