import React from 'react';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import HolographicInterface from '../components/Advanced/HolographicInterface';
import NeuralNetworkVisualizer from '../components/Advanced/NeuralNetworkVisualizer';
import { NextSeo } from 'next-seo';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 60px;
`;

const AboutSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const AboutTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent1}, #EF4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin: 60px 0;
`;

const SkillCategory = styled.div`
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 20px;
  padding: 30px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
`;

const CategoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.accent1};
  margin-bottom: 20px;
  font-size: 1.3rem;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  
  &::before {
    content: '▶';
    color: ${({ theme }) => theme.colors.accent1};
    margin-right: 10px;
  }
`;

const About = () => {
  const skillCategories = [
    {
      title: "Cloud Platforms",
      skills: ["Microsoft Azure", "Amazon Web Services (AWS)", "Google Cloud Platform", "DigitalOcean", "Vercel", "Netlify"]
    },
    {
      title: "Container & Orchestration",
      skills: ["Docker", "Kubernetes", "Docker Compose", "Helm Charts", "Container Registry", "Service Mesh"]
    },
    {
      title: "Infrastructure as Code",
      skills: ["Terraform", "ARM Templates", "CloudFormation", "Ansible", "Pulumi", "Bicep"]
    },
    {
      title: "CI/CD & Automation",
      skills: ["Azure DevOps", "Jenkins", "GitHub Actions", "GitLab CI", "CircleCI", "ArgoCD"]
    },
    {
      title: "Monitoring & Observability",
      skills: ["Prometheus", "Grafana", "Azure Monitor", "Datadog", "New Relic", "ELK Stack"]
    },
    {
      title: "Programming & Scripting",
      skills: ["Python", "PowerShell", "Bash", "YAML", "JSON", "Go"]
    }
  ];

  return (
    <>
      <NextSeo
        title="About Vincent Mogah - DevOps Engineer"
        description="Learn about Vincent Mogah's journey as a DevOps Engineer specializing in cloud infrastructure, automation, and modern deployment practices."
      />
      
      <NeuralNetworkVisualizer />
      <Header />
      
      <AboutContainer>
        <AboutSection>
          <AboutTitle>ABOUT VINCENT MOGAH</AboutTitle>
          
          <HolographicInterface title="PROFESSIONAL PROFILE">
            I'm Vincent Mogah, a passionate DevOps Engineer with extensive experience in cloud 
            infrastructure, automation, and modern deployment practices. My journey in technology 
            began with a fascination for solving complex problems and optimizing systems for 
            maximum efficiency and reliability.
            
            <br /><br />
            
            With expertise spanning multiple cloud platforms and a deep understanding of 
            containerization technologies, I specialize in designing and implementing scalable, 
            secure, and cost-effective infrastructure solutions that enable teams to deploy 
            faster and more reliably.
          </HolographicInterface>

          <HolographicInterface title="MISSION STATEMENT">
            My mission is to bridge the gap between development and operations through innovative 
            automation, robust infrastructure design, and continuous improvement practices. 
            I believe in creating systems that not only meet today's requirements but are 
            adaptable enough to evolve with future needs.
          </HolographicInterface>

          <SkillsGrid>
            {skillCategories.map((category, index) => (
              <SkillCategory key={index}>
                <CategoryTitle>{category.title}</CategoryTitle>
                <SkillList>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillItem key={skillIndex}>{skill}</SkillItem>
                  ))}
                </SkillList>
              </SkillCategory>
            ))}
          </SkillsGrid>
        </AboutSection>
      </AboutContainer>
      
      <Footer />
    </>
  );
};

export default About;
