import { useRef } from "react";

const GlowCard = ({ card, index, children, className = "" }) => {
  const cardRefs = useRef([]);

  const handleMouseMove = (index) => (e) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    card.style.setProperty("--start", angle + 60);

    // Subtle 3D tilt
    const tiltX = (mouseY / rect.height) * 5;
    const tiltY = -(mouseX / rect.width) * 5;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = (index) => () => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={handleMouseMove(index)}
      onMouseLeave={handleMouseLeave(index)}
      className={`card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column ${className}`}
      style={{
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 1s ease-in-out, box-shadow 0.5s ease",
      }}
    >
      <div className="glow"></div>
      <div className="mb-5">
        <p style={{ color: "#94a3b8" }} className="text-lg">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;
