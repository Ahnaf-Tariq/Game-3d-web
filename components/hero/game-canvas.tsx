"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./loading-screen";
import { ChapterCounter, ScrollIndicator, ScrollProgress } from "./scroll";
import { TextOverlay } from "./text-overlay";

const TOTAL_FRAMES = 180;
const FRAME_BASE = "/sequence/ezgif-frame-";

function padFrame(n: number): string {
  return String(n).padStart(3, "0");
}
function getFrameSrc(i: number): string {
  return `${FRAME_BASE}${padFrame(i)}.jpg`;
}

export interface TextBeat {
  id: string;
  start: number;
  end: number;
  eyebrow: string;
  headline: string;
  body: string;
  tag?: string;
}

export const TEXT_BEATS: TextBeat[] = [
  {
    id: "a",
    start: 0.0,
    end: 0.2,
    eyebrow: "Chapter I",
    headline: "BLADE\nRUSH",
    body: "Go wild.",
    tag: "001",
  },
  {
    id: "b",
    start: 0.25,
    end: 0.45,
    eyebrow: "Chapter II",
    headline: "CRAFTED\nLAYERS",
    body: "Pure matcha meets rich espresso.",
    tag: "002",
  },
  {
    id: "c",
    start: 0.5,
    end: 0.7,
    eyebrow: "Chapter III",
    headline: "NOISY TO\nPERFECTION",
    body: "Enjoy it. Feel it.",
    tag: "003",
  },
  {
    id: "d",
    start: 0.75,
    end: 0.95,
    eyebrow: "Chapter IV",
    headline: "WAKE UP\nYOUR FLOW",
    body: "Play the Blade Dash.",
    tag: "004",
  },
];

export default function GameCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmapsRef = useRef<(ImageBitmap | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeBeat, setActiveBeat] = useState<TextBeat | null>(TEXT_BEATS[0]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Custom cursor
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      ring.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll
  const { scrollYProgress } = useScroll({ target: wrapperRef });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    const bitmaps: (ImageBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);
    bitmapsRef.current = bitmaps;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      img.decoding = "async";

      const onDone = async () => {
        if (img.complete && img.naturalWidth > 0) {
          try {
            bitmaps[i] = await createImageBitmap(img);
          } catch {
            bitmaps[i] = null;
          }
        }
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };

      img.onload = onDone;
      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };

      images[i] = img;
    }

    return () => {
      images.forEach((img) => {
        if (img) img.src = "";
      });
      bitmaps.forEach((bm) => {
        if (bm) bm.close();
      });
    };
  }, []);

  // Draw frame
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    const pw = cssW * dpr;
    const ph = cssH * dpr;

    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }

    ctx.clearRect(0, 0, pw, ph);

    const bitmap = bitmapsRef.current[frameIndex];
    const img = imagesRef.current[frameIndex];
    const source: CanvasImageSource | null =
      bitmap ?? (img?.complete ? img : null);
    if (!source) return;

    const srcW = bitmap ? bitmap.width : (img as HTMLImageElement).naturalWidth;
    const srcH = bitmap
      ? bitmap.height
      : (img as HTMLImageElement).naturalHeight;

    // cover fit
    const scale = Math.max(pw / srcW, ph / srcH);
    const drawW = srcW * scale;
    const drawH = srcH * scale;
    const offsetX = (pw - drawW) / 2;
    const offsetY = (ph - drawH) / 2;

    ctx.drawImage(source, 0, 0, srcW, srcH, offsetX, offsetY, drawW, drawH);
  }, []);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      if (lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawFrame]);

  // Animation loop
  useEffect(() => {
    if (!isLoaded) return;

    const loop = () => {
      const progress = smoothProgress.get();
      setScrollProgress(progress);

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1))),
      );

      if (frameIndex !== lastFrameRef.current) {
        lastFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      const beat =
        TEXT_BEATS.find((b) => progress >= b.start && progress <= b.end) ??
        null;
      setActiveBeat(beat);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, smoothProgress, drawFrame]);

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/* Loading */}
      <AnimatePresence>
        {!isLoaded && <LoadingScreen progress={loadProgress} />}
      </AnimatePresence>

      <ScrollProgress progress={scrollProgress} />

      <div ref={wrapperRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: "block" }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 40%, transparent 65%)",
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
            }}
          />

          {TEXT_BEATS.map((beat) => (
            <TextOverlay
              key={beat.id}
              beat={beat}
              visible={activeBeat?.id === beat.id}
            />
          ))}

          <ChapterCounter activeBeat={activeBeat} />

          <ScrollIndicator visible={activeBeat?.id === "a" && isLoaded} />

          <motion.div
            className="absolute bottom-8 right-8 md:right-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
          >
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.15)",
              }}
            >
              {String(
                Math.min(
                  TOTAL_FRAMES,
                  Math.max(1, Math.floor(scrollProgress * TOTAL_FRAMES) + 1),
                ),
              ).padStart(3, "0")}{" "}
              / {String(TOTAL_FRAMES).padStart(3, "0")}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.section
        className="relative bg-black min-h-screen flex flex-col items-start justify-center px-8 md:px-16 py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div
          className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(100px, 18vw, 280px)",
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "-0.02em",
            lineHeight: 0.85,
          }}
        >
          BLADE RUSH
        </div>

        <motion.h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(64px, 10vw, 140px)",
            lineHeight: 0.88,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.92)",
            marginBottom: "40px",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          YOUR BLADE
          <br />
          AWAITS.
        </motion.h2>

        <motion.button
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#000",
            background: "rgba(255,255,255,0.92)",
            border: "none",
            padding: "14px 36px",
            cursor: "none",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03, background: "#fff" }}
          whileTap={{ scale: 0.97 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          viewport={{ once: true }}
        >
          Play the Blade Dash
        </motion.button>

        {/* Bottom bar */}
        <div className="absolute bottom-8 left-8 md:left-16 right-8 md:right-16 flex justify-between items-end">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.18)",
            }}
          >
            © All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.12)",
            }}
          >
            hello
          </p>
        </div>
      </motion.section>
    </>
  );
}
