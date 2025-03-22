'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectLayout from '@/components/layout/ProjectLayout';
import { FaCode, FaPalette, FaExternalLinkAlt, FaLeaf } from 'react-icons/fa';

export default function VerdeLivingPage() {
  return (
    <ProjectLayout title="Verde Living">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Sustainable Architecture Firm</h2>
            <a 
              href="https://verde-vert.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaExternalLinkAlt />
              <span>Visit Live Site</span>
            </a>
          </div>
          <p className="text-lg text-gray-300">
            A modern website for a sustainable architecture firm showcasing eco-friendly designs, services, 
            and innovative green building solutions.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Technologies</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'Responsive Design'].map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {[
                  'Interactive project gallery',
                  'Sustainable design showcase',
                  'Team member profiles',
                  'Case studies with detailed metrics',
                  'Contact form with service request options'
                ].map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Role:</span> Lead Developer</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Project Type:</span> Architecture Firm Website</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Duration:</span> 6 weeks</p>
          </div>
        </div>
        
        {/* Project Screenshot */}
        <div className="mt-8 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]">
          <Image
            src="/portfolio/verde-living-screenshot.png"
            alt="Verde Living Website Screenshot"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaLeaf className="mr-3 text-blue-400" />
              Project Overview
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300">
              <p>
                Verde Living is a website designed for a forward-thinking sustainable architecture firm. The 
                project focused on creating a digital presence that effectively communicates the firm's commitment 
                to environmentally responsible design while showcasing their impressive portfolio of projects.
              </p>
              <p>
                The site features an elegantly designed project gallery that highlights the firm's work, with 
                detailed case studies that include sustainability metrics and environmental impact data. The 
                services section clearly outlines the firm's capabilities in green building design, sustainable 
                urban planning, and eco-renovation.
              </p>
              <p>
                Team member profiles put a human face to the company, emphasizing the expertise and passion 
                behind each project. The design throughout the site incorporates natural elements and a color 
                palette inspired by nature, reinforcing the firm's brand identity.
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
                The website was built using Next.js to create a fast, SEO-friendly experience that showcases 
                the firm's portfolio beautifully. Tailwind CSS provided a sustainable approach to styling, 
                reducing unnecessary code bloat while maintaining a consistent design system.
              </p>
              <p>
                The project gallery features a custom-built filtering system that allows visitors to sort projects 
                by type, location, and sustainability features. Case studies are presented with interactive data 
                visualizations that communicate the environmental benefits of each project.
              </p>
              <p>
                Performance optimization was a key focus, ensuring that high-quality project images load quickly 
                without compromising visual impact. The site is hosted on Vercel, providing reliable performance 
                and seamless deployment from the development workflow.
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
                The design uses an earthy, natural color palette with vibrant green accents that reflect the 
                firm's focus on sustainable design. Typography pairs a clean sans-serif for body text with an 
                organic serif font for headings, creating a balance between professional credibility and 
                environmental consciousness.
              </p>
              <p>
                Large, immersive project photography takes center stage, allowing the firm's work to speak for 
                itself. Subtle animations and transitions enhance the user experience, with interactive elements 
                that respond naturally to user input, creating a sense of organic movement throughout the site.
              </p>
              <p>
                The responsive design adapts seamlessly to all devices, ensuring that architects can showcase their 
                portfolio to clients regardless of how they access the site. Special attention was paid to 
                accessibility, ensuring that the site's message of sustainability extends to inclusive design practices.
              </p>
            </div>
          </section>
        </div>
      </div>
    </ProjectLayout>
  );
} 