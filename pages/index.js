import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import InfiniteScrollBannerF from "../components/InfiniteScrollBannerF";

import LiquidBackground from "../components/LiquidBackground";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mahbub Muhon — Premium YouTube Thumbnail Design</title>
        <meta
          name="description"
          content="YouTube's #1 thumbnail design service. Stop-scroll thumbnails that grow your channel. 200+ creators helped, 48-hour delivery."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <LiquidBackground />

      <main className="pb-28">
        <Hero />
        <InfiniteScrollBannerF/>
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
