import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

// Animated Background Keyframes
const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
`;

const drift = keyframes`
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(calc(100vw + 100px));
  }
`;

// Styled Components
const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

const FloatingOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme, isDark, color }) => 
    isDark 
      ? `radial-gradient(circle, ${color}20 0%, ${color}05 70%)`
      : `radial-gradient(circle, ${color}15 0%, ${color}03 70%)`
  };
  animation: ${float} ${({ duration }) => duration}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
  backdrop-filter: blur(1px);
`;

const PulsingDot = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ theme, isDark, color }) => 
    isDark ? color : color
  };
  animation: ${pulse} ${({ duration }) => duration}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const DriftingParticle = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: ${({ theme, isDark, color }) => 
    isDark ? `${color}60` : `${color}40`
  };
  animation: ${drift} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const AnimatedBackground = () => {
  const { isDark, theme } = useTheme();

  // Generate random orbs
  const orbs = React.useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      size: Math.random() * 200 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][i % 5],
    }));
  }, []);

  // Generate random dots
  const dots = React.useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4'][i % 3],
    }));
  }, []);

  // Generate drifting particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][i % 4],
    }));
  }, []);

  return (
    <BackgroundContainer>
      {/* Floating Orbs */}
      {orbs.map((orb) => (
        <FloatingOrb
          key={`orb-${orb.id}`}
          theme={theme}
          isDark={isDark}
          color={orb.color}
          duration={orb.duration}
          delay={orb.delay}
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
        />
      ))}

      {/* Pulsing Dots */}
      {dots.map((dot) => (
        <PulsingDot
          key={`dot-${dot.id}`}
          theme={theme}
          isDark={isDark}
          color={dot.color}
          duration={dot.duration}
          delay={dot.delay}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
        />
      ))}

      {/* Drifting Particles */}
      {particles.map((particle) => (
        <DriftingParticle
          key={`particle-${particle.id}`}
          theme={theme}
          isDark={isDark}
          color={particle.color}
          duration={particle.duration}
          delay={particle.delay}
          style={{
            top: `${particle.y}%`,
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default AnimatedBackground;
