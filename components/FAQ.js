import { useState, useEffect, useRef } from "react";

const faqs = [
  {
    q: "Can better thumbnails really grow my channel?",
    a: "Absolutely. CTR is one of YouTube's primary ranking signals. A jump from 3% to 8% CTR can 2-3x your impressions being converted. Our clients consistently see measurable subscriber and view growth within 30 days.",
  },
  {
    q: "How long does it take to deliver thumbnails?",
    a: "Standard delivery is 24–48 hours per thumbnail. For packages and ongoing retainers, we agree on a delivery schedule upfront. Rush delivery (12 hours) is available for urgent needs.",
  },
  {
    q: "What does your thumbnail design service include?",
    a: "Each thumbnail includes: research & concept development, custom illustration/photo editing, bold typography treatment, and one revision round. Packages include A/B testing variants.",
  },
  {
    q: "Do you work with small channels or only big creators?",
    a: "We work with everyone from brand-new channels to 1M+ subscriber creators. Early-stage channels often see the biggest percentage gains because the baseline is lower.",
  },
  {
    q: "What if I don't like the design?",
    a: "Every project includes a revision round. If the design truly doesn't match your brief, we'll redo it. We've had a 99% satisfaction rate across 200+ clients.",
  },
  {
    q: "Do you offer ongoing monthly packages?",
    a: "Yes! Monthly retainers are available for creators who need consistent thumbnail delivery. Packages range from 4 to 20 thumbnails per month with discounted rates.",
  },
];

const FaqItem = ({ q, a, isOpen, toggle }) => (
  <div className="faq-item">
    <button
      className="w-full flex items-center justify-between py-5 text-left gap-4"
      onClick={toggle}
    >
      <span className={`font-display font-semibold text-base transition-colors duration-200 ${isOpen ? "text-brand-accent" : "text-brand-light"}`}>
        {q}
      </span>
      <span
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-300 ${
          isOpen ? "bg-brand-accent border-brand-accent rotate-45" : "bg-transparent border-brand-border"
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1v10M1 6h10" stroke={isOpen ? "white" : "#6B6B6B"} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    </button>
    <div
      className="overflow-hidden transition-all duration-300"
      style={{ maxHeight: isOpen ? "200px" : "0px" }}
    >
      <p className="text-sm text-brand-muted pb-5 leading-relaxed pr-12">{a}</p>
    </div>
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={ref} className="py-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16 fade-up">
        <div className="section-label justify-center mb-4">FAQ</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-light mb-4">
          Frequently asked{" "}
          <span className="text-brand-accent">questions</span>
        </h2>
      </div>

      <div className="fade-up">
        {faqs.map((faq, i) => (
          <FaqItem
            key={i}
            q={faq.q}
            a={faq.a}
            isOpen={openIndex === i}
            toggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
