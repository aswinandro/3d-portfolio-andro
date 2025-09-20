import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import { skillsData } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const SkillsPage = () => {
  useGSAP(() => {
    // Animate the skill cards into view as the user scrolls
    gsap.fromTo(
      ".skill-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="skills-page" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="My Technical Arsenal"
          sub="🛠️ A Deep Dive into My Skills"
        />
        <div className="skills-grid mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category) => (
            <div key={category.category} className="skill-card card-border rounded-xl p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <img src={category.icon} alt={category.category} className="w-8 h-8" />
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="bg-zinc-800 text-white-50 text-sm font-medium px-3 py-1 rounded-full">{skill}</li>
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