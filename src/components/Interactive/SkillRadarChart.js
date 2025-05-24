import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const RadarContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 500px;
  position: relative;
  margin: 0 auto;
`;

const RadarSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const SkillButton = styled(motion.button)`
  position: absolute;
  background: ${({ theme, active }) => active ? theme.colors.accent1 : theme.colors.background2};
  color: ${({ theme, active }) => active ? 'white' : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.accent1};
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent1};
    color: white;
  }
`;

const SkillRadarChart = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  const skills = [
    { name: 'Azure', level: 95, color: '#0078d4', position: { top: '10%', left: '45%' } },
    { name: 'Docker', level: 90, color: '#2496ed', position: { top: '20%', right: '15%' } },
    { name: 'Kubernetes', level: 85, color: '#326ce5', position: { top: '45%', right: '5%' } },
    { name: 'Terraform', level: 88, color: '#623ce4', position: { bottom: '30%', right: '10%' } },
    { name: 'Jenkins', level: 82, color: '#d33833', position: { bottom: '15%', left: '40%' } },
    { name: 'Python', level: 87, color: '#3776ab', position: { bottom: '20%', left: '15%' } },
    { name: 'AWS', level: 80, color: '#ff9900', position: { top: '40%', left: '5%' } },
    { name: 'Linux', level: 92, color: '#fcc624', position: { top: '25%', left: '20%' } }
  ];

  const centerX = 250;
  const centerY = 250;
  const maxRadius = 200;

  const createRadarPath = (levels) => {
    const angleStep = (2 * Math.PI) / skills.length;
    let path = '';
    
    skills.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const radius = (levels[index] / 100) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path + ' Z';
  };

  const skillLevels = skills.map(skill => skill.level);
  const radarPath = createRadarPath(skillLevels);

  return (
    <RadarContainer>
      {skills.map((skill, index) => (
        <SkillButton
          key={skill.name}
          style={skill.position}
          active={selectedSkill === index}
          onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {skill.name}
        </SkillButton>
      ))}
      
      <RadarSvg viewBox="0 0 500 500">
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map((level) => (
          <circle
            key={level}
            cx={centerX}
            cy={centerY}
            r={(level / 100) * maxRadius}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines */}
        {skills.map((_, index) => {
          const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
          const x = centerX + maxRadius * Math.cos(angle);
          const y = centerY + maxRadius * Math.sin(angle);
          
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Skill area */}
        <motion.path
          d={radarPath}
          fill="url(#radarGradient)"
          stroke="#3B82F6"
          strokeWidth="2"
          fillOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Gradient definition */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        
        {/* Skill points */}
        {skills.map((skill, index) => {
          const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
          const radius = (skill.level / 100) * maxRadius;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          return (
            <motion.circle
              key={skill.name}
              cx={x}
              cy={y}
              r={selectedSkill === index ? "8" : "5"}
              fill={skill.color}
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
            />
          );
        })}
      </RadarSvg>
    </RadarContainer>
  );
};

export default SkillRadarChart;
