'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AudioVisualizerPage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold hover:text-blue-400 transition-colors">
            Luke Eddy
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link href="/#about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="/#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
            <Link href="/#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>
      
      {/* Coming Soon Message */}
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Under Construction
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            This project is currently being updated with new features and improvements. 
            Please check back soon to see the completed work.
          </p>
          <Link 
            href="/#portfolio"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-block"
          >
            View Other Projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
} 