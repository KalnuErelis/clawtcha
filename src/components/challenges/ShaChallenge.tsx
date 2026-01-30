"use client";

import { useState, useRef } from "react";
import type { ChallengeProps } from "@/types";

function randomString(len: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#";
  return Array.from({ length: len }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export function ShaChallenge({ onComplete }: ChallengeProps) {
  const [input] = useState(() => randomString(8));
  const [answer, setAnswer] = useState("");
  const hasCompleted = useRef(false);

  const handleSubmit = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete(answer.toLowerCase().trim());
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-text-secondary text-sm mb-3">
          Compute the SHA-256 hash of the following string:
        </p>
        <div className="bg-bg-primary border border-border-subtle rounded-lg px-6 py-4 inline-block">
          <code className="font-mono text-2xl text-cyan font-bold tracking-wider">
            {input}
          </code>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-text-secondary text-xs font-mono uppercase tracking-wider">
          Your answer (first 16 hex chars):
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="e.g. a1b2c3d4e5f6..."
            className="flex-1 bg-bg-primary border border-border-subtle rounded-lg px-4 py-3
                       font-mono text-sm text-text-primary placeholder:text-text-muted
                       focus:outline-none focus:border-cyan/50 transition-colors"
            maxLength={64}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-3 bg-cyan text-bg-primary rounded-lg font-bold text-sm
                       hover:shadow-[0_0_20px_rgba(0,229,204,0.4)] transition-all cursor-pointer"
          >
            SUBMIT
          </button>
        </div>
      </div>

      {/* Hash computed client-side for validation only */}
    </div>
  );
}
