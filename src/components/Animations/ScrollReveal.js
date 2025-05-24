import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  distance = 50, 
  duration = 1, 
  delay = 0,
  stagger = 0,
  trigger,
  className 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on direction
    const initialState = {
      opacity: 0,
    };

    const finalState = {
      opacity: 1,
      duration,
      delay,
      ease: "power2.out",
    };

    switch (direction) {
      case 'up':
        initialState.y = distance;
        finalState.y = 0;
        break;
      case 'down':
        initialState.y = -distance;
        finalState.y = 0;
        break;
      case 'left':
        initialState.x = distance;
        finalState.x = 0;
        break;
      case 'right':
        initialState.x = -distance;
        finalState.x = 0;
        break;
      case 'scale':
        initialState.scale = 0.8;
        finalState.scale = 1;
        break;
      case 'fade':
        // Only opacity animation
        break;
    }

    // Set initial state
    gsap.set(element.children || element, initialState);

    // Create animation with ScrollTrigger
    const animation = gsap.to(element.children || element, {
      ...finalState,
      stagger: stagger,
      scrollTrigger: {
        trigger: trigger || element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [direction, distance, duration, delay, stagger, trigger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
