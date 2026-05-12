"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { NEWS_1st } from "@/data/Data";

export default function NewsSlider() {
  const ref = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(NEWS_1st.length - 1, i));
    setActive(clamped);
    const el = sliderRef.current?.children[clamped] as HTMLElement;
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <section ref={ref} className="relative bg-black py-24 overflow-hidden">
      {/* Scanline top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00e5ff40, transparent)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between"
        >
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "12px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              // Latest Intel //
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(44px, 6vw, 80px)",
                letterSpacing: "0.05em",
                lineHeight: 0.9,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              NEWS &amp;
              <br />
              <span style={{ color: "#00e5ff" }}>UPDATES</span>
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              className="group w-10 h-10 border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-white/30 disabled:opacity-20"
              style={{ cursor: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 2L4 7L9 12"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "14px",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(NEWS_1st.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => goTo(active + 1)}
              disabled={active === NEWS_1st.length - 1}
              className="group w-10 h-10 border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-white/30 disabled:opacity-20"
              style={{ cursor: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 2L10 7L5 12"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slider */}
      <motion.div
        ref={sliderRef}
        className="flex gap-4 px-6 md:px-12 lg:px-20 overflow-x-auto pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onMouseDown={(e) => {
          setDragging(true);
          dragStart.current = e.clientX + (sliderRef.current?.scrollLeft ?? 0);
        }}
        onMouseMove={(e) => {
          if (dragging && sliderRef.current)
            sliderRef.current.scrollLeft = dragStart.current - e.clientX;
        }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
      >
        {NEWS_1st.map((item, i) => (
          <NewsCard
            key={item.id}
            item={item}
            index={i}
            active={active === i}
            onClick={() => setActive(i)}
          />
        ))}
      </motion.div>

      {/* Dot nav */}
      <div className="flex items-center gap-2 px-6 md:px-12 lg:px-20 mt-8">
        {NEWS_1st.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-px transition-all duration-300"
            style={
              {
                cursor: "none",
                width: active === i ? "32px" : "16px",
                background: active === i ? "#00e5ff" : "rgba(255,255,255,0.2)",
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </section>
  );
}

function NewsCard({
  item,
  index,
  active,
  onClick,
}: {
  item: (typeof NEWS_1st)[0];
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.article
      onClick={onClick}
      className="relative shrink-0 group overflow-hidden border transition-all duration-500"
      style={{
        width: active
          ? "clamp(300px, 36vw, 440px)"
          : "clamp(220px, 22vw, 280px)",
        borderColor: active ? `${item.tagColor}50` : "rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        cursor: "none",
      }}
      layout
      transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          height: active ? "200px" : "140px",
          transition: "height 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{
            filter: active
              ? "brightness(0.6)"
              : "brightness(0.35) saturate(0.4)",
          }}
        />
        {/* Top bar on image */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: item.tagColor }}
        />

        {/* Tag */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: item.tagColor,
            border: `0.5px solid ${item.tagColor}60`,
            background: `${item.tagColor}18`,
          }}
        >
          {item.tag}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          {item.date}
        </p>
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "18px",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
            color: "rgba(255,255,255,0.88)",
          }}
        >
          {item.title}
        </h3>
        <AnimatePresence>
          {active && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.4)",
                overflow: "hidden",
              }}
            >
              {item.body}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Read more */}
        <div className="flex items-center gap-2 mt-1">
          <div
            className="h-px transition-all duration-300 group-hover:w-8"
            style={{ width: "16px", background: item.tagColor }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Read More
          </span>
        </div>
      </div>
    </motion.article>
  );
}
