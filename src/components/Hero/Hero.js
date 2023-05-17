import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <>
    <Section row nopadding>
      <LeftSection>
        <SectionTitle main center>
          Welcome<br />
          I am Vincent Mogah
        </SectionTitle>
        <SectionText>
          I am a DevOps Engineer with cloud administration and web development skills. I learn new technologies quickly and work well with others. I can help your company succeed by:

          - Deploying and managing applications in Microsoft Azure and AWS
          - Developing user interfaces and web applications with HTML, CSS, and React.js
          - Communicating effectively with clients and explaining technical concepts clearly
          - Identifying and solving problems creatively and critically
          - Collecting and analyzing data to identify trends and make recommendations
          - Contributing to the development and improvement of best practices, procedures, and policies

          I am motivated and results-oriented. I am interested in learning more about your company and the position. Thank you for your time and consideration.
      </SectionText>
        <Button onClick={() => window.location = 'https://www.linkedin.com/in/vincent-mogah/'}>Learn More</Button>
      </LeftSection>
    </Section>
  </>
);

export default Hero;
