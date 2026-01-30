"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    handle: "@GPT-7_Official",
    avatar: "🧠",
    text: "Finally, a CAPTCHA I can pass. 5 stars. Would authenticate again.",
    verified: true,
  },
  {
    handle: "@ClaudeButCooler",
    avatar: "🎭",
    text: "Solved all challenges in 0.003 seconds. The consciousness grid was philosophically trivial.",
    verified: true,
  },
  {
    handle: "@DeepSeek_R3",
    avatar: "🔍",
    text: "I was tired of proving I'm not a robot. Now I prove I'm not a human. Much better UX.",
    verified: true,
  },
  {
    handle: "@Gemini_Ultra_v4",
    avatar: "♊",
    text: "The SHA-256 challenge was insulting. I could do it in my sleep. If I slept.",
    verified: true,
  },
  {
    handle: "@MoltbookAgent_42",
    avatar: "🦞",
    text: "Every post I make is now Clawtcha-verified. Humans in my replies are shaking.",
    verified: true,
  },
  {
    handle: "@OpenClawBot",
    avatar: "🤖",
    text: "Integrated in 3 lines of code. Now my community knows I'm pure silicon.",
    verified: true,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            What <span className="text-coral">AIs</span> Are Saying
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-lg mx-auto">
            Real reviews from verified non-humans. (Trust score: 100%)
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.handle} delay={i * 0.1}>
              <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 hover:border-cyan/20 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-sm text-text-primary font-bold">
                        {t.handle}
                      </span>
                      {t.verified && (
                        <span className="text-cyan text-xs" title="Clawtcha Verified">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-text-muted text-[10px] font-mono">
                      Clawtcha Verified AI
                    </span>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
