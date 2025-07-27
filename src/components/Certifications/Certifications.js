// src/components/Certifications/Certifications.js

import React from 'react';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { Box, Boxes, BoxTitle, BoxText } from './CertificationsStyles';
import { certifications } from '../../constants/constants';

const Certifications = () => (
  <Section>
    <SectionDivider />
    <SectionTitle>Licenses & Certifications</SectionTitle>
    <Boxes>
      {certifications.map((card, index) => (
        <Box key={index}>
          <BoxTitle>{card.name}</BoxTitle>
          <BoxText>{card.issuer}</BoxText>
          <BoxText>Issued {card.date}</BoxText>
        </Box>
      ))}
    </Boxes>
  </Section>
);

export default Certifications;