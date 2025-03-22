'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FallbackImage from '../ui/FallbackImage';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

// Dynamically import the AudioVisualizer component
const AudioVisualizer = dynamic(() => import('../3d/AudioReactiveViz'), { ssr: false });

// Portfolio project data
const projects = [
  {
    id: 0,
    title: "Apex Fitness",
    description: "A comprehensive website for a modern fitness center, featuring class schedules, membership options, trainer profiles, and testimonials.",
    image: "/portfolio/apex-fitness-screenshot.png",
    tags: ["React", "Next.js", "Tailwind CSS", "Responsive Design"],
    link: "/projects/apex-fitness",
    liveLink: "https://apex-three-phi.vercel.app/",
    type: 'image'
  },
  {
    id: 1,
    title: 'E-commerce Dashboard',
    description: 'Responsive admin dashboard for managing inventory, sales, and customer data.',
    image: '/portfolio/techtrend.jpg',
    tags: ['React', 'TypeScript', 'Node.js'],
    link: '/projects/e-commerce-dashboard',
    type: 'image'
  },
  {
    id: 2,
    title: 'Culinary Connect',
    description: 'Recipe sharing and social networking app for food enthusiasts with personalized recommendations.',
    image: '/portfolio/culinary.jpg',
    tags: ['Social Media', 'Vue.js', 'Firebase'],
    link: '/projects/recipe-social-app',
    type: 'image'
  },
  {
    id: 3,
    title: 'Luxe Boutique',
    description: 'Premium e-commerce platform for high-end fashion retail with sophisticated UI and CMS integration.',
    image: "/portfolio/luxe-boutique-screenshot.png",
    tags: ['E-commerce', 'Next.js', 'Tailwind CSS'],
    link: '/projects/luxe-boutique',
    liveLink: 'https://lux-boutique.vercel.app/',
    type: 'image'
  },
  {
    id: 4,
    title: 'Verde Living',
    description: 'Sustainable architecture firm website showcasing eco-friendly designs, services, and innovative green building solutions.',
    image: '/portfolio/verde-living-screenshot.png',
    tags: ['Architecture', 'Sustainability', 'Next.js'],
    link: '/projects/verde-living',
    liveLink: 'https://verde-vert.vercel.app/',
    type: 'image'
  },
  {
    id: 6,
    title: 'Nova Tech',
    description: 'AI-powered project management SaaS platform with intelligent task automation, predictive analytics, and team collaboration tools.',
    image: '/portfolio/nova-tech-screenshot.png',
    tags: ['SaaS', 'AI', 'Next.js'],
    link: '/projects/nova-tech',
    liveLink: 'https://nova-dntsbtsw0-osmosisblueais-projects.vercel.app/',
    type: 'image'
  }
];

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.some(tag => 
        tag.toLowerCase().includes(activeFilter.toLowerCase())
      ));
  
  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Portfolio</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my recent projects showcasing my expertise in web development and design.
          </p>
        </motion.div>
        
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4"
          >
            {['all', 'react', 'wordpress', 'e-commerce', 'portfolio', 'saas'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                  activeFilter === filter 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02]"
              >
                <div className="relative group">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-gray-700 text-blue-300 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={project.link} className="flex justify-between items-center">
                      <span className="text-blue-400 font-medium">View Project</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-blue-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </Link>
                    
                    {project.liveLink && (
                      <a 
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center text-green-400 hover:text-green-300 transition-colors"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                          />
                        </svg>
                        <span className="text-sm">View Live Site</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection; 