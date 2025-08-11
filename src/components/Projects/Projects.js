// src/components/Projects/Projects.js

import React from 'react';
import Image from 'next/image';

import { BlogCard, CardInfo, ExternalLinks, GridContainer, HeaderThree, Hr, Tag, TagList, TitleContent, UtilityList } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';

const Projects = () => (
  <Section nopadding id="projects">
    <SectionDivider />
    <SectionTitle main>Projects</SectionTitle>
    <GridContainer>
      {projects.map((p, i) => {
        return (
          <BlogCard key={i}>
          <Image src={p.image} alt={`${p.title} thumbnail`} width={800} height={450} style={{ width: '100%', height: 'auto' }} />
            <TitleContent>
              <HeaderThree title={true}>{p.title}</HeaderThree>
              <Hr />
            </TitleContent>
            <CardInfo className="card-info">{p.description}</CardInfo>
            <div>
              <TitleContent>Stack</TitleContent>
              <TagList>
                {p.tags.map((t, i) => {
                  return <Tag key={i}>{t}</Tag>;
                })}
              </TagList>
            </div>
            <UtilityList>
              {p.visit === p.source ? (
                <ExternalLinks href={p.source} target="_blank" rel="noopener noreferrer">Source Code</ExternalLinks>
              ) : (
                <>
                  <ExternalLinks href={p.visit} target="_blank" rel="noopener noreferrer">Live Site</ExternalLinks>
                  <ExternalLinks href={p.source} target="_blank" rel="noopener noreferrer">Source Code</ExternalLinks>
                </>
              )}
            </UtilityList>
          </BlogCard>
        );
      })}
    </GridContainer>
  </Section>
);

export default Projects;