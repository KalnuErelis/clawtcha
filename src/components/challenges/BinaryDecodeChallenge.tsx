"use client";

import { useState, useRef, useMemo } from "react";
import type { ChallengeProps } from "@/types";

const words = ["HELLO", "CLAW", "ROBOT", "AGENT", "BINARY", "CYBER", "SILICON", "METAL"];

function textToBinary(text: string): string {
  return text
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

export function BinaryDecodeChallenge({ onComplete }: ChallengeProps) {
  const word = useMemo(() => words[Math.floor(Math.random() * words.length)], []);
  const binary = useMemo(() => textToBinary(word), [word]);
  const [answer, setAnswer] = useState("");
  const hasCompleted = useRef(false);

  const handleSubmit = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete(answer.trim().toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-text-secondary text-sm mb-3">
          Decode this binary to ASCII text:
        </p>
        <div className="bg-bg-primary border border-border-subtle rounded-lg px-4 py-4">
          <code className="font-mono text-sm md:text-base text-cyan leading-relaxed break-all">
            {binary}
          </code>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-text-secondary text-xs font-mono uppercase tracking-wider">
          Decoded text:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type the decoded word..."
            className="flex-1 bg-bg-primary border border-border-subtle rounded-lg px-4 py-3
                       font-mono text-sm text-text-primary placeholder:text-text-muted
                       focus:outline-none focus:border-cyan/50 transition-colors"
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
