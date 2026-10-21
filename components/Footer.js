import { WHATSAPP_URL } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-10 pb-36 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a
          href="#home-section"
          className="inline-flex items-center min-h-[44px] font-display text-xl font-bold tracking-tight text-white rounded outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent-soft)]"
        >
          Mahbub <span className="text-[var(--brand-accent-soft)]">Muhon</span>
        </a>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-[44px] px-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors duration-200 rounded outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent-soft)]"
        >
          WhatsApp: @muhon1
          <span className="sr-only">(opens in a new tab)</span>
        </a>

        <p className="text-sm text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} Mahbub Muhon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
