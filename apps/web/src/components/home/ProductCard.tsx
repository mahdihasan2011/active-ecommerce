import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  imageColor: string;
  rating: number;
  reviews: number;
  discount?: number;
}

export default function ProductCard({ name, price, originalPrice, imageColor, rating, reviews, discount }: ProductCardProps) {
  return (
    <div className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 relative flex flex-col h-full">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-2.5 left-2.5 bg-[#e62e04] text-white text-[10px] font-bold px-2 py-0.5 rounded z-10 uppercase tracking-wide">
          -{discount}% Off
        </div>
      )}
      
      {/* Wishlist Button */}
      <button className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-red-50 text-gray-400 hover:text-[#e62e04] rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100 shadow-sm">
        <Heart className="h-3.5 w-3.5" />
      </button>

      {/* Image Placeholder */}
      <div className={`w-full aspect-[4/3] ${imageColor} relative overflow-hidden flex items-center justify-center`}>
         <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Product Render</div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">({reviews})</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-xs mb-2 line-clamp-2 leading-normal hover:text-[#e62e04] transition-colors cursor-pointer min-h-[32px]">
          {name}
        </h3>
        
        {/* Price Row */}
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div>
            <span className="text-base font-bold text-[#e62e04]">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-[10px] text-gray-400 line-through ml-1.5">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Add to Cart button */}
          <button className="bg-gray-100 text-gray-600 hover:bg-[#e62e04] hover:text-white p-2 rounded-md transition-all shrink-0 shadow-sm">
            <ShoppingCart className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
