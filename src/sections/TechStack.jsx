import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { View, PerspectiveCamera, OrbitControls } from "@react-three/drei";

import TitleHeader from "../components/TitleHeader";
import { techStackIcons } from "../constants";
import TechModel from "../components/models/tech_logos/TechModel";

const TechStack = () => {
  const containerRef = useRef();

  // Animate the tech cards in the skills section
  useGSAP(() => {
    // This animation is triggered when the user scrolls to the #skills wrapper
    // The animation starts when the top of the wrapper is at the center of the screen
    // The animation is staggered, meaning each card will animate in sequence
    // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
    gsap.fromTo(
      ".tech-card",
      {
        // Initial values
        y: 50, // Move the cards down by 50px
        opacity: 0, // Set the opacity to 0
      },
      {
        // Final values
        y: 0, // Move the cards back to the top
        opacity: 1, // Set the opacity to 1
        duration: 1, // Duration of the animation
        ease: "power2.inOut", // Ease of the animation
        stagger: 0.2, // Stagger the animation by 0.2 seconds
        scrollTrigger: {
          trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
          start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
        },
      }
  );
}, []);

  return (
    <div id="skills" ref={containerRef} className="flex-center section-padding relative">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {techStackIcons.map((techStackIcon, i) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <View as="div" index={i + 1} className="tech-icon-wrapper">
                  <ambientLight intensity={1.5} />
                  <pointLight position={[10, 10, 2]} intensity={2} />
                  <PerspectiveCamera makeDefault fov={25} position={[0, 0, 10]} />

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
                  <p>{techStackIcon.name}</p>
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
