import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-sm",
        variant === "default"
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          : "bg-gradient-to-r from-gray-600 to-gray-700 text-white",
        className
      )}
      {...props}
    />
  );
}
