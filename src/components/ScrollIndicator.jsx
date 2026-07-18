const ScrollIndicator = () => {
  return (
    <div className="flex flex-col items-center gap-2 scroll-indicator">
      <span
        style={{
          color: "#475569",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
        }}
      >
        SCROLL
      </span>
      <div
        className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
        style={{ border: "1.5px solid rgba(255,255,255,0.1)" }}
      >
        <div
          className="w-1 h-2 rounded-full"
          style={{
            background: "#22c55e",
            animation: "scrollDot 2s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
