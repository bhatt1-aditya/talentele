import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utilities";

type ContainerProps = ComponentProps<"div"> & {
  className?: string;
  children: ReactNode;
};

/**
 * Standardized responsive layout container (.shell) enforcing uniform
 * max-width (1280px) and gutters across all pages.
 */
export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("shell", className)} {...props}>
      {children}
    </div>
  );
}

export default Container;

