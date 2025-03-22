'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AudioReactiveViz from '../3d/AudioReactiveViz';
import MagneticButton from '../ui/MagneticButton';
import Link from 'next/link';

const AudioVisualSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleToggleAudio = (playing: boolean) => {
    setIsPlaying(playing);
  };
  
  return (
    <section id="audio-visual" className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #120225, #060606)' }}>
      {/* Retro grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#ff00ff 1px, transparent 1px), linear-gradient(90deg, #ff00ff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '-1px -1px',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(75deg) translateY(-10%) translateZ(-100px)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
              Synthwave Sound Visualizer
            </span>
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Experience the retro-futuristic fusion of 80s aesthetics and modern technology in this interactive audio visualization.
          </p>
        </motion.div>
        
        <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-pink-500/30 shadow-lg shadow-pink-500/20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute inset-0"
          >
            <AudioReactiveViz 
              audioUrl="/audio/music/ES_Light of You - Swif7.mp3"
              color="#ff00ff"
              onToggleAudio={handleToggleAudio}
            />
          </motion.div>
          
          <div className="absolute bottom-8 left-8 z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="#contact" legacyBehavior passHref>
                <MagneticButton 
                  variant="outline"
                  size="lg"
                  className="backdrop-blur-md border-pink-500 text-pink-500 hover:bg-pink-500/10"
                >
                  Contact Me
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Retro Aesthetics",
              description: "Inspired by 80s synthwave and retrowave visual styles with neon colors and grids.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.9 11.7 4 2.3-4 2.3m-12-4.6-4 2.3 4 2.3M6.3 7.4l5.4-2.5m5.9 11.5-5.4 2.5" />
                </svg>
              )
            },
            {
              title: "Audio Reactive",
              description: "Dynamic visualizations that transform and pulse to match the beat and frequencies of the music.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18V6M15 18V6M3 9h18M3 15h18" />
                </svg>
              )
            },
            {
              title: "Interactive 3D",
              description: "Fully 3D environment powered by Three.js that responds to user interaction and audio input.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M9 7.5V18M3 7.5V18M12 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              )
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              viewport={{ once: true }}
              className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-colors group"
            >
              <div className="text-pink-500 mb-4 group-hover:text-cyan-400 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-zinc-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Sun circle */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #ff00ff 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Cyan accent */}
        <div 
          className="absolute bottom-20 right-10 w-72 h-72 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #00ffff 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-30"></div>
      </div>
    </section>
  );
};

export default AudioVisualSection; 