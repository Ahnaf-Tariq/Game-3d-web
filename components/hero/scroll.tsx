"use client";
import { motion, AnimatePresence } from "framer-motion";
import { TEXT_BEATS, TextBeat } from "@/data/Data";

export function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute right-8 md:right-16 bottom-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              marginBottom: "8px",
            }}
          >
            Scroll
          </p>
          <motion.div
            style={{
              width: "1px",
              height: "48px",
              background: "rgba(255,255,255,0.2)",
              transformOrigin: "top",
            }}
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-40"
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      <motion.div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #3E5873, #5A7FA8, #9CC7F5)",
        }}
      />
    </div>
  );
}

export function ChapterCounter({
  activeBeat,
}: {
  activeBeat: TextBeat | null;
}) {
  return (
    <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3">
      {TEXT_BEATS.map((beat) => (
        <motion.div
          key={beat.id}
          style={{
            width: beat.id === activeBeat?.id ? "24px" : "6px",
            height: "1px",
            background:
              beat.id === activeBeat?.id
                ? "rgba(255,255,255,0.8)"
                : "rgba(255,255,255,0.2)",
            borderRadius: "2px",
          }}
          animate={{
            width: beat.id === activeBeat?.id ? "24px" : "6px",
            background:
              beat.id === activeBeat?.id
                ? "rgba(255,255,255,0.8)"
                : "rgba(255,255,255,0.2)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}
