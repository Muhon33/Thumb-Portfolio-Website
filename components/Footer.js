const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Fiverr", href: "https://fiverr.com" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="font-display text-xl font-bold tracking-tight text-white">
          Mahbub <span className="text-blue-400">Muhon</span>
        </a>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-brand-muted hover:text-brand-light transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-brand-muted">
          &copy; {new Date().getFullYear()} Mahbub Muhon - All rights reserved
        </p>
      </div>
    </footer>
  );
}
