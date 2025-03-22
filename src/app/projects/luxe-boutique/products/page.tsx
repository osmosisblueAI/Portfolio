'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import LuxeBoutiqueLayout from '@/components/layout/LuxeBoutiqueLayout';

// Product type definition
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  isNew: boolean;
  isFeatured: boolean;
};

// Mock product data
const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Silk Evening Gown',
    price: 1295,
    category: 'Women',
    subcategory: 'Dresses',
    image: '/placeholder.jpg',
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Italian Leather Clutch',
    price: 495,
    category: 'Accessories',
    subcategory: 'Bags',
    image: '/placeholder.jpg',
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'p3',
    name: 'Tailored Wool Suit',
    price: 1895,
    category: 'Men',
    subcategory: 'Suits',
    image: '/placeholder.jpg',
    isNew: false,
    isFeatured: true,
  },
  {
    id: 'p4',
    name: 'Designer Sunglasses',
    price: 350,
    category: 'Accessories',
    subcategory: 'Eyewear',
    image: '/placeholder.jpg',
    isNew: true,
    isFeatured: false,
  },
  {
    id: 'p5',
    name: 'Cashmere Sweater',
    price: 595,
    category: 'Women',
    subcategory: 'Knitwear',
    image: '/placeholder.jpg',
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'p6',
    name: 'Leather Oxford Shoes',
    price: 795,
    category: 'Men',
    subcategory: 'Footwear',
    image: '/placeholder.jpg',
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'p7',
    name: 'Diamond Pendant Necklace',
    price: 2495,
    category: 'Accessories',
    subcategory: 'Jewelry',
    image: '/placeholder.jpg',
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'p8',
    name: 'Silk Pajama Set',
    price: 395,
    category: 'Women',
    subcategory: 'Sleepwear',
    image: '/placeholder.jpg',
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'p9',
    name: 'Merino Wool Scarf',
    price: 195,
    category: 'Accessories',
    subcategory: 'Scarves',
    image: '/placeholder.jpg',
    isNew: false,
    isFeatured: false,
  },
];

// Filter options
const CATEGORIES = ['All', 'Women', 'Men', 'Accessories'];
const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low'];

export default function ProductCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...PRODUCTS];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by new items
    if (showNewOnly) {
      filtered = filtered.filter(product => product.isNew);
    }

    // Sort products
    if (sortBy === 'Price: Low to High') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Sort by newest (assuming newer items are first in our mock data)
      filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, priceRange, showNewOnly]);

  return (
    <LuxeBoutiqueLayout>
      <div className="container mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gold">Shop Our Collection</h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Explore our exclusive selection of luxury goods curated for the discerning client.
            Each piece meets our exceptional standards of design, quality, and craftsmanship.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between p-3 border border-gold/20 text-gold"
            >
              <span>Filters & Sorting</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Sidebar Filters */}
          <motion.aside
            className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/50 border border-gold/20 p-6 space-y-8">
              <div>
                <h3 className="text-gold font-montserrat mb-4">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left py-2 ${
                        selectedCategory === category ? 'text-gold' : 'text-ivory hover:text-gold/80'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-gold font-montserrat mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full appearance-none h-1 bg-gold/30 rounded outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-gold font-montserrat mb-4">Sort By</h3>
                <div className="space-y-2">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`block w-full text-left py-2 ${
                        sortBy === option ? 'text-gold' : 'text-ivory hover:text-gold/80'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3 text-ivory cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNewOnly}
                    onChange={(e) => setShowNewOnly(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-gold border-gold rounded focus:ring-gold"
                  />
                  <span>New Arrivals Only</span>
                </label>
              </div>
            </div>
          </motion.aside>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-black border border-gold/10 rounded-lg overflow-hidden"
                    whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(212, 175, 55, 0.3)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Link href={`/projects/luxe-boutique/products/${product.id}`}>
                      <div className="relative h-80 bg-gradient-to-br from-gold/5 to-black/40 flex items-center justify-center">
                        {product.isNew && (
                          <div className="absolute top-3 right-3 bg-gold text-black text-xs font-bold px-2 py-1">
                            NEW
                          </div>
                        )}
                        <div className="text-center text-ivory/30">
                          <p>[Product Image]</p>
                          <p className="text-xs mt-1">Simulated product</p>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="text-xs text-gold/70 mb-1">{product.subcategory}</div>
                      <h3 className="text-ivory font-medium">{product.name}</h3>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-gold">${product.price}</span>
                        <motion.button
                          className="bg-gold/10 hover:bg-gold/20 text-gold p-2 rounded-full"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 text-ivory/60">
                <p className="text-xl">No products match your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 3000]);
                    setShowNewOnly(false);
                    setSortBy('Newest');
                  }}
                  className="mt-4 text-gold underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </LuxeBoutiqueLayout>
  );
} 