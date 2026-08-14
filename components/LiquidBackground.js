"use client";
import { motion } from "framer-motion";

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-black">
      {/* Orb 1 — reduced blur for performance */}
      <motion.div
        animate={{
          x: ["0%", "50%", "0%", "-30%", "0%"],
          y: ["0%", "30%", "-20%", "10%", "0%"],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[60px] mix-blend-screen"
        style={{ willChange: "transform" }}
      />

      {/* Orb 2 */}
      <motion.div
        animate={{
          x: ["0%", "-40%", "20%", "40%", "0%"],
          y: ["0%", "-30%", "40%", "-10%", "0%"],
          scale: [1, 0.8, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] right-[10%] w-[350px] h-[350px] bg-[#FF3131]/15 rounded-full blur-[50px] mix-blend-screen"
        style={{ willChange: "transform" }}
      />

      {/* Orb 3 */}
      <motion.div
        animate={{
          x: ["0%", "30%", "-40%", "20%", "0%"],
          y: ["0%", "50%", "-10%", "40%", "0%"],
          scale: [1, 1.4, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] bg-orange-600/15 rounded-full blur-[60px] mix-blend-screen"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
