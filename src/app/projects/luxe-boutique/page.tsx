'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectLayout from '@/components/layout/ProjectLayout';
import { FaShoppingBag, FaCode, FaPalette, FaExternalLinkAlt } from 'react-icons/fa';

export default function LuxeBoutiquePage() {
  return (
    <ProjectLayout title="Luxe Boutique">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Premium E-commerce Experience</h2>
            <a 
              href="https://lux-boutique.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaExternalLinkAlt />
              <span>Visit Live Site</span>
            </a>
          </div>
          <p className="text-lg text-gray-300">
            A high-end fashion retail platform with sophisticated UI, seamless shopping experience, and CMS integration.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Technologies</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {['Next.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'Strapi CMS'].map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {[
                  'Elegant dark mode UI with gold accents',
                  'Dynamic product catalog with filtering',
                  'Animated product interactions',
                  'Responsive design for all devices',
                  'Content management system integration'
                ].map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Role:</span> Full-stack Developer</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Project Type:</span> E-commerce Platform</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Duration:</span> 8 weeks</p>
          </div>
        </div>
        
        {/* Project Screenshot */}
        <div className="mt-8 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]">
          <Image
            src="/portfolio/luxe-boutique-screenshot.png"
            alt="Luxe Boutique Website Screenshot"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaShoppingBag className="mr-3 text-blue-400" />
              Project Overview
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300">
              <p>
                Luxe Boutique is a premium e-commerce platform designed for high-end fashion retail. The project
                focused on creating an immersive shopping experience that embodies luxury and sophistication through
                a dark, elegant aesthetic with gold accents. The site features a responsive design that maintains its
                premium feel across all devices.
              </p>
              <p>
                The platform includes a comprehensive product catalog with detailed filtering options, user account
                management, wishlist functionality, and a streamlined checkout process. The admin interface allows
                for easy content management, inventory updates, and order processing.
              </p>
              <p>
                Special attention was paid to product presentation, with high-quality imagery, subtle animations,
                and detailed descriptions that highlight the craftsmanship and quality of each item.
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
                The website was built using Next.js for its server-side rendering capabilities, which significantly
                improve loading times and SEO performance. MongoDB was chosen as the database for its flexibility
                in handling product data with varying attributes across different categories.
              </p>
              <p>
                Tailwind CSS provided a consistent design system while allowing for custom styling to achieve the
                luxury aesthetic. Framer Motion was implemented for smooth, sophisticated animations that enhance
                the user experience without being distracting.
              </p>
              <p>
                Strapi CMS integration allows the client to manage products, categories, and content independently,
                with a user-friendly interface for uploading new items and managing inventory.
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
                The design employs a dark color palette with gold accents to evoke luxury and exclusivity. Typography
                is carefully selected, with a mix of serif fonts for headings and clean sans-serif for body text to
                balance tradition with modernity.
              </p>
              <p>
                Product cards feature subtle hover effects that reveal additional information and quick-action buttons,
                allowing users to add items to their cart or wishlist without navigating away from the current view.
              </p>
              <p>
                The checkout process is streamlined into a multi-step form with progress indicators, reducing friction
                and cart abandonment. Mobile optimization ensures that the luxury experience translates seamlessly to
                smaller screens, with thoughtful adjustments to layout and interaction patterns.
              </p>
            </div>
          </section>
        </div>
      </div>
    </ProjectLayout>
  );
} 