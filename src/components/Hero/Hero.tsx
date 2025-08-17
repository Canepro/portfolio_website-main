// src/components/Hero/Hero.tsx

import React from 'react';
import { Section, SectionText } from '../../styles/GlobalComponents';
import { LeftSection, HeroTitle, GradientName, ModernButton, BackgroundGraphics, HeroColumn } from './HeroStyles';
import { Button } from '../ui/button';

const Hero: React.FC = () => (
  <Section row style={{ position: 'relative', overflow: 'hidden', alignItems: 'center', minHeight: '72vh' }}>
    <BackgroundGraphics />
    <LeftSection className="animate-fadeIn">
      <HeroColumn>
      <HeroTitle className="animate-slideInLeft delay-100">
        Welcome
        <br />
        <GradientName>I am Vincent Mogah</GradientName>
      </HeroTitle>
      <SectionText className="animate-slideInLeft delay-200" style={{ maxWidth: '880px', fontSize: '23px', lineHeight: '36px', opacity: '0.9' }}>
        I am a multifaceted DevOps Engineer, Cloud Architect, and Front-End Developer based in the UK. My passion lies in bridging the gap between robust infrastructure and intuitive user experiences. I design, deploy, and manage scalable solutions on Microsoft Azure and AWS, craft responsive web applications with React.js, and am keenly interested in the potential of AI to drive innovation and process improvement.
      </SectionText>
      <div className="animate-scaleIn delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'nowrap', alignItems: 'center', marginTop: '1.25rem' }}>
        <ModernButton
          href="/projects"
          style={{
            background: 'linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)',
            padding: '1rem 2rem',
            borderRadius: '50px',
            border: 'none',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 219, 216, 0.3)'
          }}
        >
          View My Work
        </ModernButton>
        <Button variant="outline" size="lg" asChild>
          <a href="/contact">Get in Touch</a>
        </Button>
      </div>
      </HeroColumn>
    </LeftSection>
  </Section>
);

export default Hero;
