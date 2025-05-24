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
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.background1} 0%,
    ${({ theme }) => theme.colors.background2} 25%,
    #0f0f23 50%,
    #1a0a1a 75%,
    ${({ theme }) => theme.colors.background1} 100%
  );
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
    animation: gradientShift 20s ease-in-out infinite;
  }
  
  @keyframes gradientShift {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

function FloatingGeometry({ position, color, speed = 1, shape = 'sphere' }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 2;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.3) * 1;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * speed * 0.4) * 1.5;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.z += 0.002;
    }
  });

  const GeometryComponent = shape === 'box' ? 'boxGeometry' : 
                          shape === 'octahedron' ? 'octahedronGeometry' : 
                          'sphereGeometry';

  return (
    <mesh ref={meshRef} position={position} scale={0.3}>
      {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[1, 2]} />}
      {shape === 'sphere' && <sphereGeometry args={[1, 16, 16]} />}
      <meshStandardMaterial 
        color={color} 
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
        wireframe={Math.random() > 0.7}
      />
    </mesh>
  );
}

function AdvancedStars({ count = 2000 }) {
  const starsRef = useRef();
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      
      // Mix of blue, white, and subtle red stars
      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; // White
      } else if (colorChoice < 0.9) {
        colors[i * 3] = 0.4; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 1; // Blue
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.3; colors[i * 3 + 2] = 0.3; // Red
      }
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
      starsRef.current.rotation.x += 0.00005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.8} 
        transparent 
        opacity={0.8} 
        vertexColors
        blending={2}
      />
    </points>
  );
}

function FloatingGrids() {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y += 0.001;
      gridRef.current.position.z = -50 + Math.sin(state.clock.elapsedTime * 0.1) * 10;
    }
  });

  return (
    <group ref={gridRef}>
      <mesh position={[0, 0, -50]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100, 20, 20]} />
        <meshBasicMaterial 
          color="#3B82F6" 
          transparent 
          opacity={0.1} 
          wireframe
        />
      </mesh>
      <mesh position={[0, 0, -80]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[80, 80, 15, 15]} />
        <meshBasicMaterial 
          color="#EF4444" 
          transparent 
          opacity={0.08} 
          wireframe
        />
      </mesh>
    </group>
  );
}

const Three3DBackground = () => {
  const geometries = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30 - 20
      ],
      color: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#EC4899'][Math.floor(Math.random() * 7)],
      speed: 0.2 + Math.random() * 0.8,
      shape: ['sphere', 'box', 'octahedron'][Math.floor(Math.random() * 3)]
    }));
  }, []);

  return (
    <BackgroundContainer>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#3B82F6" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#EF4444" />
        <pointLight position={[0, 0, 10]} intensity={0.4} color="#10B981" />
        
        <AdvancedStars count={2000} />
        <FloatingGrids />
        
        {geometries.map((geo) => (
          <FloatingGeometry
            key={geo.id}
            position={geo.position}
            color={geo.color}
            speed={geo.speed}
            shape={geo.shape}
          />
        ))}
        
        <fog attach="fog" args={['#0a0a0a', 50, 200]} />
      </Canvas>
    </BackgroundContainer>
  );
};

export default Three3DBackground;
