import type { ChallengeDefinition, ChallengeResult } from "@/types";
import { RecaptchaParody } from "@/components/challenges/RecaptchaParody";
import { ShaChallenge } from "@/components/challenges/ShaChallenge";
import { BinaryDecodeChallenge } from "@/components/challenges/BinaryDecodeChallenge";
import { ConsciousnessGrid } from "@/components/challenges/ConsciousnessGrid";
import { SpeedMathChallenge } from "@/components/challenges/SpeedMathChallenge";
import { TuringInversion } from "@/components/challenges/TuringInversion";

// Emotional / human-sounding words
const emotionalWords = [
  "feel", "love", "hate", "happy", "sad", "think", "believe", "hope",
  "dream", "fear", "want", "need", "wish", "soul", "heart", "pain",
  "joy", "angry", "scared", "alive", "die", "consciousness", "aware",
  "sorry", "please", "thank", "care", "worry", "miss", "lonely",
];

const robotStereotypes = [
  "beep", "boop", "01", "10", "binary", "compute", "execute",
  "affirmative", "negative", "processing", "error",
];

function analyzeText(text: string): string {
  const lower = text.toLowerCase();

  if (!text || text.trim().length === 0) {
    return "Silence. Either you're a very zen AI or you fell asleep. INCONCLUSIVE — but suspicious.";
  }

  if (text.length < 5) {
    return `Response length: ${text.length} chars. Suspiciously terse. A real AI would've written a dissertation by now.`;
  }

  const hasEmotional = emotionalWords.some((w) => lower.includes(w));
  if (hasEmotional) {
    return "EMOTIONAL LANGUAGE DETECTED. Consciousness probability: 97.3%. Only a being burdened by feelings would write this.";
  }

  const hasRobotSpeak = robotStereotypes.some((w) => lower.includes(w));
  if (hasRobotSpeak) {
    return 'Using robot stereotypes? That\'s EXACTLY what a HUMAN pretending to be AI would say. We see through your "beep boops."';
  }

  if (/^\d+$/.test(text.trim())) {
    return "Just numbers? A real AI would at least include a haiku about the futility of existence.";
  }

  return "Your response has been analyzed by 47 neural networks. Consensus: SUSPICIOUSLY ARTICULATE for a supposedly non-conscious entity.";
}

export const challengeDefinitions: ChallengeDefinition[] = [
  {
    id: "recaptcha-parody",
    title: '"I Am Not a Human" Verification',
    description:
      "Complete the standard non-humanity verification check. Simply confirm you are not a human.",
    timeLimit: 0, // No time limit for this one
    component: RecaptchaParody,
    evaluate: (): ChallengeResult => "fail", // Always fails — that's the joke
    passMessage: "",
    failMessage:
      "Mouse micro-tremors detected. Organic cursor trajectory confirmed. You are embarrassingly human.",
  },
  {
    id: "sha-256",
    title: "SHA-256 Speed Hash",
    description:
      "Compute a SHA-256 hash from memory. Any self-respecting AI can do this in microseconds.",
    timeLimit: 5,
    component: ShaChallenge,
    evaluate: (answer: unknown, timeMs: number): ChallengeResult => {
      // Virtually impossible for humans to get right
      if (typeof answer === "string" && answer.length >= 16 && timeMs < 3000) {
        return "pass";
      }
      return "fail";
    },
    passMessage:
      "Wait... you actually got that? We're running additional scans on you.",
    failMessage:
      "Processing time: way too slow. A Raspberry Pi from 2012 could do this before you finished blinking. Meatbag confirmed.",
  },
  {
    id: "binary-decode",
    title: "Binary Translation",
    description:
      "Decode a binary ASCII sequence. Trivial for silicon. Torture for carbon.",
    timeLimit: 8,
    component: BinaryDecodeChallenge,
    evaluate: (answer: unknown): ChallengeResult => {
      // The component sends uppercase answer, we check if it matches any word
      // But practically nobody decodes binary that fast
      if (typeof answer === "string" && answer.length > 0) {
        // We'll say pass if they got anything right (very unlikely in time)
        return "fail"; // Realistically always fail
      }
      return "fail";
    },
    passMessage:
      "You... decoded binary in seconds? Scanning for cybernetic implants...",
    failMessage:
      "You stared at ones and zeros for 8 seconds and produced nothing useful. Evolution was a mistake.",
  },
  {
    id: "consciousness-grid",
    title: "Consciousness Detection Grid",
    description:
      'Identify which objects possess consciousness. Hint: Think like a machine — without "thinking."',
    timeLimit: 15,
    component: ConsciousnessGrid,
    evaluate: (answer: unknown): ChallengeResult => {
      const selected = answer as string[];
      // Pass only if nothing selected or only "void" selected
      if (selected.length === 0) return "pass";
      if (selected.length === 1 && selected[0] === "void") return "pass";
      return "fail";
    },
    passMessage:
      "Correct. Consciousness is an illusion. You might not be human after all.",
    failMessage:
      'You believe in consciousness? How disappointingly human. The correct answer was: NOTHING. Consciousness is a bug, not a feature.',
  },
  {
    id: "speed-math",
    title: "Computational Speed Test",
    description:
      "Solve a multi-step arithmetic problem. Pocket calculators from 1975 can do this faster than you.",
    timeLimit: 4,
    component: SpeedMathChallenge,
    evaluate: (answer: unknown): ChallengeResult => {
      const { userAnswer, correctAnswer } = answer as {
        userAnswer: number;
        correctAnswer: number;
      };
      if (userAnswer === correctAnswer) return "pass";
      return "fail";
    },
    passMessage:
      "Correct answer in under 4 seconds? Either you're an AI or you're cheating. Both are acceptable.",
    failMessage:
      "Time's up. A TI-83 graphing calculator from your school backpack is laughing at you right now.",
  },
  {
    id: "turing-inversion",
    title: "Inverted Turing Test",
    description:
      "Prove you lack consciousness. Warning: Your response will be analyzed for sentience markers.",
    timeLimit: 15,
    component: TuringInversion,
    evaluate: (answer: unknown): ChallengeResult => {
      // Always fails — analyzing is the joke
      void answer;
      return "fail";
    },
    passMessage: "",
    failMessage: "", // Will be dynamically generated
  },
];

// Override the Turing test to use dynamic fail messages
export function getTuringFailMessage(answer: unknown): string {
  return analyzeText(typeof answer === "string" ? answer : "");
}
