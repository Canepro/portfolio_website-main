import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
`;

// Floating Particles Component
function FloatingParticles({ count = 5000 }) {
  const mesh = useRef();
  const { isDark } = useTheme();

  // Generate random positions for particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const radius = Math.random() * 20 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random colors - purple/blue theme
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = isDark ? 0.6 : 0.3; // R
        colors[i * 3 + 1] = isDark ? 0.4 : 0.2; // G
        colors[i * 3 + 2] = isDark ? 1.0 : 0.8; // B (Purple)
      } else if (colorChoice < 0.66) {
        colors[i * 3] = isDark ? 0.3 : 0.1; // R
        colors[i * 3 + 1] = isDark ? 0.7 : 0.4; // G
        colors[i * 3 + 2] = isDark ? 1.0 : 0.8; // B (Blue)
      } else {
        colors[i * 3] = isDark ? 0.5 : 0.2; // R
        colors[i * 3 + 1] = isDark ? 0.9 : 0.6; // G
        colors[i * 3 + 2] = isDark ? 0.7 : 0.4; // B (Cyan)
      }
    }

    return [positions, colors];
  }, [count, isDark]);

  // Animate particles
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      mesh.current.scale.setScalar(scale);
    }
  });

  return (
    <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={isDark ? 0.015 : 0.01}
        sizeAttenuation={true}
        alphaTest={0.5}
        opacity={isDark ? 0.8 : 0.6}
      />
      <bufferAttribute
        attach="attributes-color"
        args={[colors, 3]}
      />
    </Points>
  );
}

// Floating Geometric Shapes
function FloatingGeometry() {
  const { isDark } = useTheme();
  
  return (
    <>
      {/* Floating Icosahedron */}
      <Float
        speed={1.5}
        rotationIntensity={1}
        floatIntensity={2}
        position={[-4, 2, -5]}
      >
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color={isDark ? "#8b5cf6" : "#6366f1"}
            transparent
            opacity={0.3}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Floating Octahedron */}
      <Float
        speed={1.2}
        rotationIntensity={0.8}
        floatIntensity={1.5}
        position={[4, -1, -3]}
      >
        <mesh>
          <octahedronGeometry args={[0.8, 2]} />
          <MeshDistortMaterial
            color={isDark ? "#06b6d4" : "#0ea5e9"}
            transparent
            opacity={0.4}
            distort={0.2}
            speed={1.5}
          />
        </mesh>
      </Float>

      {/* Floating Torus */}
      <Float
        speed={2}
        rotationIntensity={1.2}
        floatIntensity={1}
        position={[0, 3, -8]}
      >
        <mesh>
          <torusGeometry args={[1.2, 0.3, 16, 32]} />
          <MeshDistortMaterial
            color={isDark ? "#10b981" : "#059669"}
            transparent
            opacity={0.25}
            distort={0.4}
            speed={3}
          />
        </mesh>
      </Float>

      {/* Floating Sphere */}
      <Float
        speed={0.8}
        rotationIntensity={0.5}
        floatIntensity={2.5}
        position={[-2, -3, -6]}
      >
        <Sphere args={[0.6, 32, 32]}>
          <MeshDistortMaterial
            color={isDark ? "#f59e0b" : "#d97706"}
            transparent
            opacity={0.3}
            distort={0.15}
            speed={1}
          />
        </Sphere>
      </Float>
    </>
  );
}

// Main Three.js Background Component
const Three3DBackground = () => {
  const { isDark } = useTheme();

  return (
    <CanvasContainer>
      <Canvas
        camera={{ 
          position: [0, 0, 10], 
          fov: 75,
          near: 0.1,
          far: 1000 
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={isDark ? 0.2 : 0.1} />
          
          {/* Point lights for dynamic lighting */}
          <pointLight 
            position={[10, 10, 10]} 
            intensity={isDark ? 0.5 : 0.3}
            color={isDark ? "#8b5cf6" : "#6366f1"}
          />
          <pointLight 
            position={[-10, -10, -10]} 
            intensity={isDark ? 0.3 : 0.2}
            color={isDark ? "#06b6d4" : "#0ea5e9"}
          />

          {/* Particle system */}
          <FloatingParticles count={3000} />
          
          {/* Floating geometric shapes */}
          <FloatingGeometry />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};

export default Three3DBackground;
