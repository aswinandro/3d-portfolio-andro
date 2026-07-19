import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards } from "@/constants";
import ExperienceHeader from "@/components/experience/ExperienceHeader";
import ExpCard from "@/components/experience/ExpCard";
import SvgDecorations from "@/components/experience/SvgDecorations";
import { ExperienceSkeleton, useSkeletonLoader } from "@/components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { loading, showContent } = useSkeletonLoader(750);
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!showContent || !lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      }
    );
  }, [showContent]);

  if (loading) {
    return <ExperienceSkeleton />;
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } md:mt-40 mt-20 section-padding relative`}
    >
      <SvgDecorations />

      <div className="w-full md:px-10 lg:px-20 px-5 relative z-10">
        <ExperienceHeader />

        <div className="mt-20 max-w-4xl mx-auto relative">
          {/* Continuous silver timeline line */}
          <div
            className="hidden md:block absolute z-[5]"
            style={{
              left: "23px",
              top: 0,
              bottom: 0,
              width: "2px",
            }}
          >
            {/* Base track */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(212,212,216,0.06)" }}
            />
            {/* Animated fill */}
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{
                background:
                  "linear-gradient(180deg, #a855f7 0%, #d4d4d8 30%, rgba(212,212,216,0.4) 70%, transparent 100%)",
              }}
            />
            {/* Glow overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(168,85,247,0.2) 0%, transparent 40%)",
                filter: "blur(3px)",
              }}
            />
          </div>

          {/* Experience cards */}
          <div className="relative z-10">
            {expCards.map((card, index) => (
              <ExpCard key={card.title} card={card} index={index} />
            ))}
          </div>

          {/* End marker */}
          <div
            className="hidden md:flex absolute z-20 items-center justify-center"
            style={{ left: "8px", bottom: "-8px", width: "32px", height: "32px" }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="#0a0a0f" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
              <circle cx="16" cy="16" r="4" fill="#a855f7" opacity="0.8">
                <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="16" cy="16" r="8" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="0.5">
                <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0;0.15" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
