import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home",       href: "#hero" },
  { name: "About",     href: "#about" },
  { name: "Experience",href: "#experience" },
  { name: "Skills",    href: "#skills" },
  { name: "Projects",  href: "#projects" },
  { name: "Reviews",   href: "#reviews" },
  { name: "Contact",   href: "#contact" },
];

const Logo = () => (
  <a href="#hero" className="flex items-center gap-2 group shrink-0">
    <div
      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
      style={{
        background: "linear-gradient(135deg, rgba(108,99,255,0.22), rgba(0,212,255,0.16))",
        border: "1px solid rgba(108,99,255,0.5)",
        boxShadow: "0 0 14px rgba(108,99,255,0.2)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    </div>
    <span className="text-base font-black" style={{ fontFamily: "'Archivo', sans-serif" }}>
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
  </a>
);

export const Navbar = () => {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section detection */
  useEffect(() => {
    const ids = navItems.map((i) => i.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  /* Close on ESC */
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setIsMenuOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  /* Prevent body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      {/* ─── Desktop / top pill ─────────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={cn(
          "fixed top-3 left-1/2 -translate-x-1/2 z-40 transition-all duration-500",
          "w-[calc(100%-2rem)] max-w-4xl",
        )}
        style={{
          background: isScrolled
            ? "var(--c-bg-nav)"
            : "color-mix(in srgb, var(--c-bg-nav) 65%, transparent)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--c-border)",
          borderRadius: "9999px",
          padding: "0.4rem 0.75rem",
          boxShadow: isScrolled
            ? "0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(108,99,255,0.08)"
            : "none",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <Logo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    color: active ? "#6C63FF" : "var(--c-text-muted)",
                    background: active ? "rgba(108,99,255,0.1)" : "transparent",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "var(--c-text)"; e.currentTarget.style.background = "rgba(108,99,255,0.06)"; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "var(--c-text-muted)"; e.currentTarget.style.background = "transparent"; } }}
                >
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#6C63FF", boxShadow: "0 0 6px #6C63FF" }} />
                  )}
                  {item.name}
                </a>
              );
            })}

            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <a
                href="#contact"
                className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-300"
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  background: "linear-gradient(135deg, #6C63FF, #A855F7)",
                  color: "#fff",
                  boxShadow: "0 0 16px rgba(108,99,255,0.28)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 28px rgba(108,99,255,0.6)"; e.currentTarget.style.transform = "translateY(-1px) scale(1.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 16px rgba(108,99,255,0.28)"; e.currentTarget.style.transform = ""; }}
              >
                Hire Me ✦
              </a>
            </div>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              id="nav-menu-toggle"
              onClick={() => setIsMenuOpen((p) => !p)}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              style={{
                background: "rgba(108,99,255,0.1)",
                border: "1px solid var(--c-border)",
                color: "#6C63FF",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.1)"; }}
            >
              <span
                className="transition-transform duration-300"
                style={{ transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile slide-down menu ──────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-30 md:hidden flex flex-col"
        style={{
          background: "var(--c-bg)",
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
      >
        {/* Top row — logo + close */}
        <div
          className="flex items-center justify-between px-5 pt-5 pb-4"
          style={{ borderBottom: "1px solid var(--c-border)" }}
        >
          <Logo />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full"
            aria-label="Close menu"
            style={{
              background: "rgba(108,99,255,0.1)",
              border: "1px solid var(--c-border)",
              color: "#6C63FF",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col flex-1 justify-center px-6 gap-1">
          {navItems.map((item, i) => {
            const active = activeSection === item.href.slice(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200"
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: active ? "#6C63FF" : "var(--c-text-muted)",
                  background: active ? "rgba(108,99,255,0.1)" : "transparent",
                  borderLeft: active ? "3px solid #6C63FF" : "3px solid transparent",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  transition: `color 0.2s, background 0.2s, opacity 0.35s ${i * 0.05 + 0.1}s ease, transform 0.35s ${i * 0.05 + 0.1}s ease`,
                }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#6C63FF"; e.currentTarget.style.background = "rgba(108,99,255,0.07)"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "var(--c-text-muted)"; e.currentTarget.style.background = "transparent"; } }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: active ? "#6C63FF" : "rgba(108,99,255,0.25)", boxShadow: active ? "0 0 8px #6C63FF" : "none" }}
                />
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 pb-10 pt-4" style={{ borderTop: "1px solid var(--c-border)" }}>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="cosmic-button w-full justify-center text-base py-3.5"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.35s 0.38s ease, transform 0.35s 0.38s ease`,
            }}
          >
            Hire Me ✦
          </a>
          <p className="text-xs text-center mt-4" style={{ color: "var(--c-text-subtle)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Available for freelance work
          </p>
        </div>
      </div>
    </>
  );
};