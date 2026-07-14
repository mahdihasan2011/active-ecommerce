'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import { Search, SlidersHorizontal, Tag, Star, ArrowUpDown, RefreshCw, Layers } from 'lucide-react';
import { Category } from '@repo/types';

export default function ProductsCatalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // 1. Fetch categories for filters on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiUrl}/categories`);
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  // 2. Fetch search results dynamically
  const fetchSearchResults = async () => {
    setLoading(true);
    setSearchError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (selectedCategory) params.append('categoryId', selectedCategory);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (sortBy) params.append('sortBy', sortBy);

      const response = await fetch(`${apiUrl}/search?${params.toString()}`);
      const result = await response.json();
      if (result.success) {
        setProducts(result.data || []);
      } else {
        throw new Error(result.error || 'Failed to search products');
      }
    } catch (err: any) {
      console.error(err);
      setSearchError('OpenSearch connection required. Displaying offline demo items.');
      // Offline fallback demo items
      setProducts([
        { id: '1', name: 'Premium Leather Boots', slug: 'leather-boots', price: 189, rating: 4.8, shopName: 'RedWing Store', categoryName: 'Footwear' },
        { id: '2', name: 'Ergonomic Gaming Chair', slug: 'gaming-chair', price: 349, rating: 4.6, shopName: 'Razer Outlet', categoryName: 'Furniture' },
        { id: '3', name: 'Ultra-Wide Curved Monitor', slug: 'curved-monitor', price: 699, rating: 4.9, shopName: 'LG Official Store', categoryName: 'Electronics' },
        { id: '4', name: 'Waterproof Sports Backpack', slug: 'backpack', price: 79, rating: 4.3, shopName: 'Patagonia Shop', categoryName: 'Accessories' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [selectedCategory, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults();
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />

      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="space-y-4 mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Catalog Explorer
          </h1>
          <p className="text-sm text-slate-400 font-light">
            Real-time indexed marketplace faceted search powered by OpenSearch & BullMQ queues.
          </p>
        </div>

        {/* Dual Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 1. Sidebar Filters */}
          <aside className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md space-y-8 h-fit">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="font-bold flex items-center space-x-2 text-sm text-slate-200">
                <SlidersHorizontal className="h-4 w-4 text-purple-400" />
                <span>Filters</span>
              </span>
              <button 
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('');
                  setMinPrice('');
                  setMaxPrice('');
                  setSortBy('newest');
                }}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Category
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === '' 
                      ? 'bg-purple-500/10 text-purple-400 font-medium' 
                      : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.id 
                        ? 'bg-purple-500/10 text-purple-400 font-medium' 
                        : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Price Range
              </span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-purple-500 text-sm focus:outline-none transition-colors"
                />
                <span className="text-slate-600">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-purple-500 text-sm focus:outline-none transition-colors"
                />
              </div>
              <button 
                onClick={fetchSearchResults}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold transition-colors"
              >
                Apply Range
              </button>
            </div>
          </aside>

          {/* 2. Search results grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Search Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search products, stores, categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-purple-500 text-sm focus:outline-none placeholder-slate-500 transition-colors"
                />
              </form>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <ArrowUpDown className="h-4 w-4 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-900/50 border border-slate-800 text-sm rounded-lg px-3 py-2 text-slate-300 focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Error Banner */}
            {searchError && (
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/50 text-purple-400 text-sm flex items-center space-x-2">
                <RefreshCw className="h-4 w-4 animate-spin text-purple-400" />
                <span>{searchError}</span>
              </div>
            )}

            {/* Products grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-80 rounded-2xl border border-slate-850 bg-slate-900/20 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
                <p className="text-slate-400">No products found matching filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/5 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="flex items-center space-x-1">
                          <Layers className="h-3 w-3 text-purple-400" />
                          <span>{prod.categoryName || 'General'}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span>{prod.rating || '0.0'}</span>
                        </span>
                      </div>

                      <h3 className="font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-light mb-4">
                        Sold by <span className="font-semibold text-slate-300">{prod.shopName}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800/50 pt-4">
                      <span className="text-2xl font-bold text-white">
                        ${prod.price}
                      </span>
                      <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-semibold transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
