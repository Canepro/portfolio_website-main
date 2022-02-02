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
        A DevOps Engineer/Front-End Web Developer/Cloud Solutions Architect. I have extensive experience in Cloud Administrations (Microsoft Azure and AWS) and Web Development (HTML, CSS and React.js) and possess excellent client-facing skills, natural problem solving and analytical skills and the ability to contribute to the development of best practices, procedures, and policies within a company.
        </SectionText>
        <Button onClick={() => window.location = 'https://github.com/Canepro'}>Learn More</Button>
      </LeftSection>
    </Section>
  </>
);

export default Hero;