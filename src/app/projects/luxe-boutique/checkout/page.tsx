'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaCreditCard, FaLock, FaTruck } from 'react-icons/fa';
import LuxeBoutiqueLayout from '@/components/layout/LuxeBoutiqueLayout';

// Mock cart items
const CART_ITEMS = [
  {
    id: 'p2',
    name: 'Italian Leather Clutch',
    price: 495,
    color: 'Black',
    size: 'One Size',
    quantity: 1,
  },
  {
    id: 'p1',
    name: 'Silk Evening Gown',
    price: 1295,
    color: 'Midnight',
    size: 'M',
    quantity: 1,
  },
];

// Checkout steps
type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  
  // Calculate totals
  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 25;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  
  // Handle form changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Navigate between steps
  const nextStep = () => {
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') setStep('review');
    else if (step === 'review') setShowConfirmation(true);
  };
  
  const prevStep = () => {
    if (step === 'payment') setStep('shipping');
    else if (step === 'review') setStep('payment');
  };
  
  // Function to format credit card number with spaces
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ')
      .substr(0, 19) || '';
  };

  return (
    <LuxeBoutiqueLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-montserrat mb-2 text-gold">Checkout</h1>
          <p className="text-ivory/60">Complete your purchase</p>
        </div>
        
        {/* Checkout Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'shipping' || step === 'payment' || step === 'review' 
                  ? 'bg-gold text-black' 
                  : 'border border-gold/30 text-gold/50'
              }`}>
                1
              </div>
              <span className={`mt-2 text-sm ${
                step === 'shipping' || step === 'payment' || step === 'review' 
                  ? 'text-gold' 
                  : 'text-gold/50'
              }`}>Shipping</span>
            </div>
            
            <div className={`flex-1 h-[1px] mx-2 ${
              step === 'payment' || step === 'review' ? 'bg-gold' : 'bg-gold/30'
            }`}></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'payment' || step === 'review' 
                  ? 'bg-gold text-black' 
                  : 'border border-gold/30 text-gold/50'
              }`}>
                2
              </div>
              <span className={`mt-2 text-sm ${
                step === 'payment' || step === 'review' 
                  ? 'text-gold' 
                  : 'text-gold/50'
              }`}>Payment</span>
            </div>
            
            <div className={`flex-1 h-[1px] mx-2 ${
              step === 'review' ? 'bg-gold' : 'bg-gold/30'
            }`}></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'review' 
                  ? 'bg-gold text-black' 
                  : 'border border-gold/30 text-gold/50'
              }`}>
                3
              </div>
              <span className={`mt-2 text-sm ${
                step === 'review' 
                  ? 'text-gold' 
                  : 'text-gold/50'
              }`}>Review</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Checkout Form */}
          <div className="lg:w-2/3 space-y-8">
            <AnimatePresence mode="wait">
              {step === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/50 border border-gold/20 p-6 rounded-lg"
                >
                  <h2 className="text-xl font-montserrat text-gold mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-ivory/80 mb-2 text-sm">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-ivory/80 mb-2 text-sm">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-ivory/80 mb-2 text-sm">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-ivory/80 mb-2 text-sm">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-ivory/80 mb-2 text-sm">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                      placeholder="Enter your street address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="col-span-2">
                      <label className="block text-ivory/80 mb-2 text-sm">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-ivory/80 mb-2 text-sm">State</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-ivory/80 mb-2 text-sm">ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleShippingChange}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                        placeholder="ZIP"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-ivory/80 mb-2 text-sm">Country</label>
                    <select
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button
                      onClick={nextStep}
                      className="px-8 py-3 bg-gold text-black font-montserrat font-semibold tracking-wider"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue to Payment
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/50 border border-gold/20 p-6 rounded-lg"
                >
                  <h2 className="text-xl font-montserrat text-gold mb-6">Payment Information</h2>
                  
                  <div className="mb-6">
                    <label className="block text-ivory/80 mb-2 text-sm">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                      placeholder="Enter name on card"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-ivory/80 mb-2 text-sm">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          const formattedValue = formatCardNumber(e.target.value.replace(/[^\d]/g, ''));
                          setPaymentInfo(prev => ({ ...prev, cardNumber: formattedValue }));
                        }}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none pl-10"
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength={19}
                      />
                      <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/50" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-ivory/80 mb-2 text-sm">Expiration Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={paymentInfo.expiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/[^\d]/g, '');
                          if (value.length > 2) {
                            value = value.substr(0, 2) + '/' + value.substr(2, 2);
                          }
                          setPaymentInfo(prev => ({ ...prev, expiry: value }));
                        }}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-ivory/80 mb-2 text-sm">Security Code (CVV)</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d]/g, '').substr(0, 3);
                          setPaymentInfo(prev => ({ ...prev, cvv: value }));
                        }}
                        className="w-full bg-black/70 border border-gold/30 p-3 text-ivory focus:border-gold focus:outline-none"
                        placeholder="CVV"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <motion.button
                      onClick={prevStep}
                      className="px-6 py-3 border border-gold/50 text-gold font-montserrat tracking-wider hover:bg-gold/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      onClick={nextStep}
                      className="px-8 py-3 bg-gold text-black font-montserrat font-semibold tracking-wider"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Review Order
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/50 border border-gold/20 p-6 rounded-lg"
                >
                  <h2 className="text-xl font-montserrat text-gold mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-gold/90 text-sm mb-3 flex items-center">
                        <FaTruck className="mr-2" /> SHIPPING ADDRESS
                      </h3>
                      <div className="text-ivory/80">
                        <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                        <p>{shippingInfo.country}</p>
                        <p className="mt-1">{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-gold/90 text-sm mb-3 flex items-center">
                        <FaCreditCard className="mr-2" /> PAYMENT METHOD
                      </h3>
                      <div className="text-ivory/80">
                        <p>{paymentInfo.cardName}</p>
                        <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                        <p>Expires {paymentInfo.expiry}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gold/20 pt-4">
                      <h3 className="text-gold/90 text-sm mb-3">ORDER SUMMARY</h3>
                      <div className="space-y-3">
                        {CART_ITEMS.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <div>
                              <p className="text-ivory">{item.name}</p>
                              <p className="text-xs text-ivory/60">
                                {item.color} {item.size !== 'One Size' && `- Size ${item.size}`} 
                                {item.quantity > 1 && ` - Qty: ${item.quantity}`}
                              </p>
                            </div>
                            <div className="text-ivory">${item.price * item.quantity}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <motion.button
                      onClick={prevStep}
                      className="px-6 py-3 border border-gold/50 text-gold font-montserrat tracking-wider hover:bg-gold/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      onClick={nextStep}
                      className="px-8 py-3 bg-gold text-black font-montserrat font-semibold tracking-wider"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Place Order
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-black/50 border border-gold/20 p-6 rounded-lg sticky top-6">
              <h2 className="text-xl font-montserrat text-gold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {CART_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold/5 to-black/40 flex items-center justify-center mr-4">
                      <div className="text-center text-ivory/30 text-xs">[Item]</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-ivory">{item.name}</div>
                      <div className="text-xs text-ivory/60">
                        {item.color} {item.size !== 'One Size' && `- Size ${item.size}`}
                      </div>
                      <div className="text-ivory/80">
                        ${item.price} × {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gold/20 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-ivory/70">Subtotal</span>
                  <span className="text-ivory">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory/70">Shipping</span>
                  <span className="text-ivory">${shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory/70">Estimated Tax</span>
                  <span className="text-ivory">${tax}</span>
                </div>
              </div>
              
              <div className="border-t border-gold/20 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gold font-montserrat">Total</span>
                  <span className="text-2xl text-gold font-semibold">${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-black border border-gold max-w-lg w-full p-8 rounded-lg relative"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-montserrat text-gold mb-2">Order Confirmed</h2>
                <p className="text-ivory/80 mb-6">
                  Thank you for your order! A confirmation has been sent to {shippingInfo.email}.
                </p>
                
                <div className="bg-gold/10 p-4 text-center mb-6">
                  <p className="text-gold/90 text-sm">Order #LUXE-2025-0789</p>
                  <p className="text-ivory font-medium text-lg">${total}</p>
                </div>
                
                <div className="space-y-2 mb-8 text-left">
                  <div className="flex text-ivory/80">
                    <span className="w-1/3 text-gold/70">Shipping:</span>
                    <span>Express Delivery (3-5 business days)</span>
                  </div>
                  <div className="flex text-ivory/80">
                    <span className="w-1/3 text-gold/70">Address:</span>
                    <span>{shippingInfo.address}, {shippingInfo.city}</span>
                  </div>
                </div>
                
                <Link href="/projects/luxe-boutique">
                  <motion.button
                    className="px-8 py-3 bg-gold text-black font-montserrat font-semibold tracking-wider w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="border-t border-gold/20 p-8 mt-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-gold font-montserrat text-xl font-bold">LUXE</div>
            <div className="flex items-center space-x-2 text-gold/60">
              <FaLock className="text-sm" />
              <span className="text-sm">Secure Checkout</span>
            </div>
          </div>
          <div className="text-center mt-8 text-ivory/40 text-sm">
            <p>© 2025 Luxe Boutique. All rights reserved.</p>
            <p className="mt-1">This is a portfolio project, not a real store.</p>
          </div>
        </div>
      </footer>
    </LuxeBoutiqueLayout>
  );
} 