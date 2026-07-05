/**
 * Shared Framer Motion animation variants for the portfolio.
 * Import these wherever you need consistent, reusable motion presets.
 */

/* ── Base easing ──────────────────────────────────────────────────────────── */
export const ease = [0.22, 1, 0.36, 1]; // custom spring-like ease

/* ── Common viewport config ───────────────────────────────────────────────── */
export const viewport = { once: false, margin: "-80px" };
export const viewportOnce = { once: true, margin: "-60px" };

/* ── Fade-in from bottom ──────────────────────────────────────────────────── */
export const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.7, ease } },
};

export const fadeUpDelay = (delay = 0) => ({
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease } },
});

/* ── Fade-in from left/right ──────────────────────────────────────────────── */
export const fadeLeft = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.6, ease } },
};
export const fadeRight = {
  hidden:  { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.6, ease } },
};

/* ── Scale-in ────────────────────────────────────────────────────────────── */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.55, ease } },
};

/* ── Container with staggered children ───────────────────────────────────── */
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/* ── Individual stagger item (used inside staggerContainer) ──────────────── */
export const staggerItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease } },
};

export const staggerItemLeft = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.45, ease } },
};

/* ── Hover presets (use directly on motion elements) ─────────────────────── */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
  whileTap:   { scale: 0.97, transition: { duration: 0.1 } },
};

export const hoverGlow = (color = "rgba(108,99,255,0.55)") => ({
  whileHover: { scale: 1.08, boxShadow: `0 0 22px ${color}`, transition: { duration: 0.22 } },
  whileTap:   { scale: 0.95 },
});

export const hoverScale = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap:   { scale: 0.97 },
};
