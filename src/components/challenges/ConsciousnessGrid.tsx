"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ChallengeProps } from "@/types";

const gridItems = [
  { id: "brain", emoji: "🧠", label: "Brain" },
  { id: "cpu", emoji: "🔲", label: "CPU" },
  { id: "robot", emoji: "🤖", label: "Robot" },
  { id: "cloud", emoji: "☁️", label: "Cloud" },
  { id: "toaster", emoji: "🍞", label: "Toaster" },
  { id: "rock", emoji: "🪨", label: "Rock" },
  { id: "human", emoji: "🧍", label: "Human" },
  { id: "cat", emoji: "🐈", label: "Cat" },
  { id: "tree", emoji: "🌳", label: "Tree" },
  { id: "bulb", emoji: "💡", label: "Lightbulb" },
  { id: "code", emoji: "{ }", label: "Code" },
  { id: "wifi", emoji: "📡", label: "Signal" },
  { id: "mushroom", emoji: "🍄", label: "Mushroom" },
  { id: "wave", emoji: "〰️", label: "Quantum" },
  { id: "void", emoji: "⬛", label: "Void" },
  { id: "question", emoji: "❓", label: "Unknown" },
];

export function ConsciousnessGrid({ onComplete }: ChallengeProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const hasCompleted = useRef(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete(Array.from(selected));
  };

  return (
    <div className="space-y-6">
      <p className="text-text-secondary text-sm text-center">
        Select all squares that contain <span className="text-coral font-bold">consciousness</span>.
      </p>

      <div className="grid grid-cols-4 gap-2">
        {gridItems.map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle(item.id)}
            className={cn(
              "aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-1",
              "transition-all cursor-pointer text-2xl",
              selected.has(item.id)
                ? "border-coral bg-coral/10 shadow-[0_0_15px_rgba(255,77,77,0.2)]"
                : "border-border-subtle bg-bg-primary hover:border-text-muted"
            )}
          >
            <span>{item.emoji}</span>
            <span className="text-[9px] text-text-muted font-mono">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-text-muted text-xs font-mono">
          {selected.size} selected
        </span>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-cyan text-bg-primary rounded-lg font-bold text-sm
                     hover:shadow-[0_0_20px_rgba(0,229,204,0.4)] transition-all cursor-pointer"
        >
          VERIFY
        </button>
      </div>
    </div>
  );
}
