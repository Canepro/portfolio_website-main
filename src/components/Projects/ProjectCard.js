// src/components/Projects/ProjectCard.js

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import { 
  BlogCard, 
  CardInfo, 
  HeaderThree, 
  Hr, 
  Tag, 
  TagList, 
  TitleContent, 
  UtilityList, 
  ImageWrapper
} from './ProjectsStyles';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const ProjectCard = ({ project, index }) => {

  return (
    <BlogCard
      className="hover-lift animate-scaleIn"
      delay={(index % 5 + 1) * 100}
    >
      <Link href={`/projects/${project.slug}`} passHref legacyBehavior>
        <a style={{ textDecoration: 'none', color: 'inherit' }}>
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
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 1 }}>
                <Badge variant="default">Featured</Badge>
              </div>
            )}
            {project.category && !project.featured && (
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 1 }}>
                <Badge variant="secondary">{project.category}</Badge>
              </div>
            )}
          </ImageWrapper>

          <TitleContent>
            <HeaderThree title="true">{project.title}</HeaderThree>
            <Hr />
          </TitleContent>

          <CardInfo className="card-info">{project.description}</CardInfo>
        </a>
      </Link>
      
      <div style={{ marginTop: 'auto' }}>
        <TitleContent>Stack</TitleContent>
        <TagList>
          {project.tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </TagList>
      </div>
      
      <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: 'auto' }}>
        {project.visit === project.source ? (
          <Button size="sm" asChild>
            <a href={project.source} target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
          </Button>
        ) : (
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
      </div>
    </BlogCard>
  );
};

export default ProjectCard;
