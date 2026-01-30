"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl">🦞</span>
          <span className="font-mono font-bold text-text-primary tracking-wider text-sm">
            CLAWTCHA
          </span>
        </a>

        <nav className="flex items-center gap-4">
          <a
            href="https://github.com/KalnuErelis/clawtcha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary text-sm hover:text-text-primary transition-colors hidden sm:block"
          >
            GitHub
          </a>
          <a
            href="https://openclaw.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary text-sm hover:text-text-primary transition-colors hidden sm:block"
          >
            OpenClaw
          </a>
          <a
            href="#demo"
            className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider
                       bg-coral text-bg-primary rounded-md
                       hover:shadow-[0_0_20px_rgba(255,77,77,0.4)] transition-all"
          >
            Take the Test
          </a>
        </nav>
      </div>
    </header>
  );
}
