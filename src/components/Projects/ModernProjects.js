import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';
import {
  ModernGridContainer,
  ModernProjectCard,
  ProjectImageContainer,
  ProjectImage,
  ProjectOverlay,
  ProjectContent,
  ProjectTitle,
  ProjectDescription,
  ProjectTags,
  ProjectTag,
  ProjectLinks,
  ProjectLink,
  ProjectStats,
  ProjectStat
} from './ModernProjectsStyles';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const ModernProjects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Section nopadding id="projects">
      <SectionDivider />
      <SectionTitle main>Featured Projects</SectionTitle>
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <ModernGridContainer>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ModernProjectCard>
                <ProjectImageContainer>
                  <ProjectImage src={project.image} alt={project.title} />
                  <ProjectOverlay
                    as={motion.div}
                    variants={overlayVariants}
                    initial="hidden"
                    whileHover="visible"
                  >
                    <ProjectLinks>
                      <ProjectLink 
                        href={project.visit}
                        target="_blank"
                        rel="noopener noreferrer"
                        as={motion.a}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Live Demo
                      </ProjectLink>
                      <ProjectLink 
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        secondary
                        as={motion.a}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Source Code
                      </ProjectLink>
                    </ProjectLinks>
                  </ProjectOverlay>
                </ProjectImageContainer>

                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  <ProjectTags>
                    {project.tags.map((tag, tagIndex) => (
                      <ProjectTag key={tagIndex}>{tag}</ProjectTag>
                    ))}
                  </ProjectTags>

                  {project.stats && (
                    <ProjectStats>
                      {project.stats.map((stat, statIndex) => (
                        <ProjectStat key={statIndex}>
                          <span className="value">{stat.value}</span>
                          <span className="label">{stat.label}</span>
                        </ProjectStat>
                      ))}
                    </ProjectStats>
                  )}
                </ProjectContent>
              </ModernProjectCard>
            </motion.div>
          ))}
        </ModernGridContainer>
      </motion.div>
    </Section>
  );
};

export default ModernProjects;
