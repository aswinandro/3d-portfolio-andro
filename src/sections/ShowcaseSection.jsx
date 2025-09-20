import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Animation for the main section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );

      // Animate all project cards
      gsap.fromTo(
        ".project-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: ".project-card",
            start: "top bottom-=100",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div className="first-project-wrapper project-card">
            <div className="image-wrapper">
              <img src="/images/project1.png" alt="Ryde App Interface" />
            </div>
            <div className="text-content">
              <h2>
                EVEARA - Music Distribution Platform 
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with React, React Native, Expo, & TailwindCSS | Nodejs | FastAPI | MSSQ for a fast,
                user-friendly experience. White Label Partners, Users, Admin, Artistsmusic distribution, analytics, and more.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project project-card">
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/project2.png"
                  alt="Library Management Platform"
                />
              </div>
              <h2>ROHiM - Youtube APIv3 & Calendar API</h2>
            </div>

            <div className="project project-card">
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/project3.png" alt="YC Directory App" />
              </div>
              <h2>GSAP Animations - WhatsApp API</h2>
            </div>
          </div>
          <div className="project-list-wrapper overflow-hidden ">
            <div className="project project-card">
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/project5.png"
                  alt="Library Management Platform"
                />
              </div>
              <h2>Three.js Portfolio</h2>
            </div>

            <div className="project project-card">
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/project4.png" alt="YC Directory App" />
              </div>
              <h2>HolyLandTv - LiveStreaming FullStack</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
