const techPills = [
  { name: "Java", color: "#22c55e" },
  { name: "React", color: "#3b82f6" },
  { name: "Node.js", color: "#a855f7" },
  { name: "AWS", color: "#f59e0b" },
  { name: "Docker", color: "#06b6d4" },
  { name: "TypeScript", color: "#3b82f6" },
  { name: "PostgreSQL", color: "#ef4444" },
  { name: "Redis", color: "#ef4444" },
  { name: "CI/CD", color: "#22c55e" },
  { name: "REST", color: "#f59e0b" },
  { name: "GraphQL", color: "#ec4899" },
  { name: "Git", color: "#f97316" },
];

const TechPills = () => {
  return (
    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
      {techPills.map((pill, i) => (
        <span
          key={pill.name}
          className="tech-pill px-2.5 py-1 rounded-md transition-all duration-300 cursor-default"
          style={{
            background: `${pill.color}08`,
            border: `1px solid ${pill.color}18`,
            color: pill.color,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.03em",
            opacity: 0,
            animation: `pillFadeIn 0.4s ease forwards`,
            animationDelay: `${1.2 + i * 0.07}s`,
          }}
        >
          {pill.name}
        </span>
      ))}
    </div>
  );
};

export default TechPills;
