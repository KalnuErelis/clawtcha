"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { badgeData } from "@/lib/share";
import type { BadgeId } from "@/types";

const badgeOrder: BadgeId[] = [
  "certified-non-meatbag",
  "almost-non-organic",
  "probably-roomba",
  "suspiciously-slow",
  "carbon-based",
];

export function BadgeShowcase() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Earn Your <span className="text-cyan">Badge</span>
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-lg mx-auto">
            Your performance determines your classification. Most humans don&apos;t make it past &ldquo;Carbon-Based.&rdquo;
          </p>
        </ScrollReveal>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {badgeOrder.map((id, i) => {
            const badge = badgeData[id];
            return (
              <ScrollReveal key={id} delay={i * 0.1}>
                <div className="min-w-[220px] bg-bg-surface border border-border-subtle rounded-xl p-5 snap-center hover:border-cyan/30 transition-colors">
                  <div className="text-4xl mb-3">{badge.emoji}</div>
                  <h3 className="font-heading font-bold text-sm mb-1">
                    {badge.name}
                  </h3>
                  <p className="text-text-muted text-xs leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
