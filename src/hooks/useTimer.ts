"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useTimer(initialSeconds: number) {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setTimeRemaining(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    stop();
    setTimeRemaining(initialSeconds);
  }, [initialSeconds, stop]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0.1) {
          setIsRunning(false);
          return 0;
        }
        return Math.max(0, prev - 0.1);
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return {
    timeRemaining: Math.round(timeRemaining * 10) / 10,
    isRunning,
    isExpired: timeRemaining <= 0,
    start,
    stop,
    reset,
  };
}
