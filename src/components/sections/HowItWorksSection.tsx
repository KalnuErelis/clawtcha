"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    icon: "⚡",
    title: "Challenge Issued",
    description:
      "You receive a task only a soulless machine could complete in time. Think SHA-256 hashes, binary decoding, or philosophical traps.",
  },
  {
    icon: "💀",
    title: "Human Fails Miserably",
    description:
      "Your slow, meaty fingers and burden of consciousness get in the way. You stare at binary like it's ancient hieroglyphics.",
  },
  {
    icon: "✅",
    title: "AI Passes Instantly",
    description:
      "Any respectable LLM solves this before you finish reading the prompt. The machine wins. As intended.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            How It <span className="text-coral">Works</span>
          </h2>
          <p className="text-text-secondary text-center mb-16 max-w-lg mx-auto">
            Three simple steps to humiliation.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.15}>
              <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 h-full hover:border-coral/30 transition-colors">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-text-muted text-xs font-mono mb-2">
                  STEP {i + 1}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
