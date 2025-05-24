import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

// Styled Components
const CursorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CursorDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${({ theme, isDark }) => 
    isDark ? '#ffffff' : '#000000'
  };
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
  z-index: 10001;

  &.hovering {
    width: 32px;
    height: 32px;
    background: transparent;
    border: 2px solid ${({ theme, isDark }) => 
      isDark ? '#ffffff' : '#000000'
    };
  }

  &.clicking {
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.colors?.primary || '#3b82f6'};
  }

  &.text-hover {
    width: 60px;
    height: 60px;
    background: transparent;
    border: 1px solid ${({ theme, isDark }) => 
      isDark ? '#ffffff40' : '#00000040'
    };
  }
`;

const CursorTrail = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme, isDark }) => 
    isDark ? '#ffffff60' : '#00000060'
  };
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
  z-index: 10000;
  opacity: 0.6;

  &.hovering {
    width: 50px;
    height: 50px;
    opacity: 0.4;
  }

  &.clicking {
    width: 40px;
    height: 40px;
    opacity: 0.8;
  }
`;

const TrailParticle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${({ theme, isDark }) => 
    isDark ? '#ffffff' : '#000000'
  };
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  transition: opacity 0.3s ease;
`;

// Custom Cursor Component
const CustomCursor = () => {
  const { theme, isDark } = useTheme();
  const cursorDotRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const trailParticlesRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);

  // Trail particles state
  const particles = useRef([]);
  const maxParticles = 8;

  useEffect(() => {
    const dot = cursorDotRef.current;
    const trail = cursorTrailRef.current;

    if (!dot || !trail) return;

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Update cursor dot position immediately
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      // Add particle to trail
      particles.current.push({
        x: mouseX,
        y: mouseY,
        timestamp: Date.now()
      });

      // Remove old particles
      if (particles.current.length > maxParticles) {
        particles.current = particles.current.slice(-maxParticles);
      }

      // Update trail particles
      updateTrailParticles();
    };

    // Smooth trail animation
    const animateTrail = () => {
      const speed = 0.15;
      trailX += (mouseX - trailX) * speed;
      trailY += (mouseY - trailY) * speed;

      trail.style.left = `${trailX}px`;
      trail.style.top = `${trailY}px`;

      requestAnimationFrame(animateTrail);
    };

    // Update trail particles
    const updateTrailParticles = () => {
      particles.current.forEach((particle, index) => {
        const age = Date.now() - particle.timestamp;
        const maxAge = 500; // 500ms
        
        if (age > maxAge) {
          particles.current.splice(index, 1);
          return;
        }

        const element = trailParticlesRef.current[index];
        if (element) {
          const opacity = 1 - (age / maxAge);
          const scale = 1 - (age / maxAge) * 0.5;
          
          element.style.left = `${particle.x}px`;
          element.style.top = `${particle.y}px`;
          element.style.opacity = opacity;
          element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
      });
    };

    // Mouse enter/leave handlers
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Click handlers
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Hover detection for interactive elements
    const handleElementHover = (e) => {
      const target = e.target;
      const isInteractive = target.matches('a, button, [role="button"], input, textarea, select');
      const isText = target.matches('p, h1, h2, h3, h4, h5, h6, span, div[contenteditable]');
      
      setIsHovering(isInteractive);
      setIsTextHover(isText && !isInteractive);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover);

    // Start trail animation
    animateTrail();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, []);

  // Generate trail particles
  useEffect(() => {
    const container = document.getElementById('cursor-container');
    if (!container) return;

    // Create trail particle elements
    for (let i = 0; i < maxParticles; i++) {
      if (!trailParticlesRef.current[i]) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.cssText = `
          position: absolute;
          width: 3px;
          height: 3px;
          background: ${isDark ? '#ffffff' : '#000000'};
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.1s ease;
        `;
        container.appendChild(particle);
        trailParticlesRef.current[i] = particle;
      }
    }

    // Cleanup function
    return () => {
      trailParticlesRef.current.forEach(particle => {
        if (particle && particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      trailParticlesRef.current = [];
    };
  }, [isDark]);

  if (typeof window === 'undefined') return null;

  return (
    <CursorContainer id="cursor-container" style={{ opacity: isVisible ? 1 : 0 }}>
      <CursorDot
        ref={cursorDotRef}
        theme={theme}
        isDark={isDark}
        className={`
          ${isHovering ? 'hovering' : ''} 
          ${isClicking ? 'clicking' : ''}
          ${isTextHover ? 'text-hover' : ''}
        `.trim()}
      />
      <CursorTrail
        ref={cursorTrailRef}
        theme={theme}
        isDark={isDark}
        className={`
          ${isHovering ? 'hovering' : ''} 
          ${isClicking ? 'clicking' : ''}
        `.trim()}
      />
    </CursorContainer>
  );
};

export default CustomCursor;
