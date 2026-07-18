import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { services } from "../constants";
import TitleHeader from "../components/TitleHeader";
import { ServicesSkeleton, useSkeletonLoader } from "../components/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ service, index }) => {
  return (
    <div
      className="service-card card-border rounded-xl p-6 flex flex-col gap-4 group relative overflow-hidden transition-all duration-500"
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, #a855f7, #6366f1)" }}
      />

      {/* Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(300px circle at 50% 0%, rgba(168,85,247,0.04), transparent 40%)",
        }}
      />

      <div className="flex items-center gap-3.5">
        <div
          className="w-11 h-11 flex items-center justify-center rounded-xl flex-none transition-all duration-300 group-hover:scale-110"
          style={{
            background: "rgba(168, 85, 247, 0.08)",
            border: "1px solid rgba(168, 85, 247, 0.12)",
          }}
        >
          <img src={service.icon} alt={service.title} className="w-5 h-5" />
        </div>
        <h3
          className="text-lg font-semibold"
          style={{ letterSpacing: "-0.01em" }}
        >
          {service.title}
        </h3>
      </div>

      {service.desc && (
        <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
          {service.desc}
        </p>
      )}
    </div>
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
        <TitleHeader
          title="What I Can Do For You"
          sub="SERVICES"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
