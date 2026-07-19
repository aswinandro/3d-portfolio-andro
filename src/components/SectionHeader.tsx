import type { ReactNode } from "react";

interface SectionHeaderProps {
  badge: string;
  badgeIcon?: ReactNode;
  title: string;
  titleAccent?: string;
  description?: string;
}

export default function SectionHeader({
  badge,
  badgeIcon,
  title,
  titleAccent,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(168, 85, 247, 0.06)",
          border: "1px solid rgba(168, 85, 247, 0.12)",
        }}
      >
        {badgeIcon || (
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#a855f7" }} />
        )}
        <span
          style={{
            color: "#a855f7",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {badge}
        </span>
      </div>

      {/* Title */}
      <h2
        className="font-semibold md:text-3xl lg:text-4xl text-2xl text-center max-w-xl"
        style={{ letterSpacing: "-0.03em", lineHeight: "1.15", color: "#f8fafc" }}
      >
        {title}{" "}
        {titleAccent && <span style={{ color: "#a855f7" }}>{titleAccent}</span>}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-center max-w-md text-sm" style={{ color: "#64748b", lineHeight: "1.6" }}>
          {description}
        </p>
      )}
    </div>
  );
}
