import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { services } from "../constants";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { ServicesSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ service }: { service: (typeof services)[number] }) => {
  return (
    <GlassCard className="h-full" hover>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-lg flex-none transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            style={{
              background: "rgba(168, 85, 247, 0.08)",
              border: "1px solid rgba(168, 85, 247, 0.12)",
            }}
          >
            <img src={service.icon} alt={service.title} className="w-4 h-4" />
          </div>
          <h3
            className="text-base font-medium"
            style={{ letterSpacing: "-0.01em", color: "#f8fafc" }}
          >
            {service.title}
          </h3>
        </div>

        {service.review && (
          <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
            {service.review}
          </p>
        )}
      </div>
    </GlassCard>
  );
};

const Services = () => {
  const { loading, showContent } = useSkeletonLoader(700);

  useGSAP(() => {
    if (!showContent) return;

    gsap.fromTo(
      ".service-card",
      { y: 40, opacity: 0, filter: "blur(4px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
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
        <SectionHeader
          badge="SERVICES"
          badgeIcon={
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          }
          title="What I Can Do"
          titleAccent="For You"
          description="End-to-end development from architecture to deployment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
