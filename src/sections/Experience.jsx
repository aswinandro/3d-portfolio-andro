import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import { ExperienceSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const ExpCard = ({ card, index }) => {
  return (
    <div className="exp-card-wrapper group relative">
      <div className="flex items-start">
        {/* Timeline dot */}
        <div className="timeline-dot-wrapper hidden md:flex flex-col items-center flex-none" style={{ width: "40px" }}>
          <div
            className="timeline-logo w-10 h-10 rounded-full overflow-hidden bg-[#111] relative z-20 flex items-center justify-center flex-none transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            style={{ border: "2px solid rgba(212, 212, 216, 0.25)" }}
          >
            <img src={card.logoPath} alt="logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="expText flex-1 md:ml-6 pb-16 xl:pb-24">
          {/* Date badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
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
              {card.date}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-semibold text-2xl md:text-3xl mb-5"
            style={{ letterSpacing: "-0.025em", color: "#f8fafc", lineHeight: "1.2" }}
          >
            {card.title}
          </h2>

          {/* Responsibilities */}
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

          <ul className="list-none space-y-3">
            {card.responsibilities.map((responsibility, idx) => (
              <li
                key={idx}
                className="text-sm md:text-base leading-relaxed relative pl-5"
                style={{ color: "#94a3b8" }}
              >
                <span
                  className="absolute left-0 top-2 w-1 h-1 rounded-full"
                  style={{ background: "#d4d4d8" }}
                />
                {responsibility}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const { loading, showContent } = useSkeletonLoader(750);

  useGSAP(() => {
    if (!showContent) return;

    gsap.utils.toArray(".exp-card-wrapper").forEach((card, index) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
    });

    gsap.fromTo(
      ".exp-silver-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-timeline-container",
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
      id="experience"
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } md:mt-40 mt-20 section-padding`}
    >
      <div className="w-full md:px-10 lg:px-20 px-5">
        <TitleHeader title="Professional Work Experience" sub="CAREER OVERVIEW" />

        <div className="exp-timeline-container mt-20 max-w-4xl mx-auto relative">
          {/* Continuous silver line */}
          <div
            className="hidden md:block absolute z-[5]"
            style={{
              left: "19px",
              top: 0,
              bottom: 0,
              width: "2px",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(212,212,216,0.08)" }}
            />
            <div
              className="exp-silver-line absolute inset-0 origin-top"
              style={{
                background: "linear-gradient(180deg, #d4d4d8 0%, rgba(212,212,216,0.4) 70%, transparent 100%)",
              }}
            />
          </div>

          {/* Cards */}
          <div className="relative z-10">
            {expCards.map((card, index) => (
              <ExpCard key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
