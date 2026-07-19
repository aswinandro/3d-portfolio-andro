import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceHeader() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(168, 85, 247, 0.06)",
          border: "1px solid rgba(168, 85, 247, 0.12)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
        <span
          style={{
            color: "#a855f7",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Career Overview
        </span>
      </div>

      {/* Title */}
      <h2
        className="font-semibold md:text-4xl lg:text-5xl text-3xl text-center max-w-2xl"
        style={{
          letterSpacing: "-0.035em",
          lineHeight: "1.15",
          color: "#f8fafc",
        }}
      >
        Professional Work{" "}
        <span className="inline-flex items-center gap-1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle">
            <polyline points="16 18 22 12 16 6">
              <animate attributeName="stroke-dasharray" values="0 50;24 50" dur="0.6s" fill="freeze" />
              <animate attributeName="stroke-dashoffset" values="24;0" dur="0.6s" fill="freeze" />
            </polyline>
            <polyline points="8 6 2 12 8 18">
              <animate attributeName="stroke-dasharray" values="0 50;24 50" dur="0.6s" begin="0.3s" fill="freeze" />
              <animate attributeName="stroke-dashoffset" values="24;0" dur="0.6s" begin="0.3s" fill="freeze" />
            </polyline>
          </svg>
        </span>{" "}
        <span style={{ color: "#a855f7" }}>Experience</span>
      </h2>

      {/* Decorative line */}
      <div className="w-full max-w-xs h-px relative overflow-hidden mt-2">
        <div className="absolute inset-0" style={{ background: "rgba(212,212,216,0.1)" }} />
        <div
          ref={lineRef}
          className="absolute inset-0 origin-left"
          style={{
            background: "linear-gradient(90deg, #a855f7, #6366f1, transparent)",
          }}
        />
      </div>
    </div>
  );
}
