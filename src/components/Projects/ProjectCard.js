// src/components/Projects/ProjectCard.js

import React from 'react';
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
  CategoryBadge 
} from './ProjectsStyles';

const ProjectCard = ({ project }) => {
  return (
    <BlogCard>
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
