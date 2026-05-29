import React, { useState, useEffect } from "react";

/**
 * Base Skeleton Loader Component
 * Supports custom sizes, shapes, animations, and gradients.
 */
export const Skeleton = ({
  width,
  height,
  variant = "rect", // "circle" | "rect" | "text" | "card"
  animation = "shimmer", // "shimmer" | "glow" | "pulse" | "none"
  gradient,
  borderRadius,
  className = "",
  style = {},
}) => {
  // Determine variant specific styles
  let shapeClass = "rounded-lg";
  if (variant === "circle") {
    shapeClass = "rounded-full";
  } else if (variant === "text") {
    shapeClass = "rounded-md";
  }

  // Determine animation classes
  let animClass = "";
  if (animation === "shimmer") {
    animClass = "skeleton-shimmer";
  } else if (animation === "glow") {
    animClass = "skeleton-shimmer-glow";
  } else if (animation === "pulse") {
    animClass = "skeleton-pulse";
  }

  // Compute inline styles
  const computedStyle = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: borderRadius !== undefined ? borderRadius : undefined,
    ...(gradient ? { backgroundImage: gradient } : {}),
    ...style,
  };

  return (
    <div
      className={`skeleton ${shapeClass} ${animClass} ${className}`}
      style={computedStyle}
    />
  );
};

/**
 * Renders multiple base skeleton lines or items.
 */
export const SkeletonList = ({
  count = 3,
  width = "100%",
  height = "16px",
  gap = "12px",
  variant = "text",
  animation = "shimmer",
  className = "",
  containerClassName = "",
  style = {},
}) => {
  return (
    <div className={`flex flex-col ${containerClassName}`} style={{ gap, ...style }}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === count - 1 && variant === "text" ? "75%" : width}
          height={height}
          variant={variant}
          animation={animation}
          className={className}
        />
      ))}
    </div>
  );
};

/* ==========================================================================
   HIGH-FIDELITY LAYOUT SKELETONS FOR SECTIONS
   ========================================================================== */

/**
 * 1. Hero Section Skeleton
 */
export const HeroSkeleton = () => (
  <div className="relative min-h-screen overflow-hidden flex flex-col justify-center bg-black">
    {/* Simulated Background */}
    <div className="absolute inset-0 z-0 bg-[#07070a]" />
    
    <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-7 pt-28 sm:pt-55 md:pt-55 lg:pt-40 xl:pt-35 2xl:pt-35 px-5 md:px-10">
      {/* Title Skeletons */}
      <div className="max-w-4xl w-full flex flex-col items-center gap-4">
        <Skeleton width="60%" height="60px" variant="rect" animation="glow" className="max-w-md rounded-2xl md:h-20 h-10" />
        <Skeleton width="80%" height="60px" variant="rect" animation="glow" className="max-w-2xl rounded-2xl md:h-20 h-10" />
        <Skeleton width="50%" height="60px" variant="rect" animation="glow" className="max-w-lg rounded-2xl md:h-20 h-10" />
      </div>
      
      {/* Subtitle Line */}
      <Skeleton width="45%" height="24px" variant="text" className="mt-4 max-w-sm" />
    </section>

    {/* Bottom Counter + Button Skeleton */}
    <div className="z-20 w-full flex flex-col items-center gap-6 py-8 px-10">
      {/* Simulated Stats Counters */}
      <div className="flex gap-12 justify-center items-center w-full max-w-lg">
        <div className="flex flex-col items-center gap-2">
          <Skeleton width="80px" height="40px" variant="rect" className="rounded-xl" />
          <Skeleton width="60px" height="14px" variant="text" />
        </div>
        <div className="w-[1px] h-10 bg-zinc-800" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton width="85px" height="40px" variant="rect" className="rounded-xl" />
          <Skeleton width="65px" height="14px" variant="text" />
        </div>
        <div className="w-[1px] h-10 bg-zinc-800" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton width="75px" height="40px" variant="rect" className="rounded-xl" />
          <Skeleton width="55px" height="14px" variant="text" />
        </div>
      </div>

      {/* Button Placeholder */}
      <Skeleton width="320px" height="48px" variant="rect" className="rounded-xl mt-2 max-w-xs" />
    </div>
  </div>
);

/**
 * 2. Logo Showcase Marquee Skeleton
 */
export const LogoShowcaseSkeleton = () => (
  <div className="md:my-20 my-10 relative w-full overflow-hidden px-5 md:px-20">
    <div className="flex items-center justify-between gap-6 md:gap-12 py-10 border-y border-zinc-900/50">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          width="120px"
          height="45px"
          variant="rect"
          animation="shimmer"
          className="opacity-40 rounded-xl flex-none hidden sm:block first:block last:block"
        />
      ))}
      <Skeleton width="80px" height="35px" variant="rect" className="opacity-40 rounded-xl flex-none sm:hidden" />
      <Skeleton width="80px" height="35px" variant="rect" className="opacity-40 rounded-xl flex-none sm:hidden" />
    </div>
  </div>
);

/**
 * 3. Feature Cards Grid Skeleton
 */
export const FeatureCardsSkeleton = () => (
  <div className="w-full padding-x-lg py-10">
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="border border-zinc-900/50 bg-[#09090b] rounded-xl p-8 flex flex-col gap-5 h-64 justify-between"
        >
          <div className="flex flex-col gap-4">
            <Skeleton width="56px" height="56px" variant="circle" animation="glow" />
            <Skeleton width="60%" height="28px" variant="text" className="mt-2" />
          </div>
          <SkeletonList count={2} gap="8px" width="100%" height="16px" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * 4. Services (Testimonials) Skeleton
 */
export const ServicesSkeleton = () => (
  <section className="flex-center section-padding">
    <div className="w-full h-full md:px-10 px-5">
      {/* Title Header Placeholder */}
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <Skeleton width="180px" height="16px" variant="text" />
        <Skeleton width="340px" height="36px" variant="rect" className="rounded-xl mt-2 max-w-sm" />
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border border-zinc-900 bg-[#09090c] rounded-xl p-10 flex flex-col justify-between h-72"
          >
            {/* Review stars block */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Skeleton key={s} width="16px" height="16px" variant="circle" />
              ))}
            </div>
            {/* Review content placeholder */}
            <SkeletonList count={3} gap="8px" className="mb-6" />
            {/* Profile footer placeholder */}
            <div className="flex items-center gap-4 border-t border-zinc-900 pt-4 mt-auto">
              <Skeleton width="40px" height="40px" variant="circle" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton width="100px" height="16px" variant="text" />
                <Skeleton width="60px" height="12px" variant="text" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * 5. Work (AppShowcase) Skeleton
 */
export const WorkSkeleton = () => (
  <div className="app-showcase py-20">
    <div className="w-full">
      <div className="flex xl:flex-row flex-col gap-10 justify-between">
        {/* Main/First Big Project */}
        <div className="flex flex-col justify-between xl:w-[60%] border border-zinc-900 bg-[#08080a] p-6 rounded-xl">
          <Skeleton width="100%" height="450px" variant="rect" className="rounded-xl md:h-[50vh] h-64" />
          <div className="space-y-4 mt-6">
            <div className="flex gap-2">
              <Skeleton width="60px" height="20px" variant="rect" className="rounded-full" />
              <Skeleton width="80px" height="20px" variant="rect" className="rounded-full" />
              <Skeleton width="70px" height="20px" variant="rect" className="rounded-full" />
            </div>
            <Skeleton width="50%" height="32px" variant="rect" className="rounded-lg" />
            <SkeletonList count={2} width="100%" height="16px" />
          </div>
        </div>

        {/* Project List Right Col 1 */}
        <div className="flex md:flex-row flex-col xl:flex-col gap-10 xl:w-[40%]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex-1 border border-zinc-900 bg-[#08080a] p-5 rounded-xl flex flex-col justify-between h-[360px]">
              <Skeleton width="100%" height="220px" variant="rect" className="rounded-lg" />
              <Skeleton width="80%" height="24px" variant="rect" className="rounded-md mt-4" />
              <Skeleton width="40%" height="14px" variant="text" className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * 6. Professional Experience Section Skeleton
 */
export const ExperienceSkeleton = () => (
  <section className="flex-center md:mt-40 mt-20 section-padding xl:px-0">
    <div className="w-full h-full md:px-20 px-5">
      {/* Title */}
      <div className="flex flex-col items-center text-center gap-3 mb-24">
        <Skeleton width="150px" height="14px" variant="text" />
        <Skeleton width="360px" height="36px" variant="rect" className="rounded-xl mt-2 max-w-sm" />
      </div>

      <div className="mt-16 relative">
        {/* Timeline representation */}
        <div className="absolute left-5 md:left-10 xl:left-[35.5vw] top-0 bottom-0 w-[2px] bg-zinc-900" />

        <div className="space-y-16">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex flex-col-reverse xl:flex-row xl:gap-20 gap-10 justify-between relative pl-12 md:pl-20 xl:pl-0">
              
              {/* Glow Card Left Column */}
              <div className="xl:w-2/6 border border-zinc-900 bg-[#070709] p-6 rounded-xl h-60">
                <div className="flex items-center gap-4 border-b border-zinc-900/60 pb-4 mb-4">
                  <Skeleton width="44px" height="44px" variant="circle" />
                  <div className="flex flex-col gap-2">
                    <Skeleton width="110px" height="18px" variant="text" />
                    <Skeleton width="70px" height="12px" variant="text" />
                  </div>
                </div>
                <SkeletonList count={3} gap="8px" />
              </div>

              {/* Text / Timeline details right column */}
              <div className="xl:w-4/6 flex items-start">
                {/* Timeline node icon */}
                <div className="absolute left-3 md:left-6 xl:left-[34vw] z-10 w-10 h-10 rounded-full border border-zinc-800 bg-black flex items-center justify-center">
                  <Skeleton width="20px" height="20px" variant="circle" animation="pulse" />
                </div>
                
                {/* Content text */}
                <div className="flex-1 flex flex-col gap-4 xl:pl-16">
                  <Skeleton width="40%" height="32px" variant="rect" className="rounded-lg md:h-10" />
                  <Skeleton width="150px" height="16px" variant="text" className="text-zinc-600" />
                  <Skeleton width="120px" height="12px" variant="text" className="text-zinc-700 mt-2" />
                  <ul className="space-y-3 mt-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 mt-2 flex-none" />
                        <Skeleton width={idx === 1 ? "85%" : "95%"} height="16px" variant="text" className="flex-1" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/**
 * 7. Tech Stack Section Skeleton
 */
export const TechStackSkeleton = () => (
  <div className="flex-center section-padding relative py-20 bg-black">
    <div className="w-full h-full md:px-10 px-5">
      {/* Title */}
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <Skeleton width="200px" height="14px" variant="text" />
        <Skeleton width="380px" height="38px" variant="rect" className="rounded-xl mt-2 max-w-sm" />
      </div>

      {/* Circle Tech Card Grids */}
      <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 xl:gap-16 md:gap-10 gap-6 mt-16">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="border border-zinc-900 bg-[#09090b]/80 flex flex-col items-center justify-center p-6 xl:rounded-full rounded-xl gap-4 h-64 w-full max-w-56 mx-auto"
          >
            {/* Circle 3D Model Placeholder */}
            <Skeleton width="120px" height="120px" variant="circle" animation="glow" className="opacity-70" />
            {/* Tech Name Label */}
            <Skeleton width="80px" height="16px" variant="text" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * 8. Skills Arsenal Page Skeleton
 */
export const SkillsSkeleton = () => (
  <section className="flex-center section-padding py-20">
    <div className="w-full h-full md:px-10 px-5">
      {/* Title */}
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <Skeleton width="160px" height="14px" variant="text" />
        <Skeleton width="350px" height="38px" variant="rect" className="rounded-xl mt-2 max-w-sm" />
      </div>

      <div className="skills-grid mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-zinc-900 bg-[#08080a] rounded-xl p-8 flex flex-col h-64 justify-between">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton width="36px" height="36px" variant="circle" />
              <Skeleton width="130px" height="22px" variant="rect" className="rounded-md" />
            </div>
            {/* Badges block */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Array.from({ length: 6 }).map((_, s) => (
                <Skeleton
                  key={s}
                  width={`${40 + Math.random() * 40}px`}
                  height="26px"
                  variant="rect"
                  className="rounded-full opacity-60"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * 9. Contact Form Section Skeleton
 */
export const ContactSkeleton = () => (
  <section className="flex-center section-padding py-20">
    <div className="w-full h-full md:px-10 px-5">
      {/* Title */}
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <Skeleton width="180px" height="14px" variant="text" />
        <Skeleton width="340px" height="38px" variant="rect" className="rounded-xl mt-2 max-w-sm" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 mt-16">
        {/* Contact Form outline (Left) */}
        <div className="xl:col-span-5 border border-zinc-900 bg-[#08080a] p-10 rounded-xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton width="70px" height="14px" variant="text" />
            <Skeleton width="100%" height="48px" variant="rect" className="rounded-md" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton width="75px" height="14px" variant="text" />
            <Skeleton width="100%" height="48px" variant="rect" className="rounded-md" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton width="90px" height="14px" variant="text" />
            <Skeleton width="100%" height="120px" variant="rect" className="rounded-md" />
          </div>
          <Skeleton width="100%" height="52px" variant="rect" className="rounded-lg mt-4" />
        </div>

        {/* Profile Image silhouette (Right) */}
        <div className="xl:col-span-7 hidden xl:flex justify-center items-end min-h-[450px]">
          <Skeleton
            width="340px"
            height="480px"
            variant="rect"
            animation="glow"
            className="rounded-2xl opacity-40"
          />
        </div>
      </div>
    </div>
  </section>
);


/* ==========================================================================
   REACT SIMULATION HOOK
   ========================================================================== */

/**
 * useSkeletonLoader Custom Hook
 * Simulates assets/3D models hydration delay on component mount.
 * Triggers a beautiful crossfade entry once loaded.
 */
export const useSkeletonLoader = (delayMs = 650) => {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Skeletons mount instantly in 1ms.
    // Set a timer to mimic asset/content loading complete.
    const timer = setTimeout(() => {
      setLoading(false);
      // Wait for skeleton fade out animation frame before showing content
      const showTimer = setTimeout(() => {
        setShowContent(true);
      }, 50);
      return () => clearTimeout(showTimer);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  return { loading, showContent };
};
