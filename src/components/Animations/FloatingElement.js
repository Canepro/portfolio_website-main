import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const FloatContainer = styled.div`
  animation: ${float} ${props => props.duration || 3}s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
`;

const FloatingElement = ({ children, duration = 3, delay = 0, className }) => {
  return (
    <FloatContainer duration={duration} delay={delay} className={className}>
      {children}
    </FloatContainer>
  );
};

export default FloatingElement;
