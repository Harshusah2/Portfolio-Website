import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * PageLoader — fullscreen overlay that fades out after React mounts.
 * Shows a branded logo/spinner for ~800ms to mask cold-start flash.
 */
export const PageLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--c-bg)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5"
          >
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(108,99,255,0.22), rgba(0,212,255,0.14))",
                border: "1px solid rgba(108,99,255,0.5)",
                boxShadow: "0 0 40px rgba(108,99,255,0.35)",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                stroke="#6C63FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>

            {/* Name */}
            <span
              className="text-xl font-black"
              style={{ fontFamily: "'Archivo', sans-serif" }}
            >
              <span style={{ color: "var(--c-text)" }}>Harsh</span>
              <span style={{
                background: "linear-gradient(90deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>.dev</span>
            </span>

            {/* Spinner bar */}
            <div
              className="w-32 h-0.5 rounded-full overflow-hidden"
              style={{ background: "rgba(108,99,255,0.15)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6C63FF, #00D4FF)" }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
