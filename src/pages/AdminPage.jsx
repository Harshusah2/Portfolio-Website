import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, XCircle, Trash2, RefreshCw, LogOut,
  Star, Shield, Clock, User, Building2, MessageSquare, Lock
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ── Helpers ─────────────────────────────────────────────────────────────────── */
const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={13}
        fill={s <= rating ? "#FBBF24" : "none"}
        stroke={s <= rating ? "#FBBF24" : "#4B5563"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const Badge = ({ approved }) => (
  <span
    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
    style={
      approved
        ? { background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }
        : { background: "rgba(251,191,36,0.12)", color: "#FBBF24", border: "1px solid rgba(251,191,36,0.3)" }
    }
  >
    {approved ? <CheckCircle2 size={11} /> : <Clock size={11} />}
    {approved ? "Approved" : "Pending"}
  </span>
);

/* ── Login Screen ────────────────────────────────────────────────────────────── */
const LoginScreen = ({ onLogin }) => {
  const [key, setKey]       = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/admin/reviews`, {
        headers: { "x-admin-key": key },
      });
      if (res.status === 401) {
        setError("Invalid admin key. Please try again.");
      } else if (res.ok) {
        sessionStorage.setItem("admin_key", key);
        onLogin(key);
      } else {
        setError("Server error. Please try again.");
      }
    } catch {
      setError("Cannot reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--c-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm p-8 rounded-2xl"
        style={{
          background: "var(--c-bg-card)",
          border: "1px solid rgba(108,99,255,0.3)",
          boxShadow: "0 0 60px rgba(108,99,255,0.12)",
        }}
      >
        {/* Icon */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,255,0.12))",
              border: "1px solid rgba(108,99,255,0.4)",
            }}
          >
            <Shield size={24} style={{ color: "#6C63FF" }} />
          </div>
          <h1
            className="text-xl font-black"
            style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}
          >
            Admin Dashboard
          </h1>
          <p
            className="text-sm mt-1 text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
          >
            Enter your admin key to manage reviews
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--c-text-muted)" }}
            />
            <input
              type="password"
              placeholder="Admin secret key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "var(--c-bg-card-2)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--c-border)")}
              autoFocus
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs flex items-center gap-1.5"
                style={{ color: "#EF4444", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <XCircle size={13} /> {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || !key.trim()}
            className="cosmic-button w-full justify-center py-3 font-semibold"
            style={{ opacity: loading || !key.trim() ? 0.6 : 1 }}
          >
            {loading ? (
              <RefreshCw size={15} className="animate-spin" />
            ) : (
              <Shield size={15} />
            )}
            {loading ? "Verifying…" : "Access Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

/* ── Review Card ─────────────────────────────────────────────────────────────── */
const ReviewCard = ({ review, adminKey, onToggle, onDelete }) => {
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async () => {
    setToggling(true);
    try {
      const res = await fetch(`${API}/api/admin/reviews/${review._id}`, {
        method: "PATCH",
        headers: { "x-admin-key": adminKey },
      });
      if (res.ok) {
        const { data } = await res.json();
        onToggle(data);
      }
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete review by "${review.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/api/admin/reviews/${review._id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      if (res.ok) onDelete(review._id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl p-5"
      style={{
        background: "var(--c-bg-card)",
        border: review.approved
          ? "1px solid rgba(16,185,129,0.25)"
          : "1px solid rgba(251,191,36,0.25)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
            style={{
              background: "rgba(108,99,255,0.12)",
              color: "#6C63FF",
              fontFamily: "'Archivo', sans-serif",
            }}
          >
            {review.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-bold text-sm truncate"
                style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}
              >
                {review.name}
              </span>
              <Badge approved={review.approved} />
            </div>
            <div
              className="flex items-center gap-1.5 text-xs mt-0.5 flex-wrap"
              style={{ color: "var(--c-text-muted)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {review.role && (
                <span className="flex items-center gap-1">
                  <User size={10} /> {review.role}
                </span>
              )}
              {review.company && (
                <span className="flex items-center gap-1">
                  <Building2 size={10} /> {review.company}
                </span>
              )}
            </div>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Message */}
      <p
        className="text-sm leading-relaxed mb-4 line-clamp-3"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: "var(--c-text-muted)",
          borderLeft: "3px solid rgba(108,99,255,0.3)",
          paddingLeft: "0.75rem",
        }}
      >
        <MessageSquare size={11} className="inline mr-1 opacity-50" />
        {review.message}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-xs"
          style={{ color: "var(--c-text-subtle)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {new Date(review.createdAt).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric",
          })}
        </span>

        <div className="flex gap-2">
          {/* Approve / Unapprove */}
          <button
            onClick={handleToggle}
            disabled={toggling}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
            style={
              review.approved
                ? { background: "rgba(251,191,36,0.12)", color: "#FBBF24", border: "1px solid rgba(251,191,36,0.3)" }
                : { background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }
            }
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {toggling ? (
              <RefreshCw size={12} className="animate-spin" />
            ) : review.approved ? (
              <XCircle size={12} />
            ) : (
              <CheckCircle2 size={12} />
            )}
            {review.approved ? "Unapprove" : "Approve"}
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.25)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
          >
            {deleting ? <RefreshCw size={12} className="animate-spin" /> : <Trash2 size={12} />}
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Dashboard ───────────────────────────────────────────────────────────────── */
const Dashboard = ({ adminKey, onLogout }) => {
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all"); // all | pending | approved
  const [error, setError]       = useState("");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/admin/reviews`, {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      setReviews(data.data || []);
    } catch {
      setError("Failed to load reviews. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [adminKey, onLogout]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const handleToggle = (updated) =>
    setReviews((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));

  const handleDelete = (id) =>
    setReviews((prev) => prev.filter((r) => r._id !== id));

  const filtered = reviews.filter((r) =>
    filter === "all" ? true : filter === "approved" ? r.approved : !r.approved
  );

  const pending  = reviews.filter((r) => !r.approved).length;
  const approved = reviews.filter((r) => r.approved).length;

  const FILTERS = [
    { key: "all",      label: `All (${reviews.length})` },
    { key: "pending",  label: `Pending (${pending})` },
    { key: "approved", label: `Approved (${approved})` },
  ];

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ background: "var(--c-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-black"
              style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}
            >
              Review Dashboard
            </h1>
            <p
              className="text-sm mt-0.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
            >
              Manage who appears in your portfolio
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchReviews}
              className="p-2 rounded-xl transition-all duration-200"
              style={{
                background: "var(--c-bg-card)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-muted)",
              }}
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#EF4444",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total", value: reviews.length, color: "#6C63FF" },
            { label: "Pending", value: pending, color: "#FBBF24" },
            { label: "Approved", value: approved, color: "#10B981" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-2xl p-4 text-center"
              style={{ background: "var(--c-bg-card)", border: `1px solid ${color}25` }}
            >
              <div
                className="text-2xl font-black"
                style={{ fontFamily: "'Archivo', sans-serif", color }}
              >
                {value}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={
                filter === key
                  ? {
                      background: "linear-gradient(135deg, #6C63FF, #A855F7)",
                      color: "#fff",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }
                  : {
                      background: "var(--c-bg-card)",
                      border: "1px solid var(--c-border)",
                      color: "var(--c-text-muted)",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-20">
            <RefreshCw size={24} className="animate-spin" style={{ color: "#6C63FF" }} />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}>
              Loading reviews…
            </p>
          </div>
        ) : error ? (
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <XCircle size={24} className="mx-auto mb-2" style={{ color: "#EF4444" }} />
            <p style={{ color: "#EF4444", fontFamily: "'Space Grotesk', sans-serif" }}>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare size={36} className="mx-auto mb-3 opacity-20" style={{ color: "var(--c-text)" }} />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}>
              No {filter !== "all" ? filter : ""} reviews found.
            </p>
          </div>
        ) : (
          <motion.div layout className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  adminKey={adminKey}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ── AdminPage ───────────────────────────────────────────────────────────────── */
export const AdminPage = () => {
  const [adminKey, setAdminKey] = useState(
    () => sessionStorage.getItem("admin_key") || ""
  );

  const handleLogin  = (key) => setAdminKey(key);
  const handleLogout = () => {
    sessionStorage.removeItem("admin_key");
    setAdminKey("");
  };

  return adminKey ? (
    <Dashboard adminKey={adminKey} onLogout={handleLogout} />
  ) : (
    <LoginScreen onLogin={handleLogin} />
  );
};
