import { useEffect, useRef } from "react";
import InfiniteScrollBannerF from "./InfiniteScrollBannerF";

const works = [
  {
    title: "MindBody Co – 30-Day Series",
    tags: ["Series Design", "Visual Branding"],
    desc: "Designed 12 thumbnails for a viral wellness series. CTR increased from 3.1% to 9.8% after redesign.",
    color: "#1DA1F2",
    accent: "#0D6EFD",
    views: "2.4M views",
    ctr: "9.8% CTR",
    client: "Alex Turner",
    role: "Health Creator",
  },
  {
    title: "WealthPath – Finance Channel Rebrand",
    tags: ["Channel Rebrand", "Template Design"],
    desc: "Complete thumbnail identity system for a finance creator. Consistent across 40+ videos.",
    color: "#27AE60",
    accent: "#2ECC71",
    views: "1.1M views",
    ctr: "12.1% CTR",
    client: "Sarah Chen",
    role: "Finance YouTuber",
  },
  {
    title: "AdventureNow – Travel Thumbnails",
    tags: ["Visual Design", "Emotion Mapping"],
    desc: "Bold adventure-style thumbnails that tripled subscriber growth within 60 days.",
    color: "#E67E22",
    accent: "#F39C12",
    views: "5.2M views",
    ctr: "8.7% CTR",
    client: "Mike Rodriguez",
    role: "Travel Creator",
  },
  {
    title: "Truth Talks – Viral Documentary Style",
    tags: ["Copywriting", "Visual Branding"],
    desc: "Dark, cinematic thumbnail aesthetic for investigative content. Most viral video hit 3M views.",
    color: "#6C3483",
    accent: "#9B59B6",
    views: "3.8M views",
    ctr: "10.3% CTR",
    client: "Jordan Williams",
    role: "Documentary Creator",
  },
  {
    title: "FitReal – Transformation Content",
    tags: ["Series Design", "A/B Testing"],
    desc: "Before/after split-style thumbnails for fitness content. Consistent monthly deliverables.",
    color: "#1ABC9C",
    accent: "#16A085",
    views: "890K views",
    ctr: "7.6% CTR",
    client: "Priya Patel",
    role: "Fitness Creator",
  },
  {
    title: "SmartSpend – Personal Finance",
    tags: ["Template Design", "Visual Identity"],
    desc: "Clean, authoritative design language for personal finance content targeting millennials.",
    color: "#3498DB",
    accent: "#2980B9",
    views: "670K views",
    ctr: "6.9% CTR",
    client: "David Park",
    role: "Finance Creator",
  },
];

const WorkCard = ({ work }) => (
  <div className="work-card bg-brand-card">
    {/* Thumbnail preview */}
    <div className="relative h-44 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${work.color}22 0%, ${work.accent}44 100%)`,
        }}
      />
      {/* Simulated thumbnail */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full h-full rounded-lg overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${work.color}15, ${work.accent}25)`, border: `1px solid ${work.color}30` }}>
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            <div className="flex justify-between items-start">
              <div className="w-20 h-6 rounded-md" style={{ background: `${work.color}40` }} />
              <div className="w-8 h-8 rounded-full" style={{ background: `${work.accent}50` }} />
            </div>
            <div>
              <div className="w-3/4 h-3 rounded mb-1.5" style={{ background: `${work.color}60` }} />
              <div className="w-1/2 h-3 rounded" style={{ background: `${work.color}30` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="work-card-overlay absolute inset-0 bg-black/60 flex items-center justify-center gap-6">
        <div className="text-center">
          <p className="font-display text-xl font-bold text-white">{work.views}</p>
          <p className="text-xs text-white/60">Total Views</p>
        </div>
        <div className="w-px h-10 bg-white/20" />
        <div className="text-center">
          <p className="font-display text-xl font-bold text-brand-accent">{work.ctr}</p>
          <p className="text-xs text-white/60">Click Rate</p>
        </div>
      </div>
    </div>

    {/* Card body */}
    <div className="p-5">
      <div className="flex flex-wrap gap-2 mb-3">
        {work.tags.map((tag) => (
          <span key={tag} className="tag-pill text-[10px]">{tag}</span>
        ))}
      </div>
      <h3 className="font-display font-bold text-brand-light mb-2 text-lg leading-tight">{work.title}</h3>
      <p className="text-sm text-brand-muted leading-relaxed mb-4">{work.desc}</p>

      {/* Client */}
      <div className="flex items-center justify-between border-t border-brand-border pt-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: `${work.color}22`, color: work.color, border: `1px solid ${work.color}33` }}
          >
            {work.client[0]}
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-light">{work.client}</p>
            <p className="text-[10px] text-brand-muted">{work.role}</p>
          </div>
        </div>
        <span className="text-xs text-brand-muted hover:text-brand-accent transition-colors cursor-pointer">
          View case →
        </span>
      </div>
    </div>
  </div>
);

export default function Works() {
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

  return (
    <section id="works" ref={ref} className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16 fade-up">
        <div className="section-label justify-center mb-4">Portfolio</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-light mb-4">
          Work that speaks{" "}
          <span className="text-brand-accent">for itself</span>
        </h2>
        <p className="text-brand-muted text-lg max-w-lg mx-auto">
          From niche blogs to viral channels — these brands grew because their thumbnails demanded attention.
        </p>
      </div>

      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work, i) => (
          <div key={work.title} className="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
            <WorkCard work={work} />
          </div>
        ))}
      </div> */}
      
    </section>
  );
}
