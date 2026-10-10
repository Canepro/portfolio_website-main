import Link from 'next/link';
import ProjectMedia from '@/components/ProjectMedia/ProjectMedia';
import { safeExternalHref } from '@/lib/url';
import type { Project } from '@/types/project';
import { cn } from '@/lib/utils';

export function WorkflowFigure({ label = 'Engineering workflow' }: { label?: string }) {
  return (
    <div className="grid min-h-52 content-center gap-5 bg-[color:var(--color-bg-secondary)] p-6 md:p-10">
      <p className="font-mono text-xs text-[color:var(--color-text-secondary)]">{label}</p>
      <ol className="grid gap-3 text-lg md:grid-cols-3 md:gap-6">
        {['Read the source', 'Gather evidence', 'Verify the outcome'].map((step, i) => (
          <li key={step} className="border-t border-[color:var(--color-border)] pt-4">
            <span className="mb-2 block font-mono text-xs text-[color:var(--color-accent)]">
              0{i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PipelineHealerFigure() {
  return (
    <div className="grid aspect-video content-center gap-5 bg-[color:var(--color-bg-secondary)] p-6 lg:p-10">
      <p className="font-mono text-sm font-medium text-[color:var(--color-text-primary)] opacity-80">
        PipelineHealer / controlled remediation flow
      </p>
      <ol className="grid gap-3 text-lg lg:grid-cols-3 lg:gap-6">
        {['Failed CI run', 'Evidence and diagnosis', 'Guarded fix PR or reviewable issue'].map(
          (step, i) => (
            <li key={step} className="border-t border-[color:var(--color-border)] pt-3">
              <span className="mb-1 block font-mono text-sm font-medium text-[color:var(--color-accent)]">
                0{i + 1}
              </span>
              {step}
            </li>
          )
        )}
      </ol>
    </div>
  );
}

// PipelineHealer's dashboard screenshot is unreadable at card size, so its card
// draws PipelineHealerFigure instead. The case study still shows the screenshot.
const isIllustrated = (project: Project) => project.slug === 'pipelinehealer';

/** The image a preview card renders, if any. Use it to pick the card that gets `priority`. */
export const previewImage = (project: Project) =>
  isIllustrated(project) ? undefined : project.media || project.image;

export default function ProjectPreviewCard({
  project,
  priority = false,
  className,
  headingLevel = 3,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const href = `/projects/${encodeURIComponent(project.slug)}`;
  const source = safeExternalHref(project.source);
  const demo = project.deployment?.status === 'live' ? safeExternalHref(project.visit) : undefined;
  const isPipelineHealer = isIllustrated(project);
  const image = previewImage(project);
  return (
    <article
      className={cn(
        'grid gap-6 border-t border-[color:var(--color-border)] py-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 md:py-8',
        className
      )}
    >
      <div className="min-w-0">
        <p className="font-mono text-sm font-medium leading-6 text-[color:var(--color-text-primary)] opacity-80">
          {project.year || project.category}
          {project.deployment?.status === 'retired' ? ' · Hosted demo retired' : ''}
        </p>
        <Heading className="mt-1 text-2xl font-medium tracking-tight md:text-3xl">
          <Link href={href} className="hover:underline underline-offset-4">
            {project.title}
          </Link>
        </Heading>
        <p className="mt-4 max-w-xl leading-7 text-[color:var(--color-text-secondary)]">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link
            href={href}
            className="font-medium underline decoration-[color:var(--color-accent)] underline-offset-4"
          >
            Read case study <span aria-hidden="true">↗</span>
          </Link>
          {source ? (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Source
            </a>
          ) : null}
          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Live demo
            </a>
          ) : null}
        </div>
      </div>
      <figure className="min-w-0">
        <Link
          href={href}
          tabIndex={-1}
          aria-label={`Read ${project.title} case study`}
          className="block"
        >
          {isPipelineHealer ? (
            <PipelineHealerFigure />
          ) : image ? (
            <div className="relative aspect-video bg-[color:var(--color-bg-secondary)]">
              <ProjectMedia
                src={image}
                alt={`${project.title} recorded interface`}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                priority={priority}
                poster={project.image}
                fit="contain"
                className="object-contain"
              />
            </div>
          ) : (
            <WorkflowFigure
              label={
                project.slug === 'codex-skills' ? 'codex-skills / procedure library' : project.title
              }
            />
          )}
        </Link>
        <figcaption className="mt-3 max-w-xl text-xs leading-5 text-[color:var(--color-text-secondary)]">
          {isPipelineHealer
            ? 'Workflow illustration. The case study includes the recorded dashboard and project evidence.'
            : project.evidenceCaption ||
              'Recorded project evidence. Open the case study for architecture, source, and context.'}
        </figcaption>
      </figure>
    </article>
  );
}
