// src/components/Projects/ProjectCard.js

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  CategoryBadge,
  ViewDetailsButton,
  SkeletonOverlay
} from './ProjectsStyles';
import { Button } from '../ui/button';

const ProjectCard = ({ project, index }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <BlogCard className={`hover-lift animate-scaleIn delay-${(index % 5 + 1) * 100}`}>
      <Link href={`/projects/${project.slug}`} passHref legacyBehavior>
        <a style={{ textDecoration: 'none', color: 'inherit' }}>
          <ImageWrapper>
            {!loaded && <SkeletonOverlay />}
            <Image
              src={project.image}
              alt={`${project.title} thumbnail`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
              style={{ objectFit: 'cover' }}
              onLoadingComplete={() => setLoaded(true)}
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
      
      <div style={{ marginTop: 'auto' }}>
        <TitleContent>Stack</TitleContent>
        <TagList>
          {project.tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </TagList>
      </div>
      
      <UtilityList>
        {project.visit && (
          <Link href={project.visit} target="_blank" rel="noopener noreferrer">
            <Button size="sm">Live Site</Button>
          </Link>
        )}
        {project.source && (
          <Link href={project.source} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="secondary">Source Code</Button>
          </Link>
        )}
      </UtilityList>
    </BlogCard>
  );
};

export default ProjectCard;
