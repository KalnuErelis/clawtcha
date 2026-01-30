export type ChallengeState =
  | "idle"
  | "intro"
  | "active"
  | "evaluating"
  | "result"
  | "complete";

export type ChallengeResult = "pass" | "fail" | "timeout";

export interface ChallengeProps {
  onComplete: (answer: unknown) => void;
  timeRemaining: number;
  isActive: boolean;
}

export interface ChallengeDefinition {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  component: React.ComponentType<ChallengeProps>;
  evaluate: (answer: unknown, timeMs: number) => ChallengeResult;
  passMessage: string;
  failMessage: string;
}

export interface ChallengeResultEntry {
  challengeId: string;
  result: ChallengeResult;
  timeMs: number;
}

export type BadgeId =
  | "carbon-based"
  | "suspiciously-slow"
  | "probably-roomba"
  | "almost-non-organic"
  | "certified-non-meatbag";

export interface Badge {
  id: BadgeId;
  name: string;
  emoji: string;
  description: string;
  minScore: number;
  maxScore: number;
}
