// src/components/Certifications/CertificationsStyles.js

import styled from 'styled-components';

export const Boxes = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin: 24px 0 40px;

  @media ${props => props.theme.breakpoints.md}{
    gap: 16px;
    margin: 20px 0 32px;
  }

  @media ${props => props.theme.breakpoints.sm}{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 24px auto;
  }
`;

export const Box = styled.div`
  background: #212D45;
  border-radius: 12px;
  padding: 24px;
  height: 100%;
  
  @media ${props => props.theme.breakpoints.lg} {
    padding: 24px;
  }

  @media ${props => props.theme.breakpoints.md} {
    padding: 16px;
  }

  @media ${props => props.theme.breakpoints.sm} {
    padding: 12px;
  }
`;

export const BoxTitle = styled.h5`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin-bottom: 8px;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 20px;
    line-height: 28px;
  }
  @media ${props => props.theme.breakpoints.sm} {
    font-size: 16px;
    line-height: 24px;
}
`;

export const BoxText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.75);

  @media ${props => props.theme.breakpoints.md}{
    font-size: 14px;
    line-height: 20px;
  };

  @media ${props => props.theme.breakpoints.sm} {
    font-size: 12px;
    line-height: 18px;
  }
`;