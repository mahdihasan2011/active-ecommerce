import React from 'react';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FlashSale from '../components/home/FlashSale';
import AuctionGrid from '../components/home/AuctionGrid';
import ClassifiedGrid from '../components/home/ClassifiedGrid';
import TopSellers from '../components/home/TopSellers';
import CategorizedShelf from '../components/home/CategorizedShelf';
import Footer from '../components/home/Footer';
import ProductCard from '../components/home/ProductCard';

export default function Home() {
  // Mock data for computer & accessories shelf
  const computerProducts = [
    { name: "Lenovo Legion Pro 5 Gaming Laptop", price: 1299.00, originalPrice: 1599.00, discount: 18, imageColor: "bg-slate-100", rating: 5, reviews: 102 },
    { name: "Logitech MX Master 3S Wireless Mouse", price: 99.00, imageColor: "bg-zinc-100", rating: 5, reviews: 245 },
    { name: "Razer BlackWidow V4 Mechanical Keyboard", price: 169.00, originalPrice: 199.00, discount: 15, imageColor: "bg-gray-100", rating: 4, reviews: 67 },
    { name: "ASUS ROG Swift 32\" 4K OLED Gaming Monitor", price: 899.00, imageColor: "bg-slate-200", rating: 5, reviews: 19 },
    { name: "Samsung 990 PRO NVMe M.2 SSD 2TB", price: 149.00, originalPrice: 179.00, discount: 16, imageColor: "bg-neutral-100", rating: 5, reviews: 312 },
    { name: "TP-Link Deco BE85 Wi-Fi 7 Mesh Router", price: 449.00, imageColor: "bg-stone-100", rating: 4, reviews: 8 },
  ];

  // Mock data for women's fashion shelf
  const fashionProducts = [
    { name: "Classic Trench Coat with Belt detail", price: 120.00, originalPrice: 180.00, discount: 33, imageColor: "bg-amber-50/40", rating: 4, reviews: 54 },
    { name: "Leather Handbag with Gold-tone hardware", price: 85.00, imageColor: "bg-rose-50/40", rating: 5, reviews: 92 },
    { name: "Suede Pointed-Toe High Heels", price: 65.00, originalPrice: 85.00, discount: 23, imageColor: "bg-red-50/40", rating: 4, reviews: 28 },
    { name: "Oversized Polarized Fashion Sunglasses", price: 25.00, imageColor: "bg-yellow-50/40", rating: 4, reviews: 110 },
    { name: "Bohemian Floral Print Maxi Dress", price: 45.00, originalPrice: 60.00, discount: 25, imageColor: "bg-emerald-50/40", rating: 5, reviews: 73 },
    { name: "Rose Gold Quartz Analog Wrist Watch", price: 110.00, imageColor: "bg-orange-50/40", rating: 4, reviews: 41 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900">
      <Header />
      
      <main className="space-y-6">
        {/* Banner + Sidebar Navigation (Gray background header band) */}
        <div className="bg-white border-b border-gray-100">
          <HeroSection />
        </div>

        {/* Categories Circle Grid */}
        <div className="bg-white border-y border-gray-100">
          <CategoryGrid />
        </div>

        {/* Flash Deals with Timer & sold count */}
        <div className="bg-white border-y border-gray-100">
          <FlashSale />
        </div>

        {/* Banner Ad Divider (2 Column Promotion Banners) */}
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-44 bg-gradient-to-r from-rose-500 to-[#e62e04] rounded-lg p-8 flex flex-col justify-center text-white cursor-pointer shadow-sm relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-200 mb-1">Super Deal</span>
            <h3 className="text-2xl font-black mb-3">Kitchen Appliances</h3>
            <span className="text-xs font-bold underline">Get Coupon Code</span>
          </div>
          <div className="h-44 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-8 flex flex-col justify-center text-white cursor-pointer shadow-sm relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-100 mb-1">New Trend</span>
            <h3 className="text-2xl font-black mb-3">Sports & Fitness</h3>
            <span className="text-xs font-bold underline">Shop Collection</span>
          </div>
        </div>

        {/* Shelf 1: Computer & Accessories */}
        <div className="bg-white border-y border-gray-100">
          <CategorizedShelf 
            title="Computer & Accessories"
            subcategories={["Laptops", "Accessories", "Components", "Networking", "Monitors", "Printers"]}
            bannerBg="bg-gradient-to-b from-slate-900 to-indigo-950"
            bannerTitle="Upgrade Your Workspace"
            bannerTagline="Up to 30% Off"
            products={computerProducts}
          />
        </div>

        {/* Live Auctions Grid (Database backing) */}
        <div className="bg-white border-y border-gray-100">
          <AuctionGrid />
        </div>

        {/* Shelf 2: Women's Fashion */}
        <div className="bg-white border-y border-gray-100">
          <CategorizedShelf 
            title="Women's Clothing"
            subcategories={["Dresses", "Shoes", "Handbags", "Accessories", "Outerwear", "Jewelry"]}
            bannerBg="bg-gradient-to-b from-[#e62e04] to-pink-900"
            bannerTitle="Elegance Redefined"
            bannerTagline="Starting at $19"
            products={fashionProducts}
          />
        </div>

        {/* Classified Listings Grid */}
        <div className="bg-white border-y border-gray-100">
          <ClassifiedGrid />
        </div>

        {/* Top Vendor Stores */}
        <div className="bg-white border-t border-gray-100">
          <TopSellers />
        </div>

        {/* Vendor Banner CTA */}
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="w-full bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-10 md:p-12 text-center text-white relative overflow-hidden shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-white">Become a Vendor Today!</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-xl mx-auto">Join our thriving marketplace. Set up your store in minutes, reach millions of buyers, and boost your sales with our premium tools.</p>
            <button className="bg-[#e62e04] hover:bg-[#d02500] text-white px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-md">
              Register Your Store
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
