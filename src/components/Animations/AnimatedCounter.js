import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
  font-size: ${props => props.size || '2rem'};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent1};
  text-align: center;
`;

const CounterLabel = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 8px;
  font-weight: normal;
`;

const AnimatedCounter = ({ 
  end = 100, 
  start = 0, 
  duration = 2000, 
  label, 
  suffix = "",
  size,
  trigger = true 
}) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!trigger || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          animateCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [trigger, hasAnimated]);

  const animateCounter = () => {
    const startTime = Date.now();
    const range = end - start;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(start + range * easeOut);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <div ref={counterRef}>
      <CounterContainer size={size}>
        {count.toLocaleString()}{suffix}
      </CounterContainer>
      {label && <CounterLabel>{label}</CounterLabel>}
    </div>
  );
};

export default AnimatedCounter;
