import { useEffect, useRef } from "react";

const beforeItems = [
  "Low click-through rate (under 4%)",
  "Generic stock photo thumbnails",
  "Inconsistent visual brand",
  "Getting buried by competitors",
  "No emotional hook or curiosity gap",
];

const afterItems = [
  "CTR consistently above 8–12%",
  "Bold, scroll-stopping compositions",
  "Recognizable channel identity",
  "Standing out in search & browse",
  "Strategic emotional triggers in every design",
];

const metrics = [
  { value: "+127%", label: "Average CTR increase" },
  { value: "+84%", label: "More impressions acted on" },
  { value: "+61%", label: "Channel growth rate" },
];

export default function WhyUs() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
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
    <section id="why" ref={ref} className="py-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16 fade-up">
        <div className="section-label justify-center mb-4">Why Us</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-light mb-4">
          Your content is great.{" "}
          <br />
          <span className="text-brand-accent">Your thumbnail isn't.</span>
        </h2>
        <p className="text-brand-muted max-w-lg mx-auto">
          90% of viewers decide to click or scroll based on the thumbnail alone — before reading the title.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-12 fade-up">
        {metrics.map((m) => (
          <div key={m.label} className="stat-card text-center">
            <p className="font-display text-3xl md:text-4xl font-bold text-brand-accent">{m.value}</p>
            <p className="text-xs text-brand-muted mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Before / After */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Before */}
        <div className="fade-up stat-card border-red-900/30">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-red-900/30 border border-red-900/50 flex items-center justify-center">
              <span className="text-red-400 text-sm">✕</span>
            </div>
            <span className="font-display font-semibold text-red-400">Before working with us</span>
          </div>
          <ul className="space-y-3">
            {beforeItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 text-xs">✕</span>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Mock bad thumbnail */}
          <div className="mt-6 rounded-xl overflow-hidden border border-red-900/20">
            <div className="w-full h-28 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="w-16 h-10 bg-gray-600 rounded mb-2 mx-auto opacity-50" />
                  <p className="text-xs text-gray-500 font-medium">My Video Title Here</p>
                </div>
              </div>
              <span className="absolute top-2 right-2 text-xs bg-black/70 text-gray-500 px-2 py-0.5 rounded">
                2.1% CTR
              </span>
            </div>
          </div>
        </div>

        {/* After */}
        <div className="fade-up stat-card" style={{ borderColor: "rgba(255,49,49,0.2)" }}>
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at top left, rgba(255,49,49,0.04) 0%, transparent 60%)",
            }}
          />
          <div className="flex items-center gap-2 mb-6 relative">
            <div className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center">
              <span className="text-brand-accent text-sm">✓</span>
            </div>
            <span className="font-display font-semibold text-brand-accent">With ThumbCraft</span>
          </div>
          <ul className="space-y-3 relative">
            {afterItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-brand-light">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-accent text-xs">✓</span>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Mock good thumbnail */}
          <div className="mt-6 rounded-xl overflow-hidden border border-brand-accent/20 relative">
            <div className="w-full h-28 relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #1a0505 0%, #2d0000 50%, #0a0a0a 100%)",
                }}
              />
              {/* Simulated bold thumbnail */}
              <div className="absolute inset-0 flex items-center gap-2 px-3">
                <div
                  className="w-14 h-18 rounded-lg flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #FF313344, #FF313322)", border: "1px solid #FF313366", height: "72px" }}
                />
                <div>
                  <div className="text-xs font-black text-white leading-tight uppercase tracking-wide">
                    I Made $50K
                    <br />
                    <span className="text-brand-accent">IN ONE MONTH</span>
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    <div className="w-12 h-1.5 rounded-full bg-brand-accent" />
                    <div className="w-6 h-1.5 rounded-full bg-brand-accent/30" />
                  </div>
                </div>
              </div>
              <span className="absolute top-2 right-2 text-xs bg-black/70 text-brand-accent px-2 py-0.5 rounded font-semibold">
                11.4% CTR
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
