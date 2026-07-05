import { useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

const PROJECTS = [
  {
    id: 1,
    title: "Billing Software",
    type: "Full Stack",
    description:
      "Solved inventory and billing needs by building a MERN stack application with Tailwind CSS that supports product and stock management, barcode printing, order and bill printing.",
    image: "projects/BillingSoftware.png",
    tags: ["React.js", "Node.js", "TypeScript", "Express.js", "Tailwind", "MongoDB"],
    demoURL: "#",
    githubURL: "https://github.com/Harshusah2/Billing-Software-Frontend",
    accent: "#7c3aed",
  },
  {
    id: 2,
    title: "AIInterviewIQ",
    type: "Full Stack / AI",
    description:
      "An AI Voice agent–integrated mock interview platform. Generates tailored interviews for any field and delivers detailed feedback post-session.",
    image: "projects/AIInterviewIQ.png",
    tags: ["React.js", "Next.js", "TypeScript", "Vapi", "Tailwind"],
    demoURL: "#",
    githubURL: "https://github.com/Harshusah2/Mock_Interview-Platform",
    accent: "#7c3aed",
  },
  {
    id: 3,
    title: "Marvelous Web App",
    type: "Full Stack",
    description:
      "A music streaming platform that converts YouTube video links into streamable audio tracks. Search, discover and listen seamlessly.",
    image: "projects/Marvelous.png",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind"],
    demoURL: "#",
    githubURL: "https://github.com/Harshusah2/Marvelous-Music-Web-Player",
    accent: "#0ea5e9",
  },
  {
    id: 4,
    title: "Shopper E-Commerce",
    type: "Full Stack",
    description:
      "A full-featured clothing e-commerce app with category browsing, cart management, and a complete admin dashboard.",
    image: "projects/Shopper_ECommerce.png",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "CSS"],
    demoURL: "#",
    githubURL: "https://github.com/Harshusah2/ECommerce-Site",
    accent: "#10b981",
  },
  {
    id: 5,
    title: "NewsMagzine",
    type: "Frontend",
    description:
      "A real-time news aggregator that pulls the latest international headlines by category via the News API.",
    image: "projects/NewsMagzine.png",
    tags: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    demoURL: "#",
    githubURL: "https://github.com/Harshusah2/news-magzine",
    accent: "#f59e0b",
  },
];

const ProjectCard = ({ project }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - left) / width - 0.5) * 12,
      y: ((e.clientY - top) / height - 0.5) * -12,
    });
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        borderRadius: "1.25rem",
        overflow: "hidden",
        background: "var(--c-bg-card)",
        border: hovered ? `1px solid ${project.accent}55` : "1px solid var(--c-border)",
        boxShadow: hovered ? `0 0 36px ${project.accent}18, 0 22px 56px rgba(0,0,0,0.18), 0 0 0 1px ${project.accent}12` : "0 4px 20px rgba(0,0,0,0.08)",
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(10px)`
          : "perspective(900px) rotateX(0) rotateY(0) translateZ(0)",
        transition: hovered ? "transform 0.12s ease, box-shadow 0.3s ease, border-color 0.3s ease" : "transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        transformStyle: "preserve-3d",
        cursor: "pointer",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(8,8,16,0.82))", opacity: hovered ? 1 : 0 }}
        >
          <a
            href={project.githubURL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center transition-all duration-200"
            style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(12,12,24,0.85)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", backdropFilter: "blur(8px)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.boxShadow = `0 0 18px ${project.accent}55`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.boxShadow = ""; }}
          >
            <Github size={18} />
          </a>
          {project.demoURL !== "#" && (
            <a
              href={project.demoURL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center transition-all duration-200"
              style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(12,12,24,0.85)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", backdropFilter: "blur(8px)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.boxShadow = `0 0 18px ${project.accent}55`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.boxShadow = ""; }}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            fontFamily: "'Archivo', sans-serif",
            background: `${project.accent}25`,
            color: project.accent,
            border: `1px solid ${project.accent}45`,
            backdropFilter: "blur(8px)",
          }}
        >
          {project.type}
        </span>
        <div
          className="absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`, opacity: hovered ? 1 : 0 }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-full"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "rgba(108,99,255,0.1)",
                border: "1px solid rgba(108,99,255,0.2)",
                color: "var(--c-text-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid var(--c-border)" }}
        >
          <a
            href={project.githubURL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-subtle)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#6C63FF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--c-text-subtle)"; }}
          >
            <Github size={15} /> View Source
          </a>
          {project.demoURL !== "#" && (
            <a
              href={project.demoURL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm font-bold transition-all duration-200 hover:gap-2"
              style={{ fontFamily: "'Archivo', sans-serif", color: project.accent }}
            >
              Live Demo <ArrowRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.08 });

  return (
    <section id="projects" ref={ref} className="py-28 px-4 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.5), transparent)" }}
      />

      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-14 opacity-0 ${inView ? "animate-fade-in-up" : ""}`}>
          <span className="section-badge">What I&apos;ve Built</span>
          <h2
            className="font-black"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--c-text)" }}
          >
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Projects
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}>
            Hand-picked projects showcasing my range — from AI-powered apps to full-stack platforms.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 ${inView ? "animate-fade-in-up-delay-1" : ""}`}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className={`text-center mt-12 opacity-0 ${inView ? "animate-fade-in-up-delay-3" : ""}`}>
          <a href="https://github.com/Harshusah2" target="_blank" rel="noreferrer" className="cosmic-button">
            <Github size={16} /> See All Projects on GitHub <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};