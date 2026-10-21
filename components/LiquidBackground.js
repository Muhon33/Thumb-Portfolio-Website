// Soft violet glow behind the page. Pure CSS (see .liquid-bg in globals.css):
// one gradient layer that drifts slowly on desktop and stays still on phones.
export default function LiquidBackground() {
  return <div className="liquid-bg" aria-hidden="true" />;
}
