'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import GlobeCanvas with SSR disabled
const GlobeCanvas = dynamic(() => import('@/components/3d/GlobeCanvas'), { ssr: false });

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to enable client-side only features
    setIsMounted(true);
    
    // Add mouse move event listener for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background elements with gradient and particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(#00aaff 1px, transparent 1px), linear-gradient(90deg, #00aaff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            backgroundPosition: '-1px -1px',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg) translateY(-20%) translateZ(-100px)',
          }}
        />
      
        {/* Static colored circles/orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl mix-blend-screen"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl mix-blend-screen"></div>
      
        {/* 3D canvas - still try to load it */}
        {isMounted && (
          <div className="absolute inset-0 z-10">
            <GlobeCanvas />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2
              }}
              style={{
                transform: isMounted ? `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)` : 'none'
              }}
            >
              <span className="block">Creative</span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Web Developer
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-zinc-400 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.4
              }}
              style={{
                transform: isMounted ? `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)` : 'none'
              }}
            >
              I build exceptional digital experiences that blend creativity with technical precision.
              Let's turn your vision into reality.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.6
              }}
            >
              <Link 
                href="#portfolio" 
                className="px-8 py-3 bg-primary text-zinc-900 font-semibold rounded-full hover:bg-primary/90 transition-all transform hover:scale-105"
              >
                View My Work
              </Link>
              <Link 
                href="#contact" 
                className="px-8 py-3 bg-transparent border border-zinc-700 text-white font-semibold rounded-full hover:border-primary hover:text-primary transition-all transform hover:scale-105"
              >
                Contact Me
              </Link>
            </motion.div>
          </div>
          
          {/* Empty space for the globe canvas but with a visible element */}
          <div className="hidden lg:block h-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 filter blur-md"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-zinc-500 text-sm mb-2">Scroll Down</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
          >
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 