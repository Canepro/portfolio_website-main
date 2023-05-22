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
          <ListParagraph style={{ listStyleType: 'disc' }}>
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
          <ListParagraph style={{ listStyleType: 'disc' }}>
            Experience with cloud platforms such as Amazon Web Services (AWS) and Microsoft Azure. 
            <br /><br />
            Experience with Infrastructure as Code (IaC) tools such as Terraform and CloudFormation. 
            <br /><br />
            Experience with configuration management tools such as Ansible and Chef. 
            <br /><br />
            Experience with containerization tools such as Docker and Kubernetes. 
            <br /><br />
            Experience with monitoring and logging tools such as CloudWatch, Prometheus, and Grafana. 
            <br /><br />
            Experience with automation tools such as Jenkins and GitLab CI/CD. 
            <br /><br />
            Experience with security tools such as AWS Security Hub and Azure Security Center. 
            <br /><br />
        </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <picture>
          <DiZend size="3rem" />
        </picture>
        <ListContainer>
          <ListTitle>Technical Support Analyst</ListTitle>
          <ListParagraph style={{ listStyleType: 'disc' }}>
            Experience with Services like <br />
            Microsoft 365 (Exchange Online) 
            <br />
            Microsoft Azure 
            <br />
            RocketChat 
            <br />
            Support ticketing software (RAVE, ZohoDesk, Zendesk, ZenDesk Chat, HelpScout, Intercom, etc.….) 
            <br />
            Jira and Confluence
            <br />
            Github <br />
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
    <SectionDivider colorAlt />
  </Section>
);

export default Technologies;
