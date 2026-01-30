"use client";

import { useState, useCallback, useRef } from "react";
import type { ChallengeDefinition, ChallengeState, ChallengeResultEntry, ChallengeResult, BadgeId } from "@/types";

function getBadge(score: number): BadgeId {
  if (score >= 6) return "certified-non-meatbag";
  if (score >= 5) return "almost-non-organic";
  if (score >= 3) return "probably-roomba";
  if (score >= 1) return "suspiciously-slow";
  return "carbon-based";
}

export function useChallenge(challenges: ChallengeDefinition[]) {
  const [state, setState] = useState<ChallengeState>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ChallengeResultEntry[]>([]);
  const [lastResult, setLastResult] = useState<ChallengeResult | null>(null);
  const startTimeRef = useRef<number>(0);

  const startSession = useCallback(() => {
    setCurrentIndex(0);
    setResults([]);
    setLastResult(null);
    setState("intro");
  }, []);

  const beginChallenge = useCallback(() => {
    startTimeRef.current = Date.now();
    setState("active");
  }, []);

  const submitAnswer = useCallback(
    (answer: unknown) => {
      const timeMs = Date.now() - startTimeRef.current;
      const challenge = challenges[currentIndex];
      const result = challenge.evaluate(answer, timeMs);
      setLastResult(result);
      setResults((prev) => [
        ...prev,
        { challengeId: challenge.id, result, timeMs },
      ]);
      setState("result");
    },
    [challenges, currentIndex]
  );

  const handleTimeout = useCallback(() => {
    const timeMs = challenges[currentIndex].timeLimit * 1000;
    setLastResult("timeout");
    setResults((prev) => [
      ...prev,
      { challengeId: challenges[currentIndex].id, result: "timeout", timeMs },
    ]);
    setState("result");
  }, [challenges, currentIndex]);

  const nextChallenge = useCallback(() => {
    if (currentIndex + 1 >= challenges.length) {
      setState("complete");
    } else {
      setCurrentIndex((i) => i + 1);
      setLastResult(null);
      setState("intro");
    }
  }, [currentIndex, challenges.length]);

  const resetSession = useCallback(() => {
    setCurrentIndex(0);
    setResults([]);
    setLastResult(null);
    setState("idle");
  }, []);

  const score = results.filter((r) => r.result === "pass").length;

  return {
    state,
    currentIndex,
    results,
    lastResult,
    currentChallenge: challenges[currentIndex] ?? null,
    startSession,
    beginChallenge,
    submitAnswer,
    handleTimeout,
    nextChallenge,
    resetSession,
    isComplete: state === "complete",
    score,
    totalChallenges: challenges.length,
    badge: state === "complete" ? getBadge(score) : null,
  };
}
