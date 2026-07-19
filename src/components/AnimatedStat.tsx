import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
  color?: string;
}

export default function AnimatedStat({ value, suffix = "", label, color = "#a855f7" }: AnimatedStatProps) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 px-6 py-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span
        className="text-3xl md:text-4xl font-bold tabular-nums"
        style={{
          background: `linear-gradient(135deg, ${color}, #6366f1)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
        }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="text-xs text-center"
        style={{
          color: "#64748b",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.03em",
        }}
      >
        {label}
      </span>
    </div>
  );
}
