import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery & Research",
    description: "We analyze your niche, top competitors, and audience psychology to understand what makes them click.",
    tags: ["Niche Analysis", "Competitor Scan", "CTR Research", "Strategy Direction"],
    icon: "🔍",
  },
  {
    number: "02",
    title: "Concept & Copywriting",
    description: "Every thumbnail tells a story. We craft the visual concept and title synergy that drives curiosity.",
    tags: ["Visual Concept", "Title Pairing", "Emotion Mapping", "Hook Strategy"],
    icon: "✏️",
  },
  {
    number: "03",
    title: "High-Impact Design",
    description: "Pixel-perfect execution with bold typography, contrast, and composition designed to pop at small sizes.",
    tags: ["Visual Design", "Typography", "Color Theory", "Layout Mastery"],
    icon: "🎨",
  },
  {
    number: "04",
    title: "Delivery & Optimization",
    description: "Final files delivered, A/B variants provided, and ongoing refinement based on real CTR data.",
    tags: ["File Delivery", "A/B Variants", "CTR Feedback", "Iteration Support"],
    icon: "🚀",
  },
];

export default function Process() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
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
    <section id="process" ref={ref} className="py-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16 fade-up">
        <div className="section-label justify-center mb-4">Process</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-light mb-4">
          Your thumbnail, designed in{" "}
          <span className="text-brand-accent">four clear steps</span>
        </h2>
        <p className="text-brand-muted text-lg max-w-xl mx-auto">
          Every thumbnail isn't just seen — it's engineered to convert. Here's how we do it.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="fade-up stat-card group hover:border-brand-accent/30 transition-all duration-300"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-brand-accent font-display text-5xl font-bold opacity-20">
                  {step.number}
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
            </div>

            <h3 className="font-display text-xl font-bold text-brand-light mb-2">
              {step.title}
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed mb-5">
              {step.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-white/4 border border-brand-border rounded-full px-3 py-1 text-brand-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
