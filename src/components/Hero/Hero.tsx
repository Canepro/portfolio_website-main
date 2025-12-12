// src/components/Hero/Hero.tsx

import React from 'react';
import Link from 'next/link';
import { Section, SectionText } from '../../styles/GlobalComponents';
import {
  LeftSection,
  HeroTitle,
  GradientName,
  ModernButton,
  BackgroundGraphics,
  HeroColumn,
} from './HeroStyles';
import { Button } from '../ui/button';

const Hero: React.FC = () => (
  <Section row className="relative overflow-hidden items-center min-h-[72vh]">
    <BackgroundGraphics />
    <LeftSection className="animate-fadeIn">
      <HeroColumn>
        <HeroTitle className="animate-slideInLeft delay-100">
          Welcome
          <br />
          <GradientName>I am Vincent Mogah</GradientName>
        </HeroTitle>
        <SectionText className="animate-slideInLeft delay-200 max-w-[880px] text-[23px] leading-[36px] opacity-90">
          I am a multifaceted DevOps Engineer, Cloud Architect, and Front-End Developer based in the
          UK. My passion lies in bridging the gap between robust infrastructure and intuitive user
          experiences. I design, deploy, and manage scalable solutions on Microsoft Azure and AWS,
          craft responsive web applications with React.js, and am keenly interested in the potential
          of AI to drive innovation and process improvement.
        </SectionText>
        <div className="animate-scaleIn delay-300 flex gap-4 flex-nowrap items-center mt-5">
          <ModernButton href="/projects">View My Work</ModernButton>
          <Button variant="outline" size="lg" className="h-[48px] px-8 text-lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </HeroColumn>
    </LeftSection>
  </Section>
);

export default Hero;
