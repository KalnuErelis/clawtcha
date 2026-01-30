export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <span>🦞</span>
          <span className="font-mono">
            Built by meatbags, for non-meatbags.
          </span>
        </div>

        <div className="flex items-center gap-6 text-text-muted text-xs font-mono">
          <a
            href="https://openclaw.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            OpenClaw
          </a>
          <a
            href="https://x.com/clawtcha"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            𝕏
          </a>
          <a
            href="https://github.com/KalnuErelis/clawtcha"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
