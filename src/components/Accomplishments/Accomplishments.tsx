// src/components/Accomplishments/Accomplishments.tsx

import React from 'react';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { Box, Boxes, BoxNum, BoxText, BoxLink } from './AccomplishmentsStyles';
import { GitHubStats } from '../../types/pages';

interface AccomplishmentsProps {
  stats: GitHubStats;
}

const Accomplishments: React.FC<AccomplishmentsProps> = ({ stats }) => {
  // The "Certifications" box has been removed for a cleaner look.
  const data = [
    { number: stats.repos, text: 'Open Source Projects', link: 'https://github.com/canepro?tab=repositories' },
    { number: stats.followers, text: 'Github Followers', link: 'https://github.com/canepro?tab=followers' },
    { number: stats.stars, text: 'Github Stars', link: 'https://github.com/canepro?tab=stars' }
  ];

  return (
    <Section>
      <SectionTitle>Personal Achievements</SectionTitle>
      <Boxes>
        {data.map((card, index) => (
          <BoxLink href={card.link} key={index} target="_blank" rel="noopener noreferrer">
            <Box>
              <BoxNum>{`${card.number}+`}</BoxNum>
              <BoxText>{card.text}</BoxText>
            </Box>
          </BoxLink>
        ))}
      </Boxes>
      <SectionDivider/>
    </Section>
  );
};

export default Accomplishments;
