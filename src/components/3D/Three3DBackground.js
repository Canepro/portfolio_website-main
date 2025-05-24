import React, { useRef, useMemo } from 'react';
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
  pointer-events: none;
  opacity: 0.6; /* Make it more subtle */
`;

// Simplified particle-like geometry
function FloatingParticle({ position, color, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 1;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.5;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={0.3}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial 
        color={color} 
        transparent
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

const Three3DBackground = () => {
  // Generate random positions for particles
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20 - 10
      ],
      color: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][Math.floor(Math.random() * 4)],
      speed: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <BackgroundContainer>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
      >
        {/* Subtle lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {/* Minimal stars */}
        <Stars 
          radius={50} 
          depth={30} 
          count={1000} 
          factor={1} 
          saturation={0} 
          fade 
          speed={0.3}
        />
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            position={particle.position}
            color={particle.color}
            speed={particle.speed}
          />
        ))}
      </Canvas>
    </BackgroundContainer>
  );
};

export default Three3DBackground;
