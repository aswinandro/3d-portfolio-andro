import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const {
      duration = 0.8,
      delay = 0,
      stagger = 0,
      start = "top 85%",
      ease = "power3.out",
      children = false,
      y = 40,
      x = 0,
      blur = 0,
    } = options;

    const from = { opacity: 0, y, x };
    if (blur > 0) from.filter = `blur(${blur}px)`;

    const to = { opacity: 1, y: 0, x: 0, duration, delay, ease, stagger };
    if (blur > 0) to.filter = "blur(0px)";

    const targets = children ? el.children : el;

    gsap.fromTo(targets, from, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};

export default useScrollReveal;
