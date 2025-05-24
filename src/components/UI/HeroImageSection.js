import React from 'react';
import styled from 'styled-components';

const HeroImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 25px;
  overflow: hidden;
  margin: 60px 0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7) contrast(1.1);
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.8) 0%,
    rgba(239, 68, 68, 0.6) 50%,
    rgba(16, 185, 129, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 40px;
`;

const HeroImageTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
`;

const HeroImageSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.95;
  max-width: 600px;
  line-height: 1.6;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const HeroImageSection = () => {
  return (
    <HeroImageContainer>
      <HeroImage 
        src="https://picsum.photos/1200/400?random=100"
        alt="Advanced Technology and Cloud Infrastructure"
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/1200x400/1a202c/3B82F6?text=ENGINEERING+THE+FUTURE";
        }}
      />
      <HeroOverlay>
        <HeroImageTitle>ENGINEERING THE FUTURE</HeroImageTitle>
        <HeroImageSubtitle>
          Where quantum computing meets cloud infrastructure, and AI-driven automation 
          transforms the impossible into reality.
        </HeroImageSubtitle>
      </HeroOverlay>
    </HeroImageContainer>
  );
};

export default HeroImageSection;
