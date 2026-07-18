import { useState, useEffect } from "react";

const StatusCard = () => {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full"
      style={{
        background: "rgba(17, 17, 24, 0.6)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(34, 197, 94, 0.15)",
      }}
    >
      <span
        className="w-2 h-2 rounded-full flex-none"
        style={{
          background: "#22c55e",
          boxShadow: `0 0 ${pulse ? 8 : 4}px rgba(34, 197, 94, ${pulse ? 0.6 : 0.3})`,
          transition: "box-shadow 2s ease",
        }}
      />
      <span
        style={{
          color: "#22c55e",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.04em",
        }}
      >
        Available for work
      </span>
    </div>
  );
};

export default StatusCard;
