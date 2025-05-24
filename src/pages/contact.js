import React from 'react';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ModernContact from '../components/Contact/ModernContact';
import HolographicInterface from '../components/Advanced/HolographicInterface';
import NeuralNetworkVisualizer from '../components/Advanced/NeuralNetworkVisualizer';
import { NextSeo } from 'next-seo';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 60px;
`;

const ContactSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent1}, #EF4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin: 60px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactCard = styled.div`
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 15px;
  padding: 25px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent1};
    transform: translateY(-2px);
  }
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.accent1}22;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const ContactDetails = styled.div`
  h4 {
    color: ${({ theme }) => theme.colors.accent1};
    margin: 0 0 5px 0;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }
`;

const Contact = () => {
  return (
    <>
      <NextSeo
        title="Contact Vincent Mogah - DevOps Engineer"
        description="Get in touch with Vincent Mogah for DevOps consulting, cloud infrastructure projects, or collaboration opportunities."
      />
      
      <NeuralNetworkVisualizer />
      <Header />
      
      <ContactContainer>
        <ContactSection>
          <ContactTitle>GET IN TOUCH</ContactTitle>
          
          <HolographicInterface title="CONTACT PROTOCOL INITIATED">
            Ready to discuss your next DevOps project or explore collaboration opportunities? 
            I'm always excited to work on challenging infrastructure problems and help 
            organizations scale their operations through modern DevOps practices.
          </HolographicInterface>

          <ContactGrid>
            <ContactInfo>
              <ContactCard>
                <ContactMethod>
                  <ContactIcon>📧</ContactIcon>
                  <ContactDetails>
                    <h4>Email</h4>
                    <p>vincent.mogah@example.com</p>
                  </ContactDetails>
                </ContactMethod>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  Best for detailed project discussions and formal inquiries.
                </p>
              </ContactCard>

              <ContactCard>
                <ContactMethod>
                  <ContactIcon>💼</ContactIcon>
                  <ContactDetails>
                    <h4>LinkedIn</h4>
                    <p>linkedin.com/in/vincent-mogah</p>
                  </ContactDetails>
                </ContactMethod>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  Connect for professional networking and career opportunities.
                </p>
              </ContactCard>

              <ContactCard>
                <ContactMethod>
                  <ContactIcon>🔗</ContactIcon>
                  <ContactDetails>
                    <h4>GitHub</h4>
                    <p>github.com/vincentmogah</p>
                  </ContactDetails>
                </ContactMethod>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  Check out my open-source contributions and projects.
                </p>
              </ContactCard>

              <ContactCard>
                <ContactMethod>
                  <ContactIcon>📍</ContactIcon>
                  <ContactDetails>
                    <h4>Location</h4>
                    <p>Available for remote work worldwide</p>
                  </ContactDetails>
                </ContactMethod>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  Open to both remote and on-site opportunities.
                </p>
              </ContactCard>
            </ContactInfo>

            <div>
              <ModernContact />
            </div>
          </ContactGrid>

          <HolographicInterface commandMode title="AVAILABILITY STATUS" />
        </ContactSection>
      </ContactContainer>
      
      <Footer />
    </>
  );
};

export default Contact;
