import { useEffect, useState } from "react";
import { ArrowDown, Code2, Smartphone, Shield, Download, MessageCircle, Terminal } from "lucide-react";
import { useInView } from "react-intersection-observer";

const ROLES = [
  "Full Stack Developer",
  "Software Developer",
  "React Native Developer",
  "Flutter Developer",
  "MERN Stack Engineer",
  "UI/UX Enthusiast",
];

const TECH_BADGES = [
  { label: "React.js", color: "#61DAFB" },
  { label: "Node.js", color: "#68A063" },
  { label: "MongoDB", color: "#4DB33D" },
  { label: "React Native", color: "#61DAFB" },
  { label: "Next.js", color: "#a8a8a8" },
  { label: "Tailwind CSS", color: "#38BDF8" },
];

const STATS = [
  { icon: Code2, num: 1, suffix: "+", label: "Years Exp." },
  { icon: Smartphone, num: 10, suffix: "+", label: "Projects" },
  { icon: Shield, num: 4, suffix: "★", label: "Avg Rating" },
];

/* ── Availability Badge Config ─────────────────────────────────────────────── */
// Change VITE_AVAILABILITY in Vercel env vars to update the badge instantly
// without touching any code. Options: "fulltime" | "freelance" | "busy"
const AVAILABILITY_CONFIG = {
  fulltime: {
    label: "Open to Full-Time Roles",
    dot: "#10B981",
    bg: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.08))",
    border: "rgba(16,185,129,0.35)",
    color: "#10B981",
    pulse: true,
  },
  freelance: {
    label: "Available for Freelance",
    dot: "#00D4FF",
    bg: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(108,99,255,0.1))",
    border: "rgba(0,212,255,0.3)",
    color: "#00D4FF",
    pulse: true,
  },
  busy: {
    label: "Currently Unavailable",
    dot: "#F97316",
    bg: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.06))",
    border: "rgba(249,115,22,0.28)",
    color: "#F97316",
    pulse: false,
  },
};

const STATUS_KEY = (import.meta.env.VITE_AVAILABILITY || "freelance").toLowerCase();
const AVAIL = AVAILABILITY_CONFIG[STATUS_KEY] ?? AVAILABILITY_CONFIG.freelance;

/* ── Count-up hook ─────────────────────────────────────────────────────────── */
const useCountUp = (end, duration = 1500, active = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      setCount(Math.floor(end * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, active]);
  return count;
};

/* ── 3-D Floating Code Window ──────────────────────────────────────────────── */
const CodeWindow = () => {
  const lines = [
    { indent: 0, text: "const developer = {", color: "var(--c-text)" },
    { indent: 1, text: 'name: "Harsh Sahu",', color: "#00D4FF" },
    { indent: 1, text: 'role: "Full Stack Dev",', color: "#A3E635" },
    { indent: 1, text: "skills: [", color: "var(--c-text)" },
    { indent: 2, text: '"React", "Node.js",', color: "#FDA4AF" },
    { indent: 2, text: '"MongoDB", "Next.js"', color: "#FDA4AF" },
    { indent: 1, text: "],", color: "var(--c-text)" },
    { indent: 1, text: "available: true,", color: "#6C63FF" },
    { indent: 0, text: "};", color: "var(--c-text)" },
  ];

  return (
    <div
      className="animate-float-3d perspective-1000"
      style={{
        width: "100%",
        maxWidth: 420,
        borderRadius: "1.25rem",
        overflow: "hidden",
        border: "1px solid rgba(108,99,255,0.35)",
        /* Code window always stays dark — it's a terminal */
        background: "linear-gradient(135deg, rgba(12,12,22,0.99), rgba(8,8,18,0.97))",
        boxShadow: "0 0 60px rgba(108,99,255,0.2), 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        transform: "perspective(800px) rotateY(-4deg) rotateX(3deg)",
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: "rgba(18,18,32,0.95)", borderBottom: "1px solid rgba(108,99,255,0.15)" }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        <div className="flex items-center gap-1.5 ml-3">
          <Terminal size={12} style={{ color: "#6C63FF" }} />
          <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(241,245,249,0.4)" }}>
            portfolio.js
          </span>
        </div>
      </div>

      {/* Code body */}
      <div className="p-5" style={{ fontFamily: "monospace", fontSize: "0.78rem", lineHeight: "1.9" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            className="flex"
            style={{
              opacity: 0,
              animation: `fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) ${0.3 + i * 0.1}s forwards`,
            }}
          >
            <span style={{ color: "rgba(100,116,139,0.45)", minWidth: "2rem", userSelect: "none", fontSize: "0.68rem" }}>
              {i + 1}
            </span>
            <span style={{ paddingLeft: `${line.indent * 1.2}rem`, color: line.color }}>
              {line.text}
            </span>
          </div>
        ))}
        <div className="flex mt-1">
          <span style={{ color: "rgba(100,116,139,0.45)", minWidth: "2rem", fontSize: "0.68rem" }}>{lines.length + 1}</span>
          <span className="animate-typing-cursor" style={{ color: "#6C63FF", fontSize: "1rem", lineHeight: "1" }}>▌</span>
        </div>
      </div>
    </div>
  );
};

/* ── Animated Stat Card ────────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, num, suffix, label, active }) => {
  const count = useCountUp(num, 1500, active);
  return (
    <div className="flex flex-col items-start gap-0.5">
      <div className="flex items-center gap-1.5">
        <Icon size={14} style={{ color: "#6C63FF" }} />
        <span
          className="text-2xl font-black"
          style={{ fontFamily: "'Archivo', sans-serif", color: "#6C63FF", textShadow: "0 0 15px rgba(108,99,255,0.6)" }}
        >
          {count}{suffix}
        </span>
      </div>
      <span
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", color: "var(--c-text-subtle)", textTransform: "uppercase", letterSpacing: "0.1em" }}
      >
        {label}
      </span>
    </div>
  );
};

export const HeroSection = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = ROLES[roleIndex];
    let t;
    if (typing) {
      if (displayed.length < target.length)
        t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75);
      else
        t = setTimeout(() => setTyping(false), 1800);
    } else {
      if (displayed.length > 0)
        t = setTimeout(() => setDisplayed(target.slice(0, displayed.length - 1)), 35);
      else { setRoleIndex((i) => (i + 1) % ROLES.length); setTyping(true); }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-12 overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left ── */}
          <div className="text-left space-y-6">

            {/* Availability badge — driven by VITE_AVAILABILITY env var */}
            <div className={`opacity-0 ${inView ? "animate-fade-in-up" : ""}`}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: AVAIL.bg,
                  border: `1px solid ${AVAIL.border}`,
                  color: AVAIL.color,
                }}
              >
                <span
                  className={`w-2 h-2 rounded-full ${AVAIL.pulse ? "animate-pulse" : ""}`}
                  style={{
                    background: AVAIL.dot,
                    boxShadow: `0 0 8px ${AVAIL.dot}`,
                    opacity: AVAIL.pulse ? 1 : 0.7,
                  }}
                />
                {AVAIL.label}
              </span>
            </div>

            {/* Name */}
            <div className={`opacity-0 ${inView ? "animate-fade-in-up-delay-1" : ""}`}>
              <h1
                className="font-black leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  color: "var(--c-text)",
                }}
              >
                Hi, I&apos;m{" "}
                <span className="animate-shimmer" style={{ display: "inline-block" }}>
                  Harsh Sahu
                </span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className={`opacity-0 ${inView ? "animate-fade-in-up-delay-2" : ""}`}>
              <div
                className="text-xl md:text-2xl font-semibold h-9"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
              >
                <span>{displayed}</span>
                <span className="animate-typing-cursor ml-0.5" style={{ color: "#6C63FF" }}>|</span>
              </div>
            </div>

            {/* Description */}
            <p
              className={`opacity-0 ${inView ? "animate-fade-in-up-delay-3" : ""} leading-relaxed max-w-lg`}
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", color: "var(--c-text-muted)" }}
            >
              BCA student specializing in Mobile Applications &amp; Information Security,
              with hands-on experience building production-ready Full Stack applications.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-3 opacity-0 ${inView ? "animate-fade-in-up-delay-4" : ""}`}>
              <a href="#projects" className="cosmic-button">
                <Code2 size={15} /> View My Work
              </a>
              <a
                href="CV/Harsh_Sahu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300"
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  border: "1px solid rgba(108,99,255,0.5)",
                  color: "#6C63FF",
                  background: "rgba(108,99,255,0.08)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.18)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(108,99,255,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.08)"; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}
              >
                <Download size={15} /> Download CV
              </a>
              <a
                href="#reviews"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300"
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  border: "1px solid var(--c-border)",
                  color: "var(--c-text-muted)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(108,99,255,0.5)"; e.currentTarget.style.color = "#6C63FF"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.color = "var(--c-text-muted)"; e.currentTarget.style.transform = ""; }}
              >
                <MessageCircle size={15} /> Client Reviews
              </a>
            </div>

            {/* Tech badges */}
            <div className={`flex flex-wrap gap-2 opacity-0 ${inView ? "animate-fade-in-up-delay-5" : ""}`}>
              {TECH_BADGES.map(({ label, color }) => (
                <span
                  key={label}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-default"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color, background: `${color}18`, border: `1px solid ${color}30` }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 0 12px ${color}44`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className={`flex gap-8 opacity-0 ${inView ? "animate-fade-in-up-delay-6" : ""}`}>
              {STATS.map(({ icon: Icon, num, suffix, label }) => (
                <StatCard key={label} icon={Icon} num={num} suffix={suffix} label={label} active={inView} />
              ))}
            </div>
          </div>

          {/* ── Right: 3D Code Window ── */}
          <div className={`hidden lg:flex justify-center items-center opacity-0 ${inView ? "animate-fade-in-up-delay-2" : ""}`}>
            <CodeWindow />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`flex flex-col items-center gap-1.5 mt-16 opacity-0 ${inView ? "animate-fade-in-up-delay-6" : ""}`}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-text-subtle)" }}>
            Scroll
          </span>
          <ArrowDown size={14} style={{ color: "#6C63FF" }} className="animate-bounce-slow" />
        </div>
      </div>
    </section>
  );
};