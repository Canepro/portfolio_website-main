import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

// Styled Components
const ToggleContainer = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  cursor: pointer;
  
  @media ${({ theme }) => theme.breakpoints.sm} {
    top: 1rem;
    right: 1rem;
  }
`;

const ToggleButton = styled(motion.button)`
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
  };
  border: 2px solid ${({ theme, isDark }) => 
    isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(15, 23, 42, 0.1)'
  };
  border-radius: 50px;
  width: 70px;
  height: 35px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme, isDark }) => 
    isDark 
      ? '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
      : '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
  };

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme, isDark }) => 
      isDark 
        ? '0 12px 40px 0 rgba(0, 0, 0, 0.6)'
        : '0 12px 40px 0 rgba(31, 38, 135, 0.3)'
    };
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ToggleCircle = styled(motion.div)`
  position: absolute;
  top: 3px;
  left: ${({ isDark }) => isDark ? '37px' : '3px'};
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
      : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
  };
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &::before {
    content: '${({ isDark }) => isDark ? '🌙' : '☀️'}';
    font-size: 14px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }
`;

const TooltipContainer = styled(motion.div)`
  position: absolute;
  bottom: -45px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(15, 23, 42, 0.9)'
      : 'rgba(255, 255, 255, 0.9)'
  };
  color: ${({ theme, isDark }) => 
    isDark ? theme.colors.text.primary : theme.colors.text.primary
  };
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme, isDark }) => 
    isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(15, 23, 42, 0.1)'
  };
  white-space: nowrap;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${({ theme, isDark }) => 
      isDark 
        ? 'rgba(15, 23, 42, 0.9)'
        : 'rgba(255, 255, 255, 0.9)'
    };
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const tooltipVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const ThemeToggle = () => {
  const { isDark, toggleTheme, theme } = useTheme();
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <ToggleContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <ToggleButton
        onClick={toggleTheme}
        isDark={isDark}
        theme={theme}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        role="switch"
        aria-checked={isDark}
      >
        <ToggleCircle
          isDark={isDark}
          theme={theme}
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </ToggleButton>
      
      {showTooltip && (
        <TooltipContainer
          variants={tooltipVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          isDark={isDark}
          theme={theme}
        >
          Switch to {isDark ? 'light' : 'dark'} mode
        </TooltipContainer>
      )}
    </ToggleContainer>
  );
};

export default ThemeToggle;
