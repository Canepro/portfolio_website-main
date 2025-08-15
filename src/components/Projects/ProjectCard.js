// src/components/Projects/ProjectCard.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BlogCard, 
  CardInfo, 
  ExternalLinks, 
  HeaderThree, 
  Hr, 
  Tag, 
  TagList, 
  TitleContent, 
  UtilityList, 
  ImageWrapper,
  CategoryBadge,
  ViewDetailsButton
} from './ProjectsStyles';

const ProjectCard = ({ project, index }) => {
  return (
    <BlogCard className={`hover-lift animate-scaleIn delay-${(index % 5 + 1) * 100}`}>
      <Link href={`/projects/${project.slug}`} passHref legacyBehavior>
        <a style={{ textDecoration: 'none', color: 'inherit' }}>
          <ImageWrapper>
            <Image
              src={project.image}
              alt={`${project.title} thumbnail`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            {project.featured && <CategoryBadge featured>Featured</CategoryBadge>}
            {project.category && <CategoryBadge>{project.category}</CategoryBadge>}
          </ImageWrapper>

          <TitleContent>
            <HeaderThree title={true}>{project.title}</HeaderThree>
            <Hr />
          </TitleContent>

          <CardInfo className="card-info">{project.description}</CardInfo>
        </a>
      </Link>
      
      <div>
        <TitleContent>Stack</TitleContent>
        <TagList>
          {project.tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </TagList>
      </div>
      
      <UtilityList>
        {project.visit === project.source ? (
          <ExternalLinks href={project.source} target="_blank" rel="noopener noreferrer">
            Source Code
          </ExternalLinks>
        ) : (
          <>
            <ExternalLinks href={project.visit} target="_blank" rel="noopener noreferrer">
              Live Site
            </ExternalLinks>
            <ExternalLinks href={project.source} target="_blank" rel="noopener noreferrer">
              Source Code
            </ExternalLinks>
          </>
        )}
      </UtilityList>
    </BlogCard>
  );
};

export default ProjectCard;
