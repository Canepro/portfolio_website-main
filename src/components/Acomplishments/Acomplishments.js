import React from 'react';

import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { Box, Boxes, BoxNum, BoxText } from './AcomplishmentsStyles';

const data = [
  { number: 6, text: 'Open Source Projects'},
  { number: 6, text: 'Certifications', },
  { number: 1, text: 'Github Followers', },
  { number: 10, text: 'Github Stars', }
];

const Acomplishments = () => (
  <Section>
    <SectionTitle>Personal Achievements</SectionTitle>
    <Boxes>
      {data.map((card, index) => (
        <Box key={index}>
          {card.text === 'Open Source Projects' ? (
            <a href="https://github.com/canepro?tab=repositories">
              <BoxNum>{`${card.number}+`}</BoxNum>
              <BoxText>{card.text}</BoxText>
            </a>
          ) : card.text === 'Certifications' ? (
            <a href="https://www.credly.com/users/vincent-mogah">
              <BoxNum>{`${card.number}+`}</BoxNum>
              <BoxText>{card.text}</BoxText>
            </a>
          ) : card.text === 'Github Followers' ? (
            <a href="https://github.com/canepro?tab=followers">
              <BoxNum>{`${card.number}+`}</BoxNum>
              <BoxText>{card.text}</BoxText>
            </a>
          ) : (
            <a href="https://github.com/canepro?tab=stars">
              <BoxNum>{`${card.number}+`}</BoxNum>
              <BoxText>{card.text}</BoxText>
            </a>
          )}
        </Box>
      ))}
    </Boxes>
    <SectionDivider/>
  </Section>
);

export default Acomplishments;
