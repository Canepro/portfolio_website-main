import React from 'react';
import { DiFirebase, DiReact, DiZend } from 'react-icons/di';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

const Technologies = () =>  (
  <Section id="tech">
    <SectionDivider divider />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      I have experience working with a variety of technologies in both cloud and web development.
    </SectionText>
    <List>
      <ListItem>
        <picture>
          <DiReact size="3rem" />
        </picture>
        <ListContainer>
          <ListTitle>Front-End</ListTitle>
          <ListParagraph>
            Experiece with <br />
            React.js <br />
            HTML 5 <br />
            CSS3 <br />
            JavaScript <br />
            API <br />            
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <picture>
          <DiFirebase size="3rem" />
        </picture>
        <ListContainer>
          <ListTitle>DevOps/Cloud</ListTitle>
          <ListParagraph>
            Experience with designing, planning, implementing, and maintaining cloud-based infrastructure and services. <br />
            Working with cloud providers, such as Amazon Web Services (AWS) and Microsoft Azure, to build and manage cloud environments. <br />
            Collaborating with software developers, system administrators, and other IT professionals to ensure that cloud-based applications and services are secure, scalable, and highly available. <br />
            Having a strong understanding of cloud computing concepts. <br />
            Having experience with cloud platforms, networking, security, and automation tools. <br />
        </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <picture>
          <DiZend size="3rem" />
        </picture>
        <ListContainer>
          <ListTitle>Technical Support Analyst</ListTitle>
          <ListParagraph>
            Experience with Services like <br />
            Microsoft 365 (Exchange Online) <br />
            Microsoft Azure <br />
            RocketChat <br /> 
            Support ticketing software (RAVE, ZohoDesk, Zendesk, ZenDesk Chat, HelpScout, Intercom, etc.….) <br />
            Jira <br />
            Confluence <br />
            Github <br />
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
    <SectionDivider colorAlt />
  </Section>
);

export default Technologies;
