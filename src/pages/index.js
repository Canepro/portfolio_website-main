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
  height: 60vh; /* Reduced from 100vh */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
`;

const AboutSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  text-align: center;
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
  background: ${({ theme }) => theme.colors.background2};
  padding: 80px 20px;
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
  padding: 80px 20px;
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

export default function HomePage() {
  const technologies = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "🔺" },
    { name: "Node.js", icon: "🟢" },
    { name: "Python", icon: "🐍" },
    { name: "JavaScript", icon: "🟨" },
    { name: "TypeScript", icon: "🔷" },
    { name: "Three.js", icon: "🎲" },
    { name: "AI/ML", icon: "🤖" },
  ];

  const projects = [
    {
      title: "Modern Portfolio Website",
      description: "A cutting-edge portfolio featuring 3D graphics, AI chatbot, and advanced animations. Built with Next.js, Three.js, and modern web technologies.",
      technologies: ["Next.js", "Three.js", "React", "GSAP", "Styled Components"]
    },
    {
      title: "AI-Powered Dashboard",
      description: "Interactive dashboard with machine learning insights, real-time data visualization, and intelligent recommendations for business analytics.",
      technologies: ["React", "Python", "TensorFlow", "D3.js", "FastAPI"]
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, inventory management, and customer analytics. Optimized for performance and SEO.",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redis"]
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
              "Full Stack Developer", 
              "AI Enthusiast", 
              "3D Graphics Explorer",
              "Modern Web Architect"
            ]}
            size="2.5rem" /* Reduced size */
            speed={100}
            deleteSpeed={50}
            pauseTime={2000}
          />
        </HeroSection>

        <AboutSection>
          <AboutTitle>About Me</AboutTitle>
          <AboutText>
            I'm Vincent, a passionate full-stack developer with expertise in modern web technologies, 
            AI integration, and 3D graphics. I love creating innovative digital experiences that 
            combine cutting-edge technology with intuitive design. My journey spans from building 
            scalable web applications to exploring the frontiers of artificial intelligence and 
            immersive 3D environments.
          </AboutText>
          <AboutText>
            With a strong foundation in both frontend and backend development, I specialize in 
            React ecosystem, Node.js, Python, and emerging technologies like WebGL and machine learning. 
            I'm always eager to tackle complex challenges and turn creative ideas into reality.
          </AboutText>
        </AboutSection>

        <TechnologiesSection>
          <AboutTitle>Technologies I Work With</AboutTitle>
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
            end={50} 
            label="Projects Completed" 
            suffix="+"
            duration={2500}
          />
          <AnimatedCounter 
            end={3} 
            label="Years Experience" 
            suffix="+"
            duration={2000}
          />
          <AnimatedCounter 
            end={25} 
            label="Technologies Mastered" 
            suffix="+"
            duration={3000}
          />
          <AnimatedCounter 
            end={100} 
            label="Client Satisfaction" 
            suffix="%"
            duration={2800}
          />
        </StatsSection>

        <ModernContact />
      </main>
    </Layout>
  );
};

