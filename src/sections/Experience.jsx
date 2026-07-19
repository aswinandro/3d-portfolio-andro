import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import { ExperienceSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const ExpCard = ({ card }) => {
  return (
    <div className="exp-card-wrapper group">
      <div className="xl:w-2/6">
        <div className="card-border rounded-xl relative z-10 h-full overflow-hidden">
          <div
            className="absolute top-0 right-0 w-1 h-full"
            style={{ background: "linear-gradient(180deg, #a855f7, transparent)" }}
          />
          <div className="p-6">
            <div className="relative">
              <div
                className="absolute -inset-0.5 rounded-xl blur opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
              />
              <div className="relative card-border rounded-xl bg-[#0a0a0f] p-5">
                <div className="w-full flex justify-center mb-4">
                  <div className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-[#a855f7] to-[#6366f1] p-1">
                    <img src={card.imgPath} alt="exp-img" className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xl:w-4/6">
        <div className="flex items-start">
          <div className="relative ml-0 xl:ml-12">
            <div
              className="w-1 h-12"
              style={{ background: "linear-gradient(180deg, #a855f7, transparent)" }}
            />
            <div
              className="gradient-line w-1 h-full absolute top-0 left-0"
              style={{ background: "linear-gradient(180deg, #a855f7, transparent)" }}
            />
          </div>

          <div className="expText relative z-20 flex xl:gap-20 md:gap-10 gap-6 flex-1">
            <div
              className="timeline-logo w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-[#111]"
              style={{ border: "1px solid rgba(168, 85, 247, 0.3)" }}
            >
              <img src={card.logoPath} alt="logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h1
                className="font-semibold text-2xl xl:text-3xl mb-3"
                style={{ letterSpacing: "-0.02em", color: "#f8fafc" }}
              >
                {card.title}
              </h1>
              <p
                className="my-3"
                style={{
                  color: "#94a3b8",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.02em",
                }}
              >
                {card.date}
              </p>
              <p
                className="italic text-sm mb-4 flex items-center gap-2"
                style={{ color: "#a855f7" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#a855f7" }} />
                Responsibilities
              </p>
              <ul className="list-none space-y-3">
                {card.responsibilities.map((responsibility, idx) => (
                  <li
                    key={idx}
                    className="text-sm leading-relaxed relative pl-6"
                    style={{ color: "#94a3b8" }}
                  >
                    <span
                      className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ background: "#a855f7" }}
                    />
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
        xPercent: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", { scaleY: 1 - self.progress });
        },
      },
    });

    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: { trigger: text, start: "top 60%" },
      });
    });
  }, [showContent]);

  if (loading) {
    return <ExperienceSkeleton />;
  }

  return (
    <section
      id="experience"
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } flex-center md:mt-40 mt-20 section-padding xl:px-0`}
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Professional Work Experience" sub="CAREER OVERVIEW" />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <ExpCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
