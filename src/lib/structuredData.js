// src/lib/structuredData.js

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vincent Mogah",
  "jobTitle": "DevOps Engineer & Frontend Developer",
  "description": "Multifaceted DevOps Engineer, Cloud Architect, and Frontend Developer based in the UK",
  "url": "https://portfolio.canepro.me",
  "image": "https://portfolio.canepro.me/images/profile.jpeg",
  "sameAs": [
    "https://github.com/Canepro",
    "https://www.linkedin.com/in/vincent-mogah/",
    "https://twitter.com/Canepro"
  ],
  "knowsAbout": [
    "DevOps",
    "Cloud Architecture",
    "Frontend Development",
    "React.js",
    "Next.js",
    "Microsoft Azure",
    "AWS",
    "Docker",
    "Kubernetes",
    "Infrastructure as Code",
    "CI/CD"
  ],
  "alumniOf": {
    "@type": "Organization",
    "name": "University"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
    "addressRegion": "United Kingdom"
  }
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Vincent Mogah Portfolio",
  "description": "Professional portfolio showcasing DevOps, Cloud, and Frontend development projects",
  "url": "https://portfolio.canepro.me",
  "author": {
    "@type": "Person",
    "name": "Vincent Mogah"
  },
  "inLanguage": "en-GB",
  "copyrightYear": "2025",
  "genre": "Portfolio"
};

export const portfolioStructuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Vincent Mogah - Professional Portfolio",
  "description": "A comprehensive portfolio showcasing DevOps engineering, cloud architecture, and frontend development projects",
  "author": {
    "@type": "Person",
    "name": "Vincent Mogah",
    "jobTitle": "DevOps Engineer & Frontend Developer"
  },
  "url": "https://portfolio.canepro.me",
  "dateCreated": "2024",
  "dateModified": "2025-08-14",
  "keywords": "DevOps, Cloud Architecture, Frontend Development, React, Next.js, Azure, AWS",
  "inLanguage": "en-GB"
};

export const projectStructuredData = (project) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": project.title,
  "description": project.description,
  "author": {
    "@type": "Person",
    "name": "Vincent Mogah"
  },
  "programmingLanguage": project.tags,
  "codeRepository": project.source,
  "url": project.visit,
  "applicationCategory": project.category,
  "image": `https://portfolio.canepro.me${project.image}`,
  "dateCreated": "2024",
  "inLanguage": "en-GB"
});
