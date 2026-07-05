import { useState } from "react";
import { useInView } from "react-intersection-observer";

const SKILLS = [
  { name: "HTML / CSS", level: 90, category: "Frontend", color: "#E34F26" },
  { name: "JavaScript", level: 80, category: "Languages", color: "#F7DF1E" },
  { name: "React.js", level: 90, category: "Frontend", color: "#61DAFB" },
  { name: "React Native", level: 75, category: "Frontend", color: "#61DAFB" },
  { name: "Flutter", level: 50, category: "Frontend", color: "#61DAFB" },
  { name: "Tailwind CSS", level: 90, category: "Frontend", color: "#38BDF8" },
  { name: "Bootstrap CSS", level: 80, category: "Frontend", color: "#7952B3" },
  { name: "Next.js", level: 70, category: "Frontend", color: "#888888" },
  { name: "Node.js", level: 85, category: "Backend", color: "#68A063" },
  { name: "Express", level: 85, category: "Backend", color: "#888888" },
  { name: "MongoDB", level: 90, category: "Backend", color: "#4DB33D" },
  { name: "Firebase", level: 70, category: "Backend", color: "#FFA611" },
  { name: "TypeScript", level: 80, category: "Languages", color: "#3178C6" },
  { name: "Git / GitHub", level: 75, category: "Tools", color: "#F05032" },
  { name: "Figma", level: 95, category: "Tools", color: "#F24E1E" },
  { name: "Adobe XD", level: 70, category: "Tools", color: "#FF61F6" },
  { name: "VS Code", level: 90, category: "Tools", color: "#007ACC" },
  { name: "Antigravity", level: 90, category: "Tools", color: "#007ACC" },
  { name: "Android Studio", level: 80, category: "Tools", color: "#3DDC84" },
  { name: "Postman", level: 70, category: "Tools", color: "#FF6C37" },
  { name: "Vapi", level: 70, category: "Tools", color: "#7c3aed" },
  { name: "Kali Linux", level: 60, category: "Additional", color: "#268BEE" },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Tools", "Languages", "Additional"];

const SkillCard = ({ skill, inView }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="p-4 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: "var(--c-bg-card)",
        border: hovered ? `1px solid ${skill.color}45` : "1px solid var(--c-border)",
        boxShadow: hovered ? `0 0 22px ${skill.color}15, 0 8px 32px rgba(0,0,0,0.1)` : "none",
        transform: hovered ? "translateY(-3px)" : "none",
        backdropFilter: "blur(16px)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{
              background: skill.color,
              boxShadow: `0 0 ${hovered ? "10px" : "5px"} ${skill.color}${hovered ? "99" : "55"}`,
              transition: "box-shadow 0.3s",
            }}
          />
          <span className="font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text)" }}>
            {skill.name}
          </span>
        </div>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            background: `${skill.color}18`,
            color: skill.color,
            border: `1px solid ${skill.color}30`,
            fontFamily: "'Archivo', sans-serif",
          }}
        >
          {skill.level}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full rounded-full overflow-hidden" style={{ height: "4px", background: "rgba(108,99,255,0.1)" }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: inView ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}70, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}60`,
            transitionDelay: "200ms",
          }}
        />
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active);

  return (
    <section id="skills" ref={ref} className="py-28 px-4 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.5), transparent)" }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className={`text-center mb-14 opacity-0 ${inView ? "animate-fade-in-up" : ""}`}>
          <span className="section-badge">What I Know</span>
          <h2
            className="font-black"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--c-text)" }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Skills
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}>
            A curated toolkit built through real projects, freelance work, and continuous learning.
          </p>
        </div>

        {/* Filter tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 opacity-0 ${inView ? "animate-fade-in-up-delay-1" : ""}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: active === cat ? "linear-gradient(135deg, #6C63FF, #A855F7)" : "var(--c-bg-card)",
                color: active === cat ? "#fff" : "var(--c-text-muted)",
                border: active === cat ? "1px solid transparent" : "1px solid var(--c-border)",
                boxShadow: active === cat ? "0 0 20px rgba(108,99,255,0.4)" : "none",
              }}
              onMouseEnter={(e) => { if (active !== cat) { e.currentTarget.style.borderColor = "rgba(108,99,255,0.5)"; e.currentTarget.style.color = "#6C63FF"; } }}
              onMouseLeave={(e) => { if (active !== cat) { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.color = "var(--c-text-muted)"; } }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 opacity-0 ${inView ? "animate-fade-in-up-delay-2" : ""}`}>
          {filtered.map((skill) => (
            <SkillCard key={skill.name} skill={skill} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};