'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check for saved theme preference or use dark as default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.classList.toggle('light-theme', savedTheme === 'light');
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    // Get the position of the click relative to viewport for the animation
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }

    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    
    // Create and animate the theme change circle
    const circle = document.createElement('div');
    circle.style.position = 'fixed';
    circle.style.top = `${e.clientY}px`;
    circle.style.left = `${e.clientX}px`;
    circle.style.width = '10px';
    circle.style.height = '10px';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = isDarkMode ? '#f8f8f8' : '#121212';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.zIndex = '999';
    circle.style.pointerEvents = 'none';
    circle.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    
    document.body.appendChild(circle);
    
    // Trigger the animation
    setTimeout(() => {
      circle.style.width = '250vw';
      circle.style.height = '250vw';
      
      // Apply the class change after a slight delay
      setTimeout(() => {
        document.documentElement.classList.toggle('light-theme', newTheme === 'light');
        
        // Remove the animation circle after it's done
        setTimeout(() => {
          document.body.removeChild(circle);
        }, 800);
      }, 200);
    }, 10);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-zinc-700 flex items-center p-1 focus:outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className="w-4 h-4 rounded-full"
        animate={{
          x: isDarkMode ? 0 : 24,
          backgroundColor: isDarkMode ? '#FCD53F' : '#f8f8f8',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        animate={{
          opacity: isDarkMode ? 1 : 0,
          x: 1,
          color: '#FCD53F',
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </motion.svg>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        animate={{
          opacity: isDarkMode ? 0 : 1,
          x: 25,
          color: '#f8f8f8',
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </motion.svg>
    </motion.button>
  );
};

export default ThemeToggle; 