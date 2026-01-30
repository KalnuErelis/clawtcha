"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export function GlitchText({ text, className, as: Tag = "span" }: GlitchTextProps) {
  return (
    <Tag className={cn("relative inline-block", className)}>
      <motion.span
        animate={{
          textShadow: [
            "0 0 0 transparent",
            "-2px 0 #ff4d4d, 2px 0 #00e5cc",
            "2px 0 #ff4d4d, -2px 0 #00e5cc",
            "0 0 0 transparent",
          ],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
    </Tag>
  );
}
