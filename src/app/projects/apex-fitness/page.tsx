'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectLayout from '@/components/layout/ProjectLayout';
import { FaCode, FaPalette, FaExternalLinkAlt, FaDumbbell } from 'react-icons/fa';

export default function ApexFitnessPage() {
  return (
    <ProjectLayout title="Apex Fitness">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Modern Fitness Center Website</h2>
            <a 
              href="https://apex-three-phi.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaExternalLinkAlt />
              <span>Visit Live Site</span>
            </a>
          </div>
          <p className="text-lg text-gray-300">
            A comprehensive website for a modern fitness center featuring class scheduling, 
            membership options, and trainer profiles in a responsive, user-friendly interface.
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
                  'Interactive class schedule',
                  'Membership signup and management',
                  'Trainer profiles and specializations',
                  'Testimonials and success stories',
                  'Mobile-responsive layout'
                ].map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Role:</span> Lead Developer</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Project Type:</span> Fitness Business Website</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Duration:</span> 4 weeks</p>
          </div>
        </div>
        
        {/* Project Screenshot */}
        <div className="mt-8 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]">
          <Image
            src="/portfolio/apex-fitness-screenshot.png"
            alt="Apex Fitness Website Screenshot"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaDumbbell className="mr-3 text-blue-400" />
              Project Overview
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300">
              <p>
                Apex Fitness is a comprehensive website designed for a modern fitness center. The goal was to create
                an engaging online presence that showcases the facility's offerings while providing practical
                functionality for members and potential clients.
              </p>
              <p>
                The site features an intuitive interface for browsing class schedules, exploring membership options,
                and learning about trainers. Users can sign up for memberships, book classes, and read success stories
                from existing members to build trust and credibility.
              </p>
              <p>
                The design emphasizes high-quality imagery of the facility and fitness activities, paired with
                a clean layout that makes information easily accessible across all devices.
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
                The website was built using Next.js for its performance benefits and SEO capabilities, which are
                crucial for local businesses. Tailwind CSS provided a utility-first approach that enabled rapid
                development of a consistent, responsive interface.
              </p>
              <p>
                The class schedule feature uses a custom calendar component that allows users to filter by class type,
                instructor, or time slot. Membership signup includes a multi-step form with validation to guide users
                through the registration process.
              </p>
              <p>
                For deployment, the site uses Vercel for its seamless integration with Next.js applications and reliable
                performance. Analytics were implemented to help the client track user engagement and conversion rates.
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
                The design uses a bold color palette that conveys energy and motivation, with contrasting accents
                to highlight important calls to action. Typography is clean and readable, with different weights
                used to establish visual hierarchy throughout the site.
              </p>
              <p>
                Interactive elements provide subtle feedback to enhance user experience, including hover states,
                smooth transitions, and micro-animations. The mobile experience was carefully crafted to ensure
                all functionality remains intuitive on smaller screens.
              </p>
              <p>
                Customer testimonials are presented in an engaging carousel format with profile images to add
                authenticity. The trainer profiles section uses cards with flip animations to reveal additional
                information about each instructor's specialties and background.
              </p>
            </div>
          </section>
        </div>
      </div>
    </ProjectLayout>
  );
} 