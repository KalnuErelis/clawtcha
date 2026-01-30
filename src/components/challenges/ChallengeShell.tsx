"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ChallengeShellProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  timeRemaining: number;
  timeLimit: number;
  isActive: boolean;
  resultState: "pass" | "fail" | "timeout" | null;
  resultMessage: string;
  onNext: () => void;
  children: React.ReactNode;
}

export function ChallengeShell({
  title,
  currentStep,
  totalSteps,
  timeRemaining,
  timeLimit,
  isActive,
  resultState,
  resultMessage,
  onNext,
  children,
}: ChallengeShellProps) {
  const progress = ((currentStep) / totalSteps) * 100;
  const timeProgress = timeLimit > 0 ? (timeRemaining / timeLimit) * 100 : 100;
  const isUrgent = timeRemaining <= 3 && timeRemaining > 0;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-text-secondary mb-2 font-mono">
          <span>CHALLENGE {currentStep + 1} / {totalSteps}</span>
          {isActive && timeLimit > 0 && (
            <span className={cn(isUrgent && "text-coral animate-pulse")}>
              {timeRemaining.toFixed(1)}s
            </span>
          )}
        </div>
        <div className="h-1 bg-bg-elevated rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        {/* Time bar */}
        {isActive && timeLimit > 0 && (
          <div className="h-0.5 bg-bg-elevated rounded-full overflow-hidden mt-1">
            <motion.div
              className={cn(
                "h-full rounded-full transition-colors",
                isUrgent ? "bg-coral" : "bg-cyan/50"
              )}
              style={{ width: `${timeProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Challenge title */}
      <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-6 text-center">
        {title}
      </h3>

      {/* Challenge content */}
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 md:p-8">
        {children}
      </div>

      {/* Result overlay */}
      <AnimatePresence>
        {resultState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div
              className={cn(
                "absolute inset-0 rounded-xl",
                resultState === "pass"
                  ? "bg-cyan/10 backdrop-blur-sm"
                  : "bg-coral/10 backdrop-blur-sm"
              )}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className={cn(
                "relative z-20 text-center p-8 rounded-xl border max-w-md",
                resultState === "pass"
                  ? "bg-bg-surface border-cyan/30"
                  : "bg-bg-surface border-coral/30"
              )}
            >
              <div className="text-5xl mb-4">
                {resultState === "pass" ? "✅" : resultState === "timeout" ? "⏰" : "❌"}
              </div>
              <div
                className={cn(
                  "font-heading font-bold text-lg mb-2",
                  resultState === "pass" ? "text-cyan" : "text-coral"
                )}
              >
                {resultState === "pass"
                  ? "PASS"
                  : resultState === "timeout"
                    ? "TIME'S UP"
                    : "FAIL"}
              </div>
              <p className="text-text-secondary text-sm font-mono leading-relaxed mb-6">
                {resultMessage}
              </p>
              <button
                onClick={onNext}
                className={cn(
                  "px-6 py-2 rounded-lg font-bold text-sm font-heading uppercase tracking-wider transition-all cursor-pointer",
                  resultState === "pass"
                    ? "bg-cyan text-bg-primary hover:shadow-[0_0_20px_rgba(0,229,204,0.4)]"
                    : "bg-coral text-bg-primary hover:shadow-[0_0_20px_rgba(255,77,77,0.4)]"
                )}
              >
                {resultState === "pass" ? "NEXT →" : "NEXT ANYWAY →"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
