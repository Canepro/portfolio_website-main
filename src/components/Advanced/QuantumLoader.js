import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';

const quantumSpin = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
`;

const energyPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px #3B82F6; }
  50% { box-shadow: 0 0 40px #EF4444, 0 0 60px #10B981; }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(0,0,0,1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.5s ease;
`;

const QuantumCore = styled.div`
  width: 120px;
  height: 120px;
  border: 3px solid transparent;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #3B82F6, #EF4444, #10B981, #F59E0B, #3B82F6);
  animation: ${quantumSpin} 2s linear infinite, ${energyPulse} 3s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    width: 80px;
    height: 80px;
    background: #000;
    border-radius: 50%;
  }
`;

const LoadingText = styled.div`
  color: #00ff88;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  margin-top: 30px;
  text-shadow: 0 0 10px #00ff88;
  text-align: center;
`;

const SystemCheck = styled.div`
  color: #3B82F6;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  margin-top: 10px;
  opacity: 0.8;
`;

function QuantumParticle({ position }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 2) * 2;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 1.5) * 2;
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.3]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

const QuantumLoader = ({ show, progress = 0 }) => {
  const systems = [
    'Neural networks initializing...',
    'Quantum algorithms loading...',
    'Holographic interface preparing...',
    'AI consciousness awakening...',
    'Reality matrix stabilizing...',
    'Welcome to CANEPRO portfolio'
  ];

  const currentSystem = systems[Math.floor((progress / 100) * systems.length)] || systems[0];

  return (
    <LoaderContainer show={show}>
      <div style={{ height: '200px', width: '400px', position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {Array.from({ length: 8 }).map((_, i) => (
            <QuantumParticle
              key={i}
              position={[
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
              ]}
            />
          ))}
        </Canvas>
      </div>
      
      <QuantumCore />
      
      <LoadingText>
        CANEPRO SYSTEM INITIALIZATION
      </LoadingText>
      
      <SystemCheck>
        {currentSystem}
      </SystemCheck>
      
      <div style={{ 
        width: '300px', 
        height: '4px', 
        background: 'rgba(59, 130, 246, 0.3)', 
        marginTop: '20px',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #3B82F6, #EF4444, #10B981)',
          transition: 'width 0.3s ease',
          borderRadius: '2px'
        }} />
      </div>
    </LoaderContainer>
  );
};

export default QuantumLoader;
