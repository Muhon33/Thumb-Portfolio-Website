import Image from "next/image";
import { useId } from "react";

// The portrait with tool icons orbiting around it.
// Everything is sized from one CSS variable (--s, set in globals.css), and the
// orbits spin with CSS animations, so the browser runs them on the GPU.

const OUTER = [
  { name: "Photoshop", src: "/Icons/photoshop.png", angle: 0 },
  { name: "Figma", src: "/Icons/figma.png", angle: 90 },
  { name: "After Effects", src: "/Icons/after-effects.png", angle: 180 },
  { name: "Canva", src: "/Icons/canva.png", angle: 270 },
];

const INNER = [
  { name: "Premiere Pro", src: "/Icons/premiere-pro.png", angle: 45 },
  { name: "ChatGPT", src: "/Icons/chatgpt.png", angle: 165 },
  { name: "Claude", src: "/Icons/claude.png", angle: 285 },
];

// Ring geometry in the 672 x 672 drawing space.
const W = 672;
const C = W / 2;
const R_OUTER = 282;
const R_INNER = 180;

function dot(r, deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: C + Math.cos(rad) * r, y: C + Math.sin(rad) * r };
}

function Ring({ tools, inner, decorative }) {
  return (
    <div className={`orbit-ring ${inner ? "orbit-ring--inner" : ""}`}>
      {tools.map((t) => (
        <div key={t.name} className="orbit-item" style={{ "--a": `${t.angle}deg` }}>
          <div className="orbit-icon">
            <Image
              src={t.src}
              alt={decorative ? "" : t.name}
              width={64}
              height={64}
              className="w-full h-full drop-shadow-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrbitScene({ decorative = false }) {
  // Unique ids so the two hero copies never point at each other's SVG effects.
  const uid = useId().replace(/:/g, "");
  const glow = `ring-glow-${uid}`;
  const center = `center-glow-${uid}`;
  return (
    <div className="orbit">
      {/* Rings */}
      <svg viewBox={`0 0 ${W} ${W}`} fill="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={center} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(40,110,255,0.28)" />
            <stop offset="100%" stopColor="rgba(40,110,255,0)" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r={R_OUTER * 0.85} fill={`url(#${center})`} />
        <circle cx={C} cy={C} r={R_OUTER} stroke="rgba(80,150,255,0.30)" strokeWidth="1.2" filter={`url(#${glow})`} />
        <circle cx={C} cy={C} r={R_OUTER} stroke="rgba(160,210,255,0.10)" strokeWidth="0.5" />
        <circle cx={C} cy={C} r={R_INNER} stroke="rgba(80,150,255,0.22)" strokeWidth="1" filter={`url(#${glow})`} />
        <circle cx={C} cy={C} r={R_INNER} stroke="rgba(160,210,255,0.08)" strokeWidth="0.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const p = dot(R_OUTER, a);
          return <circle key={`o${a}`} cx={p.x} cy={p.y} r="2.2" fill="rgba(140,200,255,0.45)" />;
        })}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((a) => {
          const p = dot(R_INNER, a);
          return <circle key={`i${a}`} cx={p.x} cy={p.y} r="1.6" fill="rgba(140,200,255,0.30)" />;
        })}
        {[15, 75, 140, 195, 255, 305].map((a) => {
          const p = dot(R_OUTER + 18, a);
          return <circle key={`x${a}`} cx={p.x} cy={p.y} r="1.2" fill="rgba(100,170,255,0.22)" />;
        })}
      </svg>

      {/* Portrait */}
      <div className="orbit-portrait">
        <div className="orbit-portrait-glow" />
        <Image
          src="/images/mahbub-muhon.webp"
          alt={decorative ? "" : "Mahbub Muhon"}
          fill
          priority={!decorative}
          sizes="(min-width: 1024px) 740px, 112vw"
          className="object-cover object-top"
        />
      </div>

      {/* Orbiting tool icons */}
      <Ring tools={OUTER} decorative={decorative} />
      <Ring tools={INNER} inner decorative={decorative} />

      {/* Fade the bottom of the portrait into the page */}
      <div className="orbit-fade" />
    </div>
  );
}
