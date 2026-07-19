import { useState, useEffect, type RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
  relativeX: number;
  relativeY: number;
}

export function useMousePosition(ref: RefObject<HTMLElement | null>): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0, relativeX: 50, relativeY: 50 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({
        x,
        y,
        relativeX: (x / rect.width) * 100,
        relativeY: (y / rect.height) * 100,
      });
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [ref]);

  return position;
}
