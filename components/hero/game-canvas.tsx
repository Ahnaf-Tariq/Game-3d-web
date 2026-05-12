"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./loading-screen";
import { ChapterCounter, ScrollIndicator, ScrollProgress } from "./scroll";
import { TextOverlay } from "./text-overlay";
import { TEXT_BEATS, TextBeat } from "@/data/Data";
import Image from "next/image";

const TOTAL_FRAMES = 180;
const FRAME_BASE = "/sequence/ezgif-frame-";

function padFrame(n: number): string {
  return String(n).padStart(3, "0");
}
function getFrameSrc(i: number): string {
  return `${FRAME_BASE}${padFrame(i)}.jpg`;
}

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
  const scrollProgressRef = useRef(0);
  const currentBeatRef = useRef<string | null>(null);

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
      const img = new window.Image();
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
      // setScrollProgress(progress);
      scrollProgressRef.current = progress;

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
      if (beat?.id !== currentBeatRef.current) {
        currentBeatRef.current = beat?.id ?? null;
        setActiveBeat(beat);
      }

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
          <motion.div
            className="absolute left-8 top-4 md:left-12 z-50 pointer-events-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/logo_2.png"
              alt="Blade Rush Logo"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </motion.div>

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
    </>
  );
}
