import { useState, useEffect } from "react";

const codeLines = [
  { indent: 0, text: "const ", hl: "#c678dd", rest: "aswin = {", color: "#e06c75" },
  { indent: 1, text: "role: ", hl: "#98c379", rest: '"Fullstack Developer",', color: "#56b6c2" },
  { indent: 1, text: "location: ", hl: "#98c379", rest: '"UAE",', color: "#56b6c2" },
  { indent: 1, text: "stack: ", hl: "#61afef", rest: "[", color: "#e5c07b" },
  { indent: 2, text: '"Java"', color: "#98c379" },
  { indent: 2, text: '"React"', color: "#98c379" },
  { indent: 2, text: '"Node.js"', color: "#98c379" },
  { indent: 2, text: '"AWS"', color: "#98c379" },
  { indent: 2, text: '"DevOps"', color: "#98c379" },
  { indent: 1, text: "],", color: "#e5c07b" },
  { indent: 1, text: "passion: ", hl: "#98c379", rest: '"Building things that matter",', color: "#56b6c2" },
  { indent: 0, text: "};", color: "#c678dd" },
];

const statusLine = [
  { indent: 0, text: "export ", hl: "#c678dd", rest: "default ", color: "#c678dd" },
  { indent: 0, text: "aswin;", hl: "#e06c75", rest: "", color: "#c678dd" },
];

const CodeBlock = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (visibleLines < codeLines.length + statusLine.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((v) => v + 1);
      }, 180);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  const allLines = [...codeLines, ...statusLine];

  return (
    <div className="code-block-wrapper card-border rounded-xl overflow-hidden">
      {/* Chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(17,17,24,0.5)",
        }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
        </div>
        <span
          className="ml-2 text-xs"
          style={{ color: "#475569", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.05em" }}
        >
          aswin.js
        </span>
        <span
          className="ml-auto text-xs"
          style={{ color: "#334155", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
        >
          javascript
        </span>
      </div>

      {/* Code */}
      <div className="p-4 md:p-5 font-mono text-xs leading-relaxed min-h-[220px]">
        {allLines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="flex items-center gap-0 opacity-0"
            style={{
              animation: `codeLineIn 0.3s ease forwards`,
              animationDelay: `${i * 30}ms`,
              paddingLeft: `${line.indent * 16}px`,
            }}
          >
            <span
              className="w-6 text-right mr-3 flex-none select-none"
              style={{ color: "#334155", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
            >
              {i + 1}
            </span>
            <span style={{ color: line.hl || "#abb2bf" }}>{line.text}</span>
            <span style={{ color: line.color || "#abb2bf" }}>{line.rest}</span>
            {i === visibleLines - 1 && (
              <span
                className="inline-block w-1.5 h-3.5 ml-0.5"
                style={{
                  background: "#22c55e",
                  opacity: showCursor ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeBlock;
