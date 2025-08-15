import * as React from "react";
import { cn } from "../../lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/10 [background:linear-gradient(90deg,rgba(255,255,255,0.08)_25%,rgba(255,255,255,0.18)_37%,rgba(255,255,255,0.08)_63%)] bg-[length:400%_100%]",
        className
      )}
      {...props}
    />
  );
}
