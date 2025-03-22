'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import EstimatorSection from '@/components/sections/EstimatorSection';
import ContactSection from '@/components/sections/ContactSection';

// Dynamically import components with client-side randomness
const ParallaxScroll = dynamic(() => import('@/components/sections/ParallaxScroll'), { ssr: false });
const MouseFollower = dynamic(() => import('@/components/ui/MouseFollower'), { ssr: false });

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only render on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#121212] relative">
      {isMounted && <MouseFollower />}
      
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {isMounted && <ParallaxScroll />}
      <PortfolioSection />
      <TestimonialsSection />
      <EstimatorSection />
      <ContactSection />
    </main>
  );
}
