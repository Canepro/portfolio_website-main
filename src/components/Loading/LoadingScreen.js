import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

// Styled Components
const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
  };
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingContent = styled.div`
  text-align: center;
  max-width: 400px;
  padding: 2rem;
`;

const LoadingTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  background: ${({ theme }) => 
    theme.colors?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const LoadingSubtitle = styled(motion.p)`
  color: ${({ theme, isDark }) => 
    isDark 
      ? theme.colors?.text?.secondary || '#cbd5e1'
      : theme.colors?.text?.secondary || '#64748b'
  };
  font-size: 1.125rem;
  margin-bottom: 3rem;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(148, 163, 184, 0.2)'
      : 'rgba(15, 23, 42, 0.1)'
  };
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => 
    theme.colors?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  border-radius: 2px;
  transform-origin: left;
`;

const ProgressText = styled(motion.div)`
  color: ${({ theme, isDark }) => 
    isDark 
      ? theme.colors?.text?.primary || '#f8fafc'
      : theme.colors?.text?.primary || '#1e293b'
  };
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
`;

const LoadingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 3px solid ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(148, 163, 184, 0.2)'
      : 'rgba(15, 23, 42, 0.1)'
  };
  border-top: 3px solid ${({ theme }) => theme.colors?.primary || '#3b82f6'};
  border-radius: 50%;
  margin: 2rem auto;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Dot = styled(motion.div)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors?.primary || '#3b82f6'};
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.2 }
  },
  exit: { 
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.5 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const spinVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 1, ease: "linear", repeat: Infinity }
  }
};

const dotVariants = {
  animate: (index) => ({
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: Infinity,
      delay: index * 0.1
    }
  })
};

const LoadingScreen = ({ isLoading, progress = 0, loadingText = "Loading..." }) => {
  const { theme, isDark } = useTheme();
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);

    return () => clearTimeout(timer);
  }, [progress]);

  if (!isLoading) return null;

  return (
    <LoadingContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      theme={theme}
      isDark={isDark}
    >
      <LoadingContent>
        <LoadingTitle variants={itemVariants} theme={theme}>
          Portfolio
        </LoadingTitle>
        
        <LoadingSubtitle variants={itemVariants} theme={theme} isDark={isDark}>
          {loadingText}
        </LoadingSubtitle>

        <motion.div variants={itemVariants}>
          <ProgressContainer theme={theme} isDark={isDark}>
            <ProgressBar
              theme={theme}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: displayProgress / 100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </ProgressContainer>
          
          <ProgressText theme={theme} isDark={isDark}>
            {Math.round(displayProgress)}%
          </ProgressText>
        </motion.div>

        <LoadingSpinner
          variants={spinVariants}
          animate="animate"
          theme={theme}
          isDark={isDark}
        />

        <DotsContainer>
          {[0, 1, 2].map((index) => (
            <Dot
              key={index}
              variants={dotVariants}
              animate="animate"
              custom={index}
              theme={theme}
            />
          ))}
        </DotsContainer>
      </LoadingContent>
    </LoadingContainer>
  );
};

// Hook for managing loading state
export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
  };

  const updateProgress = (newProgress, text) => {
    setProgress(newProgress);
    if (text) setLoadingText(text);
  };

  const finishLoading = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Simulate realistic loading progression
  useEffect(() => {
    if (!isLoading) return;

    const loadingSteps = [
      { progress: 20, text: "Loading assets...", delay: 300 },
      { progress: 40, text: "Preparing components...", delay: 500 },
      { progress: 60, text: "Initializing animations...", delay: 400 },
      { progress: 80, text: "Finalizing setup...", delay: 300 },
      { progress: 100, text: "Ready!", delay: 200 },
    ];

    let stepIndex = 0;
    
    const executeStep = () => {
      if (stepIndex < loadingSteps.length) {
        const step = loadingSteps[stepIndex];
        setTimeout(() => {
          updateProgress(step.progress, step.text);
          stepIndex++;
          if (stepIndex < loadingSteps.length) {
            executeStep();
          } else {
            setTimeout(() => finishLoading(), 500);
          }
        }, step.delay);
      }
    };

    executeStep();
  }, [isLoading]);

  return {
    isLoading,
    progress,
    loadingText,
    startLoading,
    updateProgress,
    finishLoading
  };
};

export default LoadingScreen;
