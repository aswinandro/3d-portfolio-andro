import { useState, useCallback } from "react";

const useMouseGlow = () => {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  }, []);

  const glowStyle = {
    "--mouse-x": `${glowPos.x}%`,
    "--mouse-y": `${glowPos.y}%`,
  };

  return { glowPos, handleMouseMove, glowStyle };
};

export default useMouseGlow;
