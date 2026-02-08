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
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function assertPlainText(label: string, value: unknown): string {
  if (typeof value !== 'string') {
    throw new Error(`Expected ${label} to be a string.`);
  }
  // Frontmatter is intended to be plain text. Reject angle brackets to prevent HTML injection.
  // React escapes text nodes, but rejecting HTML here also helps static analysis tools.
  if (/[<>]/.test(value)) {
    throw new Error(`Frontmatter field ${label} contains disallowed characters (< or >).`);
  }
  return value.trim();
}

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
  const title = assertPlainText('title', fm.title);
  const date = assertPlainText('date', fm.date);
  if (!DATE_RE.test(date)) {
    throw new Error(`Invalid blog date format (expected YYYY-MM-DD): ${slug}`);
  }
  const description = fm.description ? assertPlainText('description', fm.description) : undefined;
  const tags = Array.isArray(fm.tags)
    ? (fm.tags as unknown[]).map(t => assertPlainText('tags[]', t))
    : undefined;

  return {
    slug,
    title,
    description,
    date,
    tags,
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
  const title = assertPlainText('title', fm.title);
  const date = assertPlainText('date', fm.date);
  if (!DATE_RE.test(date)) {
    throw new Error(`Invalid blog date format (expected YYYY-MM-DD): ${slug}`);
  }
  const description = fm.description ? assertPlainText('description', fm.description) : undefined;
  const tags = Array.isArray(fm.tags)
    ? (fm.tags as unknown[]).map(t => assertPlainText('tags[]', t))
    : undefined;

  return {
    meta: {
      slug,
      title,
      description,
      date,
      tags,
    },
    source: content,
  };
}
