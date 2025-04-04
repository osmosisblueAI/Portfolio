'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProjectTemplate() {
  return (
    <main className="relative flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 px-4 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold hover:text-blue-400 transition-colors">
            Luke Eddy
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link href="/#about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="/#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
            <Link href="/#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="w-full relative pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Project Title
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A brief description of the project that explains what it is and what problem it solves.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl mb-16"
          >
            <Image 
              src="/portfolio/placeholder-project.jpg" 
              alt="Project Screenshot" 
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>
      
      {/* Project Information */}
      <section className="w-full px-4 md:px-8 py-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Project Overview</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                This is where you can provide detailed information about your project. Explain the concept, 
                the challenges you faced, and how you overcame them. Discuss the approach you took and why 
                you made certain technical decisions.
              </p>
              <p>
                You can also talk about the project timeline, your role, and any collaborators who worked with you. 
                This section should give visitors a comprehensive understanding of the project's scope and complexity.
              </p>
              <p>
                If applicable, you can also mention client feedback, results achieved, or metrics that demonstrate 
                the project's success.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold mt-12 mb-6 text-blue-400">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Responsive Design", 
                "User Authentication", 
                "Data Visualization", 
                "API Integration",
                "Real-time Updates",
                "Performance Optimization"
              ].map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="bg-gray-800/50 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400">Duration</h4>
                  <p className="text-gray-300">X weeks</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">My Role</h4>
                  <p className="text-gray-300">Frontend Developer</p>
                </div>
                {/* Optional link to live demo or code */}
                <div className="pt-4">
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors"
                  >
                    View Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Optional Gallery Section */}
      <section className="w-full px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-blue-400">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="relative h-64 rounded-lg overflow-hidden">
                <Image 
                  src={`/portfolio/placeholder-gallery-${item % 3 + 1}.jpg`} 
                  alt={`Gallery image ${item}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Next Project Navigation */}
      <section className="w-full px-4 md:px-8 py-16 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-300">Explore More Projects</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/projects/project-1" 
              className="px-6 py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-lg transition-colors"
            >
              Project 1
            </Link>
            <Link 
              href="/projects/project-2" 
              className="px-6 py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-lg transition-colors"
            >
              Project 2
            </Link>
            <Link 
              href="/projects/project-3" 
              className="px-6 py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-lg transition-colors"
            >
              Project 3
            </Link>
          </div>
          
          <Link 
            href="/#portfolio" 
            className="inline-block mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Back to All Projects
          </Link>
        </div>
      </section>
    </main>
  );
} 