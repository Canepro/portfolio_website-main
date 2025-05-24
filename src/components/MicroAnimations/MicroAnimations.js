import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

// Styled Components
const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MorphingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme, isDark, color }) => 
    isDark 
      ? `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`
      : `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`
  };
  filter: blur(1px);
  pointer-events: none;
`;

const TextContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const AnimatedText = styled(motion.span)`
  display: inline-block;
  color: ${({ theme, isDark }) => 
    isDark ? theme.colors?.text?.primary : theme.colors?.text?.primary
  };
`;

const NumberContainer = styled(motion.div)`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

// Animated Counter Component
export const AnimatedCounter = ({ 
  from = 0, 
  to, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = ''
}) => {
  const [count, setCount] = useState(from);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      const animation = gsap.to({ value: from }, {
        value: to,
        duration,
        ease: "power2.out",
        onUpdate: function() {
          setCount(Math.round(this.targets()[0].value));
        }
      });

      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });

      return () => animation.kill();
    }
  }, [inView, from, to, duration, controls]);

  return (
    <NumberContainer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className={className}
    >
      {prefix}{count}{suffix}
    </NumberContainer>
  );
};

// Typewriter Effect Component
export const TypewriterEffect = ({ 
  text, 
  speed = 50, 
  delay = 0,
  cursor = true,
  onComplete,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(cursor);
  const [isComplete, setIsComplete] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let timeoutId;
    let currentIndex = 0;

    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, speed);
        } else {
          setIsComplete(true);
          if (onComplete) onComplete();
          // Hide cursor after completion
          setTimeout(() => setShowCursor(false), 1000);
        }
      };

      timeoutId = setTimeout(typeNextChar, delay);
    };

    startTyping();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [inView, text, speed, delay, onComplete]);

  return (
    <TextContainer ref={ref} className={className}>
      <AnimatedText>
        {displayText}
        {showCursor && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            |
          </motion.span>
        )}
      </AnimatedText>
    </TextContainer>
  );
};

// Morphing Shapes Background
export const MorphingShapesBackground = ({ count = 5, className = '' }) => {
  const containerRef = useRef(null);
  const { theme, isDark } = useTheme();
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    // Generate random shapes
    const newShapes = Array.from({ length: count }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      color: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][index % 5]
    }));
    setShapes(newShapes);
  }, [count]);

  useEffect(() => {
    if (!containerRef.current) return;

    const shapeElements = containerRef.current.querySelectorAll('.morphing-shape');
    
    shapeElements.forEach((shape, index) => {
      // Continuous morphing animation
      gsap.to(shape, {
        x: `random(-50, 50, 5)`,
        y: `random(-30, 30, 5)`,
        scale: `random(0.8, 1.2, 0.1)`,
        rotation: `random(0, 360, 45)`,
        duration: `random(8, 15)`,
        ease: "none",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      });

      // Shape transformation
      gsap.to(shape, {
        borderRadius: `random(20%, 50%, 10%)`,
        duration: `random(4, 8)`,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.8
      });

      // Color morphing
      gsap.to(shape, {
        filter: `hue-rotate(${Math.random() * 360}deg)`,
        duration: `random(6, 12)`,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 1.2
      });
    });
  }, [shapes]);

  return (
    <AnimationContainer ref={containerRef} className={className}>
      {shapes.map((shape) => (
        <MorphingShape
          key={shape.id}
          className="morphing-shape"
          theme={theme}
          isDark={isDark}
          color={shape.color}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: shape.id * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </AnimationContainer>
  );
};

// Particle Burst Effect
export const ParticleBurst = ({ 
  trigger = false, 
  particleCount = 20,
  origin = { x: 50, y: 50 },
  colors = ['#8b5cf6', '#06b6d4', '#10b981'],
  onComplete,
  className = ''
}) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    // Generate particles
    const newParticles = Array.from({ length: particleCount }, (_, index) => ({
      id: index,
      color: colors[index % colors.length],
      angle: (360 / particleCount) * index,
      velocity: Math.random() * 100 + 50,
      life: Math.random() * 1000 + 500
    }));

    setParticles(newParticles);

    // Animate particles
    newParticles.forEach((particle, index) => {
      const element = containerRef.current?.children[index];
      if (!element) return;

      const radian = (particle.angle * Math.PI) / 180;
      const dx = Math.cos(radian) * particle.velocity;
      const dy = Math.sin(radian) * particle.velocity;

      gsap.fromTo(element, 
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1
        },
        {
          x: dx,
          y: dy,
          opacity: 0,
          scale: 0,
          duration: particle.life / 1000,
          ease: "power2.out",
          onComplete: () => {
            if (index === newParticles.length - 1 && onComplete) {
              onComplete();
            }
          }
        }
      );
    });

    // Clear particles after animation
    setTimeout(() => {
      setParticles([]);
    }, Math.max(...newParticles.map(p => p.life)) + 100);

  }, [trigger, particleCount, colors, onComplete]);

  return (
    <ParticleContainer 
      ref={containerRef} 
      className={className}
      style={{
        left: `${origin.x}%`,
        top: `${origin.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          color={particle.color}
        />
      ))}
    </ParticleContainer>
  );
};

// Liquid Morphing Button
export const LiquidButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const { theme, isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    let morphTween;

    const handleMouseEnter = (e) => {
      setIsHovered(true);
      
      // Create ripple effect
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Liquid morphing animation
      morphTween = gsap.to(button, {
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });

      // Scale animation
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      if (morphTween) morphTween.kill();
      
      // Return to normal shape
      gsap.to(button, {
        borderRadius: "8px",
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      if (morphTween) morphTween.kill();
    };
  }, []);

  const LiquidButtonStyled = styled(motion.button)`
    position: relative;
    padding: 1rem 2rem;
    border: none;
    background: ${({ theme, isDark, variant }) => {
      if (variant === 'primary') {
        return isDark 
          ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
          : 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)';
      }
      return isDark 
        ? 'rgba(148, 163, 184, 0.1)'
        : 'rgba(15, 23, 42, 0.05)';
    }};
    color: ${({ theme, isDark, variant }) => 
      variant === 'primary' 
        ? 'white' 
        : (isDark ? theme.colors?.text?.primary : theme.colors?.text?.primary)
    };
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }
    
    &:hover::before {
      left: 100%;
    }
  `;

  return (
    <LiquidButtonStyled
      ref={buttonRef}
      onClick={onClick}
      theme={theme}
      isDark={isDark}
      variant={variant}
      className={className}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </LiquidButtonStyled>
  );
};

// Text Reveal Animation
export const TextReveal = ({ 
  children, 
  stagger = 0.1, 
  duration = 0.6,
  className = ''
}) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const words = children.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger
      }
    }
  };

  const wordVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      rotateX: -90
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        overflow: 'hidden',
        lineHeight: 1.2
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          style={{ 
            display: 'inline-block', 
            marginRight: '0.3em',
            transformOrigin: '50% 100%'
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Hook for micro-animations
export const useMicroAnimations = () => {
  const [animations, setAnimations] = useState({
    hover: false,
    click: false,
    focus: false
  });

  const triggerAnimation = (type) => {
    setAnimations(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setAnimations(prev => ({ ...prev, [type]: false }));
    }, 300);
  };

  return {
    animations,
    triggerAnimation,
    microProps: {
      onMouseEnter: () => triggerAnimation('hover'),
      onMouseDown: () => triggerAnimation('click'),
      onFocus: () => triggerAnimation('focus')
    }
  };
};

export default {
  AnimatedCounter,
  TypewriterEffect,
  MorphingShapesBackground,
  ParticleBurst,
  LiquidButton,
  TextReveal,
  useMicroAnimations
};
