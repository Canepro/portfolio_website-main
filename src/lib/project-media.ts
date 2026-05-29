export type MediaFit = 'cover' | 'contain';

const ANIMATED_EXT = /\.(gif|mp4|webm)$/i;

export function isAnimatedMediaSrc(src: string): boolean {
  return ANIMATED_EXT.test(src);
}

export function projectMediaFit(src: string): MediaFit {
  return isAnimatedMediaSrc(src) ? 'contain' : 'cover';
}
