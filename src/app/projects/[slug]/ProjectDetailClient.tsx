'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import ProjectMedia from '@/components/ProjectMedia/ProjectMedia';
import { Button } from '@/components/ui/button';
import { projectDetails } from '@/constants/projectDetails';
import { safeExternalHref } from '@/lib/url';
import type { Project } from '@/types/project';
import {
  BackButton,
  CategoryBadge,
  ChallengeCard,
  ChallengeGrid,
  Description,
  ImpactBox,
  ProjectContent,
  ProjectDetailContainer,
  ProjectHero,
  ProjectImage,
  ProjectLinks,
  ProjectMeta,
  ProjectTitle,
  Section,
  SectionTitle,
  Tag,
  TagList,
  TechCategory,
  TechItem,
  TechList,
  TechStack,
} from '@/styles/ProjectDetailStyles';

export default function ProjectDetailClient({ project, slug }: { project: Project; slug: string }) {
  const details = projectDetails[slug] || {};

  useEffect(() => {
    import('@/lib/analytics')
      .then(({ analytics }) => {
        analytics.trackProjectView(project.slug, project.title);
      })
      .catch(() => {});
  }, [project.slug, project.title]);

  const fullProject = { ...project, ...details };
  const heroSrc = (fullProject as Project).media || project.media || project.image;
  const heroFit =
    heroSrc.toLowerCase().endsWith('.gif') ||
    heroSrc.toLowerCase().endsWith('.mp4') ||
    heroSrc.toLowerCase().endsWith('.webm')
      ? 'contain'
      : 'cover';
  const visitHref = safeExternalHref(project.visit);
  const sourceHref = safeExternalHref(project.source);

  return (
    <ProjectDetailContainer>
      <Link href="/projects" passHref legacyBehavior>
        <BackButton>← Back to Projects</BackButton>
      </Link>

      <ProjectHero>
        <ProjectImage>
          <ProjectMedia
            src={heroSrc}
            alt={project.title}
            fill
            priority
            poster={project.image}
            fit={heroFit}
            className="h-full w-full"
          />
        </ProjectImage>

        <ProjectTitle>{project.title}</ProjectTitle>

        <ProjectMeta>
          <CategoryBadge category={project.category}>{project.category}</CategoryBadge>
          {project.featured && <CategoryBadge featured>Featured Project</CategoryBadge>}
        </ProjectMeta>

        <TagList>
          {project.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagList>
      </ProjectHero>

      <ProjectContent>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <Description>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {fullProject.longDescription || project.description}
            </ReactMarkdown>
          </Description>
        </Section>

        {fullProject.impact && (
          <ImpactBox>
            <h3>Impact</h3>
            <p>{fullProject.impact}</p>
          </ImpactBox>
        )}

        {fullProject.challenges && fullProject.solutions && (
          <Section>
            <SectionTitle>Challenges & Solutions</SectionTitle>
            <ChallengeGrid>
              <ChallengeCard>
                <h3>Challenges</h3>
                <ul>
                  {fullProject.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </ChallengeCard>
              <ChallengeCard>
                <h3>Solutions</h3>
                <ul>
                  {fullProject.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </ChallengeCard>
            </ChallengeGrid>
          </Section>
        )}

        {fullProject.technologies && (
          <Section>
            <SectionTitle>Technology Stack</SectionTitle>
            <TechStack>
              {Object.entries(fullProject.technologies).map(([category, techs]) => (
                <TechCategory key={category}>
                  <h4>{category}</h4>
                  <TechList>
                    {techs.map((tech, index) => (
                      <TechItem key={index}>{tech}</TechItem>
                    ))}
                  </TechList>
                </TechCategory>
              ))}
            </TechStack>
          </Section>
        )}

        <ProjectLinks>
          {visitHref && (
            <Button variant="accent" asChild>
              <a href={visitHref} target="_blank" rel="noopener noreferrer">
                View Live Project →
              </a>
            </Button>
          )}
          {sourceHref && (
            <Button variant="glass" asChild>
              <a href={sourceHref} target="_blank" rel="noopener noreferrer">
                View Source Code →
              </a>
            </Button>
          )}
        </ProjectLinks>
      </ProjectContent>
    </ProjectDetailContainer>
  );
}
