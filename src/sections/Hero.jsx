import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import { HeroSkeleton, useSkeletonLoader } from "../components/Skeleton";

const Hero = () => {
  const { loading, showContent } = useSkeletonLoader(750);

  useGSAP(() => {
    if (!showContent) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-text h1",
      { y: 60, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.15, duration: 1.2 }
    )
      .fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ".hero-counter-section",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.3"
      );

    gsap.to(".bg-image", {
      scale: 1.6,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Ambient floating particles
    gsap.utils.toArray(".ambient-particle").forEach((particle, i) => {
      gsap.to(particle, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        duration: `random(3, 6)`,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      });
    });
  }, [showContent]);

  const handleScrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return <HeroSkeleton />;
  }

  return (
    <div
      className={`transition-opacity duration-700 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } relative min-h-screen overflow-hidden flex flex-col justify-center`}
    >
      {/* Background Image with enhanced overlay */}
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <img
          src="/images/bg.png"
          alt=""
          className="bg-image w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.06)_0%,_transparent_70%)]" />
      </div>

      {/* Ambient Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="ambient-particle absolute rounded-full pointer-events-none"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: i % 2 === 0 ? "rgba(34, 197, 94, 0.3)" : "rgba(59, 130, 246, 0.2)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Hero Content */}
      <section
        id="hero"
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-7 pt-28 sm:pt-55 md:pt-55 lg:pt-40 xl:pt-35 2xl:pt-35 px-2 sm:px-4 md:px-6 lg:px-10"
      >
        <div className="hero-text max-w-4xl">
          <h1 style={{ letterSpacing: "-0.03em" }}>
            Shaping
            <span className="slide">
              <span className="wrapper">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className="flex items-center justify-center gap-2 pb-2"
                  >
                    <img
                      src={word.imgPath}
                      alt="person"
                      className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full"
                      style={{
                        background: "rgba(34, 197, 94, 0.1)",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                      }}
                    />
                    <span>{word.text}</span>
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <h1 style={{ letterSpacing: "-0.03em" }}>into Real Projects</h1>
          <h1
            className="xl:pr-80 lg:pr-70 sm:pr-0 md:pr-54"
            style={{ letterSpacing: "-0.03em" }}
          >
            that Deliver Results
          </h1>
        </div>

        <p
          className="hero-subtitle md:text-xl relative z-10 pointer-events-none max-w-2xl"
          style={{ color: "#94a3b8" }}
        >
          Hi, I'm Aswin Andro, a Fullstack developer with a passion for Code
          and DevOps.
        </p>
      </section>

      {/* Bottom Counter + Button */}
      <div className="hero-counter-section z-20 w-full flex flex-col items-center gap-4 py-6 md:py-4 px-5 md:px-10">
        <AnimatedCounter />
        <Button
          text="Explore Services"
          className="md:w-80 md:h-8 w-60 h-8"
          id="counter"
          onClick={handleScrollToServices}
        />
      </div>
    </div>
  );
};

export default Hero;
