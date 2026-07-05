import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/harsh-sahu-b11650257/", label: "LinkedIn", color: "#0A66C2" },
  { icon: Github, href: "https://github.com/Harshusah2", label: "GitHub", color: "#6C63FF" },
  { icon: Instagram, href: "https://www.instagram.com/harshusah2/", label: "Instagram", color: "#E1306C" },
  { icon: Mail, href: "mailto:harshsahu180407@gmail.com", label: "Email", color: "#00D4FF" },
];

const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

export const Footer = () => (
  <footer
    className="relative pt-14 pb-6 px-4 overflow-hidden"
    style={{
      borderTop: "1px solid var(--c-border)",
      background: "var(--c-bg-card-2)",
    }}
  >
    {/* Top gradient divider */}
    <div
      className="absolute top-0 left-0 right-0 h-px"
      style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.6), rgba(0,212,255,0.4), transparent)" }}
    />

    {/* Aurora glow */}
    <div
      aria-hidden
      className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
      style={{ background: "radial-gradient(ellipse, rgba(108,99,255,0.1) 0%, transparent 70%)", filter: "blur(30px)" }}
    />

    <div className="container mx-auto max-w-6xl relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

        {/* Brand */}
        <div className="text-left">
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(108,99,255,0.22), rgba(0,212,255,0.14))",
                border: "1px solid rgba(108,99,255,0.4)",
                boxShadow: "0 0 14px rgba(108,99,255,0.18)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className="text-lg font-black" style={{ fontFamily: "'Archivo', sans-serif" }}>
              <span style={{ color: "var(--c-text)" }}>Harsh</span>
              <span
                style={{
                  background: "linear-gradient(90deg, #6C63FF, #00D4FF)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                .dev
              </span>
            </span>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
          >
            Full Stack Developer building beautiful, performant web &amp; mobile experiences.
          </p>
        </div>

        {/* Quick links */}
        <div className="text-left">
          <h4
            className="font-bold text-sm uppercase tracking-wider mb-4"
            style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text-subtle)", letterSpacing: "0.15em" }}
          >
            Quick Links
          </h4>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm transition-all duration-200 inline-block"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#6C63FF"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--c-text-muted)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="text-left">
          <h4
            className="font-bold text-sm uppercase tracking-wider mb-4"
            style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text-subtle)", letterSpacing: "0.15em" }}
          >
            Find Me On
          </h4>
          <div className="flex flex-wrap gap-3">
            {SOCIALS.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  border: "1px solid var(--c-border)",
                  color: "var(--c-text-muted)",
                  background: "rgba(108,99,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = color;
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.boxShadow = `0 0 18px ${color}55`;
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(108,99,255,0.06)";
                  e.currentTarget.style.color = "var(--c-text-muted)";
                  e.currentTarget.style.borderColor = "var(--c-border)";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.transform = "";
                }}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 pt-6"
        style={{ borderTop: "1px solid var(--c-border)" }}
      >
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", color: "var(--c-text-subtle)" }}>
          &copy; {new Date().getFullYear()} Harsh Sahu. All rights reserved.
        </p>

        {/* ─── Scroll-to-top button (smooth scroll via JS) ─── */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-2.5 rounded-full transition-all duration-300 cursor-pointer"
          style={{
            background: "rgba(108,99,255,0.1)",
            border: "1px solid rgba(108,99,255,0.28)",
            color: "#6C63FF",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(108,99,255,0.25)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(108,99,255,0.45)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(108,99,255,0.1)";
            e.currentTarget.style.boxShadow = "";
            e.currentTarget.style.transform = "";
          }}
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  </footer>
);