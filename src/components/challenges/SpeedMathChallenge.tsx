"use client";

import { useState, useMemo, useRef } from "react";
import type { ChallengeProps } from "@/types";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const a = randInt(100, 999);
  const b = randInt(100, 999);
  const c = randInt(100, 9999);
  const d = randInt(10, 999);
  const answer = a * b + c - d;
  const display = `${a} × ${b} + ${c.toLocaleString()} − ${d}`;
  return { display, answer };
}

export function SpeedMathChallenge({ onComplete }: ChallengeProps) {
  const problem = useMemo(generateProblem, []);
  const [answer, setAnswer] = useState("");
  const hasCompleted = useRef(false);

  const handleSubmit = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete({ userAnswer: parseInt(answer, 10), correctAnswer: problem.answer });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-text-secondary text-sm mb-3">
          Solve this equation:
        </p>
        <div className="bg-bg-primary border border-border-subtle rounded-lg px-6 py-6">
          <code className="font-mono text-xl md:text-3xl text-cyan font-bold">
            {problem.display}
          </code>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-text-secondary text-xs font-mono uppercase tracking-wider">
          Your answer:
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="= ?"
            className="flex-1 bg-bg-primary border border-border-subtle rounded-lg px-4 py-3
                       font-mono text-lg text-text-primary placeholder:text-text-muted
                       focus:outline-none focus:border-cyan/50 transition-colors
                       [&::-webkit-inner-spin-button]:appearance-none"
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
    </div>
  );
}
