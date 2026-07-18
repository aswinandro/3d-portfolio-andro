import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
    if ("ontouchstart" in window) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseEnterInteractive = (e) => {
      const target = e.currentTarget;
      const hoverTextAttr = target.getAttribute("data-cursor-text");
      setIsHovering(true);
      setHoverText(hoverTextAttr || "");
    };

    const handleMouseLeaveInteractive = () => {
      setIsHovering(false);
      setHoverText("");
    };

    // Lerp animation for smooth cursor follow
    let animationId;
    const animate = () => {
      const lerp = 0.12;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerp;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    // Find all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor], input, textarea, .cta-wrapper, .card-border, .skill-bento-card'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Outer ring - follows with lerp */}
      <div
        ref={cursorRef}
        className="custom-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "60px" : "36px",
          height: isHovering ? "60px" : "36px",
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "rgba(34, 197, 94, 0.6)" : "rgba(248, 250, 252, 0.2)"}`,
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background 0.3s ease",
          transform: "translate(-50%, -50%)",
          background: isHovering ? "rgba(34, 197, 94, 0.08)" : "transparent",
          mixBlendMode: isHovering ? "normal" : "difference",
          marginLeft: isHovering ? "-30px" : "-18px",
          marginTop: isHovering ? "-30px" : "-18px",
        }}
      />

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "0px" : "5px",
          height: isHovering ? "0px" : "5px",
          borderRadius: "50%",
          background: "#22c55e",
          pointerEvents: "none",
          zIndex: 100000,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
          opacity: isHovering ? 0 : 1,
          transform: "translate(-50%, -50%)",
          marginLeft: "-2.5px",
          marginTop: "-2.5px",
        }}
      />

      {/* Hover text */}
      {isHovering && hoverText && (
        <div
          ref={cursorTextRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 100001,
            transform: `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`,
            color: "#22c55e",
            fontSize: "0.7rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            marginLeft: "30px",
            marginTop: "-8px",
          }}
        >
          {hoverText}
        </div>
      )}
    </>
  );
};

export default CustomCursor;
