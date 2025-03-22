'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Common layout component for all project pages
interface ProjectLayoutProps {
  children: ReactNode;
  title?: string;
  showBackLink?: boolean;
}

export default function ProjectLayout({ 
  children, 
  title = "Project Demo", 
  showBackLink = true 
}: ProjectLayoutProps) {
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
      
      {/* Page Title Bar - Only shown if title is provided */}
      {title && (
        <div className="w-full bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
            
            {showBackLink && (
              <Link 
                href="/#portfolio" 
                className="flex items-center space-x-2 text-blue-300 hover:text-blue-400 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back to Portfolio</span>
              </Link>
            )}
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-grow">
        {children}
      </div>
      
      {/* Footer */}
      <footer className="w-full bg-black/80 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Luke Eddy
              </Link>
              <p className="text-sm text-gray-400 mt-1">
                Web Developer & Designer
              </p>
            </div>
            
            <div className="flex space-x-4">
              {/* Social Links */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                </svg>
              </a>
            </div>
            
            <div className="text-sm text-gray-400 mt-4 md:mt-0">
              © {new Date().getFullYear()} Luke Eddy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 