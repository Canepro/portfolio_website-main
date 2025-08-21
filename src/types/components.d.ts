import { ReactNode } from 'react';
import { Project } from './project';

// Common component props
export interface ComponentProps {
  children?: ReactNode;
  className?: string;
}

// SEO component types
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
  canonicalUrl?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  type?: 'website' | 'article';
}

// Layout component types
export interface LayoutProps extends ComponentProps {
  children: ReactNode;
}

// Header/Navigation types
export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface HeaderProps extends ComponentProps {}

// Footer types
export interface FooterProps extends ComponentProps {}

// Hero section types
export interface HeroProps extends ComponentProps {}

// Timeline types
export interface TimelineItem {
  year: number;
  text: string;
}

export interface TimelineProps extends ComponentProps {
  data?: TimelineItem[];
}

// Technologies types
export interface TechnologyItem {
  name: string;
  icon: ReactNode;
}

export interface TechnologiesProps extends ComponentProps {
  data?: TechnologyItem[];
}

// Accomplishments types
export interface AccomplishmentItem {
  number: string | number;
  text: string;
}

export interface AccomplishmentsProps extends ComponentProps {
  data?: AccomplishmentItem[];
}

// Certifications types
export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  icon?: ReactNode;
}

export interface CertificationsProps extends ComponentProps {
  data?: CertificationItem[];
}

// OptimizedImage types
export interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  className?: string;
}

// Background Animation types
export interface BackgroundAnimationProps extends ComponentProps {}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormProps extends ComponentProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

// Project card types
export interface ProjectCardProps extends ComponentProps {
  project: Project;
  index?: number;
}

// Projects grid types
export interface ProjectsProps extends ComponentProps {
  projects?: Project[];
}

// Common styled component props
export interface ThemeProps {
  theme?: any; // Will be properly typed when we migrate theme
}
