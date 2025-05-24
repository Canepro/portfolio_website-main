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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Home = () => {
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
            size="3rem"
            speed={100}
            deleteSpeed={50}
            pauseTime={2000}
          />
        </HeroSection>

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

export default Home;

