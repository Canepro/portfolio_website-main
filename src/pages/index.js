import React from 'react';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';
import Three3DBackground from '../components/3D/Three3DBackground';
import ChatBot from '../components/AI/ChatBot';
import ModernContact from '../components/Contact/ModernContact';
import TypewriterEffect from '../components/Animations/TypewriterEffect';
import AnimatedCounter from '../components/Animations/AnimatedCounter';
import styled from 'styled-components';

const HeroSection = styled.section`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background1}00, ${({ theme }) => theme.colors.background2}44);
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text}aa;
  margin-top: 20px;
  max-width: 600px;
`;

const AboutSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
  text-align: center;
  background: ${({ theme }) => theme.colors.background1};
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent1}, ${({ theme }) => theme.colors.button});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const TechnologiesSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background2}, ${({ theme }) => theme.colors.background1}22);
  padding: 100px 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent1}, transparent);
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 50px auto 0;
`;

const TechCard = styled.div`
  background: ${({ theme }) => theme.colors.background1};
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.accent1};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
  background: ${({ theme }) => theme.colors.background1};
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 50px;
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

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px;
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background2}66, ${({ theme }) => theme.colors.background1}44);
  border-radius: 20px;
  margin-bottom: 50px;
  border: 1px solid ${({ theme }) => theme.colors.accent1}22;
`;

export default function HomePage() {
  const technologies = [
    { name: "Azure", icon: "☁️" },
    { name: "AWS", icon: "🔶" },
    { name: "Docker", icon: "🐳" },
    { name: "Kubernetes", icon: "⚙️" },
    { name: "Terraform", icon: "🏗️" },
    { name: "Jenkins", icon: "🔧" },
    { name: "Git/GitHub", icon: "🔀" },
    { name: "Linux", icon: "🐧" },
  ];

  const projects = [
    {
      title: "Cloud Infrastructure Automation",
      description: "Designed and implemented scalable cloud infrastructure using Terraform and Azure Resource Manager. Automated deployment pipelines with 99.9% uptime and reduced infrastructure costs by 30%.",
      technologies: ["Azure", "Terraform", "ARM Templates", "PowerShell", "Azure DevOps"]
    },
    {
      title: "CI/CD Pipeline Optimization",
      description: "Built comprehensive CI/CD pipelines using Azure DevOps and Jenkins. Reduced deployment time from hours to minutes and implemented automated testing and security scanning.",
      technologies: ["Azure DevOps", "Jenkins", "Docker", "SonarQube", "YAML"]
    },
    {
      title: "Container Orchestration Platform",
      description: "Deployed and managed Kubernetes clusters on Azure AKS. Implemented monitoring, logging, and auto-scaling for containerized applications serving millions of users.",
      technologies: ["Kubernetes", "Azure AKS", "Helm", "Prometheus", "Grafana"]
    }
  ];

  return (
    <Layout>
      <Three3DBackground />
      <ChatBot />
      
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection>
          <TypewriterEffect 
            texts={[
              "DevOps Engineer", 
              "Cloud Architect", 
              "Infrastructure Automation",
              "CI/CD Specialist"
            ]}
            size="2.8rem"
            speed={100}
            deleteSpeed={50}
            pauseTime={2000}
          />
          <HeroSubtitle>
            Building scalable cloud infrastructure and automating deployment pipelines
          </HeroSubtitle>
        </HeroSection>

        <AboutSection>
          <AboutTitle>About Me</AboutTitle>
          <AboutText>
            I'm Vincent, a passionate DevOps/Cloud Engineer specializing in Azure cloud services, 
            infrastructure automation, and CI/CD pipeline optimization. I love creating robust, 
            scalable cloud solutions that enable teams to deploy faster and more reliably.
          </AboutText>
          <AboutText>
            With extensive experience in cloud platforms, containerization, and infrastructure as code, 
            I help organizations modernize their deployment processes and achieve operational excellence 
            through automation and best practices.
          </AboutText>
        </AboutSection>

        <TechnologiesSection>
          <AboutTitle style={{ color: 'inherit' }}>Technologies I Work With</AboutTitle>
          <TechGrid>
            {technologies.map((tech, index) => (
              <TechCard key={tech.name}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{tech.icon}</div>
                <h3 style={{ color: 'inherit', margin: 0 }}>{tech.name}</h3>
              </TechCard>
            ))}
          </TechGrid>
        </TechnologiesSection>

        <ProjectsSection>
          <AboutTitle>Featured Projects</AboutTitle>
          <ProjectGrid>
            {projects.map((project, index) => (
              <ProjectCard key={project.title}>
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

        <StatsSection>
          <AnimatedCounter 
            end={25} 
            label="Cloud Projects Deployed" 
            suffix="+"
            duration={2500}
          />
          <AnimatedCounter 
            end={5} 
            label="Years Experience" 
            suffix="+"
            duration={2000}
          />
          <AnimatedCounter 
            end={15} 
            label="Technologies Mastered" 
            suffix="+"
            duration={3000}
          />
          <AnimatedCounter 
            end={99} 
            label="Infrastructure Uptime" 
            suffix="%"
            duration={2800}
          />
        </StatsSection>

        <ModernContact />
      </main>
    </Layout>
  );
};

