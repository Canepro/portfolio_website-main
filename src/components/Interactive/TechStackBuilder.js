import React, { useState } from 'react';
import styled from 'styled-components';

const BuilderContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  padding: 30px;
  margin: 40px 0;
`;

const StackSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h4`
  color: ${({ theme }) => theme.colors.accent1};
  margin-bottom: 15px;
  font-size: 1.1rem;
`;

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const TechCard = styled.div`
  background: ${({ theme, selected }) => selected ? theme.colors.accent1 : theme.colors.background1};
  color: ${({ theme, selected }) => selected ? 'white' : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.accent1}44;
  border-radius: 10px;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent1};
    color: white;
    transform: translateY(-2px);
  }
`;

const StackPreview = styled.div`
  background: ${({ theme }) => theme.colors.background1};
  border-radius: 15px;
  padding: 25px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  margin-top: 30px;
`;

const StackLayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent1}22;
  
  &:last-child {
    border-bottom: none;
  }
`;

const LayerName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent1};
  min-width: 120px;
`;

const LayerTechs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
`;

const LayerTech = styled.span`
  background: ${({ theme }) => theme.colors.accent1}22;
  color: ${({ theme }) => theme.colors.accent1};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
`;

const TechStackBuilder = () => {
  const [selectedStack, setSelectedStack] = useState({
    frontend: [],
    backend: [],
    database: [],
    devops: [],
    cloud: []
  });

  const techCategories = {
    frontend: ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'Go', 'Java', 'C#', '.NET Core', 'Express.js'],
    database: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch', 'DynamoDB'],
    devops: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Terraform'],
    cloud: ['Azure', 'AWS', 'Google Cloud', 'Vercel', 'Netlify', 'DigitalOcean']
  };

  const toggleTech = (category, tech) => {
    setSelectedStack(prev => ({
      ...prev,
      [category]: prev[category].includes(tech)
        ? prev[category].filter(t => t !== tech)
        : [...prev[category], tech]
    }));
  };

  const clearStack = () => {
    setSelectedStack({
      frontend: [],
      backend: [],
      database: [],
      devops: [],
      cloud: []
    });
  };

  const loadPreset = (preset) => {
    const presets = {
      modern: {
        frontend: ['React', 'Next.js', 'TypeScript'],
        backend: ['Node.js', 'Python'],
        database: ['PostgreSQL', 'Redis'],
        devops: ['Docker', 'Kubernetes', 'GitHub Actions'],
        cloud: ['Azure', 'Vercel']
      },
      enterprise: {
        frontend: ['Angular', 'TypeScript'],
        backend: ['Java', 'C#', '.NET Core'],
        database: ['PostgreSQL', 'MongoDB'],
        devops: ['Jenkins', 'Terraform', 'Docker'],
        cloud: ['AWS', 'Azure']
      }
    };
    setSelectedStack(presets[preset]);
  };

  return (
    <BuilderContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Interactive Tech Stack Builder</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => loadPreset('modern')}
            style={{
              background: 'transparent',
              border: '2px solid #3B82F6',
              color: '#3B82F6',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Load Modern Stack
          </button>
          <button
            onClick={() => loadPreset('enterprise')}
            style={{
              background: 'transparent',
              border: '2px solid #10B981',
              color: '#10B981',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Load Enterprise Stack
          </button>
          <button
            onClick={clearStack}
            style={{
              background: 'transparent',
              border: '2px solid #EF4444',
              color: '#EF4444',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      {Object.entries(techCategories).map(([category, techs]) => (
        <StackSection key={category}>
          <SectionTitle>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </SectionTitle>
          <TechGrid>
            {techs.map(tech => (
              <TechCard
                key={tech}
                selected={selectedStack[category].includes(tech)}
                onClick={() => toggleTech(category, tech)}
              >
                {tech}
              </TechCard>
            ))}
          </TechGrid>
        </StackSection>
      ))}

      <StackPreview>
        <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>Your Custom Tech Stack</h4>
        {Object.entries(selectedStack).map(([category, techs]) => (
          <StackLayer key={category}>
            <LayerName>
              {category.charAt(0).toUpperCase() + category.slice(1)}:
            </LayerName>
            <LayerTechs>
              {techs.length > 0 ? (
                techs.map(tech => (
                  <LayerTech key={tech}>{tech}</LayerTech>
                ))
              ) : (
                <span style={{ fontStyle: 'italic', opacity: 0.6 }}>
                  No technologies selected
                </span>
              )}
            </LayerTechs>
          </StackLayer>
        ))}
      </StackPreview>
    </BuilderContainer>
  );
};

export default TechStackBuilder;
