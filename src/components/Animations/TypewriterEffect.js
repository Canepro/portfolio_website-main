import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TypewriterContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${props => props.size || '2.5rem'};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  min-height: ${props => props.size || '2.5rem'};
  position: relative;
`;

const Cursor = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.accent1};
  margin-left: 3px;
  width: 3px;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`;

const TypewriterEffect = ({ 
  texts = ["Welcome to my portfolio"], 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000,
  size,
  loop = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          if (loop) {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts, speed, deleteSpeed, pauseTime, loop]);

  return (
    <TypewriterContainer size={size}>
      {displayText}
      <Cursor />
    </TypewriterContainer>
  );
};

export default TypewriterEffect;
