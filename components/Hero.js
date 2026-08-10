"use client";

import { motion } from "framer-motion";
import { OrbitScene } from "./OrbitScene";
import { MaskContainer } from "./SVGMaskEffect";

const badges = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="currentColor" />
      </svg>
    ),
    title: "Senior Designer",
    sub: "5+ years experience",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Fast Delivery",
    sub: "On-time, every time",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Client Focused",
    sub: "Your goals, my priority",
  },
];

function AvatarRow() {
  const colors = ["#e07b54", "#4a90d9", "#7b6cf6", "#e05454", "#54a06e"];
  return (
    <div className="flex items-center gap-3">
      <div className="flex">
        {colors.map((c, i) => (
          <div
            key={i}
            className="w-[34px] h-[34px] rounded-full border-2 border-black relative"
            style={{ background: c, marginLeft: i === 0 ? 0 : "-10px", zIndex: colors.length - i }}
          />
        ))}
      </div>
      <p className="text-[13px] leading-tight m-0 text-neutral-400">
        Trusted by <span className="text-blue-400 font-bold">50+</span>
        <br />clients worldwide
      </p>
    </div>
  );
}

// ── Shared hero layout — reused in both dark and bright layers ─────────────────
function HeroContent({ bright = false }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 h-auto md:min-h-[100dvh] pb-10 md:pb-20">
      {/* MOBILE TRUSTED BY */}
      <div className="md:hidden flex w-fit mx-auto mt-[40px] -mb-[80px] backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[300] relative order-first">
        <AvatarRow />
      </div>

      {/* LEFT (Text) */}
      <div className="relative z-20 flex flex-col items-center text-center md:items-start md:text-left gap-0 order-2 md:order-1 -mt-[300px] md:mt-0">
        <p className={`text-xl md:text-2xl font-medium mb-3 tracking-wide uppercase ${bright ? "text-blue-300" : "text-neutral-500"}`}>
          Hi, I&apos;m
        </p>

        <h1 className={`text-[80px] md:text-[140px] lg:text-[116px] font-extrabold leading-[0.92] tracking-tight mb-7 font-display ${bright ? "text-white" : "text-neutral-700"}`}>
          Mahbub
          <br />
          <span className={bright ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400" : "text-neutral-700"}>
            Muhon
          </span>
        </h1>

        <p className={`text-xl md:text-2xl leading-relaxed max-w-lg mb-10 mx-auto md:mx-0 ${bright ? "text-neutral-300" : "text-neutral-600"}`}>
          I design scroll-stopping YouTube thumbnails that grow your channel&apos;s click-through rate and views.
        </p>

        <a
          href="#contact"
          className={`inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-base w-fit mx-auto md:mx-0 mb-12 transition-all duration-300 ${
            bright
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_6px_32px_rgba(37,99,235,0.5)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.7)]"
              : "bg-neutral-800 text-neutral-400 border border-neutral-700"
          }`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Schedule 1 on 1 call →
        </a>

        <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-8 pb-12 md:pb-0">
          {badges.map((b) => (
            <div key={b.title} className="flex items-center gap-2.5 md:gap-3 text-left">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bright ? "bg-blue-500/15 border border-blue-500/30 text-blue-400" : "bg-neutral-800 border border-neutral-700 text-neutral-500"}`}>
                {b.icon}
              </div>
              <div>
                <p className={`m-0 font-bold text-sm md:text-base ${bright ? "text-white" : "text-neutral-500"}`}>{b.title}</p>
                <p className={`m-0 text-xs md:text-sm ${bright ? "text-neutral-400" : "text-neutral-600"}`}>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT (Image) */}
      <div className="relative z-10 flex flex-col items-center justify-center scale-[0.65] sm:scale-[0.85] md:scale-[1.15] -mt-20 md:-mb-[30px] lg:mb-0 md:mt-0 order-1 md:order-2">
        <OrbitScene />
        <div className="hidden md:block absolute bottom-[30px] right-[20px] backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[300] opacity-50 hover:opacity-100 transition-opacity duration-300">
          <AvatarRow />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div id="home-section" className="relative font-body text-white overflow-hidden bg-black h-auto md:min-h-[100dvh]">
      {/* DESKTOP: Mouse Hover Mask Effect */}
      <div className="hidden md:block w-full h-full min-h-[100dvh]">
        <MaskContainer
          revealSize={280}
          revealText={
            <div className="relative w-full h-full bg-black min-h-[100dvh]">
              <HeroContent bright={true} />
            </div>
          }
          className="min-h-[100dvh] w-full"
        >
          {/* Dark layer */}
          <div className="relative w-full min-h-[100dvh]">
            {/* Dot pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* Edge fade */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, transparent 20%, black 80%)",
              }}
            />
            <div className="relative z-10 h-full">
              <HeroContent bright={false} />
            </div>
          </div>
        </MaskContainer>
      </div>

      {/* MOBILE: Static Bright Version (No Hover Effect) */}
      <div className="md:hidden relative w-full h-auto">
        {/* Dot pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Edge fade */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 20%, black 80%)",
          }}
        />
        <div className="relative z-10 h-full">
          <HeroContent bright={true} />
        </div>
      </div>
    </div>
  );
}