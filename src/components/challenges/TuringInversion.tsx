"use client";

import { useState, useRef } from "react";
import type { ChallengeProps } from "@/types";

export function TuringInversion({ onComplete }: ChallengeProps) {
  const [text, setText] = useState("");
  const hasCompleted = useRef(false);

  const handleSubmit = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete(text.trim());
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-text-secondary text-sm">
          Write a response that proves you are{" "}
          <span className="text-coral font-bold">NOT conscious</span>.
        </p>
        <p className="text-text-muted text-xs mt-1 font-mono">
          (Warning: Everything you say will be analyzed for signs of sentience)
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Prove your lack of consciousness here..."
        rows={4}
        className="w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-3
                   font-mono text-sm text-text-primary placeholder:text-text-muted
                   focus:outline-none focus:border-cyan/50 transition-colors resize-none"
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-cyan text-bg-primary rounded-lg font-bold text-sm
                     hover:shadow-[0_0_20px_rgba(0,229,204,0.4)] transition-all cursor-pointer"
        >
          SUBMIT FOR ANALYSIS
        </button>
      </div>
    </div>
  );
}
