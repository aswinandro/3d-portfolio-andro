import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);

      // Determine active section
      const sections = [
        { id: "hero", label: "01" },
        { id: "services", label: "02" },
        { id: "work", label: "03" },
        { id: "experience", label: "04" },
        { id: "skills", label: "05" },
        { id: "contact", label: "06" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setActiveSection(sections[i].label);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress hidden lg:flex"
      style={{
        position: "fixed",
        right: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 90,
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Section indicator */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "#a855f7",
          letterSpacing: "0.1em",
          opacity: activeSection ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {activeSection}
      </div>

      {/* Progress track */}
      <div
        style={{
          width: "2px",
          height: "120px",
          background: "rgba(255, 255, 255, 0.06)",
          borderRadius: "1px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Progress fill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${progress}%`,
            background: "linear-gradient(180deg, #a855f7 0%, #3b82f6 100%)",
            borderRadius: "1px",
            transition: "height 0.1s linear",
          }}
        />
      </div>

      {/* Dots for sections */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "absolute",
          right: "-4px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background:
                activeSection === `0${num}`
                  ? "#a855f7"
                  : "rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease",
              boxShadow:
                activeSection === `0${num}`
                  ? "0 0 8px rgba(168, 85, 247, 0.5)"
                  : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollProgress;
