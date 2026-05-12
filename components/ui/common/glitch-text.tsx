"use client";
import { Constant } from "@/data/Data";
import { useEffect, useState } from "react";

export const GlitchText = ({
  text,
  style = {},
}: {
  text: string;
  style?: any;
}) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 120);
      },
      4000 + Math.random() * 3000,
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        ...style,
      }}
    >
      {text}
      {glitch && (
        <>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 2,
              color: Constant.cyan,
              opacity: 0.7,
              clipPath: "polygon(0 30%, 100% 30%, 100% 60%, 0 60%)",
              pointerEvents: "none",
            }}
          >
            {text}
          </span>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: -2,
              color: Constant.magenta,
              opacity: 0.7,
              clipPath: "polygon(0 60%, 100% 60%, 100% 90%, 0 90%)",
              pointerEvents: "none",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};
