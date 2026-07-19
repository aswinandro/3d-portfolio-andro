import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/constants";
import { WorkSkeleton, useSkeletonLoader } from "@/components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", ...new Set(projects.map((p) => p.category))];

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="project-card group relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${project.color}08, transparent 60%)`,
        }}
      />

      {/* Image area */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
          }}
        />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}25`,
              color: project.color,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.03em",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
            {project.category}
          </span>
        </div>
        {/* Arrow link */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0"
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3
              className="text-lg md:text-xl font-semibold text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs mt-0.5"
              style={{ color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.subtitle}
            </p>
          </div>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-none"
            style={{
              background: `${project.color}10`,
              border: `1px solid ${project.color}20`,
            }}
          >
            <img src={project.icon} alt="" className="w-4 h-4" />
          </div>
        </div>

        <p
          className="text-sm leading-relaxed mt-3 mb-4"
          style={{ color: "#94a3b8" }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#94a3b8",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300"
              style={{ color: project.color }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Visit
            </a>
          )}
          {project.playStore && (
            <a
              href={project.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300"
              style={{ color: "#94a3b8" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Play Store
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AppShowcase() {
  const sectionRef = useRef(null);
  const { loading, showContent } = useSkeletonLoader(750);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useGSAP(
    () => {
      if (!showContent) return;

      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );

      gsap.fromTo(
        ".project-card",
        { y: 60, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-card",
            start: "top bottom-=50",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [showContent] }
  );

  if (loading) {
    return <WorkSkeleton />;
  }

  return (
    <div
      id="work"
      ref={sectionRef}
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } w-full section-padding md:mt-24 mt-16`}
    >
      <div className="w-full md:px-10 lg:px-20 px-5">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(168, 85, 247, 0.06)",
              border: "1px solid rgba(168, 85, 247, 0.12)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span
              style={{
                color: "#a855f7",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Portfolio
            </span>
          </div>
          <h2
            className="font-semibold md:text-4xl lg:text-5xl text-3xl text-center max-w-2xl"
            style={{ letterSpacing: "-0.035em", lineHeight: "1.15", color: "#f8fafc" }}
          >
            Featured <span style={{ color: "#a855f7" }}>Projects</span>
          </h2>
          <p className="text-center max-w-lg text-sm" style={{ color: "#64748b" }}>
            A selection of projects I've contributed to across enterprise, mobile, and web platforms.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-300"
              style={{
                background:
                  activeCategory === cat
                    ? "rgba(168, 85, 247, 0.12)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  activeCategory === cat
                    ? "rgba(168, 85, 247, 0.25)"
                    : "rgba(255,255,255,0.06)"
                }`,
                color: activeCategory === cat ? "#a855f7" : "#94a3b8",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.03em",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
