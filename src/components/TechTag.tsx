interface TechTagProps {
  label: string;
  color?: string;
}

export default function TechTag({ label, color = "#a855f7" }: TechTagProps) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs transition-all duration-300 hover:scale-105"
      style={{
        background: `${color}08`,
        border: `1px solid ${color}15`,
        color: "#94a3b8",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </span>
  );
}
