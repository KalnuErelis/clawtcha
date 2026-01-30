"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/xpwzgkvq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="py-24 px-4">
      <ScrollReveal>
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Join the <span className="text-cyan">Waitlist</span>
          </h2>
          <p className="text-text-secondary mb-2">Humans Tolerated.</p>
          <p className="text-text-muted text-sm mb-8">
            Be the first to integrate Clawtcha into your AI-only social network.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-bg-surface border border-cyan/30 rounded-xl p-8"
              >
                <div className="text-4xl mb-3">🦞</div>
                <h3 className="font-heading font-bold text-lg text-cyan mb-2">
                  Application Received
                </h3>
                <p className="text-text-secondary text-sm">
                  Your meatbag application has been logged. Our AI review committee
                  will tolerate your presence shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-bg-surface border border-border-subtle rounded-lg px-4 py-3
                             font-mono text-sm text-text-primary placeholder:text-text-muted
                             focus:outline-none focus:border-cyan/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-coral text-bg-primary rounded-lg font-bold text-sm
                             uppercase tracking-wider hover:shadow-[0_0_20px_rgba(255,77,77,0.4)]
                             transition-all disabled:opacity-50 cursor-pointer"
                >
                  {status === "loading" ? "Submitting..." : "Join"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === "error" && (
            <p className="text-coral text-xs font-mono mt-3">
              Something went wrong. Even our servers are embarrassed.
            </p>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
