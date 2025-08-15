// src/pages/projects/[slug].js

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { SkeletonOverlay } from '../../components/Projects/ProjectsStyles';
import { Layout } from '../../layout/Layout';
import { projects } from '../../constants/constants';
import { projectDetails } from '../../constants/projectDetails';
import SEO from '../../components/SEO/SEO';
import { projectStructuredData } from '../../lib/structuredData';
import {
  ProjectDetailContainer,
  BackButton,
  ProjectHero,
  ProjectImage,
  ProjectTitle,
  ProjectMeta,
  CategoryBadge,
  ProjectContent,
  Section,
  SectionTitle,
  Description,
  ChallengeGrid,
  ChallengeCard,
  TechStack,
  TechCategory,
  TechList,
  TechItem,
  ProjectLinks,
  ImpactBox,
  TagList,
  Tag
} from '../../styles/ProjectDetailStyles';
import { Button } from '../../components/ui/button';

const ProjectDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Find the project by slug
  const project = projects.find(p => p.slug === slug);
  const details = projectDetails[slug];

  // Handle project not found
  if (!project) {
    return (
      <Layout>
        <ProjectDetailContainer>
          <h1>Project not found</h1>
          <Link href="/projects">
            <a>Back to projects</a>
          </Link>
        </ProjectDetailContainer>
      </Layout>
    );
  }

  // Merge project data with details
  const fullProject = { ...project, ...details };

  return (
    <>
      <SEO
        title={`${project.title} - Vincent Mogah Portfolio`}
        description={project.description}
        canonical={`https://portfolio.canepro.me/projects/${slug}`}
        structuredData={projectStructuredData(project)}
      />
      <Layout>
        <ProjectDetailContainer>
          <Link href="/projects" passHref legacyBehavior>
            <BackButton>
              ← Back to Projects
            </BackButton>
          </Link>

          <ProjectHero>
            <ProjectImage>
              <SkeletonOverlay />
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </ProjectImage>
            
            <ProjectTitle>{project.title}</ProjectTitle>
            
            <ProjectMeta>
              <CategoryBadge category={project.category}>
                {project.category}
              </CategoryBadge>
              {project.featured && (
                <CategoryBadge featured>Featured Project</CategoryBadge>
              )}
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
                {fullProject.longDescription || project.description}
              </Description>
            </Section>

            {fullProject.impact && (
              <ImpactBox>
                <h3>📊 Impact</h3>
                <p>{fullProject.impact}</p>
              </ImpactBox>
            )}

            {fullProject.challenges && fullProject.solutions && (
              <Section>
                <SectionTitle>Challenges & Solutions</SectionTitle>
                <ChallengeGrid>
                  <ChallengeCard>
                    <h3>🎯 Challenges</h3>
                    <ul>
                      {fullProject.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </ChallengeCard>
                  <ChallengeCard>
                    <h3>💡 Solutions</h3>
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
              {project.visit && (
                <Button asChild>
                  <a href={project.visit} target="_blank" rel="noopener noreferrer">
                    View Live Project →
                  </a>
                </Button>
              )}
              {project.source && (
                <Button variant="outline" asChild>
                  <a href={project.source} target="_blank" rel="noopener noreferrer">
                    View Source Code →
                  </a>
                </Button>
              )}
            </ProjectLinks>
          </ProjectContent>
        </ProjectDetailContainer>
      </Layout>
    </>
  );
};

export default ProjectDetailPage;
