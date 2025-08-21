import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const baseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: 'none',
  textDecoration: 'none',
  outline: 'none',
};

const variantStyles = {
  default: {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
  },
  secondary: {
    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
    color: 'white',
    boxShadow: '0 4px 14px 0 rgba(107, 114, 128, 0.4)',
  },
  outline: {
    background: 'transparent',
    border: '2px solid #3b82f6',
    color: '#3b82f6',
    boxShadow: '0 2px 8px 0 rgba(59, 130, 246, 0.2)',
  },
  ghost: {
    background: 'transparent',
    color: '#6b7280',
    border: 'none',
  },
};

const sizeStyles = {
  sm: { height: '36px', padding: '0 16px', fontSize: '14px' },
  md: { height: '44px', padding: '0 24px', fontSize: '16px' },
  lg: { height: '48px', padding: '0 32px', fontSize: '18px' },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    
    const combinedStyles = {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style,
    };
    
    return (
      <Comp
        ref={ref}
        style={combinedStyles}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
