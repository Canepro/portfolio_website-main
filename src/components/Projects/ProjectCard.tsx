// src/components/Projects/ProjectCard.tsx

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import { ProjectCardProps } from '../../types/components';
import { 
  BlogCard, 
  CardInfo, 
  HeaderThree, 
  Hr, 
  Tag, 
  TagList, 
  TitleContent, 
  UtilityList, 
  ImageWrapper,
  LiveDemoBadge,
  ButtonContainer,
  LiveChatButton,
  DashboardButton,
  ProjectLinkContainer,
  BadgeContainer,
  StackContainer,
  LiveDemoBadgeStyled
} from './ProjectsStyles';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  // Check if this is the enterprise Kubernetes project with live demos
  const isEnterpriseProject = project.slug === 'rocketchat-kubernetes-enterprise';
  
  const handleLiveChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Use enhanced analytics service
    if (typeof window !== 'undefined') {
      import('../../lib/analytics').then(({ analytics }) => {
        analytics.trackDemoAccess('chat', project.slug);
      });
    }
  };

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Use enhanced analytics service
    if (typeof window !== 'undefined') {
      import('../../lib/analytics').then(({ analytics }) => {
        analytics.trackDemoAccess('dashboard', project.slug);
      });
    }
  };

  return (
    <BlogCard
      className="hover-lift animate-scaleIn"
      delay={(index % 5 + 1) * 100}
    >
      <Link href={`/projects/${project.slug}`} passHref legacyBehavior>
        <ProjectLinkContainer>
          <ImageWrapper>
            <OptimizedImage
              src={project.image}
              alt={`${project.title} thumbnail`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
              priority={index < 4}
              enableHover={false}
            />
            {project.featured && (
              <BadgeContainer>
                <Badge variant="default">Featured</Badge>
              </BadgeContainer>
            )}
            {project.category && !project.featured && (
              <BadgeContainer>
                <Badge variant="secondary">{project.category}</Badge>
              </BadgeContainer>
            )}
            {isEnterpriseProject && (
              <LiveDemoBadge>
                <LiveDemoBadgeStyled>
                  🚀 Live Demo
                </LiveDemoBadgeStyled>
              </LiveDemoBadge>
            )}
          </ImageWrapper>

          <TitleContent>
            <HeaderThree title="true">{project.title}</HeaderThree>
            <Hr />
          </TitleContent>

          <CardInfo className="card-info">{project.description}</CardInfo>
        </ProjectLinkContainer>
      </Link>
      
      <StackContainer>
        <TitleContent>Stack</TitleContent>
        <TagList>
          {project.tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </TagList>
      </StackContainer>
      
      <ButtonContainer>
        {isEnterpriseProject ? (
          // Special buttons for enterprise project with live demos
          <>
            <Button size="sm" asChild>
              <LiveChatButton 
                href="https://chat.canepro.me" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleLiveChatClick}
              >
                💬 Live Chat
              </LiveChatButton>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <DashboardButton 
                href="https://grafana.canepro.me/d/public-rocketchat-overview?kiosk=tv&theme=dark" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleDashboardClick}
              >
                📊 Dashboard
              </DashboardButton>
            </Button>
            {project.source && (
              <Button size="sm" variant="outline" asChild>
                <a href={project.source} target="_blank" rel="noopener noreferrer">
                  Source Code
                </a>
              </Button>
            )}
          </>
        ) : project.visit === project.source ? (
          // Standard single button for projects where visit and source are the same
          <Button size="sm" asChild>
            <a href={project.source} target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
          </Button>
        ) : (
          // Standard dual buttons for other projects
          <>
            {project.visit && (
              <Button size="sm" asChild>
                <a href={project.visit} target="_blank" rel="noopener noreferrer">
                  Live Site
                </a>
              </Button>
            )}
            {project.source && (
              <Button size="sm" variant="outline" asChild>
                <a href={project.source} target="_blank" rel="noopener noreferrer">
                  Source Code
                </a>
              </Button>
            )}
          </>
        )}
      </ButtonContainer>
    </BlogCard>
  );
};

export default ProjectCard;
