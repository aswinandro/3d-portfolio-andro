import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TimelineDotProps {
  logoPath: string;
  index: number;
}

export default function TimelineDot({ logoPath, index }: TimelineDotProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ringRef.current) return;
    gsap.fromTo(
      ringRef.current,
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 0.3 + index * 0.15,
        ease: "back.out(1.7)",
      }
    );
  }, [index]);

  return (
    <div className="timeline-dot-wrapper hidden md:flex flex-col items-center flex-none" style={{ width: "48px" }}>
      <div ref={dotRef} className="relative z-20 flex items-center justify-center" style={{ width: 48, height: 48 }}>
        {/* Glow ring SVG */}
        <div ref={ringRef} className="absolute inset-0 opacity-0">
          <svg width="48" height="48" viewBox="0 0 48 48" className="absolute inset-0">
            <defs>
              <linearGradient id={`tlGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <circle
              cx="24" cy="24" r="22"
              fill="none"
              stroke="rgba(212,212,216,0.06)"
              strokeWidth="1"
            />
            <circle
              cx="24" cy="24" r="22"
              fill="none"
              stroke={`url(#tlGrad-${index})`}
              strokeWidth="1.5"
              strokeDasharray="138"
              strokeDashoffset="138"
              strokeLinecap="round"
              className="tl-ring-animate"
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            />
          </svg>
        </div>

        {/* Logo circle */}
        <div
          className="w-10 h-10 rounded-full overflow-hidden bg-[#111] relative z-10 flex items-center justify-center flex-none transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]"
          style={{ border: "2px solid rgba(212, 212, 216, 0.2)" }}
        >
          <img src={logoPath} alt="logo" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
