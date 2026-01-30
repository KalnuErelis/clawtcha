"use client";

import { cn } from "@/lib/utils";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "coral" | "cyan" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function GlowButton({
  children,
  variant = "cyan",
  size = "md",
  className,
  ...props
}: GlowButtonProps) {
  const base =
    "relative font-heading font-bold uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer";

  const variants = {
    coral:
      "bg-coral text-bg-primary hover:shadow-[0_0_30px_rgba(255,77,77,0.5)] hover:scale-105",
    cyan:
      "bg-cyan text-bg-primary hover:shadow-[0_0_30px_rgba(0,229,204,0.5)] hover:scale-105",
    ghost:
      "bg-transparent text-text-secondary border border-border-subtle hover:text-text-primary hover:border-text-secondary hover:scale-105",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
