import { useEffect, useRef, useState } from "react";

const TechRadar = ({ skills, size = 300 }) => {
  const canvasRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const animationRef = useRef(0);

  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2 - 40;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let progress = 0;
    const animate = () => {
      progress = Math.min(progress + 0.02, 1);
      ctx.clearRect(0, 0, size, size);

      // Draw rings
      for (let i = 4; i >= 1; i--) {
        const radius = (maxRadius / 4) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + i * 0.01})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw axes
      const angleStep = (Math.PI * 2) / skills.length;
      skills.forEach((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * maxRadius,
          centerY + Math.sin(angle) * maxRadius
        );
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw skill polygon
      ctx.beginPath();
      skills.forEach((skill, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const radius = (skill.level / 100) * maxRadius * progress;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();

      // Fill with gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius
      );
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.15)");
      gradient.addColorStop(1, "rgba(59, 130, 246, 0.05)");
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = "rgba(34, 197, 94, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw skill points and labels
      skills.forEach((skill, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const radius = (skill.level / 100) * maxRadius * progress;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Point
        ctx.beginPath();
        ctx.arc(x, y, hoveredSkill === i ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = hoveredSkill === i ? "#22c55e" : "rgba(34, 197, 94, 0.8)";
        ctx.fill();

        if (hoveredSkill === i) {
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(34, 197, 94, 0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Label
        const labelRadius = maxRadius + 25;
        const lx = centerX + Math.cos(angle) * labelRadius;
        const ly = centerY + Math.sin(angle) * labelRadius;

        ctx.font = `${hoveredSkill === i ? "600" : "400"} 10px "JetBrains Mono", monospace`;
        ctx.fillStyle = hoveredSkill === i ? "#22c55e" : "rgba(148, 163, 184, 0.7)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(skill.name, lx, ly);
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills, size, hoveredSkill]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, cursor: "crosshair" }}
      onMouseMove={(e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - centerX;
        const y = e.clientY - rect.top - centerY;
        const angleStep = (Math.PI * 2) / skills.length;

        let closest = null;
        let closestDist = Infinity;

        skills.forEach((skill, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const radius = (skill.level / 100) * maxRadius;
          const sx = Math.cos(angle) * radius;
          const sy = Math.sin(angle) * radius;
          const dist = Math.sqrt((x - sx) ** 2 + (y - sy) ** 2);
          if (dist < closestDist && dist < 30) {
            closest = i;
            closestDist = dist;
          }
        });

        setHoveredSkill(closest);
      }}
      onMouseLeave={() => setHoveredSkill(null)}
    />
  );
};

export default TechRadar;
