import { useEffect, useRef, useState } from "react";
import { Star, Quote, X, Loader2, Send } from "lucide-react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { viewport, fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ── Helpers ───────────────────────────────────────────────────────────────── */

const StarPicker = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} type="button" onClick={() => onChange(star)}
        className="transition-transform hover:scale-125 cursor-pointer"
        aria-label={`${star} star${star > 1 ? "s" : ""}`}
      >
        <Star size={28} className="transition-colors duration-150"
          fill={star <= value ? "#f59e0b" : "none"}
          stroke={star <= value ? "#f59e0b" : "rgba(108,99,255,0.3)"}
        />
      </button>
    ))}
  </div>
);

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={14}
        fill={s <= rating ? "#f59e0b" : "none"}
        stroke={s <= rating ? "#f59e0b" : "rgba(108,99,255,0.2)"}
      />
    ))}
  </div>
);

const AVATAR_GRADIENTS = [
  ["#6C63FF", "#A855F7"], ["#0ea5e9", "#00D4FF"],
  ["#10b981", "#34d399"], ["#f59e0b", "#fb923c"], ["#ec4899", "#f43f5e"],
];

const Avatar = ({ name, index }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const [c1, c2] = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})`, boxShadow: `0 0 16px ${c1}55`, fontFamily: "'Archivo', sans-serif" }}
    >
      {initials}
    </div>
  );
};

/* ── Review Card — Framer Motion hover ─────────────────────────────────────── */
const ReviewCard = ({ review, index }) => (
  <motion.div
    className="p-6 flex-shrink-0 flex flex-col gap-4 text-left relative overflow-hidden"
    style={{
      width: 320,
      borderRadius: "1.25rem",
      background: "var(--c-bg-card)",
      border: "1px solid var(--c-border)",
      backdropFilter: "blur(16px)",
      boxShadow: "var(--c-card-shadow)",
    }}
    whileHover={{
      y: -6,
      scale: 1.02,
      borderColor: "rgba(108,99,255,0.45)",
      boxShadow: "0 16px 48px rgba(108,99,255,0.18), 0 4px 16px rgba(0,0,0,0.1)",
    }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
  >
    <Quote
      size={36} className="absolute top-4 right-4"
      style={{ color: "rgba(108,99,255,0.12)" }}
      fill="currentColor"
    />
    <Stars rating={review.rating} />
    <p
      className="text-sm leading-relaxed line-clamp-4 relative z-10"
      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
    >
      &ldquo;{review.message}&rdquo;
    </p>
    <div
      className="flex items-center gap-3 mt-auto pt-3"
      style={{ borderTop: "1px solid var(--c-border)" }}
    >
      <Avatar name={review.name} index={index} />
      <div>
        <p className="font-semibold text-sm" style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}>
          {review.name}
        </p>
        {(review.role || review.company) && (
          <p className="text-xs" style={{ color: "var(--c-text-subtle)", fontFamily: "'Space Grotesk', sans-serif" }}>
            {review.role}{review.role && review.company ? " · " : ""}{review.company}
          </p>
        )}
      </div>
    </div>
  </motion.div>
);

/* ── Infinite Marquee ───────────────────────────────────────────────────────── */
/**
 * Uses Framer Motion's useAnimationFrame + useMotionValue for perfectly smooth
 * infinite scroll that truly pauses (no jump) on hover.
 */
const InfiniteMarquee = ({ reviews }) => {
  const trackRef   = useRef(null);
  const x          = useMotionValue(0);
  const paused     = useRef(false);
  const SPEED      = 0.045; // px per ms  (increase for faster scroll)

  useAnimationFrame((_, delta) => {
    if (paused.current || !trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let next = x.get() - delta * SPEED;
    // Seamless loop: when we've scrolled exactly half the duplicated track, snap back
    if (Math.abs(next) >= halfWidth) next = 0;
    x.set(next);
  });

  // Duplicate for seamless loop
  const doubled = [...reviews, ...reviews];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => { paused.current = true;  }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Left + right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "var(--c-fade-left)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "var(--c-fade-right)" }} />

      <motion.div
        ref={trackRef}
        className="flex gap-5 pb-4"
        style={{ x }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review._id ?? i}-${i}`} review={review} index={i} />
        ))}
      </motion.div>
    </div>
  );
};

/* ── Submit modal ───────────────────────────────────────────────────────────── */
const SubmitModal = ({ onClose, onSuccess }) => {
  const { toast }   = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", rating: 0, message: "" });

  const handleChange  = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) { toast({ title: "Please select a star rating", variant: "destructive" }); return; }
    setIsSubmitting(true);
    try {
      const res  = await fetch(`${API}/api/reviews`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      toast({ title: "🎉 Review submitted!", description: "Thank you for your feedback!" });
      onSuccess(data.data);
      onClose();
    } catch (err) {
      toast({ title: "❌ Error", description: err.message, variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem",
    border: "1px solid var(--c-border)", background: "var(--c-input-bg)",
    color: "var(--c-text)", fontSize: "0.875rem",
    fontFamily: "'Space Grotesk', sans-serif", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
  const labelStyle = {
    display: "block", fontSize: "0.7rem", fontWeight: 700,
    letterSpacing: "0.15em", textTransform: "uppercase",
    color: "var(--c-text-subtle)", marginBottom: "0.4rem",
    fontFamily: "'Space Grotesk', sans-serif",
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="w-full max-w-md p-8 relative"
        style={{
          borderRadius: "1.5rem", background: "var(--c-bg-card)",
          border: "1px solid var(--c-border-strong)",
          boxShadow: "0 0 60px rgba(108,99,255,0.15), 0 40px 80px rgba(0,0,0,0.3)",
          backdropFilter: "blur(24px)",
        }}
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl transition-colors cursor-pointer"
          style={{ color: "var(--c-text-subtle)", background: "rgba(108,99,255,0.08)", border: "1px solid var(--c-border)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.2)"; e.currentTarget.style.color = "var(--c-text)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.08)"; e.currentTarget.style.color = "var(--c-text-subtle)"; }}
        >
          <X size={16} />
        </button>
        <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}>Leave a Review</h3>
        <p className="text-sm mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}>Share your experience working with me.</p>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label style={labelStyle}>Your Rating *</label>
            <StarPicker value={form.rating} onChange={(v) => setForm((p) => ({ ...p, rating: v }))} />
          </div>
          <div>
            <label htmlFor="rev-name" style={labelStyle}>Full Name *</label>
            <input id="rev-name" name="name" type="text" required value={form.name} onChange={handleChange}
              placeholder="John Doe" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(108,99,255,0.6)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(108,99,255,0.2)"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.boxShadow = ""; }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{ id: "rev-role", name: "role", label: "Role", placeholder: "e.g. CEO" }, { id: "rev-company", name: "company", label: "Company", placeholder: "Acme Inc." }].map(({ id, name, label, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} style={labelStyle}>{label}</label>
                <input id={id} name={name} type="text" value={form[name]} onChange={handleChange} placeholder={placeholder} style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(108,99,255,0.6)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(108,99,255,0.2)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.boxShadow = ""; }}
                />
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="rev-message" style={labelStyle}>Your Review *</label>
            <textarea id="rev-message" name="message" required rows={4} value={form.message} onChange={handleChange}
              placeholder="Share your experience working with Harsh…" style={{ ...inputStyle, resize: "none" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(108,99,255,0.6)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(108,99,255,0.2)"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.boxShadow = ""; }}
            />
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="cosmic-button w-full justify-center py-3 font-semibold"
            whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(108,99,255,0.55)" }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting
              ? <><Loader2 size={16} className="animate-spin" /> Submitting…</>
              : <><Send size={16} /> Submit Review</>}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   Main ReviewsSection
══════════════════════════════════════════════════════════════════════════════ */
export const ReviewsSection = () => {
  const { toast }             = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/reviews`)
      .then((r) => r.json())
      .then((data) => { if (data.success) setReviews(data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile (< 768px)
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  // Mobile: allow marquee if > 1 review. Desktop: allow if >= 4 reviews.
  const hasEnoughForMarquee = isMobile ? reviews.length > 1 : reviews.length >= 4;

  // If using marquee with < 4 items (e.g., 2 items on mobile), we must clone them 
  // so the scrolling track is physically wide enough to loop without gaps.
  let marqueeReviews = reviews;
  if (hasEnoughForMarquee && reviews.length < 4) {
    marqueeReviews = [...reviews, ...reviews, ...reviews].slice(0, 4);
  }

  return (
    <section id="reviews" className="py-28 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(108,99,255,0.06) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.5), transparent)" }} />

      {/* ── Section header ───────────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.1)}
        >
          <motion.span className="section-badge" variants={staggerItem}>Client Love</motion.span>

          <motion.h2
            className="font-black"
            variants={staggerItem}
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--c-text)" }}
          >
            What Clients{" "}
            <span style={{ background: "linear-gradient(135deg, #6C63FF, #00D4FF)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Say
            </span>
          </motion.h2>

          {avgRating && (
            <motion.div className="flex items-center justify-center gap-2 mt-5" variants={staggerItem}>
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
                <span className="font-bold" style={{ color: "#f59e0b", fontFamily: "'Archivo', sans-serif" }}>{avgRating}</span>
                <span className="text-xs" style={{ color: "var(--c-text-subtle)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  / 5 · {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            </motion.div>
          )}

          <motion.p
            className="mt-4 max-w-xl mx-auto text-sm"
            variants={staggerItem}
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
          >
            Real feedback from real clients. Have we worked together?{" "}
            <motion.button
              onClick={() => setShowModal(true)}
              className="font-semibold cursor-pointer"
              style={{ color: "#6C63FF" }}
              whileHover={{ textDecoration: "underline" }}
            >
              Leave your review →
            </motion.button>
          </motion.p>
        </motion.div>
      </div>

      {/* ── Marquee (full-bleed, no container padding) ───────────────────────── */}
      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 size={32} style={{ color: "#6C63FF" }} className="animate-spin" />
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={hasEnoughForMarquee ? "px-4" : "container mx-auto max-w-6xl px-4"}
        >
          {hasEnoughForMarquee ? (
            <InfiniteMarquee reviews={marqueeReviews} />
          ) : (
            <div className="flex flex-wrap justify-center gap-5 pb-4">
              {reviews.map((review, i) => (
                <ReviewCard key={review._id || i} review={review} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {!loading && reviews.length === 0 && (
        <motion.div
          className="text-center py-16 container mx-auto max-w-6xl px-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
        >
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)" }}>
            <Star size={32} style={{ color: "#6C63FF" }} />
          </div>
          <p className="text-base mb-2" style={{ color: "var(--c-text-muted)", fontFamily: "'Space Grotesk', sans-serif" }}>No reviews yet</p>
          <p className="text-sm" style={{ color: "var(--c-text-subtle)", fontFamily: "'Space Grotesk', sans-serif" }}>Be the first to share your experience!</p>
        </motion.div>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <motion.div
        className="text-center mt-12 container mx-auto max-w-6xl px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          onClick={() => setShowModal(true)}
          className="cosmic-button"
          whileHover={{ scale: 1.06, boxShadow: "0 0 36px rgba(108,99,255,0.6), 0 8px 30px rgba(108,99,255,0.3)" }}
          whileTap={{ scale: 0.97 }}
        >
          <Star size={16} fill="currentColor" /> Rate My Work
        </motion.button>
      </motion.div>

      {showModal && (
        <SubmitModal
          onClose={() => setShowModal(false)}
          onSuccess={(r) => setReviews((prev) => [r, ...prev])}
        />
      )}
    </section>
  );
};
