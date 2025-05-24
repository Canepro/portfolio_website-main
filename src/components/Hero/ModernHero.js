import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Section, SectionText } from '../../styles/GlobalComponents';
import { ModernButton } from '../../styles/GlobalComponents/ModernButton';
import { 
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  HeroButtons,
  FloatingCard,
  GradientOrb,
  AnimatedBackground
} from './ModernHeroStyles';

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

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
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

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const orbVariants = {
  initial: { scale: 0.8, opacity: 0.6 },
  animate: {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.6, 0.9, 0.6],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const ModernHero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleContactClick = () => {
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectsClick = () => {
    // Smooth scroll to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section row nopadding>
      <HeroContainer ref={ref}>
        <AnimatedBackground>
          <GradientOrb
            as={motion.div}
            variants={orbVariants}
            initial="initial"
            animate="animate"
            style={{ top: '20%', left: '10%' }}
          />
          <GradientOrb
            as={motion.div}
            variants={orbVariants}
            initial="initial"
            animate="animate"
            style={{ top: '60%', right: '15%', animationDelay: '2s' }}
          />
        </AnimatedBackground>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <HeroContent>
            <motion.div variants={titleVariants}>
              <HeroTitle>
                <span className="gradient-text">Vincent Mogah</span>
                <br />
                <span className="subtitle">DevOps Engineer</span>
              </HeroTitle>
            </motion.div>

            <motion.div variants={itemVariants}>
              <HeroSubtitle>
                Building scalable cloud infrastructure and modern web experiences
              </HeroSubtitle>
            </motion.div>

            <motion.div variants={itemVariants}>
              <HeroDescription>
                <p>
                  5+ years of experience in cloud administration, DevOps automation, 
                  and full-stack development. Passionate about creating efficient, 
                  secure, and scalable solutions using cutting-edge technologies.
                </p>
                <br />
                <p>
                  Specialized in Microsoft Azure, AWS, containerization, CI/CD pipelines, 
                  and modern web development with React, Next.js, and cloud-native architectures.
                </p>
              </HeroDescription>
            </motion.div>

            <motion.div variants={itemVariants}>
              <HeroButtons>
                <ModernButton 
                  primary
                  onClick={handleContactClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  as={motion.button}
                >
                  Get In Touch
                </ModernButton>
                <ModernButton 
                  secondary
                  onClick={handleProjectsClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  as={motion.button}
                >
                  View Projects
                </ModernButton>
              </HeroButtons>
            </motion.div>
          </HeroContent>

          <motion.div variants={itemVariants}>
            <FloatingCard
              as={motion.div}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <h3>Quick Stats</h3>
              <div className="stats">
                <div className="stat">
                  <span className="number">5+</span>
                  <span className="label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="number">50+</span>
                  <span className="label">Projects Deployed</span>
                </div>
                <div className="stat">
                  <span className="number">99.9%</span>
                  <span className="label">Uptime Achieved</span>
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </motion.div>
      </HeroContainer>
    </Section>
  );
};

export default ModernHero;
