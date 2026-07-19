import { useRef, type ReactNode } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  accentColor = "#a855f7",
  hover = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(cardRef);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${hover ? "group" : ""} ${className}`}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Mouse-tracking glow */}
      {hover && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(350px circle at ${mouse.relativeX}% ${mouse.relativeY}%, ${accentColor}08, transparent 50%)`,
          }}
        />
      )}

      {/* Top accent line */}
      {hover && (
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
