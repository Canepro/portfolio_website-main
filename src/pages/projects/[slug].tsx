// src/pages/projects/[slug].tsx

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SkeletonOverlay } from '../../components/Projects/ProjectsStyles';
import { Layout } from '../../layout/Layout';
import { projectDetails } from '../../constants/projectDetails';
import SEO from '../../components/SEO/SEO';
import { projectStructuredData } from '../../lib/structuredData';
import { Project, ProjectDetail } from '../../types/project';
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

interface ProjectDetailPageProps {
  project: Project;
  slug: string;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, slug }) => {
  // Get project details
  const details = projectDetails[slug] || {};

  // Track project view
  useEffect(() => {
    if (typeof window !== 'undefined' && project) {
      import('../../lib/analytics').then(({ analytics }) => {
        analytics.trackProjectView(project.slug, project.title);
      });
    }
  }, [project]);

  // Handle project not found (shouldn't happen with getStaticPaths, but good fallback)
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
                unoptimized={project.image.endsWith('.gif')}
                style={{ objectFit: project.image.endsWith('.gif') ? 'contain' : 'cover' }}
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
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {fullProject.longDescription || project.description}
                </ReactMarkdown>
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

// Generate static paths for all projects
export const getStaticPaths: GetStaticPaths = async () => {
  // Import TS constants (Next can import TS in pages)
  const { projects } = await import('../../constants/constants');
  
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: false, // Return 404 for unknown slugs
  };
}

// Generate static props for each project
export const getStaticProps: GetStaticProps<ProjectDetailPageProps> = async ({ params }) => {
  const { slug } = params!;
  const slugString = Array.isArray(slug) ? slug[0] : slug;
  
  // Import TS source
  const { projects } = await import('../../constants/constants');
  
  // Find the project by slug
  const project = projects.find((p) => p.slug === slugString);
  
  if (!project || !slugString) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      slug: slugString,
    },
    revalidate: 60, // Revalidate every minute
  };
}
