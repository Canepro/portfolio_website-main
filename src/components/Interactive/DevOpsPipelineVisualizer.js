import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';

const VisualizerContainer = styled.div`
  width: 100%;
  height: 500px;
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  position: relative;
  overflow: hidden;
  margin: 40px 0;
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button`
  background: ${({ theme, active }) => active ? theme.colors.accent1 : theme.colors.background1};
  color: ${({ theme, active }) => active ? 'white' : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.accent1};
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent1};
    color: white;
  }
`;

const PipelineStage = ({ position, stage, isActive, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[1.5, 1.5, 1.5]}>
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={isActive ? 1 : 0.6}
          emissive={isActive ? color : '#000000'}
          emissiveIntensity={isActive ? 0.3 : 0}
        />
      </Box>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {stage}
      </Text>
    </group>
  );
};

const DataFlow = ({ from, to, isActive }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.children.forEach((child, index) => {
        const progress = ((state.clock.elapsedTime * 0.5 + index * 0.2) % 1);
        child.position.x = from[0] + (to[0] - from[0]) * progress;
        child.position.y = from[1] + (to[1] - from[1]) * progress;
        child.position.z = from[2] + (to[2] - from[2]) * progress;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {isActive && Array.from({ length: 5 }).map((_, i) => (
        <Sphere key={i} args={[0.1]}>
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
        </Sphere>
      ))}
    </group>
  );
};

const DevOpsPipelineVisualizer = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const stages = [
    { name: 'Code', color: '#3B82F6', position: [-4, 0, 0] },
    { name: 'Build', color: '#10B981', position: [-2, 0, 0] },
    { name: 'Test', color: '#F59E0B', position: [0, 0, 0] },
    { name: 'Deploy', color: '#8B5CF6', position: [2, 0, 0] },
    { name: 'Monitor', color: '#EF4444', position: [4, 0, 0] }
  ];

  React.useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setActiveStage((prev) => (prev + 1) % stages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isRunning, stages.length]);

  return (
    <VisualizerContainer>
      <ControlPanel>
        <ControlButton 
          active={isRunning} 
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Stop Pipeline' : 'Run Pipeline'}
        </ControlButton>
        <ControlButton onClick={() => setActiveStage(0)}>
          Reset
        </ControlButton>
      </ControlPanel>
      
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {stages.map((stage, index) => (
          <PipelineStage
            key={stage.name}
            position={stage.position}
            stage={stage.name}
            isActive={isRunning ? index <= activeStage : index === activeStage}
            color={stage.color}
          />
        ))}
        
        {stages.slice(0, -1).map((stage, index) => (
          <DataFlow
            key={`flow-${index}`}
            from={stage.position}
            to={stages[index + 1].position}
            isActive={isRunning && index < activeStage}
          />
        ))}
      </Canvas>
    </VisualizerContainer>
  );
};

export default DevOpsPipelineVisualizer;
