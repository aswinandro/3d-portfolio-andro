import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineDot from "./TimelineDot";

gsap.registerPlugin(ScrollTrigger);

interface ExpCardProps {
  card: {
    title: string;
    date: string;
    logoPath: string;
    responsibilities: string[];
  };
  index: number;
}

const categoryIcons = [
  "/images/svgs/cloud-deploy.svg",
  "/images/svgs/server-api.svg",
  "/images/svgs/layers-animated.svg",
  "/images/svgs/shield-check.svg",
];

export default function ExpCard({ card, index }: ExpCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
        },
      }
    );
  }, []);

  const iconSrc = categoryIcons[index % categoryIcons.length];

  return (
    <div ref={cardRef} className="exp-card-wrapper group relative opacity-0">
      <div className="flex items-start">
        <TimelineDot logoPath={card.logoPath} index={index} />

        <div className="expText flex-1 md:ml-5 pb-12 xl:pb-20">
          {/* Date badge */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
              style={{
                background: "rgba(168, 85, 247, 0.06)",
                border: "1px solid rgba(168, 85, 247, 0.12)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#a855f7" }} />
              <span
                style={{
                  color: "#94a3b8",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.03em",
                }}
              >
                {card.date.split("|")[0]?.trim()}
              </span>
            </div>
            {card.date.includes("|") && (
              <span
                className="hidden sm:inline"
                style={{
                  color: "#52525b",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.02em",
                }}
              >
                {card.date.split("|")[1]?.trim()}
              </span>
            )}
          </div>

          {/* Title with icon */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "rgba(168, 85, 247, 0.08)",
                border: "1px solid rgba(168, 85, 247, 0.15)",
              }}
            >
              <img src={iconSrc} alt="" className="w-4 h-4" />
            </div>
            <h2
              className="font-semibold text-2xl md:text-3xl"
              style={{ letterSpacing: "-0.025em", color: "#f8fafc", lineHeight: "1.2" }}
            >
              {card.title}
            </h2>
          </div>

          {/* Key Contributions label */}
          <p
            className="mb-4 flex items-center gap-2"
            style={{
              color: "#a855f7",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <span
              className="w-4 h-px"
              style={{ background: "linear-gradient(90deg, #a855f7, transparent)" }}
            />
            Key Contributions
          </p>

          {/* Responsibilities */}
          <ul className="list-none space-y-3">
            {card.responsibilities.map((responsibility, idx) => (
              <li
                key={idx}
                className="text-sm md:text-base leading-relaxed relative pl-5"
                style={{ color: "#94a3b8" }}
              >
                <span
                  className="absolute left-0 top-2 w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2 group-hover:h-2 group-hover:top-[7px] group-hover:bg-[#a855f7]"
                  style={{ background: "#d4d4d8" }}
                />
                {responsibility}
              </li>
            ))}
          </ul>

          {/* Bottom accent line */}
          <div
            className="mt-6 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
            style={{
              background: "linear-gradient(90deg, rgba(168,85,247,0.3), rgba(99,102,241,0.1), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
