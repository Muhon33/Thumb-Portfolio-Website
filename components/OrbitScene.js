
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";


const outerTools = [
  {
    name: "Photoshop",
    angle: 0, // 360 / 4 = 90 deg spacing
    renderIcon: () => (
      <Image src="/Icons/Photoshop.png" alt="Photoshop" width={58} height={58} className="drop-shadow-lg" />
    ),
  },
  {
    name: "Figma",
    angle: 90,
    renderIcon: () => (
      <Image src="/Icons/Figma.png" alt="Figma" width={58} height={58} className="drop-shadow-lg" />
    ),
  },
  {
    name: "After Effects",
    angle: 180,
    renderIcon: () => (
      <Image src="/Icons/AfterEffects.png" alt="After Effects" width={58} height={58} className="drop-shadow-lg" />
    ),
  },
  {
    name: "Canva",
    angle: 270,
    renderIcon: () => (
      <Image src="/Icons/Canva.png" alt="Canva" width={58} height={58} className="drop-shadow-lg" />
    ),
  },
];

const innerTools = [
  {
    name: "Premiere Pro",
    angle: 45, // 360 / 3 = 120 deg spacing + 45 deg offset
    renderIcon: () => (
      <Image src="/Icons/Premier Pro.png" alt="Premiere Pro" width={50} height={50} className="drop-shadow-lg" />
    ),
  },
  {
    name: "ChatGPT",
    angle: 165,
    renderIcon: () => (
      <Image src="/Icons/ChatGpt.png" alt="ChatGPT" width={50} height={50} className="drop-shadow-lg" />
    ),
  },
  {
    name: "Claude",
    angle: 285,
    renderIcon: () => (
      <Image src="/Icons/claude.png" alt="Claude" width={50} height={50} className="drop-shadow-lg" />
    ),
  },
];

function ToolBubble({ size = 52, children }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
        transition: "transform 0.25s, filter 0.25s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.2)";
        e.currentTarget.style.filter = "brightness(1.2) drop-shadow(0 4px 12px rgba(255,255,255,0.2))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.filter = "none";
      }}
    >
      <div className="scale-[1.4] md:scale-100 transition-transform">
        {children}
      </div>
    </div>
  );
}

// Convert polar coords to cartesian, centered at (cx, cy)
function polar(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + Math.cos(rad) * r,
    y: cy + Math.sin(rad) * r,
  };
}

export function OrbitScene() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const animRef = useRef(null);
  const outerAngle = useRef(0);
  const innerAngle = useRef(0);

  useEffect(() => {
    let last = null;
    function tick(ts) {
      if (!last) last = ts;
      const dt = ts - last;
      last = ts;

      // Outer ring rotates slowly clockwise
      outerAngle.current += dt * 0.008;
      // Inner ring rotates counter-clockwise, slightly faster
      innerAngle.current -= dt * 0.011;

      // Update outer items
      const oItems = outerRef.current?.querySelectorAll("[data-angle]");
      oItems?.forEach((el) => {
        const base = parseFloat(el.dataset.angle);
        const r = parseFloat(el.dataset.r);
        const a = base + outerAngle.current;
        const rad = (a * Math.PI) / 180;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });

      // Update inner items
      const iItems = innerRef.current?.querySelectorAll("[data-angle]");
      iItems?.forEach((el) => {
        const base = parseFloat(el.dataset.angle);
        const r = parseFloat(el.dataset.r);
        const a = base + innerAngle.current;
        const rad = (a * Math.PI) / 180;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });

      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Canvas/scene dimensions
  const W = 672;
  const H = 672;
  const cx = W / 2;
  const cy = H / 2;
  const R_OUTER = 282; // outer orbit radius
  const R_INNER = 180; // inner orbit radius

  return (
    <div
      style={{
        position: "relative",
        width: `${W}px`,
        height: `${H}px`,
        flexShrink: 0,
        marginBottom: "80px",
        marginLeft: "-35px",
      }}
    >
      {/* ── RINGS (SVG, behind everything) ── */}
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      >
        {/* Soft glow filter */}
        <defs>
          <filter id="ring-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(40,110,255,0.28)" />
            <stop offset="100%" stopColor="rgba(40,110,255,0)" />
          </radialGradient>
        </defs>

        {/* Center area glow */}
        <ellipse cx={cx} cy={cy} rx={R_OUTER * 0.85} ry={R_OUTER * 0.85} fill="url(#centerGlow)" />

        {/* Outer ring — solid, thin, glowing blue */}
        <circle
          cx={cx} cy={cy} r={R_OUTER}
          stroke="rgba(80,150,255,0.30)"
          strokeWidth="1.2"
          filter="url(#ring-glow)"
        />
        {/* Outer ring inner highlight */}
        <circle
          cx={cx} cy={cy} r={R_OUTER}
          stroke="rgba(160,210,255,0.10)"
          strokeWidth="0.5"
        />

        {/* Inner ring */}
        <circle
          cx={cx} cy={cy} r={R_INNER}
          stroke="rgba(80,150,255,0.22)"
          strokeWidth="1"
          filter="url(#ring-glow)"
        />
        <circle
          cx={cx} cy={cy} r={R_INNER}
          stroke="rgba(160,210,255,0.08)"
          strokeWidth="0.5"
        />

        {/* Tiny glowing dots sprinkled around outer ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const p = polar(cx, cy, R_OUTER, a);
          return (
            <circle key={`od-${a}`} cx={p.x} cy={p.y} r="2.2" fill="rgba(140,200,255,0.45)" />
          );
        })}
        {/* Smaller dots on inner ring */}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((a) => {
          const p = polar(cx, cy, R_INNER, a);
          return (
            <circle key={`id-${a}`} cx={p.x} cy={p.y} r="1.6" fill="rgba(140,200,255,0.30)" />
          );
        })}

        {/* Extra scattered micro-dots for depth */}
        {[15, 75, 140, 195, 255, 305].map((a) => {
          const p = polar(cx, cy, R_OUTER + 18, a);
          return (
            <circle key={`xd-${a}`} cx={p.x} cy={p.y} r="1.2" fill="rgba(100,170,255,0.22)" />
          );
        })}
      </svg>

      {/* ── PROFILE IMAGE (z=10, in front of rings, behind icons) ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "60%",
          transform: "translate(-50%, -50%)",
          width: "638px",
          height: "726px",
          zIndex: 100,
        }}
      >
        {/* Radial glow behind person */}
        <div
          style={{
            position: "absolute",
            inset: "-30px",
            background: "radial-gradient(ellipse 70% 70% at 50% 48%, rgba(30,90,220,0.32) 0%, transparent 72%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <Image
          src="/images/muhon1 (1).png"
          alt="Mahbub Muhon"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "top center",
            zIndex: 1,
          }}
        />
      </div>

      {/* ── OUTER ORBIT ICONS ── */}
      <div
        ref={outerRef}
        style={{ position: "absolute", inset: 0, zIndex: 20 }}
      >
        {outerTools.map((tool) => (
          <div
            key={tool.name}
            data-angle={tool.angle}
            data-r={R_OUTER}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              willChange: "transform",
            }}
          >
            <ToolBubble size={70}>
              {tool.renderIcon()}
            </ToolBubble>
          </div>
        ))}
      </div>

      {/* ── INNER ORBIT ICONS ── */}
      <div
        ref={innerRef}
        style={{ position: "absolute", inset: 0, zIndex: 20 }}
      >
        {innerTools.map((tool) => (
          <div
            key={tool.name}
            data-angle={tool.angle}
            data-r={R_INNER}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              willChange: "transform",
            }}
          >
            <ToolBubble size={60}>
              {tool.renderIcon()}
            </ToolBubble>
          </div>
        ))}
      </div>

      {/* ── GLOBAL BOTTOM FADE OVERLAY ── */}
      <div
        style={{
          position: "absolute",
          bottom: "-150px", // extend far enough to completely cover the overflowing image
          left: "-20%",
          width: "140%",
          height: "350px",
          background: "linear-gradient(to top, black 35%, transparent 100%)",
          zIndex: 200, // Covers person (100) and icons (20)
          pointerEvents: "none",
        }}
      />
    </div>
  );
}