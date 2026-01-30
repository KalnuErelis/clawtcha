"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { useChallenge } from "@/hooks/useChallenge";
import { useTimer } from "@/hooks/useTimer";
import { challengeDefinitions, getTuringFailMessage } from "@/lib/challenges";
import { badgeData, getBadgeForScore, getTwitterShareUrl } from "@/lib/share";
import { ChallengeShell } from "@/components/challenges/ChallengeShell";
import { GlowButton } from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

export function DemoSection() {
  const challenge = useChallenge(challengeDefinitions);
  const timer = useTimer(challenge.currentChallenge?.timeLimit ?? 0);
  const [resultMessage, setResultMessage] = useState("");

  // Start timer when challenge becomes active
  useEffect(() => {
    if (challenge.state === "active" && challenge.currentChallenge?.timeLimit) {
      timer.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge.state, challenge.currentIndex]);

  // Handle timeout
  useEffect(() => {
    if (timer.isExpired && challenge.state === "active") {
      challenge.handleTimeout();
      setResultMessage(
        challenge.currentChallenge?.failMessage ||
        "Time's up. A calculator from 1975 is embarrassed for you."
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.isExpired]);

  const handleSubmitAnswer = useCallback(
    (answer: unknown) => {
      timer.stop();
      challenge.submitAnswer(answer);

      const def = challenge.currentChallenge;
      if (!def) return;

      // Special handling for Turing test
      if (def.id === "turing-inversion") {
        setResultMessage(getTuringFailMessage(answer));
        return;
      }

      const result = def.evaluate(answer, Date.now());
      setResultMessage(
        result === "pass" ? def.passMessage : def.failMessage
      );
    },
    [challenge, timer]
  );

  // Set result message for non-submit results
  useEffect(() => {
    if (challenge.state === "result" && !resultMessage) {
      const def = challenge.currentChallenge;
      if (def) {
        setResultMessage(
          challenge.lastResult === "pass" ? def.passMessage : def.failMessage
        );
      }
    }
  }, [challenge.state, challenge.lastResult, challenge.currentChallenge, resultMessage]);

  const handleNext = useCallback(() => {
    timer.reset();
    setResultMessage("");
    challenge.nextChallenge();
  }, [challenge, timer]);

  // Confetti on complete
  useEffect(() => {
    if (challenge.isComplete) {
      confetti({
        particleCount: challenge.score > 3 ? 150 : 50,
        spread: 70,
        origin: { y: 0.6 },
        colors:
          challenge.score > 3
            ? ["#00e5cc", "#14b8a6", "#0d6e63"]
            : ["#ff4d4d", "#e63946", "#991b1b"],
      });
    }
  }, [challenge.isComplete, challenge.score]);

  // IDLE state — show start button
  if (challenge.state === "idle") {
    return (
      <section id="demo" className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            The <span className="text-coral">Test</span>
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            6 challenges. Each designed to separate silicon from carbon.
            Most humans score 0/6. Ready to fail?
          </p>
          <GlowButton
            variant="cyan"
            size="lg"
            onClick={challenge.startSession}
          >
            Begin Verification
          </GlowButton>
        </div>
      </section>
    );
  }

  // COMPLETE state — show results
  if (challenge.isComplete) {
    const badge = getBadgeForScore(challenge.score);
    const data = badgeData[badge];
    const shareUrl = getTwitterShareUrl(challenge.score, challenge.totalChallenges);

    return (
      <section id="demo" className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="bg-bg-surface border border-border-subtle rounded-2xl p-8 md:p-12">
            <div className="text-6xl mb-4">{data.emoji}</div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                {data.name}
              </h2>
              <p className="text-text-secondary text-sm mb-6">{data.description}</p>
            </motion.div>

            <div className="bg-bg-primary rounded-xl p-6 mb-8">
              <div className="font-mono text-4xl font-bold">
                <span className={challenge.score > 3 ? "text-cyan" : "text-coral"}>
                  {challenge.score}
                </span>
                <span className="text-text-muted"> / {challenge.totalChallenges}</span>
              </div>
              <p className="text-text-muted text-xs font-mono mt-2">
                CHALLENGES PASSED
              </p>
            </div>

            {/* Score breakdown */}
            <div className="grid grid-cols-6 gap-1.5 mb-8">
              {challenge.results.map((r, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 rounded-full",
                    r.result === "pass" ? "bg-cyan" : "bg-coral/50"
                  )}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan
                           text-bg-primary rounded-lg font-bold text-sm transition-all
                           hover:shadow-[0_0_20px_rgba(0,229,204,0.4)]"
              >
                Share on 𝕏
              </a>
              <GlowButton
                variant="ghost"
                onClick={challenge.resetSession}
              >
                Try Again
              </GlowButton>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // INTRO state — show challenge description
  if (challenge.state === "intro") {
    const def = challenge.currentChallenge;
    if (!def) return null;

    return (
      <section id="demo" className="py-24 px-4">
        <motion.div
          key={`intro-${challenge.currentIndex}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="text-text-muted text-xs font-mono mb-4">
            CHALLENGE {challenge.currentIndex + 1} / {challenge.totalChallenges}
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            {def.title}
          </h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            {def.description}
          </p>
          {def.timeLimit > 0 && (
            <p className="text-coral text-sm font-mono mb-6">
              ⏱ Time limit: {def.timeLimit} seconds
            </p>
          )}
          <GlowButton
            variant="coral"
            onClick={challenge.beginChallenge}
          >
            Start Challenge
          </GlowButton>
        </motion.div>
      </section>
    );
  }

  // ACTIVE / RESULT states — show challenge
  const CurrentComponent = challenge.currentChallenge?.component;
  if (!CurrentComponent || !challenge.currentChallenge) return null;

  return (
    <section id="demo" className="py-24 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={`challenge-${challenge.currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ChallengeShell
            title={challenge.currentChallenge.title}
            currentStep={challenge.currentIndex}
            totalSteps={challenge.totalChallenges}
            timeRemaining={timer.timeRemaining}
            timeLimit={challenge.currentChallenge.timeLimit}
            isActive={challenge.state === "active"}
            resultState={challenge.state === "result" ? (challenge.lastResult ?? "fail") : null}
            resultMessage={resultMessage}
            onNext={handleNext}
          >
            <CurrentComponent
              onComplete={handleSubmitAnswer}
              timeRemaining={timer.timeRemaining}
              isActive={challenge.state === "active"}
            />
          </ChallengeShell>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
