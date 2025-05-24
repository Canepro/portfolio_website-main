import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none; /* Prevents interference with page interaction */
`;

// Simplified rotating geometry
function FloatingShape({ position, color, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * 0.3;
      meshRef.current.rotation.y += delta * speed * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={0.8}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={false}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

const Three3DBackground = () => {
  return (
    <BackgroundContainer>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]} // Responsive pixel ratio
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4F46E5" />
        
        {/* Stars background */}
        <Stars 
          radius={100} 
          depth={50} 
          count={2000} 
          factor={2} 
          saturation={0} 
          fade 
          speed={0.5} 
        />
        
        {/* Floating shapes */}
        <FloatingShape position={[-3, 2, -5]} color="#F59E0B" speed={0.8} />
        <FloatingShape position={[3, -1, -3]} color="#3B82F6" speed={1.2} />
        <FloatingShape position={[0, 3, -7]} color="#10B981" speed={0.6} />
        <FloatingShape position={[-2, -2, -4]} color="#8B5CF6" speed={1.0} />
      </Canvas>
    </BackgroundContainer>
  );
};

export default Three3DBackground;
