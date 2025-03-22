'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Sparkles,
  OrbitControls,
  MeshDistortMaterial
} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

interface AnimatedSphereProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  distort?: boolean;
  distortSpeed?: number;
  floatIntensity?: number;
  mousePosition?: { x: number, y: number };
}

const AnimatedSphere = ({ position, color, scale = 1, distort = false, distortSpeed = 0.4, floatIntensity = 0.5, mousePosition }: AnimatedSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Calculate color based on mouse position and base color
  const getColorFromMouse = () => {
    if (!mousePosition) return color;
    // Create a shifting hue based on mouse position
    const hueShift = (mousePosition.x + mousePosition.y) * 0.1;
    return new THREE.Color().setHSL(
      (parseInt(color.substring(1), 16) / 0xffffff + hueShift) % 1, 
      0.8, 
      0.6
    );
  };

  // Spring animation for hover and click
  const springs = useSpring({
    scale: clicked ? 1.4 : hovered ? 1.2 : 1,
    color: hovered ? "#ff9500" : getColorFromMouse().getStyle(),
    distortFactor: clicked ? 1.0 : hovered ? 0.6 : 0.3,
  });
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Floating animation
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * floatIntensity * 0.1;
    
    // Subtle rotation
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.2;
    
    // Mouse movement effect
    if (mousePosition) {
      meshRef.current.position.x = position[0] + mousePosition.x * 0.05;
      meshRef.current.position.z = position[2] + mousePosition.y * 0.05;
    }
  });
  
  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      scale={springs.scale.to(s => s * scale)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      {distort ? (
        <MeshDistortMaterial
          color={springs.color}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          distort={springs.distortFactor}
          speed={distortSpeed}
        />
      ) : (
        <animated.meshPhysicalMaterial
          color={springs.color}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.9}
          transmission={0.5}
        />
      )}
    </animated.mesh>
  );
};

const ParticleField = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const sparklesRef = useRef<THREE.Object3D>(null);
  
  useFrame(() => {
    if (sparklesRef.current) {
      // Subtle movement based on mouse position
      sparklesRef.current.position.x = mousePosition.x * 2;
      sparklesRef.current.position.y = mousePosition.y * 2;
    }
  });
  
  return (
    <Sparkles
      ref={sparklesRef}
      count={200}
      scale={12}
      size={0.6}
      speed={0.3}
      color="#ffd700"
      opacity={0.5}
    />
  );
};

const RotatingGroup = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const { clock } = useThree();
  const group = useRef<THREE.Group>(null);
  
  // Generate sphere data
  const spheres = [
    { position: [0, 0, 0] as [number, number, number], color: "#ff5500", scale: 1.5, distort: true, distortSpeed: 0.3, floatIntensity: 0.7 },
    { position: [-3, 2, -5] as [number, number, number], color: "#00aaff", scale: 1.2, distort: true, distortSpeed: 0.5, floatIntensity: 0.4 },
    { position: [3.5, -1.5, -2] as [number, number, number], color: "#44ff00", scale: 0.8, distort: true, distortSpeed: 0.2, floatIntensity: 0.8 },
    { position: [-2, -2.5, -3] as [number, number, number], color: "#ffaa00", scale: 1.0, distort: true, distortSpeed: 0.4, floatIntensity: 0.5 },
    { position: [2, 2.5, -4] as [number, number, number], color: "#ff00aa", scale: 1.1, distort: true, distortSpeed: 0.3, floatIntensity: 0.6 },
  ];
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <group ref={group}>
      {spheres.map((sphere, index) => (
        <AnimatedSphere
          key={index}
          position={sphere.position}
          color={sphere.color}
          scale={sphere.scale}
          distort={sphere.distort}
          distortSpeed={sphere.distortSpeed}
          floatIntensity={sphere.floatIntensity}
          mousePosition={mousePosition}
        />
      ))}
    </group>
  );
};

const DynamicLights = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const pointLightRef = useRef<THREE.PointLight>(null);
  
  useFrame(() => {
    if (pointLightRef.current) {
      // Move light based on mouse position
      pointLightRef.current.position.x = mousePosition.x * 10;
      pointLightRef.current.position.y = mousePosition.y * 5;
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight 
        ref={pointLightRef}
        position={[5, 5, 5]} 
        intensity={2} 
        color="#ff9500" 
        distance={20}
        decay={2}
      />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#00aaff" />
    </>
  );
};

interface GlobeCanvasProps {
  className?: string;
}

const GlobeCanvas = ({ className = '' }: GlobeCanvasProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 50 }}>
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['#000', 5, 30]} />
        <Suspense fallback={null}>
          <RotatingGroup mousePosition={mousePosition} />
          <ParticleField mousePosition={mousePosition} />
          <DynamicLights mousePosition={mousePosition} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
};

export default GlobeCanvas; 