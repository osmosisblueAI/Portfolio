'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectLayout from '@/components/layout/ProjectLayout';
import { FaCode, FaPalette, FaExternalLinkAlt, FaLaptopCode } from 'react-icons/fa';

export default function NovaStudiosPage() {
  return (
    <ProjectLayout title="Nova Studios">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Digital Creative Agency</h2>
            <a 
              href="https://nova-dntsbtsw0-osmosisblueais-projects.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaExternalLinkAlt />
              <span>Visit Live Site</span>
            </a>
          </div>
          <p className="text-lg text-gray-300">
            A portfolio website for a digital creative agency with dynamic project showcase, team profiles, 
            and interactive case studies.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Technologies</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'Vercel'].map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {[
                  'Dynamic project portfolio',
                  'Team member showcase',
                  'Interactive case studies',
                  'Animated UI elements',
                  'Contact form with service inquiry options'
                ].map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Role:</span> Lead Developer</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Project Type:</span> Creative Agency Website</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Duration:</span> 5 weeks</p>
          </div>
        </div>
        
        {/* Project Screenshot */}
        <div className="mt-8 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]">
          <Image
            src="/portfolio/nova-studios-screenshot.png"
            alt="Nova Studios Website Screenshot"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaLaptopCode className="mr-3 text-blue-400" />
              Project Overview
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300">
              <p>
                Nova Studios is a portfolio website designed for a digital creative agency specializing in 
                branding, web development, and digital marketing. The project goal was to create a visually 
                engaging platform that showcases the agency's work while demonstrating their creative capabilities.
              </p>
              <p>
                The site features a dynamic project portfolio that highlights the agency's most impressive work, 
                with detailed case studies that walk potential clients through the creative process. The team 
                section introduces the talented individuals behind the agency, with specialized skills and 
                experience clearly presented.
              </p>
              <p>
                Services are organized into clear categories with engaging descriptions and visual elements 
                that help visitors understand the agency's capabilities. Throughout the site, smooth animations 
                and transitions create a polished, modern feel that reinforces the agency's design-forward approach.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaCode className="mr-3 text-blue-400" />
              Development Approach
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300">
              <p>
                The website was built using Next.js to create a fast, smooth user experience with optimized 
                page loading. Framer Motion was implemented throughout the site to create fluid animations 
                and transitions that enhance the visual storytelling without impacting performance.
              </p>
              <p>
                The project portfolio section uses a custom-built filtering system that allows visitors to sort 
                by project type, industry, or technology. Case study pages incorporate interactive elements like 
                parallax scrolling, before/after image comparisons, and animated statistics to create an engaging 
                presentation of the agency's work.
              </p>
              <p>
                Tailwind CSS was used for styling, enabling rapid development while maintaining design consistency 
                across all pages. The contact form includes conditional fields that change based on the type of 
                inquiry, streamlining the process for potential clients to reach out about specific services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaPalette className="mr-3 text-blue-400" />
              Design Highlights
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300">
              <p>
                The design uses a bold, modern aesthetic with a carefully curated color palette that balances 
                professionalism with creativity. Typography combines a clean, contemporary sans-serif for body 
                text with a more distinctive display font for headings and key statements.
              </p>
              <p>
                Project images are presented in a grid layout that transforms into an immersive full-screen 
                view when selected, allowing the work to speak for itself. Team member profiles use a consistent 
                style of photography with interactive hover states that reveal additional information about each 
                individual.
              </p>
              <p>
                The site incorporates subtle interactive elements like cursor effects, scroll-triggered animations, 
                and hover states that respond naturally to user input. Mobile optimization ensures that the site's 
                dynamic elements translate effectively to smaller screens, creating a cohesive experience across 
                all devices.
              </p>
            </div>
          </section>
        </div>
      </div>
    </ProjectLayout>
  );
} 