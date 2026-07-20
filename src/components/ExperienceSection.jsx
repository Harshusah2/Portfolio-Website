import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";

/* ── Experience Data ────────────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    id: 1,
    company: "Webitof",
    role: "Full Stack Developer",
    type: "Full-Time",
    duration: "November 2025 – Present",
    location: "On-site",
    url: "https://webitof.com",
    accent: "#6C63FF",
    initials: "W",
    achievements: [
      "Developing full-stack web and mobile applications using Next.js, React Native, and Flutter for production clients.",
      "Building scalable REST APIs with Node.js, Express.js, MongoDB, and Firebase backend services.",
      "Designing pixel-perfect UI/UX mockups in Figma and implementing them with Tailwind CSS and Shadcn UI.",
      "Integrating third-party services including Firebase Auth, Firestore, and Google Stitch for real-time features.",
      "Working across the full stack in TypeScript for type-safe, maintainable codebases.",
    ],
    tech: ["Next.js", "React.js", "React Native", "Flutter", "Node.js", "Express.js", "MongoDB", "Firebase", "TypeScript", "Tailwind CSS", "Shadcn", "Figma"],
  },
  {
    id: 2,
    company: "Sjain Ventures",
    role: "MERN Stack Developer",
    type: "Internship",
    duration: "September 2024 – December 2024",
    location: "On-site",
    url: "https://sjain.io",
    accent: "#00D4FF",
    initials: "SV",
    achievements: [
      "Built and maintained responsive web interfaces using React.js, Tailwind CSS, and Bootstrap.",
      "Developed RESTful APIs with Node.js and Express.js connected to MongoDB databases.",
      "Collaborated with senior engineers on full-stack features delivered to production environments.",
      "Gained hands-on experience with the MERN stack through real client projects.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Bootstrap"],
  },
];

/* ── Framer Motion Variants ─────────────────────────────────────────────────── */
const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Timeline Node ──────────────────────────────────────────────────────────── */
const TimelineNode = ({ accent }) => (
  <div className="relative flex flex-col items-center">
    {/* Glowing dot */}
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-5 h-5 rounded-full z-10 flex items-center justify-center"
      style={{
        background: accent,
        boxShadow: `0 0 0 4px ${accent}22, 0 0 20px ${accent}55`,
      }}
    >
      <div className="w-2 h-2 rounded-full bg-white/80" />
    </motion.div>
  </div>
);

/* ── Experience Card ────────────────────────────────────────────────────────── */
const ExperienceCard = ({ exp, index }) => {
  const isLeft = index % 2 === 0;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start mb-12 last:mb-0">

      {/* ── Left slot ── */}
      <div className="hidden md:block">
        {isLeft && (
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Card exp={exp} />
          </motion.div>
        )}
      </div>

      {/* ── Center timeline node ── */}
      <div className="hidden md:flex flex-col items-center pt-6">
        <TimelineNode accent={exp.accent} />
      </div>

      {/* ── Right slot ── */}
      <div className="hidden md:block">
        {!isLeft && (
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Card exp={exp} />
          </motion.div>
        )}
      </div>

      {/* ── Mobile: always full-width ── */}
      <motion.div
        className="md:hidden col-span-1"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Card exp={exp} />
      </motion.div>
    </div>
  );
};

/* ── Card ───────────────────────────────────────────────────────────────────── */
const Card = ({ exp }) => (
  <div
    className="rounded-2xl p-6 group transition-all duration-300"
    style={{
      background: "var(--c-bg-card)",
      border: `1px solid ${exp.accent}30`,
      boxShadow: `0 4px 24px rgba(0,0,0,0.08)`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.border = `1px solid ${exp.accent}70`;
      e.currentTarget.style.boxShadow = `0 8px 40px ${exp.accent}18, 0 0 0 1px ${exp.accent}20`;
      e.currentTarget.style.transform = "translateY(-3px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.border = `1px solid ${exp.accent}30`;
      e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
      e.currentTarget.style.transform = "";
    }}
  >
    {/* Header */}
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        {/* Company logo / initials */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
          style={{
            background: `linear-gradient(135deg, ${exp.accent}22, ${exp.accent}10)`,
            border: `1px solid ${exp.accent}40`,
            color: exp.accent,
            fontFamily: "'Archivo', sans-serif",
          }}
        >
          {exp.initials}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="font-black text-base leading-tight"
              style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}
            >
              {exp.company}
            </h3>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{
                background: `${exp.accent}18`,
                color: exp.accent,
                border: `1px solid ${exp.accent}30`,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {exp.type}
            </span>
          </div>
          <p
            className="text-sm font-semibold mt-0.5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: exp.accent }}
          >
            {exp.role}
          </p>
        </div>
      </div>

      {/* External link */}
      <a
        href={exp.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${exp.company}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5 shrink-0"
        style={{ color: "var(--c-text-muted)" }}
      >
        <ExternalLink size={15} />
      </a>
    </div>

    {/* Meta */}
    <div className="flex flex-wrap gap-3 mb-4">
      <span
        className="flex items-center gap-1.5 text-xs"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
      >
        <Calendar size={12} style={{ color: exp.accent }} />
        {exp.duration}
      </span>
      <span
        className="flex items-center gap-1.5 text-xs"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
      >
        <MapPin size={12} style={{ color: exp.accent }} />
        {exp.location}
      </span>
    </div>

    {/* Achievements */}
    <ul className="space-y-2 mb-4">
      {exp.achievements.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span
            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: exp.accent }}
          />
          <span
            className="text-sm leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>

    {/* Tech pills */}
    <div className="flex flex-wrap gap-1.5">
      {exp.tech.map((t) => (
        <span
          key={t}
          className="px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: "var(--c-bg-card-2)",
            border: "1px solid var(--c-border)",
            color: "var(--c-text-muted)",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* ── Section ────────────────────────────────────────────────────────────────── */
export const ExperienceSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(108,99,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container max-w-5xl mx-auto relative z-10">

        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,255,0.08))",
                border: "1px solid rgba(108,99,255,0.3)",
                color: "#6C63FF",
              }}
            >
              <Briefcase size={12} /> Work History
            </span>
          </motion.div>

          <motion.h2
            className="font-black mb-4"
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              color: "var(--c-text)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professional{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Experience
            </span>
          </motion.h2>

          <motion.p
            className="max-w-xl mx-auto"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              color: "var(--c-text-muted)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Real-world experience building production applications across startups and agencies.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(108,99,255,0.35) 10%, rgba(108,99,255,0.35) 90%, transparent)" }}
          />

          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
