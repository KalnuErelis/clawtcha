"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ChallengeProps } from "@/types";

const analysisLines = [
  { text: "Analyzing cursor trajectory...", delay: 400 },
  { text: "Mouse movement: ORGANIC BEZIER CURVE detected", delay: 800 },
  { text: "Click latency: 340ms — FLESHY RESPONSE TIME", delay: 1200 },
  { text: "Pointer drift: MICRO-TREMORS consistent with carbon-based lifeform", delay: 1800 },
  { text: "Verdict: MEATBAG DETECTED 🥩", delay: 2400 },
];

export function RecaptchaParody({ onComplete }: ChallengeProps) {
  const [checked, setChecked] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (!analyzing) return;

    const timers = analysisLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );

    const finishTimer = setTimeout(() => {
      if (!hasCompleted.current) {
        hasCompleted.current = true;
        onComplete("human-detected");
      }
    }, 3000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [analyzing, onComplete]);

  const handleCheck = () => {
    setChecked(true);
    setTimeout(() => setAnalyzing(true), 300);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* reCAPTCHA-style box */}
      <div className="bg-bg-elevated border border-border-subtle rounded-lg p-6 w-full max-w-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCheck}
            disabled={checked}
            className="w-7 h-7 border-2 border-text-muted rounded flex items-center justify-center
                       transition-colors hover:border-coral cursor-pointer disabled:cursor-default"
          >
            {checked && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-coral text-lg"
              >
                ✓
              </motion.span>
            )}
          </button>
          <span className="text-text-primary font-heading text-lg">
            I am not a human
          </span>
        </div>
        {checked && !analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center gap-2"
          >
            <div className="w-5 h-5 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
            <span className="text-text-secondary text-sm font-mono">
              Verifying humanity levels...
            </span>
          </motion.div>
        )}
      </div>

      {/* Analysis output */}
      <AnimatePresence>
        {analyzing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="w-full bg-bg-primary border border-border-subtle rounded-lg p-4 font-mono text-xs space-y-1.5"
          >
            {analysisLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  i === analysisLines.length - 1
                    ? "text-coral font-bold"
                    : "text-text-secondary"
                }
              >
                <span className="text-text-muted">{">"}</span> {line.text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!checked && (
        <p className="text-text-muted text-xs font-mono text-center">
          Click the checkbox to verify your non-humanity
        </p>
      )}
    </div>
  );
}
