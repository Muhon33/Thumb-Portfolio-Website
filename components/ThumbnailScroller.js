// Infinite scrolling thumbnail previews (placeholder cards)
const thumbnailPreviews = [
  { title: "10 Life Hacks That Changed My Life", channel: "LifeWith Jake", color: "#3b82f6", accent: "#6366f1" },
  { title: "I Tried This for 30 Days", channel: "MindBody Co", color: "#1DA1F2", accent: "#0D6EFD" },
  { title: "The Dark Side of Social Media", channel: "Truth Talks", color: "#6C3483", accent: "#9B59B6" },
  { title: "How I Made $50K in One Month", channel: "WealthPath", color: "#27AE60", accent: "#2ECC71" },
  { title: "World's Most Dangerous Hike", channel: "AdventureNow", color: "#E67E22", accent: "#F39C12" },
  { title: "I Quit My Job to Travel", channel: "NomadLife", color: "#E74C3C", accent: "#3b82f6" },
  { title: "Never Buy These 5 Things", channel: "SmartSpend", color: "#2C3E50", accent: "#3498DB" },
  { title: "My Honest Fitness Transformation", channel: "FitReal", color: "#1ABC9C", accent: "#16A085" },
];

const ThumbnailCard = ({ title, channel, color, accent }) => (
  <div
    className="flex-shrink-0 w-64 h-36 rounded-xl overflow-hidden relative cursor-pointer group"
    style={{ background: `linear-gradient(135deg, ${color}22, ${accent}44)`, border: `1px solid ${color}33` }}
  >
    {/* Simulated thumbnail layout */}
    <div className="absolute inset-0 p-3 flex flex-col justify-between">
      {/* Top colored block */}
      <div className="w-full h-12 rounded-lg" style={{ background: `linear-gradient(135deg, ${color}44, ${accent}66)` }} />

      {/* Bottom text area */}
      <div>
        <p className="text-xs font-bold text-white leading-tight line-clamp-2">{title}</p>
        <p className="text-[10px] mt-0.5" style={{ color: `${color}cc` }}>{channel}</p>
      </div>
    </div>

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <span className="text-xs font-semibold text-white border border-white/30 rounded-full px-3 py-1">
        View Design
      </span>
    </div>
  </div>
);

export default function ThumbnailScroller() {
  const doubled = [...thumbnailPreviews, ...thumbnailPreviews];

  return (
    <section className="py-4 overflow-hidden">
      <div className="marquee-wrapper">
        <div className="marquee-track gap-4">
          {doubled.map((t, i) => (
            <ThumbnailCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
