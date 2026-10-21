import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import t1 from "../public/images/thumbnail1.webp";
import t2 from "../public/images/thumbnail2.webp";
import t3 from "../public/images/thumbnail3.webp";
import t4 from "../public/images/thumbnail4.webp";
import t5 from "../public/images/thumbnail5.webp";
import t6 from "../public/images/thumbnail6.webp";
import t7 from "../public/images/thumbnail7.webp";
import t8 from "../public/images/thumbnail8.webp";
import t9 from "../public/images/thumbnail9.webp";
import t10 from "../public/images/thumbnail10.webp";
import t11 from "../public/images/thumbnail11.webp";
import t12 from "../public/images/thumbnail12.webp";
import t13 from "../public/images/thumbnail13.webp";
import t14 from "../public/images/thumbnail14.webp";
import t15 from "../public/images/thumbnail15.webp";
import t16 from "../public/images/thumbnail16.webp";
import t17 from "../public/images/thumbnail17.webp";
import t18 from "../public/images/thumbnail18.webp";

// Static imports give Next.js the size and a blur preview for each image.
const ROWS = [
  { images: [t1, t2, t3, t4, t5, t6], direction: "left", duration: "36s" },
  { images: [t7, t8, t9, t10, t11, t12], direction: "right", duration: "42s" },
  { images: [t13, t14, t15, t16, t17, t18], direction: "left", duration: "33s" },
];

function ScrollRow({ images, direction, duration, rowIndex }) {
  // Three copies so the loop never shows a gap, even on very wide screens.
  const items = [...images, ...images, ...images];

  return (
    <div className="banner-row relative w-full">
      <div
        className="banner-track flex gap-4 w-max py-3"
        style={{ animationName: direction === "left" ? "banner-left" : "banner-right", animationDuration: duration }}
      >
        {items.map((img, i) => {
          const isCopy = i >= images.length;
          return (
            <div
              key={i}
              className="thumb-card relative flex-shrink-0 w-[170px] h-[96px] md:w-[340px] md:h-[191px] rounded-xl overflow-hidden"
              aria-hidden={isCopy || undefined}
            >
              <Image
                src={img}
                alt={isCopy ? "" : `YouTube thumbnail design ${rowIndex * 6 + (i % images.length) + 1} by Mahbub Muhon`}
                placeholder="blur"
                sizes="(max-width: 768px) 170px, 340px"
                draggable={false}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function InfiniteScrollBannerF() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  // Pause the scrolling rows while they are off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="thumbnails"
      ref={ref}
      aria-label="Thumbnail portfolio"
      className={`banner w-full bg-black py-6 overflow-hidden relative z-20 ${visible ? "" : "banner-paused"}`}
    >
      <h2 className="sr-only">Thumbnail portfolio</h2>
      <div className="flex flex-col">
        {ROWS.map((row, i) => (
          <ScrollRow key={i} rowIndex={i} {...row} />
        ))}
      </div>
    </section>
  );
}
