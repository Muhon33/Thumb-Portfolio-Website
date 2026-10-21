import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import InfiniteScrollBannerF from "../components/InfiniteScrollBannerF";
import LiquidBackground from "../components/LiquidBackground";
import { CLIENT_COUNT, SITE_URL } from "../data/site";

const TITLE = "Mahbub Muhon — YouTube Thumbnail Designer";
const DESCRIPTION = `Scroll-stopping YouTube thumbnails that grow your click-through rate. Trusted by ${CLIENT_COUNT} clients, including creators with millions of subscribers.`;
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href={`${SITE_URL}/`} />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Link previews (WhatsApp, X, LinkedIn, Facebook, Discord...) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:site_name" content="Mahbub Muhon" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Mahbub Muhon, YouTube thumbnail designer, with four example thumbnails" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>

      <Navbar />
      <LiquidBackground />

      <main className="pb-28">
        <Hero />
        <InfiniteScrollBannerF />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
