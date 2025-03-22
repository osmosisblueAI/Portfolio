'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll and resize events
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    // Set initial states
    handleResize();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Nav items - updated to include audio visualizer
  const navItems = [
    { name: 'Home', href: '/#' },
    { name: 'About', href: '/#about' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Audio Visual', href: '/#audio-visual' },
    { name: 'Contact', href: '/#contact' }
  ];

  // Handle smooth scroll for anchor links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply smooth scroll behavior for same-page anchor links
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      
      // Handle the case of the home link
      if (targetId === '') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-zinc-900/90 backdrop-blur-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/#" 
            className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent"
            onClick={(e) => handleNavClick(e, '/#')}
          >
            LUKE<span className="font-light">EDDY</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        {!isMobile && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:block"
          >
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    className="text-zinc-300 hover:text-white transition-colors relative group"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className={`md:hidden bg-zinc-900/95 backdrop-blur-lg absolute w-full left-0 top-full overflow-hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    className="text-zinc-300 hover:text-white block p-2 transition-colors"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 