// TypeScript interfaces for styled components props

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
