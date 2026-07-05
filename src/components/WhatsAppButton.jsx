import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ── Config ────────────────────────────────────────────────────────────────── */
const WHATSAPP_NUMBER = "+919098352698"; // e.g. 919876543210 for +91 98765 43210
const ENQUIRY_TEXT = encodeURIComponent(
  "Hello Harsh! I visited your portfolio and I have an enquiry regarding your services."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${ENQUIRY_TEXT}`;

/* ── WhatsApp SVG icon ─────────────────────────────────────────────────────── */
const WhatsAppIcon = ({ size = 28 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ── Main component ─────────────────────────────────────────────────────────── */
export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap pointer-events-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "rgba(18,18,28,0.92)",
              border: "1px solid rgba(37,211,102,0.35)",
              color: "#25D366",
              boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
              backdropFilter: "blur(12px)",
            }}
          >
            💬 Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Harsh on WhatsApp"
        className="relative w-14 h-14 rounded-full flex items-center justify-center text-white"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 4px 24px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.2)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
        whileHover={{
          scale: 1.12,
          boxShadow: "0 6px 36px rgba(37,211,102,0.65), 0 2px 12px rgba(0,0,0,0.25)",
        }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Ping ring animation */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: "rgba(37,211,102,0.28)",
            animationDuration: "2.2s",
          }}
          aria-hidden
        />
        <WhatsAppIcon size={26} />
      </motion.a>
    </div>
  );
};
