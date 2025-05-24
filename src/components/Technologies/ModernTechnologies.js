import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { 
  ModernTechContainer,
  TechCategory,
  CategoryTitle,
  TechGrid,
  TechCard,
  TechIcon,
  TechName,
  TechLevel,
  ProgressBar,
  ProgressFill
} from './ModernTechnologiesStyles';

// Technology data with categories and skill levels
const technologies = {
  "Cloud & DevOps": [
    { name: "Microsoft Azure", level: 95, icon: "☁️" },
    { name: "AWS", level: 85, icon: "🚀" },
    { name: "Docker", level: 90, icon: "🐳" },
    { name: "Kubernetes", level: 80, icon: "☸️" },
    { name: "Terraform", level: 85, icon: "🏗️" },
    { name: "CI/CD Pipelines", level: 90, icon: "🔄" }
  ],
  "Frontend Development": [
    { name: "React.js", level: 90, icon: "⚛️" },
    { name: "Next.js", level: 85, icon: "▲" },
    { name: "TypeScript", level: 80, icon: "📘" },
    { name: "HTML5", level: 95, icon: "📄" },
    { name: "CSS3", level: 90, icon: "🎨" },
    { name: "JavaScript", level: 90, icon: "📜" }
  ],
  "Backend & Database": [
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "Python", level: 80, icon: "🐍" },
    { name: "PostgreSQL", level: 85, icon: "🐘" },
    { name: "MongoDB", level: 75, icon: "🍃" },
    { name: "Redis", level: 70, icon: "🔴" },
    { name: "REST APIs", level: 90, icon: "🔗" }
  ],
  "Tools & Monitoring": [
    { name: "Git", level: 95, icon: "📊" },
    { name: "Azure Monitor", level: 85, icon: "📈" },
    { name: "Grafana", level: 75, icon: "📊" },
    { name: "Prometheus", level: 70, icon: "🔥" },
    { name: "Nginx", level: 80, icon: "🌐" },
    { name: "Linux", level: 85, icon: "🐧" }
  ]
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (level) => ({
    width: `${level}%`,
    transition: { duration: 1, ease: "easeOut" }
  })
};

const ModernTechnologies = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Section id="technologies">
      <SectionDivider />
      <SectionTitle main>Technologies & Skills</SectionTitle>
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <ModernTechContainer>
          {Object.entries(technologies).map(([category, techs], categoryIndex) => (
            <motion.div key={category} variants={categoryVariants}>
              <TechCategory>
                <CategoryTitle>{category}</CategoryTitle>
                <TechGrid>
                  {techs.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      variants={cardVariants}
                      whileHover={{ 
                        y: -5,
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <TechCard>
                        <TechIcon>{tech.icon}</TechIcon>
                        <TechName>{tech.name}</TechName>
                        <TechLevel>
                          <ProgressBar>
                            <ProgressFill
                              as={motion.div}
                              variants={progressVariants}
                              custom={tech.level}
                              initial="hidden"
                              animate={inView ? "visible" : "hidden"}
                            />
                          </ProgressBar>
                          <span className="percentage">{tech.level}%</span>
                        </TechLevel>
                      </TechCard>
                    </motion.div>
                  ))}
                </TechGrid>
              </TechCategory>
            </motion.div>
          ))}
        </ModernTechContainer>
      </motion.div>
    </Section>
  );
};

export default ModernTechnologies;
