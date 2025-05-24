import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const hologramFlicker = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`;

const HoloContainer = styled.div`
  position: relative;
  background: rgba(0, 20, 40, 0.1);
  border: 2px solid #00ff88;
  border-radius: 15px;
  padding: 30px;
  margin: 40px 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
    animation: ${scanline} 3s linear infinite;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 136, 0.03) 2px,
        rgba(0, 255, 136, 0.03) 4px
      );
    pointer-events: none;
    animation: ${hologramFlicker} 0.15s linear infinite;
  }
`;

const HoloText = styled.div`
  color: #00ff88;
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  text-shadow: 0 0 10px #00ff88;
  position: relative;
  z-index: 2;
  line-height: 1.6;
`;

const HoloTitle = styled.h3`
  color: #00ff88;
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  text-shadow: 0 0 15px #00ff88;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CommandPrompt = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #00ff88;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  font-family: 'Courier New', monospace;
  color: #00ff88;
  position: relative;
  
  &::before {
    content: '> ';
    color: #ff6b6b;
  }
`;

const HolographicInterface = ({ title, children, commandMode = false }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const commands = [
    'sudo systemctl status nginx',
    'kubectl get pods --all-namespaces',
    'terraform plan -out=tfplan',
    'docker ps -a | grep running',
    'az vm list --query "[].name" -o table',
    'helm list --all-namespaces'
  ];

  useEffect(() => {
    if (commandMode) {
      const currentCommand = commands[currentIndex % commands.length];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex <= currentCommand.length) {
          setDisplayText(currentCommand.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
          }, 2000);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [currentIndex, commandMode]);

  return (
    <HoloContainer>
      {title && <HoloTitle>{title}</HoloTitle>}
      
      {commandMode ? (
        <CommandPrompt>
          {displayText}
          <span style={{ animation: 'blink 1s infinite' }}>|</span>
        </CommandPrompt>
      ) : (
        <HoloText>{children}</HoloText>
      )}
      
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </HoloContainer>
  );
};

export default HolographicInterface;
