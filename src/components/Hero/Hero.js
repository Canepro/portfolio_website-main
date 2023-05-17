import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = () => {
  return (
    <Section row nopadding>
      <LeftSection>
        <SectionTitle main center>
          Welcome<br />
          I am Vincent Mogah
        </SectionTitle>
        <SectionText>
        I am a DevOps Engineer with 5+ years of experience in cloud administration and web development. I am a quick learner and I am eager to learn new technologies. I am also a team player and I am able to work effectively with others. I am confident that I can contribute to your company's success. <br />

        I have experience with Microsoft Azure and AWS, and I am able to deploy and manage applications in the cloud. I am also able to configure and manage cloud resources. I have experience with HTML, CSS, and React.js, and I am able to develop user interfaces and web applications. I am also able to integrate web applications with cloud services. <br />

        I am a highly motivated and results-oriented individual. I am confident that I can make a significant contribution to your company. I am eager to learn more about your company and the position you are seeking to fill. Thank you for your time and consideration. <br />
        </SectionText>
        <Button onClick={() => window.location = 'https://www.linkedin.com/in/vincent-mogah/'}>Learn More</Button>
      </LeftSection>
    </Section>
  );
};

export default Hero;
