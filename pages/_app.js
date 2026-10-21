import { Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../styles/globals.css";

// Self-hosted by Next.js: no request to Google at runtime, no render blocking.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${bricolage.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      {/* Vercel Web Analytics: page views and visitors, no cookies */}
      <Analytics />
    </>
  );
}
