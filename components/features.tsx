"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FEATURES_1st } from "@/data/Data";

export default function FEATURES() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-black py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "12px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          // Core Systems //
        </p>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 7vw, 88px)",
            letterSpacing: "0.05em",
            lineHeight: 0.9,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          GAME
          <br />
          <span style={{ color: "rgba(255,255,255,0.2)" }}>FEATURES</span>
        </h2>
      </motion.div>

      {/* Cards grid — staggered, matching screenshot layout */}
      <div className="relative">
        {/* Top row: cards 1, 3, 4, 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
          {FEATURES_1st.map((f, i) => (
            <FeatureCard
              key={f.id}
              feature={f}
              index={i}
              inView={inView}
              offset={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: (typeof FEATURES_1st)[0];
  index: number;
  inView: boolean;
  offset?: number;
  wide?: boolean;
}

function FeatureCard({
  feature: f,
  index,
  inView,
  offset = 0,
  wide,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 + offset }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
      style={{ gridColumn: wide ? "span 1" : undefined }}
    >
      <div
        className="relative h-full border border-white/[0.07] p-6 flex flex-col gap-5 overflow-hidden transition-all duration-500"
        style={{
          background: "rgba(255,255,255,0.02)",
          cursor: "none",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${f.color}18 0%, transparent 70%)`,
          }}
        />

        {/* Corner accent */}
        <div
          className="absolute top-0 left-0 w-12 h-px transition-all duration-500 group-hover:w-full"
          style={{ background: f.color }}
        />
        <div
          className="absolute top-0 left-0 h-12 w-px transition-all duration-500 group-hover:h-full"
          style={{ background: f.color }}
        />

        {/* Label */}
        <p
          className="flex items-center gap-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "10px",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          // {f.label} //
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: f.color }}
          />
        </p>

        {/* Icon */}
        <div
          className="transition-colors duration-300"
          style={{ color: f.color }}
        >
          {f.icon}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px",
            letterSpacing: "0.08em",
            lineHeight: 1,
            color: "rgba(255,255,255,0.88)",
          }}
        >
          {f.title}
        </h3>

        {/* Body */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.4)",
            marginTop: "auto",
          }}
        >
          {f.body}
        </p>

        {/* Arrow */}
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-4 h-px transition-all duration-300 group-hover:w-8"
            style={{ background: f.color }}
          />
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M1 4H7M7 4L4 1M7 4L4 7"
              stroke={f.color}
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
