import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const floatingSvgs = [
  { src: "/images/svgs/code-animated.svg", className: "w-8 h-8 opacity-20", top: "8%", right: "12%", delay: 0 },
  { src: "/images/svgs/cloud-deploy.svg", className: "w-6 h-6 opacity-15", top: "22%", right: "5%", delay: 0.5 },
  { src: "/images/svgs/layers-animated.svg", className: "w-7 h-7 opacity-15", top: "45%", left: "3%", delay: 1 },
  { src: "/images/svgs/server-api.svg", className: "w-5 h-5 opacity-10", top: "65%", right: "8%", delay: 1.5 },
  { src: "/images/svgs/shield-check.svg", className: "w-6 h-6 opacity-10", bottom: "15%", left: "6%", delay: 2 },
];

export default function SvgDecorations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const svgs = containerRef.current.querySelectorAll(".exp-deco-svg");

    svgs.forEach((svg, i) => {
      gsap.fromTo(
        svg,
        { opacity: 0, y: 20 },
        {
          opacity: parseFloat(svg.getAttribute("data-opacity") || "0.15"),
          y: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.to(svg, {
        y: -10 + Math.random() * 20,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {floatingSvgs.map((s, i) => (
        <div
          key={i}
          className={`absolute exp-deco-svg ${s.className}`}
          data-opacity={s.className.match(/opacity-(\d+)/)?.[1] || "15"}
          style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom, opacity: 0 }}
        >
          <img src={s.src} alt="" className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}
