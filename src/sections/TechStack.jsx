import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import {
  View,
  PerspectiveCamera,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

import TitleHeader from "../components/TitleHeader";
import { techStackIcons } from "../constants";
import TechModel from "../components/models/tech_logos/TechModel";
import { TechStackSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

techStackIcons.forEach((model) => useGLTF.preload(model.modelPath));

const TechStack = () => {
  const containerRef = useRef();
  const { loading, showContent } = useSkeletonLoader(750);

  useGSAP(() => {
    if (!showContent) return;

    gsap.fromTo(
      ".tech-card",
      {
        y: 50,
        opacity: 0,
        filter: "blur(5px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  }, [showContent]);

  if (loading) {
    return <TechStackSkeleton />;
  }

  return (
    <div
      id="skills"
      ref={containerRef}
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } flex-center section-padding relative`}
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="WHAT I BRING"
        />
        <div className="tech-grid">
          {techStackIcons.map((techStackIcon, i) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg relative"
              style={{
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <View as="div" index={i + 1} className="tech-icon-wrapper">
                  <ambientLight intensity={1.5} />
                  <pointLight position={[10, 10, 2]} intensity={2} />
                  <PerspectiveCamera
                    makeDefault
                    fov={25}
                    position={[0, 0, 10]}
                  />

                  <TechModel model={techStackIcon} />

                  <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={2}
                  />
                </View>
                <div className="padding-x w-full">
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.8rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {techStackIcon.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        eventSource={containerRef}
        className="w-full h-full"
      >
        <View.Port />
      </Canvas>
    </div>
  );
};

export default TechStack;
