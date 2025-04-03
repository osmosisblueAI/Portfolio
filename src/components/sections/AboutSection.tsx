'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FallbackImage from '../ui/FallbackImage';

const AboutSection = () => {
  // Skills data
  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Three.js', level: 70 }
  ];

  return (
    <section id="about" className="py-20 bg-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left column with image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
              <FallbackImage
                src="/images/bio-image.JPG"
                fallbackSrc="/portfolio/lux-boutique.jpg"
                alt="Luke Eddy - Web Developer & Designer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            
            {/* Experience badge */}
            <motion.div 
              className="absolute -right-5 bottom-10 bg-white text-zinc-900 py-3 px-5 rounded-lg shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-bold">5+ Years</p>
              <p className="text-sm">Experience</p>
            </motion.div>
            
            {/* Projects badge */}
            <motion.div 
              className="absolute -left-5 top-10 bg-primary text-zinc-900 py-3 px-5 rounded-lg shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-bold">50+</p>
              <p className="text-sm">Projects</p>
            </motion.div>
          </motion.div>
          
          {/* Right column with content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            
            <motion.p 
              className="text-xl text-zinc-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              I'm a passionate web developer and designer with a knack for creating beautiful, functional websites that deliver exceptional user experiences.
            </motion.p>
            
            <motion.p 
              className="text-lg text-zinc-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              With expertise in modern frontend technologies like React, Next.js, and Three.js, I build responsive and interactive web applications that engage users. My background in design allows me to bring a unique perspective to every project, ensuring both functionality and aesthetics are prioritized.
            </motion.p>
            
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4">My Skills</h3>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-zinc-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 