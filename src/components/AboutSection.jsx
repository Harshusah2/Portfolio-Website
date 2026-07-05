import { Briefcase, Code2, Smartphone, Award, Users, FolderOpen } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const STATS = [
  { icon: Award, value: "1+", label: "Years Experience" },
  { icon: FolderOpen, value: "10+", label: "Projects Delivered" },
  { icon: Users, value: "5+", label: "Happy Clients" },
];

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Creating responsive, high-performance web applications with React, Next.js and the full MERN stack.",
    accent: "#6C63FF",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Cross-platform mobile apps with React Native that feel native on both iOS and Android.",
    accent: "#00D4FF",
  },
  {
    icon: Briefcase,
    title: "Project Management",
    desc: "End-to-end project delivery using agile methodologies — on time, on budget, every time.",
    accent: "#A855F7",
  },
];

const TiltCard = ({ children, accent }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 14;
    const y = ((e.clientY - top) / height - 0.5) * -14;
    setTilt({ x, y });
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(8px)`
          : "perspective(800px) rotateX(0) rotateY(0) translateZ(0)",
        transition: hovered ? "transform 0.1s ease" : "transform 0.4s ease",
        transformStyle: "preserve-3d",
        cursor: "pointer",
        borderRadius: "1.25rem",
        border: hovered ? `1px solid ${accent}55` : "1px solid var(--c-border)",
        boxShadow: hovered ? `0 0 35px ${accent}22, 0 20px 60px rgba(0,0,0,0.15)` : "none",
        background: "var(--c-bg-card)",
        backdropFilter: "blur(16px)",
      }}
    >
      {children}
    </div>
  );
};

export const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const anim = (d = "") => `opacity-0 ${inView ? `animate-fade-in-up${d ? `-delay-${d}` : ""}` : ""}`;

  return (
    <section id="about" ref={ref} className="py-28 px-4 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.5), transparent)" }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className={`text-center mb-16 ${anim()}`}>
          <span className="section-badge">Who I Am</span>
          <h2
            className="font-black"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--c-text)" }}
          >
            About{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Me
            </span>
          </h2>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Bio */}
          <div className="space-y-5 text-left">
            <h3
              className={`text-2xl font-bold ${anim("1")}`}
              style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}
            >
              Passionate Web &amp; Mobile Developer
            </h3>
            <p className={`leading-relaxed ${anim("2")}`} style={{ color: "var(--c-text-muted)", fontFamily: "'Space Grotesk', sans-serif" }}>
              With 1 year of experience, I specialize in building scalable, dynamic applications
              using the Full Stack. From crafting pixel-perfect UIs to architecting robust APIs,
              I bring ideas to life end-to-end.
            </p>
            <p className={`leading-relaxed ${anim("3")}`} style={{ color: "var(--c-text-muted)", fontFamily: "'Space Grotesk', sans-serif" }}>
              My expertise extends to mobile development with React Native and Flutter, letting me ship
              cross-platform apps that feel genuinely native. I&apos;m comfortable in
              Figma designing the experience as I am in VS Code building it.
            </p>
            <div className={`flex flex-wrap gap-3 pt-2 ${anim("4")}`}>
              <a href="#contact" className="cosmic-button">Get in Touch</a>
              <a
                href="CV/Harsh_Sahu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300"
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  border: "1px solid rgba(108,99,255,0.45)",
                  color: "#6C63FF",
                  background: "rgba(108,99,255,0.08)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.08)"; e.currentTarget.style.transform = ""; }}
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Service cards */}
          <div className="space-y-4">
            {SERVICES.map(({ icon: Icon, title, desc, accent }) => (
              <TiltCard key={title} accent={accent}>
                <div
                  className="p-5"
                  style={{
                    background: `linear-gradient(135deg, ${accent}10, transparent)`,
                    borderRadius: "1.25rem",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 p-3 rounded-xl"
                      style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                    >
                      <Icon size={20} style={{ color: accent }} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-base mb-1" style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}>
                        {title}
                      </h4>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "var(--c-text-muted)", lineHeight: "1.6" }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-4 ${anim("5")}`}>
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="p-6 flex flex-col items-center gap-2 cursor-pointer"
              style={{
                borderRadius: "1.25rem",
                border: "1px solid var(--c-border)",
                background: "var(--c-bg-card)",
                backdropFilter: "blur(16px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(108,99,255,0.45)";
                e.currentTarget.style.boxShadow = "0 0 28px rgba(108,99,255,0.12), 0 16px 48px rgba(0,0,0,0.12)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--c-border)";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.transform = "";
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1"
                style={{ background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.25)" }}
              >
                <Icon size={22} style={{ color: "#6C63FF" }} />
              </div>
              <span className="text-3xl font-black" style={{ fontFamily: "'Archivo', sans-serif", color: "#6C63FF", textShadow: "0 0 20px rgba(108,99,255,0.5)" }}>
                {value}
              </span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem", color: "var(--c-text-subtle)", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};