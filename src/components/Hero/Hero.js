// src/components/Hero/Hero.js

import React from 'react';
import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = () => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
        Welcome<br />
        I am Vincent Mogah
      </SectionTitle>
      <SectionText>
        I am a multifaceted DevOps Engineer, Cloud Architect, and Front-End Developer based in the UK. My passion lies in bridging the gap between robust infrastructure and intuitive user experiences. I design, deploy, and manage scalable solutions on Microsoft Azure and AWS, craft responsive web applications with React.js, and am keenly interested in the potential of AI to drive innovation and process improvement.
      </SectionText>
      <Button onClick={() => window.location = 'https://www.linkedin.com/in/vincent-mogah/'}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;