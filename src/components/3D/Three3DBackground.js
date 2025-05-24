import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  opacity: 0.6;
`;

function FloatingParticle({ position, color, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.8) * 2;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.6) * 1.5;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * speed * 0.4) * 1;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={0.4}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial 
        color={color} 
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function SimpleStars({ count = 1000 }) {
  const starsRef = useRef();
  
  const starPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, [count]);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

const Three3DBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 25 - 15
      ],
      color: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4'][Math.floor(Math.random() * 6)],
      speed: 0.3 + Math.random() * 0.7
    }));
  }, []);

  return (
    <BackgroundContainer>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 15, 15]} intensity={0.6} color="#3B82F6" />
        <pointLight position={[-15, -15, -15]} intensity={0.4} color="#F59E0B" />
        <pointLight position={[0, 20, 10]} intensity={0.3} color="#10B981" />
        
        <SimpleStars count={1500} />
        
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
