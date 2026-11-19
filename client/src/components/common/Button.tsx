import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utilities";

export type ButtonVariant = "primary" | "secondary" | "outline-dark" | "white";
type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold transition-colors duration-200 ease-[var(--ease-out-soft)] disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-600 active:bg-brand-700",
  secondary: "border border-ink/15 bg-white text-ink hover:border-ink/40 hover:bg-mist",
  "outline-dark": "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  white: "bg-white text-ink hover:bg-mist",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-[0.95rem]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", size = "md", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
