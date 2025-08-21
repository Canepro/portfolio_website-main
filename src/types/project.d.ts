export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category?: string;
  featured?: boolean;
  source?: string;
  visit?: string;
  id: number;
  challenges?: string[];
  solutions?: string[];
  impact?: string;
  technologies?: Record<string, string[]>;
}

export interface ProjectDetail {
  slug: string;
  longDescription?: string;
  challenges?: string[];
  solutions?: string[];
  impact?: string;
  technologies?: Record<string, string[]>;
}
