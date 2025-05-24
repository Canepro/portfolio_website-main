import React from 'react';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import DevOpsPipelineVisualizer from '../components/Interactive/DevOpsPipelineVisualizer';
import InfrastructureTopology from '../components/Interactive/InfrastructureTopology';
import LiveMetricsDashboard from '../components/Interactive/LiveMetricsDashboard';
import TechStackBuilder from '../components/Interactive/TechStackBuilder';
import ImageGallery from '../components/UI/ImageGallery';
import NeuralNetworkVisualizer from '../components/Advanced/NeuralNetworkVisualizer';
import { NextSeo } from 'next-seo';

const ProjectsContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 60px;
`;

const ProjectsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ProjectsTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent1}, #EF4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin: 60px 0;
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.accent1};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  padding: 30px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.accent1};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.accent1}22;
  color: ${({ theme }) => theme.colors.accent1};
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Projects = () => {
  const projectData = [
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

  return (
    <>
      <NextSeo
        title="Projects - Vincent Mogah DevOps Portfolio"
        description="Explore Vincent Mogah's DevOps projects including cloud infrastructure, CI/CD pipelines, and container orchestration implementations."
      />
      
      <NeuralNetworkVisualizer />
      <Header />
      
      <ProjectsContainer>
        <ProjectsSection>
          <ProjectsTitle>DEVOPS PROJECTS</ProjectsTitle>
          
          <ProjectGrid>
            {projectData.map((project, index) => (
              <ProjectCard key={index}>
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

          <div style={{ margin: '80px 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>
              Interactive Demonstrations
            </h2>
            
            <div style={{ marginBottom: '60px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>CI/CD Pipeline Visualization</h3>
              <DevOpsPipelineVisualizer />
            </div>

            <div style={{ marginBottom: '60px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Infrastructure Topology</h3>
              <InfrastructureTopology />
            </div>

            <div style={{ marginBottom: '60px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Live Metrics Dashboard</h3>
              <LiveMetricsDashboard />
            </div>

            <div style={{ marginBottom: '60px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Tech Stack Builder</h3>
              <TechStackBuilder />
            </div>
          </div>

          <ImageGallery />
        </ProjectsSection>
      </ProjectsContainer>
      
      <Footer />
    </>
  );
};

export default Projects;
