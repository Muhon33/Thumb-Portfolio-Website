"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconBolt = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconBriefcase = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M2 12h20" />
  </svg>
);

const IconQuote = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.5" />
  </svg>
);

const IconWhatsApp = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ─── Nav config ────────────────────────────────────────────────────────────────
// sectionId: the element id to observe for this icon to become active
// color: the highlight color when active
const NAV_ITEMS = [
  {
    id:        "home",
    icon:      IconBolt,
    href:      "#",
    sectionId: "home-section",
    color:     "white",
    alwaysOn:  false,
  },
  {
    id:        "thumbnails",
    icon:      IconBriefcase,
    href:      "#thumbnails",
    sectionId: "thumbnails",
    color:     "white",
    alwaysOn:  false,
  },
  {
    id:        "testimonials",
    icon:      IconQuote,
    href:      "#testimonials",
    sectionId: "testimonials",
    color:     "white",
    alwaysOn:  false,
  },
  {
    id:        "contact",
    icon:      IconWhatsApp,
    href:      "#contact",
    sectionId: "contact",
    color:     "white",
    alwaysOn:  false,
    external:  false,
  },
];

// Color tokens
const COLORS = {
  white: {
    bg:       "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
    glow:     "rgba(255,255,255,0.45)",
    glowSoft: "rgba(255,255,255,0.15)",
    pulse:    "#ffffff",
  },
};

// ─── Dock Button ─────────────────────────────────────────────────────────────
function DockButton({ item, isActive }) {
  const Icon = item.icon;
  const c = COLORS[item.color];

  return (
    <motion.a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.2, y: -3 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
      className="relative flex items-center justify-center rounded-full cursor-pointer select-none"
      style={{
        width: 58,
        height: 58,
        background: "transparent",
        color: isActive ? c.pulse : "rgba(255,255,255,0.35)",
        filter: isActive
          ? `drop-shadow(0 0 8px ${c.glow}) drop-shadow(0 0 20px ${c.glowSoft})`
          : "none",
        transition: "color 0.3s ease, filter 0.3s ease",
      }}
    >
      {/* Subtle breathing outer glow on the icon when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(circle, ${c.glowSoft} 0%, transparent 70%)`,
          }}
        />
      )}
      <Icon size={26} />
    </motion.a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    // Map sectionId → navItemId
    const sectionMap = {};
    NAV_ITEMS.forEach((item) => {
      if (item.sectionId) sectionMap[item.sectionId] = item.id;
    });

    const observers = [];

    // Hero section — add an id to the hero wrapper via data attribute
    // We observe each section and track the most visible one
    const visibilityMap = {};

    const pick = () => {
      // Find which observed section has the highest ratio
      let bestId = "home";
      let bestRatio = 0;
      for (const [sId, ratio] of Object.entries(visibilityMap)) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = sectionMap[sId] ?? "home";
        }
      }
      setActiveId(bestId);
    };

    Object.keys(sectionMap).forEach((sId) => {
      const el = document.getElementById(sId);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[sId] = entry.intersectionRatio;
          pick();
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      {/* Glass pill — 30% bigger padding/rounding */}
      <div
        className="pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-[34px]"
        style={{
          background:       "radial-gradient(circle at 95% 10%, rgba(58, 151, 235, 0.45) 0%, rgba(15, 15, 15, 0.7) 40%, rgba(15, 15, 15, 0.7) 100%)",
          backdropFilter:   "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border:           "1px solid rgba(255,255,255,0.1)",
          boxShadow:        "0 8px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <DockButton
            key={item.id}
            item={item}
            isActive={item.alwaysOn || activeId === item.id}
          />
        ))}
      </div>
    </motion.nav>
  );
}
