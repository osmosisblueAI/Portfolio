'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Grid, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/outline';

// Define types for the component props
interface AudioReactiveVizProps {
  isPlaying?: boolean;
  onPlayPause?: (isPlaying: boolean) => void;
  audioUrl?: string;
}

// AudioAnalyzer return type definition
interface AudioControls {
  playAudio: () => Promise<void>;
  pauseAudio: () => void;
  context: AudioContext;
}

/**
 * Audio analyzer hook that processes audio data and provides frequency information
 */
function useAudioAnalyzer({ 
  onData,
  audioSrc = '/assets/audio/synthwave.mp3',
  fftSize = 1024,
  smoothingTimeConstant = 0.8
}: { 
  onData: (data: Uint8Array) => void; 
  audioSrc?: string;
  fftSize?: number;
  smoothingTimeConstant?: number;
}): AudioControls {
  // References to maintain state across renders without triggering re-renders
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const isInitializedRef = useRef(false);

  // Setup the audio processing system
  const setupAudio = useCallback(() => {
    if (isInitializedRef.current) return;

    try {
      console.log("Setting up audio analyzer for:", audioSrc);
      
      // Create audio element if it doesn't exist yet
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio();
        audioElementRef.current.crossOrigin = "anonymous";
        audioElementRef.current.preload = "auto";
      }

      // Set audio source
      audioElementRef.current.src = audioSrc;
      audioElementRef.current.load();

      // Create audio context if needed
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Create analyzer node with optimal settings for visualization
      const audioContext = audioContextRef.current;
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = fftSize;
      analyzer.smoothingTimeConstant = smoothingTimeConstant;
      analyzerRef.current = analyzer;

      // Create buffer for frequency data
      dataArrayRef.current = new Uint8Array(analyzer.frequencyBinCount);

      // Connect audio element to analyzer
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
      }
      sourceNodeRef.current = audioContext.createMediaElementSource(audioElementRef.current);
      sourceNodeRef.current.connect(analyzer);
      analyzer.connect(audioContext.destination);
      
      // Mark as initialized
      isInitializedRef.current = true;
      console.log("Audio system successfully initialized");

    } catch (error) {
      console.error("Error setting up audio:", error);
    }
  }, [audioSrc, fftSize, smoothingTimeConstant]);

  // Handle audio playback
  const playAudio = useCallback(() => {
    if (!audioElementRef.current) return Promise.reject("No audio element");
    
    // Setup audio system if not already done
    if (!isInitializedRef.current) {
      setupAudio();
    }
    
    // Resume audio context if needed
    if (audioContextRef.current?.state === 'suspended') {
      console.log("Resuming audio context");
      return audioContextRef.current.resume()
        .then(() => {
          if (audioElementRef.current) {
            return audioElementRef.current.play()
          .catch(err => {
          console.error("Error starting audio:", err);
                throw err;
              });
          }
          return Promise.reject("Audio element no longer available");
        })
        .catch(err => {
          console.error("Error resuming audio context:", err);
          throw err;
        });
    }
    
    // Play audio
    console.log("Playing audio:", audioSrc);
    return audioElementRef.current.play()
      .catch(err => {
        console.error("Error playing audio:", err);
        // Log additional debugging info
        console.log("Audio element state:", audioElementRef.current.readyState);
        console.log("Audio source:", audioElementRef.current.src);
        throw err;
      });
  }, [audioSrc, setupAudio]);

  // Pause audio playback
  const pauseAudio = useCallback(() => {
    try {
    if (audioElementRef.current) {
      console.log("Pausing audio");
      audioElementRef.current.pause();
      }
    } catch (err) {
      console.error("Error pausing audio:", err);
    }
  }, []);

  // Start/stop audio processing based on isPlaying prop
  useEffect(() => {
    // Initialize audio system
    if (!isInitializedRef.current) {
    setupAudio();
    }
    
    // Animation frame loop for processing audio data
    const processAudio = () => {
      if (analyzerRef.current && dataArrayRef.current) {
        analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
        onData(dataArrayRef.current);
      }
      frameRef.current = requestAnimationFrame(processAudio);
    };
    
    // Start processing
    frameRef.current = requestAnimationFrame(processAudio);
    
    // Cleanup on unmount
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
      }
      
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.src = '';
      }
      
      if (audioContextRef.current) {
        // Only close if context is not already closed
        if (audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(err => {
            console.error("Error closing audio context:", err);
          });
        }
      }
    };
  }, [setupAudio, onData]);

  // Update audio source when it changes
  useEffect(() => {
    if (audioElementRef.current && audioSrc !== audioElementRef.current.src) {
      console.log("Audio source changed to:", audioSrc);
      audioElementRef.current.src = audioSrc;
      audioElementRef.current.load();
      
      // If already initialized, we need to reconnect
      if (isInitializedRef.current) {
        setupAudio();
      }
    }
  }, [audioSrc, setupAudio]);

  return { 
    playAudio, 
    pauseAudio, 
    context: audioContextRef.current 
  };
}

// Synthwave Sun object
function SynthwaveSun({ 
  color = '#ff00ff', 
  pulsate = true,
  position = [0, 3, -10],
  scale = 1
}: { 
  color?: string; 
  pulsate?: boolean;
  position?: [number, number, number];
  scale?: number | [number, number, number];
}) {
  const sunRef = useRef<THREE.Mesh>(null);
  
  // Create a shader material with gradient effect
  const sunMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color('#ff00ff') },
        color2: { value: new THREE.Color('#ff8800') },
        color3: { value: new THREE.Color('#ff0088') },
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        
        void main() {
          float r = distance(vUv, vec2(0.5));
          vec3 color;
          
          if (r < 0.3) {
            color = mix(color1, color2, r / 0.3);
          } else {
            color = mix(color2, color3, (r - 0.3) / 0.7);
          }
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });
  }, []);
  
  useFrame(({ clock }) => {
    if (!sunRef.current) return;
    
    // Create breathing effect
    if (pulsate) {
      const t = clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 0.5) * 0.1;
      sunRef.current.scale.set(scale, scale, 1);
    }
  });
  
  return (
    <mesh 
      ref={sunRef} 
      position={position instanceof Array ? position : [0, 3, -10]}
      scale={scale instanceof Array ? scale : [scale, scale, scale]}
    >
      <circleGeometry args={[3, 64]} />
      <primitive object={sunMaterial} attach="material" />
    </mesh>
  );
}

/**
 * Retro Grid for synthwave aesthetic
 */
function RetroGrid({ 
  colorTop = '#ff00ff',
  colorBottom = '#0088ff',
  frequencyData
}: { 
  colorTop: string; 
  colorBottom: string;
  frequencyData: Uint8Array;
}) {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    
    // Calculate average energy from bass frequencies for pulse effect
    let bassEnergy = 0;
    const bassEnd = Math.floor(frequencyData.length * 0.1); // First 10% of frequencies
    
    for (let i = 0; i < bassEnd; i++) {
      bassEnergy += frequencyData[i];
    }
    bassEnergy = bassEnergy / bassEnd / 255; // Normalize to 0-1
    
    // Enhanced pulse effect with more dramatic response
    const baseScale = 1 + bassEnergy * 0.5; // Increased from 0.2 to 0.5 for more noticeable effect
    
    // Apply a non-linear scaling for more dramatic effect during peaks
    const enhancedScale = baseScale * (1 + Math.pow(bassEnergy, 3) * 0.5);
    
    gridRef.current.scale.set(enhancedScale, 1, enhancedScale);
    
    // More dynamic grid movement based on audio
    const speedModulation = 0.5 + bassEnergy * 0.8; // Grid speeds up with bass hits
    gridRef.current.position.z = (clock.getElapsedTime() * speedModulation) % 1;
    
    // Subtle rotation for added effect
    gridRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.03 * bassEnergy;
  });
  
  return (
    <group ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <Grid
        cellSize={1}
        cellThickness={1.5}
        cellColor={'#ff00ff'}
        sectionSize={3}
        sectionThickness={1.5}
        sectionColor={'#0088ff'}
        fadeDistance={30}
        fadeStrength={1}
        infiniteGrid
      />
    </group>
  );
}

/**
 * Synthwave Mountains
 */
function SynthwaveMountains({ frequencyData }: { frequencyData: Uint8Array }) {
  const mountainsRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Shader for the mountains with enhanced audio reactivity
  const shader = useMemo(() => {
    return {
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#ff00cc') },
        color2: { value: new THREE.Color('#3300ff') },
        audioLevel: { value: 0 },
        peakLevel: { value: 0 }, // Added for peak detection
        bassPulse: { value: 0 }  // Added for bass pulses
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        uniform float audioLevel;
        uniform float peakLevel;
        uniform float bassPulse;
        
        float mountainNoise(vec2 p) {
          // Base mountain shape
          float base = sin(p.x * 0.3) * 0.5 + 0.5 + 
                sin(p.x * 1.7) * 0.25;
          
          // Add finer details with audio reactivity
          float detail = sin(p.x * 5.0) * 0.15 * audioLevel +
                       sin(p.x * 8.0 + time) * 0.1 * peakLevel;
          
          // Add bass-driven pulse effects
          float pulse = sin(p.x * 0.2 + time) * bassPulse * 0.3;
          
          return base + detail + pulse;
        }
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Apply enhanced mountain effect
          if (pos.y > 0.0) {
            float noise = mountainNoise(vec2(pos.x + time, pos.z));
            
            // More dramatic scaling during peaks
            float scale = 1.0 + audioLevel * 0.8 + peakLevel * 0.5;
            
            pos.y *= noise * scale;
            
            // Add subtle x-axis movement based on bass
            pos.x += sin(pos.y * 2.0 + time) * bassPulse * 0.1;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float audioLevel;
        uniform float peakLevel;
        varying vec2 vUv;
        
        void main() {
          // More dynamic color mixing based on audio
          float strength = smoothstep(0.0, 1.0, vUv.y);
          
          // Add color shifting during peaks
          vec3 peakColor = mix(color1, vec3(1.0, 0.2, 1.0), peakLevel * 0.7);
          vec3 baseColor = mix(peakColor, color2, strength);
          
          // Add subtle glow during audio peaks
          float glow = peakLevel * 0.3 * (1.0 - vUv.y);
          vec3 finalColor = baseColor + vec3(glow);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    };
  }, []);
  
  // Update shader uniforms with more responsive audio analysis
  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    
    // Update time
    materialRef.current.uniforms.time.value = clock.getElapsedTime() * 0.2;
    
    // Calculate energy from different frequency ranges
    let bassEnergy = 0;
    let midEnergy = 0;
    let peakDetection = 0;
    
    // Bass range (0-10%)
    const bassEnd = Math.floor(frequencyData.length * 0.1);
    for (let i = 0; i < bassEnd; i++) {
      bassEnergy += frequencyData[i];
    }
    bassEnergy = bassEnergy / bassEnd / 255; // Normalize to 0-1
    
    // Mid range (30-60%)
    const midStart = Math.floor(frequencyData.length * 0.3);
    const midEnd = Math.floor(frequencyData.length * 0.6);
    for (let i = midStart; i < midEnd; i++) {
      midEnergy += frequencyData[i];
    }
    midEnergy = midEnergy / (midEnd - midStart) / 255; // Normalize to 0-1
    
    // Peak detection (transients across spectrum)
    const peakStart = Math.floor(frequencyData.length * 0.2);
    const peakEnd = Math.floor(frequencyData.length * 0.8);
    let maxPeak = 0;
    for (let i = peakStart; i < peakEnd; i++) {
      if (frequencyData[i] > maxPeak) {
        maxPeak = frequencyData[i];
      }
    }
    peakDetection = Math.pow(maxPeak / 255, 2); // Non-linear scaling for better visual effect
    
    // Apply smoothed values to uniforms for natural animation
    materialRef.current.uniforms.audioLevel.value += (midEnergy - materialRef.current.uniforms.audioLevel.value) * 0.3;
    materialRef.current.uniforms.peakLevel.value += (peakDetection - materialRef.current.uniforms.peakLevel.value) * 0.4;
    materialRef.current.uniforms.bassPulse.value += (bassEnergy - materialRef.current.uniforms.bassPulse.value) * 0.2;
  });
  
  return (
    <mesh ref={mountainsRef} position={[0, -0.5, -15]} rotation={[0, 0, 0]}>
      <planeGeometry args={[50, 5, 64, 12]} />
      <shaderMaterial ref={materialRef} args={[shader]} side={THREE.DoubleSide} />
    </mesh>
  );
}

/**
 * Visualizer bars that respond to audio frequency data - Synthwave style
 */
function SynthwaveVisualizer({ 
  frequencyData, 
  primaryColor = '#ff00ff',
  secondaryColor = '#00ffff',
  sensitivity = 1.0
}: { 
  frequencyData: Uint8Array;
  primaryColor?: string;
  secondaryColor?: string;
  sensitivity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);
  const peakRef = useRef<number>(0); // Track peak values for more dramatic effects
  
  // Calculate bars display settings
  const numBars = Math.min(64, frequencyData.length / 16); // Fewer, wider bars for 80s look
  const barWidth = 0.15;
  const barSpacing = 0.05;
  const totalWidth = numBars * (barWidth + barSpacing);
  const startX = -totalWidth / 2 + barWidth / 2;
  
  // Create material with the specified color
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(primaryColor),
      emissive: new THREE.Color(primaryColor).multiplyScalar(0.8),
      metalness: 1.0,
      roughness: 0.3,
    });
    return mat;
  }, [primaryColor]);
  
  const secondaryMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(secondaryColor),
      emissive: new THREE.Color(secondaryColor).multiplyScalar(0.8),
      metalness: 1.0,
      roughness: 0.3,
    });
    return mat;
  }, [secondaryColor]);

  // Create or update bars when needed
  useEffect(() => {
    if (!groupRef.current) return;
    
    // Clean up previous bars
    barsRef.current.forEach(bar => {
      groupRef.current?.remove(bar);
      bar.geometry.dispose();
    });
    
    barsRef.current = [];
    
    // Create new bars - two rows for synthwave effect
    for (let i = 0; i < numBars; i++) {
      // Front row (primary color)
      const frontGeometry = new THREE.BoxGeometry(barWidth, 0.1, barWidth / 2);
      const frontMesh = new THREE.Mesh(frontGeometry, material);
      frontMesh.position.x = startX + i * (barWidth + barSpacing);
      frontMesh.position.y = 0;
      frontMesh.position.z = 0;
      frontMesh.scale.y = 0.01; // Start with minimal height
      
      // Back row (secondary color)
      const backGeometry = new THREE.BoxGeometry(barWidth, 0.1, barWidth / 2);
      const backMesh = new THREE.Mesh(backGeometry, secondaryMaterial);
      backMesh.position.x = startX + i * (barWidth + barSpacing);
      backMesh.position.y = 0;
      backMesh.position.z = -0.5;
      backMesh.scale.y = 0.01; // Start with minimal height
      
      barsRef.current.push(frontMesh, backMesh);
      groupRef.current.add(frontMesh, backMesh);
    }
    
    return () => {
      barsRef.current.forEach(bar => {
        bar.geometry.dispose();
      });
    };
  }, [numBars, barWidth, barSpacing, startX, material, secondaryMaterial]);
  
  // Update bar heights based on audio frequency data
  useFrame(({ clock }) => {
    if (!groupRef.current || !frequencyData.length) return;
    
    // Get time for animation effects
    const time = clock.getElapsedTime();
    
    // Find frequency range and divide it into segments for the bars
    const step = Math.floor(frequencyData.length / numBars);
    
    // Check for beat detection
    let overallEnergy = 0;
    for (let i = 0; i < Math.min(frequencyData.length, 32); i++) {
      overallEnergy += frequencyData[i];
    }
    overallEnergy /= 32 * 255; // Normalize
    
    // Update peak tracker with decay
    peakRef.current = Math.max(peakRef.current * 0.95, overallEnergy);
    
    // Detect beats when energy rises significantly
    const isBeat = overallEnergy > peakRef.current * 0.8 && overallEnergy > 0.2;
    
    // Group animation on beats
    if (isBeat) {
      if (groupRef.current) {
        // Quick pulse scale on beat
        groupRef.current.scale.set(1.05, 1.05, 1.05);
      }
    } else {
      // Slowly return to normal
      if (groupRef.current) {
        groupRef.current.scale.x += (1 - groupRef.current.scale.x) * 0.2;
        groupRef.current.scale.y += (1 - groupRef.current.scale.y) * 0.2;
        groupRef.current.scale.z += (1 - groupRef.current.scale.z) * 0.2;
      }
    }
    
    for (let i = 0; i < numBars; i++) {
      const frontBar = barsRef.current[i * 2];
      const backBar = barsRef.current[i * 2 + 1];
      
      if (frontBar && backBar) {
        // Calculate frequency bin for this bar
        let binSum = 0;
        let binCount = 0;
        
        // Average multiple frequency bins for smoother visualization
        for (let j = 0; j < step; j++) {
          const index = i * step + j;
          if (index < frequencyData.length) {
            binSum += frequencyData[index];
            binCount++;
          }
        }
        
        // Calculate height with enhanced 80s style exaggeration
        const normalizedValue = binCount ? binSum / (binCount * 255) : 0;
        
        // Apply exponential curve for more dramatic response to louder sounds
        const scaledValue = Math.pow(normalizedValue, 0.5) * sensitivity; // Less curve for better visuals
        
        // Add beat-synchronized height boost
        const beatBoost = isBeat && i % 3 === 0 ? 1.5 : 1.0;
        
        // Wider range from tall to short for more dramatic visualization
        const targetScale = 0.05 + scaledValue * 12 * beatBoost; 
        
        // Different scaling for front and back rows
        frontBar.scale.y += (targetScale - frontBar.scale.y) * 0.4; // Faster response
        backBar.scale.y += (targetScale * 0.7 - backBar.scale.y) * 0.3; // Slower, shorter
        
        // Update position based on scale
        frontBar.position.y = frontBar.scale.y / 2;
        backBar.position.y = backBar.scale.y / 2;
        
        // Add Z-axis movement on beats for front bars
        if (isBeat && i % 2 === 0) {
          frontBar.position.z = 0.3;
        } else {
          frontBar.position.z += (0 - frontBar.position.z) * 0.2;
        }
        
        // 80s style neon glow effect - pulsating with the music
        if (frontBar.material instanceof THREE.MeshStandardMaterial) {
          // More dramatic pulse
          const pulseAmount = 0.6 + normalizedValue * 2.5 + (isBeat ? 1 : 0);
          frontBar.material.emissiveIntensity = pulseAmount;
          
          // Create 80s color cycling effect
          const hueShift = (i / numBars) * 0.3 + time * 0.05;
          const baseColor = new THREE.Color(primaryColor);
          baseColor.offsetHSL(hueShift, 0, 0);
          frontBar.material.emissive.copy(baseColor);
        }
        
        if (backBar.material instanceof THREE.MeshStandardMaterial) {
          const pulseAmount = 0.6 + normalizedValue * 2.0 + (isBeat ? 0.5 : 0);
          backBar.material.emissiveIntensity = pulseAmount;
          
          // Create 80s color cycling effect for back row
          const hueShift = (i / numBars) * 0.3 + time * 0.05 + 0.5; // Offset from front row
          const baseColor = new THREE.Color(secondaryColor);
          baseColor.offsetHSL(hueShift, 0, 0);
          backBar.material.emissive.copy(baseColor);
        }
        
        // Add slight rotation on beat
        if (isBeat) {
          frontBar.rotation.z = (i % 2 ? 0.1 : -0.1) * normalizedValue;
        } else {
          frontBar.rotation.z += (0 - frontBar.rotation.z) * 0.2;
        }
      }
    }
    
    // More dynamic group rotation
    if (groupRef.current) {
      // Base rotation
      const baseRotation = Math.sin(time * 0.1) * 0.1;
      
      // Add beat-responsive movement
      const beatRotation = isBeat ? (Math.sin(time * 4) * 0.05) : 0;
      
      groupRef.current.rotation.y = baseRotation + beatRotation;
      groupRef.current.rotation.x = overallEnergy * 0.05; // Slight tilt based on overall energy
    }
  });
  
  return <group ref={groupRef} position={[0, 0, 2]} />;
}

/**
 * Background environment for the scene
 */
function SynthwaveBackground() {
  const { scene } = useThree();
  
  useEffect(() => {
    // Create a synthwave gradient background
    const bgTexture = new THREE.CanvasTexture(createGradientTexture());
    scene.background = bgTexture;
    
    return () => {
      scene.background = new THREE.Color('#000000');
    };
  }, [scene]);
  
  // Creates a canvas with a synthwave gradient
  const createGradientTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    
    const context = canvas.getContext('2d');
    if (context) {
      // Create synthwave gradient - purple to deep blue
      const gradient = context.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, '#090120'); // Deep blue at top
      gradient.addColorStop(0.5, '#320a46'); // Mid purple
      gradient.addColorStop(1, '#000000'); // Black at bottom
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, 2, 512);
    }
    
    return canvas;
  };
  
  return (
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
  );
}

/**
 * Camera controller for the visualization
 */
function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    // Set initial camera position for best synthwave view
    camera.position.set(0, 4, 10);
    camera.lookAt(0, 0, -5);
  }, [camera]);
  
  return null;
}

/**
 * Retro scanlines that react to music
 */
function RetroScanLines({ 
  frequencyData 
}: { 
  frequencyData: Uint8Array 
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const peakEnergyRef = useRef<number>(0);
  const beatDetectedRef = useRef<boolean>(false);
  
  // Scan line shader
  const scanLineShader = useMemo(() => {
    return {
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        intensity: { value: 0.3 },
        distortion: { value: 0.02 },
        glitchIntensity: { value: 0.0 },
        audioLevel: { value: 0.0 },
        beatActive: { value: 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform float intensity;
        uniform float distortion;
        uniform float glitchIntensity;
        uniform float audioLevel;
        uniform float beatActive;
        varying vec2 vUv;
        
        // Random function
        float random(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void main() {
          // Basic scanlines
          float scanLineAmount = 300.0 + audioLevel * 100.0;
          float scanLine = step(0.5, sin(vUv.y * scanLineAmount + time * 10.0) * 0.5 + 0.5);
          
          // VHS style tracking distortion
          float trackingDistortion = sin(time * 0.3) * distortion * (1.0 + beatActive * 3.0);
          float yOffset = sin(vUv.y * 100.0 + time) * trackingDistortion;
          vec2 distortedUv = vec2(vUv.x + yOffset, vUv.y);
          
          // RGB split during beats
          float rgbSplit = 0.003 * (1.0 + beatActive * 3.0);
          float r = 0.8 * scanLine + 0.2;
          float g = 0.8 * scanLine + 0.2;
          float b = 0.8 * scanLine + 0.2;
          
          // Add VHS noise - intensifies with audio and beats
          float noise = random(vUv + vec2(time * 0.01, 0.0)) * 0.1 * (1.0 + audioLevel * 2.0);
          r += noise;
          g += noise * 0.8;
          b += noise * 0.6;
          
          // VHS tape lines
          float vhsLineAmount = 0.1 + beatActive * 0.2;
          float vhsLine = smoothstep(0.4, 0.6, sin(vUv.y * 2.0 + time * 0.2) * 0.5 + 0.5) * vhsLineAmount;
          r -= vhsLine;
          g -= vhsLine;
          b -= vhsLine;
          
          // Glitch effect during beats
          if (beatActive > 0.5) {
            float glitchStrength = glitchIntensity * (0.5 + audioLevel * 2.0);
            if (random(vec2(time * 10.0, vUv.y * 100.0)) < glitchStrength) {
              // Random horizontal offset for glitch blocks
              float blockOffset = random(vec2(floor(vUv.y * 20.0), time)) * 0.03;
              distortedUv.x += blockOffset;
              
              // Random color shift for glitch blocks
              r = random(vec2(time * 0.1, vUv.y));
              g = random(vec2(time * 0.1, vUv.y + 0.1));
              b = random(vec2(time * 0.1, vUv.y + 0.2));
            }
          }
          
          // Combine effects with proper transparency
          float alpha = intensity * (0.6 + beatActive * 0.2 + audioLevel * 0.2);
          gl_FragColor = vec4(r, g, b, alpha);
        }
      `,
    };
  }, []);
  
  useEffect(() => {
    // Handle window resize for shader uniforms
    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useFrame(({ clock }) => {
    // Update shader time
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
      
      // Process audio data if available
      if (frequencyData && frequencyData.length > 0) {
        // Calculate overall energy focusing on low frequencies (beats)
        let bassEnergy = 0;
        const bassRange = Math.min(16, frequencyData.length / 8);
        for (let i = 0; i < bassRange; i++) {
          bassEnergy += frequencyData[i];
        }
        bassEnergy = bassEnergy / (bassRange * 255); // Normalize to 0-1
        
        // Calculate overall energy across the spectrum
        let totalEnergy = 0;
        for (let i = 0; i < frequencyData.length; i++) {
          totalEnergy += frequencyData[i];
        }
        totalEnergy = totalEnergy / (frequencyData.length * 255); // Normalize to 0-1
        
        // Track peak energy with decay
        peakEnergyRef.current = Math.max(peakEnergyRef.current * 0.95, bassEnergy);
        
        // Beat detection
        const beatThreshold = 0.5; // Adjust based on your audio
        const isBeat = bassEnergy > peakEnergyRef.current * 0.8 && bassEnergy > beatThreshold;
        
        // Smoother beat transition
        if (isBeat) {
          beatDetectedRef.current = true;
          
          // Random glitch on strong beats
          if (bassEnergy > 0.7) {
            materialRef.current.uniforms.glitchIntensity.value = 0.2 + Math.random() * 0.3;
          } else {
            materialRef.current.uniforms.glitchIntensity.value = 0.05;
          }
        } else {
          // Decay the beat value
          beatDetectedRef.current = false;
          materialRef.current.uniforms.glitchIntensity.value *= 0.9;
        }
        
        // Update material uniforms with audio data
        materialRef.current.uniforms.audioLevel.value = totalEnergy;
        materialRef.current.uniforms.beatActive.value = beatDetectedRef.current ? 
          materialRef.current.uniforms.beatActive.value * 0.6 + 0.4 : 
          materialRef.current.uniforms.beatActive.value * 0.9;
        
        // Dynamically adjust effect intensity based on audio
        materialRef.current.uniforms.intensity.value = 0.3 + totalEnergy * 0.2;
        materialRef.current.uniforms.distortion.value = 0.02 + bassEnergy * 0.05;
      }
    }
  });
  
  return (
    <mesh position={[0, 0, 10]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial 
        ref={materialRef} 
        args={[scanLineShader]} 
        transparent={true} 
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * Main Audio Visualizer Component
 */
export default function AudioReactiveViz({ 
  isPlaying = false,
  onPlayPause = () => {}, 
  audioUrl = '/assets/audio/synthwave.mp3'
}: AudioReactiveVizProps) {
  // State for audio processing
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128).fill(0));
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  
  // Handle audio data processing
  const handleAudioData = useCallback((data: Uint8Array) => {
    if (!audioEnabled) return;
    
    // Process and enhance the frequency data
    const enhancedData = new Uint8Array(data.length);
    
    // Apply non-linear scaling to emphasize differences
    for (let i = 0; i < data.length; i++) {
      // Boost lower frequencies (for beats)
      const boost = i < 20 ? 1.3 : 1.0;
      
      // Non-linear scaling to emphasize differences
      const value = data[i] / 255; // Normalize to 0-1
      const enhancedValue = Math.pow(value, 0.7) * 255 * boost; // Apply curve
      
      enhancedData[i] = Math.min(255, enhancedValue);
    }
    
    setAudioData(enhancedData);
  }, [audioEnabled]);
  
  // Use the audio analyzer hook
  const audioControls = useAudioAnalyzer({
    onData: handleAudioData,
    audioSrc: audioUrl,
    fftSize: 512,
    smoothingTimeConstant: 0.85
  });
  
  // Toggle audio playback
  const handlePlayPause = useCallback(() => {
    const newState = !audioEnabled;
    
    if (newState) {
      audioControls.playAudio().catch((error) => {
        console.error("Error playing audio:", error);
        setAudioEnabled(false);
        onPlayPause(false);
        return;
      });
    } else {
      audioControls.pauseAudio();
    }
    
    setAudioEnabled(newState);
    onPlayPause(newState);
  }, [audioEnabled, audioControls, onPlayPause]);
  
  // Sync audio state with isPlaying prop
  useEffect(() => {
    // Don't auto-play - only respond to explicit play/pause actions
    if (isPlaying !== audioEnabled) {
      if (isPlaying) {
        audioControls.playAudio().catch((error) => {
          console.error("Error playing audio:", error);
          setAudioEnabled(false);
          onPlayPause(false);
          return;
        });
        setAudioEnabled(true);
      } else {
        audioControls.pauseAudio();
        setAudioEnabled(false);
      }
    }
  }, [isPlaying, audioEnabled, audioControls, onPlayPause]);
  
  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      try {
        audioControls.pauseAudio();
      } catch (err) {
        console.error("Error cleaning up audio:", err);
      }
    };
  }, [audioControls]);
  
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {/* Audio controls */}
      {!audioEnabled && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 pointer-events-none">
          <h3 className="text-white text-2xl md:text-4xl animate-glow">CLICK PLAY FOR SYNTHWAVE</h3>
        </div>
      )}
      
      <button
        onClick={handlePlayPause}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 rounded-full p-3 focus:outline-none hover:bg-opacity-70 transition"
        aria-label={audioControls.context?.state === 'running' ? 'Pause' : 'Play'}
      >
        {audioControls.context?.state === 'running' && audioEnabled ? (
          <PauseIcon className="h-6 w-6 text-white" />
        ) : (
          <PlayIcon className="h-6 w-6 text-white" />
        )}
      </button>
      
      <Canvas shadows camera={{ position: [0, 2, 12], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[0, 10, 5]}
          intensity={0.8}
          color="#ff9de2"
          castShadow
        />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#00ffff" />
        
        {/* Retro grid floor */}
        {audioEnabled && (
          <RetroGrid frequencyData={audioData} />
        )}
        
        {/* Synthwave mountains */}
        {audioEnabled && (
          <SynthwaveMountains frequencyData={audioData} />
        )}
        
        {/* Sun */}
        <SynthwaveSun position={[0, 5, -15]} scale={8} />
        
        {/* Audio visualizer */}
        {audioEnabled && (
          <SynthwaveVisualizer 
            frequencyData={audioData} 
            primaryColor="#ff00ff"
            secondaryColor="#00ffff"
            sensitivity={2.5}
          />
        )}
        
        {/* Retro scan lines overlay */}
        {audioEnabled && (
          <RetroScanLines frequencyData={audioData} />
        )}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
} 