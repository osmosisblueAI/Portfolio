'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectLayout from '@/components/layout/ProjectLayout';
import { FaCode, FaPalette, FaExternalLinkAlt, FaRobot, FaBrain } from 'react-icons/fa';

export default function NovaTechPage() {
  return (
    <ProjectLayout title="Nova Tech">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">AI Project Management Platform</h2>
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
            AI-powered project management SaaS platform with intelligent task automation, predictive analytics, 
            and team collaboration tools.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Technologies</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {['React', 'Next.js', 'AI/ML Models', 'Node.js', 'MongoDB', 'WebSockets'].map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {[
                  'AI-powered task prioritization',
                  'Predictive project timeline estimation',
                  'Automated resource allocation',
                  'Natural language processing for task creation',
                  'Real-time team collaboration',
                  'Interactive analytics dashboard'
                ].map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Role:</span> Lead Full-Stack Developer</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Project Type:</span> SaaS Platform</p>
            <p className="text-gray-300"><span className="font-semibold text-blue-400">Duration:</span> 6 months</p>
          </div>
        </div>
        
        {/* Project Screenshot */}
        <div className="mt-8 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]">
          <Image
            src="/portfolio/nova-tech-screenshot.png"
            alt="Nova Tech Website Screenshot"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaRobot className="mr-3 text-blue-400" />
              Project Overview
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300">
              <p>
                Nova Tech is an AI-powered project management platform designed to transform how teams organize, 
                prioritize, and execute their work. The project focused on creating an intelligent system that 
                can learn from team behaviors and project patterns to provide actionable insights and automate 
                routine tasks.
              </p>
              <p>
                The platform features an intuitive interface where users can create projects, assign tasks, and 
                track progress while the AI works in the background to optimize workflows. Machine learning models 
                analyze past project performance to predict potential bottlenecks, suggest optimal resource allocation, 
                and provide realistic timeline estimates.
              </p>
              <p>
                A key innovation is the natural language processing capability that allows users to create tasks 
                using conversational language, with the AI automatically categorizing, tagging, and assigning 
                them based on context and team workload balance.
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
                The platform was built using a Next.js frontend for its server-side rendering capabilities and 
                optimized performance. The backend uses Node.js with Express, connected to a MongoDB database 
                that stores project data, user information, and training data for the AI models.
              </p>
              <p>
                WebSockets provide real-time updates across the platform, ensuring that team members always have 
                the most current information without needing to refresh. The AI components were developed using 
                TensorFlow.js for client-side predictions and Python with scikit-learn for more complex server-side 
                processing.
              </p>
              <p>
                A microservices architecture was implemented to separate concerns and allow for independent scaling 
                of different components. The AI prediction service, data processing pipeline, and notification system 
                each run as separate services, communicating through a message queue for reliability.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaBrain className="mr-3 text-blue-400" />
              AI Implementation
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300">
              <p>
                The core of Nova Tech is its machine learning system, which was trained on anonymized data from 
                thousands of successfully completed projects. The system identifies patterns in task completion times, 
                resource utilization, and team productivity cycles to make increasingly accurate predictions.
              </p>
              <p>
                Natural language processing capabilities were built using transformer models, allowing the platform 
                to understand task descriptions, extract key information, and automatically assign appropriate team 
                members based on skills and current workload. The system improves over time as it learns from corrections 
                and adjustments made by users.
              </p>
              <p>
                A unique feature is the "AI Project Assistant" that proactively monitors project health, identifies 
                potential risks, and suggests corrective actions before problems impact deadlines. This assistant uses 
                a combination of predictive analytics and anomaly detection to spot unusual patterns in project progress.
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
                The interface was designed with a focus on clarity and efficiency, using a clean, minimal aesthetic 
                that reduces cognitive load and helps users focus on their work. The color scheme uses cool blues and 
                subtle gradients to create a calm, productive environment, with strategic accent colors highlighting 
                important information and actions.
              </p>
              <p>
                Data visualization is a key component, with custom-designed charts and graphs that present complex 
                project metrics in an immediately understandable format. Interactive elements respond naturally to 
                user input, with subtle animations providing context for state changes without being distracting.
              </p>
              <p>
                The responsive design adapts seamlessly across devices, with a carefully optimized mobile experience 
                that maintains full functionality even on smaller screens. Accessibility was a primary consideration, 
                with thorough testing to ensure the platform is usable for team members with diverse needs and abilities.
              </p>
            </div>
          </section>
        </div>
      </div>
    </ProjectLayout>
  );
} 