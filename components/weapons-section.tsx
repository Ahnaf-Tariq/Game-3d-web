"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Constant, WEAPONS } from "@/data/Data";
import { FadeUp } from "./ui/common/fade-up";

export function WeaponsSection() {
  const [selected, setSelected] = useState(WEAPONS[0]);

  return (
    <section
      style={{
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
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

      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${Constant.border} 1px, transparent 1px), linear-gradient(90deg, ${Constant.border} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
        }}
      >
        <FadeUp>
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
            // Armory //
          </p>
          <h2
            style={{
              fontFamily: Constant.font,
              fontSize: "clamp(36px, 5vw, 64px)",
              color: Constant.text,
              lineHeight: 0.95,
              letterSpacing: "0.04em",
              marginBottom: 48,
            }}
          >
            CHOOSE YOUR <span style={{ color: "#00f5ff" }}>WEAPON</span>
          </h2>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* Left: weapon selector */}
          <FadeUp delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {WEAPONS.map((w) => (
                <WeaponRow
                  key={w.id}
                  weapon={w}
                  isSelected={selected.id === w.id}
                  onClick={() => setSelected(w)}
                />
              ))}
            </div>
          </FadeUp>

          {/* Right: weapon detail */}
          <FadeUp delay={0.2}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: Constant.card,
                  border: `1px solid ${selected.accent}`,
                  padding: "36px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow background */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at 80% 20%, ${selected.accent}18 0%, transparent 65%)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Corner cut */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 36,
                    height: 36,
                    background: Constant.surface,
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                />

                <div
                  style={{
                    fontSize: 64,
                    color: selected.accent,
                    filter: `drop-shadow(0 0 20px ${selected.accent})`,
                    marginBottom: 20,
                    lineHeight: 1,
                  }}
                >
                  {selected.icon}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: Constant.font,
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      color: selected.accent,
                      border: `1px solid ${selected.accent}`,
                      padding: "2px 8px",
                    }}
                  >
                    {selected.class}
                  </span>
                  <span
                    style={{
                      fontFamily: Constant.font,
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      color: selected.accent,
                      border: `1px solid ${selected.accent}`,
                      padding: "2px 8px",
                    }}
                  >
                    TIER {selected.tier}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: Constant.font,
                    fontSize: 40,
                    color: Constant.text,
                    lineHeight: 1,
                    letterSpacing: "0.06em",
                    marginBottom: 16,
                    whiteSpace: "pre-line",
                  }}
                >
                  {selected.name}
                </h3>

                <p
                  style={{
                    fontFamily: Constant.body,
                    fontWeight: 300,
                    fontSize: 13,
                    color: Constant.muted,
                    lineHeight: 1.7,
                    marginBottom: 28,
                  }}
                >
                  {selected.lore}
                </p>

                {/* Stat bars */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {Object.entries(selected.stats).map(([k, v]) => (
                    <StatBar
                      key={k}
                      label={k.toUpperCase()}
                      value={v}
                      color={selected.accent}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function WeaponRow({ weapon, isSelected, onClick }: any) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ x: 6 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        background: isSelected ? `${weapon.accent}10` : `${weapon.accent}08`,
        border: `1px solid ${isSelected ? weapon.accent : Constant.border}`,
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s",
        position: "relative",
      }}
    >
      {isSelected && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: weapon.accent,
            boxShadow: `0 0 10px ${weapon.accent}`,
          }}
        />
      )}
      <span style={{ fontSize: 24, color: weapon.accent }}>{weapon.icon}</span>
      <div>
        <div
          style={{
            fontFamily: Constant.font,
            fontSize: 18,
            color: Constant.text,
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          {weapon.name.replace("\n", " ")}
        </div>
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 10,
            color: Constant.dim,
            letterSpacing: "0.18em",
            marginTop: 4,
          }}
        >
          {weapon.id} · {weapon.class}
        </div>
      </div>
      <div
        style={{
          marginLeft: "auto",
          fontFamily: Constant.font,
          fontSize: 20,
          color: isSelected ? weapon.accent : Constant.dim,
          transition: "color 0.2s",
        }}
      >
        TIER {weapon.tier}
      </div>
    </motion.div>
  );
}

function StatBar({ label, value, color }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
    <div ref={ref}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: Constant.muted,
        }}
      >
        <span>{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div
        style={{
          height: 3,
          background: Constant.border,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            height: "100%",
            background: `linear-gradient(to right, ${color}, ${color}88)`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}
