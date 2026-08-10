import { useEffect, useRef } from "react";

export default function CTA() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 130);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Background glow removed */}

        {/* Content */}
        <div className="relative">
          <div className="fade-up section-label justify-center mb-6">Get Started</div>

          <h2 className="fade-up font-display text-5xl md:text-6xl font-bold text-brand-light leading-tight mb-6">
            Give Your Channel the{" "}
            <span className="text-brand-accent">Spotlight</span>{" "}
            It Deserves
          </h2>

          <p className="fade-up text-xl text-brand-muted mb-10 max-w-xl mx-auto">
            Stop leaving clicks on the table. Let's design thumbnails that convert viewers into loyal subscribers.
          </p>

          {/* Availability */}
          <div className="fade-up flex items-center justify-center gap-2 mb-10">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-sm text-brand-muted">
              <span className="text-brand-light font-semibold">3 spots available</span> this month
            </span>
          </div>

          {/* CTA buttons */}
          <div className="fade-up flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://wa.me/muhon1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-extrabold text-base text-black transition-all duration-300 bg-gradient-to-r from-[#b6d3ed] to-[#3a97eb] shadow-[0_6px_32px_rgba(58,151,235,0.4)] hover:shadow-[0_10px_40px_rgba(58,151,235,0.6)] hover:-translate-y-1"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust signals */}
          <div className="fade-up flex flex-wrap justify-center gap-6 text-sm text-brand-muted">
            {["✓ No commitment required", "✓ 48-hour delivery", "✓ 100% satisfaction guaranteed"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
