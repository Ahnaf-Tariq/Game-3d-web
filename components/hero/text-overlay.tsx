"use client";
import { motion, AnimatePresence } from "framer-motion";
import { TextBeat } from "./game-canvas";

export function TextOverlay({
  beat,
  visible,
}: {
  beat: TextBeat;
  visible: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={beat.id}
          className="absolute left-8 md:left-16 bottom-16 md:bottom-20 pointer-events-none select-none"
          style={{ maxWidth: "400px" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "rgba(255,255,255,0.4)",
              }}
            />
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {beat.eyebrow}
            </p>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(52px, 7vw, 88px)",
                lineHeight: 0.92,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.95)",
                whiteSpace: "pre-line",
              }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {beat.headline}
            </motion.h2>
          </div>

          <motion.p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "15px",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.45)",
              marginTop: "12px",
              letterSpacing: "0.05em",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {beat.body}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
