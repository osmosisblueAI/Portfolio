'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

interface ThreeComponentsProps {
  frequencyData: Uint8Array | null;
  color: string;
  isPlaying: boolean;
}

const ThreeComponents = ({ frequencyData, color, isPlaying }: ThreeComponentsProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 0, 5]} intensity={0.5} />
      <AudioReactiveScene frequencyData={frequencyData} color={color} isPlaying={isPlaying} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={1.5} />
        <Noise opacity={0.1} />
        <Vignette darkness={0.5} offset={0.5} />
      </EffectComposer>
    </Canvas>
  );
};

// Audio reactive scene with particles and waveforms
interface AudioReactiveSceneProps {
  frequencyData: Uint8Array | null;
  color: string;
  isPlaying: boolean;
}

const AudioReactiveScene = ({ frequencyData, color, isPlaying }: AudioReactiveSceneProps) => {
  const waveformRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const particlePositions = useRef<Float32Array | null>(null);
  const particleCount = 1000;
  
  // Initialize particles with seeded randomness for consistent values
  useEffect(() => {
    if (particlesRef.current && !particlePositions.current) {
      const positions = new Float32Array(particleCount * 3);
      
      // Use seeded pseudo-random for SSR consistency 
      const seed = 12345;
      const random = (index: number) => {
        const x = Math.sin(seed + index * 9999) * 10000;
        return x - Math.floor(x);
      };
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (random(i) - 0.5) * 20;
        positions[i3 + 1] = (random(i+1) - 0.5) * 20;
        positions[i3 + 2] = (random(i+2) - 0.5) * 20;
      }
      
      particlePositions.current = positions;
      
      // Update particle geometry positions
      if (particlesRef.current.geometry instanceof THREE.BufferGeometry) {
        particlesRef.current.geometry.setAttribute(
          'position', 
          new THREE.BufferAttribute(positions, 3)
        );
      }
    }
  }, []);
  
  // Animate based on audio frequency data
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animate waveform
    if (waveformRef.current) {
      waveformRef.current.rotation.y = time * 0.1;
      
      // Scale bars based on frequency data
      if (frequencyData && frequencyData.length > 0 && waveformRef.current.children.length > 0) {
        const barCount = Math.min(64, frequencyData.length);
        
        for (let i = 0; i < barCount; i++) {
          if (i < waveformRef.current.children.length) {
            const bar = waveformRef.current.children[i];
            const value = frequencyData[i] / 255;
            
            // Only update if playing, otherwise provide subtle breathing animation
            if (isPlaying) {
              bar.scale.y = Math.max(0.05, value * 3);
            } else {
              bar.scale.y = 0.05 + Math.sin(time * 2 + i * 0.2) * 0.05;
            }
          }
        }
      }
    }
    
    // Animate particles
    if (particlesRef.current && particlePositions.current) {
      const positions = particlePositions.current;
      const geometry = particlesRef.current.geometry;
      
      // Get average frequency value for scaling
      let avgFreq = 0;
      if (frequencyData && frequencyData.length > 0) {
        const sum = frequencyData.reduce((a, b) => a + b, 0);
        avgFreq = sum / frequencyData.length / 255;
      }
      
      // Update each particle position
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position update with perlin noise-like movement
        positions[i3] += Math.sin(time * 0.1 + i * 0.1) * 0.01;
        positions[i3 + 1] += Math.cos(time * 0.1 + i * 0.1) * 0.01;
        positions[i3 + 2] += Math.sin(time * 0.1 + i * 0.05) * 0.01;
        
        // Add reactive movement based on frequency
        if (isPlaying && avgFreq > 0) {
          const distance = Math.sqrt(
            positions[i3] ** 2 + 
            positions[i3 + 1] ** 2 + 
            positions[i3 + 2] ** 2
          );
          
          // Pulse outward based on beat
          const scale = avgFreq * 0.5;
          const direction = new THREE.Vector3(
            positions[i3], 
            positions[i3 + 1], 
            positions[i3 + 2]
          ).normalize();
          
          positions[i3] += direction.x * scale * 0.03;
          positions[i3 + 1] += direction.y * scale * 0.03;
          positions[i3 + 2] += direction.z * scale * 0.03;
          
          // Pull particles back toward center if too far
          if (distance > 12) {
            positions[i3] *= 0.97;
            positions[i3 + 1] *= 0.97;
            positions[i3 + 2] *= 0.97;
          }
        }
      }
      
      // Update particle geometry
      geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <group>
      {/* Circular waveform */}
      <group ref={waveformRef}>
        {Array.from({ length: 64 }).map((_, i) => (
          <mesh key={i} position={[
            Math.sin(i / 64 * Math.PI * 2) * 5,
            Math.cos(i / 64 * Math.PI * 2) * 5,
            0
          ]} rotation={[0, 0, i / 64 * Math.PI * 2]}>
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
          </mesh>
        ))}
      </group>
      
      {/* Reactive particles */}
      <points ref={particlesRef}>
        <bufferGeometry />
        <pointsMaterial 
          size={0.15} 
          color={color} 
          transparent 
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default ThreeComponents; 