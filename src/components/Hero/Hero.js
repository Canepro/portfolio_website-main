// src/components/Hero/Hero.js

import React from 'react';
import { motion } from 'framer-motion';
import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <Section row nopadding>
      <LeftSection
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item}>
          <SectionTitle main center>
            Welcome<br />
            I am Vincent Mogah
          </SectionTitle>
        </motion.div>
        <motion.div variants={item}>
          <SectionText>
            I am a multifaceted DevOps Engineer, Cloud Architect, and Front-End Developer based in the UK. My passion lies in bridging the gap between robust infrastructure and intuitive user experiences. I design, deploy, and manage scalable solutions on Microsoft Azure and AWS, craft responsive web applications with React.js, and am keenly interested in the potential of AI to drive innovation and process improvement.
          </SectionText>
        </motion.div>
        <motion.div variants={item}>
          <Button onClick={() => window.location = 'https://www.linkedin.com/in/vincent-mogah/'}>
            Learn More
          </Button>
        </motion.div>
      </LeftSection>
    </Section>
  );
};

export default Hero;