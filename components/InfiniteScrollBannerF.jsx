"use client";

import { useRef, useEffect } from "react";

// ─── Image data ───────────────────────────────────────────────────────────────
const ROW_1 = [
  { src: "/images/thumbnail1.jpg", alt: "Thumbnail 1" },
  { src: "/images/thumbnail2.jpg", alt: "Thumbnail 2" },
  { src: "/images/thumbnail3.jpg", alt: "Thumbnail 3" },
  { src: "/images/thumbnail4.jpg", alt: "Thumbnail 4" },
  { src: "/images/thumbnail5.jpg", alt: "Thumbnail 5" },
  { src: "/images/thumbnail6.jpg", alt: "Thumbnail 6" },
];

const ROW_2 = [
  { src: "/images/thumbnail7.jpeg", alt: "Thumbnail 7" },
  { src: "/images/thumbnail8.jpeg", alt: "Thumbnail 8" },
  { src: "/images/thumbnail9.jpeg", alt: "Thumbnail 9" },
  { src: "/images/thumbnail10.jpeg", alt: "Thumbnail 10" },
  { src: "/images/thumbnail11.jpeg", alt: "Thumbnail 11" },
  { src: "/images/thumbnail12.jpeg", alt: "Thumbnail 12" },
];

const ROW_3 = [
  { src: "/images/thumbnail13.jpeg", alt: "Thumbnail 13" },
  { src: "/images/thumbnail14.jpeg", alt: "Thumbnail 14" },
  { src: "/images/thumbnail15.jpeg", alt: "Thumbnail 15" },
  { src: "/images/thumbnail16.jpeg", alt: "Thumbnail 16" },
  { src: "/images/thumbnail17.jpeg", alt: "Thumbnail 17" },
  { src: "/images/thumbnail18.jpeg", alt: "Thumbnail 18" },
];

// ─── ScrollRow ────────────────────────────────────────────────────────────────
function ScrollRow({ images, direction = "left", duration = "36s" }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const isHovering = useRef(false);

  const items = [...images, ...images, ...images];
  const animationName = direction === "left" ? "scroll-left" : "scroll-right";

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    // ── Frame loop: runs only while mouse is over the row ──
    function tick() {
      if (!isHovering.current) return;

      const cards = track.querySelectorAll(".thumb-card");
      const { x, y } = mousePos.current;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = rect.width * 0.65;

        if (dist < maxDist) {
          const t = 1 - dist / maxDist;           // 0 → 1 as cursor approaches center
          const scale = 1 + 0.15 * t;
          const blur  = 24 + 40 * t;
          const lift  = 4 + 12 * t;
          const alpha = (0.45 + 0.45 * t).toFixed(2);
          card.style.transform  = `scale(${scale.toFixed(4)})`;
          card.style.boxShadow  = `0 ${lift.toFixed(0)}px ${blur.toFixed(0)}px rgba(0,0,0,${alpha})`;
          card.style.zIndex     = "20";
        } else {
          card.style.transform  = "scale(1)";
          card.style.boxShadow  = "0 4px 20px rgba(0,0,0,0.45)";
          card.style.zIndex     = "1";
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    function onMouseMove(e) {
      mousePos.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseEnter() {
      isHovering.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }

    function onMouseLeave() {
      isHovering.current = false;
      cancelAnimationFrame(rafRef.current);
      // Reset all cards
      track.querySelectorAll(".thumb-card").forEach((card) => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "0 4px 20px rgba(0,0,0,0.45)";
        card.style.zIndex    = "1";
      });
    }

    wrapper.addEventListener("mousemove",  onMouseMove,  { passive: true });
    wrapper.addEventListener("mouseenter", onMouseEnter, { passive: true });
    wrapper.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      wrapper.removeEventListener("mousemove",  onMouseMove);
      wrapper.removeEventListener("mouseenter", onMouseEnter);
      wrapper.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-4 w-max py-3"
        style={{
          animationName,
          animationDuration: duration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          overflow: "visible",
        }}
      >
        {items.map((img, i) => (
          <div
            key={i}
            className="thumb-card flex-shrink-0 w-[170px] h-[100px] md:w-[340px] md:h-[200px] rounded-xl cursor-pointer"
            style={{
              /* Snappy spring — fast in, smooth out */
              transition: "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.18s ease",
              willChange: "transform",
              position: "relative",
              zIndex: 1,
              boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
            }}
          >
            {/* Inner wrapper keeps rounded corners & clips the image */}
            <div className="w-full h-full rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                draggable={false}
                className="w-full h-full object-cover block select-none pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── InfiniteScrollBanner ─────────────────────────────────────────────────────
export default function InfiniteScrollBannerF() {
  return (
    <>
      <style>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes scroll-right {
          from { transform: translateX(calc(-100% / 3)); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <section id="thumbnails" className="w-full bg-black py-6 overflow-hidden relative z-20 -mt-[10px] md:-mt-[40px]">
        <div className="flex flex-col gap-0">
          <ScrollRow images={ROW_1} direction="left"  duration="36s" />
          <ScrollRow images={ROW_2} direction="right" duration="42s" />
          <ScrollRow images={ROW_3} direction="left"  duration="33s" />
        </div>
      </section>
    </>
  );
}
