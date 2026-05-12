"use client";
import { useState } from "react";
import { Constant, FOOTER_LINKS } from "@/data/Data";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const currentYear = 2026;

  const handleSubmit = () => {
    if (email) {
      setSent(true);
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        background: "#000",
        position: "relative",
        overflow: "hidden",
        paddingTop: 0,
      }}
    >
      {/* Top border */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(to right, transparent, ${Constant.cyan}66, ${Constant.magenta}66, transparent)`,
        }}
      />

      {/* CTA Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, #0a0a0a 0%, #0d0d12 100%)`,
          borderBottom: `1px solid ${Constant.border}`,
          padding: "64px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${Constant.border} 1px, transparent 1px), linear-gradient(90deg, ${Constant.border} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: 0.3,
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `${Constant.cyan}0a`,
            top: -200,
            left: -100,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `${Constant.magenta}0a`,
            bottom: -150,
            right: 0,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                letterSpacing: "0.3em",
                color: Constant.cyan,
                marginBottom: 12,
              }}
            >
              // ENTER THE ARENA //
            </p>
            <h2
              style={{
                fontFamily: Constant.font,
                fontSize: "clamp(32px, 5vw, 60px)",
                color: Constant.text,
                lineHeight: 0.95,
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              JOIN THE BLADE RUSH
              <br />
              <span style={{ color: Constant.cyan }}>UPRISING</span>
            </h2>
          </div>

          {/* Newsletter */}
          <div style={{ minWidth: 320, maxWidth: 420 }}>
            <p
              style={{
                fontFamily: Constant.body,
                fontWeight: 300,
                fontSize: 13,
                color: Constant.muted,
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              Get early access drops, patch intel, and exclusive events
              delivered to your inbox.
            </p>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", gap: 0 }}
                >
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${Constant.border}`,
                      borderRight: "none",
                      padding: "12px 16px",
                      fontFamily: "'Courier New', monospace",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      color: Constant.text,
                      outline: "none",
                    }}
                  />
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ background: Constant.cyan, color: "black" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: "transparent",
                      border: `1px solid ${Constant.cyan}`,
                      padding: "12px 20px",
                      fontFamily: Constant.font,
                      fontSize: 12,
                      letterSpacing: "0.2em",
                      color: Constant.cyan,
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ENLIST →
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "14px 20px",
                    border: `1px solid ${Constant.green}`,
                    fontFamily: "'Courier New', monospace",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: Constant.green,
                    textShadow: `0 0 10px ${Constant.green}`,
                  }}
                >
                  ✓ TRANSMISSION RECEIVED. STAND BY.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 32px 40px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 32,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: Constant.font,
                fontSize: 36,
                letterSpacing: "0.1em",
                color: Constant.text,
                marginBottom: 4,
              }}
            >
              BLADE{" "}
              <span
                style={{
                  color: Constant.cyan,
                  textShadow: `0 0 20px ${Constant.cyan}66`,
                }}
              >
                RUSH
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 9,
                letterSpacing: "0.25em",
                color: Constant.dim,
                marginBottom: 20,
              }}
            >
              © {currentYear} BLADE RUSH STUDIOS
            </div>
            <p
              style={{
                fontFamily: Constant.body,
                fontWeight: 300,
                fontSize: 12,
                color: Constant.muted,
                lineHeight: 1.7,
                maxWidth: 240,
                marginBottom: 24,
              }}
            >
              Enter the flow state. Master every blade. Claim the throne. Season
              3 — live now.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {["⬡", "◎", "◈", "⊕"].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{
                    borderColor: Constant.cyan,
                    color: Constant.cyan,
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    border: `1px solid ${Constant.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: Constant.muted,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <div
                style={{
                  fontFamily: Constant.font,
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: Constant.cyan,
                  marginBottom: 20,
                  paddingBottom: 10,
                  borderBottom: `1px solid ${Constant.border}`,
                }}
              >
                {section}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {links.map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    whileHover={{ color: Constant.text, x: 4 }}
                    style={{
                      fontFamily: Constant.body,
                      fontWeight: 300,
                      fontSize: 13,
                      color: Constant.muted,
                      textDecoration: "none",
                      transition: "color 0.2s",
                      display: "inline-block",
                    }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: `1px solid ${Constant.border}`,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              color: Constant.dim,
              letterSpacing: "0.18em",
            }}
          >
            BUILD v3.4.1 — SERVER STATUS:{" "}
            <span style={{ color: Constant.green }}>● ONLINE</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 24,
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: Constant.dim,
            }}
          >
            {["ESRB M", "PEGI 16", "GDPR COMPLIANT"].map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
