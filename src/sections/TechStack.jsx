import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import TechRadar from "../components/TechRadar";
import { skillsData, techStackImgs } from "../constants";
import { TechStackSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

/* ─────────── CONSTANTS ─────────── */

const roles = [
  "Fullstack Developer",
  "DevOps Engineer",
  "Cloud Architect",
  "API Specialist",
  "System Designer",
];

const categories = [
  "All",
  ...skillsData.map((d) => d.category),
];

const categoryColors = {
  Languages: "#a855f7",
  Frameworks: "#3b82f6",
  Frontend: "#a855f7",
  Databases: "#f59e0b",
  "Cloud & DevOps": "#06b6d4",
  "Architecture & Patterns": "#ec4899",
  "Observability & Logging": "#f97316",
  "Testing & Quality": "#14b8a6",
  "Payments & Security": "#ef4444",
};

const proficiencyMap = {
  Languages: 92,
  Frameworks: 88,
  Frontend: 90,
  Databases: 85,
  "Cloud & DevOps": 87,
  "Architecture & Patterns": 83,
  "Observability & Logging": 78,
  "Testing & Quality": 80,
  "Payments & Security": 82,
};

const terminalCommands = {
  help: "Available: skills, radar, stats, clear, whoami, experience",
  whoami: "Aswin Andro — Fullstack Developer & DevOps Engineer",
  skills: skillsData.map((d) => `  ${d.category}: ${d.skills.length} skills`).join("\n"),
  radar: "Opening skill proficiency radar...",
  stats: `Total Skills: ${skillsData.reduce((a, d) => a + d.skills.length, 0)}\nCategories: ${skillsData.length}\nYears: 6+\nProjects: 25+`,
  experience: "6+ years across Java, React, Cloud, DevOps, and APIs",
  clear: "__CLEAR__",
};

/* ─────────── HOOKS ─────────── */

const useTypingAnimation = (words, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
          if (displayText === currentWord) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
          if (displayText === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

/* ─────────── COMPONENTS ─────────── */

const ProficiencyArc = ({ percent, color, size = 60, label }) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercent / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPercent(percent), 300);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      <span
        className="font-bold"
        style={{
          color,
          fontSize: size > 50 ? "0.9rem" : "0.75rem",
          fontFamily: "'JetBrains Mono', monospace",
          marginTop: `-${size / 2 + 14}px`,
          marginBottom: `${size / 2 - 10}px`,
        }}
      >
        {animatedPercent}%
      </span>
      {label && (
        <span
          className="text-center leading-tight"
          style={{
            color: "#94a3b8",
            fontSize: "0.6rem",
            fontFamily: "'JetBrains Mono', monospace",
            maxWidth: size + 10,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

const SkillBar = ({ name, level, delay = 0, color }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="flex items-center gap-3 group/bar">
      <span
        className="w-28 text-right flex-none truncate"
        style={{
          color: "#94a3b8",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          transition: "color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.color = color || "#a855f7")}
        onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
      >
        {name}
      </span>
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255, 255, 255, 0.04)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color || "#a855f7"}, ${color || "#3b82f6"}88)`,
            transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <span
        className="w-8 flex-none"
        style={{
          color: color || "#a855f7",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
        }}
      >
        {level}%
      </span>
    </div>
  );
};

const InteractiveTerminal = () => {
  const typedText = useTypingAnimation(roles);
  const [lineCount, setLineCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    const lines = [
      "$ whoami",
      "> Aswin Andro",
      "",
      "$ cat skills.json | jq '.roles'",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setLineCount(i + 1);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, lineCount]);

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const response = terminalCommands[trimmed];

    setHistory((prev) => [
      ...prev,
      { type: "input", text: `$ ${cmd}` },
      ...(response === "__CLEAR__"
        ? []
        : [{ type: "output", text: response || `command not found: ${cmd}. Type "help" for available commands.` }]),
    ]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputValue("");
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleCommand(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputValue("");
        } else {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
      }
    }
  };

  const initialLines = [
    "$ whoami",
    "> Aswin Andro",
    "",
    "$ cat skills.json | jq '.roles'",
    `> "${typedText}|"`,
  ];

  return (
    <div
      className="terminal-header card-border rounded-xl overflow-hidden"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          background: "rgba(17, 17, 24, 0.5)",
        }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#a855f7" }} />
        </div>
        <span className="ml-3 text-xs" style={{ color: "#475569", letterSpacing: "0.05em" }}>
          aswin@portfolio ~ %
        </span>
        <span className="ml-auto text-xs" style={{ color: "#334155" }}>
          [interactive]
        </span>
      </div>

      {/* Body */}
      <div ref={terminalRef} className="p-4 md:p-5 min-h-[180px] max-h-[260px] overflow-y-auto">
        {initialLines.slice(0, lineCount).map((line, i) => (
          <div key={`init-${i}`} className="flex items-center gap-2 mb-1">
            {line.startsWith("$") ? (
              <span style={{ color: "#a855f7" }}>{line}</span>
            ) : line.startsWith(">") ? (
              <span style={{ color: "#f8fafc" }}>{line}</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        ))}

        {history.map((entry, i) => (
          <div key={`hist-${i}`} className="mb-1 whitespace-pre-wrap">
            <span style={{ color: entry.type === "input" ? "#a855f7" : "#94a3b8" }}>
              {entry.text}
            </span>
          </div>
        ))}

        {lineCount >= initialLines.length && (
          <div className="flex items-center gap-2 mt-1">
            <span style={{ color: "#a855f7" }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none"
              style={{
                color: "#f8fafc",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.85rem",
                caretColor: "#a855f7",
              }}
              placeholder='type "help" for commands...'
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const SkillCard = ({ category, icon, skills, color, isExpanded, onToggle, isActive }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      className={`skill-bento-card card-border rounded-xl flex flex-col relative overflow-hidden group transition-all duration-500 ${
        isExpanded ? "col-span-1 md:col-span-2 row-span-2" : "col-span-1"
      } ${isActive ? "ring-1" : ""}`}
      style={{
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        padding: isExpanded ? "24px" : "20px",
        ringColor: isActive ? `${color}44` : "transparent",
      }}
      onMouseMove={handleMouseMove}
      onClick={onToggle}
    >
      {/* Gradient accent top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}66)`, opacity: 1 }}
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${color}0a, transparent 40%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-lg flex-none"
            style={{ background: `${color}12`, border: `1px solid ${color}20` }}
          >
            <img src={icon} alt={category} className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold" style={{ letterSpacing: "-0.01em", fontSize: "0.95rem" }}>
              {category}
            </h3>
            <span
              className="text-xs"
              style={{ color: "#475569", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}
            >
              {skills.length} skills
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Proficiency arc */}
          <ProficiencyArc percent={proficiencyMap[category] || 80} color={color} size={44} />
          {/* Expand indicator */}
          <div
            className="w-6 h-6 flex items-center justify-center rounded-md transition-all duration-300"
            style={{
              background: isExpanded ? `${color}15` : "rgba(255,255,255,0.03)",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className={`relative z-10 ${isExpanded ? "flex-1" : ""}`}>
        {isExpanded ? (
          <div className="flex flex-col gap-2.5 mt-2">
            {skills.map((skill, i) => (
              <SkillBar
                key={skill}
                name={skill}
                level={75 + Math.floor(Math.random() * 20)}
                delay={i * 80}
                color={color}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-1 rounded-md transition-all duration-300"
                style={{
                  background: `${color}08`,
                  border: `1px solid ${color}15`,
                  color: "#94a3b8",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FilterTabs = ({ active, onChange }) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
    {categories.map((cat) => {
      const isActive = active === cat;
      const color = cat === "All" ? "#a855f7" : categoryColors[cat] || "#a855f7";
      return (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="flex-none px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap"
          style={{
            background: isActive ? `${color}18` : "rgba(30, 41, 59, 0.4)",
            border: `1px solid ${isActive ? `${color}40` : "rgba(255,255,255,0.04)"}`,
            color: isActive ? color : "#64748b",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.02em",
          }}
        >
          {cat}
        </button>
      );
    })}
  </div>
);

const StatsBar = () => {
  const stats = [
    { label: "Total Skills", value: skillsData.reduce((a, d) => a + d.skills.length, 0), suffix: "+" },
    { label: "Categories", value: skillsData.length, suffix: "" },
    { label: "Years Exp", value: 5, suffix: "+" },
    { label: "Projects", value: 25, suffix: "+" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="card-border rounded-lg p-3 text-center"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div
            className="font-bold"
            style={{
              background: "linear-gradient(135deg, #a855f7, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "1.4rem",
            }}
          >
            {stat.value}{stat.suffix}
          </div>
          <div
            style={{
              color: "#475569",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.05em",
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─────────── MAIN COMPONENT ─────────── */

const TechStack = () => {
  const { loading, showContent } = useSkeletonLoader(750);
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedCard, setExpandedCard] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const radarSkills = useMemo(() => [
    { name: "Java", level: 95 },
    { name: "React", level: 90 },
    { name: "Node.js", level: 88 },
    { name: "Cloud", level: 85 },
    { name: "DevOps", level: 82 },
    { name: "APIs", level: 92 },
    { name: "DB", level: 87 },
    { name: "Python", level: 80 },
  ], []);

  const filteredSkills = useMemo(() => {
    if (activeFilter === "All") return skillsData;
    return skillsData.filter((d) => d.category === activeFilter);
  }, [activeFilter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, filteredSkills.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && focusedIndex >= 0) {
        const cat = filteredSkills[focusedIndex]?.category;
        setExpandedCard((prev) => (prev === cat ? null : cat));
      } else if (e.key === "Escape") {
        setExpandedCard(null);
        setFocusedIndex(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredSkills, focusedIndex]);

  // Reset expansion when filter changes
  useEffect(() => {
    setExpandedCard(null);
    setFocusedIndex(-1);
  }, [activeFilter]);

  useGSAP(() => {
    if (!showContent) return;

    gsap.fromTo(
      ".terminal-header",
      { y: 30, opacity: 0, filter: "blur(5px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: "#skills", start: "top 80%" } }
    );

    gsap.fromTo(
      ".radar-section",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: ".radar-section", start: "top 80%" } }
    );

    gsap.fromTo(
      ".stats-bar",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".stats-bar", start: "top 85%" } }
    );
  }, [showContent]);

  if (loading) {
    return <TechStackSkeleton />;
  }

  return (
    <div
      id="skills"
      ref={containerRef}
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } section-padding relative`}
    >
      <div className="w-full md:px-10 px-5">
        <TitleHeader title="Technical Arsenal" sub="SKILLS & EXPERTISE" />

        {/* Stats Bar */}
        <div className="stats-bar mt-12">
          <StatsBar />
        </div>

        {/* Terminal + Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
          <InteractiveTerminal />
          <div className="radar-section card-border rounded-xl p-5 md:p-6 flex flex-col items-center justify-center">
            <div
              className="text-xs mb-3 self-start"
              style={{ color: "#475569", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}
            >
              // skill-proficiency-radar
            </div>
            <TechRadar skills={radarSkills} size={260} />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8">
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
        </div>

        {/* Keyboard hint */}
        <div
          className="mt-3 flex items-center gap-4 text-xs"
          style={{ color: "#334155", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
        >
          <span>
            <kbd className="px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              &larr; &rarr;
            </kbd>{" "}
            navigate
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              Enter
            </kbd>{" "}
            expand
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              Esc
            </kbd>{" "}
            collapse
          </span>
        </div>

        {/* Skill Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"
          style={{ gridAutoRows: "minmax(160px, auto)" }}
        >
          {filteredSkills.map((skill, i) => (
            <SkillCard
              key={skill.category}
              category={skill.category}
              icon={skill.icon}
              skills={skill.skills}
              color={categoryColors[skill.category] || "#a855f7"}
              isExpanded={expandedCard === skill.category}
              onToggle={() =>
                setExpandedCard((prev) =>
                  prev === skill.category ? null : skill.category
                )
              }
              isActive={focusedIndex === i}
            />
          ))}
        </div>

        {/* Tech logos */}
        <div className="mt-10 relative">
          <div
            className="text-xs text-center mb-3"
            style={{ color: "#334155", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}
          >
            // technologies-i-work-with
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {techStackImgs.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 cursor-default"
                style={{
                  background: "rgba(30, 41, 59, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(168, 85, 247, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.04)";
                }}
              >
                <img src={tech.imgPath} alt={tech.name} className="w-4 h-4 opacity-60" />
                <span
                  className="text-xs opacity-50"
                  style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TechStack;
