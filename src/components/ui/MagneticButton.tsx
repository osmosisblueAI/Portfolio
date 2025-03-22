'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  href?: string;
  magneticEffect?: boolean;
  glowEffect?: boolean;
}

const MagneticButton = ({
  children,
  className = '',
  onClick,
  size = 'md',
  variant = 'primary',
  href,
  magneticEffect = true,
  glowEffect = true,
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-[#121212] hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    accent: 'bg-accent text-[#121212] hover:bg-accent/90',
    ghost: 'bg-transparent border border-white/20 text-white hover:bg-white/10'
  };

  // Handle mouse movement for magnetic effect
  useEffect(() => {
    if (!magneticEffect) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !isHovered) return;

      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Magnetic strength - higher values move the button more
      const magneticStrength = 0.3;

      setPosition({ 
        x: distanceX * magneticStrength, 
        y: distanceY * magneticStrength 
      });
    };

    const handleMouseLeave = () => {
      // Reset position when mouse leaves
      setPosition({ x: 0, y: 0 });
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        handleMouseLeave();
      };
    }

    return () => {};
  }, [isHovered, magneticEffect]);

  // Button content with spring animation
  const ButtonContent = () => (
    <motion.div
      className="relative z-10 flex items-center justify-center w-full h-full"
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15, 
        mass: 0.1
      }}
    >
      {children}
    </motion.div>
  );

  // Main component render
  const baseClasses = `
    relative rounded-full font-semibold transition-all duration-300 overflow-hidden
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  // If it's a link
  if (href) {
    return (
      <motion.a
        href={href}
        ref={buttonRef}
        className={baseClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
      >
        <ButtonContent />
        {glowEffect && isHovered && (
          <div className="absolute inset-0 -z-10 opacity-70 rounded-full blur-xl"
            style={{ 
              background: variant === 'primary' 
                ? 'radial-gradient(circle at center, var(--primary) 0%, transparent 70%)' 
                : variant === 'secondary' 
                ? 'radial-gradient(circle at center, var(--secondary) 0%, transparent 70%)' 
                : 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)'
            }}
          />
        )}
      </motion.a>
    );
  }

  // If it's a button
  return (
    <motion.button
      ref={buttonRef}
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <ButtonContent />
      {glowEffect && isHovered && (
        <div className="absolute inset-0 -z-10 opacity-70 rounded-full blur-xl"
          style={{ 
            background: variant === 'primary' 
              ? 'radial-gradient(circle at center, var(--primary) 0%, transparent 70%)' 
              : variant === 'secondary' 
              ? 'radial-gradient(circle at center, var(--secondary) 0%, transparent 70%)' 
              : 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)'
          }}
        />
      )}
    </motion.button>
  );
};

export default MagneticButton; 