import { cn } from '@/lib/utils';

/** Shared long-form typography for markdown / MDX surfaces. */
export const proseClasses = cn(
  'text-sm leading-7 text-[color:var(--color-text-secondary)] md:text-base md:leading-8',
  '[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[color:var(--color-text-primary)]',
  '[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-[color:var(--color-text-primary)]',
  '[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[color:var(--color-text-primary)]',
  '[&_p]:my-4',
  '[&_strong]:font-semibold [&_strong]:text-[color:var(--color-text-primary)]',
  '[&_a]:text-[color:var(--color-accent)] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-90',
  '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5',
  '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5',
  '[&_li]:my-1.5',
  '[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[color:var(--color-border)] [&_blockquote]:pl-4 [&_blockquote]:italic',
  '[&_code]:rounded-md [&_code]:border [&_code]:border-[color:var(--color-border)] [&_code]:bg-[color:var(--color-bg-primary)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-[color:var(--color-text-primary)]',
  '[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-[color:var(--color-border)] [&_pre]:bg-[color:var(--color-bg-secondary)] [&_pre]:p-4 [&_pre]:text-sm',
  '[&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0',
  '[&_img]:my-6 [&_img]:rounded-xl [&_img]:border [&_img]:border-[color:var(--color-border)] [&_img]:shadow-sm',
  '[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:text-sm',
  '[&_th]:border [&_th]:border-[color:var(--color-border)] [&_th]:bg-[color:var(--color-bg-primary)] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[color:var(--color-text-primary)]',
  '[&_td]:border [&_td]:border-[color:var(--color-border)] [&_td]:px-3 [&_td]:py-2',
  '[&_hr]:my-8 [&_hr]:h-px [&_hr]:w-16 [&_hr]:border-0 [&_hr]:bg-[color:var(--color-accent)]'
);
