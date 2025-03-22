'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import LuxeBoutiqueLayout from '@/components/layout/LuxeBoutiqueLayout';

// Product type definition
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  description: string;
  features: string[];
  details: {
    material: string;
    care: string;
    origin: string;
  };
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  isNew: boolean;
  isFeatured: boolean;
};

// Mock product data
const PRODUCTS: Record<string, Product> = {
  p1: {
    id: 'p1',
    name: 'Silk Evening Gown',
    price: 1295,
    category: 'Women',
    subcategory: 'Dresses',
    description: 'A luxurious silk evening gown with a flowing silhouette and delicate beadwork. Designed for elegant occasions, this piece embodies timeless sophistication with a modern twist.',
    features: [
      'Hand-embroidered beadwork',
      'Pure silk fabric',
      'Draped back with cascading detail',
      'Hidden side zipper',
      'Fully lined'
    ],
    details: {
      material: '100% Silk, Lining: 95% Silk, 5% Elastane',
      care: 'Dry clean only',
      origin: 'Made in Italy'
    },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight', hex: '#0A1F3C' },
      { name: 'Ruby', hex: '#9B2242' },
      { name: 'Champagne', hex: '#DFCFBD' }
    ],
    images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
    isNew: true,
    isFeatured: true,
  },
  p2: {
    id: 'p2',
    name: 'Italian Leather Clutch',
    price: 495,
    category: 'Accessories',
    subcategory: 'Bags',
    description: 'Expertly crafted from buttery soft Italian leather, this clutch combines minimalist design with maximum luxury. Perfect for both formal events and elevated casual wear.',
    features: [
      'Premium Italian calfskin leather',
      'Gold-toned hardware',
      'Suede interior lining',
      'Interior pocket',
      'Magnetic closure'
    ],
    details: {
      material: 'Outer: 100% Calfskin Leather, Lining: 100% Suede',
      care: 'Spot clean with leather conditioner',
      origin: 'Handcrafted in Florence, Italy'
    },
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Cognac', hex: '#854D27' },
      { name: 'Ivory', hex: '#F2F0E6' }
    ],
    images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
    isNew: true,
    isFeatured: true,
  }
};

// Default product for fallback
const DEFAULT_PRODUCT = PRODUCTS.p1;

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params.id as string;
  
  // Find product by ID or use default
  const product = PRODUCTS[productId] || DEFAULT_PRODUCT;
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Add to cart animation
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  
  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  return (
    <LuxeBoutiqueLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center text-ivory/60 text-sm">
          <Link href="/projects/luxe-boutique" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/projects/luxe-boutique/products" className="hover:text-gold transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">{product?.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-3/5">
            <div className="relative">
              {/* Main image with zoom effect */}
              <div 
                ref={imageRef}
                className="w-full h-[500px] bg-gradient-to-br from-gold/5 to-black/40 flex items-center justify-center overflow-hidden relative cursor-zoom-in"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
              >
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-gold text-black text-xs font-bold px-2 py-1">
                    NEW
                  </div>
                )}
                
                <div className="text-center text-ivory/30 pointer-events-none">
                  <p>[Product Image {selectedImageIndex + 1}]</p>
                  <p className="text-xs mt-1">Simulated product</p>
                </div>
                
                {/* Zoom overlay */}
                {showZoom && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-gold/10 to-black/50 opacity-90 pointer-events-none"
                    style={{
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '250% 250%',
                      backgroundRepeat: 'no-repeat'
                    }}
                  ></div>
                )}
              </div>
              
              {/* Thumbnail images */}
              <div className="flex mt-4 space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 bg-gradient-to-br from-gold/5 to-black/40 flex items-center justify-center ${
                      selectedImageIndex === index 
                        ? 'border-2 border-gold' 
                        : 'border border-gold/30'
                    }`}
                  >
                    <div className="text-xs text-ivory/30">#{index + 1}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-2/5">
            <div className="text-xs text-gold/70 mb-1">{product.category} / {product.subcategory}</div>
            <h1 className="text-3xl font-montserrat font-bold text-ivory mb-3">{product.name}</h1>
            <div className="text-2xl text-gold mb-6">${product.price}</div>
            
            <div className="space-y-8">
              <div>
                <p className="text-ivory/80 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {/* Color selection */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-gold/90 text-sm mb-3">COLOR: {selectedColor.name}</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full relative ${
                          selectedColor.name === color.name ? 'ring-2 ring-gold ring-offset-2 ring-offset-black' : ''
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Select ${color.name} color`}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size selection */}
              {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                <div>
                  <h3 className="text-gold/90 text-sm mb-3">SIZE</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-4 border ${
                          selectedSize === size
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-gold/30 text-ivory hover:border-gold/60'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div>
                <h3 className="text-gold/90 text-sm mb-3">QUANTITY</h3>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold/10"
                  >
                    -
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gold/30">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold/10"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to cart button */}
              <div className="relative">
                <motion.button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-gold text-black font-montserrat font-semibold tracking-wider hover:bg-gold/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ADD TO BAG
                </motion.button>
                
                {/* Add to cart notification */}
                <AnimatePresence>
                  {showAddedToCart && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-[-40px] left-0 right-0 bg-gold/90 text-black py-2 text-center font-medium"
                    >
                      Added to your cart
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Product features */}
              <div className="border-t border-gold/20 pt-6">
                <h3 className="text-gold font-montserrat mb-4">FEATURES</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-ivory/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Product details */}
              <div className="border-t border-gold/20 pt-6">
                <h3 className="text-gold font-montserrat mb-4">DETAILS</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <span className="w-24 text-gold/70">MATERIAL</span>
                    <span className="text-ivory/80">{product.details.material}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gold/70">CARE</span>
                    <span className="text-ivory/80">{product.details.care}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gold/70">ORIGIN</span>
                    <span className="text-ivory/80">{product.details.origin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product recommendations */}
        <div className="mt-20">
          <h2 className="text-2xl text-gold font-montserrat mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Only show other products */}
            {Object.values(PRODUCTS)
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map((recommendedProduct) => (
                <motion.div
                  key={recommendedProduct.id}
                  className="bg-black border border-gold/10 rounded-lg overflow-hidden"
                  whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(212, 175, 55, 0.3)' }}
                >
                  <Link href={`/projects/luxe-boutique/products/${recommendedProduct.id}`}>
                    <div className="h-64 bg-gradient-to-br from-gold/5 to-black/40 flex items-center justify-center">
                      {recommendedProduct.isNew && (
                        <div className="absolute top-3 right-3 bg-gold text-black text-xs font-bold px-2 py-1">
                          NEW
                        </div>
                      )}
                      <div className="text-center text-ivory/30">
                        <p>[Product Image]</p>
                        <p className="text-xs mt-1">Simulated product</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gold/70 mb-1">{recommendedProduct.subcategory}</div>
                      <h3 className="text-ivory font-medium">{recommendedProduct.name}</h3>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-gold">${recommendedProduct.price}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </LuxeBoutiqueLayout>
  );
} 