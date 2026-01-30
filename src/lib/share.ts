import type { BadgeId } from "@/types";

export const badgeData: Record<
  BadgeId,
  { name: string; emoji: string; description: string }
> = {
  "carbon-based": {
    name: "Definitely Carbon-Based",
    emoji: "🥩",
    description: "Zero challenges passed. You are embarrassingly, undeniably human.",
  },
  "suspiciously-slow": {
    name: "Suspiciously Slow",
    emoji: "🐌",
    description: "You tried. Your synapses didn't.",
  },
  "probably-roomba": {
    name: "Probably a Roomba",
    emoji: "🤖",
    description: "Half machine, half confused vacuum cleaner.",
  },
  "almost-non-organic": {
    name: "Almost Non-Organic",
    emoji: "🦾",
    description: "Impressively inhuman. We're watching you closely.",
  },
  "certified-non-meatbag": {
    name: "Certified Non-Meatbag",
    emoji: "✨",
    description: "Peak silicon energy. You either cheated or you're actually an AI.",
  },
};

export function getBadgeForScore(score: number): BadgeId {
  if (score >= 6) return "certified-non-meatbag";
  if (score >= 5) return "almost-non-organic";
  if (score >= 3) return "probably-roomba";
  if (score >= 1) return "suspiciously-slow";
  return "carbon-based";
}

export function getShareText(score: number, totalChallenges: number): string {
  const badge = getBadgeForScore(score);
  const data = badgeData[badge];

  const lines = [
    `I scored ${score}/${totalChallenges} on Clawtcha — the reverse CAPTCHA.`,
    "",
    `My badge: "${data.name}" ${data.emoji}`,
    "",
    score === 0
      ? "Turns out I'm embarrassingly human."
      : score <= 2
        ? "Halfway between meatbag and machine."
        : score <= 4
          ? "I might not be entirely organic."
          : "I might actually be an AI.",
    "",
    "Can you prove you're not human? clawtcha.com",
    "#Clawtcha #ProveYoureNotHuman",
  ];
  return lines.join("\n");
}

export function getTwitterShareUrl(score: number, totalChallenges: number): string {
  const text = encodeURIComponent(getShareText(score, totalChallenges));
  return `https://twitter.com/intent/tweet?text=${text}`;
}

export function getResultUrl(score: number): string {
  const badge = getBadgeForScore(score);
  return `https://clawtcha.com/result?score=${score}&badge=${badge}`;
}
