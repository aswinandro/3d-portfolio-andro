import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import AnimatedSVGs from "../components/AnimatedSVGs";
import CodeBlock from "../components/CodeBlock";
import StatusCard from "../components/StatusCard";
import ScrollIndicator from "../components/ScrollIndicator";
import TechPills from "../components/TechPills";
import { words } from "../constants";
import { HeroSkeleton, useSkeletonLoader } from "../components/Skeleton";

const roles = [
  "Fullstack Developer",
  "Cloud Architect",
  "DevOps Engineer",
  "API Specialist",
  "System Designer",
];

const Hero = () => {
  const { loading, showContent } = useSkeletonLoader(750);
  const heroRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation for roles
  useEffect(() => {
    if (!showContent) return;
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, typedText.length + 1));
        if (typedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentRole.substring(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex, showContent]);

  useGSAP(() => {
    if (!showContent || !heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-status-card",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(
        ".hero-eyebrow",
        { y: 20, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        ".hero-heading",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.12 },
        "-=0.4"
      )
      .fromTo(
        ".hero-subtitle-line",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
        "-=0.5"
      )
      .fromTo(
        ".hero-code-block",
        { x: 40, opacity: 0, filter: "blur(8px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
        "-=0.8"
      )
      .fromTo(
        ".hero-counter-section",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        ".hero-scroll-indicator",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );

    // Grid pulse
    gsap.to(".hero-grid-bg", {
      opacity: 0.06,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Ambient floating particles
    gsap.utils.toArray(".ambient-particle").forEach((particle, i) => {
      gsap.to(particle, {
        y: `random(-40, 40)`,
        x: `random(-30, 30)`,
        duration: `random(4, 8)`,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.4,
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
      ref={heroRef}
      className={`transition-opacity duration-700 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } relative min-h-screen overflow-hidden flex flex-col justify-center`}
    >
      {/* Background Image with enhanced overlay */}
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <img
          src="/images/bg.png"
          alt=""
          className="bg-image w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_rgba(34,197,94,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,_rgba(59,130,246,0.04)_0%,_transparent_50%)]" />
      </div>

      {/* Grid Background */}
      <div
        className="hero-grid-bg absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated SVG Icons */}
      <AnimatedSVGs />

      {/* Ambient Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="ambient-particle absolute rounded-full pointer-events-none z-[2]"
          style={{
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            background: i % 3 === 0
              ? "rgba(34, 197, 94, 0.25)"
              : i % 3 === 1
              ? "rgba(59, 130, 246, 0.2)"
              : "rgba(168, 85, 247, 0.15)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Hero Content */}
      <section
        id="hero"
        className="relative z-10 flex-1 flex items-center justify-center px-5 md:px-10 lg:px-16 xl:px-20 pt-24 pb-10"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Text Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Status */}
            <div className="hero-status-card">
              <StatusCard />
            </div>

            {/* Eyebrow */}
            <div
              className="hero-eyebrow flex items-center gap-2"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "#475569",
              }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ background: "linear-gradient(90deg, #22c55e, transparent)" }}
              />
              PORTFOLIO 2025
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-1">
              <h1 className="hero-heading" style={{ letterSpacing: "-0.04em" }}>
                Shaping
                <span className="inline-flex items-center gap-2 mx-2">
                  <span
                    className="slide"
                    style={{ display: "inline-flex", overflow: "hidden", height: "1.1em", verticalAlign: "bottom" }}
                  >
                    <span className="wrapper" style={{ animation: "wordSlider 21s infinite cubic-bezier(0.9, 0.01, 0.3, 0.99)" }}>
                      {words.map((word, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-2"
                          style={{ height: "1.1em" }}
                        >
                          <img
                            src={word.imgPath}
                            alt=""
                            className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain"
                            style={{
                              background: "rgba(34, 197, 94, 0.08)",
                              border: "1px solid rgba(34, 197, 94, 0.15)",
                              padding: "4px",
                            }}
                          />
                          <span
                            style={{
                              background: "linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {word.text}
                          </span>
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </h1>
              <h1 className="hero-heading" style={{ letterSpacing: "-0.04em" }}>
                into Real Projects
              </h1>
              <h1 className="hero-heading" style={{ letterSpacing: "-0.04em" }}>
                that Deliver{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Results
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="flex flex-col gap-3">
              <p
                className="hero-subtitle-line text-base md:text-lg max-w-lg leading-relaxed"
                style={{ color: "#94a3b8" }}
              >
                Hi, I'm{" "}
                <span style={{ color: "#f8fafc", fontWeight: 600 }}>Aswin Andro</span> — a
              </p>
              <div className="hero-subtitle-line flex items-center gap-2">
                <span
                  style={{
                    color: "#22c55e",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                  }}
                >
                  &gt;
                </span>
                <span
                  className="text-lg md:text-xl font-semibold"
                  style={{ color: "#f8fafc", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {typedText}
                  <span
                    className="inline-block w-0.5 h-5 ml-0.5 align-middle"
                    style={{
                      background: "#22c55e",
                      opacity: showContent ? 1 : 0,
                    }}
                  />
                </span>
              </div>
              <p
                className="hero-subtitle-line text-sm max-w-md leading-relaxed"
                style={{ color: "#64748b" }}
              >
                Passionate about clean architecture, scalable systems, and bridging the gap between code and cloud infrastructure.
              </p>
            </div>

            {/* Tech Pills */}
            <div className="hero-subtitle-line">
              <TechPills />
            </div>

            {/* CTA Buttons */}
            <div className="hero-subtitle-line flex items-center gap-4 flex-wrap">
              <Button
                text="Explore"
                className="w-48 h-9"
                id="counter"
                onClick={handleScrollToServices}
              />
              <a
                href="/contact"
                className="flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 group"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)";
                  e.currentTarget.style.color = "#22c55e";
                  e.currentTarget.style.background = "rgba(34,197,94,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#94a3b8";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right — Code Block */}
          <div className="hero-code-block hidden lg:block">
            <CodeBlock />
          </div>
        </div>
      </section>

      {/* Bottom Counter + Scroll Indicator */}
      <div className="hero-counter-section z-20 w-full flex flex-col items-center gap-4 pb-8 px-5 md:px-10">
        <AnimatedCounter />
        <div className="hero-scroll-indicator mt-2">
          <ScrollIndicator />
        </div>
      </div>
    </div>
  );
};

export default Hero;
