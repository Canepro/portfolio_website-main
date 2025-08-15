import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold",
        variant === "default"
          ? "bg-[var(--color-accent)] text-white"
          : "bg-[var(--color-accent-secondary)] text-white",
        className
      )}
      {...props}
    />
  );
}
