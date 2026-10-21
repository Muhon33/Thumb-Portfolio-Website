import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { reviews, PROFILE_LINKS } from "../data/reviews";
import { PlatformLogo, PlatformAvatar, PLATFORM_NAMES } from "./PlatformLogo";

// "12.4M" -> 12400000
function parseCount(s = "") {
  const n = parseFloat(s);
  if (/m$/i.test(s)) return n * 1e6;
  if (/k$/i.test(s)) return n * 1e3;
  return n || 0;
}

// Rounds down so the headline never overstates.
function formatCount(n) {
  if (n >= 1e6) return `${Math.floor(n / 1e5) / 10}M+`;
  if (n >= 1e3) return `${Math.floor(n / 1e3)}K+`;
  return `${n}`;
}

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

function Stars({ className = "" }) {
  return (
    <div className={`flex gap-0.5 text-[var(--star)] ${className}`} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}

function Person({ r, large = false }) {
  const size = large ? 56 : 44;
  return (
    <div className="flex items-center gap-3 min-w-0">
      {r.avatar ? (
        <Image
          src={r.avatar}
          alt=""
          width={size}
          height={size}
          className="rounded-full flex-shrink-0 border border-[var(--line-strong)]"
        />
      ) : (
        <PlatformAvatar platform={r.platform} size={size} />
      )}
      <div className="min-w-0">
        {r.name ? (
          <>
            <p className={`font-semibold text-[var(--text)] truncate ${large ? "text-lg" : "text-[15px]"}`}>{r.name}</p>
            <p className="text-[13px] text-[var(--text-muted)] flex items-center gap-2 flex-wrap">
              {r.youtube?.subscribers && <span>{r.youtube.subscribers} subscribers</span>}
              {r.youtube?.subscribers && r.platform && <span aria-hidden="true">·</span>}
              {r.platform && (
                <PlatformLogo platform={r.platform} size={r.platform === "fiverr" ? 16 : 13} className="text-[12px]" />
              )}
            </p>
          </>
        ) : (
          <>
            <p className="font-semibold text-[15px] text-[var(--text)] leading-snug">{r.project}</p>
            {r.date && <p className="text-[13px] text-[var(--text-muted)]">{r.date}</p>}
          </>
        )}
      </div>
    </div>
  );
}

function Actions({ r, onOpen }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {r.youtube?.url && (
        <a
          href={r.youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-full text-[13px] font-semibold bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--text)] hover:border-[var(--line-strong)] transition-colors duration-200 ${focusRing}`}
        >
          <span className="text-[var(--youtube)]"><YouTubeIcon /></span>
          Visit channel
          <span className="sr-only">(opens YouTube in a new tab)</span>
        </a>
      )}
      {r.screenshot && <button
        type="button"
        onClick={() => onOpen(r)}
        className={`inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-full text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200 ${focusRing}`}
      >
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <rect x="2.5" y="3.5" width="15" height="13" rx="2" />
          <path d="M2.5 13l4-4 3 3 2.5-2.5 5 5" strokeLinejoin="round" />
        </svg>
        View original
        <span className="sr-only">review screenshot from {PLATFORM_NAMES[r.platform]}</span>
      </button>}
    </div>
  );
}

function VideoReviewCard({ r }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [near, setNear] = useState(false);

  // Only fetch the cover image once the card is close to the screen.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: "600px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.controls = true;
    v.play();
  };

  return (
    <figure className="relative w-[86%] flex-shrink-0 snap-center md:w-auto md:row-span-2 flex flex-col rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--line-strong)] transition-colors duration-200">
      <div className="relative flex-1 min-h-[420px] md:min-h-[460px] bg-black">
        <video
          ref={videoRef}
          src={r.video.src}
          poster={near ? r.video.poster : undefined}
          preload="none"
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-label={`Video review from ${r.name}`}
        />
        {!playing && (
          <button
            type="button"
            onClick={play}
            className={`group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent ${focusRing} focus-visible:ring-inset`}
          >
            <span className="w-16 h-16 rounded-full bg-[var(--text)] text-black flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true" className="ml-1">
                <path d="M7 4.5v15l12.5-7.5L7 4.5z" />
              </svg>
            </span>
            <span className="sr-only">Play video review from {r.name}</span>
            <span className="absolute left-3 top-3 text-[12px] font-semibold px-2.5 py-1 rounded-full bg-black/70 text-[var(--text)] backdrop-blur-sm">
              Video review{r.video.duration ? ` · ${r.video.duration}` : ""}
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex flex-col gap-4 p-6">
        {r.text && (
          <blockquote className="text-[15px] leading-relaxed text-[var(--text-soft)]">&ldquo;{r.text}&rdquo;</blockquote>
        )}
        <Person r={r} />
        <Actions r={r} />
      </figcaption>
    </figure>
  );
}

function ReviewCard({ r, onOpen }) {
  return (
    <figure className="rv-card relative w-[86%] flex-shrink-0 snap-center md:w-auto flex flex-col gap-5 p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--line-strong)] transition-colors duration-200">
      <Stars />
      <blockquote className="text-[15px] leading-relaxed text-[var(--text-soft)]">
        &ldquo;{r.text}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex flex-col gap-4">
        <Person r={r} />
        <Actions r={r} onOpen={onOpen} />
      </figcaption>
    </figure>
  );
}

const pill = "text-[12px] font-semibold px-2.5 py-1 rounded-full bg-black/75 text-[var(--text)] backdrop-blur-sm";

function ThumbnailTile({ t, name }) {
  const image = (
    <Image
      src={t.src}
      alt={`YouTube thumbnail Mahbub designed for ${name}`}
      width={t.width}
      height={t.height}
      sizes="(max-width: 768px) 50vw, 320px"
      className="w-full object-cover aspect-video md:aspect-auto md:h-full"
    />
  );
  return (
    <div className="relative md:flex-1 md:min-h-0">
      {t.videoUrl ? (
        <a
          href={t.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group block h-full ${focusRing} focus-visible:ring-inset`}
        >
          {image}
          <span className={`absolute left-2 bottom-2 md:left-3 md:bottom-3 inline-flex items-center gap-1.5 ${pill} group-hover:bg-black/90 transition-colors duration-200`}>
            <span className="text-[var(--youtube)]"><YouTubeIcon /></span>
            {t.views ? (
              <>
                {t.views} views<span className="hidden lg:inline"> · Watch on YouTube</span>
              </>
            ) : (
              "Watch on YouTube"
            )}
            <span className="sr-only">(opens in a new tab)</span>
          </span>
        </a>
      ) : (
        image
      )}
    </div>
  );
}

// A review shown big, with the thumbnails Mahbub made for that client beside it.
// `hero` = the first one (largest quote). `flip` puts the images on the right.
function ShowcaseReview({ r, onOpen, hero = false, flip = false }) {
  const thumbs = r.thumbnails;
  const firstName = r.name?.split(" ")[0] || "this client";
  const label = `${thumbs.length > 1 ? "Thumbnails" : "Thumbnail"} I made for ${firstName}`;
  const quoteSize = hero
    ? "font-display text-[34px] md:text-[44px] leading-[1.05] font-bold tracking-tight text-[var(--text)]"
    : r.text.length > 120
      ? "text-[18px] md:text-[22px] leading-snug font-medium text-[var(--text)]"
      : "font-display text-[26px] md:text-[32px] leading-[1.1] font-bold tracking-tight text-[var(--text)]";

  return (
    <figure
      className={`grid ${flip ? "md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_320px]" : "md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr]"} rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface)] border ${hero ? "border-[var(--line-strong)]" : "border-[var(--line)]"} mb-5`}
    >
      {/* Phone: thumbnails side by side. Desktop: stacked in a narrow column. */}
      <div className={`relative grid ${thumbs.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-px bg-black md:flex md:flex-col ${flip ? "md:order-last" : ""}`}>
        {thumbs.map((t) => (
          <ThumbnailTile key={t.src} t={t} name={r.name} />
        ))}
        <p className={`hidden md:block absolute left-3 top-3 pointer-events-none ${pill}`}>{label}</p>
      </div>
      <div className="flex flex-col justify-center gap-6 p-6 md:p-10">
        <p className="md:hidden -mb-3 text-[13px] text-[var(--text-muted)]">{label} ↑</p>
        <Stars />
        <blockquote className={quoteSize}>
          &ldquo;{r.text}&rdquo;
        </blockquote>
        <figcaption className="flex flex-col gap-4">
          <Person r={r} large />
          <Actions r={r} onOpen={onOpen} />
        </figcaption>
      </div>
    </figure>
  );
}

export default function Testimonials() {
  const dialogRef = useRef(null);
  const [active, setActive] = useState(null);

  if (!reviews.length) return null;

  // Reviews with a thumbnail get the big side-by-side layout; the featured one goes first.
  const showcase = reviews
    .filter((r) => r.thumbnails?.length && r.text)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const rest = reviews.filter((r) => !showcase.includes(r));
  const totalSubs = reviews.reduce((sum, r) => sum + parseCount(r.youtube?.subscribers), 0);
  const platforms = [...new Set(reviews.map((r) => r.platform).filter(Boolean))];

  const open = (r) => {
    setActive(r);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <section id="testimonials" className="py-24 px-6 max-w-6xl mx-auto">
      <header className="max-w-2xl mb-12">
        <h2 className="font-display text-[40px] md:text-[60px] font-bold leading-[1.02] tracking-tight text-[var(--text)] mb-5">
          {totalSubs > 0 ? (
            <>
              Trusted by creators with{" "}
              <span className="text-[var(--brand-accent-soft)]">{formatCount(totalSubs)}</span> subscribers
            </>
          ) : (
            "What my clients say"
          )}
        </h2>
        <p className="text-[17px] leading-relaxed text-[var(--text-muted)] mb-6">
          Real reviews from real clients, and every Upwork and Fiverr rating is 5 stars. Tap &ldquo;View original&rdquo; on any card to see the screenshot.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {platforms.map((p) => {
            const chip = (
              <>
                <PlatformLogo platform={p} size={16} className="text-[14px]" />
                <span className="text-[14px] font-semibold text-[var(--text)]">5.0</span>
                <Stars className="scale-90 origin-left" />
              </>
            );
            const cls = `inline-flex items-center gap-2.5 min-h-[44px] px-4 rounded-full border border-[var(--line)] bg-[var(--surface)]`;
            return PROFILE_LINKS[p] ? (
              <a key={p} href={PROFILE_LINKS[p]} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-[var(--line-strong)] transition-colors duration-200 ${focusRing}`}>
                {chip}
                <span className="sr-only">See all reviews on {PLATFORM_NAMES[p]} (opens in a new tab)</span>
              </a>
            ) : (
              <div key={p} className={cls}>{chip}</div>
            );
          })}
        </div>
      </header>

      {showcase.map((r, i) => (
        <ShowcaseReview key={r.thumbnails[0].src} r={r} onOpen={open} hero={i === 0} flip={i % 2 === 1} />
      ))}

      {/* Phone: swipe sideways. Tablet and up: masonry columns. */}
      <div
        className="rv-scroller relative flex items-start gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:grid-flow-dense md:items-stretch md:overflow-visible md:mx-0 md:px-0 md:gap-5"
        aria-label="More client reviews"
      >
        {rest.map((r) =>
          r.video ? (
            <VideoReviewCard key={r.video.src} r={r} />
          ) : (
            <ReviewCard key={r.screenshot.src} r={r} onOpen={open} />
          )
        )}
      </div>
      <p className="md:hidden mt-3 text-[13px] text-[var(--text-muted)]">Swipe for more reviews →</p>

      <dialog
        ref={dialogRef}
        className="rv-dialog m-auto w-[min(960px,calc(100vw-32px))] max-w-none max-h-[calc(100dvh-32px)] p-0 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line-strong)] text-[var(--text)]"
        onClick={(e) => e.target === dialogRef.current && close()}
        onClose={() => setActive(null)}
        aria-label="Original review screenshot"
      >
        {active && (
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="text-[14px] text-[var(--text-muted)] flex items-center gap-2">
                Original review on <PlatformLogo platform={active.platform} size={15} className="text-[13px]" />
              </p>
              <button
                type="button"
                onClick={close}
                className={`w-11 h-11 rounded-full flex items-center justify-center bg-[var(--surface-raised)] border border-[var(--line)] hover:border-[var(--line-strong)] transition-colors duration-200 ${focusRing}`}
                aria-label="Close"
                autoFocus
              >
                <svg viewBox="0 0 20 20" width="16" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>
            <Image
              src={active.screenshot.src}
              alt={`Screenshot of the ${PLATFORM_NAMES[active.platform]} review: "${active.text}"`}
              width={active.screenshot.width}
              height={active.screenshot.height}
              sizes="(max-width: 768px) 100vw, 920px"
              className="w-full h-auto rounded-[var(--radius-md)] border border-[var(--line)]"
            />
          </div>
        )}
      </dialog>
    </section>
  );
}
