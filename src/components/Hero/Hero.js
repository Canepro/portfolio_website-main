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
        I am a DevOps Engineer with a strong foundation in cloud administration and web development. I am a quick learner and I am eager to learn new technologies. I am also a team player and I am able to work effectively with others. I am confident that I can contribute to your company's success.
        <br />
        Here are some of my skills and experience:
        <ul>
          <li>Cloud Administration: I have experience with Microsoft Azure and AWS. I am able to deploy and manage applications in the cloud. I am also able to configure and manage cloud resources.</li>
          <li>Web Development: I have experience with HTML, CSS, and React.js. I am able to develop user interfaces and web applications. I am also able to integrate web applications with cloud services.</li>
          <li>Client-facing skills: I am able to communicate effectively with clients. I am able to understand their needs and I am able to explain technical concepts in a clear and concise way.</li>
          <li>Problem-solving skills: I am able to identify and solve problems. I am able to think critically and I am able to come up with creative solutions.</li>
          <li>Analytical skills: I am able to collect and analyze data. I am able to identify trends and I am able to make recommendations based on my analysis.</li>
          <li>Best practices, procedures, and policies: I am able to contribute to the development of best practices, procedures, and policies. I am able to identify gaps and I am able to make recommendations for improvement.</li>
        </ul>
        I am a highly motivated and results-oriented individual. I am confident that I can make a significant contribution to your company. I am eager to learn more about your company and the position you are seeking to fill. Thank you for your time and consideration.
      </SectionText>
        <Button onClick={() => window.location = 'https://www.linkedin.com/in/vincent-mogah/'}>Learn More</Button>
      </LeftSection>
    </Section>
  </>
);

export default Hero;
