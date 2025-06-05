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
  });

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <img src="/images/bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] mix-blend-screen" />
      </div>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center text-center gap-7 px-5 md:px-20 z-10 max-w-4xl">
        <div className="hero-text">
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
          <h1>that Deliver Results</h1>
        </div>

        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
          Hi, I’m Aswin Andro, a developer based in UAE with a passion for code.
        </p>
      </div>

      {/* Counter + Button Wrapper */}
      <div className="absolute bottom-5 flex flex-col items-end gap-3 z-20">
        <AnimatedCounter />
        <Button
          text="See My Work"
          className="md:w-80 md:h-16 w-60 h-12"
          id="counter"
        />
      </div>
    </section>
  );
};

export default Hero;
