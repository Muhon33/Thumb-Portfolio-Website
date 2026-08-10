"use client";
import { motion } from "framer-motion";

const skills = [
  "Thumbnail Design",
  "Visual Psychology",
  "Color Theory",
  "Typography",
  "A/B Testing",
  "CTR Optimization",
  "Adobe Photoshop",
  "Canva Pro",
  "Figma",
  "Brand Identity",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left — visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Avatar card */}
          <div className="glass-card relative w-full aspect-square max-w-sm mx-auto overflow-hidden border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 to-brand-accent/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-indigo-500/10 blur-3xl rounded-full" />

            {/* Placeholder avatar */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div
                className="w-32 h-32 rounded-full mb-4 flex items-center justify-center text-5xl font-bold font-display shadow-2xl border-2 border-white/10"
                style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "white" }}
              >
                M
              </div>
              <p className="font-display text-xl font-bold text-brand-light">Mahbub Muhon</p>
              <p className="text-sm text-brand-muted mt-1">Premium Thumbnail Designer</p>

              {/* Social links */}
              <div className="flex gap-3 mt-6">
                {["YT", "IG", "TW", "FB"].map((s) => (
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    key={s}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-brand-muted hover:bg-brand-accent/20 hover:text-brand-accent hover:border-brand-accent/40 cursor-pointer transition-colors"
                  >
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating stat badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-4 right-4 glass-card p-4 shadow-xl border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <p className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">200+</p>
              <p className="text-[10px] text-brand-muted font-semibold uppercase tracking-wider">Channels</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right — text */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-1 bg-brand-accent rounded-full" />
              <span className="text-brand-accent text-xs font-bold tracking-widest uppercase">About Me</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-light leading-tight">
              Meet the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">thumbnail</span>{" "}
              mastermind
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-brand-muted text-lg leading-relaxed"
          >
            Hi, I'm a premium YouTube thumbnail designer with over 5 years of experience helping 200+ creators and channels grow their click-through rates and subscriber counts organically.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-brand-muted text-lg leading-relaxed"
          >
            I specialize in understanding viewer psychology — the colors, faces, text, and compositions that make someone's thumb stop its scroll. When I'm not designing, you'll find me studying top-performing videos, testing new concepts, or nerding out on data.
          </motion.p>

          {/* Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-sm bg-white/5 border border-white/10 rounded-full px-4 py-2 text-brand-muted hover:bg-brand-accent/10 hover:text-white hover:border-brand-accent/30 transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-6"
          >
            <a href="#contact" className="btn-primary">
              Work with me
            </a>
            <a href="#works" className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 hover:border-white/40 transition-all duration-300">
              See Portfolio
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
