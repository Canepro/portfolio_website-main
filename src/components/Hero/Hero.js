// src/components/Hero/Hero.js

import React from 'react';
import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { LeftSection } from './HeroStyles';
import { Button } from '../ui/button';

const Hero = () => (
  <Section row>
    <LeftSection className="animate-fadeIn">
      <SectionTitle main className="animate-slideInLeft delay-100" style={{ letterSpacing: '-0.5px', marginBottom: '1rem' }}>
        Welcome
        <br />
        I am Vincent Mogah
      </SectionTitle>
      <SectionText className="animate-slideInLeft delay-200" style={{ maxWidth: '760px' }}>
        I am a multifaceted DevOps Engineer, Cloud Architect, and Front-End Developer based in the UK. My passion lies in bridging the gap between robust infrastructure and intuitive user experiences. I design, deploy, and manage scalable solutions on Microsoft Azure and AWS, craft responsive web applications with React.js, and am keenly interested in the potential of AI to drive innovation and process improvement.
      </SectionText>
      <div className="animate-scaleIn delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'nowrap', alignItems: 'center', marginTop: '1rem' }}>
        <Button size="lg" asChild>
          <a href="https://www.linkedin.com/in/vincent-mogah/" target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn
          </a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="/projects">
            View My Work →
          </a>
        </Button>
      </div>
    </LeftSection>
  </Section>
);

export default Hero;