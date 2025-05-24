import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Styled Components
const ScrollContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const RevealElement = styled.div`
  opacity: 0;
  transform: translateY(50px);
`;

const CounterElement = styled.div`
  font-size: 3rem;
  font-weight: 700;
  background: ${({ theme }) => 
    theme.colors?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const MorphingShape = styled.div`
  width: 100px;
  height: 100px;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'linear-gradient(45deg, #3b82f6, #8b5cf6)'
      : 'linear-gradient(45deg, #06b6d4, #3b82f6)'
  };
  border-radius: 50%;
  position: absolute;
  opacity: 0.7;
  filter: blur(20px);
`;

const ParallaxElement = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: ${({ theme, isDark, color }) => 
    isDark 
      ? `radial-gradient(circle, ${color}30 0%, transparent 70%)`
      : `radial-gradient(circle, ${color}20 0%, transparent 70%)`
  };
  border-radius: 50%;
  pointer-events: none;
`;

// Custom hook for scroll animations
export const useScrollAnimations = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Smooth scrolling
    gsap.registerPlugin(ScrollTrigger);

    // Reveal animations for elements with class 'reveal'
    gsap.utils.toArray('.reveal').forEach((element) => {
      gsap.fromTo(element, 
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effects
    gsap.utils.toArray('.parallax').forEach((element, index) => {
      const speed = element.dataset.speed || 0.5;
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Stagger animations for containers
    gsap.utils.toArray('.stagger-container').forEach((container) => {
      const children = container.querySelectorAll('.stagger-item');
      gsap.fromTo(children,
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Scale animations
    gsap.utils.toArray('.scale-up').forEach((element) => {
      gsap.fromTo(element,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Horizontal scroll animations
    gsap.utils.toArray('.slide-in-left').forEach((element) => {
      gsap.fromTo(element,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    gsap.utils.toArray('.slide-in-right').forEach((element) => {
      gsap.fromTo(element,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Rotation animations
    gsap.utils.toArray('.rotate-in').forEach((element) => {
      gsap.fromTo(element,
        {
          rotation: -180,
          opacity: 0,
          scale: 0.5
        },
        {
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDark]);
};

// Animated Counter Component
export const AnimatedCounter = ({ target = 100, suffix = "", duration = 2, className = "" }) => {
  const counterRef = useRef(null);
  const { theme, isDark } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined' || !counterRef.current) return;

    const element = counterRef.current;
    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = Math.round(counter.value) + suffix;
      },
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }, [target, suffix, duration]);

  return (
    <CounterElement 
      ref={counterRef} 
      theme={theme} 
      className={className}
    >
      0{suffix}
    </CounterElement>
  );
};

// Typewriter Effect Component
export const TypewriterEffect = ({ 
  text = "Welcome to my portfolio", 
  speed = 100, 
  className = "",
  onComplete 
}) => {
  const textRef = useRef(null);
  const { theme, isDark } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined' || !textRef.current) return;

    const element = textRef.current;
    const chars = text.split('');
    element.textContent = '';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    chars.forEach((char, index) => {
      tl.to(element, {
        duration: speed / 1000,
        ease: "none",
        onComplete: () => {
          element.textContent += char;
          if (index === chars.length - 1 && onComplete) {
            onComplete();
          }
        }
      });
    });

  }, [text, speed, onComplete]);

  return (
    <div 
      ref={textRef} 
      className={className}
      style={{
        color: isDark ? theme.colors?.text?.primary : theme.colors?.text?.primary,
        fontFamily: theme.fonts?.main
      }}
    />
  );
};

// Morphing Shapes Component
export const MorphingShapes = ({ count = 3 }) => {
  const containerRef = useRef(null);
  const { theme, isDark } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const shapes = containerRef.current.querySelectorAll('.morphing-shape');
    
    shapes.forEach((shape, index) => {
      gsap.set(shape, {
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
      });

      // Continuous morphing animation
      gsap.to(shape, {
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 360,
        duration: 10 + Math.random() * 10,
        ease: "none",
        repeat: -1,
        yoyo: true,
        delay: index * 2
      });

      // Shape transformation
      gsap.to(shape, {
        borderRadius: Math.random() > 0.5 ? "50%" : "0%",
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 1.5
      });
    });
  }, [count]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, index) => (
        <MorphingShape
          key={index}
          className="morphing-shape"
          theme={theme}
          isDark={isDark}
        />
      ))}
    </div>
  );
};

// Parallax Container Component
export const ParallaxContainer = ({ children, speed = 0.5 }) => {
  return (
    <div className="parallax" data-speed={speed}>
      {children}
    </div>
  );
};

// Main ScrollAnimations Component
const ScrollAnimations = ({ children }) => {
  useScrollAnimations();

  return (
    <ScrollContainer>
      {children}
    </ScrollContainer>
  );
};

export default ScrollAnimations;
