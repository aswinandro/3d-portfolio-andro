import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import TechRadar from "../components/TechRadar";
import { skillsData, techStackImgs } from "../constants";
import { TechStackSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Fullstack Developer",
  "DevOps Engineer",
  "Cloud Architect",
  "API Specialist",
  "System Designer",
];

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

const TerminalHeader = () => {
  const typedText = useTypingAnimation(roles);
  const [lineCount, setLineCount] = useState(0);

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

  const terminalLines = [
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
    >
      {/* Terminal chrome */}
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
          <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
        </div>
        <span
          className="ml-3 text-xs"
          style={{ color: "#475569", letterSpacing: "0.05em" }}
        >
          aswin@portfolio ~ %
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 md:p-6 min-h-[160px]">
        {terminalLines.slice(0, lineCount).map((line, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            {line.startsWith("$") ? (
              <span style={{ color: "#22c55e" }}>{line}</span>
            ) : line.startsWith(">") ? (
              <span style={{ color: "#f8fafc" }}>{line}</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        ))}
        {lineCount >= terminalLines.length && (
          <span
            className="inline-block w-2 h-4 ml-1"
            style={{
              background: "#22c55e",
              animation: "blink 1s step-end infinite",
            }}
          />
        )}
      </div>
    </div>
  );
};

const SkillBar = ({ name, level, delay = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs w-24 text-right flex-none"
        style={{
          color: "#94a3b8",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
        }}
      >
        {name}
      </span>
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255, 255, 255, 0.05)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: "linear-gradient(90deg, #22c55e, #3b82f6)",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <span
        className="text-xs w-8 flex-none"
        style={{
          color: "#22c55e",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
        }}
      >
        {level}%
      </span>
    </div>
  );
};

const BentoCard = ({ category, icon, skills, span = "normal" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const spanClasses = {
    wide: "col-span-1 md:col-span-2",
    tall: "row-span-1 md:row-span-2",
    large: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
    normal: "col-span-1",
  };

  return (
    <div
      className={`skill-bento-card ${spanClasses[span]} card-border rounded-xl p-5 md:p-6 flex flex-col relative overflow-hidden group`}
      style={{
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, #22c55e, #3b82f6)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 197, 94, 0.06), transparent 40%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 flex items-center justify-center rounded-lg flex-none"
          style={{
            background: "rgba(34, 197, 94, 0.08)",
            border: "1px solid rgba(34, 197, 94, 0.12)",
          }}
        >
          <img src={icon} alt={category} className="w-4 h-4" />
        </div>
        <h3
          className="font-semibold"
          style={{
            letterSpacing: "-0.01em",
            fontSize: span === "large" ? "1.1rem" : "0.95rem",
          }}
        >
          {category}
        </h3>
      </div>

      {span === "large" ? (
        <div className="flex-1 flex flex-col gap-3">
          {skills.map((skill, i) => (
            <SkillBar key={skill} name={skill} level={85 + Math.random() * 15 | 0} delay={i * 100} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5 flex-1">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2.5 py-1 rounded-md transition-all duration-300"
              style={{
                background: isHovered
                  ? "rgba(34, 197, 94, 0.12)"
                  : "rgba(30, 41, 59, 0.5)",
                border: `1px solid ${
                  isHovered
                    ? "rgba(34, 197, 94, 0.25)"
                    : "rgba(255, 255, 255, 0.04)"
                }`,
                color: isHovered ? "#22c55e" : "#94a3b8",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const TechStack = () => {
  const { loading, showContent } = useSkeletonLoader(750);
  const containerRef = useRef(null);

  const radarSkills = [
    { name: "Java", level: 95 },
    { name: "React", level: 90 },
    { name: "Node.js", level: 88 },
    { name: "Cloud", level: 85 },
    { name: "DevOps", level: 82 },
    { name: "APIs", level: 92 },
    { name: "DB", level: 87 },
    { name: "Python", level: 80 },
  ];

  useGSAP(() => {
    if (!showContent) return;

    gsap.fromTo(
      ".bento-card",
      { y: 40, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      ".terminal-header",
      { y: 30, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#skills",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".radar-section",
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".radar-section",
          start: "top 80%",
        },
      }
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

        {/* Terminal + Radar Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          <TerminalHeader />

          {/* Radar Chart */}
          <div className="radar-section card-border rounded-xl p-5 md:p-6 flex flex-col items-center justify-center">
            <div
              className="text-xs mb-4 self-start"
              style={{
                color: "#475569",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.05em",
              }}
            >
              // skill-proficiency-radar
            </div>
            <TechRadar skills={radarSkills} size={280} />
          </div>
        </div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
          style={{ gridAutoRows: "minmax(180px, auto)" }}
        >
          {/* Languages - Wide */}
          <BentoCard
            category={skillsData[0].category}
            icon={skillsData[0].icon}
            skills={skillsData[0].skills}
            span="wide"
          />

          {/* Cloud & DevOps - Tall */}
          <BentoCard
            category={skillsData[4].category}
            icon={skillsData[4].icon}
            skills={skillsData[4].skills}
            span="tall"
          />

          {/* Frameworks */}
          <BentoCard
            category={skillsData[1].category}
            icon={skillsData[1].icon}
            skills={skillsData[1].skills}
          />

          {/* Frontend */}
          <BentoCard
            category={skillsData[2].category}
            icon={skillsData[2].icon}
            skills={skillsData[2].skills}
          />

          {/* Architecture - Wide */}
          <BentoCard
            category={skillsData[5].category}
            icon={skillsData[5].icon}
            skills={skillsData[5].skills}
            span="wide"
          />

          {/* Databases */}
          <BentoCard
            category={skillsData[3].category}
            icon={skillsData[3].icon}
            skills={skillsData[3].skills}
          />

          {/* Payments & Security */}
          <BentoCard
            category={skillsData[8].category}
            icon={skillsData[8].icon}
            skills={skillsData[8].skills}
          />

          {/* Testing */}
          <BentoCard
            category={skillsData[7].category}
            icon={skillsData[7].icon}
            skills={skillsData[7].skills}
          />

          {/* Observability */}
          <BentoCard
            category={skillsData[6].category}
            icon={skillsData[6].icon}
            skills={skillsData[6].skills}
          />
        </div>

        {/* Tech logos marquee */}
        <div className="mt-12 relative">
          <div
            className="text-xs text-center mb-4"
            style={{
              color: "#475569",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
            }}
          >
            // technologies-i-work-with
          </div>
          <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap opacity-40">
            {techStackImgs.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:opacity-100"
                style={{
                  background: "rgba(30, 41, 59, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                }}
              >
                <img src={tech.imgPath} alt={tech.name} className="w-5 h-5" />
                <span
                  className="text-xs"
                  style={{
                    color: "#94a3b8",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                  }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blink animation for cursor */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TechStack;
