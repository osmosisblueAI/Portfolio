'use client';

import React, { useRef, useEffect, useState, useId } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import FallbackImage from '../ui/FallbackImage';
import Image from 'next/image';

interface ParallaxItem {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface ParallaxScrollProps {
  items?: ParallaxItem[];
}

const defaultItems: ParallaxItem[] = [
  {
    id: 1,
    title: "Immersive Experiences",
    description: "Creating digital journeys that captivate and inspire through innovative design and technology.",
    image: "/images/parallax/immersive.png",
    color: "#ff5500"
  },
  {
    id: 2,
    title: "Cutting-Edge Development",
    description: "Building with next-generation frameworks and tools to deliver exceptional performance.",
    image: "/images/parallax/development.png",
    color: "#00aaff"
  },
  {
    id: 3,
    title: "Creative Design Solutions",
    description: "Transforming complex problems into elegant, intuitive interfaces that users love.",
    image: "/images/parallax/design.png",
    color: "#44ff00"
  },
  {
    id: 4,
    title: "Results-Driven Strategy",
    description: "Crafting digital solutions that not only look amazing but deliver measurable business outcomes.",
    image: "/images/parallax/strategy.png",
    color: "#ffaa00"
  }
];

// Custom hook for parallax effect
const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

const ParallaxScroll = ({ items = defaultItems }: ParallaxScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const instanceId = useId();
  const [isMobile, setIsMobile] = useState(false);
  
  // Update container width on resize
  useEffect(() => {
    setIsClient(true);
    
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Check for mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Smoother scroll progress
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 50, 
    stiffness: 200 
  });

  // Pre-compute random values for deterministic rendering
  const floatingElements = Array.from({ length: 10 }).map((_, i) => ({
    id: `${instanceId}-float-${i}`,
    width: 50 + (i * 15) % 150,
    height: 50 + ((i * 23) % 150),
    left: `${(i * 10) % 100}%`,
    top: `${(i * 9 + 5) % 100}%`,
    xOffset: ((i % 5) * 10) - 25,
    yOffset: ((i % 3) * 15) - 20,
    duration: 6 + (i % 5) * 2,
    scale: 0.9 + ((i % 3) * 0.1),
    color: items[i % items.length].color
  }));
  
  return (
    <section 
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-[#121212]"
    >
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary origin-left z-10"
        style={{ scaleX: smoothProgress }}
      />
      
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          My Creative Process
        </motion.h2>
        
        <div className="space-y-40 mb-20">
          {items.map((item, index) => (
            <ParallaxItem 
              key={item.id} 
              item={item} 
              progress={smoothProgress} 
              index={index} 
              isEven={index % 2 === 0}
              containerWidth={containerWidth}
            />
          ))}
        </div>
      </div>
      
      {/* Floating elements - only render on client side to avoid hydration issues */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute rounded-full mix-blend-screen"
              style={{
                width: element.width,
                height: element.height,
                left: element.left,
                top: element.top,
                background: `radial-gradient(circle, ${element.color}40 0%, transparent 70%)`,
                filter: 'blur(20px)',
              }}
              animate={{
                x: [0, element.xOffset],
                y: [0, element.yOffset],
                scale: [1, element.scale, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: element.duration,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

interface ParallaxItemProps {
  item: ParallaxItem;
  progress: MotionValue<number>;
  index: number;
  isEven: boolean;
  containerWidth: number;
}

const ParallaxItem = ({ item, progress, index, isEven, containerWidth }: ParallaxItemProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effects
  const imageX = useParallax(scrollYProgress, isEven ? -100 : 100);
  const contentX = useParallax(scrollYProgress, isEven ? 100 : -100);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, isEven ? 5 : -5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  // Determine text alignment and layout based on screen width and even/odd
  const isMobile = containerWidth < 768;
  const textAlign = isMobile ? "text-center" : isEven ? "text-right" : "text-left";
  const flexDirection = isMobile ? "flex-col" : isEven ? "flex-row-reverse" : "flex-row";
  
  return (
    <motion.div 
      ref={scrollRef}
      className={`flex ${flexDirection} items-center gap-6 md:gap-12`}
      style={{ opacity }}
    >
      {/* Image with parallax */}
      <motion.div 
        className="relative w-full md:w-1/2 h-60 md:h-96 rounded-xl overflow-hidden"
        style={{ 
          x: isMobile ? 0 : imageX,
          rotateY: rotation,
          scale,
          boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1), 0 0 0 3px ${item.color}20`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        <Image 
          src={item.image} 
          alt={item.title} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
        />
        <div className="absolute bottom-4 left-4 right-4 text-white z-20">
          <span className="inline-block px-3 py-1 rounded-full text-sm" style={{ backgroundColor: item.color }}>
            Step {index + 1}
          </span>
        </div>
      </motion.div>
      
      {/* Content with parallax */}
      <motion.div 
        className={`w-full md:w-1/2 ${textAlign}`}
        style={{ x: isMobile ? 0 : contentX }}
      >
        <span 
          className="inline-block w-12 h-12 rounded-full text-2xl font-bold flex items-center justify-center mb-4"
          style={{ backgroundColor: item.color }}
        >
          {index + 1}
        </span>
        <h3 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: item.color }}
        >
          {item.title}
        </h3>
        <p className="text-lg text-gray-300 max-w-md mx-auto md:mx-0">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ParallaxScroll; 