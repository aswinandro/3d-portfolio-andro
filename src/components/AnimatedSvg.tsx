import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface AnimatedSvgProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedSvg({ children, className = "", delay = 0, duration = 0.8 }: AnimatedSvgProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      scale: 0.8,
      duration,
      delay,
      ease: "power2.out",
    });
  }, [delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface FloatingSvgProps {
  src: string;
  alt?: string;
  className?: string;
  floatDuration?: number;
  floatDelay?: number;
}

export function FloatingSvg({
  src,
  alt = "",
  className = "",
  floatDuration = 6,
  floatDelay = 0,
}: FloatingSvgProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -12,
      duration: floatDuration / 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: floatDelay,
    });
  }, [floatDuration, floatDelay]);

  return (
    <div ref={ref} className={`pointer-events-none ${className}`}>
      <img src={src} alt={alt} className="w-full h-full" />
    </div>
  );
}

interface GlowRingProps {
  size?: number;
  className?: string;
}

export function GlowRing({ size = 40, className = "" }: GlowRingProps) {
  const r = size / 2 - 2;
  const circumference = 2 * Math.PI * r;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`absolute inset-0 ${className}`}
    >
      <defs>
        <linearGradient id={`ringGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(212,212,216,0.08)"
        strokeWidth="1"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={`url(#ringGrad-${size})`}
        strokeWidth="1.5"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        strokeLinecap="round"
        style={{
          animation: `svg-draw 1.5s ease forwards, svg-spin 20s linear infinite`,
        }}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r - 4}
        fill="none"
        stroke="rgba(168,85,247,0.1)"
        strokeWidth="0.5"
        strokeDasharray="3 5"
        style={{
          animation: "svg-spin-reverse 15s linear infinite",
        }}
      />
    </svg>
  );
}

interface PulseDotProps {
  color?: string;
  size?: number;
  className?: string;
}

export function PulseDot({ color = "#a855f7", size = 6, className = "" }: PulseDotProps) {
  return (
    <span className={`relative inline-flex ${className}`} style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: color,
          animation: "pulse-dot 2s ease-in-out infinite",
        }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${color}`,
          animation: "pulse-ring 2s ease-in-out infinite",
        }}
      />
    </span>
  );
}
