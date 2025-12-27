import React from 'react';
import OptimizedImage from '../OptimizedImage/OptimizedImage';

type MediaFit = 'cover' | 'contain';

export interface ProjectMediaProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fit?: MediaFit;
  poster?: string;
}

const isVideoSrc = (src: string): boolean => /\.(mp4|webm)$/i.test(src);

const getVideoMimeType = (src: string): string => {
  const lower = src.toLowerCase();
  if (lower.endsWith('.webm')) return 'video/webm';
  return 'video/mp4';
};

const ProjectMedia: React.FC<ProjectMediaProps> = ({
  src,
  alt,
  fill = false,
  priority = false,
  sizes,
  className = '',
  fit = 'cover',
  poster,
}) => {
  if (isVideoSrc(src)) {
    // For "fill" layout we need a positioned wrapper that matches next/image behavior.
    const wrapperClassName = fill ? 'absolute inset-0' : undefined;
    const objectFitClass = fit === 'contain' ? 'object-contain' : 'object-cover';
    const preload = priority ? 'auto' : 'metadata';

    return (
      <div className={wrapperClassName}>
        <video
          aria-label={alt}
          className={['h-full w-full', objectFitClass, className].filter(Boolean).join(' ')}
          autoPlay
          muted
          loop
          playsInline
          preload={preload}
          poster={poster}
        >
          <source src={src} type={getVideoMimeType(src)} />
        </video>
      </div>
    );
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
      style={{ objectFit: fit }}
    />
  );
};

export default ProjectMedia;
