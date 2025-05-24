import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TopologyContainer = styled.div`
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  position: relative;
  overflow: hidden;
  margin: 40px 0;
`;

const NetworkNode = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  background: ${({ theme, nodeType }) => {
    switch(nodeType) {
      case 'lb': return '#10B981';
      case 'app': return '#3B82F6';
      case 'db': return '#EF4444';
      case 'cache': return '#F59E0B';
      default: return theme.colors.accent1;
    }
  }};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ConnectionLine = styled(motion.svg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const InfoPanel = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.background1}ee;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.accent1}44;
  border-radius: 10px;
  padding: 20px;
  max-width: 250px;
  z-index: 10;
`;

const InfrastructureTopology = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [trafficFlow, setTrafficFlow] = useState(false);

  const nodes = [
    { id: 'lb', type: 'lb', label: 'LB', position: { top: '20%', left: '50%' }, name: 'Load Balancer', description: 'Distributes incoming requests across multiple application instances' },
    { id: 'app1', type: 'app', label: 'App1', position: { top: '50%', left: '20%' }, name: 'Application Server 1', description: 'Primary application instance running in container' },
    { id: 'app2', type: 'app', label: 'App2', position: { top: '50%', left: '50%' }, name: 'Application Server 2', description: 'Secondary application instance for high availability' },
    { id: 'app3', type: 'app', label: 'App3', position: { top: '50%', left: '80%' }, name: 'Application Server 3', description: 'Auto-scaled application instance' },
    { id: 'cache', type: 'cache', label: 'Redis', position: { top: '75%', left: '35%' }, name: 'Redis Cache', description: 'In-memory cache for session storage and performance' },
    { id: 'db', type: 'db', label: 'DB', position: { top: '75%', left: '65%' }, name: 'Database', description: 'Primary PostgreSQL database with automated backups' }
  ];

  const connections = [
    { from: 'lb', to: 'app1' },
    { from: 'lb', to: 'app2' },
    { from: 'lb', to: 'app3' },
    { from: 'app1', to: 'cache' },
    { from: 'app2', to: 'cache' },
    { from: 'app3', to: 'cache' },
    { from: 'app1', to: 'db' },
    { from: 'app2', to: 'db' },
    { from: 'app3', to: 'db' }
  ];

  const getNodePosition = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? node.position : { top: '50%', left: '50%' };
  };

  return (
    <TopologyContainer>
      <motion.button
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          padding: '8px 16px',
          borderRadius: '8px',
          border: 'none',
          background: trafficFlow ? '#EF4444' : '#10B981',
          color: 'white',
          cursor: 'pointer',
          fontWeight: '600'
        }}
        onClick={() => setTrafficFlow(!trafficFlow)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {trafficFlow ? 'Stop Traffic' : 'Show Traffic'}
      </motion.button>

      <ConnectionLine>
        {connections.map((conn, index) => {
          const fromPos = getNodePosition(conn.from);
          const toPos = getNodePosition(conn.to);
          
          // Convert percentage to actual coordinates
          const x1 = `calc(${fromPos.left} + 30px)`;
          const y1 = `calc(${fromPos.top} + 30px)`;
          const x2 = `calc(${toPos.left} + 30px)`;
          const y2 = `calc(${toPos.top} + 30px)`;
          
          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={trafficFlow ? '#10B981' : '#666'}
              strokeWidth={trafficFlow ? "3" : "2"}
              strokeDasharray={trafficFlow ? "5,5" : "none"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                strokeDashoffset: trafficFlow ? [0, -10] : 0
              }}
              transition={{ 
                duration: 1, 
                delay: index * 0.1,
                strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" }
              }}
            />
          );
        })}
      </ConnectionLine>

      {nodes.map((node, index) => (
        <NetworkNode
          key={node.id}
          nodeType={node.type}
          style={node.position}
          onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {node.label}
        </NetworkNode>
      ))}

      {selectedNode && (
        <InfoPanel
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          {(() => {
            const node = nodes.find(n => n.id === selectedNode);
            return (
              <>
                <h4 style={{ margin: '0 0 10px 0', color: 'inherit' }}>{node.name}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4', color: 'inherit' }}>
                  {node.description}
                </p>
              </>
            );
          })()}
        </InfoPanel>
      )}
    </TopologyContainer>
  );
};

export default InfrastructureTopology;
