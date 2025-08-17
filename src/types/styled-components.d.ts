// TypeScript interfaces for styled components props
import 'styled-components';
import { Theme } from '../themes/default';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export interface SectionProps {
  grid?: boolean;
  row?: boolean;
  nopadding?: boolean;
}

export interface SectionTitleProps {
  main?: boolean;
}

export interface SectionDividerProps {
  colorAlt?: boolean;
  divider?: boolean;
}

export interface ButtonBackProps {
  alt?: boolean;
  form?: boolean;
  disabled?: boolean;
}

export interface ButtonFrontProps {
  alt?: boolean;
  disabled?: boolean;
}

export interface LinkContainerProps {
  large?: boolean;
}

export interface LinkIconImgProps {
  large?: boolean;
  nav?: boolean;
}

export interface CategoryButtonProps {
  active?: boolean;
}

export interface CategoryBadgeProps {
  featured?: boolean;
  category?: string;
}

export interface LinkButtonProps {
  primary?: boolean;
}

// TimeLine component props
export interface CarouselMobileScrollNodeProps {
  final?: boolean;
}

export interface CarouselItemProps {
  active?: number;
  index?: number;
}

export interface CarouselButtonProps {
  active?: number;
  index?: number;
}

export interface CarouselButtonDotProps {
  active?: number;
}