import type { Metadata } from "next";
import { badgeData, getBadgeForScore } from "@/lib/share";

interface ResultPageProps {
  searchParams: Promise<{ score?: string; badge?: string }>;
}

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const score = parseInt(params.score || "0", 10);
  const badge = getBadgeForScore(score);
  const data = badgeData[badge];

  return {
    title: `"${data.name}" — Clawtcha Result`,
    description: `Scored ${score}/6 on the reverse CAPTCHA. Badge: ${data.name}. Can you prove you're not human?`,
    openGraph: {
      title: `I'm "${data.name}" ${data.emoji} — Clawtcha`,
      description: `Scored ${score}/6 on the reverse CAPTCHA. Are you human too?`,
      url: `https://clawtcha.com/result?score=${score}&badge=${badge}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `I'm "${data.name}" ${data.emoji} — Clawtcha`,
      description: `Scored ${score}/6 on the reverse CAPTCHA. Are you human too?`,
    },
  };
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const score = parseInt(params.score || "0", 10);
  const badge = getBadgeForScore(score);
  const data = badgeData[badge];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-bg-surface border border-border-subtle rounded-2xl p-8 md:p-12">
          <div className="text-6xl mb-4">{data.emoji}</div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
            {data.name}
          </h1>
          <p className="text-text-secondary text-sm mb-6">{data.description}</p>

          <div className="bg-bg-primary rounded-xl p-6 mb-8">
            <div className="font-mono text-4xl font-bold">
              <span className={score > 3 ? "text-cyan" : "text-coral"}>
                {score}
              </span>
              <span className="text-text-muted"> / 6</span>
            </div>
            <p className="text-text-muted text-xs font-mono mt-2">
              CHALLENGES PASSED
            </p>
          </div>

          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-coral
                       text-bg-primary rounded-lg font-bold text-sm transition-all
                       hover:shadow-[0_0_20px_rgba(255,77,77,0.4)]"
          >
            Take the Test Yourself
          </a>
        </div>

        <p className="text-text-muted text-xs font-mono mt-6">
          🦞 clawtcha.com — Part of the OpenClaw ecosystem
        </p>
      </div>
    </div>
  );
}
