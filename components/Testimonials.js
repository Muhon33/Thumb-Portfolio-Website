import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Alex Turner",
    role: "Health Creator, MindBody Co",
    initials: "AT",
    color: "#1DA1F2",
    text: "Working with Mahbub Muhon completely transformed my channel. My CTR went from 2.9% to 9.8% in just a few weeks. The thumbnails look professional, bold, and my audience absolutely loves the new look.",
    stars: 5,
    badge: "3rd time client",
  },
  {
    name: "Sarah Chen",
    role: "Finance YouTuber",
    initials: "SC",
    color: "#27AE60",
    text: "Fast delivery, incredible quality. Finally found someone who gets finance content aesthetics — clean but bold.",
    stars: 5,
  },
  {
    name: "Mike Rodriguez",
    role: "Travel Creator",
    initials: "MR",
    color: "#E67E22",
    text: "My thumbnails went from forgettable to iconic. Three videos hit over a million views in the first 30 days after the redesign. I can't recommend enough. This is a non-negotiable investment for any serious creator.",
    stars: 5,
    badge: "4th time client",
  },
  {
    name: "Jordan Williams",
    role: "Documentary Creator",
    initials: "JW",
    color: "#9B59B6",
    text: "The dark, cinematic style they created for my channel is exactly what I envisioned but couldn't execute myself. Responsive, professional, and genuinely talented.",
    stars: 5,
    mobileHidden: true,
  },
  {
    name: "Priya Patel",
    role: "Fitness Creator",
    initials: "PP",
    color: "#1ABC9C",
    text: "Best designer I've worked with. He went above and beyond to understand exactly what I wanted. The A/B variant approach is genius.",
    stars: 5,
    mobileHidden: true,
  },
  {
    name: "David Park",
    role: "Personal Finance Creator",
    initials: "DP",
    color: "#3498DB",
    text: "Finally a designer who understands YouTube — not just design. The thumbnails feel strategic, not just pretty. My channel grew 40% in 60 days.",
    stars: 5,
    badge: "2nd time client",
    mobileHidden: true,
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-brand-accent text-sm">★</span>
    ))}
  </div>
);

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Split into columns for masonry
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section id="testimonials" ref={ref} className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16 fade-up">
        <div className="section-label justify-center mb-4">Testimonials</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-light mb-4">
          Creators who{" "}
          <span className="text-brand-accent">trust us</span>
        </h2>
        <p className="text-brand-muted max-w-md mx-auto">
          Don't take our word for it — here's what 200+ creators have to say.
        </p>
      </div>

      {/* Masonry grid */}
      <div className="grid md:grid-cols-3 gap-5">
        {[col1, col2, col3].map((col, ci) => (
          <div key={ci} className="flex flex-col gap-5">
            {col.map((t, ti) => (
              <div
                key={t.name}
                className={`fade-up testimonial-card relative ${t.mobileHidden ? 'hidden md:block' : ''}`}
                style={{ transitionDelay: `${(ci * 2 + ti) * 80}ms` }}
              >
                {t.badge && (
                  <span className="absolute top-4 right-4 tag-pill text-[9px]">
                    {t.badge}
                  </span>
                )}
                <StarRating count={t.stars} />
                <p className="text-sm text-brand-muted leading-relaxed mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `${t.color}22`, color: t.color, border: `1px solid ${t.color}44` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-light">{t.name}</p>
                    <p className="text-xs text-brand-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
