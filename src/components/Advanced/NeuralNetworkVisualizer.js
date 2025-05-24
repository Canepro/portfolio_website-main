import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';

const NeuralContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 15, 40, 0.95) 0%,
    rgba(0, 5, 20, 0.98) 50%,
    rgba(0, 0, 0, 1) 100%
  );
`;

function NeuralNode({ position, connections, isActive, pulseDelay }) {
  const meshRef = useRef();
  const [intensity, setIntensity] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + pulseDelay;
      const pulse = Math.sin(time * 2) * 0.5 + 0.5;
      
      meshRef.current.scale.setScalar(0.8 + pulse * 0.4);
      setIntensity(isActive ? pulse : 0.2);
      
      // Gentle rotation
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color={isActive ? "#00ff88" : "#3B82F6"}
        emissive={isActive ? "#00ff88" : "#1e40af"}
        emissiveIntensity={intensity}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function NeuralConnection({ start, end, isActive, delay }) {
  const lineRef = useRef();
  
  useFrame((state) => {
    if (lineRef.current && isActive) {
      const time = state.clock.elapsedTime + delay;
      const pulse = Math.sin(time * 3) * 0.5 + 0.5;
      lineRef.current.material.opacity = 0.3 + pulse * 0.4;
    }
  });

  const points = [start, end];
  
  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array(points.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={isActive ? "#00ff88" : "#3B82F6"}
        transparent
        opacity={0.3}
      />
    </line>
  );
}

const NeuralNetworkVisualizer = () => {
  const [activeNodes, setActiveNodes] = useState(new Set());
  
  // Create neural network structure
  const layers = [
    // Input layer
    Array.from({ length: 5 }, (_, i) => ({ x: -8, y: (i - 2) * 2, z: 0 })),
    // Hidden layer 1
    Array.from({ length: 8 }, (_, i) => ({ x: -4, y: (i - 3.5) * 1.5, z: 0 })),
    // Hidden layer 2
    Array.from({ length: 6 }, (_, i) => ({ x: 0, y: (i - 2.5) * 1.8, z: 0 })),
    // Output layer
    Array.from({ length: 3 }, (_, i) => ({ x: 4, y: (i - 1) * 2, z: 0 }))
  ];

  const allNodes = layers.flat();
  const connections = [];

  // Create connections between layers
  layers.forEach((layer, layerIndex) => {
    if (layerIndex < layers.length - 1) {
      const nextLayer = layers[layerIndex + 1];
      layer.forEach(node => {
        nextLayer.forEach(nextNode => {
          connections.push({
            start: [node.x, node.y, node.z],
            end: [nextNode.x, nextNode.y, nextNode.z]
          });
        });
      });
    }
  });

  // Simulate neural activity
  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveNodes = new Set();
      const numActive = Math.floor(Math.random() * 8) + 5;
      
      while (newActiveNodes.size < numActive) {
        newActiveNodes.add(Math.floor(Math.random() * allNodes.length));
      }
      
      setActiveNodes(newActiveNodes);
    }, 2000);

    return () => clearInterval(interval);
  }, [allNodes.length]);

  return (
    <NeuralContainer>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#3B82F6" />
        
        {/* Render connections */}
        {connections.map((conn, index) => (
          <NeuralConnection
            key={`conn-${index}`}
            start={conn.start}
            end={conn.end}
            isActive={Math.random() > 0.7}
            delay={index * 0.1}
          />
        ))}
        
        {/* Render nodes */}
        {allNodes.map((node, index) => (
          <NeuralNode
            key={`node-${index}`}
            position={[node.x, node.y, node.z]}
            isActive={activeNodes.has(index)}
            pulseDelay={index * 0.1}
          />
        ))}
        
        <fog attach="fog" args={['#000511', 10, 30]} />
      </Canvas>
    </NeuralContainer>
  );
};

export default NeuralNetworkVisualizer;
