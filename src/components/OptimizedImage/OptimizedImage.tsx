'use client';

import Image, { type ImageProps } from 'next/image';
import { useState, type CSSProperties } from 'react';

import { cn } from '@/lib/utils';

const toBase64 = (str: string): string =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : btoa(unescape(encodeURIComponent(str)));

const generateBlurDataURL = (width: number = 400, height: number = 300): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#151A22"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
};

export interface OptimizedImageProps extends Omit<
  ImageProps,
  'onLoad' | 'onLoadingComplete' | 'onError' | 'placeholder'
> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  placeholder?: boolean;
  style?: CSSProperties;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  placeholder = true,
  style,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const isGif = src.toLowerCase().endsWith('.gif');
  const blurDataURL = placeholder ? generateBlurDataURL(width, height) : undefined;

  const handleLoaded = () => {
    setLoaded(true);
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
  };

  return (
    <div className={cn('relative h-full w-full overflow-hidden', fill && 'absolute inset-0')}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        onLoad={handleLoaded}
        onError={handleError}
        placeholder={placeholder ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        unoptimized={isGif}
        quality={85}
        className={cn(
          'h-full w-full transition-[filter] duration-300',
          !loaded && 'blur-sm',
          className
        )}
        style={{
          objectFit: 'cover',
          ...style,
        }}
        {...props}
      />
      {placeholder && loading ? (
        <div
          aria-hidden="true"
          className="image-shimmer pointer-events-none absolute inset-0 z-[2]"
        />
      ) : null}
    </div>
  );
}
