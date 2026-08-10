"use client";

import { useEffect, useRef, useCallback } from "react";

const CELL_SIZE = 48;
const RIPPLE_DURATION = 1400; // ms
const MAX_OPACITY = 0.18;

export default function BackgroundRippleEffect() {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);
  const rafRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const now = performance.now();

    ctx.clearRect(0, 0, w, h);

    const cols = Math.ceil(w / CELL_SIZE) + 1;
    const rows = Math.ceil(h / CELL_SIZE) + 1;

    // Draw grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * CELL_SIZE, 0);
      ctx.lineTo(c * CELL_SIZE, h);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * CELL_SIZE);
      ctx.lineTo(w, r * CELL_SIZE);
      ctx.stroke();
    }

    // Draw ripple fills on cells
    ripplesRef.current = ripplesRef.current.filter(
      (rp) => now - rp.startTime < RIPPLE_DURATION
    );

    for (const rp of ripplesRef.current) {
      const elapsed = now - rp.startTime;
      const progress = elapsed / RIPPLE_DURATION; // 0 → 1
      // Sine ease: rises then falls
      const alpha = MAX_OPACITY * Math.sin(progress * Math.PI);
      const spread = Math.round(progress * 6); // how many rings spread out

      for (let dr = -spread; dr <= spread; dr++) {
        for (let dc = -spread; dc <= spread; dc++) {
          const ring = Math.max(Math.abs(dr), Math.abs(dc));
          if (ring > spread) continue;
          const cellAlpha = alpha * Math.max(0, 1 - ring / (spread + 1));
          const cx = (rp.col + dc) * CELL_SIZE;
          const cy = (rp.row + dr) * CELL_SIZE;
          if (cx < 0 || cy < 0 || cx >= w || cy >= h) continue;

          ctx.fillStyle = `rgba(59,130,246,${cellAlpha.toFixed(3)})`;
          ctx.fillRect(cx + 1, cy + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        }
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Pointer move → ripple
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.floor(x / CELL_SIZE);
      const row = Math.floor(y / CELL_SIZE);
      const last = ripplesRef.current[ripplesRef.current.length - 1];
      // Avoid spawning identical consecutive ripples on same cell
      if (last && last.col === col && last.row === row) return;
      ripplesRef.current.push({ col, row, startTime: performance.now() });
    };

    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("click", onMove, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("click", onMove);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
