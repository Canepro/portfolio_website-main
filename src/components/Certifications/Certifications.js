// src/components/Certifications/Certifications.js

import React from 'react';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { Box, Boxes, BoxTitle, BoxText, BoxLink } from './CertificationsStyles';
import { certifications } from '../../constants/constants';

const Certifications = () => (
  <Section>
    <SectionTitle>Licenses & Certifications</SectionTitle>
    <Boxes>
      {certifications.map((card, index) => (
        <BoxLink href={card.link} key={index} target="_blank" rel="noopener noreferrer">
          <Box>
            <BoxTitle>{card.name}</BoxTitle>
            <BoxText>{card.issuer}</BoxText>
            <BoxText>Issued {card.date}</BoxText>
          </Box>
        </BoxLink>
      ))}
    </Boxes>
    {/* The SectionDivider is now correctly placed at the end of the section */}
    <SectionDivider />
  </Section>
);

export default Certifications;