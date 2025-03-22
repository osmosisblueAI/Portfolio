'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

interface GlobeProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  distort?: number;
  speed?: number;
}

const Globe = ({
  position = [0, 0, 0],
  scale = 1,
  color = '#ffd700',
  distort = 0.4,
  speed = 0.1
}: GlobeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Rotate the globe
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  return (
    <Sphere 
      ref={meshRef} 
      position={position} 
      scale={scale} 
      args={[1, 64, 64]}
    >
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

export default Globe; 