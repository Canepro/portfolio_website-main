import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary";
}

export function Badge({ className, variant = "default", style, ...props }: BadgeProps) {
  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '9999px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(4px)',
    background: variant === "default" 
      ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
      : 'linear-gradient(135deg, #6b7280, #4b5563)',
    color: 'white',
    ...style,
  };

  return (
    <span
      style={badgeStyles}
      className={className}
      {...props}
    />
  );
}
