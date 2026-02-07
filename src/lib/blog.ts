import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type BlogFrontmatter = {
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  tags?: string[];
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertBlogDirExists() {
  if (!fs.existsSync(BLOG_DIR)) return;
  const stat = fs.statSync(BLOG_DIR);
  if (!stat.isDirectory()) {
    throw new Error(`Expected blog directory at ${BLOG_DIR} to be a directory.`);
  }
}

export function getBlogSlugs(): string[] {
  assertBlogDirExists();
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
    .filter(slug => SLUG_RE.test(slug))
    .sort();
}

export function getBlogPostMeta(slug: string): BlogPostMeta {
  if (!SLUG_RE.test(slug)) {
    throw new Error(`Invalid blog slug: ${slug}`);
  }
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(raw);

  const fm = data as Partial<BlogFrontmatter>;
  if (!fm.title || !fm.date) {
    throw new Error(`Missing required frontmatter (title/date) for blog post: ${slug}`);
  }

  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : undefined,
  };
}

export function getAllBlogPostsMeta(): BlogPostMeta[] {
  const slugs = getBlogSlugs();
  const posts = slugs.map(getBlogPostMeta);
  // Newest first (string compare works for YYYY-MM-DD)
  posts.sort((a, b) => b.date.localeCompare(a.date));
  return posts;
}

export function getBlogPostSource(slug: string): { meta: BlogPostMeta; source: string } {
  if (!SLUG_RE.test(slug)) {
    throw new Error(`Invalid blog slug: ${slug}`);
  }
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Partial<BlogFrontmatter>;
  if (!fm.title || !fm.date) {
    throw new Error(`Missing required frontmatter (title/date) for blog post: ${slug}`);
  }

  return {
    meta: {
      slug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : undefined,
    },
    source: content,
  };
}
