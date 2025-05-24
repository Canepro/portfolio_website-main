import React, { useEffect, useState } from 'react';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';
import Three3DBackground from '../components/3D/Three3DBackground';
import ChatBot from '../components/AI/ChatBot';
import ModernContact from '../components/Contact/ModernContact';
import TypewriterEffect from '../components/Animations/TypewriterEffect';
import AnimatedCounter from '../components/Animations/AnimatedCounter';
import styled from 'styled-components';
import InstallPrompt from '../components/PWA/InstallPrompt';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import DevOpsPipelineVisualizer from '../components/Interactive/DevOpsPipelineVisualizer';
import InfrastructureTopology from '../components/Interactive/InfrastructureTopology';
import SkillRadarChart from '../components/Interactive/SkillRadarChart';
import LiveMetricsDashboard from '../components/Interactive/LiveMetricsDashboard';
import TechStackBuilder from '../components/Interactive/TechStackBuilder';
import NeuralNetworkVisualizer from '../components/Advanced/NeuralNetworkVisualizer';
import HolographicInterface from '../components/Advanced/HolographicInterface';
import QuantumLoader from '../components/Advanced/QuantumLoader';
import ImageGallery from '../components/UI/ImageGallery';
import HeroImageSection from '../components/UI/HeroImageSection';

const HeroSection = styled.section`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      url('https://picsum.photos/1920/1080?random=1&blur=2') center/cover,
      radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, rgba(239, 68, 68, 0.08) 0%, transparent 50%);
    opacity: 0.3;
    pointer-events: none;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
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
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80') center/cover;
    opacity: 0.1;
    border-radius: 20px;
    filter: blur(2px);
  }
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
  text-align: center; /* Center the title */
  
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

const InteractiveSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
  text-align: center;
`;

// Add a hero image overlay
const HeroImageOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: url('https://via.placeholder.com/300x300/1a202c/3B82F6?text=CANEPRO') center/contain no-repeat;
  opacity: 0.1;
  z-index: 0;
  border-radius: 50%;
  filter: blur(1px);
`;

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const technologies = [
    { name: "Azure", icon: "☁️" },
    { name: "AWS", icon: "🔶" },
    { name: "Docker", icon: "🐳" },
    { name: "Kubernetes", icon: "⚙️" },
    { name: "Terraform", icon: "🏗️" },
    { name: "Jenkins", icon: "🔧" },
    { name: "Python", icon: "🐍" },
    { name: "Linux", icon: "🐧" },
  ];

  const projects = [
    {
      title: "Azure Cloud Infrastructure",
      description: "Designed and implemented scalable cloud infrastructure solutions using Azure services. Automated deployment processes and optimized resource utilization for enterprise workloads.",
      technologies: ["Azure", "ARM Templates", "PowerShell", "Azure DevOps", "Monitoring"]
    },
    {
      title: "CI/CD Pipeline Automation",
      description: "Built comprehensive continuous integration and deployment pipelines using modern DevOps tools. Reduced deployment time and improved code quality through automated testing.",
      technologies: ["Jenkins", "Azure DevOps", "Docker", "Git", "YAML"]
    },
    {
      title: "Container Orchestration",
      description: "Implemented containerization strategies and orchestrated applications using Kubernetes. Managed microservices architecture with automated scaling and monitoring.",
      technologies: ["Docker", "Kubernetes", "Helm", "Prometheus", "Grafana"]
    }
  ];

  useEffect(() => {
    // Simulate advanced loading sequence
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => setIsLoading(false), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(loadingInterval);
  }, []);

  return (
    <>
      <QuantumLoader show={isLoading} progress={loadingProgress} />
      <NeuralNetworkVisualizer />
      <Three3DBackground />
      <ChatBot />
      <Header />
      
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }} role="main">
        <HeroSection id="home">
          <HeroImageOverlay />
          <TypewriterEffect 
            texts={[
              "QUANTUM DEVOPS ENGINEER", 
              "NEURAL CLOUD ARCHITECT", 
              "AI INFRASTRUCTURE PIONEER",
              "DIGITAL REALITY SHAPER"
            ]}
            size="2.8rem"
            speed={100}
            deleteSpeed={50}
            pauseTime={2000}
          />
          <HeroSubtitle>
            Engineering the impossible • Quantum-powered infrastructure • Neural-optimized deployments
          </HeroSubtitle>
        </HeroSection>

        <TechnologiesSection id="technologies" aria-labelledby="tech-title">
          <AboutTitle id="tech-title">Core Technologies & Tools</AboutTitle>
          <TechGrid>
            {technologies.map((tech, index) => (
              <TechCard key={tech.name}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{tech.icon}</div>
                <h3 style={{ color: 'inherit', margin: 0 }}>{tech.name}</h3>
              </TechCard>
            ))}
          </TechGrid>
          
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ marginBottom: '30px', fontSize: '1.5rem' }}>Interactive Skill Assessment</h3>
            <SkillRadarChart />
          </div>
        </TechnologiesSection>

        <StatsSection aria-labelledby="stats-title">
          <h2 id="stats-title" style={{ gridColumn: '1 / -1', textAlign: 'center', marginBottom: '20px' }}>
            Professional Metrics
          </h2>
          <AnimatedCounter 
            end={20} 
            label="Infrastructure Projects" 
            suffix="+"
            duration={2500}
          />
          <AnimatedCounter 
            end={3} 
            label="Years DevOps Experience" 
            suffix="+"
            duration={2000}
          />
          <AnimatedCounter 
            end={12} 
            label="Technologies Mastered" 
            suffix="+"
            duration={3000}
          />
          <AnimatedCounter 
            end={99} 
            label="System Uptime" 
            suffix=".9%"
            duration={2800}
          />
        </StatsSection>
      </main>
      <Footer />
    </>
  );
}

