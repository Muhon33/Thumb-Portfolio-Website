# ThumbCraft — YouTube Thumbnail Designer Portfolio

A premium portfolio website for a YouTube thumbnail designer, inspired by the design language of [rednsay.com](https://www.rednsay.com). Built with **Next.js**, **JavaScript**, and **Tailwind CSS**.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
thumbnail-portfolio/
├── components/
│   ├── Navbar.js           — Sticky top nav with mobile menu
│   ├── Hero.js             — Full-screen hero with stats
│   ├── ThumbnailScroller.js — Infinite marquee of thumbnail previews
│   ├── Process.js          — 4-step design process cards
│   ├── WhyUs.js            — Before/After comparison + metrics
│   ├── Works.js            — Portfolio grid with case studies
│   ├── About.js            — Designer profile section
│   ├── Testimonials.js     — Masonry testimonials grid
│   ├── FAQ.js              — Animated accordion FAQ
│   ├── CTA.js              — Final call-to-action section
│   └── Footer.js           — Footer with links
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js            — Main page, assembles all sections
├── styles/
│   └── globals.css         — Tailwind + custom CSS variables & animations
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

## 🎨 Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `brand-red` | `#FF3131` | Accents, CTAs, highlights |
| `brand-dark` | `#0A0A0A` | Page background |
| `brand-card` | `#111111` | Card backgrounds |
| `brand-border` | `#1E1E1E` | Borders, dividers |
| `brand-muted` | `#6B6B6B` | Secondary text |
| `brand-light` | `#F5F5F5` | Primary text |

### Fonts
- **Display:** Clash Display (headings, numbers)
- **Body:** Satoshi (paragraphs, UI text)
- Both loaded via [Fontshare](https://www.fontshare.com) CDN

### Custom CSS Classes
- `.btn-primary` — Red CTA button with glow hover
- `.btn-secondary` — Ghost button
- `.stat-card` — Dark card with top-red gradient line
- `.tag-pill` — Red outlined badge
- `.work-card` — Portfolio card with hover overlay
- `.testimonial-card` — Dark testimonial block
- `.section-label` — Red uppercase section label with line
- `.fade-up` / `.visible` — Scroll-triggered reveal animation
- `.marquee-wrapper` / `.marquee-track` — Infinite scroll marquee

---

## ✏️ Customization Guide

### Change your name / branding
- In `components/Navbar.js`: update the logo text
- In `components/Hero.js`: update the headline and stats
- In `components/About.js`: replace placeholder name, bio, and avatar
- In `components/Footer.js`: update copyright name

### Update portfolio works
- Edit the `works` array in `components/Works.js`
- Each work has: `title`, `tags`, `desc`, `color`, `accent`, `views`, `ctr`, `client`, `role`

### Update testimonials
- Edit the `testimonials` array in `components/Testimonials.js`

### Update process steps
- Edit the `steps` array in `components/Process.js`

### Update FAQs
- Edit the `faqs` array in `components/FAQ.js`

### Change booking/contact links
- `components/Hero.js` — "Book a Free Call" → update `href` to your cal.com/Calendly link
- `components/CTA.js` — Update both booking and WhatsApp links
- `components/Navbar.js` — "Get Started" button

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the .next folder or connect your GitHub repo
```

---

## 📦 Dependencies
- `next` — React framework
- `react` + `react-dom` — UI library
- `tailwindcss` — Utility CSS
- `autoprefixer` + `postcss` — CSS tooling

No additional UI libraries needed — everything is built with pure Tailwind + custom CSS.

---

## 💡 Tips
- Replace the placeholder thumbnail cards in `ThumbnailScroller.js` with real screenshot images of your work
- Add real client avatar photos in `Testimonials.js` using `<Image>` from `next/image`
- Connect a form service (Formspree, EmailJS) to the CTA section for lead capture
- Add Google Analytics or Posthog for tracking
