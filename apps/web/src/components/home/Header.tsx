'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/auth-context';
import { ShoppingBag, Search, Heart, User, ChevronDown, Menu, ShoppingCart, GitCompare, PhoneCall, Mail } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#f8f9fa] border-b border-gray-100 text-xs text-gray-500 py-2.5 hidden md:block">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center hover:text-[#e62e04] cursor-pointer transition-colors">
              <PhoneCall className="w-3.5 h-3.5 mr-1.5" /> +1 (800) 123-4567
            </span>
            <span className="flex items-center hover:text-[#e62e04] cursor-pointer transition-colors">
              <Mail className="w-3.5 h-3.5 mr-1.5" /> support@activecommerce.com
            </span>
          </div>
          <div className="flex space-x-6 items-center">
            <Link href="/" className="hover:text-[#e62e04] transition-colors">Track Order</Link>
            <Link href="/" className="hover:text-[#e62e04] transition-colors">Blogs</Link>
            <span className="flex items-center cursor-pointer hover:text-[#e62e04] transition-colors">English <ChevronDown className="w-3 h-3 ml-1"/></span>
            <span className="flex items-center cursor-pointer hover:text-[#e62e04] transition-colors">USD <ChevronDown className="w-3 h-3 ml-1"/></span>
          </div>
        </div>
      </div>

      {/* Middle Header */}
      <div className="container mx-auto px-4 md:px-6 py-5 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <div className="h-10 w-10 bg-[#e62e04] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
            <ShoppingBag className="text-white h-5 w-5" />
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">Active<span className="text-[#e62e04]">Ecommerce</span></span>
        </Link>

        {/* Search Bar (Signature Active eCommerce style) */}
        <div className="hidden md:flex flex-1 max-w-2xl relative border-2 border-[#e62e04] rounded-full overflow-hidden shadow-sm">
          <select className="bg-gray-50 border-r border-gray-200 text-gray-600 text-xs px-4 focus:ring-0 cursor-pointer outline-none font-medium">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Automotive</option>
          </select>
          <input 
            type="text" 
            placeholder="I am shopping for..." 
            className="w-full px-4 py-2.5 bg-white text-sm focus:ring-0 outline-none text-gray-700 placeholder-gray-400"
          />
          <button className="px-6 bg-[#e62e04] text-white hover:bg-[#d02500] transition-colors flex items-center justify-center shrink-0">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Right side Icons */}
        <div className="flex items-center space-x-6">
          {/* Compare */}
          <div className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-[#e62e04] transition-colors relative group">
            <GitCompare className="h-6 w-6" />
            <span className="text-[10px] font-medium text-gray-500 mt-1 group-hover:text-[#e62e04]">Compare</span>
            <span className="absolute -top-1 -right-2 bg-[#e62e04] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </div>
          {/* Wishlist */}
          <div className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-[#e62e04] transition-colors relative group">
            <Heart className="h-6 w-6" />
            <span className="text-[10px] font-medium text-gray-500 mt-1 group-hover:text-[#e62e04]">Wishlist</span>
            <span className="absolute -top-1 -right-2 bg-[#e62e04] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </div>
          {/* Cart */}
          <div className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-[#e62e04] transition-colors relative group">
            <ShoppingCart className="h-6 w-6" />
            <span className="text-[10px] font-medium text-gray-500 mt-1 group-hover:text-[#e62e04]">Cart</span>
            <span className="absolute -top-1 -right-2 bg-[#e62e04] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
          </div>
          
          {/* Auth */}
          {user ? (
             <div className="flex flex-col items-end border-l border-gray-200 pl-4">
               <span className="text-sm font-semibold text-gray-800">{user.name}</span>
               <button onClick={logout} className="text-xs text-red-500 hover:underline">Logout</button>
             </div>
          ) : (
            <Link href="/signin" className="flex items-center space-x-2 text-gray-600 hover:text-[#e62e04] transition-colors border-l border-gray-200 pl-4">
              <div className="p-2 bg-gray-100 rounded-full"><User className="h-5 w-5 text-gray-500" /></div>
              <div className="hidden lg:block text-left text-xs">
                <span className="block font-medium text-gray-400">Hello, Sign In</span>
                <span className="block font-bold text-gray-800">My Account</span>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Mega Menu Bar */}
      <div className="border-t border-gray-100 hidden lg:block bg-white">
        <div className="container mx-auto px-6 flex items-center justify-between text-sm font-medium text-gray-700">
          <div className="flex items-center space-x-8">
            <div className="bg-[#e62e04] text-white flex items-center space-x-3 px-8 py-3.5 cursor-pointer hover:bg-[#d02500] transition-colors font-bold rounded-t-lg shrink-0">
              <Menu className="h-5 w-5" />
              <span>Browse Categories</span>
              <ChevronDown className="h-4 w-4 ml-6" />
            </div>
            <nav className="flex space-x-8 py-3.5">
              <Link href="/" className="hover:text-[#e62e04] transition-colors">Home</Link>
              <Link href="/products" className="hover:text-[#e62e04] transition-colors">Flash Sale</Link>
              <Link href="/products" className="hover:text-[#e62e04] transition-colors">Today's Deal</Link>
              <Link href="/products" className="hover:text-[#e62e04] transition-colors">Auctions</Link>
              <Link href="/products" className="hover:text-[#e62e04] transition-colors">Classifieds</Link>
              <Link href="/products" className="hover:text-[#e62e04] transition-colors">Brands</Link>
              <Link href="/products" className="hover:text-[#e62e04] transition-colors">Coupons</Link>
            </nav>
          </div>
          <div className="shrink-0">
            <Link href="/" className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
              Become a Seller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
