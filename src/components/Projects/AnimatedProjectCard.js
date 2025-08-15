// src/components/Projects/AnimatedProjectCard.js

import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const AnimatedProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
    >
      <ProjectCard project={project} />
    </motion.div>
  );
};

export default AnimatedProjectCard;
