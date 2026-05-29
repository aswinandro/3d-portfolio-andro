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

    gsap.fromTo(".service-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
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
    <section id="services" className={`transition-opacity duration-500 ease-out ${showContent ? "opacity-100" : "opacity-0"} flex-center section-padding`}>
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What I Can Do For You"
          sub="🚀 Services I Offer to Bring Your Ideas to Life"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => (
            <GlowCard card={service} key={index} index={index} className="service-card">
              <div className="flex items-center gap-4 mb-4">
                <img src={service.icon} alt={service.title} className="w-10 h-10" />
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
