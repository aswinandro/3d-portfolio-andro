import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import { skillsData } from "../constants";
import { SkillsSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const SkillsPage = () => {
  const { loading, showContent } = useSkeletonLoader(650);

  useGSAP(() => {
    if (!showContent) return;

    gsap.fromTo(
      ".skill-card",
      { y: 50, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        },
      }
    );
  }, [showContent]);

  if (loading) {
    return <SkillsSkeleton />;
  }

  return (
    <section
      id="skills-page"
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } flex-center section-padding`}
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="My Technical Arsenal" sub="SKILLS & TOOLS" />
        <div className="skills-grid mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className="skill-card card-border rounded-xl p-6 flex flex-col group relative overflow-hidden"
            >
              {/* Gradient accent line at top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, #22c55e, #3b82f6)",
                }}
              />

              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg"
                  style={{
                    background: "rgba(34, 197, 94, 0.08)",
                    border: "1px solid rgba(34, 197, 94, 0.12)",
                  }}
                >
                  <img
                    src={category.icon}
                    alt={category.category}
                    className="w-5 h-5"
                  />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {category.category}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm font-medium px-3 py-1 rounded-full transition-all duration-300"
                    style={{
                      background: "rgba(30, 41, 59, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      color: "#94a3b8",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(34, 197, 94, 0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(34, 197, 94, 0.3)";
                      e.currentTarget.style.color = "#22c55e";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(30, 41, 59, 0.5)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.06)";
                      e.currentTarget.style.color = "#94a3b8";
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsPage;
