'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const router = useRouter();

  // Transition configurations
  const duration = 0.5;
  const transitionColors = ['#ff5500', '#0077ff', '#ffc107', '#44ff00'];
  const [currentColor, setCurrentColor] = useState(transitionColors[0]);

  // Change color for each navigation
  useEffect(() => {
    const randomColor = transitionColors[Math.floor(Math.random() * transitionColors.length)];
    setCurrentColor(randomColor);
  }, [pathname]);

  // Update children when route changes
  useEffect(() => {
    setDisplayChildren(children);
  }, [children, pathname]);

  // Listen for route change events from Next.js router
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => setIsNavigating(false), duration * 1000);
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleRouteChangeStart);
    
    // Custom router events for Next.js App Router
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closestAnchor = target.closest('a');
      
      if (
        closestAnchor && 
        closestAnchor.href && 
        closestAnchor.href.startsWith(window.location.origin) && 
        !closestAnchor.target && 
        !closestAnchor.download && 
        !closestAnchor.rel?.includes('external')
      ) {
        setIsNavigating(true);
      }
    };
    
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('beforeunload', handleRouteChangeStart);
      document.removeEventListener('click', handleClick);
    };
  }, [pathname, router]);

  return (
    <div className="relative">
      {/* Page Content with smooth fade */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: duration * 0.5, ease: "easeInOut" }}
      >
        {displayChildren}
      </motion.div>

      {/* Full-screen transition overlay */}
      <AnimatePresence mode="wait">
        {isNavigating && (
          <motion.div
            key="page-transition-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration * 0.5 }}
          >
            {/* Expanding circle animation */}
            <motion.div
              className="absolute rounded-full"
              style={{ backgroundColor: currentColor }}
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ 
                scale: 20,
                opacity: [0.7, 1, 0.5, 0],
              }}
              exit={{ 
                scale: 0,
                opacity: 0 
              }}
              transition={{ 
                duration: duration * 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Branded loading indicator */}
            <motion.div
              className="relative flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: duration * 0.3, delay: duration * 0.2 }}
            >
              <div className="text-white text-4xl font-bold">LE</div>
              <div className="w-32 h-1 bg-white mt-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition; 