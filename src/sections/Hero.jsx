import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
        gsap.to(".bg-image", {
      scale: 1.6,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
  
   useEffect(() => {
    const bgImage = document.querySelector(".bg-image");

    const handleClick = (e) => {
      const ripple = gsap.timeline();

      // Zoom + blur ripple animation
      ripple.to(bgImage, {
        scale: 1.2,
        filter: "blur(2px)",
        duration: 0.3,
        ease: "power2.out",
      });

      ripple.to(bgImage, {
        scale: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.inOut",
      });
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-center">
      {/* Background Image */}
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <img src="/images/bg.png" alt="" className="bg-image w-full h-full object-cover" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] mix-blend-screen" />
      </div>

      {/* Hero Content */}
      <section
        id="hero"
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-7 pt-28 sm:pt-55 md:pt-55 lg:pt-40 xl:pt-35 2xl:pt-35 px-2 sm:px-4 md:px-6 lg:px-10"
      >
        <div className="hero-text max-w-4xl ">
          <h1>
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
                      className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                    />
                    <span>{word.text}</span>
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <h1>into Real Projects</h1>
          <h1 className="xl:pr-80 lg:pr-70 sm:pr-0 md:pr-54">that Deliver Results</h1>
        </div>

        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
          Hi, I’m Aswin Andro, a developer based in UAE with a passion for code.
        </p>
      </section>

      {/* Bottom Counter + Button */}
      <div className="z-20 w-full flex flex-col items-center gap-4 py-6 md:py-4 px-5 md:px-10 ">
        <AnimatedCounter />
        <Button
          text="See My Work"
          className="md:w-80 md:h-16 w-60 h-12"
          id="counter"
        />
      </div>
    </div>
  );
};

export default Hero;
