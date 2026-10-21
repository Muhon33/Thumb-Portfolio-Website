import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { OrbitScene } from "./OrbitScene";
import { WHATSAPP_URL, CLIENT_COUNT } from "../data/site";
import { reviews } from "../data/reviews";

const badges = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="currentColor" />
      </svg>
    ),
    title: "Senior Designer",
    sub: "5+ years experience",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Fast Delivery",
    sub: "On-time, every time",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Client Focused",
    sub: "Your goals, my priority",
  },
];

// Real client faces from the reviews.
const clientAvatars = reviews.filter((r) => r.avatar).slice(0, 5);

function TrustedBy({ dim }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex">
        {clientAvatars.map((r, i) => (
          <Image
            key={r.avatar}
            src={r.avatar}
            alt=""
            width={34}
            height={34}
            className={`w-[34px] h-[34px] rounded-full border-2 border-black relative ${dim ? "grayscale opacity-60" : ""}`}
            style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: clientAvatars.length - i }}
          />
        ))}
      </div>
      <p className={`text-[13px] leading-tight m-0 ${dim ? "text-neutral-500" : "text-neutral-300"}`}>
        Trusted by <span className={dim ? "font-bold" : "text-[var(--brand-accent-soft)] font-bold"}>{CLIENT_COUNT}</span>
        <br />
        clients worldwide
      </p>
    </div>
  );
}

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// The hero layout. `dim` is the grey copy that sits underneath on desktop and
// lights up under the cursor; it is decoration only (hidden from screen readers,
// nothing in it can be clicked).
function HeroContent({ dim = false }) {
  const ctaClass =
    "inline-flex items-center justify-center gap-2.5 px-10 py-4 md:py-5 rounded-full font-extrabold text-base w-fit mx-auto lg:mx-0 mb-10";

  return (
    <div className="hero-grid max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-8 lg:min-h-[100dvh] pt-5 md:pt-8 pb-12 lg:py-12">
      {/* Phone and tablet: "Trusted by" pill above the photo */}
      <div className="lg:hidden w-fit mx-auto relative z-30 rounded-2xl p-4 bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <TrustedBy dim={dim} />
      </div>

      {/* Photo with orbiting tools */}
      <div className="hero-visual relative z-10 flex justify-center lg:order-2">
        <OrbitScene decorative={dim} />
        {/* Desktop: "Trusted by" pill over a soft black fade */}
        <div className="hidden lg:block absolute top-[calc(100%_-_180px)] bottom-[-40%] left-[-20%] w-[140%] pointer-events-none z-[290] bg-[linear-gradient(to_bottom,transparent,#000_144px)]" />
        <div className="hidden lg:block absolute bottom-[30px] right-[20px] z-[300] rounded-2xl p-4 bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <TrustedBy dim={dim} />
        </div>
      </div>

      {/* Text */}
      <div className="hero-text relative z-20 flex flex-col items-center text-center lg:items-start lg:text-left lg:order-1">
        <p className={`text-xl md:text-2xl font-medium mb-3 tracking-wide uppercase ${dim ? "text-neutral-500" : "text-[var(--brand-accent-soft)]"}`}>
          Hi, I&apos;m
        </p>

        {dim ? (
          <p className="hero-name font-display font-extrabold leading-[0.92] tracking-tight mb-7 text-neutral-500">
            Mahbub
            <br />
            Muhon
          </p>
        ) : (
          <h1 className="hero-name font-display font-extrabold leading-[0.92] tracking-tight mb-7 text-white">
            Mahbub
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-accent-soft)] to-[var(--brand-accent)]">
              Muhon
            </span>
          </h1>
        )}

        <p className={`text-[17px] md:text-2xl leading-relaxed max-w-lg mb-6 md:mb-8 mx-auto lg:mx-0 ${dim ? "text-neutral-500" : "text-neutral-300"}`}>
          I design scroll-stopping YouTube thumbnails that grow your channel&apos;s click-through rate and views.
        </p>

        {dim ? (
          <span className={`${ctaClass} bg-neutral-800 text-neutral-400 border border-neutral-700`}>
            <WhatsAppIcon />
            Contact Me Now
          </span>
        ) : (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaClass} text-black bg-gradient-to-r from-[var(--brand-accent-soft)] to-[var(--brand-accent)] shadow-[0_6px_32px_rgba(135,38,255,0.4)] transition-shadow duration-200 hover:shadow-[0_10px_40px_rgba(135,38,255,0.6)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent-soft)] focus-visible:ring-offset-4 focus-visible:ring-offset-black`}
          >
            <WhatsAppIcon />
            Contact Me Now
            <span className="sr-only">(opens WhatsApp in a new tab)</span>
          </a>
        )}

        <ul className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-4 md:gap-x-8">
          {badges.map((b) => (
            <li key={b.title} className="flex items-center gap-2.5 md:gap-3 text-left">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  dim ? "bg-neutral-800 border border-neutral-700 text-neutral-500" : "bg-[var(--brand-accent)]/15 border border-[var(--brand-accent)]/30 text-[var(--brand-accent-soft)]"
                }`}
              >
                {b.icon}
              </div>
              <div>
                <p className={`m-0 font-bold text-sm md:text-base ${dim ? "text-neutral-500" : "text-white"}`}>{b.title}</p>
                <p className={`m-0 text-xs md:text-sm ${dim ? "text-neutral-600" : "text-neutral-400"}`}>{b.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);

  // Desktop spotlight: move a CSS mask with the cursor. No React re-renders.
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (min-width: 1024px)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y}px`);
          frame = 0;
        });
      }
    };
    const enter = (e) => {
      move(e);
      el.classList.add("is-revealing");
    };
    const leave = () => el.classList.remove("is-revealing");
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerenter", enter, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  // Stop the orbit animation while the hero is off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="home-section"
      ref={ref}
      className={`hero relative overflow-hidden bg-black text-white font-body ${paused ? "hero-paused" : ""}`}
    >
      {/* Dot pattern + edge fade */}
      <div className="hero-dots absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Desktop only: dim copy underneath */}
      <div className="hero-dim absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <HeroContent dim />
      </div>

      {/* The real, clickable hero. On desktop it shows through the spotlight. */}
      <div className="hero-bright relative z-[1]">
        <HeroContent />
      </div>
    </section>
  );
}
