'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import LuxeBoutiqueLayout from '@/components/layout/LuxeBoutiqueLayout';
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaSearch, FaExclamationCircle, FaTimes, FaCheck } from 'react-icons/fa';

// Mock product data
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  published: boolean;
};

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Silk Evening Gown', price: 1295, category: 'Women', stock: 8, published: true },
  { id: 'p2', name: 'Italian Leather Clutch', price: 495, category: 'Accessories', stock: 12, published: true },
  { id: 'p3', name: 'Tailored Wool Suit', price: 1895, category: 'Men', stock: 5, published: true },
  { id: 'p4', name: 'Designer Sunglasses', price: 350, category: 'Accessories', stock: 23, published: true },
  { id: 'p5', name: 'Cashmere Sweater', price: 595, category: 'Women', stock: 7, published: true },
  { id: 'p6', name: 'Leather Oxford Shoes', price: 795, category: 'Men', stock: 4, published: false },
  { id: 'p7', name: 'Diamond Pendant Necklace', price: 2495, category: 'Accessories', stock: 3, published: true },
  { id: 'p8', name: 'Silk Pajama Set', price: 395, category: 'Women', stock: 15, published: false },
  { id: 'p9', name: 'Merino Wool Scarf', price: 195, category: 'Accessories', stock: 28, published: true },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['All', 'Women', 'Men', 'Accessories'];
  
  // Show notification
  const triggerNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  // Toggle product publish status
  const togglePublish = (id: string) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, published: !product.published } 
        : product
    ));
    
    const product = products.find(p => p.id === id);
    triggerNotification(
      `Product "${product?.name}" has been ${product?.published ? 'unpublished' : 'published'}`
    );
  };
  
  // Delete product
  const deleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    setProducts(products.filter(product => product.id !== id));
    triggerNotification(`Product "${product?.name}" has been deleted`);
  };
  
  // Edit product
  const startEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditing(true);
  };
  
  const saveEdit = () => {
    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id ? editingProduct : product
      ));
      triggerNotification(`Product "${editingProduct.name}" has been updated`);
      setIsEditing(false);
      setEditingProduct(null);
    }
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };
  
  const handleEditChange = (key: keyof Product, value: any) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [key]: value });
    }
  };

  return (
    <LuxeBoutiqueLayout>
      <div className="px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-montserrat text-gold">Product Management</h1>
          <motion.button
            className="px-4 py-2 bg-gold text-black font-montserrat flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPlus className="mr-2" /> Add New Product
          </motion.button>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-black/50 border border-gold/20 p-6 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 ${
                    activeCategory === category
                      ? 'bg-gold text-black'
                      : 'bg-black border border-gold/30 text-gold'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full md:w-64 bg-black/70 border border-gold/30 p-2 pl-10 text-ivory focus:border-gold focus:outline-none"
              />
              <FaSearch className="absolute top-3 left-3 text-gold/50" />
            </div>
          </div>
        </div>
        
        {/* Products Table */}
        <div className="bg-black/50 border border-gold/20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="p-4 text-left text-gold">Product</th>
                <th className="p-4 text-left text-gold">Category</th>
                <th className="p-4 text-left text-gold">Price</th>
                <th className="p-4 text-left text-gold">Stock</th>
                <th className="p-4 text-left text-gold">Status</th>
                <th className="p-4 text-left text-gold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gold/10 hover:bg-gold/5">
                  <td className="p-4 text-ivory">{product.name}</td>
                  <td className="p-4 text-ivory/80">{product.category}</td>
                  <td className="p-4 text-gold">${product.price}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 10 
                        ? 'bg-green-900/30 text-green-400' 
                        : product.stock > 5 
                        ? 'bg-yellow-900/30 text-yellow-400'
                        : 'bg-red-900/30 text-red-400'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="p-4">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.published 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {product.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => startEdit(product)}
                        className="p-2 text-gold hover:bg-gold/10 rounded"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => togglePublish(product.id)}
                        className={`p-2 ${
                          product.published ? 'text-red-400 hover:bg-red-900/20' : 'text-green-400 hover:bg-green-900/20'
                        } rounded`}
                      >
                        {product.published ? <FaTimes /> : <FaCheck />}
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-400 hover:bg-red-900/20 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-ivory/60">
              <FaExclamationCircle className="mx-auto mb-4 text-2xl" />
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-black/50 border border-gold/20 p-6 rounded-lg">
            <div className="text-gold/70 mb-2">Total Products</div>
            <div className="text-3xl text-gold font-semibold">{products.length}</div>
          </div>
          <div className="bg-black/50 border border-gold/20 p-6 rounded-lg">
            <div className="text-gold/70 mb-2">Published</div>
            <div className="text-3xl text-gold font-semibold">
              {products.filter(p => p.published).length}
            </div>
          </div>
          <div className="bg-black/50 border border-gold/20 p-6 rounded-lg">
            <div className="text-gold/70 mb-2">Low Stock</div>
            <div className="text-3xl text-gold font-semibold">
              {products.filter(p => p.stock < 6).length}
            </div>
          </div>
          <div className="bg-black/50 border border-gold/20 p-6 rounded-lg">
            <div className="text-gold/70 mb-2">Categories</div>
            <div className="text-3xl text-gold font-semibold">
              {new Set(products.map(p => p.category)).size}
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Product Modal */}
      {isEditing && editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black border border-gold w-full max-w-lg p-6 rounded-lg"
          >
            <h3 className="text-xl text-gold font-montserrat mb-4">Edit Product</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-ivory/80 mb-2 text-sm">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-ivory/80 mb-2 text-sm">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => handleEditChange('category', e.target.value)}
                  className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                >
                  {categories.filter(c => c !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-ivory/80 mb-2 text-sm">Price ($)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => handleEditChange('price', parseFloat(e.target.value))}
                  className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-ivory/80 mb-2 text-sm">Stock</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => handleEditChange('stock', parseInt(e.target.value))}
                  className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={editingProduct.published}
                  onChange={(e) => handleEditChange('published', e.target.checked)}
                  className="w-4 h-4 text-gold focus:ring-gold"
                />
                <label htmlFor="published" className="text-ivory">Published</label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 border border-gold/50 text-gold hover:bg-gold/10"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-gold text-black font-semibold"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-gold/90 text-black px-6 py-3 rounded shadow-lg"
          >
            {notificationMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </LuxeBoutiqueLayout>
  );
} 