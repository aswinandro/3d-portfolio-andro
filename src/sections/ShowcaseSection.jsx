import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WorkSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const { loading, showContent } = useSkeletonLoader(750);

  useGSAP(
    () => {
      if (!showContent) return;

      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );

      gsap.fromTo(
        ".project-card",
        {
          y: 60,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-card",
            start: "top bottom-=100",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [showContent] }
  );

  if (loading) {
    return <WorkSkeleton />;
  }

  return (
    <div
      id="work"
      ref={sectionRef}
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } app-showcase`}
    >
      <div className="w-full">
        <div className="showcaselayout">
          <div className="first-project-wrapper project-card">
            <div className="image-wrapper">
              <img src="/images/project1.png" alt="Eveara App Interface" />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
            </div>
            <div className="text-content">
              <h2 style={{ letterSpacing: "-0.02em" }}>
                EVEARA - Music Distribution Platform
              </h2>
              <p style={{ color: "#94a3b8" }} className="md:text-xl">
                An app built with React, React Native, Expo, & TailwindCSS |
                Nodejs | FastAPI | MSSQ for a fast, user-friendly experience.
                White Label Partners, Users, Admin, Artists music distribution,
                analytics, and more.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project project-card">
              <div
                className="image-wrapper"
                style={{ background: "rgba(34, 197, 94, 0.03)" }}
              >
                <img
                  src="/images/project2.png"
                  alt="ROHiM Platform"
                />
              </div>
              <h2 style={{ letterSpacing: "-0.01em" }}>
                ROHiM - Youtube APIv3 & Calendar API
              </h2>
            </div>

            <div className="project project-card">
              <div
                className="image-wrapper"
                style={{ background: "rgba(59, 130, 246, 0.03)" }}
              >
                <img src="/images/project3.png" alt="GSAP Animations" />
              </div>
              <h2 style={{ letterSpacing: "-0.01em" }}>
                GSAP Animations - WhatsApp API
              </h2>
            </div>
          </div>
          <div className="project-list-wrapper overflow-hidden">
            <div className="project project-card">
              <div
                className="image-wrapper"
                style={{ background: "rgba(34, 197, 94, 0.03)" }}
              >
                <img src="/images/project5.png" alt="Three.js Portfolio" />
              </div>
              <h2 style={{ letterSpacing: "-0.01em" }}>Three.js Portfolio</h2>
            </div>

            <div className="project project-card">
              <div
                className="image-wrapper"
                style={{ background: "rgba(59, 130, 246, 0.03)" }}
              >
                <img
                  src="/images/project4.png"
                  alt="HolyLandTv LiveStreaming"
                />
              </div>
              <h2 style={{ letterSpacing: "-0.01em" }}>
                HolyLandTv - LiveStreaming FullStack
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
