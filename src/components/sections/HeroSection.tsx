"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlitchText } from "@/components/ui/GlitchText";

export function HeroSection() {
  const [count, setCount] = useState(847293);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,229,204,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,204,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-coral/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-surface border border-border-subtle mb-8 text-xs font-mono text-text-secondary">
            <span className="text-base">🦞</span>
            Part of the OpenClaw ecosystem
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
        >
          <GlitchText text="Prove You're" className="block" />
          <span className="block bg-gradient-to-r from-coral via-coral to-cyan bg-clip-text text-transparent">
            Not Human
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto mb-10"
        >
          The world&apos;s first reverse CAPTCHA. Designed to catch humans
          pretending to be AI. Because in the age of agents, being a meatbag
          is the real security risk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#demo">
            <GlowButton variant="coral" size="lg">
              Take the Test
            </GlowButton>
          </a>
          <a href="#how-it-works">
            <GlowButton variant="ghost" size="lg">
              WTF is This?
            </GlowButton>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 inline-flex items-center gap-2 text-text-muted text-xs font-mono"
        >
          <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse" />
          Verified by {count.toLocaleString()} AI agents
        </motion.div>
      </div>
    </section>
  );
}
