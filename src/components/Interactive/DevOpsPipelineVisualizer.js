import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Cylinder } from '@react-three/drei';

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

const StatusDisplay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: ${({ theme }) => theme.colors.background1}ee;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.accent1}44;
  border-radius: 10px;
  padding: 15px;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  min-width: 200px;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 50px;
  left: 20px;
  right: 20px;
  height: 4px;
  background: ${({ theme }) => theme.colors.background1}44;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #10B981, #F59E0B, #8B5CF6, #EF4444);
  border-radius: 2px;
  transition: width 0.5s ease;
  width: ${props => props.progress}%;
`;

const PipelineStage = ({ position, stage, isActive, isCompleted, color, icon }) => {
  const meshRef = useRef();
  const textRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      if (isActive) {
        meshRef.current.rotation.y += 0.03;
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.15);
      } else if (isCompleted) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.setScalar(0.8);
      }
    }
    
    if (textRef.current) {
      textRef.current.rotation.y = -state.camera.rotation.y;
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[1.8, 1.8, 1.8]}>
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={isActive ? 1 : isCompleted ? 0.8 : 0.4}
          emissive={isActive ? color : isCompleted ? color : '#000000'}
          emissiveIntensity={isActive ? 0.4 : isCompleted ? 0.2 : 0}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
      
      {/* Stage Icon */}
      <Text
        ref={textRef}
        position={[0, 0, 1]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>
      
      {/* Stage Name */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.3}
        color={isActive || isCompleted ? "white" : "#888888"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {stage}
      </Text>
    </group>
  );
};

const DataFlow = ({ from, to, isActive, delay, color }) => {
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (particlesRef.current && isActive) {
      particlesRef.current.children.forEach((particle, index) => {
        const time = state.clock.elapsedTime + delay + index * 0.3;
        const progress = ((time * 0.8) % 1);
        
        particle.position.x = from[0] + (to[0] - from[0]) * progress;
        particle.position.y = from[1] + (to[1] - from[1]) * progress + Math.sin(time * 2) * 0.2;
        particle.position.z = from[2] + (to[2] - from[2]) * progress;
        
        particle.scale.setScalar(0.5 + Math.sin(time * 4) * 0.3);
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {isActive && Array.from({ length: 8 }).map((_, i) => (
        <Sphere key={i} args={[0.15]}>
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
      ))}
    </group>
  );
};

const DevOpsPipelineVisualizer = () => {
  const [activeStage, setActiveStage] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [completedStages, setCompletedStages] = useState(new Set());

  const stages = [
    { name: 'Source', color: '#3B82F6', position: [-6, 0, 0], icon: '📝', status: 'Pulling latest code...' },
    { name: 'Build', color: '#10B981', position: [-3, 0, 0], icon: '🔨', status: 'Compiling application...' },
    { name: 'Test', color: '#F59E0B', position: [0, 0, 0], icon: '🧪', status: 'Running test suite...' },
    { name: 'Deploy', color: '#8B5CF6', position: [3, 0, 0], icon: '🚀', status: 'Deploying to staging...' },
    { name: 'Monitor', color: '#EF4444', position: [6, 0, 0], icon: '📊', status: 'Monitoring metrics...' }
  ];

  React.useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setActiveStage((prev) => {
          const next = prev + 1;
          if (next >= stages.length) {
            setIsRunning(false);
            setCompletedStages(new Set(Array.from({ length: stages.length }, (_, i) => i)));
            return -1;
          }
          if (prev >= 0) {
            setCompletedStages(prev => new Set([...prev, prev]));
          }
          return next;
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isRunning, stages.length]);

  const resetPipeline = () => {
    setActiveStage(-1);
    setCompletedStages(new Set());
    setIsRunning(false);
  };

  const currentStageData = activeStage >= 0 ? stages[activeStage] : null;
  const progress = isRunning ? ((activeStage + 1) / stages.length) * 100 : completedStages.size > 0 ? 100 : 0;

  return (
    <VisualizerContainer>
      <ControlPanel>
        <ControlButton 
          active={isRunning} 
          onClick={() => setIsRunning(!isRunning)}
          disabled={isRunning}
        >
          {isRunning ? 'Pipeline Running...' : 'Deploy Application'}
        </ControlButton>
        <ControlButton onClick={resetPipeline}>
          Reset Pipeline
        </ControlButton>
      </ControlPanel>

      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      
      <Canvas camera={{ position: [0, 3, 12], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 5, 5]} intensity={0.8} color="#3B82F6" />
        <spotLight position={[-5, 5, 5]} intensity={0.6} color="#10B981" />
        
        {stages.map((stage, index) => (
          <PipelineStage
            key={stage.name}
            position={stage.position}
            stage={stage.name}
            icon={stage.icon}
            isActive={index === activeStage}
            isCompleted={completedStages.has(index)}
            color={stage.color}
          />
        ))}
        
        {stages.slice(0, -1).map((stage, index) => (
          <DataFlow
            key={`flow-${index}`}
            from={stage.position}
            to={stages[index + 1].position}
            isActive={isRunning && index < activeStage}
            delay={index * 0.2}
            color={stage.color}
          />
        ))}
      </Canvas>

      {currentStageData && (
        <StatusDisplay>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            {currentStageData.icon} {currentStageData.name} Stage
          </div>
          <div style={{ opacity: 0.8 }}>
            {currentStageData.status}
          </div>
        </StatusDisplay>
      )}
    </VisualizerContainer>
  );
};

export default DevOpsPipelineVisualizer;
