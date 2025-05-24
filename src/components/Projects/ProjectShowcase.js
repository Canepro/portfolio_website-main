import React from 'react';
import styled from 'styled-components';

const ProjectsSection = styled.section`
  padding: 100px 0;
  background: ${({ theme }) => theme.colors.background1};
`;

const AboutTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 4px;
    background: ${({ theme }) => theme.colors.accent1};
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  transition: transform 0.3s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  padding: 20px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 10px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  margin: 0 0 15px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.accent1}33;
  color: ${({ theme }) => theme.colors.accent1};
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.875rem;
`;

const projectsWithImages = [
  {
    title: "Azure Cloud Infrastructure",
    description: "Designed and implemented scalable cloud infrastructure solutions using Azure services. Automated deployment processes and optimized resource utilization for enterprise workloads.",
    technologies: ["Azure", "ARM Templates", "PowerShell", "Azure DevOps", "Monitoring"],
    image: "https://picsum.photos/600/300?random=200",
    fallback: "https://via.placeholder.com/600x300/1a202c/0078d4?text=Azure+Cloud"
  },
  {
    title: "CI/CD Pipeline Automation",
    description: "Built comprehensive continuous integration and deployment pipelines using modern DevOps tools. Reduced deployment time and improved code quality through automated testing.",
    technologies: ["Jenkins", "Azure DevOps", "Docker", "Git", "YAML"],
    image: "https://picsum.photos/600/300?random=300",
    fallback: "https://via.placeholder.com/600x300/1a202c/10B981?text=CI%2FCD+Pipeline"
  },
  {
    title: "Container Orchestration",
    description: "Implemented containerization strategies and orchestrated applications using Kubernetes. Managed microservices architecture with automated scaling and monitoring.",
    technologies: ["Docker", "Kubernetes", "Helm", "Prometheus", "Grafana"],
    image: "https://picsum.photos/600/300?random=400",
    fallback: "https://via.placeholder.com/600x300/1a202c/326ce5?text=Kubernetes"
  }
];

const ProjectShowcase = () => {
  return (
    <ProjectsSection id="projects" aria-labelledby="projects-title">
      <AboutTitle id="projects-title">Featured DevOps Projects</AboutTitle>
      <ProjectGrid>
        {projectsWithImages.map((project, index) => (
          <ProjectCard key={project.title}>
            <ProjectImage 
              src={project.image} 
              alt={project.title}
              loading="lazy"
              onError={(e) => {
                e.target.src = project.fallback;
              }}
            />
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.technologies.map((tech) => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </TechStack>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectsSection>
  );
};

export default ProjectShowcase;