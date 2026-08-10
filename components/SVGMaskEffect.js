"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export function MaskContainer({
  children,
  revealText,
  revealSize = 200,
  className = "",
}) {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const [isInside, setIsInside] = useState(false);

  const onMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const onEnter = useCallback(() => setIsInside(true), []);
  const onLeave = useCallback(() => setIsInside(false), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("pointermove", onMove,  { passive: true });
    el.addEventListener("pointerenter", onEnter, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [onMove, onEnter, onLeave]);

  const maskId = "cursor-mask";

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* ── Layer 1: always-visible dark layer ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {children}
      </div>

      {/* ── Layer 2: revealed layer via SVG cursor mask ── */}
      <svg
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="mask-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="60%"  stopColor="white" stopOpacity="0.85" />
            <stop offset="85%"  stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId}>
            <motion.circle
              cx={mouse.x}
              cy={mouse.y}
              fill="url(#mask-gradient)"
              animate={{
                r: isInside ? revealSize : 0,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            />
          </mask>
        </defs>
        <foreignObject x="0" y="0" width="100%" height="100%" mask={`url(#${maskId})`}>
          <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full">
            {revealText}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
