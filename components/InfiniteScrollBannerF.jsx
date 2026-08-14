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

// ─── ScrollRow (Pure CSS hover — no JS getBoundingClientRect loop) ─────────
function ScrollRow({ images, direction = "left", duration = "36s" }) {
  const items = [...images, ...images, ...images];
  const animationName = direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div
      className="relative w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
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
            className="thumb-card flex-shrink-0 w-[170px] h-[100px] md:w-[340px] md:h-[200px] rounded-xl cursor-pointer hover:scale-105 hover:z-20 hover:shadow-[0_12px_48px_rgba(0,0,0,0.7)]"
            style={{
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
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
                loading="lazy"
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
