import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { services } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import { ServicesSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const { loading, showContent } = useSkeletonLoader(700);

  useGSAP(() => {
    if (!showContent) return;

    gsap.fromTo(
      ".service-card",
      { y: 50, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#services",
          start: "top 80%",
        },
      }
    );
  }, [showContent]);

  if (loading) {
    return <ServicesSkeleton />;
  }

  return (
    <section
      id="services"
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } flex-center section-padding`}
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What I Can Do For You"
          sub="SERVICES I OFFER"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => (
            <GlowCard
              card={service}
              key={index}
              index={index}
              className="service-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(34, 197, 94, 0.08)",
                    border: "1px solid rgba(34, 197, 94, 0.12)",
                  }}
                >
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-6 h-6"
                  />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {service.title}
                </h3>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
