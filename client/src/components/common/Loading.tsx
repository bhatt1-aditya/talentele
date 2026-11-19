import type { ComponentProps } from "react";
import { cn } from "@/lib/utilities";

type LoadingProps = ComponentProps<"div"> & {
  label?: string;
  className?: string;
};

/**
 * Standardized loading indicator for Suspense fallbacks and async UI transitions.
 */
export function Loading({ label = "Loading...", className, ...props }: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-32 flex-col items-center justify-center gap-3 p-8 text-center text-sm text-[#667085]",
        className
      )}
      {...props}
    >
      <span
        className="size-6 animate-spin rounded-full border-2 border-red-600/30 border-t-red-600"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}

export default Loading;

