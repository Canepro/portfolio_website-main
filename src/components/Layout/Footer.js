import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background2}, ${({ theme }) => theme.colors.background1}22);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent1}, transparent);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FooterTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent1};
  margin-bottom: 10px;
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.text}cc;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text}aa;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent1};
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.background1};
  border: 2px solid ${({ theme }) => theme.colors.accent1}44;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent1};
    background: ${({ theme }) => theme.colors.accent1};
    color: white;
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.accent1}22;
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text}88;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Vincent Mogah</FooterTitle>
          <FooterText>
            DevOps Engineer passionate about cloud infrastructure, automation, 
            and building scalable solutions that bridge development and operations.
          </FooterText>
          <SocialLinks>
            <SocialLink 
              href="https://www.linkedin.com/in/vincent-mogah/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              💼
            </SocialLink>
            <SocialLink 
              href="https://github.com/vincentmogah" 
              target="_blank" 
              rel="noopener noreferrer"
              title="GitHub"
            >
              🔗
            </SocialLink>
            <SocialLink 
              href="mailto:vincent@example.com"
              title="Email"
            >
              📧
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Services</FooterTitle>
          <FooterLink href="#services">Cloud Infrastructure</FooterLink>
          <FooterLink href="#services">CI/CD Pipelines</FooterLink>
          <FooterLink href="#services">Container Orchestration</FooterLink>
          <FooterLink href="#services">DevOps Consulting</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Technologies</FooterTitle>
          <FooterLink href="#technologies">Azure & AWS</FooterLink>
          <FooterLink href="#technologies">Docker & Kubernetes</FooterLink>
          <FooterLink href="#technologies">Terraform & IaC</FooterLink>
          <FooterLink href="#technologies">Jenkins & Azure DevOps</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        © {new Date().getFullYear()} Vincent Mogah. All rights reserved. 
        Built with passion for modern DevOps practices.
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
