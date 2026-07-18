const TitleHeader = ({ title, sub }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(168, 85, 247, 0.06)",
          border: "1px solid rgba(168, 85, 247, 0.12)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#a855f7" }}
        />
        <span
          style={{
            color: "#a855f7",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {sub}
        </span>
      </div>
      <h2
        className="font-semibold md:text-4xl lg:text-5xl text-3xl text-center max-w-2xl"
        style={{
          letterSpacing: "-0.035em",
          lineHeight: "1.15",
          color: "#f8fafc",
        }}
      >
        {title}
      </h2>
    </div>
  );
};

export default TitleHeader;
