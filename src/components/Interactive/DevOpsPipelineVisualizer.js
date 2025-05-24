import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

const flowAnimation = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
`;

const VisualizerContainer = styled.div`
  width: 100%;
  min-height: 500px;
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  position: relative;
  overflow: hidden;
  margin: 40px 0;
  padding: 60px 20px 40px;
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button`
  background: ${({ theme, active }) => active ? theme.colors.accent1 : theme.colors.background1};
  color: ${({ theme, active }) => active ? 'white' : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.accent1};
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent1};
    color: white;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PipelineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const StageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const StageIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ color, isActive, isCompleted }) => 
    isActive ? color : isCompleted ? color : `${color}44`
  };
  border: 3px solid ${({ color, isActive, isCompleted }) => 
    isActive || isCompleted ? color : `${color}66`
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  transition: all 0.3s ease;
  animation: ${({ isActive }) => isActive ? pulseAnimation : 'none'} 2s infinite;
  box-shadow: ${({ isActive, color }) => 
    isActive ? `0 0 30px ${color}66` : 'none'
  };
`;

const StageName = styled.div`
  margin-top: 15px;
  font-weight: 600;
  color: ${({ theme, isActive, isCompleted }) => 
    isActive || isCompleted ? theme.colors.accent1 : theme.colors.text
  };
  font-size: 1rem;
  text-align: center;
`;

const ConnectionLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: ${({ theme }) => theme.colors.accent1}33;
  z-index: 1;
  margin-top: -2px;
`;

const FlowParticle = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ startPosition }) => startPosition}%;
  width: 8px;
  height: 8px;
  background: ${({ color }) => color};
  border-radius: 50%;
  margin-top: -4px;
  animation: ${flowAnimation} 2s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
  box-shadow: 0 0 10px ${({ color }) => color};
  opacity: ${({ isActive }) => isActive ? 1 : 0};
`;

const StatusDisplay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: ${({ theme }) => theme.colors.background1}ee;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.accent1}44;
  border-radius: 10px;
  padding: 15px;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  min-width: 250px;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 50px;
  left: 20px;
  right: 20px;
  height: 4px;
  background: ${({ theme }) => theme.colors.background1}44;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #10B981, #F59E0B, #8B5CF6, #EF4444);
  border-radius: 2px;
  transition: width 0.5s ease;
  width: ${props => props.progress}%;
`;

const DevOpsPipelineVisualizer = () => {
  const [activeStage, setActiveStage] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [completedStages, setCompletedStages] = useState(new Set());

  const stages = [
    { 
      name: 'Source', 
      color: '#3B82F6', 
      icon: '📝', 
      status: 'Pulling latest code from repository...',
      description: 'Git checkout and source validation'
    },
    { 
      name: 'Build', 
      color: '#10B981', 
      icon: '🔨', 
      status: 'Compiling application and dependencies...',
      description: 'NPM install and webpack build'
    },
    { 
      name: 'Test', 
      color: '#F59E0B', 
      icon: '🧪', 
      status: 'Running automated test suite...',
      description: 'Unit tests, integration tests, coverage'
    },
    { 
      name: 'Deploy', 
      color: '#8B5CF6', 
      icon: '🚀', 
      status: 'Deploying to staging environment...',
      description: 'Container deployment and configuration'
    },
    { 
      name: 'Monitor', 
      color: '#EF4444', 
      icon: '📊', 
      status: 'Monitoring application health...',
      description: 'Performance metrics and alerting'
    }
  ];

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setActiveStage((prev) => {
          const next = prev + 1;
          if (next >= stages.length) {
            setIsRunning(false);
            setCompletedStages(new Set(Array.from({ length: stages.length }, (_, i) => i)));
            return -1;
          }
          if (prev >= 0) {
            setCompletedStages(prevCompleted => new Set([...prevCompleted, prev]));
          }
          return next;
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isRunning, stages.length]);

  const resetPipeline = () => {
    setActiveStage(-1);
    setCompletedStages(new Set());
    setIsRunning(false);
  };

  const currentStageData = activeStage >= 0 ? stages[activeStage] : null;
  const progress = isRunning ? ((activeStage + 1) / stages.length) * 100 : completedStages.size > 0 ? 100 : 0;

  return (
    <VisualizerContainer>
      <ControlPanel>
        <ControlButton 
          active={isRunning} 
          onClick={() => setIsRunning(!isRunning)}
          disabled={isRunning}
        >
          {isRunning ? 'Pipeline Running...' : 'Deploy Application'}
        </ControlButton>
        <ControlButton onClick={resetPipeline}>
          Reset Pipeline
        </ControlButton>
      </ControlPanel>

      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>

      <PipelineContainer>
        <ConnectionLine />
        
        {/* Flow particles */}
        {isRunning && stages.slice(0, -1).map((stage, index) => (
          index < activeStage && (
            <React.Fragment key={`particles-${index}`}>
              {[0, 0.5, 1].map((delay, particleIndex) => (
                <FlowParticle
                  key={`${index}-${particleIndex}`}
                  startPosition={(index / (stages.length - 1)) * 100}
                  color={stage.color}
                  delay={delay}
                  isActive={true}
                />
              ))}
            </React.Fragment>
          )
        ))}

        {stages.map((stage, index) => (
          <StageContainer key={stage.name}>
            <StageIcon
              color={stage.color}
              isActive={index === activeStage}
              isCompleted={completedStages.has(index)}
            >
              {stage.icon}
            </StageIcon>
            <StageName
              isActive={index === activeStage}
              isCompleted={completedStages.has(index)}
            >
              {stage.name}
            </StageName>
          </StageContainer>
        ))}
      </PipelineContainer>

      {currentStageData && (
        <StatusDisplay>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: currentStageData.color }}>
            {currentStageData.icon} {currentStageData.name} Stage Active
          </div>
          <div style={{ marginBottom: '5px' }}>
            {currentStageData.status}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            {currentStageData.description}
          </div>
        </StatusDisplay>
      )}

      {!isRunning && completedStages.size === stages.length && (
        <StatusDisplay>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#10B981' }}>
            ✅ Deployment Successful
          </div>
          <div style={{ marginBottom: '5px' }}>
            Application deployed to production environment
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            All pipeline stages completed successfully
          </div>
        </StatusDisplay>
      )}
    </VisualizerContainer>
  );
};

export default DevOpsPipelineVisualizer;
