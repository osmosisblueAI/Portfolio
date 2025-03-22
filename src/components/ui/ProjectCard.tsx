'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  link: string;
  image?: string;
}

const ProjectCard = ({ title, category, description, link, image }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="card group h-full flex flex-col theme-transition elevated"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      animate={{
        rotateY: isHovered ? mousePosition.x * 10 : 0,
        rotateX: isHovered ? mousePosition.y * -10 : 0,
        transformPerspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      style={{
        backgroundImage: isHovered ? 
          `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, var(--card-highlight, rgba(255,255,255,0.1)), transparent)` : 
          'none'
      }}
    >
      <div className="relative overflow-hidden rounded-md mb-4 h-48">
        <div className={`absolute inset-0 ${!image ? 'bg-zinc-800 flex items-center justify-center' : ''}`}>
          {!image && <p className="text-zinc-500">Image Placeholder</p>}
        </div>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        )}
        
        <motion.div 
          className="absolute inset-0 bg-primary/20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.a 
            href={link}
            className="bg-primary text-[#121212] px-4 py-2 rounded-md font-medium"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            View Project
          </motion.a>
        </motion.div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-primary text-sm mb-3">{category}</p>
      <p className="text-zinc-400 text-sm mb-4 flex-grow">{description}</p>
      
      <div className="relative mt-auto">
        <motion.div
          className="w-full bg-zinc-800 h-0.5 mt-4 light-theme:bg-gray-200"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard; 