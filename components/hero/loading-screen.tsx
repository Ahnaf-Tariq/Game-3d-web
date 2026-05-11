"use client";
import { motion } from "framer-motion";

export function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex flex-col items-center"
        >
          <h1
            className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            BLADE RUSH
          </h1>
          <div className="h-[2px] w-full bg-gradient-to-right from-transparent via-white/20 to-transparent mt-2" />
        </motion.div>

        <div className="relative w-64 h-[1px] bg-white/5 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-1">
          <motion.span
            className="text-[10px] uppercase tracking-[0.5em] text-white/30"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            System Initialization
          </motion.span>
          <span
            className="text-2xl font-light tabular-nums text-white/80"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {Math.floor(progress)}%
          </span>
        </div>
      </div>

      <div className="absolute bottom-12 text-[9px] uppercase tracking-[0.3em] text-white/10">
        Alpha Protocol v0.1
      </div>
    </motion.div>
  );
}
